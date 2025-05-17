import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";
import { loadProductsFetch } from "../data/products.js";
import { loadCartFetch } from "../data/cart.js";
// import "../data/cart-class.js";
// import "../data/car.js";

///////////////////////////////////////////
// async fn return promise
async function loadPage() {
    try {
        await loadProductsFetch();
        await loadCartFetch();

        renderCheckoutHeader();
        renderOrderSummary();
        renderPaymentSummary();

        return "value2";
    } catch (err) {
        console.error("Error loading page:", err);
    }
}

loadPage().then((value) => {
    console.log("nextstep!");
    console.log(value); // value2
});

////////////////////////////////////////
/*
Promise.all([
    loadProductsFetch(),
    new Promise((resolve, reject) => {
        try {
            loadCart(() => {
                resolve("value2");
            });
        } catch (error) {
            reject(error);
        }
    }),
])
    .then((values) => {
        console.log(values);

        renderCheckoutHeader();
        renderOrderSummary();
        renderPaymentSummary();
    })
    .catch((error) => {
        console.log("something went wrong!", error);
    });
*/

/////////////////////////////////////////
/*
new Promise((resolve, reject) => {
    try {
        loadProducts(() => {
            resolve("value1");
        });
    } catch (error) {
        reject(error);
    }
})
    .then((value) => {
        console.log(value);
        return new Promise((resolve, reject) => {
            try {
                loadCart(() => {
                    resolve();
                });
            } catch (error) {
                reject(error);
            }
        });
    })
    .then(() => {
        renderCheckoutHeader();
        renderOrderSummary();
        renderPaymentSummary();
    })
    .catch((error) => {
        console.error("something went wrong:", error);
    });
*/

//////////////////////////////////////////
/*
loadProducts(() => {
    loadCart(() => {
        renderCheckoutHeader();
        renderOrderSummary();
        renderPaymentSummary();
    });
});
*/
