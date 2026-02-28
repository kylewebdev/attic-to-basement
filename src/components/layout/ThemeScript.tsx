export default function ThemeScript() {
  const script = `
(function() {
  try {
    var theme = localStorage.getItem('theme');
    if (theme === 'dark' || !theme) {
      document.documentElement.classList.add('dark');
    }
  } catch (e) {
    document.documentElement.classList.add('dark');
  }
})();
`;

  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
