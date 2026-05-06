let menuDiv = document.getElementById("menu");
let cartDiv = document.getElementById("cart");
let whatsappBtn = document.getElementById("whatsappBtn");

let cart = [];
let menu = JSON.parse(localStorage.getItem("menu")) || [];

/* LOGIN */
function login(){
  let u = document.getElementById("user").value;
  let p = document.getElementById("pass").value;

  if(u==="admin" && p==="1234"){
    document.getElementById("loginBox").style.display="none";
    document.getElementById("adminPanel").style.display="block";
  } else {
    alert("Wrong login");
  }
}

/* ADD ITEM */
function addItem(){
  let name = document.getElementById("name").value;
  let price = document.getElementById("price").value;
  let file = document.getElementById("img").files[0];

  let reader = new FileReader();

  reader.onload=function(){
    let item = {name,price,image:reader.result};
    menu.push(item);
    localStorage.setItem("menu",JSON.stringify(menu));
    renderMenu();
  };

  if(file) reader.readAsDataURL(file);
}

/* SHOW MENU */
function renderMenu(){
  menuDiv.innerHTML="";

  menu.forEach((item,i)=>{
    menuDiv.innerHTML += `
      <div class="card">
        <img src="${item.image}">
        <h3>${item.name}</h3>
        <p>Rs ${item.price}</p>
        <button onclick="addToCart('${item.name}',${item.price})">Add</button>
        <button onclick="deleteItem(${i})">Delete</button>
      </div>
    `;
  });
}

/* DELETE */
function deleteItem(i){
  menu.splice(i,1);
  localStorage.setItem("menu",JSON.stringify(menu));
  renderMenu();
}

/* CART */
function addToCart(name,price){
  cart.push({name,price:Number(price)});
  updateCart();
}

function updateCart(){
  cartDiv.innerHTML="";
  let total=0;

  let payment = document.querySelector('input[name="pay"]:checked');
  let pay = payment ? payment.value : "Not selected";

  let text="Order:%0A";

  cart.forEach(i=>{
    total+=i.price;
    cartDiv.innerHTML += `<p>${i.name} - Rs ${i.price}</p>`;
    text+=`${i.name} - Rs ${i.price}%0A`;
  });

  cartDiv.innerHTML += `<h3>Total: Rs ${total}</h3>`;
  text+=`Total: Rs ${total}%0APayment: ${pay}`;

  whatsappBtn.href=`https://wa.me/923324187360?text=${text}`;
}

/* LOAD */
renderMenu();
