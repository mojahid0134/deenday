/* ==========================================================
   Deen Day Shared Bottom Navigation + Rewards Panel
   এই ফাইলটা সব page (index, quran, audio-quran, tasbih, names, view)
   এ same থাকবে, তাই bottom nav সবজায়গায় pinned/consistent দেখাবে।

   Rewards কোনো modal/dark-overlay না — এটা ঠিক Home/Favourite/
   History-এর মতোই একটা full-content panel, যেটা current page-এর
   উপর বসে (dark background ছাড়া), আর Bottom Nav সবসময় স্বাভাবিক
   ভাবে উপরে visible/clickable থাকে। অন্য কোনো Tab (Home/Favourite/
   History)-এ click করলেই এটা সরে গিয়ে আগের content ফিরে আসবে।

   ================================
   NEW: "Audio Quran" ট্যাব যোগ করা হলো (Home এর পাশে) — এটা সবসময়
   audio-quran.html পেজে নিয়ে যায় (index.html-এর filter হিসেবে না),
   কারণ এটার একমাত্র কাজ Quran Audio শোনানো, অন্য কিছু না।
   ========================================================== */
(function () {
  const style = document.createElement('style');
  style.textContent = `
    .nf-bottom-nav {
      position: fixed; left: 0; right: 0; bottom: 0; z-index: 500;
      background: #fff; display: flex; justify-content: space-around; align-items: center;
      padding: 8px 4px calc(8px + env(safe-area-inset-bottom, 0px));
      border-radius: 22px 22px 0 0; box-shadow: 0 -6px 16px rgba(0,0,0,0.08);
    }
    .nf-nav-item {
      display: flex; flex-direction: column; align-items: center; gap: 3px;
      border: none; background: none; padding: 6px 6px; border-radius: 14px;
      color: #888; font-size: 10.5px; font-weight: 700; min-width: 56px;
    }
    .nf-nav-item svg { width: 21px; height: 21px; }
    .nf-nav-item.active { color: #1a1a2e; background: #E0F2FE; }
  `;
  document.head.appendChild(style);

  const ICONS = {
    home: `<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>`,
    audioQuran: `<path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3z"/><path d="M3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/>`,
    bookmark: `<path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>`,
    history: `<path d="M3 3v5h5"/><path d="M3.05 13A9 9 0 1 0 6 5.3L3 8"/><path d="M12 7v5l4 2"/>`
  };

  function buildNav(active) {
    const nav = document.createElement('div');
    nav.className = 'nf-bottom-nav';
    nav.id = 'nfBottomNav';
    [
      { key: 'home', label: 'Home' },
      { key: 'audioQuran', label: 'Audio Quran' },
      { key: 'bookmark', label: 'Bookmark' },
      { key: 'history', label: 'History' }
    ].forEach(item => {
      const btn = document.createElement('button');
      btn.className = 'nf-nav-item' + (active === item.key ? ' active' : '');
      btn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${ICONS[item.key]}</svg><span>${item.label}</span>`;
      btn.addEventListener('click', () => handleNavClick(item.key));
      nav.appendChild(btn);
    });
    document.body.appendChild(nav);
  }

  function handleNavClick(key) {
    const APP_MODE = new URLSearchParams(window.location.search).get('app') === '1';

    // "Audio Quran" সবসময় নিজের dedicated পেজে নিয়ে যাবে — index.html-এর
    // filter সিস্টেমের ভেতরে ঢুকবে না, কারণ এর একমাত্র কাজ Audio শোনানো।
    if (key === 'audioQuran') {
      window.location.href = 'audio-quran.html' + (APP_MODE ? '?app=1' : '');
      return;
    }

    if (typeof window.nfSetFilter === 'function') {
      window.nfSetFilter(key);
      window.scrollTo(0, 0);
      return;
    }
    const target = key === 'home' ? 'index.html' : 'index.html?filter=' + key;
    window.location.href = target + (APP_MODE ? (target.includes('?') ? '&' : '?') + 'app=1' : '');
  }

  window.NFNav = { init: buildNav };
})();
