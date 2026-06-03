export const tokensSettingsScript = String.raw`
(function () {
  window.EasyTierAdmin = window.EasyTierAdmin || {};
  const api = window.EasyTierAdmin;

  api.loadTokens = async function loadTokens() {
    try {
      const res = await fetch('/api/tokens', {
        headers: { 'Authorization': 'Bearer ' + token, 'X-Admin-Token': token }
      });
      if (!res.ok) throw new Error('API failed');
      const data = await res.json();
      const body = document.getElementById('tokensTableBody');
      if (!body) return;
      body.innerHTML = '';
      const tokens = data.tokens || [];
      if (!tokens.length) {
        body.innerHTML = '<tr><td colspan="4" style="text-align:center; color:var(--text-muted);">' + (translations[currentLang]['tokens-empty'] || '') + '</td></tr>';
        return;
      }
      tokens.forEach((tok) => {
        const tr = document.createElement('tr');
        tr.innerHTML = '<td style="font-family: monospace; font-weight: 600; color: #a78bfa;">' + tok.token + '</td>' +
          '<td>' + (tok.description || '') + '</td>' +
          '<td style="color: var(--text-secondary);">' + new Date(tok.createdAt).toLocaleString() + '</td>' +
          '<td style="white-space: nowrap;">' +
          '<button type="button" class="btn-action" onclick="EasyTierAdmin.copyTokenWsUrl(' + JSON.stringify(tok.token) + ')"><i data-lucide="copy" style="width: 14px; height: 14px;"></i> ' + translations[currentLang]['action-copy-wss'] + '</button> ' +
          '<button type="button" class="btn-action btn-danger-action" onclick="EasyTierAdmin.deleteToken(' + JSON.stringify(tok.token) + ')"><i data-lucide="trash-2" style="width: 14px; height: 14px;"></i> ' + translations[currentLang]['action-delete'] + '</button></td>';
        body.appendChild(tr);
      });
      api.safeCreateIcons();
      if (typeof window.refreshTableLabels === 'function') window.refreshTableLabels();
    } catch (error) {
      console.error(error);
    }
  };

  api.openCreateTokenModal = function openCreateTokenModal() {
    const modal = document.getElementById('createTokenModal');
    const roomInput = document.getElementById('tokenRoomInput');
    if (roomInput && !roomInput.value.trim()) roomInput.value = 'default';
    if (modal) modal.style.display = 'flex';
  };

  api.closeCreateTokenModal = function closeCreateTokenModal() {
    const modal = document.getElementById('createTokenModal');
    const input = document.getElementById('tokenDescInput');
    const roomInput = document.getElementById('tokenRoomInput');
    if (modal) modal.style.display = 'none';
    if (input) input.value = '';
    if (roomInput) roomInput.value = 'default';
  };

  api.refreshClientTokenList = async function refreshClientTokenList() {
    const datalist = document.getElementById('clientTokenList');
    if (!datalist) return;
    try {
      const res = await fetch('/api/tokens', {
        headers: { 'Authorization': 'Bearer ' + token, 'X-Admin-Token': token }
      });
      if (!res.ok) return;
      const data = await res.json();
      datalist.innerHTML = '';
      (data.tokens || []).forEach((entry) => {
        const option = document.createElement('option');
        option.value = entry.token;
        option.label = entry.description || entry.token.slice(0, 8);
        datalist.appendChild(option);
      });
    } catch (error) {
      console.warn('refreshClientTokenList failed', error);
    }
  };

  api.handleCreateToken = async function handleCreateToken(event) {
    event.preventDefault();
    const description = document.getElementById('tokenDescInput').value;
    const roomId = (document.getElementById('tokenRoomInput')?.value || 'default').trim() || 'default';
    try {
      const res = await fetch('/api/tokens', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token,
          'X-Admin-Token': token
        },
        body: JSON.stringify({ description, room: roomId })
      });
      if (res.ok) {
        const created = await res.json();
        const wssUrl = created.wssUrl || api.buildClientWsUrl(created.roomId || roomId, created.token);
        const message = (translations[currentLang]['msg-gen-success'] || '') + '\\n\\n' + wssUrl;
        alert(message);
        await api.copyText(wssUrl);
        api.closeCreateTokenModal();
        api.loadTokens();
        api.refreshClientTokenList();
      }
    } catch (error) {
      console.error(error);
    }
  };

  api.deleteToken = async function deleteToken(tokenVal) {
    if (!confirm(translations[currentLang]['msg-delete-token-confirm'] || 'Delete this token?')) return;
    try {
      const res = await fetch('/api/tokens?token=' + encodeURIComponent(tokenVal), {
        method: 'DELETE',
        headers: { 'Authorization': 'Bearer ' + token, 'X-Admin-Token': token }
      });
      if (res.ok) {
        alert(translations[currentLang]['msg-deleted-success']);
        api.loadTokens();
      }
    } catch (error) {
      console.error(error);
    }
  };

  api.loadSettings = async function loadSettings() {
    try {
      const res = await fetch('/api/config', {
        headers: { 'Authorization': 'Bearer ' + token, 'X-Admin-Token': token }
      });
      if (res.ok) {
        const data = await res.json();
        window.serverWsPath = data.wsPath || 'ws';
        window.serverRequireToken = !!data.requireToken;
        const toggle = document.getElementById('requireTokenToggle');
        if (toggle) toggle.checked = !!data.requireToken;
      }
    } catch (error) {
      console.error(error);
    }
  };

  api.copyTokenWsUrl = async function copyTokenWsUrl(tokenVal) {
    const room = prompt(translations[currentLang]['prompt-room-id'] || 'Room ID', 'default');
    if (room === null) return;
    const wssUrl = api.buildClientWsUrl(room, tokenVal);
    await api.copyWithToast(wssUrl, 'msg-copied');
  };

  api.loadEasyTierConfigs = async function loadEasyTierConfigs() {
    try {
      const res = await fetch('/api/config', {
        headers: { 'Authorization': 'Bearer ' + token, 'X-Admin-Token': token }
      });
      if (res.ok) {
        const data = await res.json();
        window.serverWsPath = data.wsPath || 'ws';
        window.serverRequireToken = !!data.requireToken;
        window.easyTierConfigs = Array.isArray(data.easyTierConfigs) ? data.easyTierConfigs : [];
        api.renderEasyTierConfigs();
      }
    } catch (error) {
      console.error(error);
    }
  };

  api.renderEasyTierConfigs = function renderEasyTierConfigs() {
    const body = document.getElementById('easyTierConfigsTableBody');
    if (!body) return;
    body.innerHTML = '';
    if (!window.easyTierConfigs.length) {
      body.innerHTML = '<tr><td colspan="6" style="text-align:center; color:var(--text-muted);">' + translations[currentLang]['easytier-config-empty'] + '</td></tr>';
      return;
    }
    window.easyTierConfigs.forEach((config) => {
      const tr = document.createElement('tr');
      tr.innerHTML = '<td style="font-weight: 600; color: #ffffff;">' + (config.name || '') + '</td>' +
        '<td style="font-family: monospace; font-size: 0.85rem; word-break: break-all;">' + (config.wssUrl || '') + '</td>' +
        '<td>' + (config.roomId || 'default') + '</td>' +
        '<td style="font-family: monospace; font-size: 0.85rem; word-break: break-all;">' + (config.clientToken || '—') + '</td>' +
        '<td style="color: var(--text-secondary);">' + new Date(config.createdAt || Date.now()).toLocaleString() + '</td>' +
        '<td style="white-space: nowrap;">' +
        '<button type="button" class="btn-action" onclick="EasyTierAdmin.copyEasyTierConfigUrl(' + JSON.stringify(config.id) + ')"><i data-lucide="copy" style="width: 14px; height: 14px;"></i> ' + translations[currentLang]['action-copy-wss'] + '</button> ' +
        (config.easyTierCommand ? '<button type="button" class="btn-action" onclick="EasyTierAdmin.copyEasyTierCommand(' + JSON.stringify(config.id) + ')"><i data-lucide="terminal" style="width: 14px; height: 14px;"></i> ' + translations[currentLang]['action-copy-cmd'] + '</button> ' : '') +
        '<button type="button" class="btn-action btn-danger-action" onclick="EasyTierAdmin.deleteEasyTierConfig(' + JSON.stringify(config.id) + ')"><i data-lucide="trash-2" style="width: 14px; height: 14px;"></i> ' + translations[currentLang]['action-delete'] + '</button></td>';
      body.appendChild(tr);
    });
    api.safeCreateIcons();
    if (typeof window.refreshTableLabels === 'function') window.refreshTableLabels();
  };

  api.copyEasyTierConfigUrl = async function copyEasyTierConfigUrl(configId) {
    const config = (window.easyTierConfigs || []).find((entry) => entry.id === configId);
    if (!config || !config.wssUrl) return;
    await api.copyWithToast(config.wssUrl, 'msg-copied');
  };

  api.copyEasyTierCommand = async function copyEasyTierCommand(configId) {
    const config = (window.easyTierConfigs || []).find((entry) => entry.id === configId);
    if (!config || !config.easyTierCommand) return;
    await api.copyWithToast(config.easyTierCommand, 'msg-copied');
  };

  api.deleteEasyTierConfig = async function deleteEasyTierConfig(configId) {
    if (!confirm(translations[currentLang]['msg-config-delete-confirm'] || 'Delete this config?')) return;
    try {
      const res = await fetch('/api/config', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token,
          'X-Admin-Token': token
        },
        body: JSON.stringify({ deleteEasyTierConfigId: configId })
      });
      if (res.ok) {
        alert(translations[currentLang]['msg-config-deleted'] || 'Deleted');
        api.loadEasyTierConfigs();
      }
    } catch (error) {
      console.error(error);
    }
  };

  api.openEasyTierConfigModal = async function openEasyTierConfigModal() {
    await api.ensureServerMeta();
    await api.refreshClientTokenList();
    const modal = document.getElementById('easyTierConfigModal');
    const wssInput = document.getElementById('easyTierConfigWssInput');
    if (wssInput && !wssInput.value) {
      const url = new URL(location.origin);
      url.protocol = url.protocol === 'https:' ? 'wss:' : 'ws:';
      url.pathname = '/' + (api.getWsPath() || 'ws');
      url.search = '';
      url.hash = '';
      url.port = '0';
      wssInput.value = url.toString();
    }
    if (modal) modal.style.display = 'flex';
  };

  api.closeEasyTierConfigModal = function closeEasyTierConfigModal() {
    const modal = document.getElementById('easyTierConfigModal');
    if (modal) modal.style.display = 'none';
    ['easyTierConfigNameInput','easyTierConfigWssInput','easyTierConfigRoomInput','easyTierConfigTokenInput','easyTierConfigNetworkNameInput','easyTierConfigNetworkSecretInput','easyTierConfigNotesInput'].forEach((id) => {
      const element = document.getElementById(id);
      if (element) element.value = '';
    });
  };

  api.handleCreateEasyTierConfig = async function handleCreateEasyTierConfig(event) {
    event.preventDefault();
    const easyTierConfig = {
      name: document.getElementById('easyTierConfigNameInput').value.trim(),
      wssUrl: document.getElementById('easyTierConfigWssInput').value.trim(),
      roomId: document.getElementById('easyTierConfigRoomInput').value.trim(),
      clientToken: document.getElementById('easyTierConfigTokenInput').value.trim(),
      networkName: document.getElementById('easyTierConfigNetworkNameInput').value.trim(),
      networkSecret: document.getElementById('easyTierConfigNetworkSecretInput').value.trim(),
      notes: document.getElementById('easyTierConfigNotesInput').value.trim()
    };
    try {
      const res = await fetch('/api/config', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token,
          'X-Admin-Token': token
        },
        body: JSON.stringify({ easyTierConfig })
      });
      if (res.ok) {
        const result = await res.json();
        if (result.config && Array.isArray(result.config.easyTierConfigs)) {
          window.easyTierConfigs = result.config.easyTierConfigs;
          api.renderEasyTierConfigs();
        } else {
          api.loadEasyTierConfigs();
        }
        alert(translations[currentLang]['msg-config-added']);
        api.closeEasyTierConfigModal();
      } else {
        const errorData = await res.json().catch(() => ({}));
        alert(errorData.error || translations[currentLang]['msg-config-failed'] || 'Failed to add EasyTier config');
      }
    } catch (error) {
      console.error(error);
    }
  };

  api.handleToggleRequireToken = async function handleToggleRequireToken(checked) {
    try {
      const res = await fetch('/api/config', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token,
          'X-Admin-Token': token
        },
        body: JSON.stringify({ requireToken: checked })
      });
      if (res.ok) {
        window.serverRequireToken = !!checked;
      }
    } catch (error) {
      console.error(error);
    }
  };

})();
`;
