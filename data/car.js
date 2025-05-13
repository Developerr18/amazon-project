class Car {
    #brand;
    #model;
    speed;
    isTrunkOpen;

    constructor(carDetails) {
        this.#brand = carDetails.brand;
        this.#model = carDetails.model;
        this.speed = 0;
        this.isTrunkOpen = false;
    }

    openTrunk() {
        if (this.speed === 0) {
            this.isTrunkOpen = true;
        }
    }

    closeTrunk() {
        this.isTrunkOpen = false;
    }

    go() {
        if (this.speed >= 200 || this.isTrunkOpen) return;
        this.speed += 5;
    }

    brake() {
        if (this.speed <= 0) return;
        this.speed -= 5;
    }

    displayInfo() {
        const trunkStatus = this.isTrunkOpen ? true : false;
        console.log(
            `${this.#brand} ${this.#model}, Speed: ${
                this.speed
            }, Trunk: ${trunkStatus}`
        );
    }
}

class RaceCar extends Car {
    acceleration;

    constructor(carDetails) {
        super(carDetails);
        this.acceleration = carDetails.acceleration;
    }

    go() {
        this.speed += this.acceleration;
        if (this.speed > 300) {
            this.speed = 300;
        }
    }

    openTrunk() {
        console.log("Race cars do not have a trunk.");
    }

    closeTrunk() {
        console.log("Race cars do not have a trunk.");
    }
}

const car1 = new Car({ brand: "Toyota", model: "Corolla" });
const car2 = new Car({ brand: "Tesla", model: "Model 3" });
const superCar = new RaceCar({
    brand: "McLaren",
    model: "F1",
    acceleration: 20,
});

superCar.go();
superCar.go();
console.log(superCar);
car2.displayInfo();
superCar.go();
superCar.go();
superCar.go();
superCar.displayInfo();
superCar.openTrunk();
superCar.displayInfo();
superCar.brake();
superCar.displayInfo();
