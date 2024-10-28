const buttons = document.querySelectorAll("#btn-first");
const allProductsNumber = document.querySelector("#num-prod");
const cartTable = document.querySelector("#command-table");
const cartItems = document.querySelectorAll("#product-cart");
const itemsquantity = document.querySelectorAll("#product-quantity");
const cartTotal = document.querySelector("#total-price-num");
const cart = document.querySelector("#cart");
const cartContent = document.querySelector("#cart-content");
const productcartHeight = 80;
const totalandcheckoutHeight = document.querySelector("#total").clientHeight + document.querySelector("#checkout-div").clientHeight;
const cartContentHeight = 260;

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
        cartContent.style.display = "none";
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
        const product = button.closest("#product");
        const price = product.querySelector("#pro-price").innerText.replace("$", "");
        totalItems++;
        quantity.innerHTML = parseInt(quantity.innerHTML) + 1;
        allProductsNumber.innerText = totalItems;
        itemsquantity[index].innerText = quantity.innerHTML;
        totalPrice += parseFloat(price);
        cartTotal.innerText = totalPrice.toFixed(2);
    });
});

buttonsminus.forEach((button, index) => {
    button.addEventListener("click", () => {
        const quantity = button.closest("#product").querySelector("#btn-quantity");
        const product = button.closest("#product");
        const price = product.querySelector("#pro-price").innerText.replace("$", "");
        const productPrice = parseFloat(price);
        const cartHeight = cart.clientHeight;
        if (parseInt(quantity.innerHTML) > 1)
            quantity.innerHTML = parseInt(quantity.innerHTML) - 1;
        else if (parseInt(quantity.innerHTML) === 1) {
            const productImage = button.closest("#product").querySelector("#pro-img");
            const btn_after = button.closest("#product").querySelector("#btn-after");
            const btn_before = button.closest("#product").querySelector("#btn-before");
            productImage.style.border = "none";
            btn_after.style.display = "none";
            btn_before.style.display = "flex";
            cartItems[index].style.display = "none";
        }
        if (totalItems === 1) {
            cartTable.style.display = "none";
            cartContent.style.display = "flex";
            cart.style.height = `${cartHeight - productcartHeight - totalandcheckoutHeight}px`;
        }
        else if (totalItems > 1 && parseInt(quantity.innerHTML) === 1)
        {
            cart.style.height = `${cartHeight - productcartHeight}px`;
        }
        totalItems--;
        allProductsNumber.innerText = totalItems;
        itemsquantity[index].innerText = quantity.innerHTML;
        totalPrice -= productPrice;
        cartTotal.innerText = totalPrice.toFixed(2);
    });
});

function adjustHeight()
{
    const cartHeight = cart.clientHeight;
    // alert(productcartHeight);
    // if (totalItems === 1)
    //     {
    //     }
        cart.style.height = `${cartHeight + productcartHeight + totalandcheckoutHeight}px`;
        // cart.style.height = `${cartHeight + productcartHeight}px`;
    // console.log(cartHeight);
}
