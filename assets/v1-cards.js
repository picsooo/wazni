(function () {
  const W = window.Wazni, P = W.products;
  const plus = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>';
  window.cardHTML = function (id) {
    const p = P[id];
    const media = p.pack ? `<div class="stack">${p.imgs.map((s) => `<img src="${s}" alt="">`).join('')}</div>` : `<img src="${p.img}" alt="${p.full}">`;
    const dots = p.pack ? '<div class="dots"><i style="background:#5a3426"></i><i style="background:#e98aa0"></i><i style="background:#e3c27a"></i></div>' : '';
    return `<article class="card rv">
      <a href="produit.html?id=${id}" class="media" style="--soft:${p.soft}">${p.id === 'trio' ? '<span class="chip hot">Best-seller</span>' : p.pack ? '<span class="chip">-10 %</span>' : `<span class="chip">${p.tag}</span>`}${media}</a>
      <a href="produit.html?id=${id}"><h3>${p.name}</h3></a>
      <p class="sub">${p.weight} · ${p.pack ? (p.id==='trio'?'Chocolat, Fraise, Vanille':'2 sachets par saveur') : 'Énergie · Protéines · Bonnes graisses'}</p>${dots}
      <div class="row"><span class="price">${W.fmt(p.price)}${p.old ? `<s>${W.fmt(p.old)}</s>` : ''}</span>
      <button class="add" data-add="${id}" aria-label="Ajouter ${p.name} au panier">${plus}</button></div>
    </article>`;
  };
  document.querySelectorAll('[data-grid]').forEach((g) => {
    g.innerHTML = g.dataset.grid.split(',').map(cardHTML).join('');
  });
  const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .1 });
  document.querySelectorAll('.card.rv').forEach((el) => io.observe(el));
})();
