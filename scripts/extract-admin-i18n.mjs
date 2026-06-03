import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const html = fs.readFileSync(path.join(root, "src/admin_html.js"), "utf8");

const beforeSafeIcons = html.split("function safeCreateIcons")[0];
const tAnchor = beforeSafeIcons.lastIndexOf("const translations = {");
if (tAnchor < 0) throw new Error("translations block not found");
const tEnd = beforeSafeIcons.lastIndexOf("};");
const tSrc = beforeSafeIcons.slice(tAnchor + "const translations = ".length, tEnd + 1);
// eslint-disable-next-line no-eval
const translations = eval("(" + tSrc + ")");

const afterTranslations = html.slice(tEnd);
const lAnchor = afterTranslations.indexOf("const loginCopy = {");
if (lAnchor < 0) throw new Error("loginCopy block not found");
const loginSection = afterTranslations.slice(lAnchor);
const lEnd = loginSection.indexOf("};");
const lSrc = loginSection.slice("const loginCopy = ".length, lEnd + 1);
// eslint-disable-next-line no-eval
const loginCopy = eval("(" + lSrc + ")");

const localesDir = path.join(root, "src/admin_i18n/locales");
const loginDir = path.join(root, "src/admin_i18n/login");
fs.mkdirSync(localesDir, { recursive: true });
fs.mkdirSync(loginDir, { recursive: true });

const langs = ["en", "zh-CN", "zh-TW", "ja", "ko"];

for (const lang of langs) {
  const localeFile = path.join(localesDir, `${lang}.js`);
  fs.writeFileSync(
    localeFile,
    `/** EasyTier Admin UI — ${lang} */\nexport default ${JSON.stringify(translations[lang], null, 2)};\n`,
    "utf8",
  );
  const loginFile = path.join(loginDir, `${lang}.js`);
  fs.writeFileSync(
    loginFile,
    `/** EasyTier Admin login — ${lang} */\nexport default ${JSON.stringify(loginCopy[lang], null, 2)};\n`,
    "utf8",
  );
}

const metaPath = path.join(root, "src/admin_i18n/meta.js");
fs.writeFileSync(
  metaPath,
  `/** Supported languages and display names */
export const supportedLangs = ${JSON.stringify(langs)};

export const languageNames = {
  en: "English",
  "zh-CN": "简体中文",
  "zh-TW": "繁體中文",
  ja: "日本語",
  ko: "한국어",
};
`,
  "utf8",
);

console.log("Wrote", langs.length, "locale files to src/admin_i18n/");
