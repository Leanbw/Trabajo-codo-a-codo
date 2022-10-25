import{ saveCartItems, getCartItems } from "../js/storage.js";
import { checkStoragePrice } from "../js/scripts.js";
export { checkStorage };
let store = document.querySelector('.store');
let cartContainer = document.querySelector ('.cart-container')
let cartItems = [];
let cartTotal = 0;
let priceTotal = document.querySelector('.price-total')

window.addEventListener('DOMContentLoaded', loadEvents);

function loadEvents(){
    if (store){
    store.addEventListener('click', addProduct);
    }
    cartContainer.addEventListener('click', deleteItem);    
    checkStorage();
};

function checkStorage(){
    if(getCartItems()){
        cartItems = getCartItems(cartItems);
        cartTotal = parseInt(localStorage.getItem('priceSum'));
        printItem()        
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
                localStorage.setItem('priceSum', cartTotal)
                
            }
        });
        cartItems = cartItems.filter(product => product.id !== deleteId);
    }

    if (cartItems.length === 0) {
        priceTotal.innerHTML = 0;
        
    }
    localStorage.setItem('cart', JSON.stringify(cartItems))
    checkStoragePrice();
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
    saveCartItems(cartItems);
    localStorage.setItem('priceSum', cartTotal);
    checkStoragePrice();
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
    if (cartItems.length === 0) {
    cartContainer.insertAdjacentHTML('afterbegin', '<p class="cart-placeholder">Tu carrito esta vacío agrega un producto para comprar</p>')
    }
}

function clearList(){
    cartContainer.innerHTML = '';
}



