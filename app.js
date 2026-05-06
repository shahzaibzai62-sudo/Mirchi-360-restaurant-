// 🔥 Firebase imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.12.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/12.12.1/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/12.12.1/firebase-storage.js";

// 🔥 Config
const firebaseConfig = {
  apiKey: "YOUR_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "XXXX",
  appId: "XXXX"
};

// 🔥 Init
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

let menuDiv = document.getElementById("menu");

// 🔥 ADD ITEM
window.addItem = async function () {
  let name = document.getElementById("name").value;
  let price = document.getElementById("price").value;
  let file = document.getElementById("img").files[0];

  if (!name || !price || !file) {
    alert("Sab fields fill karo!");
    return;
  }

  // upload image
  const storageRef = ref(storage, "foods/" + file.name);
  await uploadBytes(storageRef, file);

  const url = await getDownloadURL(storageRef);

  // save data
  await addDoc(collection(db, "menu"), {
    name: name,
    price: price,
    image: url
  });

  alert("Item added!");

  loadMenu(); // refresh menu
};

// 🔥 LOAD MENU
async function loadMenu() {
  menuDiv.innerHTML = "";

  const querySnapshot = await getDocs(collection(db, "menu"));

  querySnapshot.forEach((doc) => {
    let data = doc.data();

    let card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <img src="${data.image}">
      <h3>${data.name}</h3>
      <p>Rs. ${data.price}</p>
    `;

    menuDiv.appendChild(card);
  });
}

// 🔥 AUTO LOAD
loadMenu();
