export const bootScript = String.raw`
(function () {
  window.EasyTierAdmin = window.EasyTierAdmin || {};
  const api = window.EasyTierAdmin;

  const browserLang = navigator.language || '';
  let initialLang = 'en';
  if (browserLang.startsWith('zh-CN') || browserLang.startsWith('zh-Hans')) {
    initialLang = 'zh-CN';
  } else if (browserLang.startsWith('zh-TW') || browserLang.startsWith('zh-HK') || browserLang.startsWith('zh-Hant')) {
    initialLang = 'zh-TW';
  } else if (browserLang.startsWith('ja')) {
    initialLang = 'ja';
  } else if (browserLang.startsWith('ko')) {
    initialLang = 'ko';
  }

  const savedLang = localStorage.getItem('easytier_admin_lang');
  if (savedLang && supportedLangs.indexOf(savedLang) !== -1) {
    initialLang = savedLang;
  }

  window.currentLang = initialLang;
  window.token = localStorage.getItem('easytier_admin_token') || '';
  window.statsInterval = null;
  window.countdown = 5;
  window.globalStats = { rooms: [], totalPeers: 0, totalRx: 0, totalTx: 0 };
  window.activeSelectedRoomId = null;
  window.authCheckSeq = 0;
  window.easyTierConfigs = [];

  window.addEventListener('error', function (event) {
    console.error('Admin UI script error:', event.error || event.message);
  });

  const loginLang = document.getElementById('loginLang');
  const dashboardLang = document.getElementById('dashboardLang');
  if (loginLang) loginLang.value = window.currentLang;
  if (dashboardLang) dashboardLang.value = window.currentLang;

  api.updateUI();
  if (window.token) {
    api.verifyToken();
  } else {
    api.showLogin();
  }

  window.switchLanguage = api.switchLanguage;
  window.handleLogin = api.handleLogin;
  window.handleLogout = api.handleLogout;
  window.switchTab = api.switchTab;
  window.loadStats = api.loadStats;
  window.loadRooms = api.loadRooms;
  window.viewRoomPeers = api.viewRoomPeers;
  window.closeRoomPeers = api.closeRoomPeers;
  window.kickPeer = api.kickPeer;
  window.loadTokens = api.loadTokens;
  window.openCreateTokenModal = api.openCreateTokenModal;
  window.closeCreateTokenModal = api.closeCreateTokenModal;
  window.handleCreateToken = api.handleCreateToken;
  window.deleteToken = api.deleteToken;
  window.loadSettings = api.loadSettings;
  window.loadEasyTierConfigs = api.loadEasyTierConfigs;
  window.openEasyTierConfigModal = api.openEasyTierConfigModal;
  window.closeEasyTierConfigModal = api.closeEasyTierConfigModal;
  window.handleCreateEasyTierConfig = api.handleCreateEasyTierConfig;
  window.handleToggleRequireToken = api.handleToggleRequireToken;
  window.copyTokenWsUrl = api.copyTokenWsUrl;
  window.copyRoomWsUrl = api.copyRoomWsUrl;
  window.copyEasyTierConfigUrl = api.copyEasyTierConfigUrl;
  window.copyEasyTierCommand = api.copyEasyTierCommand;
  window.deleteEasyTierConfig = api.deleteEasyTierConfig;
})();
`;
