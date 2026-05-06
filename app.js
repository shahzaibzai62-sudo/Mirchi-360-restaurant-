let menuDiv = document.getElementById("menu");
let cartDiv = document.getElementById("cartItems");

let cart = [];

// 🔥 ADD ITEM
function addItem() {
  let name = document.getElementById("name").value;
  let price = document.getElementById("price").value;
  let file = document.getElementById("img").files[0];

  let reader = new FileReader();

  reader.onload = function () {
    createCard(name, price, reader.result);
  };

  if (file) {
    reader.readAsDataURL(file);
  }
}

// 🔥 CREATE CARD
function createCard(name, price, img) {
  let card = document.createElement("div");
  card.className = "card";

  card.innerHTML = `
    <img src="${img}">
    <h3>${name}</h3>
    <p>Rs ${price}</p>
    <button onclick="addToCart('${name}', ${price})">Add</button>
  `;

  menuDiv.appendChild(card);
}

// 🔥 ADD TO CART
function addToCart(name, price) {
  cart.push({name, price});
  renderCart();
}

// 🔥 RENDER CART
function renderCart() {
  cartDiv.innerHTML = "";

  cart.forEach(item => {
    let p = document.createElement("p");
    p.innerText = `${item.name} - Rs ${item.price}`;
    cartDiv.appendChild(p);
  });
}

// 🔥 WHATSAPP ORDER
function orderWhatsApp() {
  let text = "Order:%0A";

  cart.forEach(item => {
    text += `${item.name} - Rs ${item.price}%0A`;
  });

  window.open(`https://wa.me/?text=${text}`);
}
