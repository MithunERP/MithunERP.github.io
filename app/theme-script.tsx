// Runs before paint (inline in <head>) so the theme is correct on first
// frame — no light/dark flash. Priority: saved choice > system preference.
const THEME_INIT_SCRIPT = `
(function () {
  try {
    var saved = localStorage.getItem("mithunerp-theme");
    var theme = saved || (window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
    document.documentElement.setAttribute("data-theme", theme);
  } catch (e) {}
})();
`;

export default function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />;
}
