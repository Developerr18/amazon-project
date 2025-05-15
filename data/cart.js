export let cart;

loadFromStorage();

export function loadFromStorage() {
    cart = JSON.parse(localStorage.getItem("cart"));

    if (!cart) {
        cart = [
            {
                productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                quantity: 2,
                deliveryOptionId: "1",
            },
            {
                productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
                quantity: 1,
                deliveryOptionId: "2",
            },
        ];
    }
}

/////////////////////////////////////
function saveToStorage() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

////////////////////////////////////////
export function addToCart(productId, selectedQuantity) {
    const matchingItem = cart.find(
        (cartItem) => cartItem.productId === productId
    );

    if (matchingItem) {
        matchingItem.quantity += selectedQuantity;
    } else {
        cart.push({
            productId,
            quantity: selectedQuantity,
            deliveryOptionId: "1",
        });
    }

    saveToStorage();
}

///////////////////////////////////////
export function removeFromCart(productId) {
    const newCart = cart.filter((cartItem) => cartItem.productId !== productId);

    cart = newCart;

    saveToStorage();
}

///////////////////////////////////////
export function updateQuantity(productId, newQuantity) {
    const matchingProduct = cart.find(
        (cartItem) => cartItem.productId === productId
    );
    if (matchingProduct) {
        matchingProduct.quantity = newQuantity;
    }

    saveToStorage();
}

///////////////////////////////////////
export function updateDeliveryOption(productId, deliveryOptionId) {
    const matchingItem = cart.find(
        (cartItem) => cartItem.productId === productId
    );

    matchingItem.deliveryOptionId = deliveryOptionId;

    saveToStorage();
}

//////////////////////////////////////////
export async function loadCartFetch() {
    try {
        const response = await fetch("https://supersimplebackend.dev/cart");

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.text();
        console.log(data);
    } catch (error) {
        console.error("Failed to load cart:", error);
    }
}
