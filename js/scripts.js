import { getCartPrice } from "../js/storage.js";

let burguerBtn = document.querySelector(".burguer-menu");
function display() {
    let x = document.getElementById("menuMobile");
    if (x.style.display === "none") {
      x.style.display = "flex";
      x.style.display = "text-align: center";
    } else {
      x.style.display = "none";
    }
  }
  burguerBtn.addEventListener('click', function(){
    display();
  });

  function checkStoragePrice(){
    if(getCartPrice()){
        let cartTotal = parseInt(localStorage.getItem('priceSum'));
        let cartIcons = document.querySelectorAll('.totalCartPrice')
        cartIcons.forEach(cartNumber => {
          cartNumber.innerHTML =  `Mi carrito <i class="fa-solid fa-cart-shopping"></i> $${cartTotal}`
        });
    }
}

 

  checkStoragePrice();


export { checkStoragePrice };

