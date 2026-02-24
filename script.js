// Reads the #search-input value and prepares for filtering (Step 2)
// Does NOT modify or filter DOM items yet — only exposes the current query

(function () {
  function initMenuSearch() {
    const searchInput = document.getElementById('search-input');
    if (!searchInput) return;

    // Exposed for debugging and later use
    window.menuSearchQuery = '';

    function updateQuery() {
      const q = searchInput.value.trim().toLowerCase();
      window.menuSearchQuery = q;
      // Dispatch a custom event other code can listen to later
      window.dispatchEvent(new CustomEvent('menu:search', { detail: q }));
      // Light logging for development
      console.debug('[menu] search query ->', q);
    }

    // Read initial value and listen for changes
    updateQuery();
    searchInput.addEventListener('input', updateQuery);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMenuSearch);
  } else {
    initMenuSearch();
  }
})();
