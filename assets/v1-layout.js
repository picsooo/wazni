/* WAZNI V1 — en-tête, pied de page, tiroir panier */
(function () {
  const W = window.Wazni;
  const I = {
    bag: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M5 8h14l-1.2 11.2a2 2 0 0 1-2 1.8H8.2a2 2 0 0 1-2-1.8z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></svg>',
    search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><circle cx="11" cy="11" r="6.5"/><path d="m20 20-4-4"/></svg>',
    user: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><circle cx="12" cy="8.5" r="3.8"/><path d="M4.5 20c1.2-3.6 4-5.3 7.5-5.3s6.3 1.7 7.5 5.3"/></svg>',
    menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h10"/></svg>',
    x: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"/></svg>'
  };
  window.WI = I;
  const sprig = '<svg viewBox="0 0 44 32" fill="currentColor"><path d="M22 18C17 17 14 13 13.5 7c5 1 8.5 4.8 8.5 11z"/><path d="M23 17c.3-6.5 3.5-11 9-13 .6 6.4-2.6 11-9 13z"/><path d="M21.6 29c-4.6-.6-9-3-11-8 4.7-.4 9 2.3 11 8zM22.6 29c4.6-.6 9-3 11-8-4.7-.4-9 2.3-11 8z" opacity=".95"/><path d="M21.5 31V17h1v14z"/></svg>';
  window.WSPRIG = sprig;
  const here = location.pathname.split('/').pop() || 'index.html';
  const nl = (h, t) => `<a href="${h}" class="${here === h ? 'on' : ''}">${t}</a>`;

  const top = `
  <div class="announce"><div class="track">${Array(2).fill('<span>Livraison dans les <b>58 wilayas</b></span><span>✦</span><span><b>Paiement à la livraison</b></span><span>✦</span><span>Cuillère dosette dans chaque sachet</span><span>✦</span><span>Livraison offerte dès <b>3 000 DA</b></span><span>✦</span>').join('')}</div></div>
  <header class="hdr"><div class="wrap">
    <button class="icon-btn burger" aria-label="Menu" data-mob>${I.menu}</button>
    <a href="index.html" class="logo" aria-label="Wazni accueil">${sprig}<span class="w">WAZNI</span><span class="ar">وزني</span></a>
    <nav class="nav">${nl('index.html', 'Accueil')}${nl('boutique.html', 'Boutique')}${nl('produit.html', 'Nos saveurs')}${nl('index.html#preparer', 'Préparation')}${nl('contact.html', 'Contact')}</nav>
    <div class="hdr-actions">
      <a class="icon-btn" href="boutique.html" aria-label="Rechercher">${I.search}</a>
      <a class="icon-btn" href="#" aria-label="Mon compte" onclick="Wazni.toast('Espace client : disponible dans la version finale');return false">${I.user}</a>
      <button class="icon-btn" aria-label="Panier" data-open-cart data-cart-target>${I.bag}<span class="badge" data-cart-count>0</span></button>
    </div>
  </div></header>
  <div class="mobnav" data-mobnav><button class="icon-btn x" data-mob-x>${I.x}</button>
    <a href="index.html">Accueil</a><a href="boutique.html">Boutique</a><a href="produit.html?id=chocolat">Chocolat</a><a href="produit.html?id=fraise">Fraise</a><a href="produit.html?id=vanille">Vanille</a><a href="panier.html">Mon panier</a><a href="contact.html">Contact</a></div>`;

  const bottom = `
  <footer><div class="wrap">
    <div class="cols">
      <div><a href="index.html" class="logo">${sprig}<span class="w">WAZNI</span><span class="ar">وزني</span></a>
        <p style="margin-top:16px;max-width:300px">Poudre nutritionnelle gourmande : énergie, protéines et bonnes graisses. <span class="hand" style="color:#f3c9a1;font-size:22px">Prends soin de ton corps, à ton rythme.</span></p>
        <div class="pay"><span>Paiement à la livraison</span><span>CIB</span><span>Edahabia</span></div></div>
      <div><h4>Boutique</h4><a href="produit.html?id=chocolat">Chocolat</a><a href="produit.html?id=fraise">Fraise</a><a href="produit.html?id=vanille">Vanille</a><a href="produit.html?id=trio">Pack Trio</a><a href="produit.html?id=semaine">Pack Semaine</a></div>
      <div><h4>Aide</h4><a href="index.html#faq">Questions fréquentes</a><a href="panier.html">Mon panier</a><a href="commande.html">Suivre ma commande</a><a href="contact.html">Livraison & retours</a></div>
      <div><h4>Contact</h4><a href="contact.html">Nous écrire</a><a href="#">Instagram</a><a href="#">Facebook</a><a href="#">TikTok</a><p style="margin-top:10px"><span class="tovalid">Coordonnées à compléter</span></p></div>
    </div>
    <div class="bottom"><span>© 2026 Wazni · وزني — Tous droits réservés</span><span>Site réalisé par Webminds Digital Solutions</span></div>
  </div></footer>
  <a class="vswitch" href="v2/index.html"><i></i>Découvrir la version animée</a>
  <div class="demo">Maquette de démonstration réalisée par <b>Webminds</b> · aucun formulaire n'est enregistré · aucune commande réelle</div>
  <div class="drawer-bg" data-close-cart></div>
  <aside class="drawer" data-drawer aria-label="Panier">
    <header><h3>Mon panier</h3><button class="icon-btn" data-close-cart>${I.x}</button></header>
    <div class="body" data-drawer-body></div>
    <div class="foot" data-drawer-foot></div>
  </aside>`;

  document.body.insertAdjacentHTML('afterbegin', top);
  document.body.insertAdjacentHTML('beforeend', bottom);

  const hdr = document.querySelector('.hdr');
  addEventListener('scroll', () => hdr.classList.toggle('scrolled', scrollY > 10), { passive: true });
  const mob = document.querySelector('[data-mobnav]');
  document.querySelector('[data-mob]').onclick = () => mob.classList.add('open');
  document.querySelector('[data-mob-x]').onclick = () => mob.classList.remove('open');

  // tiroir
  const dr = document.querySelector('[data-drawer]'), bg = document.querySelector('.drawer-bg');
  const open = () => { const t = document.querySelector('.toast'); if (t) t.classList.remove('show'); renderDrawer(); dr.classList.add('open'); bg.classList.add('open'); };
  const close = () => { dr.classList.remove('open'); bg.classList.remove('open'); };
  document.addEventListener('click', (e) => {
    if (e.target.closest('[data-open-cart]')) { e.preventDefault(); open(); }
    if (e.target.closest('[data-close-cart]')) close();
    const q = e.target.closest('[data-q]');
    if (q) { const id = q.dataset.id; const it = W.items().find((x) => x.id === id); if (it) W.set(id, Math.max(0, it.qty + Number(q.dataset.q))); }
    const rm = e.target.closest('[data-rm]'); if (rm) { e.preventDefault(); W.remove(rm.dataset.rm); }
  });

  window.lineHTML = (l) => `<div class="line"><a href="produit.html?id=${l.id}" class="th" style="background:${l.soft}"><img src="${l.img}" alt=""></a>
    <div><h4>${l.full}</h4><small>${l.weight} · ${W.fmt(l.price)}</small><br>
    <div class="qty"><button data-q="-1" data-id="${l.id}" aria-label="moins">−</button><span>${l.qty}</span><button data-q="1" data-id="${l.id}" aria-label="plus">+</button></div>
    <a href="#" class="rm" data-rm="${l.id}">Retirer</a></div><b>${W.fmt(l.total)}</b></div>`;
  window.freeHTML = () => {
    const s = W.subtotal(), left = W.FREE_FROM - s, pct = Math.min(100, (s / W.FREE_FROM) * 100);
    return `<div class="freebar">${left > 0 ? `Plus que <b>${W.fmt(left)}</b> pour la livraison offerte` : '<b>Bravo !</b> La livraison est offerte'}<div class="bar"><i style="width:${pct}%"></i></div></div>`;
  };
  const emptyHTML = `<div class="empty">${I.bag}<p>Votre panier est vide.</p><a href="boutique.html" class="btn btn-dark btn-sm" style="margin-top:16px">Découvrir les saveurs</a></div>`;
  function renderDrawer() {
    const L = W.lines(); const b = document.querySelector('[data-drawer-body]'), f = document.querySelector('[data-drawer-foot]');
    if (!L.length) { b.innerHTML = emptyHTML; f.innerHTML = ''; return; }
    b.innerHTML = freeHTML() + L.map(lineHTML).join('');
    f.innerHTML = `<div class="sum-row total"><span>Sous-total</span><span>${W.fmt(W.subtotal())}</span></div><small style="color:var(--muted)">Frais de livraison calculés à l'étape suivante.</small>
      <a href="commande.html" class="btn btn-dark">Commander maintenant</a><a href="panier.html" class="btn btn-ghost btn-sm">Voir le panier</a>`;
  }
  W.on(() => { if (dr.classList.contains('open')) renderDrawer(); });
  document.addEventListener('wazni:added', () => { if (!document.body.dataset.noDrawer) setTimeout(open, 450); });

  // révélations au défilement
  const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .12 });
  document.querySelectorAll('.rv').forEach((el) => io.observe(el));
})();
