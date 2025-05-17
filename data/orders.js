export const orders = JSON.parse(localStorage.getItem("orders")) || [];

export function addOrder(orderDetails) {
    orders.unshift(orderDetails);
    saveToStorage();
}

function saveToStorage() {
    localStorage.setItem("orders", JSON.stringify(orders));
}
