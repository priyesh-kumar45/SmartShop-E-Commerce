/* =========================================================
   SMARTSHOP PRODUCTS
========================================================= */

const products = [

  {
    id: 1,
    name: "Wireless Headphones",
    category: "Electronics",
    price: 2499,
    oldPrice: 3499,
    rating: 4.8,
    image: "images/headphones.jpg",
    desc: "Premium wireless headphones with clear sound, comfortable ear cushions and long battery life."
  },

  {
    id: 2,
    name: "Smart Watch",
    category: "Accessories",
    price: 3499,
    oldPrice: 4999,
    rating: 4.7,
    image: "images/smartwatch.jpg",
    desc: "Modern smart watch with fitness tracking, notifications, heart-rate monitoring and a stylish display."
  },

  {
    id: 3,
    name: "Gaming Laptop",
    category: "Electronics",
    price: 74999,
    oldPrice: 89999,
    rating: 4.9,
    image: "images/laptop.jpg",
    desc: "High-performance gaming laptop designed for gaming, development, editing and everyday productivity."
  },

  {
    id: 4,
    name: "Running Shoes",
    category: "Shoes",
    price: 2999,
    oldPrice: 3999,
    rating: 4.6,
    image: "images/shoes.jpg",
    desc: "Comfortable running shoes designed with lightweight cushioning and a durable everyday sole."
  },

  {
    id: 5,
    name: "Premium T-Shirt",
    category: "Fashion",
    price: 999,
    oldPrice: 1499,
    rating: 4.5,
    image: "images/tshirt.jpg",
    desc: "Premium cotton T-shirt with a comfortable fit and clean modern design for everyday wear."
  },

  {
    id: 6,
    name: "Bluetooth Speaker",
    category: "Electronics",
    price: 1799,
    oldPrice: 2499,
    rating: 4.7,
    image: "images/speaker.jpg",
    desc: "Portable Bluetooth speaker with powerful sound, compact design and easy wireless connectivity."
  },

  {
    id: 7,
    name: "Leather Backpack",
    category: "Accessories",
    price: 1899,
    oldPrice: 2799,
    rating: 4.4,
    image: "images/backpack.jpg",
    desc: "Stylish leather backpack with multiple compartments for college, work and everyday travel."
  },

  {
    id: 8,
    name: "Sports Sneakers",
    category: "Shoes",
    price: 2499,
    oldPrice: 3499,
    rating: 4.8,
    image: "images/sports-sneakers.jpg",
    desc: "Modern sports sneakers offering lightweight comfort, strong grip and a stylish athletic look."
  }

];


/* =========================================================
   LOCAL STORAGE
========================================================= */

let cart =
  JSON.parse(
    localStorage.getItem("smartshop-cart")
  ) || [];

let wishlist =
  JSON.parse(
    localStorage.getItem("smartshop-wishlist")
  ) || [];


/* =========================================================
   GLOBAL VARIABLES
========================================================= */

let currentCategory = "All";

let couponApplied = false;


/* =========================================================
   SHORT SELECTORS
========================================================= */

const $ = (selector) => {
  return document.querySelector(selector);
};

const $$ = (selector) => {
  return document.querySelectorAll(selector);
};


/* =========================================================
   MONEY FORMAT
========================================================= */

const money = (number) => {

  return "₹" +
    number.toLocaleString("en-IN");

};


/* =========================================================
   SAVE DATA
========================================================= */

function save() {

  localStorage.setItem(
    "smartshop-cart",
    JSON.stringify(cart)
  );

  localStorage.setItem(
    "smartshop-wishlist",
    JSON.stringify(wishlist)
  );

}


/* =========================================================
   TOAST MESSAGE
========================================================= */

function toast(message, success = true) {

  const container = $("#toastContainer");

  const toastElement =
    document.createElement("div");

  toastElement.className =
    success
      ? "toast success"
      : "toast error";

  toastElement.textContent = message;

  container.appendChild(toastElement);

  setTimeout(() => {

    toastElement.remove();

  }, 2600);

}


/* =========================================================
   STAR RATING
========================================================= */

function stars(rating) {

  return Array.from(
    { length: 5 },
    (_, index) => {

      const active =
        index < Math.round(rating);

      return `
        <i class="${
          active
            ? "fa-solid"
            : "fa-regular"
        } fa-star"></i>
      `;

    }
  ).join("");

}


/* =========================================================
   FILTER PRODUCTS
========================================================= */

