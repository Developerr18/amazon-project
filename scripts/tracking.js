import { orders } from "../data/orders.js";
import { loadProductsFetch, getProduct } from "../data/products.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
import { cart } from "../data/cart-class.js";

async function loadPage() {
    await loadProductsFetch();

    // get orderId and productId from URL params
    const urlParams = new URLSearchParams(window.location.search);
    const orderId = urlParams.get("orderId");
    const productId = urlParams.get("productId");

    // get product details
    const order = orders.find((order) => order.id === orderId);
    const orderedProduct = order.products.find(
        (product) => product.productId === productId
    );
    const productInfo = getProduct(orderedProduct.productId);
    console.log(order);

    // calculate progress-bar width percentage
    const currentTime = dayjs();
    const orderTime = dayjs(order.orderTime);
    const deliveryTime = dayjs(productInfo.estimatedDeliveryTime);
    const progressbarPercent =
        ((currentTime - orderTime) / (deliveryTime - orderTime)) * 100;

    // creating html of page
    const trackingHTML = `
        <div class="order-tracking">
            <a class="back-to-orders-link link-primary" href="orders.html">
                View all orders
            </a>
            <div class="delivery-date">
                Arriving on ${dayjs(
                    orderedProduct.estimatedDeliveryTime
                ).format("dddd, MMMM D")}
            </div>
            <div class="product-info">
                ${productInfo.name}
            </div>
            <div class="product-info">
                Quantity: ${orderedProduct.quantity}
            </div>
            <img class="product-image" src="${productInfo.image}">

            <div class="progress-labels-container">
                <div class="progress-label ${
                    progressbarPercent < 50 ? "current-status" : ""
                }">
                    Preparing
                </div>
                <div class="progress-label ${
                    progressbarPercent >= 50 && progressbarPercent < 100
                        ? "current-status"
                        : ""
                }">
                    Shipped
                </div>
                <div class="progress-label ${
                    progressbarPercent >= 100 ? "current-status" : ""
                }">
                    Delivered
                </div>
            </div>

            <div class="progress-bar-container">
                <div class="progress-bar" style="width: ${progressbarPercent}%"></div>
            </div>
        </div>
    `;

    // upadte UI
    document.querySelector(".main").innerHTML = trackingHTML;
}

loadPage();

//////////////////////////////////////////
function showTotalQuantity() {
    const totalQuantity = cart.cartItems.reduce(
        (sum, item) => sum + item.quantity,
        0
    );

    document.querySelector(".js-cart-quantity").innerHTML = totalQuantity;
}

showTotalQuantity();
