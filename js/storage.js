let saveCartItems = (cartItems) => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
};

const getCartItems = () => {
    const cartStorage = JSON.parse(localStorage.getItem('cart'));
    return cartStorage;
}

const getCartPrice = () => {
    let cartTotalPrice = localStorage.getItem('priceSum');
    return cartTotalPrice;
}
export { saveCartItems, getCartItems, getCartPrice };
