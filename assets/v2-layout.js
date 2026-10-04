/* WAZNI V2 — en-tête, tiroir, pied de page, thèmes de saveur */
(function () {
  const W = window.Wazni;
  const sprig = '<svg viewBox="0 0 44 32" fill="currentColor"><path d="M22 18C17 17 14 13 13.5 7c5 1 8.5 4.8 8.5 11z"/><path d="M23 17c.3-6.5 3.5-11 9-13 .6 6.4-2.6 11-9 13z"/><path d="M21.6 29c-4.6-.6-9-3-11-8 4.7-.4 9 2.3 11 8zM22.6 29c4.6-.6 9-3 11-8-4.7-.4-9 2.3-11 8z"/><path d="M21.5 31V17h1v14z"/></svg>';
  const bag = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 8h14l-1.2 11.2a2 2 0 0 1-2 1.8H8.2a2 2 0 0 1-2-1.8z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></svg>';
  window.V2 = {
    themes: {
      chocolat: { fl: '#4a2619', fl2: '#7a4532', soft: '#f0b98d' },
      fraise: { fl: '#e0567a', fl2: '#f07f9b', soft: '#ffe0e7' },
      vanille: { fl: '#c98d2a', fl2: '#e0b04f', soft: '#fff1cf' },
      trio: { fl: '#2a1610', fl2: '#5a3426', soft: '#f3c9a1' },
      semaine: { fl: '#5f7240', fl2: '#8fa36b', soft: '#e7f0d4' }
    },
    setTheme(id) {
      const t = this.themes[id] || this.themes.chocolat, r = document.documentElement.style;
      r.setProperty('--fl', t.fl); r.setProperty('--fl-2', t.fl2); r.setProperty('--fl-soft', t.soft);
    },
    sprig
  };
  const light = document.body.dataset.light === '1';
  const head = `<header class="top ${light ? 'solid' : ''}" data-top><div class="wrap">
    <a href="index.html" class="lg">${sprig}<span class="w">WAZNI</span><span class="ar">وزني</span></a>
    <nav class="menu"><a href="index.html#shop">Saveurs</a><a href="index.html#lab">Préparer</a><a href="index.html#pack">Mon pack</a><a href="index.html#faq">FAQ</a></nav>
    <button class="cartbtn" data-open data-cart-target>${bag}<span class="cl">Panier</span><span class="n" data-cart-count>0</span></button>
  </div></header>`;
  const foot = `<footer><div class="wrap">
    <div class="cols">
      <div><a href="index.html" class="lg" style="align-items:flex-start;color:var(--ink)">${sprig}<span class="w">WAZNI</span><span class="ar">وزني</span></a>
      <p class="hand" style="font-size:28px;margin-top:16px;color:var(--fl)">Prends soin de ton corps, à ton rythme ♡</p>
      <p style="color:#6f5a4b;margin-top:10px">Paiement à la livraison · 58 wilayas · <span class="tv">Coordonnées à compléter</span></p></div>
      <div><h4>Saveurs</h4><a href="produit.html?id=chocolat">Chocolat</a><a href="produit.html?id=fraise">Fraise</a><a href="produit.html?id=vanille">Vanille</a><a href="produit.html?id=trio">Pack Trio</a></div>
      <div><h4>Aide</h4><a href="index.html#faq">FAQ</a><a href="commande.html">Commander</a><a href="#" data-open>Mon panier</a></div>
      <div><h4>Suivre</h4><a href="#">Instagram</a><a href="#">TikTok</a><a href="#">Facebook</a></div>
    </div>
    <div class="huge">WAZNI</div>
    <div class="bt"><span>© 2026 Wazni · وزني</span><span>Site réalisé par Webminds Digital Solutions</span></div>
  </div></footer>
  <a class="vswitch" href="../index.html"><i></i>Découvrir la version classique</a>
  <div class="demo">Maquette de démonstration réalisée par <b>Webminds</b> · aucun formulaire n'est enregistré · aucune commande réelle</div>
  <div class="dbg" data-close></div>
  <aside class="drw" data-drw><div class="hd"><b>Ton panier</b><button class="x" data-close aria-label="Fermer">✕</button></div><div class="bd" data-bd></div><div class="ftr" data-ft></div></aside>`;
  document.body.insertAdjacentHTML('afterbegin', head);
  document.body.insertAdjacentHTML('beforeend', foot);

  const top = document.querySelector('[data-top]');
  if (!light) addEventListener('scroll', () => top.classList.toggle('solid', scrollY > innerHeight * .75), { passive: true });

  const drw = document.querySelector('[data-drw]'), dbg = document.querySelector('.dbg');
  const open = () => { const t = document.querySelector('.toast'); if (t) t.classList.remove('show'); render(); drw.classList.add('open'); dbg.classList.add('open'); };
  const close = () => { drw.classList.remove('open'); dbg.classList.remove('open'); };
  window.V2.open = open;
  document.addEventListener('click', (e) => {
    if (e.target.closest('[data-open]')) { e.preventDefault(); open(); }
    if (e.target.closest('[data-close]')) close();
    const q = e.target.closest('[data-q]');
    if (q) { const it = W.items().find((x) => x.id === q.dataset.id); if (it) W.set(q.dataset.id, Math.max(0, it.qty + Number(q.dataset.q))); }
    const rm = e.target.closest('[data-rm]'); if (rm) { e.preventDefault(); W.remove(rm.dataset.rm); }
  });
  function render() {
    const L = W.lines(), bd = document.querySelector('[data-bd]'), ft = document.querySelector('[data-ft]');
    if (!L.length) { bd.innerHTML = '<div class="emp"><div class="disp">Encore vide !</div><p>Choisis ta saveur préférée pour commencer.</p></div>'; ft.innerHTML = '<a href="index.html#shop" class="bigbtn dark" data-close style="justify-content:space-between">Voir les saveurs <i>→</i></a>'; return; }
    const s = W.subtotal(), left = W.FREE_FROM - s;
    bd.innerHTML = `<div class="fr">${left > 0 ? `Encore <b>${W.fmt(left)}</b> et la livraison est offerte` : '<b>Livraison offerte</b> sur ta commande'}<div class="b"><i style="width:${Math.min(100, s / W.FREE_FROM * 100)}%"></i></div></div><div style="height:14px"></div>` +
      L.map((l) => `<div class="it"><a class="th" href="produit.html?id=${l.id}" style="background:${l.soft}"><img src="${l.img}" alt=""></a><div><h4>${l.name}</h4><small>${l.weight}</small><br><div class="q2"><button data-q="-1" data-id="${l.id}">−</button><span>${l.qty}</span><button data-q="1" data-id="${l.id}">+</button></div><a href="#" class="rm" data-rm="${l.id}">Retirer</a></div><b>${W.fmt(l.total)}</b></div>`).join('');
    ft.innerHTML = `<div class="row2"><span>Sous-total</span><span class="tot">${W.fmt(s)}</span></div><a href="commande.html" class="bigbtn dark" style="justify-content:space-between">Commander · paiement à la livraison <i>→</i></a>`;
  }
  W.on(() => { if (drw.classList.contains('open')) render(); });
  document.addEventListener('wazni:added', () => { if (!document.body.dataset.noDrawer) setTimeout(open, 650); });

  // révélations
  document.querySelectorAll('.split').forEach((el) => {
    el.innerHTML = el.innerHTML.split(/(<br>)/).map((part) => part === '<br>' ? part : part.split(' ').map((w) => w ? `<span class="w"><span>${w}</span></span>` : '').join(' ')).join('');
    el.querySelectorAll('.w>span').forEach((s, i) => s.style.transitionDelay = i * 60 + 'ms');
  });
  const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .15 });
  document.querySelectorAll('.rv,.split').forEach((el) => io.observe(el));

  // confettis
  window.V2.confetti = function (colors) {
    const c = document.createElement('canvas'); c.className = 'confetti'; document.body.appendChild(c);
    const x = c.getContext('2d'); c.width = innerWidth; c.height = innerHeight;
    const P = Array.from({ length: 140 }, () => ({ x: innerWidth / 2, y: innerHeight * .45, vx: (Math.random() - .5) * 16, vy: -Math.random() * 15 - 4, r: Math.random() * 6 + 4, c: colors[Math.floor(Math.random() * colors.length)], a: Math.random() * 6, s: Math.random() > .5 }));
    let f = 0;
    (function loop() {
      x.clearRect(0, 0, c.width, c.height);
      P.forEach((p) => { p.vy += .45; p.vx *= .99; p.x += p.vx; p.y += p.vy; p.a += .2; x.save(); x.translate(p.x, p.y); x.rotate(p.a); x.fillStyle = p.c; if (p.s) x.fillRect(-p.r / 2, -p.r / 4, p.r, p.r / 2); else { x.beginPath(); x.arc(0, 0, p.r / 2, 0, 7); x.fill(); } x.restore(); });
      if (++f < 150) requestAnimationFrame(loop); else c.remove();
    })();
  };
})();
