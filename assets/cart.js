/* WAZNI — maquette e-commerce · logique panier partagée (V1 + V2) */
(function () {
  const BASE = document.documentElement.dataset.base || '';
  const IMG = BASE + 'assets/img/';

  const PRODUCTS = {
    chocolat: {
      id: 'chocolat', name: 'Chocolat', full: 'Poudre Nutritionnelle Chocolat', price: 450, weight: '58 g',
      img: IMG + 'chocolat.webp', color: '#5a3426', soft: '#efe1d6', accent: '#8a5a44',
      tag: 'Gourmand & intense',
      desc: "Un shake onctueux au cacao, pour une pause énergie qui a le goût d'un dessert.",
      note: 'Cacao'
    },
    fraise: {
      id: 'fraise', name: 'Fraise', full: 'Poudre Nutritionnelle Fraise', price: 450, weight: '58 g',
      img: IMG + 'fraise.webp', color: '#d9667f', soft: '#fbe4e8', accent: '#e98aa0',
      tag: 'Fruité & doux',
      desc: 'Une note de fraise fraîche et douce, idéale au petit-déjeuner ou après le sport.',
      note: 'Fraise'
    },
    vanille: {
      id: 'vanille', name: 'Vanille', full: 'Poudre Nutritionnelle Vanille', price: 450, weight: '58 g',
      img: IMG + 'vanille.webp', color: '#b88a3a', soft: '#f7ecd2', accent: '#e3c27a',
      tag: 'Doux & réconfortant',
      desc: 'La douceur de la vanille dans un shake crémeux, à mixer avec du lait bien frais.',
      note: 'Vanille'
    },
    trio: {
      id: 'trio', name: 'Pack Trio', full: 'Pack Trio Découverte (3 saveurs)', price: 1250, weight: '3 × 58 g',
      img: IMG + 'chocolat.webp', imgs: [IMG + 'vanille.webp', IMG + 'chocolat.webp', IMG + 'fraise.webp'],
      color: '#4a2c21', soft: '#f3eadf', accent: '#c9a97e', tag: 'Le best-seller',
      desc: 'Chocolat, Fraise et Vanille : les trois saveurs Wazni pour trouver votre préférée.',
      note: 'Pack', pack: true, old: 1350
    },
    semaine: {
      id: 'semaine', name: 'Pack Semaine', full: 'Pack Semaine (6 sachets au choix)', price: 2400, weight: '6 × 58 g',
      img: IMG + 'fraise.webp', imgs: [IMG + 'fraise.webp', IMG + 'vanille.webp', IMG + 'chocolat.webp'],
      color: '#7a8a5c', soft: '#eef0e2', accent: '#a7b383', tag: 'Programme 6 jours',
      desc: '2 sachets de chaque saveur pour tenir le rythme toute la semaine.',
      note: 'Pack', pack: true, old: 2700
    }
  };

  const WILAYAS = ['Adrar','Chlef','Laghouat','Oum El Bouaghi','Batna','Béjaïa','Biskra','Béchar','Blida','Bouira','Tamanrasset','Tébessa','Tlemcen','Tiaret','Tizi Ouzou','Alger','Djelfa','Jijel','Sétif','Saïda','Skikda','Sidi Bel Abbès','Annaba','Guelma','Constantine','Médéa','Mostaganem',"M'Sila",'Mascara','Ouargla','Oran','El Bayadh','Illizi','Bordj Bou Arreridj','Boumerdès','El Tarf','Tindouf','Tissemsilt','El Oued','Khenchela','Souk Ahras','Tipaza','Mila','Aïn Defla','Naâma','Aïn Témouchent','Ghardaïa','Relizane','Timimoun','Bordj Badji Mokhtar','Ouled Djellal','Béni Abbès','In Salah','In Guezzam','Touggourt','Djanet',"El M'Ghair",'El Meniaa'];

  // Tarifs indicatifs (à valider par Wazni / son transporteur)
  function shipping(wIndex, mode) {
    if (wIndex == null || wIndex === '') return null;
    const n = Number(wIndex) + 1;
    const center = [9, 16, 35, 42, 10, 26, 15, 6, 2, 44, 19, 34, 28];
    const south = [1, 8, 11, 30, 32, 33, 37, 39, 47, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58];
    let home = center.includes(n) ? 400 : south.includes(n) ? 900 : 600;
    if (n === 16) home = 300;
    return mode === 'relais' ? Math.max(250, home - 200) : home;
  }

  const KEY = 'wazni_cart_v1';
  const read = () => { try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch (e) { return []; } };
  const write = (c) => { try { localStorage.setItem(KEY, JSON.stringify(c)); } catch (e) {} emit(); };
  const listeners = [];
  function emit() { const c = read(); listeners.forEach((f) => f(c)); updateBadges(); }

  const Cart = {
    products: PRODUCTS, wilayas: WILAYAS, shipping,
    items: read,
    add(id, qty = 1) {
      const c = read(); const it = c.find((x) => x.id === id);
      if (it) it.qty = Math.min(20, it.qty + qty); else c.push({ id, qty });
      write(c);
    },
    set(id, qty) {
      let c = read(); const it = c.find((x) => x.id === id);
      if (!it) return; it.qty = qty; c = c.filter((x) => x.qty > 0); write(c);
    },
    remove(id) { write(read().filter((x) => x.id !== id)); },
    clear() { write([]); },
    count() { return read().reduce((s, x) => s + x.qty, 0); },
    subtotal() { return read().reduce((s, x) => s + (PRODUCTS[x.id] ? PRODUCTS[x.id].price * x.qty : 0), 0); },
    lines() { return read().filter((x) => PRODUCTS[x.id]).map((x) => ({ ...PRODUCTS[x.id], qty: x.qty, total: PRODUCTS[x.id].price * x.qty })); },
    on(f) { listeners.push(f); },
    fmt(n) { return n.toLocaleString('fr-FR').replace(/ | /g, ' ') + ' DA'; },
    FREE_FROM: 3000
  };

  function updateBadges() {
    const n = Cart.count();
    document.querySelectorAll('[data-cart-count]').forEach((el) => {
      el.textContent = n; el.classList.toggle('has', n > 0);
      el.classList.remove('bump'); void el.offsetWidth; el.classList.add('bump');
    });
  }

  // Animation « vol vers le panier »
  Cart.fly = function (fromEl, imgSrc) {
    const target = document.querySelector('[data-cart-target]');
    if (!fromEl || !target) return;
    const a = fromEl.getBoundingClientRect(), b = target.getBoundingClientRect();
    const im = document.createElement('img'); im.src = imgSrc; im.className = 'fly-img';
    Object.assign(im.style, { position: 'fixed', left: a.left + a.width / 2 - 40 + 'px', top: a.top + a.height / 2 - 50 + 'px', width: '80px', zIndex: 9999, pointerEvents: 'none', transition: 'transform .8s cubic-bezier(.5,-.3,.6,1), opacity .8s', filter: 'drop-shadow(0 10px 16px rgba(0,0,0,.25))' });
    document.body.appendChild(im);
    requestAnimationFrame(() => {
      const dx = b.left + b.width / 2 - (a.left + a.width / 2), dy = b.top + b.height / 2 - (a.top + a.height / 2);
      im.style.transform = `translate(${dx}px, ${dy}px) scale(.2) rotate(25deg)`; im.style.opacity = '.4';
    });
    setTimeout(() => im.remove(), 850);
  };

  Cart.toast = function (msg) {
    let t = document.querySelector('.toast');
    if (!t) { t = document.createElement('div'); t.className = 'toast'; document.body.appendChild(t); }
    t.innerHTML = msg; t.classList.add('show');
    clearTimeout(t._h); t._h = setTimeout(() => t.classList.remove('show'), 2400);
  };

  // Liaison automatique des boutons [data-add]
  document.addEventListener('click', (e) => {
    const b = e.target.closest('[data-add]');
    if (!b) return;
    e.preventDefault();
    const id = b.dataset.add; const q = Number(b.dataset.qty || (document.querySelector(b.dataset.qtyFrom || '_') || {}).value || 1);
    Cart.add(id, q);
    Cart.fly(b, PRODUCTS[id].img);
    Cart.toast(`<b>${PRODUCTS[id].name}</b> ajouté au panier · <a href="${b.dataset.cartUrl || 'panier.html'}">Voir le panier</a>`);
    document.dispatchEvent(new CustomEvent('wazni:added', { detail: { id } }));
  });

  window.addEventListener('storage', (e) => { if (e.key === KEY) emit(); });
  document.addEventListener('DOMContentLoaded', updateBadges);
  window.Wazni = Cart;
})();
