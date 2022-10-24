let store = document.querySelector('.store');
let filterBtn = document.querySelector('#filters-btn')
let brushCheckbox = document.querySelector('#brush-filter')
let toyCheckbox = document.querySelector('#toy-filter')
let foodCheckbox = document.querySelector('#food-filter')
let toyItems = document.querySelectorAll('.toy-item');
let foodItems = document.querySelectorAll('.food-item');
let brushItems = document.querySelectorAll('.brush-item');
let cartContainer = document.querySelector ('.cart-container')
let cartItems = [];
let cartTotal = 0;
let priceTotal = document.querySelector('.price-total')
loadEventListeners();
function loadEventListeners(){
    filterBtn.addEventListener('click', displayFilters);
    store.addEventListener('click', addProduct);
    toyCheckbox.addEventListener('change', toyFilter);
    cartContainer.addEventListener('click', deleteItem);
}
function toyFilter(){
    if (toyCheckbox.checked){
        for (let i = 0; i < toyItems.length; i++){
            toyItems[i].style.display = "flex";
        }
        for (let i = 0; i < foodItems.length; i++){
            foodItems[i].style.display = "none";
        }
        for (let i = 0; i < brushItems.length; i++){
            brushItems[i].style.display = "none";
        }
    }else {
        for (let i = 0; i < toyItems.length; i++){
            toyItems[i].style.display = "none";
        }
    }
    
}
function displayFilters() {
    let x = document.getElementById("filterMenu");
    if (x.style.display === "none") {
      x.style.display = "flex";
      x.style.display = "text-align: center";
    } else {
      x.style.display = "none";
    }
  }
function addProduct(e){
    e.preventDefault();
    if(e.target.classList.contains('btn-cart')){
        const selectProduct = e.target.parentElement;
        readContent(selectProduct);
    }
}
function deleteItem(e){
    if(e.target.classList.contains('delete-item')){
        const deleteId = e.target.getAttribute('data-id');

        cartItems.forEach(value => {
            if (value.id == deleteId){
                let priceSubstract = parseInt(value.price) * parseInt(value.amount);
                cartTotal = cartTotal - priceSubstract;
                
            }
        });
        cartItems = cartItems.filter(product => product.id !== deleteId);
        
    }

    if (cartItems.length === 0) {
        priceTotal.innerHTML = 0;
    }
    printItem();
   
}
function readContent(product){
    const infoProduct = {
        image: product.querySelector('div img').src,
        title: product.querySelector('.item-name').textContent,
        price: product.querySelector('div p span').textContent,
        id: product.querySelector('a').getAttribute('data-id'),
        amount: 1
    }

    cartTotal = cartTotal + parseInt(infoProduct.price);

    const exist = cartItems.some(product => product.id === infoProduct.id);
    if (exist){
        const addedItems = cartItems.map(product => {
            if (product.id === infoProduct.id){
                product.amount++;
                return product;
            } else {
                return product;
            }
        });
        cartItems = [...addedItems];
    } else {
        cartItems = [...cartItems, infoProduct];
    }
    
    printItem();
}

function printItem(){
    clearList();
    cartItems.forEach(product => {
        const {image, title, price, amount, id} = product;
        const item = document.createElement('div');
        item.classList.add('cart-item');
        item.innerHTML = `
            <img src="${image}" alt="">
            <div class="item-content">
                <h5>${title}</h5>
                <h5 class="cart-price">$${price}</h5>
                <h6>Cantidad:${amount}</h6>
            </div>
            <span class="delete-item" data-id="${id}">X</span>
        `;
        cartContainer.appendChild(item);

        priceTotal.innerHTML = cartTotal;
    })
}

function clearList(){
    cartContainer.innerHTML = '';
}