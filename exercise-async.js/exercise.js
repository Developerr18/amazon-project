////////////////////////////////////////
function ex1() {
    fetch("https://supersimplebackend.dev/greeting")
        .then((response) => response.text())
        .then((data) => console.log(data));
}

// ex1();

///////////////////////////////////
async function ex2() {
    try {
        const response = await fetch("https://supersimplebackend.dev/greeting");
        const data = await response.text();
        console.log(data);
    } catch (error) {
        console.log("unexpected error:", error);
    }
}

// ex2();

////////////////////////////////////
async function ex3() {
    const response = await fetch("https://supersimplebackend.dev/greeting", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: "Dinesh",
        }),
    });
    const data = await response.text();
    console.log(data);
}

// ex3();

////////////////////////////////////
async function ex4() {
    try {
        const response = await fetch(
            "https://supersimplebackend.dev/greeting",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        if (response.status === 400) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.text();
        console.log(data);
    } catch (error) {
        console.error("please try again later!", error);
    }
}

ex4();
