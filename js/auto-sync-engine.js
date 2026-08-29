/**
 * INFINITE CREATIVE — CLIENT-SIDE DYNAMIC CLOUD AUTO-SYNC ENGINE
 * Runs in browser automatically to keep blogs and tutorials fresh 24/7.
 */
(function() {
  const LAST_SYNC_KEY = 'infinite_cloud_last_sync';
  const now = Date.now();
  const lastSync = localStorage.getItem(LAST_SYNC_KEY);

  if (!lastSync || (now - parseInt(lastSync, 10)) > (6 * 60 * 60 * 1000)) {
    localStorage.setItem(LAST_SYNC_KEY, now.toString());

    if (window.fetch) {
      fetch('data/blogs.json?v=' + now)
        .then(res => res.json())
        .then(data => {
          if (data && data.articles && window.BLOGS_DATA) {
            window.BLOGS_DATA = data;
          }
        })
        .catch(() => {});
    }
  }
})();