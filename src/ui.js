export function renderAdminPage(appName = "EasyTier WSS CF") {
  return `<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${appName}</title>
  <style>
    :root {
      color-scheme: light;
      --bg: #f5f7fb;
      --panel: #ffffff;
      --muted: #64748b;
      --text: #0f172a;
      --border: #d8e0ea;
      --accent: #2563eb;
      --accent-weak: #eff6ff;
      --danger: #b91c1c;
      --success: #15803d;
      --shadow: 0 10px 30px rgba(15, 23, 42, 0.08);
    }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      background: radial-gradient(circle at top, #eef4ff 0%, var(--bg) 45%, #eef2f7 100%);
      color: var(--text);
    }
    .shell {
      max-width: 1240px;
      margin: 0 auto;
      padding: 32px 20px 48px;
    }
    header {
      display: flex;
      justify-content: space-between;
      gap: 16px;
      align-items: center;
      margin-bottom: 20px;
    }
    h1 { margin: 0; font-size: 28px; letter-spacing: -0.03em; }
    .subtitle { color: var(--muted); margin-top: 6px; }
    .panel {
      background: var(--panel);
      border: 1px solid var(--border);
      border-radius: 18px;
      box-shadow: var(--shadow);
      padding: 18px;
      margin-bottom: 18px;
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(12, minmax(0, 1fr));
      gap: 14px;
    }
    .span-12 { grid-column: span 12; }
    .span-6 { grid-column: span 6; }
    .span-4 { grid-column: span 4; }
    @media (max-width: 900px) {
      .span-6, .span-4 { grid-column: span 12; }
      header { flex-direction: column; align-items: flex-start; }
    }
    label {
      display: block;
      font-size: 13px;
      font-weight: 600;
      margin-bottom: 6px;
      color: #1e293b;
    }
    input, textarea, select, button {
      font: inherit;
    }
    input, textarea, select {
      width: 100%;
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 12px 14px;
      background: #fff;
      color: var(--text);
      outline: none;
    }
    textarea { min-height: 92px; resize: vertical; }
    input:focus, textarea:focus, select:focus {
      border-color: rgba(37, 99, 235, 0.6);
      box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.08);
    }
    .actions {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
    }
    button {
      border: 0;
      border-radius: 12px;
      padding: 11px 14px;
      cursor: pointer;
      transition: transform 0.15s ease, opacity 0.15s ease;
    }
    button:hover { transform: translateY(-1px); }
    .primary {
      background: var(--accent);
      color: white;
    }
    .secondary {
      background: var(--accent-weak);
      color: var(--accent);
    }
    .danger {
      background: #fef2f2;
      color: var(--danger);
    }
    .muted { color: var(--muted); }
    .row {
      display: flex;
      justify-content: space-between;
      gap: 16px;
      align-items: center;
      flex-wrap: wrap;
    }
    .stats {
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
    }
    .stat {
      min-width: 150px;
      padding: 14px;
      border-radius: 16px;
      background: linear-gradient(180deg, #f8fbff, #eef5ff);
      border: 1px solid #dde8ff;
    }
    .stat strong {
      display: block;
      font-size: 24px;
      margin-bottom: 4px;
    }
    .routes {
      display: grid;
      grid-template-columns: 1fr;
      gap: 14px;
    }
    .route-card {
      border: 1px solid var(--border);
      border-radius: 18px;
      padding: 16px;
      background: #fff;
    }
    .route-head {
      display: flex;
      justify-content: space-between;
      gap: 12px;
      align-items: flex-start;
      margin-bottom: 14px;
    }
    .badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      border-radius: 999px;
      padding: 6px 10px;
      font-size: 12px;
      font-weight: 700;
      background: #eef2ff;
      color: #4338ca;
    }
    .badge.good { background: #ecfdf5; color: var(--success); }
    .badge.bad { background: #fef2f2; color: var(--danger); }
    .route-grid {
      display: grid;
      grid-template-columns: 1.2fr 1fr;
      gap: 12px;
    }
    @media (max-width: 900px) {
      .route-grid { grid-template-columns: 1fr; }
    }
    code, pre {
      background: #0f172a;
      color: #e2e8f0;
      border-radius: 14px;
      padding: 12px;
      overflow: auto;
      margin: 0;
      font-size: 13px;
      line-height: 1.55;
    }
    pre { white-space: pre-wrap; word-break: break-word; }
    .stack {
      display: grid;
      gap: 10px;
    }
    .field {
      display: grid;
      gap: 6px;
    }
    .toolbar {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
      align-items: center;
    }
    .notice {
      padding: 12px 14px;
      border-radius: 12px;
      background: #eff6ff;
      color: #1d4ed8;
      border: 1px solid #dbeafe;
      margin-bottom: 16px;
    }
    .error {
      background: #fef2f2;
      color: var(--danger);
      border-color: #fecaca;
    }
    .hidden { display: none !important; }
    .small { font-size: 12px; color: var(--muted); }
  </style>
</head>
<body>
  <div class="shell">
    <header>
      <div>
        <h1>${appName}</h1>
        <div class="subtitle">EasyTier WSS 代理与管理后台</div>
      </div>
      <div class="toolbar">
        <button id="reloadBtn" class="secondary">刷新</button>
        <button id="logoutBtn" class="danger">退出</button>
      </div>
    </header>

    <div id="banner" class="notice hidden"></div>

    <section class="panel" id="loginPanel">
      <div class="row">
        <div>
          <strong>登录</strong>
          <div class="small">使用 <code>ADMIN_SECRET</code> 登录并签发管理令牌。</div>
        </div>
      </div>
      <form id="loginForm" class="grid" style="margin-top: 16px;">
        <div class="field span-6">
          <label for="password">管理员密钥</label>
          <input id="password" type="password" placeholder="输入 ADMIN_SECRET" autocomplete="current-password" />
        </div>
        <div class="span-6" style="display:flex; align-items:end;">
          <button class="primary" type="submit">登录</button>
        </div>
      </form>
    </section>

    <section class="panel hidden" id="dashboardPanel">
      <div class="row">
        <div>
          <strong>概览</strong>
          <div class="small">路由与连接状态会从 Durable Object 读取并实时刷新。</div>
        </div>
        <div class="stats">
          <div class="stat"><strong id="activeConnections">0</strong><span class="muted">活动连接</span></div>
          <div class="stat"><strong id="totalConnections">0</strong><span class="muted">累计连接</span></div>
          <div class="stat"><strong id="routeCount">0</strong><span class="muted">路由数量</span></div>
        </div>
      </div>
    </section>

    <section class="panel hidden" id="editorPanel">
      <div class="row">
        <div>
          <strong id="editorTitle">新建路由</strong>
          <div class="small">公网入口会自动生成成 <code>wss://&lt;your-domain&gt;/ws/&lt;route-id&gt;/&lt;client-token&gt;</code></div>
        </div>
        <div class="toolbar">
          <button id="cancelEditBtn" class="secondary" type="button">取消编辑</button>
        </div>
      </div>
      <form id="routeForm" class="grid" style="margin-top: 16px;">
        <input id="routeId" type="hidden" />
        <div class="field span-6">
          <label for="routeName">路由名称</label>
          <input id="routeName" placeholder="Tokyo relay" />
        </div>
        <div class="field span-6">
          <label for="upstreamWsUrl">上游 WSS / HTTP URL</label>
          <input id="upstreamWsUrl" placeholder="wss://origin.example.com/ws" />
        </div>
        <div class="field span-6">
          <label for="networkName">EasyTier network-name</label>
          <input id="networkName" placeholder="my-network" />
        </div>
        <div class="field span-6">
          <label for="networkSecret">EasyTier network-secret</label>
          <input id="networkSecret" placeholder="super-secret" />
        </div>
        <div class="field span-6">
          <label for="clientToken">客户端 token</label>
          <input id="clientToken" placeholder="自动生成，也可自定义" />
        </div>
        <div class="field span-6">
          <label for="routeEnabled">状态</label>
          <select id="routeEnabled">
            <option value="true">启用</option>
            <option value="false">停用</option>
          </select>
        </div>
        <div class="field span-12">
          <label for="routeNotes">备注</label>
          <textarea id="routeNotes" placeholder="可写用途、机房、成本说明等"></textarea>
        </div>
        <div class="span-12 actions">
          <button class="primary" type="submit" id="saveRouteBtn">保存路由</button>
          <button class="secondary" type="button" id="generateTokenBtn">生成 token</button>
        </div>
      </form>
    </section>

    <section class="panel hidden" id="routesPanel">
      <div class="row">
        <div>
          <strong>路由列表</strong>
          <div class="small">每个路由都可以直连一个上游 EasyTier WSS 节点。</div>
        </div>
      </div>
      <div id="routes" class="routes" style="margin-top: 16px;"></div>
    </section>
  </div>

  <script>
    const TOKEN_KEY = "easytier-wss-cf-admin-token";
    const state = {
      token: localStorage.getItem(TOKEN_KEY) || "",
      routes: [],
      editingId: ""
    };

    const loginPanel = document.getElementById("loginPanel");
    const dashboardPanel = document.getElementById("dashboardPanel");
    const editorPanel = document.getElementById("editorPanel");
    const routesPanel = document.getElementById("routesPanel");
    const banner = document.getElementById("banner");
    const routesContainer = document.getElementById("routes");
    const editorTitle = document.getElementById("editorTitle");

    function showBanner(message, type) {
      banner.textContent = message;
      banner.className = type === "error" ? "notice error" : "notice";
      banner.classList.remove("hidden");
      window.clearTimeout(showBanner.timer);
      showBanner.timer = window.setTimeout(() => banner.classList.add("hidden"), 4000);
    }

    function authHeaders() {
      return state.token ? { Authorization: "Bearer " + state.token } : {};
    }

    async function api(path, options) {
      const response = await fetch(path, Object.assign({
        headers: Object.assign({ "Content-Type": "application/json" }, authHeaders())
      }, options || {}));

      if (!response.ok) {
        const text = await response.text();
        throw new Error(text || "请求失败");
      }

      if (response.status === 204) {
        return null;
      }

      return await response.json();
    }

    function setAuthToken(token) {
      state.token = token || "";
      if (token) {
        localStorage.setItem(TOKEN_KEY, token);
      } else {
        localStorage.removeItem(TOKEN_KEY);
      }
    }

    function prettyJson(value) {
      return JSON.stringify(value, null, 2);
    }

    function setEditorValues(route) {
      state.editingId = route && route.id ? route.id : "";
      document.getElementById("routeId").value = route && route.id ? route.id : "";
      document.getElementById("routeName").value = route && route.name ? route.name : "";
      document.getElementById("upstreamWsUrl").value = route && route.upstreamWsUrl ? route.upstreamWsUrl : "";
      document.getElementById("networkName").value = route && route.networkName ? route.networkName : "";
      document.getElementById("networkSecret").value = route && route.networkSecret ? route.networkSecret : "";
      document.getElementById("clientToken").value = route && route.clientToken ? route.clientToken : "";
      document.getElementById("routeEnabled").value = route && route.enabled === false ? "false" : "true";
      document.getElementById("routeNotes").value = route && route.notes ? route.notes : "";
      editorTitle.textContent = route && route.id ? "编辑路由" : "新建路由";
      editorPanel.classList.remove("hidden");
    }

    function resetEditor() {
      setEditorValues(null);
      document.getElementById("routeId").value = "";
      state.editingId = "";
      editorTitle.textContent = "新建路由";
    }

    function createField(labelText, value) {
      const wrapper = document.createElement("div");
      wrapper.className = "field";
      const label = document.createElement("label");
      label.textContent = labelText;
      const pre = document.createElement("pre");
      pre.textContent = value;
      wrapper.appendChild(label);
      wrapper.appendChild(pre);
      return wrapper;
    }

    function copyText(value) {
      navigator.clipboard.writeText(value).then(() => showBanner("已复制到剪贴板", "success")).catch(() => showBanner("复制失败", "error"));
    }

    function routeCard(route) {
      const card = document.createElement("article");
      card.className = "route-card";

      const head = document.createElement("div");
      head.className = "route-head";

      const left = document.createElement("div");
      const title = document.createElement("div");
      title.style.fontWeight = "700";
      title.style.fontSize = "18px";
      title.textContent = route.name || route.id;
      const meta = document.createElement("div");
      meta.className = "small";
      meta.textContent = "id: " + route.id + " · created: " + route.createdAt;
      left.appendChild(title);
      left.appendChild(meta);

      const right = document.createElement("div");
      right.className = "actions";
      const status = document.createElement("span");
      status.className = "badge " + (route.enabled ? "good" : "bad");
      status.textContent = route.enabled ? "已启用" : "已停用";
      const connection = document.createElement("span");
      connection.className = "badge";
      connection.textContent = "active " + route.stats.activeConnections + " / total " + route.stats.totalConnections;
      right.appendChild(status);
      right.appendChild(connection);

      head.appendChild(left);
      head.appendChild(right);

      const grid = document.createElement("div");
      grid.className = "route-grid";

      const leftCol = document.createElement("div");
      leftCol.className = "stack";
      leftCol.appendChild(createField("公网入口", route.publicWsUrl));
      leftCol.appendChild(createField("上游地址", route.upstreamWsUrl));
      leftCol.appendChild(createField("EasyTier 命令", route.easyTierCommand));

      const rightCol = document.createElement("div");
      rightCol.className = "stack";
      rightCol.appendChild(createField("network-name", route.networkName || ""));
      rightCol.appendChild(createField("network-secret", route.networkSecret || ""));
      rightCol.appendChild(createField("客户端 token", route.clientToken));
      rightCol.appendChild(createField("备注", route.notes || ""));
      rightCol.appendChild(createField("最近错误", route.stats.lastError || "-"));

      const tools = document.createElement("div");
      tools.className = "actions";

      const copyPublic = document.createElement("button");
      copyPublic.className = "secondary";
      copyPublic.textContent = "复制入口";
      copyPublic.onclick = function () { copyText(route.publicWsUrl); };

      const copyCmd = document.createElement("button");
      copyCmd.className = "secondary";
      copyCmd.textContent = "复制命令";
      copyCmd.onclick = function () { copyText(route.easyTierCommand); };

      const testBtn = document.createElement("button");
      testBtn.className = "secondary";
      testBtn.textContent = "测试上游";
      testBtn.onclick = async function () {
        testBtn.disabled = true;
        try {
          await api("/api/routes/" + route.id + "/test", { method: "POST" });
          showBanner("上游连通性正常", "success");
        } catch (error) {
          showBanner(error.message || "测试失败", "error");
        } finally {
          testBtn.disabled = false;
        }
      };

      const editBtn = document.createElement("button");
      editBtn.className = "primary";
      editBtn.textContent = "编辑";
      editBtn.onclick = function () { setEditorValues(route); window.scrollTo({ top: 0, behavior: "smooth" }); };

      const deleteBtn = document.createElement("button");
      deleteBtn.className = "danger";
      deleteBtn.textContent = "删除";
      deleteBtn.onclick = async function () {
        if (!confirm("确定删除这个路由吗？")) {
          return;
        }
        await api("/api/routes/" + route.id, { method: "DELETE" });
        await refresh();
      };

      tools.appendChild(copyPublic);
      tools.appendChild(copyCmd);
      tools.appendChild(testBtn);
      tools.appendChild(editBtn);
      tools.appendChild(deleteBtn);
      rightCol.appendChild(tools);

      grid.appendChild(leftCol);
      grid.appendChild(rightCol);

      card.appendChild(head);
      card.appendChild(grid);
      return card;
    }

    function renderDashboard(data) {
      dashboardPanel.classList.remove("hidden");
      editorPanel.classList.remove("hidden");
      routesPanel.classList.remove("hidden");
      loginPanel.classList.add("hidden");

      document.getElementById("activeConnections").textContent = data.summary.activeConnections;
      document.getElementById("totalConnections").textContent = data.summary.totalConnections;
      document.getElementById("routeCount").textContent = data.routes.length;

      routesContainer.replaceChildren();
      data.routes.forEach(function (route) {
        routesContainer.appendChild(routeCard(route));
      });
    }

    async function refresh() {
      const data = await api("/api/state", { method: "GET", headers: authHeaders() });
      state.routes = data.routes || [];
      renderDashboard(data);
    }

    document.getElementById("loginForm").addEventListener("submit", async function (event) {
      event.preventDefault();
      const password = document.getElementById("password").value;
      try {
        const resp = await api("/api/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ password: password })
        });
        setAuthToken(resp.token);
        document.getElementById("password").value = "";
        showBanner("登录成功", "success");
        await refresh();
      } catch (error) {
        showBanner(error.message || "登录失败", "error");
      }
    });

    document.getElementById("routeForm").addEventListener("submit", async function (event) {
      event.preventDefault();
      const payload = {
        name: document.getElementById("routeName").value,
        upstreamWsUrl: document.getElementById("upstreamWsUrl").value,
        networkName: document.getElementById("networkName").value,
        networkSecret: document.getElementById("networkSecret").value,
        clientToken: document.getElementById("clientToken").value,
        enabled: document.getElementById("routeEnabled").value === "true",
        notes: document.getElementById("routeNotes").value
      };

      try {
        if (state.editingId) {
          await api("/api/routes/" + state.editingId, {
            method: "PUT",
            body: JSON.stringify(payload)
          });
        } else {
          await api("/api/routes", {
            method: "POST",
            body: JSON.stringify(payload)
          });
        }
        showBanner("路由已保存", "success");
        resetEditor();
        await refresh();
      } catch (error) {
        showBanner(error.message || "保存失败", "error");
      }
    });

    document.getElementById("generateTokenBtn").addEventListener("click", function () {
      const bytes = new Uint8Array(24);
      crypto.getRandomValues(bytes);
      const base64 = btoa(String.fromCharCode.apply(null, bytes)).replaceAll("+", "-").replaceAll("/", "_").replaceAll("=", "");
      document.getElementById("clientToken").value = base64;
    });

    document.getElementById("cancelEditBtn").addEventListener("click", function () {
      resetEditor();
      showBanner("已切换到新建路由", "success");
    });

    document.getElementById("reloadBtn").addEventListener("click", function () {
      refresh().catch(function (error) {
        showBanner(error.message || "刷新失败", "error");
      });
    });

    document.getElementById("logoutBtn").addEventListener("click", function () {
      setAuthToken("");
      loginPanel.classList.remove("hidden");
      dashboardPanel.classList.add("hidden");
      editorPanel.classList.add("hidden");
      routesPanel.classList.add("hidden");
      routesContainer.replaceChildren();
      showBanner("已退出登录", "success");
    });

    if (state.token) {
      refresh().catch(function () {
        setAuthToken("");
        loginPanel.classList.remove("hidden");
        showBanner("登录令牌失效，请重新登录", "error");
      });
    } else {
      loginPanel.classList.remove("hidden");
      dashboardPanel.classList.add("hidden");
      editorPanel.classList.add("hidden");
      routesPanel.classList.add("hidden");
    }
  </script>
</body>
</html>`;
}
