const buttons = document.querySelectorAll("#btn-first");
const allprocuts_number = document.querySelector("#num-prod");

buttons.forEach((button, index) => {
    button.addEventListener("click", () => {
        const productImage = button.closest("#product").querySelector("#pro-img");
        const btn_after = button.closest("#product").querySelector("#btn-after");
        const btn_before = button.closest("#product").querySelector("#btn-before");
        productImage.style.border = "2px solid hsl(14, 86%, 42%)";
        btn_after.style.display = "flex";
        btn_before.style.display = "none";
        allprocuts_number.innerHTML = parseInt(allprocuts_number.innerHTML) + 1;
    });
});

const buttonsplus = document.querySelectorAll("#btn-plus");
const buttonsminus = document.querySelectorAll("#btn-minus");

buttonsplus.forEach((button, index) => {
    button.addEventListener("click", () => {
        const quantity = button.closest("#product").querySelector("#btn-quantity");
        quantity.innerHTML = parseInt(quantity.innerHTML) + 1;
        allprocuts_number.innerHTML = parseInt(allprocuts_number.innerHTML) + 1;
    });
});

buttonsminus.forEach((button, index) => {
    button.addEventListener("click", () => {
        const quantity = button.closest("#product").querySelector("#btn-quantity");
        if (parseInt(quantity.innerHTML) > 1)
            quantity.innerHTML = parseInt(quantity.innerHTML) - 1;
        else if (parseInt(quantity.innerHTML) === 1) {
            const productImage = button.closest("#product").querySelector("#pro-img");
            const btn_after = button.closest("#product").querySelector("#btn-after");
            const btn_before = button.closest("#product").querySelector("#btn-before");
            productImage.style.border = "none";
            btn_after.style.display = "none";
            btn_before.style.display = "flex";
        }
        allprocuts_number.innerHTML = parseInt(allprocuts_number.innerHTML) - 1;
    });
});



