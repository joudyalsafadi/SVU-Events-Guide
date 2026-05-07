


(function () {
  const STORAGE_KEY = 'theme';

  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved === 'dark') document.documentElement.setAttribute('data-theme', 'dark');

  document.addEventListener('DOMContentLoaded', function () {
    const btn = document.getElementById('darkToggle');
    if (!btn) return;

    function applyTheme(theme) {
      if (theme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        btn.innerHTML = '<span class="toggle-icon">☀️</span> وضع النهار';
      } else {
        document.documentElement.removeAttribute('data-theme');
        btn.innerHTML = '<span class="toggle-icon">🌙</span> وضع الليل';
      }
      localStorage.setItem(STORAGE_KEY, theme);
    }

    // Set correct label on load
    const current = localStorage.getItem(STORAGE_KEY) || 'light';
    applyTheme(current);

    btn.addEventListener('click', function () {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      applyTheme(isDark ? 'light' : 'dark');
    });
  });
})();



(function () {
  document.addEventListener('DOMContentLoaded', function () {
    const btn = document.getElementById('scrollTop');
    if (!btn) return;

    window.addEventListener('scroll', function () {
      btn.style.display = window.scrollY > 300 ? 'flex' : 'none';
    });

    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });
})();



document.addEventListener('DOMContentLoaded', function () {
  const catBtns   = document.querySelectorAll('#catButtons button');
  const eventCols = document.querySelectorAll('#eventsGrid .event-col');
  const noResults = document.getElementById('noResults');

  if (!catBtns.length) return;

  catBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      catBtns.forEach(function (b) { b.classList.remove('active-btn'); });
      btn.classList.add('active-btn');

      const selected = btn.dataset.cat;
      let visible = 0;

      eventCols.forEach(function (col) {
        if (selected === 'all' || col.dataset.cat === selected) {
          col.classList.remove('hidden');
          visible++;
        } else {
          col.classList.add('hidden');
        }
      });

      if (noResults) noResults.classList.toggle('d-none', visible > 0);
    });
  });
});

document.addEventListener('DOMContentLoaded', function () {
  const searchInput    = document.getElementById('searchInput');
  const categoryFilter = document.getElementById('categoryFilter');
  const dateFilter     = document.getElementById('dateFilter');
  const placeFilter    = document.getElementById('placeFilter');
  const cardCols       = document.querySelectorAll('.card-col');
  const noResults      = document.getElementById('noResults');

  if (!searchInput) return;

  function filterCards() {
    const searchValue   = searchInput.value.toLowerCase().trim();
    const categoryValue = categoryFilter ? categoryFilter.value : '';
    const dateValue     = dateFilter     ? dateFilter.value     : '';
    const placeValue    = placeFilter    ? placeFilter.value    : '';

    let visible = 0;

    cardCols.forEach(function (col) {
      const title       = (col.dataset.title       || '').toLowerCase();
      const description = (col.dataset.description || '').toLowerCase();
      const category    = col.dataset.category || '';
      const date        = col.dataset.date     || '';
      const place       = col.dataset.place    || '';

      let show = true;

      if (searchValue && !title.includes(searchValue) && !description.includes(searchValue)) show = false;
      if (categoryValue && category !== categoryValue) show = false;
      if (dateValue     && date     !== dateValue)     show = false;
      if (placeValue    && !place.includes(placeValue)) show = false;

      col.style.display = show ? '' : 'none';
      if (show) visible++;
    });

    if (noResults) noResults.classList.toggle('d-none', visible > 0);
  }

  searchInput.addEventListener('input', filterCards);
  if (categoryFilter) categoryFilter.addEventListener('change', filterCards);
  if (dateFilter)     dateFilter.addEventListener('change',     filterCards);
  if (placeFilter)    placeFilter.addEventListener('change',    filterCards);
});