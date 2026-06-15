// ---------------------
// Swiper initialization
// ---------------------
var swiper = new Swiper(".mySwiper", {
  loop: true,
  navigation: {
    nextEl: "#next",
    prevEl: "#prev",
  },
});


// ---------------------
// Cart tab logic
// ---------------------
const cartIcon = document.querySelector('.cart-icon');
const cartTab = document.querySelector('.cart-tab');
const closeBtn = document.querySelector('.close-btn');
const cardList = document.querySelector('.card-list');
const cartList = document.querySelector('.cart-list');
const cartTotal = document.querySelector('.cart-total');
const cartValue = document.querySelector('.cart-value');
const hamBurger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');// ✅ correct selector (keep the dot)
const bars = document.querySelector('.fa-bars');
// Open cart
cartIcon.addEventListener('click', () => {
  cartTab.classList.add('cart-tab-active');
});

// Close cart
closeBtn.addEventListener('click', (e) => {
  e.preventDefault();
  cartTab.classList.remove('cart-tab-active');
});

hamBurger.addEventListener('click', (e) => {
  mobileMenu.classList.toggle('mobile-menu-active');
e.preventDefault();
} )
hamBurger.addEventListener('click', (e) => {
  bars.classList.toggle('fa-xmark');
e.preventDefault();
} )


// ---------------------
// Product list handling
// ---------------------
let productList = [];
let cartProduct = [];


const updateTotals = () => {
  let totalPrice = 0;
  let totalQuantity = 0;
  document.querySelectorAll('.item').forEach(item => {
    const quantity = parseInt(item.querySelector('.quantity-value').textContent)
    const price = parseFloat(item.querySelector('.item-total').textContent.replace('$', ''));
    totalPrice += price;
    totalQuantity += quantity;
  })
  cartTotal.textContent = `$${totalPrice.toFixed(2)}`;
  cartValue.textContent = totalQuantity;
}
// Function to show product cards
const showCards = () => {
  cardList.innerHTML = ''; // clear before rendering

  productList.forEach(product => {
    const orderCard = document.createElement('div');
    orderCard.classList.add('order-card');

    orderCard.innerHTML = `
      <div class="card-image">
        <img src="${product.image}" alt="${product.name}">
      </div>
      <h4>${product.name}</h4>
      <h4 class="price">₹${product.price}</h4>
      <a href="#" class="btn cart-btn">Add to cart</a>
    `;

    cardList.appendChild(orderCard);

    // ✅ Fixed class selector from `.card-btn` → `.cart-btn`
    const cardBtn = orderCard.querySelector('.cart-btn');
    cardBtn.addEventListener('click', (e) => {
      e.preventDefault();


      addToCart(product);
    });
  });
};

const addToCart = (product) => {

  const exixtingProduct = cartProduct.find(item => item.id === product.id);
  if (exixtingProduct) {

    alert("already in cart");
    return;
  }
  cartProduct.push(product);
  let quantity = 1;
  let price = parseFloat(product.price.replace('$', ''))

  const cartItem = document.createElement('div')
  cartItem.classList.add('item');
  cartItem.innerHTML = `
           <div class="item-image">
                                <img src=${product.image} alt="">
                            </div>
                            <div class = "detail">
                                <h4>${product.name}</h4>
                                                            <h4 class="item-total">${product.price}</h4>
</div>
                           <div class="flex ">
                                <a href="" class="quantity-btn minus">
                                    <i class="fa-solid fa-minus"></i>
                                </a>
                                <h4 class="quantity-value">${quantity}</h4>
                                <a href="" class="quantity-btn plus">
                                    <i class="fa-solid fa-plus"></i>
                                </a>
                            </div>
                            `;

  cartList.appendChild(cartItem)
  updateTotals();
  const plusBtn = cartItem.querySelector('.plus');
  const quantityValue = cartItem.querySelector('.quantity-value');
  const itemTotal = cartItem.querySelector('.item-total');
  const minusBtn = cartItem.querySelector('.minus');

  plusBtn.addEventListener('click', (e) => {
    e.preventDefault();
    quantity++;
    quantityValue.textContent = quantity;
    itemTotal.textContent = `$${(price * quantity).toFixed(2)}`
    updateTotals();
  })
  minusBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (quantity > 1) {
      quantity--;
      quantityValue.textContent = quantity;
      itemTotal.textContent = `$${(price * quantity).toFixed(2)}`
      updateTotals();
    }
    else {
      cartItem.classList.add('slide-out')
      setTimeout(() => {
        cartItem.remove();
        cartProduct = cartProduct.filter(item => item.id !== product.id);
        updateTotals();
      }, 300)

    }
  })
}



const initApp = () => {
  fetch('./products.json')
    .then(response => response.json())
    .then(data => {
      console.log("✅ Products loaded:", data);
      productList = data;
      showCards();
    })
    .catch(error => console.error("❌ Error loading products:", error));
};

initApp();
