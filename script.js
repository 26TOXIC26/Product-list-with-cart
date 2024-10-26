const buttons = document.querySelectorAll("#btn-first");
const allProductsNumber = document.querySelector("#num-prod");
const cartTable = document.querySelector("#command-table");
const cartItems = document.querySelectorAll("#product-cart");
const itemsquantity = document.querySelectorAll("#product-quantity");
const cartTotal = document.querySelector("#total-price-num");

let totalItems = 0;
let totalPrice = 0;

buttons.forEach((button, index) => {
    button.addEventListener("click", () => {
        const product = button.closest("#product");
        const productImage = product.querySelector("#pro-img");
        const btnAfter = product.querySelector("#btn-after");
        const btnBefore = product.querySelector("#btn-before");
        const priceText = product.querySelector("#pro-price").innerText.replace("$", "");
        const productPrice = parseFloat(priceText);

        // Show the quantity controls and hide the "Add to Cart" button
        btnAfter.style.display = "flex";
        btnBefore.style.display = "none";

        // Highlight product image
        productImage.style.border = "2px solid hsl(14, 86%, 42%)";

        // Update cart item count
        totalItems++;
        allProductsNumber.innerText = totalItems;

        // Show cart table and cart items
        cartTable.style.display = "block";
        cartItems[index].style.display = "flex";

        // Update total price
        totalPrice += productPrice;
        cartTotal.innerText = totalPrice.toFixed(2);
    });
});

const buttonsplus = document.querySelectorAll("#btn-plus");
const buttonsminus = document.querySelectorAll("#btn-minus");

buttonsplus.forEach((button, index) => {
    button.addEventListener("click", () => {
        const quantity = button.closest("#product").querySelector("#btn-quantity");
        quantity.innerHTML = parseInt(quantity.innerHTML) + 1;
        totalItems++;
        allProductsNumber.innerText = totalItems;
        itemsquantity[index].innerText = quantity.innerHTML;
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
        totalItems--;
        allProductsNumber.innerText = totalItems;
    });
});



