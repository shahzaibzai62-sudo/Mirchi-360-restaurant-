import { initializeApp } from "https://www.gstatic.com/firebasejs/12.12.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/12.12.1/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/12.12.1/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "mirchi-360-new.firebaseapp.com",
  projectId: "mirchi-360-new",
  storageBucket: "mirchi-360-new.appspot.com",
  messagingSenderId: "521251453403",
  appId: "1:521251453403:web:21f1eb1f2fdde8a98a8ffe"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

let menuDiv = document.getElementById("menu");
let cart = [];

// 🔐 LOGIN
window.login = function () {
  if (
    document.getElementById("username").value === "admin" &&
    document.getElementById("password").value === "1234"
  ) {
    document.getElementById("loginBox").style.display = "none";
    document.getElementById("adminPanel").style.display = "block";
  } else {
    alert("Wrong login");
  }
};

// ➕ ADD ITEM
window.addItem = async function () {
  let name = document.getElementById("name").value;
  let price = document.getElementById("price").value;
  let file = document.getElementById("img").files[0];

  const storageRef = ref(storage, "foods/" + file.name);
  await uploadBytes(storageRef, file);
  const url = await getDownloadURL(storageRef);

  await addDoc(collection(db, "menu"), {
    name,
    price,
    image: url
  });

  loadItems();
};

// 📥 LOAD MENU
async function loadItems() {
  menuDiv.innerHTML = "";
  const data = await getDocs(collection(db, "menu"));

  data.forEach(docu => {
    let d = docu.data();

    let card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <img src="${d.image}">
      <h3>${d.name}</h3>
      <p>Rs ${d.price}</p>
      <button onclick="addToCart('${d.name}','${d.price}')">Add</button>
      <button onclick="deleteItem('${docu.id}')">Delete</button>
    `;

    menuDiv.appendChild(card);
  });
}

// 🗑 DELETE
window.deleteItem = async function (id) {
  await deleteDoc(doc(db, "menu", id));
  loadItems();
};

// 🛒 CART
window.addToCart = function (name, price) {
  cart.push({ name, price });
  renderCart();
};

function renderCart() {
  let cartDiv = document.getElementById("cart");
  cartDiv.innerHTML = "";

  cart.forEach(i => {
    cartDiv.innerHTML += `<p>${i.name} - Rs ${i.price}</p>`;
  });
}

// 📲 WHATSAPP
window.orderNow = function () {
  let msg = "Order:%0A";
  cart.forEach(i => {
    msg += `${i.name} - Rs ${i.price}%0A`;
  });

  window.open("https://wa.me/923324187360?text=" + msg);
};

// AUTO LOAD
loadItems();
