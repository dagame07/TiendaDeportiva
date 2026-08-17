// ---------- Datos de productos ----------
const products = [
  {
    id: 'Tenis deportivo',
    name: 'Tenis',
    desc: 'Calzado deportivo ligero con suela antiderrapante, ideal para entrenar o correr.',
    price: 2499,
    image: 'Pictures'
  },
  {
    id: 'Pantalón deportivo',
    name: 'Pantalón',
    desc: 'Pantalón deportivo de tela flexible, cómodo para entrenar o usar en el día a día.',
    price: 999,
    image: 'imagenes/imagen2.jpg'
  },
  {
    id: 'Playera deportiva',
    name: 'Playera',
    desc: 'Playera deportiva de secado rápido, ligera y transpirable para cualquier actividad.',
    price: 299,
    image: 'imagenes/imagen3.jpg'
  },
  {
    id: 'Gorra',
    name: 'Gorra',
    desc: 'Gorra ajustable con visera curva, ideal para protegerte del sol durante tu entrenamiento.',
    price: 199,
    image: 'imagenes/imagen4.jpg'
  },
  {
    id: 'Short deportivo',
    name: 'Short',
    desc: 'Short deportivo cómodo y ligero, con buena movilidad para cualquier ejercicio.',
    price: 499,
    image: 'imagenes/imagen5.jpg'
  },
  {
    id: 'Calcetines deportivos',
    name: 'Calcetines',
    desc: 'Calcetines deportivos acolchonados que brindan soporte y comodidad todo el día.',
    price: 99,
    image: 'imagenes/imagen6.jpg'
  }
];

// ---------- Estado del carrito ----------
const cart = {};
const MAX_POR_PRODUCTO = 10;

function money(n){
  return '$' + n.toLocaleString('es-MX');
}

// ---------- Render de productos ----------
function renderProducts(){
  const grid = document.getElementById('productGrid');
  grid.innerHTML = products.map(p => `
    <article class="card">
      <div class="card-art"><img src="${p.image}" alt="${p.name}"></div>
      <div class="card-body">
        <h3>${p.name}</h3>
        <p>${p.desc}</p>
        <div class="card-foot">
          <span class="price mono">${money(p.price)}</span>
          <button class="add-btn" data-id="${p.id}">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6"><path d="M12 5v14M5 12h14" stroke-linecap="round"/></svg>
            Agregar
          </button>
        </div>
      </div>
    </article>
  `).join('');

  grid.querySelectorAll('.add-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      addToCart(btn.dataset.id);
      btn.classList.add('added');
      const original = btn.innerHTML;
      btn.innerHTML = 'Agregado ✓';
      setTimeout(() => { btn.classList.remove('added'); btn.innerHTML = original; }, 900);
    });
  });
}

// ---------- Lógica del carrito ----------
function addToCart(id){
  const actual = cart[id] || 0;
  if(actual >= MAX_POR_PRODUCTO) return;
  cart[id] = actual + 1;
  renderCart();
  bumpCount();
}

function changeQty(id, delta){
  if(!cart[id]) return;
  if(delta > 0 && cart[id] >= MAX_POR_PRODUCTO) return;
  cart[id] += delta;
  if(cart[id] <= 0) delete cart[id];
  renderCart();
}

function removeItem(id){
  delete cart[id];
  renderCart();
}

function bumpCount(){
  const el = document.getElementById('cartCount');
  el.classList.add('bump');
  setTimeout(() => el.classList.remove('bump'), 250);
}

function renderCart(){
  const ids = Object.keys(cart);
  const totalItems = ids.reduce((sum, id) => sum + cart[id], 0);
  document.getElementById('cartCount').textContent = totalItems;

  const itemsEl = document.getElementById('drawerItems');
  const footEl = document.getElementById('drawerFoot');

  if(ids.length === 0){
    itemsEl.innerHTML = `
      <div class="empty-cart">
        <p>El carrito está vacío.</p>
      </div>`;
    footEl.innerHTML = '';
    return;
  }

  itemsEl.innerHTML = ids.map(id => {
    const p = products.find(x => x.id === id);
    const qty = cart[id];
    const alMaximo = qty >= MAX_POR_PRODUCTO;
    return `
      <div class="cart-item">
        <div class="cart-item-art"><img src="${p.image}" alt="${p.name}"></div>
        <div class="cart-item-info">
          <h4>${p.name}</h4>
          <p class="desc">${p.desc}</p>
          <div class="cart-item-row">
            <div class="qty-control">
              <button class="qty-btn" data-action="minus" data-id="${id}" aria-label="Quitar una unidad">−</button>
              <span class="qty-val mono">${qty}</span>
              <button class="qty-btn" data-action="plus" data-id="${id}" aria-label="Agregar una unidad" ${alMaximo ? 'disabled' : ''}>+</button>
            </div>
            <span class="item-line-price mono">${money(p.price * qty)}</span>
          </div>
          <button class="remove-btn" data-action="remove" data-id="${id}">Quitar</button>
          ${alMaximo ? '<p class="max-note">Máximo 10 por producto</p>' : ''}
        </div>
      </div>`;
  }).join('');

  const subtotal = ids.reduce((sum, id) => sum + products.find(x => x.id === id).price * cart[id], 0);
  footEl.innerHTML = `
    <div class="subtotal-row">
      <span>Subtotal</span>
      <span class="mono">${money(subtotal)}</span>
    </div>
    <button class="checkout-btn">Finalizar compra</button>
    <p class="checkout-note">Envío calculado en el siguiente paso</p>
  `;

  itemsEl.querySelectorAll('[data-action="plus"]').forEach(b => b.addEventListener('click', () => changeQty(b.dataset.id, 1)));
  itemsEl.querySelectorAll('[data-action="minus"]').forEach(b => b.addEventListener('click', () => changeQty(b.dataset.id, -1)));
  itemsEl.querySelectorAll('[data-action="remove"]').forEach(b => b.addEventListener('click', () => removeItem(b.dataset.id)));
}

// ---------- Apertura / cierre del panel del carrito ----------
const drawer = document.getElementById('drawer');
const overlay = document.getElementById('overlay');

function openCart(){ drawer.classList.add('open'); overlay.classList.add('open'); }
function closeCart(){ drawer.classList.remove('open'); overlay.classList.remove('open'); }

document.getElementById('cartToggle').addEventListener('click', openCart);
document.getElementById('closeCart').addEventListener('click', closeCart);
overlay.addEventListener('click', closeCart);
document.addEventListener('keydown', e => { if(e.key === 'Escape') closeCart(); });

// ---------- Inicio ----------
renderProducts();
renderCart();