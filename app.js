let menu = [
  {name:"Zinger Burger", price:530, img:"burger.jpg"},
  {name:"Chicken Biryani", price:300, img:"biryani.jpg"},
  {name:"Chicken Karahi", price:1200, img:"karahi.jpg"},
  {name:"BBQ Fish", price:3000, img:"fish.jpg"},
  {name:"Pizza", price:800, img:"pizza.jpg"},
  {name:"Chowmein", price:1000, img:"chowmein.jpg"},
  {name:"Cold Drink", price:120, img:"drink.jpg"}
];

let cart = [];

let menuDiv = document.getElementById("menu");

menu.forEach((item,i)=>{
  menuDiv.innerHTML += `
  <div class="card">
    <img src="${item.img}">
    <h3>${item.name}</h3>
    <p>Rs ${item.price}</p>
    <button onclick="add(${i})">Add</button>
  </div>`;
});

function add(i){
  let found = cart.find(c=>c.name===menu[i].name);

  if(found){
    found.qty++;
  }else{
    cart.push({...menu[i], qty:1});
  }

  showCart();
}

function showCart(){
  let html="";
  let total=0;

  cart.forEach(c=>{
    total += c.price*c.qty;
    html += `<p>${c.name} x ${c.qty}</p>`;
  });

  document.getElementById("cartItems").innerHTML = html;
  document.getElementById("total").innerText = total;
}

function order(){
  let name = document.getElementById("name").value;
  let phone = document.getElementById("phone").value;

  let text = `Order:%0AName:${name}%0APhone:${phone}%0A`;

  cart.forEach(c=>{
    text += `${c.name} x ${c.qty}%0A`;
  });

  window.open("https://wa.me/923XXXXXXXXX?text=" + text);
}
