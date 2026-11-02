/* Öne çıkan içerikler: kartlar yazının kendi kapak görselini (og:image) kullanır. Rastgele/stok görsel yok. */
(function () {
  var grid = document.querySelector('#icerikler .featured-grid');
  if (!grid) return;
  var CACHE_KEY = 'cover-cache-v1', cache = {};
  try { cache = JSON.parse(localStorage.getItem(CACHE_KEY) || '{}') || {}; } catch (_) {}
  function save() { try { localStorage.setItem(CACHE_KEY, JSON.stringify(cache)); } catch (_) {} }
  function safeUrl(raw) { try { var u = new URL(raw, location.href); return u.protocol === 'https:' ? u.href : ''; } catch (_) { return ''; } }
  function node(tag, cls, value) { var el = document.createElement(tag); if (cls) el.className = cls; if (value) el.textContent = value; return el; }

  /* Yazı sayfasından og:image alır (Microlink, CORS açık). Sonuç tarayıcıda önbelleğe alınır. */
  function resolveCover(pageUrl) {
    if (cache[pageUrl]) return Promise.resolve(cache[pageUrl]);
    return fetch('https://api.microlink.io/?url=' + encodeURIComponent(pageUrl))
      .then(function (r) { return r.json(); })
      .then(function (j) {
        var u = safeUrl(j && j.data && j.data.image && j.data.image.url);
        if (u) { cache[pageUrl] = u; save(); }
        return u;
      });
  }
  function useCover(img, src) {
    img.referrerPolicy = 'no-referrer';
    img.onerror = function () { img.onerror = null; img.removeAttribute('src'); };
    img.src = src;
  }
  function applyCover(img, pageUrl, skipSrc) {
    resolveCover(pageUrl).then(function (u) { if (u && u !== skipSrc) useCover(img, u); }).catch(function () {});
  }

  /* Sayfada hazır duran kartlar */
  Array.prototype.forEach.call(grid.querySelectorAll('a.fcard'), function (a) {
    var img = a.querySelector('.fmedia img'), h = a.querySelector('h3');
    if (!img) return;
    if (h) img.alt = h.textContent + ' kapak görseli';
    applyCover(img, a.href);
  });

  /* data/posts.json (GitHub Actions) varsa yeni yazılar otomatik kart olur */
  function render(items) {
    if (!Array.isArray(items) || !items.length) return;
    var cards = document.createDocumentFragment();
    items.slice(0, 3).forEach(function (item) {
      if (!item || !safeUrl(item.url)) return;
      var url = safeUrl(item.url);
      var a = node('a', 'fcard rv in'); a.href = url; a.target = '_blank'; a.rel = 'noopener noreferrer';
      var media = node('div', 'fmedia'), tag = node('span', 'ftag', item.category || item.platform || 'TEKNİK YAZI');
      var img = node('img'); img.alt = (item.title || 'Teknik yazı') + ' kapak görseli'; img.loading = 'lazy'; img.decoding = 'async';
      var given = safeUrl(item.image);
      if (given) {
        img.referrerPolicy = 'no-referrer';
        img.onerror = function () { img.onerror = null; img.removeAttribute('src'); applyCover(img, url, given); };
        img.src = given;
      } else { applyCover(img, url); }
      media.append(tag, img);
      var content = node('div', 'fcontent'), heading = node('h3', '', item.title || 'Yeni yayın'), desc = node('p', 'fdesc', item.description || 'Teknik içerik ve yayın notları.');
      var meta = node('div', 'fmeta'), source = node('span', 'fsource');
      source.append(node('span', 'ficon', (item.platform || 'B').substring(0, 1)), node('span', '', item.platform || 'Blog'));
      var read = node('span', 'fread', 'Yazıyı oku '); read.append(node('span', 'arrow', '↗'));
      meta.append(source, read); content.append(heading, desc, meta); a.append(media, content); cards.append(a);
    });
    if (cards.childNodes.length) grid.replaceChildren(cards);
  }
  fetch('./data/posts.json', { cache: 'no-store' }).then(function (r) { if (!r.ok) throw Error(); return r.json(); }).then(render).catch(function () { /* posts.json yoksa hazır kartlar kalır. */ });
})();