function filteredProducts() {

  const searchInput =
    $("#searchInput");

  const query =
    searchInput.value
      .trim()
      .toLowerCase();


  let list =
    products.filter((product) => {

      const categoryMatch =
        currentCategory === "All" ||
        product.category === currentCategory;

      const searchMatch =
        product.name
          .toLowerCase()
          .includes(query);

      return categoryMatch &&
             searchMatch;

    });


  const sort =
    $("#sortSelect").value;


  if (sort === "low") {

    list.sort(
      (a, b) =>
        a.price - b.price
    );

  }


  if (sort === "high") {

    list.sort(
      (a, b) =>
        b.price - a.price
    );

  }


  if (sort === "rating") {

    list.sort(
      (a, b) =>
        b.rating - a.rating
    );

  }


  return list;

}


/* =========================================================
   RENDER PRODUCTS
========================================================= */

function renderProducts() {

  const list =
    filteredProducts();

  const box =
    $("#productsContainer");


  box.innerHTML = "";


  $("#resultText").textContent =
    `Showing ${list.length} product${
      list.length !== 1
        ? "s"
        : ""
    }`;


  $("#emptyState")
    .classList
    .toggle(
      "hidden",
      list.length > 0
    );


  list.forEach((product) => {

    const wished =
      wishlist.includes(product.id);


    const card =
      document.createElement("article");


    card.className =
      "product-card";


    card.innerHTML = `

      <div class="product-image">

        <img
          src="${product.image}"
          alt="${product.name}"
          loading="lazy"
          onerror="this.src='images/headphones.jpg'"
        >

        <button
          class="wish-btn ${
            wished ? "active" : ""
          }"
          data-wish="${product.id}"
          aria-label="Add to wishlist"
        >

          <i
            class="${
              wished
                ? "fa-solid"
                : "fa-regular"
            } fa-heart"
          ></i>

        </button>


        <button
          class="view-btn"
          data-view="${product.id}"
        >
          <i class="fa-regular fa-eye"></i>
          Quick View
        </button>

      </div>


      <div class="product-info">

        <span class="product-category">
          ${product.category}
        </span>


        <h3 class="product-name">
          ${product.name}
        </h3>


        <div class="rating">

          ${stars(product.rating)}

          <span>
            ${product.rating}
          </span>

        </div>


        <div class="price-row">

          <div class="price">

            ${money(product.price)}

            <span class="old-price">
              ${money(product.oldPrice)}
            </span>

          </div>

        </div>


        <button
          class="add-cart"
          data-add="${product.id}"
        >

          <i class="fa-solid fa-cart-plus"></i>

          Add to Cart

        </button>

      </div>

    `;


    box.appendChild(card);

  });

}


/* =========================================================
   UPDATE BADGES
========================================================= */

function updateBadges() {

  const totalItems =
    cart.reduce(
      (total, item) =>
        total + item.qty,
      0
    );


  $("#cartCount").textContent =
    totalItems;


  $("#wishlistCount").textContent =
    wishlist.length;

}


/* =========================================================
   ADD TO CART
========================================================= */

function addToCart(id) {

  const item =
    cart.find(
      (product) =>
        product.id === id
    );


  if (item) {

    item.qty++;

  } else {

    cart.push({
      id: id,
      qty: 1
    });

  }


  save();

  updateBadges();

  renderCart();

  toast(
    "Product added to cart"
  );

  openDrawer("cartDrawer");

}


/* =========================================================
   CHANGE QUANTITY
========================================================= */

function changeQty(id, amount) {

  const item =
    cart.find(
      (product) =>
        product.id === id
    );


  if (!item) {
    return;
  }


  item.qty += amount;


  if (item.qty <= 0) {

    cart =
      cart.filter(
        (product) =>
          product.id !== id
      );

  }


  save();

  updateBadges();

  renderCart();

}


/* =========================================================
   REMOVE CART ITEM
========================================================= */

function removeCart(id) {

  cart =
    cart.filter(
      (item) =>
        item.id !== id
    );


  save();

  updateBadges();

  renderCart();

  toast(
    "Product removed from cart"
  );

}


/* =========================================================
   SUBTOTAL
========================================================= */

function subtotalValue() {

  return cart.reduce(
    (sum, item) => {

      const product =
        products.find(
          (product) =>
            product.id === item.id
        );


      if (!product) {
        return sum;
      }


      return (
        sum +
        product.price * item.qty
      );

    },
    0
  );

}


/* =========================================================
   RENDER CART
========================================================= */

