import { orders } from "../data/orders.js";
import { getProduct } from "../data/products.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
import formatCurrency from "./utils/money.js";
import { loadProductsFetch } from "../data/products.js";
import { cart } from "../data/cart-class.js";

async function loadPage() {
    await loadProductsFetch();

    if (!orders || orders.length === 0) {
        const parentEl = document.querySelector(".main");
        const msgEl = document.createElement("h1");
        msgEl.innerHTML = "Cart is empty!";
        msgEl.style.color = "red";
        msgEl.style.textAlign = "center";
        parentEl.append(msgEl);
        return;
    }

    let orderSummaryHTML = "";

    orders.forEach((order) => {
        orderSummaryHTML += `
        <div class="order-container">
            <div class="order-header">
                <div class="order-header-left-section">
                    <div class="order-date">
                        <div class="order-header-label">Order Placed:</div>
                        <div>${dayjs(order.orderTime).format("MMMM D")}</div>
                    </div>

                    <div class="order-total">
                        <div class="order-header-label">Total:</div>
                        <div>$${formatCurrency(order.totalCostCents)}</div>
                    </div>
                </div>
                <div class="order-header-right-section">
                    <div class="order-header-label">Order ID:</div>
                    <div>${order.id}</div>
                </div>
            </div>

            <div class="order-details-grid">
                ${productListHTML(order)}
            </div>
        </div>
    `;
    });

    document.querySelector(".js-orders-grid").innerHTML = orderSummaryHTML;
}

loadPage();

function productListHTML(order) {
    let productListHTML = "";

    order.products.forEach((productDetails) => {
        const product = getProduct(productDetails.productId);

        productListHTML += `
            <div class="product-image-container">
                <img src="${product.image}">
            </div>

            <div class="product-details">
                <div class="product-name">
                    ${product.name}
                </div>
                <div class="product-delivery-date">
                    Arriving on: ${dayjs(
                        productDetails.estimatedDeliveryTime
                    ).format("MMMM D")}
                </div>
                <div class="product-quantity">
                    Quantity: ${productDetails.quantity}
                </div>
                <button class="buy-again-button js-buy-again-button button-primary" data-product-id="${
                    product.id
                }">
                    <img class="buy-again-icon" src="images/icons/buy-again.png">
                    <span class="buy-again-message">Buy it again</span>
                </button>
            </div>

            <div class="product-actions">
                <a href="tracking.html?orderId=${order.id}&productId=${
            product.id
        }">
                    <button class="track-package-button js-track-package-button button-secondary">
                        Track package
                    </button>
                </a>
            </div>
        `;
    });

    return productListHTML;
}

///////////////////////////////////////////
document.querySelectorAll(".js-track-package-button").forEach((trackBtn) => {
    trackBtn.addEventListener("click", () => {
        window.location.href = "tracking.html";
    });
});

/////////////////////////////////////////
document.querySelectorAll(".js-buy-again-button").forEach((btn) => {
    btn.addEventListener("click", () => {
        const { productId } = btn.dataset;

        cart.addToCart(productId, 1);
    });
});

///////////////////////////////////////
function showTotalQuantity() {
    const totalQuantity = cart.cartItems.reduce(
        (sum, item) => sum + item.quantity,
        0
    );

    document.querySelector(".js-cart-quantity").innerHTML = totalQuantity;
}

showTotalQuantity();
