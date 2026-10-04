(function () {
  const W = window.Wazni, P = W.products, $ = (s) => document.querySelector(s), $$ = (s) => [...document.querySelectorAll(s)];
  const ING = {
    choc: '<svg viewBox="0 0 60 60"><rect x="6" y="10" width="48" height="40" rx="5" fill="#3b1d12" transform="rotate(-12 30 30)"/><g transform="rotate(-12 30 30)" fill="none" stroke="#5c3121" stroke-width="2.5"><path d="M22 10v40M38 10v40M6 30h48"/></g></svg>',
    chunk: '<svg viewBox="0 0 60 60"><path d="M8 20 34 6l20 22-18 26L6 44z" fill="#4a2619"/><path d="M8 20 34 6l4 18-30-4z" fill="#6b3a26"/></svg>',
    straw: '<svg viewBox="0 0 60 70"><path d="M30 66C12 56 4 38 8 26c3-9 13-12 22-9 9-3 19 0 22 9 4 12-4 30-22 40z" fill="#e8364f"/><g fill="#ffd5a0"><circle cx="20" cy="30" r="1.6"/><circle cx="30" cy="27" r="1.6"/><circle cx="40" cy="31" r="1.6"/><circle cx="24" cy="42" r="1.6"/><circle cx="36" cy="43" r="1.6"/><circle cx="30" cy="54" r="1.6"/></g><path d="M30 18c-6-10-14-8-18-6 6 1 9 4 10 8M30 18c6-10 14-8 18-6-6 1-9 4-10 8M30 18V6" stroke="#2f8a3a" stroke-width="4" fill="none" stroke-linecap="round"/></svg>',
    half: '<svg viewBox="0 0 60 70"><path d="M30 66C12 56 4 38 8 26c3-9 13-12 22-9 9-3 19 0 22 9 4 12-4 30-22 40z" fill="#e8364f"/><path d="M30 60C17 52 12 39 14 30c2-6 9-8 16-6 7-2 14 0 16 6 2 9-3 22-16 30z" fill="#ff8a9b"/><path d="M30 26v28" stroke="#fff" stroke-width="3" opacity=".6"/></svg>',
    flower: '<svg viewBox="0 0 60 60"><g fill="#fff8e6" stroke="#ecd9a8" stroke-width="1"><ellipse cx="30" cy="14" rx="9" ry="14"/><ellipse cx="30" cy="14" rx="9" ry="14" transform="rotate(72 30 30)"/><ellipse cx="30" cy="14" rx="9" ry="14" transform="rotate(144 30 30)"/><ellipse cx="30" cy="14" rx="9" ry="14" transform="rotate(216 30 30)"/><ellipse cx="30" cy="14" rx="9" ry="14" transform="rotate(288 30 30)"/></g><circle cx="30" cy="30" r="7" fill="#f2c94c"/></svg>',
    pod: '<svg viewBox="0 0 60 60"><path d="M8 52C20 34 36 18 54 8" stroke="#2b160c" stroke-width="7" stroke-linecap="round" fill="none"/><path d="M14 54C26 36 40 22 56 14" stroke="#40210f" stroke-width="5" stroke-linecap="round" fill="none"/></svg>',
    leaf: '<svg viewBox="0 0 60 60"><path d="M10 50C10 24 26 10 52 8 50 34 36 50 10 50z" fill="#7f9a52"/><path d="M10 50 40 20" stroke="#5b7436" stroke-width="2.5"/></svg>'
  };
  const SET = { chocolat: ['choc', 'leaf', 'chunk', 'choc'], fraise: ['straw', 'leaf', 'half', 'straw'], vanille: ['flower', 'pod', 'flower', 'leaf'] };
  const FLAV = ['chocolat', 'fraise', 'vanille'];
  let cur = 'chocolat', idx = 0, timer;

  /* HERO */
  const ingr = $('[data-ingr]');
  function setFlavor(f, user) {
    if (f === cur && ingr.innerHTML) return;
    const prev = cur; cur = f; idx = FLAV.indexOf(f);
    V2.setTheme(f);
    $$('[data-hp]').forEach((im) => { im.style.transform = ''; im.classList.remove('out'); im.classList.toggle('on', im.dataset.hp === f); if (im.dataset.hp === prev && prev !== f) { im.classList.add('out'); setTimeout(() => im.classList.remove('out'), 700); } });
    $$('[data-picker] button').forEach((b) => b.classList.toggle('on', b.dataset.f === f));
    $('[data-flword]').textContent = P[f].name.toLowerCase() + '.';
    $('[data-giant]').textContent = (P[f].name.toUpperCase() + ' · ').repeat(6);
    $('[data-hadd]').dataset.add = f;
    ingr.classList.remove('on');
    setTimeout(() => { ingr.innerHTML = SET[f].map((k) => `<i>${ING[k]}</i>`).join(''); requestAnimationFrame(() => ingr.classList.add('on')); }, 250);
    dustColor = f === 'chocolat' ? [240, 190, 150] : f === 'fraise' ? [255, 225, 232] : [255, 244, 210];
    if (user) restart();
  }
  function restart() {
    clearInterval(timer); const pr = $('[data-prog]');
    pr.style.transition = 'none'; pr.style.width = '0'; void pr.offsetWidth; pr.style.transition = 'width 6s linear'; pr.style.width = '100%';
    timer = setInterval(() => { setFlavor(FLAV[(idx + 1) % 3]); pr.style.transition = 'none'; pr.style.width = '0'; void pr.offsetWidth; pr.style.transition = 'width 6s linear'; pr.style.width = '100%'; }, 6000);
  }
  $('[data-picker]').addEventListener('click', (e) => { const b = e.target.closest('button'); if (b) setFlavor(b.dataset.f, true); });
  const center = $('[data-center]');
  $('[data-hero]').addEventListener('mousemove', (e) => {
    const x = e.clientX / innerWidth - .5, y = e.clientY / innerHeight - .5;
    $$('.hp.on').forEach((im) => im.style.transform = `rotateY(${x * 22}deg) rotateX(${-y * 16}deg)`);
    ingr.style.transform = `translate(${x * -30}px,${y * -30}px)`;
  });
  $('[data-hero]').addEventListener('mouseleave', () => $$('.hp').forEach((im) => im.style.transform = ''));

  // poussière de poudre
  const cv = $('[data-dust]'), cx = cv.getContext('2d'); let dustColor = [240, 190, 150], parts = [];
  function size() { cv.width = cv.offsetWidth * devicePixelRatio; cv.height = cv.offsetHeight * devicePixelRatio; }
  size(); addEventListener('resize', size);
  for (let i = 0; i < 90; i++) parts.push({ x: Math.random(), y: Math.random(), r: Math.random() * 2.4 + .6, v: Math.random() * .0012 + .0003, o: Math.random() * .6 + .2, w: Math.random() * 6 });
  let mx = .5, my = .5;
  addEventListener('mousemove', (e) => { mx = e.clientX / innerWidth; my = e.clientY / innerHeight; }, { passive: true });
  (function loop(t) {
    cx.clearRect(0, 0, cv.width, cv.height);
    parts.forEach((p) => {
      p.y -= p.v; if (p.y < -.02) { p.y = 1.02; p.x = Math.random(); }
      const dx = p.x - mx, dy = p.y - my, d = Math.hypot(dx, dy); if (d < .08) { p.x += dx * .04; p.y += dy * .04; }
      const x = (p.x + Math.sin(t / 1600 + p.w) * .004) * cv.width, y = p.y * cv.height;
      cx.beginPath(); cx.arc(x, y, p.r * devicePixelRatio, 0, 7); cx.fillStyle = `rgba(${dustColor},${p.o})`; cx.fill();
    });
    requestAnimationFrame(loop);
  })(0);
  setFlavor('chocolat'); restart();

  /* RAIL */
  const bg = { chocolat: '#4a2619', fraise: '#e0567a', vanille: '#c98d2a' };
  $('[data-rail]').innerHTML = FLAV.map((id, i) => `<article class="pc rv" style="background:${bg[id]};transition-delay:${i * .1}s">
    <span class="num">0${i + 1} / 03</span><span class="tg">${P[id].tag}</span><a href="produit.html?id=${id}" class="nm">${P[id].name}</a>
    <a href="produit.html?id=${id}" class="im"><img src="${P[id].img}" alt="${P[id].full}"></a>
    <div class="ft"><span class="pr">${W.fmt(P[id].price)}</span><button class="plus" data-add="${id}" aria-label="Ajouter ${P[id].name}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg></button></div></article>`).join('');
  const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .15 });
  $$('.pc.rv').forEach((el) => io.observe(el));

  /* SHAKE LAB */
  const scene = $('[data-scene]'), liq = $('[data-liq]'), pow = $('[data-pow]'), grains = $('[data-grains]');
  let labF = 'chocolat', st = 1;
  const powC = { chocolat: '#6b3a26', fraise: '#f2a3b4', vanille: '#efe0bd' }, mixC = { chocolat: '#9c6a4f', fraise: '#f6b9c6', vanille: '#f6ead0' };
  function labTheme() { scene.style.setProperty('--fl', powC[labF]); }
  $('[data-labflav]').addEventListener('click', (e) => {
    const b = e.target.closest('button'); if (!b) return; labF = b.dataset.lf;
    $$('[data-lf]').forEach((x) => x.classList.toggle('on', x === b)); resetLab(); labTheme();
  });
  function resetLab() {
    st = 1; scene.className = 'scene'; liq.style.height = '0'; liq.style.background = '#f7f1e8'; pow.style.height = '0'; pow.style.opacity = 1;
    $$('[data-s]').forEach((b) => { b.classList.remove('ok', 'cur'); b.disabled = +b.dataset.s !== 1; if (+b.dataset.s === 1) b.classList.add('cur'); });
    const last = $('[data-s="4"] small'); last.textContent = 'Immédiatement !';
  }
  function advance() {
    const b = $(`[data-s="${st}"]`); b.classList.remove('cur'); b.classList.add('ok'); b.disabled = true;
    st++; const n = $(`[data-s="${st}"]`); if (n) { n.disabled = false; n.classList.add('cur'); }
  }
  $('[data-steps]').addEventListener('click', (e) => {
    const b = e.target.closest('[data-s]'); if (!b || b.disabled || +b.dataset.s !== st) return;
    b.disabled = true;
    if (st === 1) {
      scene.classList.add('pour');
      setTimeout(() => { for (let i = 0; i < 40; i++) { const g = document.createElement('i'); g.style.left = 46 + Math.random() * 10 + '%'; g.style.top = 18 + Math.random() * 6 + '%'; g.style.animationDelay = Math.random() * .6 + 's'; g.style.setProperty('--d', 200 + Math.random() * 90 + 'px'); grains.appendChild(g); } pow.style.height = '22%'; }, 700);
      setTimeout(() => { scene.classList.remove('pour'); grains.innerHTML = ''; advance(); }, 2000);
    } else if (st === 2) {
      scene.classList.add('milking'); setTimeout(() => { liq.style.height = '80%'; }, 500);
      setTimeout(() => { scene.classList.remove('milking'); advance(); }, 2300);
    } else if (st === 3) {
      scene.classList.add('mix'); pow.style.opacity = 0; liq.style.background = mixC[labF];
      setTimeout(() => { scene.classList.remove('mix'); liq.style.height = '86%'; advance(); }, 1800);
    } else if (st === 4) {
      scene.classList.add('s4'); advance();
      V2.confetti([powC[labF], '#ffffff', '#e0b04f', '#e0567a']);
      const l = $('[data-s="4"]'); l.classList.remove('ok'); l.classList.add('cur'); l.disabled = false;
      l.querySelector('small').innerHTML = `Ton shake ${P[labF].name} est prêt — <u>ajouter au panier</u>`;
      l.onclick = () => { if (scene.classList.contains('s4')) { W.add(labF); W.fly(l, P[labF].img); W.toast(`<b>${P[labF].name}</b> ajouté au panier`); setTimeout(V2.open, 600); } };
    }
  });
  labTheme();

  /* PACK BUILDER */
  let pack = [];
  const slots = $('[data-slots]');
  function renderPack() {
    slots.innerHTML = Array.from({ length: 6 }, (_, i) => pack[i] ? `<div class="slot f" style="background:${P[pack[i]].soft}"><img src="${P[pack[i]].img}" alt=""><button class="x" data-rx="${i}">✕</button></div>` : `<div class="slot"><span>${i + 1}</span></div>`).join('');
    $('[data-cnt]').textContent = pack.length + ' / 6';
    $('[data-meter]').style.width = pack.length / 6 * 100 + '%';
    const full = pack.length === 6, price = full ? P.semaine.price : pack.length * 450;
    $('[data-pp]').innerHTML = W.fmt(price) + (full ? `<s>${W.fmt(2700)}</s>` : '');
    const btn = $('[data-addpack]'); btn.style.opacity = full ? 1 : .4; btn.style.pointerEvents = full ? '' : 'none';
  }
  document.addEventListener('click', (e) => {
    const k = e.target.closest('[data-pk]');
    if (k) { if (k.dataset.pk === 'mix') pack = ['chocolat', 'chocolat', 'fraise', 'fraise', 'vanille', 'vanille']; else if (pack.length < 6) pack.push(k.dataset.pk); else W.toast('Ton pack est complet : 6 / 6'); renderPack(); }
    const r = e.target.closest('[data-rx]'); if (r) { pack.splice(+r.dataset.rx, 1); renderPack(); }
  });
  $('[data-addpack]').addEventListener('click', (e) => {
    W.add('semaine'); W.fly(e.currentTarget, P.semaine.img);
    W.toast('<b>Pack Semaine</b> ajouté · ' + ['chocolat', 'fraise', 'vanille'].map((f) => pack.filter((x) => x === f).length + ' ' + P[f].name).join(', '));
    V2.confetti(['#4a2619', '#e0567a', '#e0b04f', '#fff']); pack = []; renderPack(); setTimeout(V2.open, 700);
  });
  renderPack();
})();
