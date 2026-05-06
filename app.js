let menuDiv = document.getElementById("menu");
let cartDiv = document.getElementById("cart");

let cart = [];

window.addItem = function () {
  let name = document.getElementById("name").value;
  let price = document.getElementById("price").value;
  let file = document.getElementById("img").files[0];

  let reader = new FileReader();

  reader.onload = function () {
    let card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <img src="${reader.result}">
      <h3>${name}</h3>
      <p>Rs ${price}</p>
      <button onclick="addToCart('${name}', ${price})">Add</button>
    `;

    menuDiv.appendChild(card);
  };

  if (file) {
    reader.readAsDataURL(file);
  }
};

window.addToCart = function (name, price) {
  cart.push({ name, price });
  renderCart();
};

function renderCart() {
  cartDiv.innerHTML = "";

  cart.forEach(item => {
    cartDiv.innerHTML += `<p>${item.name} - Rs ${item.price}</p>`;
  });
}

window.orderWhatsApp = function () {
  let text = "Order:%0A";

  cart.forEach(item => {
    text += `${item.name} - Rs ${item.price}%0A`;
  });

  window.open(`https://wa.me/923000000000?text=${text}`);
};