function renderCart() {

  const box =
    $("#cartItems");


  if (!cart.length) {

    box.innerHTML = `

      <div class="empty-state">

        <i class="fa-solid fa-cart-shopping"></i>

        <h3>
          Your cart is empty
        </h3>

        <p>
          Add something you love.
        </p>

      </div>

    `;


    updateSummary();

    return;

  }


  box.innerHTML =
    cart.map((item) => {

      const product =
        products.find(
          (p) =>
            p.id === item.id
        );


      if (!product) {
        return "";
      }


      return `

        <div class="cart-row">

          <img
            src="${product.image}"
            alt="${product.name}"
          >


          <div>

            <h4>
              ${product.name}
            </h4>

            <p>
              ${money(product.price)}
            </p>


            <div class="qty">

              <button
                data-qty="${product.id}"
                data-change="-1"
              >
                −
              </button>

              <span>
                ${item.qty}
              </span>

              <button
                data-qty="${product.id}"
                data-change="1"
              >
                +
              </button>

            </div>

          </div>


          <button
            class="remove"
            data-remove="${product.id}"
          >
            Remove
          </button>

        </div>

      `;

    }).join("");


  updateSummary();

}


/* =========================================================
   UPDATE SUMMARY
========================================================= */

function updateSummary() {

  const subtotal =
    subtotalValue();


  const discount =
    couponApplied
      ? Math.round(
          subtotal * 0.10
        )
      : 0;


  const total =
    Math.max(
      0,
      subtotal - discount
    );


  $("#subtotal").textContent =
    money(subtotal);


  $("#discount").textContent =
    "- " + money(discount);


  $("#total").textContent =
    money(total);

}


/* =========================================================
   APPLY COUPON
========================================================= */

function applyCoupon() {

  const code =
    $("#couponInput")
      .value
      .trim()
      .toUpperCase();


  if (code === "SMART10") {

    couponApplied = true;

    updateSummary();

    toast(
      "10% coupon applied successfully!"
    );

  } else {

    couponApplied = false;

    updateSummary();

    toast(
      "Use coupon SMART10",
      false
    );

  }

}


/* =========================================================
   WISHLIST
========================================================= */

function toggleWishlist(id) {

  const exists =
    wishlist.includes(id);


  if (exists) {

    wishlist =
      wishlist.filter(
        (item) =>
          item !== id
      );

  } else {

    wishlist.push(id);

  }


  save();

  updateBadges();

  renderProducts();

  renderWishlist();


  toast(
    exists
      ? "Removed from wishlist"
      : "Added to wishlist"
  );

}


/* =========================================================
   RENDER WISHLIST
========================================================= */

function renderWishlist() {

  const box =
    $("#wishlistItems");


  const list =
    wishlist
      .map(
        (id) =>
          products.find(
            (product) =>
              product.id === id
          )
      )
      .filter(Boolean);


  if (!list.length) {

    box.innerHTML = `

      <div class="empty-state">

        <i class="fa-regular fa-heart"></i>

        <h3>
          No saved items
        </h3>

        <p>
          Your favorite products
          will appear here.
        </p>

      </div>

    `;

    return;

  }


  box.innerHTML =
    list.map((product) => {

      return `

        <div class="wishlist-card">

          <img
            src="${product.image}"
            alt="${product.name}"
          >


          <div>

            <strong>
              ${product.name}
            </strong>

            <p>
              ${money(product.price)}
            </p>

          </div>


          <button
            data-wish-remove="${product.id}"
            aria-label="Remove wishlist item"
          >

            <i class="fa-solid fa-trash"></i>

          </button>

        </div>

      `;

    }).join("");

}


/* =========================================================
   OPEN DRAWER
========================================================= */

function openDrawer(id) {

  $("#overlay")
    .classList
    .add("active");


  $("#" + id)
    .classList
    .add("active");

}


/* =========================================================
   CLOSE EVERYTHING
========================================================= */

function closeAll() {

  $$(".drawer, .modal")
    .forEach((element) => {

      element.classList.remove(
        "active"
      );

    });


  $("#overlay")
    .classList
    .remove("active");

}


/* =========================================================
   PRODUCT QUICK VIEW
========================================================= */

