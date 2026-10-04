/* Tunnel de commande partagé (V1 + V2) — démo, rien n'est envoyé */
(function () {
  const W = window.Wazni, $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
  let step = 1; const data = {};

  // wilayas
  const sel = $('[name=wilaya]');
  sel.innerHTML = '<option value="">Choisir ta wilaya</option>' + W.wilayas.map((w, i) => `<option value="${i}">${String(i + 1).padStart(2, '0')} — ${w}</option>`).join('');

  function ship() {
    const w = sel.value; const mode = ($('[name=mode]:checked') || {}).value || 'domicile';
    if (w === '') return null;
    return W.subtotal() >= W.FREE_FROM ? 0 : W.shipping(w, mode);
  }
  function prices() {
    const w = sel.value;
    $$('[data-mode-price]').forEach((el) => {
      const m = el.dataset.modePrice;
      el.textContent = w === '' ? '—' : (W.subtotal() >= W.FREE_FROM ? 'Offerte' : W.fmt(W.shipping(w, m)));
    });
  }
  function summary() {
    const L = W.lines();
    $('[data-sum-lines]').innerHTML = L.map((l) => `<div class="sl"><span class="th" style="background:${l.soft}"><img src="${l.img}" alt=""><i>${l.qty}</i></span><span class="nm">${l.full}<small>${l.weight}</small></span><b>${W.fmt(l.total)}</b></div>`).join('') || '<p style="color:var(--muted)">Panier vide</p>';
    const s = ship();
    $('[data-sum-sub]').textContent = W.fmt(W.subtotal());
    $('[data-sum-ship]').textContent = s == null ? 'À l\'étape Livraison' : s === 0 ? 'Offerte' : W.fmt(s);
    $('[data-sum-tot]').textContent = W.fmt(W.subtotal() + (s || 0));
    prices();
  }

  function go(n) {
    step = n;
    $$('[data-pane]').forEach((p) => p.classList.toggle('on', +p.dataset.pane === n));
    $$('[data-st]').forEach((s) => { const k = +s.dataset.st; s.classList.toggle('on', k === n); s.classList.toggle('done', k < n || n === 4); });
    document.body.classList.toggle('is-done', n === 4);
    const top = $('[data-checkout-top]'); if (top) scrollTo({ top: top.getBoundingClientRect().top + scrollY - 90, behavior: 'smooth' });
  }

  function validate(pane) {
    let ok = true;
    $$('[required]', pane).forEach((el) => {
      const f = el.closest('.f'); let v = el.value.trim(), good = !!v;
      if (el.name === 'tel') good = /^0[567]\d{8}$/.test(v.replace(/\s/g, ''));
      if (f) f.classList.toggle('err', !good); if (!good) ok = false;
    });
    return ok;
  }

  document.addEventListener('click', (e) => {
    const n = e.target.closest('[data-next]');
    if (n) {
      const pane = n.closest('[data-pane]');
      if (!validate(pane)) { W.toast('Merci de compléter les champs en rouge'); return; }
      $$('input,select,textarea', pane).forEach((el) => { if (el.type === 'radio') { if (el.checked) data[el.name] = el.value; } else data[el.name] = el.value; });
      if (+pane.dataset.pane === 2) recap();
      go(+pane.dataset.pane + 1);
    }
    const p = e.target.closest('[data-prev]'); if (p) go(step - 1);
    const demo = e.target.closest('[data-demo-fill]');
    if (demo) { e.preventDefault(); if (!W.count()) W.add('trio'); $('[name=prenom]').value = 'Amina'; $('[name=nom]').value = 'Benali'; $('[name=tel]').value = '0550 12 34 56'; }
  });

  function recap() {
    const w = W.wilayas[data.wilaya];
    $('[data-recap]').innerHTML = `<div><b>${data.prenom} ${data.nom}</b> · ${data.tel}</div><div>${[data.adresse, data.commune, w].filter(Boolean).join(', ')}</div><div>${data.mode === 'relais' ? 'Retrait en point relais' : 'Livraison à domicile'}</div>`;
  }

  $('[data-confirm]').addEventListener('click', () => {
    if (!W.count()) { W.toast('Ton panier est vide'); return; }
    const no = 'WZ-' + new Date().toISOString().slice(2, 10).replace(/-/g, '') + '-' + Math.floor(1000 + Math.random() * 8999);
    $('[data-ordno]').textContent = no;
    $('[data-ord-name]').textContent = data.prenom || '';
    $('[data-ord-tot]').textContent = $('[data-sum-tot]').textContent;
    W.clear(); go(4);
    document.dispatchEvent(new CustomEvent('wazni:ordered'));
  });

  sel.addEventListener('change', summary);
  $$('[name=mode]').forEach((r) => r.addEventListener('change', summary));
  $('[name=tel]').addEventListener('input', (e) => { let v = e.target.value.replace(/\D/g, '').slice(0, 10); e.target.value = v.replace(/^(\d{4})(\d{0,2})(\d{0,2})(\d{0,2}).*/, (m, a, b, c, d) => [a, b, c, d].filter(Boolean).join(' ')); });
  W.on(() => { summary(); const n = $('[data-empty-note]'); if (n) n.style.display = W.count() ? 'none' : 'block'; }); summary(); go(1);
  if (!W.count()) $('[data-empty-note]') && ($('[data-empty-note]').style.display = 'block');
})();
