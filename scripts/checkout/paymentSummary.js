import { cart } from "../../data/cart-class.js";
import { getProduct } from "../../data/products.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";
import formatCurrency from "../utils/money.js";
import { addOrder } from "../../data/orders.js";

export function renderPaymentSummary() {
    let productPriceCents = 0;
    let shippingPriceCents = 0;

    const itemsCount = cart.cartItems.reduce(
        (sum, cartItem) => sum + cartItem.quantity,
        0
    );

    cart.cartItems.forEach((cartItem) => {
        const product = getProduct(cartItem.productId);
        productPriceCents += product.priceCents * cartItem.quantity;

        const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
        shippingPriceCents += deliveryOption.priceCents;
    });

    const totalBeforeTaxCents = productPriceCents + shippingPriceCents;
    const taxCents = totalBeforeTaxCents * 0.1;
    const totalCents = totalBeforeTaxCents + taxCents;

    const paymentSummaryHTML = `
        <div class="payment-summary-title">
            Order Summary
        </div>
        <div class="payment-summary-row">
            <div class="js-items-qunatity">Items (${itemsCount}):</div>
            <div class="payment-summary-money">$${formatCurrency(
                productPriceCents
            )}</div>
        </div>
        <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${formatCurrency(
                shippingPriceCents
            )}</div>
        </div>
        <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${formatCurrency(
                totalBeforeTaxCents
            )}</div>
        </div>
        <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${formatCurrency(
                taxCents
            )}</div>
        </div>
        <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${formatCurrency(
                totalCents
            )}</div>
        </div>
        <button class="place-order-button button-primary js-place-order">
            Place your order
        </button>
    `;

    document.querySelector(".js-payment-summary").innerHTML =
        paymentSummaryHTML;

    updatePlaceOrderButton();
}

function updatePlaceOrderButton() {
    const placeOrderBtn = document.querySelector(".js-place-order");

    if (cart.cartItems.length === 0) {
        placeOrderBtn.classList.add("place-order-button-disable");
    } else {
        placeOrderBtn.classList.remove("place-order-button-disable");
    }

    // sent cart to backend
    placeOrderBtn.addEventListener("click", async () => {
        try {
            const response = await fetch(
                "https://supersimplebackend.dev/orders",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        cart: cart,
                    }),
                }
            );

            const orderDetails = await response.json();
            addOrder(orderDetails); // update data
        } catch (error) {
            console.error("unexpected error: try again later", error);
        }

        cart.cartItems = [];
        cart.saveToStorage();
        window.location.href = "orders.html";
    });
}