function openProduct(id) {

  const product =
    products.find(
      (item) =>
        item.id === id
    );


  if (!product) {
    return;
  }


  $("#productModalContent")
    .innerHTML = `

      <div class="detail">

        <img
          src="${product.image}"
          alt="${product.name}"
        >


        <div>

          <span class="eyebrow">
            ${product.category}
          </span>


          <h2>
            ${product.name}
          </h2>


          <div class="rating">

            ${stars(product.rating)}

            <span>
              ${product.rating} / 5
            </span>

          </div>


          <p>
            ${product.desc}
          </p>


          <div class="price">

            ${money(product.price)}

            <span class="old-price">
              ${money(product.oldPrice)}
            </span>

          </div>


          <button
            class="primary-btn full"
            data-modal-add="${product.id}"
          >

            <i class="fa-solid fa-cart-plus"></i>

            Add to Cart

          </button>

        </div>

      </div>

    `;


  $("#productModal")
    .classList
    .add("active");

}


/* =========================================================
   CATEGORY FILTER
========================================================= */

$$(".category-tile")
  .forEach((button) => {

    button.addEventListener(
      "click",
      () => {

        $$(".category-tile")
          .forEach((item) => {

            item.classList.remove(
              "active"
            );

          });


        button.classList.add(
          "active"
        );


        currentCategory =
          button.dataset.category;


        renderProducts();


        $("#products")
          .scrollIntoView({
            behavior: "smooth"
          });

      }
    );

  });


/* =========================================================
   SEARCH
========================================================= */

$("#searchInput")
  .addEventListener(
    "input",
    renderProducts
  );


/* =========================================================
   SORT
========================================================= */

$("#sortSelect")
  .addEventListener(
    "change",
    renderProducts
  );


/* =========================================================
   RESET FILTERS
========================================================= */

$("#resetFilters")
  .addEventListener(
    "click",
    () => {

      $("#searchInput").value = "";

      $("#sortSelect").value =
        "featured";


      currentCategory =
        "All";


      $$(".category-tile")
        .forEach((button) => {

          button.classList.toggle(
            "active",
            button.dataset.category ===
              "All"
          );

        });


      renderProducts();

    }
  );


/* =========================================================
   PRODUCT BUTTON EVENTS
========================================================= */

$("#productsContainer")
  .addEventListener(
    "click",
    (event) => {

      const wish =
        event.target.closest(
          "[data-wish]"
        );


      if (wish) {

        toggleWishlist(
          Number(
            wish.dataset.wish
          )
        );

        return;

      }


      const add =
        event.target.closest(
          "[data-add]"
        );


      if (add) {

        addToCart(
          Number(
            add.dataset.add
          )
        );

        return;

      }


      const view =
        event.target.closest(
          "[data-view]"
        );


      if (view) {

        openProduct(
          Number(
            view.dataset.view
          )
        );

      }

    }
  );


/* =========================================================
   CART BUTTON EVENTS
========================================================= */

$("#cartItems")
  .addEventListener(
    "click",
    (event) => {

      const quantity =
        event.target.closest(
          "[data-qty]"
        );


      if (quantity) {

        changeQty(
          Number(
            quantity.dataset.qty
          ),
          Number(
            quantity.dataset.change
          )
        );

        return;

      }


      const remove =
        event.target.closest(
          "[data-remove]"
        );


      if (remove) {

        removeCart(
          Number(
            remove.dataset.remove
          )
        );

      }

    }
  );


/* =========================================================
   WISHLIST EVENTS
========================================================= */

$("#wishlistItems")
  .addEventListener(
    "click",
    (event) => {

      const remove =
        event.target.closest(
          "[data-wish-remove]"
        );


      if (remove) {

        toggleWishlist(
          Number(
            remove.dataset.wishRemove
          )
        );

      }

    }
  );


/* =========================================================
   CART OPEN
========================================================= */

$("#cartBtn")
  .addEventListener(
    "click",
    () => {

      renderCart();

      openDrawer(
        "cartDrawer"
      );

    }
  );


/* =========================================================
   WISHLIST OPEN
========================================================= */

$("#wishlistBtn")
  .addEventListener(
    "click",
    () => {

      renderWishlist();

      openDrawer(
        "wishlistDrawer"
      );

    }
  );


/* =========================================================
   OVERLAY CLOSE
========================================================= */

$("#overlay")
  .addEventListener(
    "click",
    closeAll
  );


/* =========================================================
   CLOSE BUTTONS
========================================================= */

$$("[data-close]")
  .forEach((button) => {

    button.addEventListener(
      "click",
      closeAll
    );

  });


/* =========================================================
   MODAL CLOSE
========================================================= */

$$(".modal-close")
  .forEach((button) => {

    button.addEventListener(
      "click",
      closeAll
    );

  });


