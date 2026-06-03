# 管理后台国际化（i18n）

每种语言的文案独立维护，构建时由 `index.js` 合并并注入到管理后台 HTML。

## 目录结构

```
admin_i18n/
├── locales/          # 界面文案（data-i18n、动态表格等）
│   ├── en.js
│   ├── zh-CN.js
│   ├── zh-TW.js
│   ├── ja.js
│   └── ko.js
├── login/            # 登录页专用文案
│   ├── en.js
│   └── ...
├── meta.js           # 支持的语言列表与显示名称
└── index.js          # 聚合导出、生成内联脚本
```

## 如何新增或修改翻译

1. 编辑对应语言文件，例如 `locales/zh-CN.js`。
2. 键名需与 `en.js` 保持一致（新增功能时先在 `en.js` 增加键，再同步到其他语言）。
3. 登录页文案修改 `login/<语言>.js`。
4. 新增语言：在 `locales/`、`login/` 各加文件，并更新 `meta.js` 与 `index.js` 中的 import。

## 开发说明

- `src/admin_html.js` 通过 `buildAdminI18nScript()` 注入浏览器端全局变量。
- 一次性从旧版内联翻译迁移：`node scripts/extract-admin-i18n.mjs`（仅在从旧结构迁移时使用）。
