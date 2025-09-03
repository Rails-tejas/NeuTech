  const root = document.documentElement;

  // Get saved theme from localStorage or default to dark
  const savedTheme = localStorage.getItem('theme') || 'dark';
  root.setAttribute('data-theme', savedTheme);

  // If toggle button exists, enable theme switching
  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    const applyTheme = (theme) => {
      root.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);
      themeToggle.innerHTML = theme === 'light'
        ? '<i class="bi bi-brightness-high me-1"></i> Theme'
        : '<i class="bi bi-moon-stars me-1"></i> Theme';
    };

    applyTheme(savedTheme);

    themeToggle.addEventListener('click', () => {
      const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      applyTheme(next);
    });
  }

