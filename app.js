let menu = [];
let cart = [];

// 🔥 LOAD MENU FROM FIREBASE
async function loadMenu(){
  const querySnapshot = await window.getDocs(window.collection(window.db, "menu"));
  menu = [];

  querySnapshot.forEach((doc)=>{
    menu.push(doc.data());
  });

  render();
}

// 🔥 ADD ITEM (ADMIN)
window.addItem = async function(){
  const name = document.getElementById("name").value;
  const price = document.getElementById("price").value;
  const file = document.getElementById("image").files[0];

  if(!name || !price || !file){
    alert("Fill all fields");
    return;
  }

  const storageRef = window.ref(window.storage, "foods/" + file.name);

  await window.uploadBytes(storageRef, file);
  const imageUrl = await window.getDownloadURL(storageRef);

  await window.addDoc(window.collection(window.db, "menu"), {
    name: name,
    price: Number(price),
    image: imageUrl
  });

  alert("Item Added!");
  loadMenu();
}

// 🔥 RENDER MENU
function render(){
  const menuDiv = document.getElementById("menu");

  if(!menuDiv) return;

  menuDiv.innerHTML = menu.map(item=>`
    <div class="card">
      <img src="${item.image}" />
      <h3>${item.name}</h3>
      <p>Rs ${item.price}</p>
    </div>
  `).join("");
}

// 🔥 LOAD ON START
loadMenu();
