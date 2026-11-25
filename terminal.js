(() => {
  'use strict';

  // Provider adapter seam: set a same-origin or trusted API base URL when available.
  // The terminal intentionally makes no requests and renders no fabricated prices by default.
  const DATA_CONFIG = Object.freeze({ apiBaseUrl: '' });
  const symbols = new Set(['XAUUSD', 'EURUSD', 'DXY', 'US10Y', 'NIFTY']);
  const clock = document.getElementById('localClock');
  const date = document.getElementById('localDate');
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('mobileOverlay');
  const menuToggle = document.getElementById('menuToggle');
  const toast = document.getElementById('toast');
  const instrumentSelect = document.getElementById('instrumentSelect');
  const chartTitle = document.getElementById('chartEmptyTitle');
  let toastTimer;
  let selectedTimeframe = '1D';

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

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('visible');
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => toast.classList.remove('visible'), 3200);
  }

  function closeMenu() {
    sidebar?.classList.remove('open');
    overlay?.classList.remove('visible');
    menuToggle?.setAttribute('aria-expanded', 'false');
  }

  function selectInstrument(symbol) {
    if (!symbols.has(symbol)) return;
    if (instrumentSelect) instrumentSelect.value = symbol;
    document.querySelectorAll('.watch-row').forEach((row) => {
      const selected = row.dataset.symbol === symbol;
      row.classList.toggle('selected', selected);
      row.setAttribute('aria-pressed', String(selected));
    });
    if (chartTitle) chartTitle.textContent = `${symbol} · ${selectedTimeframe}`;
  }

  function setTimeframe(timeframe) {
    selectedTimeframe = timeframe;
    document.querySelectorAll('.timeframe').forEach((button) => {
      const selected = button.dataset.timeframe === timeframe;
      button.classList.toggle('active', selected);
      button.setAttribute('aria-pressed', String(selected));
    });
    if (chartTitle && instrumentSelect) chartTitle.textContent = `${instrumentSelect.value} · ${timeframe}`;
  }

  // Future integration point. Keep network access explicit and do not silently substitute demo values.
  async function fetchMarketSnapshot() {
    if (!DATA_CONFIG.apiBaseUrl) return { status: 'unavailable', data: null };
    try {
      const response = await fetch(`${DATA_CONFIG.apiBaseUrl}/api/markets/snapshot`, {
        headers: { Accept: 'application/json' }
      });
      if (!response.ok) throw new Error(`Market API returned ${response.status}`);
      return { status: 'ok', data: await response.json() };
    } catch (error) {
      return { status: 'error', data: null, error };
    }
  }
  // Referenced to document the adapter seam without invoking it before a provider is configured.
  void fetchMarketSnapshot;

  updateClock();
  window.setInterval(updateClock, 1000);

  menuToggle?.addEventListener('click', () => {
    const open = sidebar?.classList.toggle('open') ?? false;
    overlay?.classList.toggle('visible', open);
    menuToggle.setAttribute('aria-expanded', String(open));
  });
  overlay?.addEventListener('click', closeMenu);
  document.querySelectorAll('.side-link').forEach((link) => {
    link.addEventListener('click', () => {
      document.querySelectorAll('.side-link').forEach((item) => item.classList.remove('active'));
      link.classList.add('active');
      closeMenu();
    });
  });

  document.querySelectorAll('.watch-row').forEach((row) => {
    row.addEventListener('click', () => selectInstrument(row.dataset.symbol));
  });
  instrumentSelect?.addEventListener('change', () => selectInstrument(instrumentSelect.value));
  document.querySelectorAll('.timeframe').forEach((button) => {
    button.addEventListener('click', () => setTimeframe(button.dataset.timeframe));
  });

  document.getElementById('refreshButton')?.addEventListener('click', () => {
    showToast('No data source is configured. No request was made and no market data was updated.');
  });

  // Keep the module available for future integration diagnostics without exposing credentials.
  window.KodiMarketsTerminal = Object.freeze({ selectInstrument, setTimeframe, dataConfigured: Boolean(DATA_CONFIG.apiBaseUrl) });
})();
