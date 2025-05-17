import { cart } from "../../data/cart-class.js";

export function renderCheckoutHeader() {
    let totalCartQuantity = 0;

    if (cart.cartItems.length === 0) {
        totalCartQuantity = 0;
    } else {
        totalCartQuantity = cart.cartItems.reduce(
            (sum, cartItem) => sum + cartItem.quantity,
            0
        );
    }

    const checkoutHeader = `
        <div class="header-content">
            <div class="checkout-header-left-section">
                <a href="amazon.html">
                    <img class="amazon-logo" src="images/amazon-logo.png">
                    <img class="amazon-mobile-logo" src="images/amazon-mobile-logo.png">
                </a>
            </div>
            <div class="checkout-header-middle-section">
                Checkout (<a class="return-to-home-link js-return-to-home-link" href="amazon.html">${totalCartQuantity} items</a>)
            </div>
            <div class="checkout-header-right-section">
                <img src="images/icons/checkout-lock-icon.png">
            </div>
        </div>
    `;

    document.querySelector(".js-checkout-header").innerHTML = checkoutHeader;
}
