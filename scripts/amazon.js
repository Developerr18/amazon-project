import { cart } from "../data/cart-class.js";
import { products, loadProducts } from "../data/products.js";

loadProducts(renderProductsGrid);

function renderProductsGrid() {
    let productsHTML = "";

    products.forEach((product) => {
        productsHTML += `
        <div class="product-container">
            <div class="product-image-container">
                <img class="product-image" src="${product.image}">
            </div>
            <div class="product-name limit-text-to-2-lines">
                ${product.name}
            </div>
            <div class="product-rating-container">
                <img class="product-rating-stars" src="${product.getStarsUrl()}">
                <div class="product-rating-count link-primary">
                    ${product.rating.count}
                </div>
            </div>
            <div class="product-price">${product.getPrice()}</div>
            <div class="product-quantity-container">
                <select class="js-quantity-selector-${product.id}">
                    <option selected value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                </select>
            </div>

            ${product.extraInfoHTML()}

            <div class="product-spacer"></div>
            <div class="added-to-cart js-added-to-cart-${product.id}">
                <img src="images/icons/checkmark.png">
                Added
            </div>
            <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${
                product.id
            }">
                Add to Cart
            </button>
        </div>
    `;
    });

    // show product list
    document.querySelector(".js-products-grid").innerHTML = productsHTML;

    // update and display total cart quantity
    function updateCartQuantity() {
        const totalQuantity = cart.cartItems.reduce(
            (sum, cartItem) => sum + cartItem.quantity,
            0
        );
        document.querySelector(".js-cart-quantity").innerHTML = totalQuantity;
    }

    updateCartQuantity();

    // when clicking on add to cart button
    const addToCartButtons = document.querySelectorAll(".js-add-to-cart");
    const timeoutIds = {};

    addToCartButtons.forEach((buttonEl) => {
        buttonEl.addEventListener("click", () => {
            const { productId } = buttonEl.dataset;
            const quantitySelectorEl = document.querySelector(
                `.js-quantity-selector-${productId}`
            ).value;
            const selectedQuantity = Number(quantitySelectorEl);
            const addedMsgEl = document.querySelector(
                `.js-added-to-cart-${productId}`
            );

            cart.addToCart(productId, selectedQuantity);
            updateCartQuantity();

            /* show and remove added msg feature */
            addedMsgEl.classList.add("js-added-to-cart");
            // clear prev timeout
            if (timeoutIds[productId]) {
                clearTimeout(timeoutIds[productId]);
            }
            // remove added msg
            timeoutIds[productId] = setTimeout(() => {
                addedMsgEl.classList.remove("js-added-to-cart");
            }, 2000);
        });
    });
}
