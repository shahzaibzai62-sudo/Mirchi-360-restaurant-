import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";

// 🔴 PASTE YOUR FIREBASE CONFIG HERE
const firebaseConfig = {
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
