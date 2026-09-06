(function () {
  function applyThemeColor(theme) {
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', theme === 'light' ? '#ffffff' : '#08080a');
  }

  try {
    var stored = localStorage.getItem('wibsity-theme');
    var theme =
      stored === 'light' || stored === 'dark'
        ? stored
        : window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
          ? 'dark'
          : 'light';
    document.documentElement.setAttribute('data-theme', theme);
    applyThemeColor(theme);
  } catch {
    document.documentElement.setAttribute('data-theme', 'dark');
    applyThemeColor('dark');
  }
}());
