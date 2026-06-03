import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const file = path.join(__dirname, "../src/admin_html.js");
let html = fs.readFileSync(file, "utf8");

if (!html.startsWith("import { buildAdminI18nScript }")) {
  html = html.replace(
    "export const serveAdminDashboard = `<!DOCTYPE html>",
    'import { buildAdminI18nScript } from "./admin_i18n/index.js";\n\nexport const serveAdminDashboard = `<!DOCTYPE html>',
  );
}

const scriptStart = "    <!-- Translations & Dashboard JS Logic -->";
const scriptEnd = "        function safeCreateIcons()";
const i = html.indexOf(scriptStart);
const j = html.indexOf(scriptEnd);
if (i < 0 || j < 0) throw new Error("markers not found for translations block");

html =
  html.slice(0, i) +
  `    <!-- Translations: src/admin_i18n/locales/*.js -->
    <script>
\${buildAdminI18nScript()}

        function safeCreateIcons()` +
  html.slice(j + "        function safeCreateIcons()".length);

const dupStart = "        let currentLang = 'en';\n        const supportedLangs";
const dupEnd = "        };\n        </script>\n    <script src=\"/assets/admin/shared.js\"";
const a = html.indexOf(dupStart);
const b = html.indexOf(dupEnd);
if (a >= 0 && b >= 0) {
  html = html.slice(0, a) + "        </script>\n    <script src=\"/assets/admin/shared.js\"" + html.slice(b + dupEnd.length - '    <script src="/assets/admin/shared.js"'.length);
}

fs.writeFileSync(file, html, "utf8");
console.log("patched admin_html.js");
