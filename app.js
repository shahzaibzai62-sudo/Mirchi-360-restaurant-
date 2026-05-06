let menu = [];

// 🔥 Firebase imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.12.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/12.12.1/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/12.12.1/firebase-storage.js";

// 🔥 Firebase config (tumhara)
const firebaseConfig = {
  apiKey: "AIzaSyC7I-qQ7vFWOfsaAGYh9Q35RkV60j_hkQA",
  authDomain: "mirchi-360-new.firebaseapp.com",
  projectId: "mirchi-360-new",
  storageBucket: "mirchi-360-new.firebasestorage.app",
  messagingSenderId: "521251453403",
  appId: "1:521251453403:web:21f1eb1f2fdde8a98a8ffe"
};

// 🔥 Init
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

// 🔥 ADD ITEM (ADMIN)
window.addItem = async function () {
  const name = document.getElementById("name").value;
  const price = document.getElementById("price").value;
  const file = document.getElementById("img").files[0];

  if (!name || !price || !file) {
    alert("Fill all fields");
    return;
  }

  try {
    // upload image
    const storageRef = ref(storage, "foods/" + file.name);
    await uploadBytes(storageRef, file);
    const imageUrl = await getDownloadURL(storageRef);

    // save data
    await addDoc(collection(db, "menu"), {
      name: name,
      price: Number(price),
      image: imageUrl
    });

    alert("Item Added Successfully!");
    loadMenu();

  } catch (err) {
    console.error(err);
    alert("Error adding item");
  }
};

// 🔥 LOAD MENU
async function loadMenu() {
  const menuDiv = document.getElementById("menu");
  menuDiv.innerHTML = "";

  const querySnapshot = await getDocs(collection(db, "menu"));

  querySnapshot.forEach(doc => {
    const item = doc.data();

    menuDiv.innerHTML += `
      <div class="card">
        <img src="${item.image}" style="width:100%;height:160px;object-fit:cover">
        <div class="card-body">
          <h3>${item.name}</h3>
          <p class="price">Rs ${item.price}</p>
        </div>
      </div>
    `;
  });
}

// 🔥 RUN
loadMenu();
