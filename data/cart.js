export const cart = [];

// update cart
export function addToCart(productId, selectedQuantity) {
    const matchingItem = cart.forEach(
        (cartItem) => cartItem.productId === productId
    );
    if (matchingItem) {
        matchingItem.quantity += selectedQuantity;
    } else {
        cart.push({
            productId,
            quantity: selectedQuantity,
        });
    }
}
