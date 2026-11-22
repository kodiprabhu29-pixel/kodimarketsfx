(() => {
  const clock = document.getElementById('localClock');
  const date = document.getElementById('localDate');
  const timeFormatter = new Intl.DateTimeFormat('en-IN', {
    timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false
  });
  const dateFormatter = new Intl.DateTimeFormat('en-IN', {
    timeZone: 'Asia/Kolkata', weekday: 'short', day: '2-digit', month: 'short', year: 'numeric'
  });

  function updateClock() {
    const now = new Date();
    if (clock) clock.textContent = `${timeFormatter.format(now)} IST`;
    if (date) date.textContent = dateFormatter.format(now);
  }
  updateClock();
  window.setInterval(updateClock, 1000);

  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('mobileOverlay');
  const toggle = document.getElementById('menuToggle');
  const closeMenu = () => {
    sidebar?.classList.remove('open');
    overlay?.classList.remove('visible');
    toggle?.setAttribute('aria-expanded', 'false');
  };
  toggle?.addEventListener('click', () => {
    const open = sidebar?.classList.toggle('open') ?? false;
    overlay?.classList.toggle('visible', open);
    toggle.setAttribute('aria-expanded', String(open));
  });
  overlay?.addEventListener('click', closeMenu);
  document.querySelectorAll('.side-link').forEach((link) => {
    link.addEventListener('click', () => {
      document.querySelectorAll('.side-link').forEach((item) => item.classList.remove('active'));
      link.classList.add('active');
      closeMenu();
    });
  });

  const toast = document.getElementById('toast');
  let toastTimer;
  document.getElementById('refreshButton')?.addEventListener('click', () => {
    if (!toast) return;
    toast.textContent = 'No data services are configured yet. No data was fetched.';
    toast.classList.add('visible');
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => toast.classList.remove('visible'), 3200);
  });
})();
