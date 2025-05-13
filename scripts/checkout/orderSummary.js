import { cart } from "../../data/cart-class.js";
import { getProduct } from "../../data/products.js";
import formatCurrency from "../utils/money.js";
import {
    deliveryOptions,
    getDeliveryOption,
    calculateDeliveryDate,
} from "../../data/deliveryOptions.js";
import { renderPaymentSummary } from "./paymentSummary.js";
import { renderCheckoutHeader } from "./checkoutHeader.js";
console.log(cart);

////////////////////////////////////////
export function renderOrderSummary() {
    let cartSummaryHTML = "";

    cart.cartItems.forEach((cartItem) => {
        const productId = cartItem.productId;
        const matchingProduct = getProduct(productId);
        const deliveryOptionId = cartItem.deliveryOptionId;
        const deliveryOption = getDeliveryOption(deliveryOptionId);

        cartSummaryHTML += `
        <div class="cart-item-container js-cart-item-container-${
            matchingProduct.id
        }">
            <div class="delivery-date">
                    Delivery date: ${calculateDeliveryDate(deliveryOption)}
                </div>
                <div class="cart-item-details-grid">
                    <img class="product-image" src="${matchingProduct.image}">
                    <div class="cart-item-details">
                        <div class="product-name">
                            ${matchingProduct.name}
                        </div>
                        <div class="product-price">
                            ${matchingProduct.getPrice()}
                        </div>
                        <div class="product-quantity">
                            <span>
                                Quantity: <span class="quantity-label js-quantity-label-${
                                    matchingProduct.id
                                }">${cartItem.quantity}</span>
                            </span>
                            <span class="update-quantity-link js-update-quantity-link link-primary" data-product-id = "${
                                matchingProduct.id
                            }">
                                Update
                            </span>
                            <input class="quantity-input js-quantity-input-${
                                matchingProduct.id
                            }" data-product-id=${
            matchingProduct.id
        } type="number" />
                            <span class="save-quantity-link link-primary js-save-quantity-link" data-product-id="${
                                matchingProduct.id
                            }">Save</span>
                            <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${
                                matchingProduct.id
                            }">
                                Delete
                            </span>
                        </div>
                    </div>
                    <div class="delivery-options">
                        <div class="delivery-options-title">
                            Choose a delivery option:
                        </div>
                        ${deliveryOptionsHTML(matchingProduct, cartItem)}
                </div>
            </div>
        </div>
    `;
    });

    document.querySelector(".js-order-summary").innerHTML = cartSummaryHTML;

    //////////////////////////////////////
    function deliveryOptionsHTML(matchingProduct, cartItem) {
        let html = "";

        deliveryOptions.forEach((deliveryOption) => {
            const priceString =
                deliveryOption.priceCents === 0
                    ? "FREE"
                    : `$${formatCurrency(deliveryOption.priceCents)} -`;

            const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

            html += `
            <div class="delivery-option js-delivery-option" data-product-id="${
                matchingProduct.id
            }" data-delivery-option-id="${deliveryOption.id}">
                <input type="radio" ${
                    isChecked ? "checked" : ""
                } class="delivery-option-input" name="delivery-option-${
                matchingProduct.id
            }">
                <div>
                    <div class="delivery-option-date">
                        ${calculateDeliveryDate(deliveryOption)}
                    </div>
                    <div class="delivery-option-price">
                        ${priceString} Shipping
                    </div>
                </div>
            </div>
        `;
        });

        return html;
    }

    //////////////////////////////////////
    // to delete product from cart
    document.querySelectorAll(".js-delete-link").forEach((link) => {
        link.addEventListener("click", () => {
            const { productId } = link.dataset;
            cart.removeFromCart(productId);

            /*
            const container = document.querySelector(
                `.js-cart-item-container-${productId}`
            );
            container.remove();
            */
            renderCheckoutHeader();
            renderOrderSummary();
            renderPaymentSummary();
        });
    });

    //////////////////////////////////////
    document
        .querySelectorAll(".js-update-quantity-link")
        .forEach((updateLink) => {
            updateLink.addEventListener("click", () => {
                const { productId } = updateLink.dataset;
                const itemContainer = document.querySelector(
                    `.js-cart-item-container-${productId}`
                );

                itemContainer.classList.add("is-editing-quantity");
            });
        });

    //////////////////////////////////////
    // handle click on all 'save quantity' links
    document.querySelectorAll(".js-save-quantity-link").forEach((link) => {
        const productId = link.dataset.productId;
        const quantityInput = document.querySelector(
            `.js-quantity-input-${productId}`
        );

        // Click event
        link.addEventListener("click", () => {
            handleUpdateQuantity(productId, quantityInput);
        });

        // Keydown event
        quantityInput.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
                handleUpdateQuantity(productId, quantityInput);
            }
        });
    });

    //////////////////////////////////
    function handleUpdateQuantity(productId, quantityInput) {
        const container = document.querySelector(
            `.js-cart-item-container-${productId}`
        );
        const quantityLabel = document.querySelector(
            `.js-quantity-label-${productId}`
        );

        const newQuantity = Number(quantityInput.value);
        if (newQuantity <= 0 || newQuantity >= 1000) {
            alert("Quantity must be at least 1 and less than 1000 ");
            return; // early return
        }

        // update data
        cart.updateQuantity(productId, newQuantity);

        // update UI
        quantityLabel.innerHTML = newQuantity;
        container.classList.remove("is-editing-quantity");
        renderCheckoutHeader();
        renderOrderSummary();
        renderPaymentSummary();
    }

    ///////////////////////////////////////
    // update delivery option
    document.querySelectorAll(".js-delivery-option").forEach((el) => {
        el.addEventListener("click", () => {
            const { productId, deliveryOptionId } = el.dataset;

            cart.updateDeliveryOption(productId, deliveryOptionId);
            renderOrderSummary();
            renderPaymentSummary();
        });
    });
}
