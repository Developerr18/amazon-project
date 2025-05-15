import { orders } from "../data/orders.js";
import { getProduct } from "../data/products.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
import formatCurrency from "./utils/money.js";
import { loadProductsFetch } from "../data/products.js";

async function loadPage() {
    await loadProductsFetch();

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
                <button class="buy-again-button button-primary">
                    <img class="buy-again-icon" src="images/icons/buy-again.png">
                    <span class="buy-again-message">Buy it again</span>
                </button>
            </div>

            <div class="product-actions">
                <a href="tracking.html ? orderId=${order.id}&productId=${
            product.id
        }">
                    <button class="track-package-button button-secondary">
                        Track package
                    </button>
                </a>
            </div>
        `;
    });

    return productListHTML;
}
