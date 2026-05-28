export function renderAdminPage(appName = "EasyTier WSS CF") {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${appName}</title>
  <style>
    :root {
      color-scheme: light;
      --bg: #f6f8fb;
      --card: rgba(255, 255, 255, 0.88);
      --card-strong: rgba(255, 255, 255, 0.98);
      --line: rgba(15, 23, 42, 0.08);
      --text: #0f172a;
      --muted: #64748b;
      --blue: #2563eb;
      --blue-soft: #eaf2ff;
      --green: #0f9d58;
      --red: #b91c1c;
      --shadow: 0 18px 50px rgba(15, 23, 42, 0.08);
      --radius: 18px;
    }

    * { box-sizing: border-box; }
    body {
      margin: 0;
      background: radial-gradient(circle at top, rgba(37, 99, 235, 0.08), transparent 28%), var(--bg);
      color: var(--text);
      font: 14px/1.5 -apple-system, BlinkMacSystemFont, "SF Pro Text", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif;
    }
    .wrap { max-width: 1120px; margin: 0 auto; padding: 24px; }
    header {
      display: flex; justify-content: space-between; gap: 16px; align-items: center;
      margin-bottom: 18px;
    }
    .title { margin: 0; font-size: 30px; letter-spacing: -0.04em; line-height: 1.05; }
    .subtitle { color: var(--muted); margin-top: 6px; }
    .toolbar { display: flex; gap: 10px; align-items: center; flex-wrap: wrap; }
    .card {
      background: var(--card);
      border: 1px solid var(--line);
      border-radius: var(--radius);
      padding: 18px;
      margin-bottom: 16px;
      box-shadow: var(--shadow);
      backdrop-filter: blur(16px);
    }
    .row { display: flex; gap: 12px; flex-wrap: wrap; }
    .grid { display: grid; grid-template-columns: repeat(12, minmax(0, 1fr)); gap: 12px; }
    .span-6 { grid-column: span 6; }
    .span-12 { grid-column: span 12; }
    @media (max-width: 920px) {
      .span-6 { grid-column: span 12; }
      header { flex-direction: column; align-items: stretch; }
    }
    input, textarea, select, button {
      font: inherit;
    }
    label { display: block; margin-bottom: 6px; color: var(--muted); font-size: 13px; }
    input, textarea, select {
      width: 100%;
      border: 1px solid rgba(15, 23, 42, 0.12);
      border-radius: 14px;
      padding: 11px 12px;
      background: rgba(255, 255, 255, 0.98);
      color: var(--text);
      outline: none;
      transition: border-color .2s ease, box-shadow .2s ease;
    }
    input:focus, textarea:focus, select:focus {
      border-color: rgba(37, 99, 235, 0.45);
      box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.10);
    }
    textarea { min-height: 88px; resize: vertical; }
    button {
      border: 0;
      border-radius: 14px;
      padding: 10px 14px;
      cursor: pointer;
      transition: transform .2s ease, opacity .2s ease, background .2s ease;
    }
    button:hover { transform: translateY(-1px); }
    .primary { background: linear-gradient(145deg, var(--blue), #1d4ed8); color: #fff; }
    .secondary { background: var(--blue-soft); color: #1d4ed8; }
    .danger { background: #fef2f2; color: var(--red); }
    .badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      border-radius: 999px;
      padding: 6px 10px;
      font-size: 12px;
      background: #eef2ff;
      color: #4338ca;
      margin-right: 8px;
    }
    .badge.good { background: #ecfdf5; color: #15803d; }
    .badge.bad { background: #fef2f2; color: #b91c1c; }
    .hidden { display: none !important; }
    pre {
      margin: 0;
      white-space: pre-wrap;
      word-break: break-word;
      background: #0f172a;
      color: #e2e8f0;
      padding: 12px;
      border-radius: 14px;
      line-height: 1.6;
    }
    .stat {
      min-width: 150px;
      background: rgba(248, 251, 255, 0.95);
      border: 1px solid rgba(219, 234, 254, 0.9);
      border-radius: 16px;
      padding: 14px;
    }
    .stat strong { display: block; font-size: 24px; line-height: 1; margin-bottom: 4px; }
    .stat span { color: var(--muted); font-size: 13px; }
    .routes { display: grid; gap: 12px; }
    .route { border: 1px solid var(--line); border-radius: 18px; padding: 16px; background: var(--card-strong); }
    .route-top { display: flex; justify-content: space-between; gap: 12px; flex-wrap: wrap; }
    .fields { display: grid; gap: 10px; margin-top: 12px; }
    .actions { display: flex; gap: 10px; flex-wrap: wrap; margin-top: 12px; }
    .notice {
      padding: 12px 14px;
      border-radius: 14px;
      margin-bottom: 16px;
      background: #eff6ff;
      color: #1d4ed8;
      border: 1px solid #dbeafe;
    }
    .notice.error {
      background: #fef2f2;
      color: #b91c1c;
      border-color: #fecaca;
    }
    .section-title {
      margin: 0 0 4px;
      font-size: 18px;
      letter-spacing: -0.03em;
    }
    .muted { color: var(--muted); }
    .select-shell {
      display: flex;
      align-items: center;
      gap: 10px;
      background: rgba(255,255,255,.85);
      border: 1px solid var(--line);
      padding: 8px 10px;
      border-radius: 999px;
      box-shadow: 0 8px 24px rgba(15, 23, 42, 0.05);
    }
    .select-shell select {
      border: 0;
      background: transparent;
      padding: 0 4px;
      min-width: 140px;
      box-shadow: none !important;
    }
    .small { font-size: 13px; }
  </style>
</head>
<body>
  <div class="wrap">
    <header>
      <div>
        <h1 class="title">${appName}</h1>
        <div id="subtitle" class="subtitle">Standalone EasyTier WSS on Cloudflare Workers</div>
      </div>
      <div class="toolbar">
        <div class="select-shell">
          <span class="small muted" id="languageLabel">Language</span>
          <select id="localeSelect" aria-label="Language"></select>
        </div>
        <button id="reloadBtn" class="secondary" type="button">Refresh</button>
        <button id="logoutBtn" class="danger" type="button">Logout</button>
      </div>
    </header>

    <div id="banner" class="notice hidden"></div>

    <div id="loginCard" class="card">
      <h2 class="section-title" id="loginTitle">Login</h2>
      <p id="loginHint" class="muted">Use <code>ADMIN_PASSWORD</code> to sign in. For compatibility, <code>ADMIN_SECRET</code> is also accepted.</p>
      <form id="loginForm" class="grid">
        <div class="span-6">
          <label id="passwordLabel" for="password">Password</label>
          <input id="password" type="password" placeholder="ADMIN_PASSWORD" />
        </div>
        <div class="span-6" style="display:flex; align-items:end;">
          <button id="loginBtn" class="primary" type="submit">Login</button>
        </div>
      </form>
    </div>

    <div id="dashboardCard" class="card hidden">
      <div class="row">
        <div class="stat"><strong id="activeConnections">0</strong><span id="activeConnectionsLabel">Active connections</span></div>
        <div class="stat"><strong id="totalConnections">0</strong><span id="totalConnectionsLabel">Total connections</span></div>
        <div class="stat"><strong id="routeCount">0</strong><span id="routeCountLabel">Routes</span></div>
      </div>
    </div>

    <div id="editorCard" class="card hidden">
      <div class="row" style="justify-content:space-between; align-items:flex-start;">
        <div>
          <h2 id="editorTitle" class="section-title" style="margin-bottom:6px;">New route</h2>
          <div id="publicEntryHint" class="muted">Public entry: <code>wss://&lt;your-domain&gt;/ws/&lt;route-id&gt;/&lt;client-token&gt;</code></div>
        </div>
        <button id="cancelEditBtn" class="secondary" type="button">Cancel</button>
      </div>
      <form id="routeForm" class="grid" style="margin-top: 16px;">
        <input id="routeId" type="hidden" />
        <div class="span-6"><label id="nameLabel" for="routeName">Name</label><input id="routeName" placeholder="Tokyo relay" /></div>
        <div class="span-6"><label id="networkNameLabel" for="networkName">network-name</label><input id="networkName" placeholder="my-network" /></div>
        <div class="span-6"><label id="networkSecretLabel" for="networkSecret">network-secret</label><input id="networkSecret" placeholder="super-secret" /></div>
        <div class="span-6"><label id="clientTokenLabel" for="clientToken">client token</label><input id="clientToken" placeholder="auto generated" /></div>
        <div class="span-6"><label id="statusLabel" for="routeEnabled">Status</label><select id="routeEnabled"><option value="true">Enabled</option><option value="false">Disabled</option></select></div>
        <div class="span-12"><label id="notesLabel" for="routeNotes">Notes</label><textarea id="routeNotes" placeholder="Optional notes"></textarea></div>
        <div class="span-12 row">
          <button id="saveBtn" class="primary" type="submit">Save</button>
          <button id="generateTokenBtn" class="secondary" type="button">Generate token</button>
        </div>
      </form>
    </div>

    <div id="routesCard" class="card hidden">
      <div class="row" style="justify-content:space-between; align-items:center;">
        <h2 id="routesTitle" class="section-title" style="margin:0;">Routes</h2>
      </div>
      <div id="routes" class="routes" style="margin-top: 14px;"></div>
    </div>
  </div>

  <script>
    const TOKEN_KEY = "easytier-wss-cf-admin-token";
    const LOCALE_KEY = "easytier-wss-cf-admin-locale";
    const LOCALES = {
      en: {
        localeName: "English",
        subtitle: "Standalone EasyTier WSS on Cloudflare Workers",
        language: "Language",
        refresh: "Refresh",
        logout: "Logout",
        loginTitle: "Login",
        loginHint: "Use ADMIN_PASSWORD to sign in. For compatibility, ADMIN_SECRET is also accepted.",
        password: "Password",
        login: "Login",
        activeConnections: "Active connections",
        totalConnections: "Total connections",
        routes: "Routes",
        newRoute: "New route",
        editRoute: "Edit route",
        publicEntry: "Public entry",
        name: "Name",
        networkName: "network-name",
        networkSecret: "network-secret",
        clientToken: "client token",
        status: "Status",
        notes: "Notes",
        save: "Save",
        cancel: "Cancel",
        generateToken: "Generate token",
        enabled: "Enabled",
        disabled: "Disabled",
        copyEntry: "Copy entry",
        copyCommand: "Copy command",
        validate: "Validate",
        edit: "Edit",
        delete: "Delete",
        copied: "Copied",
        copyFailed: "Copy failed",
        loggedIn: "Logged in",
        loginFailed: "Login failed",
        saved: "Saved",
        saveFailed: "Save failed",
        refreshFailed: "Refresh failed",
        loggedOut: "Logged out",
        sessionExpired: "Session expired, please log in again",
        configLooksGood: "Configuration looks good",
        validationFailed: "Validation failed",
        routeIdPrefix: "id: ",
        routeMetaCreated: "created: ",
        activeWithTotal: "active {active} / total {total}",
        deleteConfirm: "Delete this route?",
        routeDisabled: "Disabled",
        routeEnabled: "Enabled",
        lastError: "last error",
        publicEntryHint: "Public entry",
        labelLanguage: "Language"
      },
      "zh-Hans": {
        localeName: "简体中文",
        subtitle: "运行在 Cloudflare Workers 上的独立 EasyTier WSS",
        language: "语言",
        refresh: "刷新",
        logout: "退出",
        loginTitle: "登录",
        loginHint: "使用 ADMIN_PASSWORD 登录；为兼容旧配置，也支持 ADMIN_SECRET。",
        password: "密码",
        login: "登录",
        activeConnections: "当前连接",
        totalConnections: "累计连接",
        routes: "路由",
        newRoute: "新建路由",
        editRoute: "编辑路由",
        publicEntry: "公用入口",
        name: "名称",
        networkName: "network-name",
        networkSecret: "network-secret",
        clientToken: "client token",
        status: "状态",
        notes: "备注",
        save: "保存",
        cancel: "取消",
        generateToken: "生成 token",
        enabled: "启用",
        disabled: "禁用",
        copyEntry: "复制入口",
        copyCommand: "复制命令",
        validate: "验证",
        edit: "编辑",
        delete: "删除",
        copied: "已复制",
        copyFailed: "复制失败",
        loggedIn: "登录成功",
        loginFailed: "登录失败",
        saved: "已保存",
        saveFailed: "保存失败",
        refreshFailed: "刷新失败",
        loggedOut: "已退出",
        sessionExpired: "会话已过期，请重新登录",
        configLooksGood: "配置正常",
        validationFailed: "验证失败",
        routeIdPrefix: "id：",
        routeMetaCreated: "创建于：",
        activeWithTotal: "当前 {active} / 累计 {total}",
        deleteConfirm: "确定删除这条路由吗？",
        routeDisabled: "已禁用",
        routeEnabled: "已启用",
        lastError: "最近错误",
        publicEntryHint: "公用入口",
        labelLanguage: "语言"
      },
      "zh-Hant": {
        localeName: "繁體中文",
        subtitle: "運行於 Cloudflare Workers 的獨立 EasyTier WSS",
        language: "語言",
        refresh: "重新整理",
        logout: "登出",
        loginTitle: "登入",
        loginHint: "使用 ADMIN_PASSWORD 登入；為了相容舊設定，也支援 ADMIN_SECRET。",
        password: "密碼",
        login: "登入",
        activeConnections: "目前連線",
        totalConnections: "累計連線",
        routes: "路由",
        newRoute: "新增路由",
        editRoute: "編輯路由",
        publicEntry: "公開入口",
        name: "名稱",
        networkName: "network-name",
        networkSecret: "network-secret",
        clientToken: "client token",
        status: "狀態",
        notes: "備註",
        save: "儲存",
        cancel: "取消",
        generateToken: "產生 token",
        enabled: "啟用",
        disabled: "停用",
        copyEntry: "複製入口",
        copyCommand: "複製指令",
        validate: "驗證",
        edit: "編輯",
        delete: "刪除",
        copied: "已複製",
        copyFailed: "複製失敗",
        loggedIn: "登入成功",
        loginFailed: "登入失敗",
        saved: "已儲存",
        saveFailed: "儲存失敗",
        refreshFailed: "重新整理失敗",
        loggedOut: "已登出",
        sessionExpired: "工作階段已過期，請重新登入",
        configLooksGood: "設定正常",
        validationFailed: "驗證失敗",
        routeIdPrefix: "id：",
        routeMetaCreated: "建立於：",
        activeWithTotal: "目前 {active} / 累計 {total}",
        deleteConfirm: "確定要刪除這條路由嗎？",
        routeDisabled: "已停用",
        routeEnabled: "已啟用",
        lastError: "最近錯誤",
        publicEntryHint: "公開入口",
        labelLanguage: "語言"
      },
      ja: {
        localeName: "日本語",
        subtitle: "Cloudflare Workers 上で動作する独立型 EasyTier WSS",
        language: "言語",
        refresh: "更新",
        logout: "ログアウト",
        loginTitle: "ログイン",
        loginHint: "ADMIN_PASSWORD でログインします。互換性のため ADMIN_SECRET も利用できます。",
        password: "パスワード",
        login: "ログイン",
        activeConnections: "現在の接続",
        totalConnections: "累計接続",
        routes: "ルート",
        newRoute: "新しいルート",
        editRoute: "ルートを編集",
        publicEntry: "公開エントリ",
        name: "名前",
        networkName: "network-name",
        networkSecret: "network-secret",
        clientToken: "client token",
        status: "状態",
        notes: "メモ",
        save: "保存",
        cancel: "キャンセル",
        generateToken: "token を生成",
        enabled: "有効",
        disabled: "無効",
        copyEntry: "エントリをコピー",
        copyCommand: "コマンドをコピー",
        validate: "検証",
        edit: "編集",
        delete: "削除",
        copied: "コピーしました",
        copyFailed: "コピーに失敗しました",
        loggedIn: "ログインしました",
        loginFailed: "ログインに失敗しました",
        saved: "保存しました",
        saveFailed: "保存に失敗しました",
        refreshFailed: "更新に失敗しました",
        loggedOut: "ログアウトしました",
        sessionExpired: "セッションの有効期限が切れました。再度ログインしてください。",
        configLooksGood: "設定は正常です",
        validationFailed: "検証に失敗しました",
        routeIdPrefix: "id: ",
        routeMetaCreated: "作成日時: ",
        activeWithTotal: "現在 {active} / 合計 {total}",
        deleteConfirm: "このルートを削除しますか？",
        routeDisabled: "無効",
        routeEnabled: "有効",
        lastError: "最新エラー",
        publicEntryHint: "公開エントリ",
        labelLanguage: "言語"
      },
      ko: {
        localeName: "한국어",
        subtitle: "Cloudflare Workers에서 동작하는 독립형 EasyTier WSS",
        language: "언어",
        refresh: "새로고침",
        logout: "로그아웃",
        loginTitle: "로그인",
        loginHint: "ADMIN_PASSWORD로 로그인합니다. 호환을 위해 ADMIN_SECRET도 지원합니다.",
        password: "비밀번호",
        login: "로그인",
        activeConnections: "현재 연결",
        totalConnections: "누적 연결",
        routes: "라우트",
        newRoute: "새 라우트",
        editRoute: "라우트 편집",
        publicEntry: "공개 엔트리",
        name: "이름",
        networkName: "network-name",
        networkSecret: "network-secret",
        clientToken: "client token",
        status: "상태",
        notes: "메모",
        save: "저장",
        cancel: "취소",
        generateToken: "token 생성",
        enabled: "활성",
        disabled: "비활성",
        copyEntry: "엔트리 복사",
        copyCommand: "명령 복사",
        validate: "검증",
        edit: "편집",
        delete: "삭제",
        copied: "복사됨",
        copyFailed: "복사 실패",
        loggedIn: "로그인 완료",
        loginFailed: "로그인 실패",
        saved: "저장됨",
        saveFailed: "저장 실패",
        refreshFailed: "새로고침 실패",
        loggedOut: "로그아웃됨",
        sessionExpired: "세션이 만료되었습니다. 다시 로그인하세요.",
        configLooksGood: "설정이 정상입니다",
        validationFailed: "검증 실패",
        routeIdPrefix: "id: ",
        routeMetaCreated: "생성일: ",
        activeWithTotal: "현재 {active} / 누적 {total}",
        deleteConfirm: "이 라우트를 삭제할까요?",
        routeDisabled: "비활성",
        routeEnabled: "활성",
        lastError: "최근 오류",
        publicEntryHint: "공개 엔트리",
        labelLanguage: "언어"
      }
    };

    const state = {
      token: localStorage.getItem(TOKEN_KEY) || "",
      locale: detectLocale(),
      editingId: "",
      lastData: null
    };

    const banner = document.getElementById("banner");
    const loginCard = document.getElementById("loginCard");
    const dashboardCard = document.getElementById("dashboardCard");
    const editorCard = document.getElementById("editorCard");
    const routesCard = document.getElementById("routesCard");
    const routes = document.getElementById("routes");
    const editorTitle = document.getElementById("editorTitle");
    const localeSelect = document.getElementById("localeSelect");

    function detectLocale() {
      const saved = localStorage.getItem(LOCALE_KEY);
      if (saved && LOCALES[saved]) return saved;
      const language = (navigator.language || "en").toLowerCase();
      if (language.startsWith("zh-tw") || language.startsWith("zh-hk") || language.startsWith("zh-mo")) return "zh-Hant";
      if (language.startsWith("zh")) return "zh-Hans";
      if (language.startsWith("ja")) return "ja";
      if (language.startsWith("ko")) return "ko";
      return "en";
    }

    function t(key) {
      return LOCALES[state.locale][key] ?? LOCALES.en[key] ?? key;
    }

    function interpolate(template, values) {
      return template.replace(/\{(\w+)\}/g, (_, name) => String(values[name] ?? ""));
    }

    function showBanner(message, error = false) {
      banner.textContent = message;
      banner.className = error ? "notice error" : "notice";
      banner.classList.remove("hidden");
      clearTimeout(showBanner.timer);
      showBanner.timer = setTimeout(() => banner.classList.add("hidden"), 3500);
    }

    function authHeaders() {
      return state.token ? { Authorization: "Bearer " + state.token } : {};
    }

    async function api(path, options = {}) {
      const response = await fetch(path, {
        headers: { "Content-Type": "application/json", ...authHeaders(), ...(options.headers || {}) },
        ...options,
      });
      if (!response.ok) throw new Error(await response.text());
      if (response.status === 204) return null;
      return await response.json();
    }

    function setToken(token) {
      state.token = token || "";
      if (token) localStorage.setItem(TOKEN_KEY, token);
      else localStorage.removeItem(TOKEN_KEY);
    }

    function setLocale(locale) {
      if (!LOCALES[locale]) return;
      state.locale = locale;
      localStorage.setItem(LOCALE_KEY, locale);
      document.documentElement.lang = locale === "zh-Hans" ? "zh-CN" : locale === "zh-Hant" ? "zh-TW" : locale;
      applyLocale();
      if (state.lastData) {
        render(state.lastData);
      }
    }

    function applyLocale() {
      document.title = "${appName}";
      document.getElementById("subtitle").textContent = t("subtitle");
      document.getElementById("languageLabel").textContent = t("labelLanguage");
      document.getElementById("reloadBtn").textContent = t("refresh");
      document.getElementById("logoutBtn").textContent = t("logout");
      document.getElementById("loginTitle").textContent = t("loginTitle");
      document.getElementById("loginHint").textContent = t("loginHint");
      document.getElementById("passwordLabel").textContent = t("password");
      document.getElementById("password").placeholder = "ADMIN_PASSWORD";
      document.getElementById("loginBtn").textContent = t("login");
      document.getElementById("activeConnectionsLabel").textContent = t("activeConnections");
      document.getElementById("totalConnectionsLabel").textContent = t("totalConnections");
      document.getElementById("routeCountLabel").textContent = t("routes");
      document.getElementById("nameLabel").textContent = t("name");
      document.getElementById("networkNameLabel").textContent = t("networkName");
      document.getElementById("networkSecretLabel").textContent = t("networkSecret");
      document.getElementById("clientTokenLabel").textContent = t("clientToken");
      document.getElementById("statusLabel").textContent = t("status");
      document.getElementById("notesLabel").textContent = t("notes");
      document.getElementById("saveBtn").textContent = t("save");
      document.getElementById("cancelEditBtn").textContent = t("cancel");
      document.getElementById("generateTokenBtn").textContent = t("generateToken");
      document.getElementById("routeEnabled").innerHTML = '<option value="true">' + t("enabled") + '</option><option value="false">' + t("disabled") + '</option>';
      document.getElementById("routesTitle").textContent = t("routes");
      document.getElementById("publicEntryHint").textContent = t("publicEntry") + ": wss://<your-domain>/ws/<route-id>/<client-token>";

      const localeOrder = ["en", "zh-Hans", "zh-Hant", "ja", "ko"];
      localeSelect.replaceChildren(
        ...localeOrder.map((locale) => {
          const option = document.createElement("option");
          option.value = locale;
          option.textContent = LOCALES[locale].localeName;
          return option;
        }),
      );
      localeSelect.value = state.locale;
    }

    function setEditor(route) {
      state.editingId = route?.id || "";
      document.getElementById("routeId").value = route?.id || "";
      document.getElementById("routeName").value = route?.name || "";
      document.getElementById("networkName").value = route?.networkName || "";
      document.getElementById("networkSecret").value = route?.networkSecret || "";
      document.getElementById("clientToken").value = route?.clientToken || "";
      document.getElementById("routeEnabled").value = route?.enabled === false ? "false" : "true";
      document.getElementById("routeNotes").value = route?.notes || "";
      editorTitle.textContent = route?.id ? t("editRoute") : t("newRoute");
      editorCard.classList.remove("hidden");
    }

    function resetEditor() {
      setEditor(null);
      state.editingId = "";
      editorTitle.textContent = t("newRoute");
    }

    function field(label, value) {
      const wrap = document.createElement("div");
      const caption = document.createElement("div");
      caption.className = "muted";
      caption.style.marginBottom = "4px";
      caption.textContent = label;
      const pre = document.createElement("pre");
      pre.textContent = value || "";
      wrap.appendChild(caption);
      wrap.appendChild(pre);
      return wrap;
    }

    function copy(value) {
      navigator.clipboard.writeText(value).then(() => showBanner(t("copied"))).catch(() => showBanner(t("copyFailed"), true));
    }

    function renderRoute(route) {
      const box = document.createElement("div");
      box.className = "route";

      const top = document.createElement("div");
      top.className = "route-top";
      const topLeft = document.createElement("div");
      const name = document.createElement("div");
      name.style.fontSize = "18px";
      name.style.fontWeight = "700";
      name.style.letterSpacing = "-0.03em";
      name.textContent = route.name || route.id;
      const meta = document.createElement("div");
      meta.className = "muted";
      meta.textContent = t("routeIdPrefix") + route.id + " · " + t("routeMetaCreated") + route.createdAt;
      topLeft.appendChild(name);
      topLeft.appendChild(meta);

      const topRight = document.createElement("div");
      const status = document.createElement("span");
      status.className = "badge " + (route.enabled ? "good" : "bad");
      status.textContent = route.enabled ? t("routeEnabled") : t("routeDisabled");
      const counts = document.createElement("span");
      counts.className = "badge";
      counts.textContent = interpolate(t("activeWithTotal"), {
        active: route.stats.activeConnections,
        total: route.stats.totalConnections,
      });
      topRight.appendChild(status);
      topRight.appendChild(counts);
      top.appendChild(topLeft);
      top.appendChild(topRight);

      const fields = document.createElement("div");
      fields.className = "fields";
      fields.appendChild(field(t("publicEntry"), route.publicWsUrl));
      fields.appendChild(field("EasyTier command", route.easyTierCommand));
      fields.appendChild(field(t("networkName"), route.networkName));
      fields.appendChild(field(t("networkSecret"), route.networkSecret));
      fields.appendChild(field(t("clientToken"), route.clientToken));
      fields.appendChild(field(t("notes"), route.notes));
      fields.appendChild(field(t("lastError"), route.stats.lastError || "-"));

      const actions = document.createElement("div");
      actions.className = "actions";
      actions.innerHTML = [
        '<button class="secondary" type="button"></button>',
        '<button class="secondary" type="button"></button>',
        '<button class="secondary" type="button"></button>',
        '<button class="primary" type="button"></button>',
        '<button class="danger" type="button"></button>',
      ].join("");
      const [copyEntryBtn, copyCmdBtn, validateBtn, editBtn, deleteBtn] = actions.querySelectorAll("button");
      copyEntryBtn.textContent = t("copyEntry");
      copyCmdBtn.textContent = t("copyCommand");
      validateBtn.textContent = t("validate");
      editBtn.textContent = t("edit");
      deleteBtn.textContent = t("delete");
      copyEntryBtn.onclick = () => copy(route.publicWsUrl);
      copyCmdBtn.onclick = () => copy(route.easyTierCommand);
      validateBtn.onclick = async () => {
        validateBtn.disabled = true;
        try {
          await api("/api/routes/" + route.id + "/test", { method: "POST" });
          showBanner(t("configLooksGood"));
        } catch (error) {
          showBanner(error.message || t("validationFailed"), true);
        } finally {
          validateBtn.disabled = false;
        }
      };
      editBtn.onclick = () => setEditor(route);
      deleteBtn.onclick = async () => {
        if (!confirm(t("deleteConfirm"))) return;
        await api("/api/routes/" + route.id, { method: "DELETE" });
        await refresh();
      };

      box.appendChild(top);
      box.appendChild(fields);
      box.appendChild(actions);
      return box;
    }

    function render(data) {
      state.lastData = data;
      dashboardCard.classList.remove("hidden");
      editorCard.classList.remove("hidden");
      routesCard.classList.remove("hidden");
      loginCard.classList.add("hidden");
      document.getElementById("activeConnections").textContent = data.summary.activeConnections;
      document.getElementById("totalConnections").textContent = data.summary.totalConnections;
      document.getElementById("routeCount").textContent = data.routes.length;
      routes.replaceChildren(...data.routes.map(renderRoute));
      editorTitle.textContent = state.editingId ? t("editRoute") : t("newRoute");
    }

    async function refresh() {
      const data = await api("/api/state", { method: "GET" });
      render(data);
    }

    function setLoggedOutView() {
      loginCard.classList.remove("hidden");
      dashboardCard.classList.add("hidden");
      editorCard.classList.add("hidden");
      routesCard.classList.add("hidden");
      routes.replaceChildren();
    }

    document.getElementById("loginForm").addEventListener("submit", async (event) => {
      event.preventDefault();
      try {
        const resp = await api("/api/login", {
          method: "POST",
          body: JSON.stringify({ password: document.getElementById("password").value }),
        });
        setToken(resp.token);
        document.getElementById("password").value = "";
        showBanner(t("loggedIn"));
        await refresh();
      } catch (error) {
        showBanner(error.message || t("loginFailed"), true);
      }
    });

    document.getElementById("routeForm").addEventListener("submit", async (event) => {
      event.preventDefault();
      const payload = {
        name: document.getElementById("routeName").value,
        networkName: document.getElementById("networkName").value,
        networkSecret: document.getElementById("networkSecret").value,
        clientToken: document.getElementById("clientToken").value,
        enabled: document.getElementById("routeEnabled").value === "true",
        notes: document.getElementById("routeNotes").value,
      };
      try {
        if (state.editingId) {
          await api("/api/routes/" + state.editingId, { method: "PUT", body: JSON.stringify(payload) });
        } else {
          await api("/api/routes", { method: "POST", body: JSON.stringify(payload) });
        }
        resetEditor();
        showBanner(t("saved"));
        await refresh();
      } catch (error) {
        showBanner(error.message || t("saveFailed"), true);
      }
    });

    document.getElementById("generateTokenBtn").addEventListener("click", () => {
      const bytes = new Uint8Array(24);
      crypto.getRandomValues(bytes);
      const token = btoa(String.fromCharCode(...bytes)).replaceAll("+", "-").replaceAll("/", "_").replaceAll("=", "");
      document.getElementById("clientToken").value = token;
    });

    document.getElementById("cancelEditBtn").addEventListener("click", () => resetEditor());
    document.getElementById("reloadBtn").addEventListener("click", () => refresh().catch((error) => showBanner(error.message || t("refreshFailed"), true)));
    document.getElementById("logoutBtn").addEventListener("click", () => {
      setToken("");
      state.lastData = null;
      setLoggedOutView();
      showBanner(t("loggedOut"));
    });

    localeSelect.addEventListener("change", () => setLocale(localeSelect.value));

    applyLocale();
    document.getElementById("routeEnabled").innerHTML = '<option value="true">' + t("enabled") + '</option><option value="false">' + t("disabled") + '</option>';
    document.getElementById("editorTitle").textContent = t("newRoute");
    document.documentElement.lang = state.locale === "zh-Hans" ? "zh-CN" : state.locale === "zh-Hant" ? "zh-TW" : state.locale;

    if (state.token) {
      refresh().catch(() => {
        setToken("");
        setLoggedOutView();
        showBanner(t("sessionExpired"), true);
      });
    }
  </script>
</body>
</html>`;
}
