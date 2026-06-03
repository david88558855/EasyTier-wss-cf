import en from "./locales/en.js";
import zhCN from "./locales/zh-CN.js";
import zhTW from "./locales/zh-TW.js";
import ja from "./locales/ja.js";
import ko from "./locales/ko.js";
import loginEn from "./login/en.js";
import loginZhCN from "./login/zh-CN.js";
import loginZhTW from "./login/zh-TW.js";
import loginJa from "./login/ja.js";
import loginKo from "./login/ko.js";
import { supportedLangs, languageNames } from "./meta.js";

/** @type {Record<string, Record<string, string>>} */
export const translations = {
  en,
  "zh-CN": zhCN,
  "zh-TW": zhTW,
  ja,
  ko,
};

export const loginCopy = {
  en: loginEn,
  "zh-CN": loginZhCN,
  "zh-TW": loginZhTW,
  ja: loginJa,
  ko: loginKo,
};

export { supportedLangs, languageNames };

/**
 * 注入到管理后台 HTML 的内联 i18n 脚本（浏览器端全局变量）。
 */
export function buildAdminI18nScript() {
  const indent = "        ";
  return [
    `${indent}const translations = ${JSON.stringify(translations, null, 4)};`,
    `${indent}const supportedLangs = ${JSON.stringify(supportedLangs)};`,
    `${indent}const languageNames = ${JSON.stringify(languageNames, null, 4)};`,
    `${indent}const loginCopy = ${JSON.stringify(loginCopy, null, 4)};`,
    `${indent}let currentLang = 'en';`,
  ].join("\n");
}
