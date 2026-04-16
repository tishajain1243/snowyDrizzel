document.addEventListener("DOMContentLoaded", () => {

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const cartItems = document.getElementById("cart-items");
  const totalEl = document.getElementById("total");

  // Add to Cart
  document.querySelectorAll(".add-to-cart").forEach(button => {
    button.addEventListener("click", () => {

      const name = button.getAttribute("data-name");
      const price = Number(button.getAttribute("data-price"));
      if (!name ||price=== undefined ||price===  null ||price===NaN) {
      console.error("Invalid item data"); //null, undefined ,0 ===> false 
      return;
      }
      // jab name me kuch value hogi or sath me (and) price me bhi kuch value (0, undefined , null nahi hoga isko chod ke kooi integer ho sakta hai)
      // ❌ Prevent 0 price items
      if ( price === 0) {
        alert("This is a special offer, can't be added to cart 😊");
        return;
      }

      let existing = cart.find(item => item.name.trim() === name.trim());

      if (existing) {
        existing.qty++;
      } else {
        cart.push({ name, price, qty: 1 });
      }

      
      updateCart();
    });
  });

    // ⭐ SEARCH FUNCTION (YAHAN AAYEGA - OUTSIDE CLICK EVENT)
  const searchInput = document.getElementById("search");

if (searchInput) {
  searchInput.addEventListener("input", function () {
    let value = this.value.toLowerCase();
    let items = document.querySelectorAll(".menu-item");

    items.forEach(item => {
      let name = item.querySelector("h3").innerText.toLowerCase();

      if (name.includes(value)) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
  });
}

  // Order button
  document.querySelectorAll(".order-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      alert("Order placed! 🍦");
    });
  });

  function updateCart() {
    cartItems.innerHTML = "";
    let total = 0;

    let count = 0; 

    cart.forEach((item, index) => {

      count += item.qty;

      const li = document.createElement("li");

      li.innerHTML = `
        ${item.name} - ₹${item.price} × ${item.qty}
      `;

      // ➖
      const minusBtn = document.createElement("button");
      minusBtn.textContent = "➖";
      minusBtn.onclick = () => {
        item.qty--;
        if (item.qty === 0) cart.splice(index, 1);
        updateCart();
      };

      // ➕
      const plusBtn = document.createElement("button");
      plusBtn.textContent = "➕";
      plusBtn.onclick = () => {
        item.qty++;
        updateCart();
      };

      // ❌
      const removeBtn = document.createElement("button");
      removeBtn.textContent = "❌";
      removeBtn.onclick = () => {
        cart.splice(index, 1);
        updateCart();
      };

      li.appendChild(minusBtn);
      li.appendChild(plusBtn);
      li.appendChild(removeBtn);

      cartItems.appendChild(li);

      total += item.price * item.qty;
    });

    totalEl.textContent = total;

    document.getElementById("cart-count").innerText = count;

    localStorage.setItem("cart", JSON.stringify(cart));
  }

  updateCart();

  // ⭐ THEME TOGGLE
const themeBtn = document.getElementById("themeToggle");

if (themeBtn) {
  themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");
  });
}

// Contact form
const contactForm = document.getElementById("contact-form");

if (contactForm) {
  contactForm.addEventListener("submit", function(e) {
    e.preventDefault();

   const nameInput = document.getElementById("name");
   const name = nameInput ? nameInput.value : "";

    document.getElementById("contact-msg").innerText =
      `Thanks ${name}, we will contact you soon! 🍦`;

    this.reset();
  });
}

});