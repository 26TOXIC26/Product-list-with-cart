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
const productIndex = [];

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
        productIndex.push(index);
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
        if (totalItems === 1) {
            cartTable.style.display = "none";
            cartContent.style.display = "flex";
            cart.style.height = `${cartHeight - productcartHeight - totalandcheckoutHeight}px`;
        }
        else if (totalItems > 1 && parseInt(quantity.innerHTML) === 1)
        {
            cart.style.height = `${cartHeight - productcartHeight}px`;
        }
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
            productIndex.splice(productIndex.indexOf(index), 1);
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

const removeButtons = document.querySelectorAll("#remove");
removeButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
        const product = document.querySelectorAll("#product")[index];
        const productImage = product.querySelector("#pro-img");
        const btnAfter = product.querySelector("#btn-after");
        const btnBefore = product.querySelector("#btn-before");
        const quantity = product.querySelector("#btn-quantity");
        const productPrice = parseFloat(product.querySelector("#pro-price").innerText.replace("$", ""));

        totalItems -= parseInt(quantity.innerHTML);
        totalPrice -= productPrice * parseInt(quantity.innerHTML);
        cartTotal.innerText = totalPrice.toFixed(2);
        itemsquantity[index].innerText = 1;
        quantity.innerHTML = 1;
        allProductsNumber.innerText = totalItems;
        productImage.style.border = "none";
        btnAfter.style.display = "none";
        btnBefore.style.display = "flex";
        cartItems[index].style.display = "none";
        const cartHeight = cart.clientHeight;
        if (totalItems === 0) {
            cartTable.style.display = "none";
            cartContent.style.display = "flex";
            cart.style.height = `${cartHeight - productcartHeight - totalandcheckoutHeight}px`;
        }
        else if (totalItems > 0) {
            cart.style.height = `${cartHeight - productcartHeight}px`;
        }
        productIndex.splice(productIndex.indexOf(index), 1);
    });
});


function confirm() {
    const confirmation = document.querySelector("#confirmation");
    const listBox = document.querySelector("#list-box");
    const main = document.querySelector("#main");
    const listProducts = document.querySelectorAll("#list-product");
    const confirmationHeight = 400;
    const listBoxHeight = 170;
    const productcartHeight = 70 * (productIndex.length - 1);
    const totalPrice = document.querySelector("#confirm-price");
    const confirmQuantity = document.querySelectorAll("#list-quantity");

    main.style.filter = "blur(5px)";
    confirmation.style.display = "flex";
    confirmation.style.height = `${confirmationHeight + productcartHeight}px`;
    listBox.style.height = `${listBoxHeight + productcartHeight}px`;

    if (confirmation.clientHeight > 870)
        confirmation.style.top = "60%";

    while (productIndex.length > 0) {
        confirmQuantity[productIndex[productIndex.length - 1]].innerText = itemsquantity[productIndex[productIndex.length - 1]].innerText;
        listProducts[productIndex.pop()].style.display = "flex";
    }
    totalPrice.innerText = cartTotal.innerText;
}

