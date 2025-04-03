import { menuArray } from "./data.js";

let menu = document.getElementById("menu");
let order = document.getElementById('order');
let order_dict = {} // this will hold all of the orders and how many
let orders = document.getElementById("orders"); 
let totalCostHtml = document.getElementById("total-cost");



menuArray.forEach(element => {
    let html_string = `
    <div class="food-item">
        <div class="left">
            <p class="food">${element.emoji}</p>
            <div class="price-description">
                <h2>${element.name}</h2>
                <p>${element.ingredients.join(", ")}</p>
                <h3>$${element.price}</h3>
            </div>
        </div>
        <div class="right">
            <div class="add-to-cart" data-food="${element.name}"><i class="fa-solid fa-plus"></i></div>
        </div>
    </div>
    <div class="bottom-border"></div>
    `;

    menu.innerHTML += html_string; // Append the generated HTML to the menu div
});

document.addEventListener('click', function(e){
    let addToCartBtn = e.target.closest(".add-to-cart"); // Check if the clicked element or its parent is .add-to-cart
    if (addToCartBtn) {
        let food = addToCartBtn.dataset.food; // Get the dataset value from the correct element
        if (food) {
            create_order(food);
        }
    }
    if (e.target.dataset.remove) {
        // console.log(e.target.dataset.remove)
        removeOrder(e.target.dataset.remove)
    }
});

function create_order(food) {
    orders.innerHTML = "";
    let totalCost = 0
    if (!order.style.display) { // if there is nothing currently displayed for the order then make it appear
        order.style.display = 'block';
    }
    if (food in order_dict) { // if the food is in the orders_dict then add 1 to the total, we'll use this for the display
        order_dict[food]++
    } else {
        order_dict[food] = 1
    }
    
    Object.keys(order_dict).forEach(food_item => {
        let price = 0
        menuArray.forEach(item =>{
            if (food_item == item.name) {
                price = item.price
            }
        });
    let html_string = `
<div class="item-holder">
    <div class="item-left">
        <p>${food_item}</p>
        <a data-remove="${food_item}">remove</a>
    </div>
    <div class="item-right">
        <p>${order_dict[food_item]*price}</p>
    </div>
</div>
    `;
    orders.innerHTML += html_string
    totalCost += order_dict[food_item]*price
    totalCostHtml.innerHTML = `${totalCost}$` 
    })
}


function removeOrder(food) {
    if (order_dict[food]) {
        delete order_dict[food]; // Remove the item from the order dictionary
        // create_order(); 
    }

    if (Object.keys(order_dict).length === 0) {
        order.style.display = "none";
    }
}
