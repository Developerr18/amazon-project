import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";

export const deliveryOptions = [
    {
        id: "1",
        deliveryDays: 7,
        priceCents: 0,
    },
    {
        id: "2",
        deliveryDays: 3,
        priceCents: 499,
    },
    {
        id: "3",
        deliveryDays: 1,
        priceCents: 999,
    },
];

export function getDeliveryOption(deliveryOptionId) {
    const deliveryOption = deliveryOptions.find(
        (option) => option.id === deliveryOptionId
    );

    return deliveryOption || deliveryOptions[0];
}

export function isWeekend(dateObj) {
    const dayOfWeek = dateObj.format("dddd");
    return dayOfWeek === "Saturday" || dayOfWeek === "Sunday";
}

export function calculateDeliveryDate(deliveryOption) {
    let remainingDays = deliveryOption.deliveryDays;
    let deliveryDate = dayjs();

    while (remainingDays > 0) {
        deliveryDate = deliveryDate.add(1, "days");

        if (!isWeekend(deliveryDate)) {
            remainingDays--;
        }
    }

    return deliveryDate.format("dddd, MMMM D");
}