/* =========================================================
   PRODUCT MODAL BACKGROUND
========================================================= */

$("#productModal")
  .addEventListener(
    "click",
    (event) => {

      if (
        event.target.id ===
        "productModal"
      ) {

        closeAll();

      }

    }
  );


/* =========================================================
   PRODUCT MODAL ADD TO CART
========================================================= */

$("#productModalContent")
  .addEventListener(
    "click",
    (event) => {

      const button =
        event.target.closest(
          "[data-modal-add]"
        );


      if (button) {

        addToCart(
          Number(
            button.dataset.modalAdd
          )
        );

        closeAll();

      }

    }
  );


/* =========================================================
   APPLY COUPON BUTTON
========================================================= */

$("#applyCoupon")
  .addEventListener(
    "click",
    applyCoupon
  );


/* =========================================================
   COPY COUPON
========================================================= */

$("#copyCoupon")
  .addEventListener(
    "click",
    async () => {

      try {

        await navigator.clipboard
          .writeText("SMART10");

        toast(
          "Coupon SMART10 copied!"
        );

      } catch {

        $("#couponInput").value =
          "SMART10";

        toast(
          "Coupon SMART10 is ready to apply!"
        );

      }

    }
  );


/* =========================================================
   CHECKOUT
========================================================= */

$("#checkoutBtn")
  .addEventListener(
    "click",
    () => {

      if (!cart.length) {

        toast(
          "Your cart is empty",
          false
        );

        return;

      }


      closeAll();


      $("#checkoutModal")
        .classList
        .add("active");

    }
  );


/* =========================================================
   CHECKOUT FORM
========================================================= */

$("#checkoutForm")
  .addEventListener(
    "submit",
    (event) => {

      event.preventDefault();


      cart = [];

      couponApplied = false;


      save();

      updateBadges();

      renderCart();


      closeAll();


      event.target.reset();


      toast(
        "Order placed successfully!"
      );

    }
  );


/* =========================================================
   DARK MODE
========================================================= */

$("#themeBtn")
  .addEventListener(
    "click",
    () => {

      document.body
        .classList
        .toggle("dark");


      const dark =
        document.body
          .classList
          .contains("dark");


      localStorage.setItem(
        "smartshop-dark",
        dark
      );


      $("#themeBtn").innerHTML =
        dark
          ? '<i class="fa-solid fa-sun"></i>'
          : '<i class="fa-solid fa-moon"></i>';

    }
  );


/* =========================================================
   LOAD DARK MODE
========================================================= */

if (
  localStorage.getItem(
    "smartshop-dark"
  ) === "true"
) {

  document.body
    .classList
    .add("dark");


  $("#themeBtn").innerHTML =
    '<i class="fa-solid fa-sun"></i>';

}


/* =========================================================
   MOBILE MENU
========================================================= */

$("#menuBtn")
  .addEventListener(
    "click",
    () => {

      $("#nav")
        .classList
        .toggle("open");

    }
  );


/* =========================================================
   CLOSE MOBILE MENU
========================================================= */

$$(".nav a")
  .forEach((link) => {

    link.addEventListener(
      "click",
      () => {

        $("#nav")
          .classList
          .remove("open");

      }
    );

  });


/* =========================================================
   BACK TO TOP
========================================================= */

$("#topBtn")
  .addEventListener(
    "click",
    () => {

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });

    }
  );


/* =========================================================
   SHOW BACK TO TOP
========================================================= */

window.addEventListener(
  "scroll",
  () => {

    $("#topBtn")
      .classList
      .toggle(
        "show",
        window.scrollY > 500
      );

  }
);


/* =========================================================
   DEAL COUNTDOWN
========================================================= */

let seconds =
  12 * 60 * 60;


function updateCountdown() {

  seconds--;


  if (seconds < 0) {

    seconds =
      12 * 60 * 60;

  }


  const hours =
    String(
      Math.floor(
        seconds / 3600
      )
    ).padStart(2, "0");


  const minutes =
    String(
      Math.floor(
        (seconds % 3600) / 60
      )
    ).padStart(2, "0");


  const remainingSeconds =
    String(
      seconds % 60
    ).padStart(2, "0");


  $("#countdown").textContent =
    `${hours}:${minutes}:${remainingSeconds}`;

}


setInterval(
  updateCountdown,
  1000
);


/* =========================================================
   INITIAL LOAD
========================================================= */

renderProducts();

renderCart();

renderWishlist();

updateBadges();

updateCountdown();