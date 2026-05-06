let menuDiv = document.getElementById("menu");
let cart = [];

// ADD FOOD
function addItem() {
  let name = document.getElementById("name").value;
  let price = document.getElementById("price").value;
  let file = document.getElementById("img").files[0];

  if (!name || !price || !file) {
    alert("Sab fill karo");
    return;
  }

  let reader = new FileReader();

  reader.onload = function () {
    let card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <img src="${reader.result}">
      <h3>${name}</h3>
      <p>Rs ${price}</p>
      <button onclick="addToCart('${name}', '${price}')">Add</button>
    `;

    menuDiv.appendChild(card);
  };

  reader.readAsDataURL(file);
}

// CART
function addToCart(name, price) {
  cart.push({ name, price });
  renderCart();
}

function renderCart() {
  let cartDiv = document.getElementById("cart");
  cartDiv.innerHTML = "";

  cart.forEach(i => {
    cartDiv.innerHTML += `<p>${i.name} - Rs ${i.price}</p>`;
  });
}

// WHATSAPP
function orderNow() {
  let msg = "Order:%0A";

  cart.forEach(i => {
    msg += `${i.name} - Rs ${i.price}%0A`;
  });

  window.open("https://wa.me/923324187360?text=" + msg);
}
