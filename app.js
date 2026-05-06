import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";

// 🔴 PASTE YOUR FIREBASE CONFIG HERE
const firebaseConfig = {// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBnLcgZwm6aLWuTNrhvHJBVttSbiakaV2M",
  authDomain: "mirchi-360-88bd9.firebaseapp.com",
  projectId: "mirchi-360-88bd9",
  storageBucket: "mirchi-360-88bd9.firebasestorage.app",
  messagingSenderId: "721928045541",
  appId: "1:721928045541:web:f5121492982ab0a6df650c",
  measurementId: "G-1V9FGDH1W1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
  apiKey: "YOUR_KEY",
  authDomain: "YOUR_DOMAIN",
  projectId: "YOUR_ID",
  storageBucket: "YOUR_BUCKET",
  appId: "YOUR_APP"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

// ADD ITEM
window.addItem = async function(){

  const name = document.getElementById("name").value;
  const price = document.getElementById("price").value;
  const file = document.getElementById("img").files[0];

  if(!name || !price || !file){
    alert("Fill all fields");
    return;
  }

  try{
    const storageRef = ref(storage,"foods/"+file.name);
    await uploadBytes(storageRef,file);

    const url = await getDownloadURL(storageRef);

    await addDoc(collection(db,"menu"),{
      name,
      price:Number(price),
      img:url
    });

    loadMenu();

  }catch(err){
    alert("Error: "+err.message);
  }
}

// LOAD MENU
async function loadMenu(){

  const menuDiv = document.getElementById("menu");
  menuDiv.innerHTML = "";

  const snapshot = await getDocs(collection(db,"menu"));

  snapshot.forEach(doc=>{
    const item = doc.data();

    menuDiv.innerHTML += `
      <div class="card">
        <img src="${item.img}">
        <div class="card-body">
          <h3>${item.name}</h3>
          <p>Rs ${item.price}</p>
        </div>
      </div>
    `;
  });
}

loadMenu();
