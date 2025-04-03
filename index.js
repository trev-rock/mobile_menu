import { menuArray } from "./data.js";

let menu = document.getElementById("menu");
let order = document.getElementById('order');
let order_dict = [] // this will hold all of the orders and how many, and price
let orders = document.getElementById("orders"); 
let totalCostHtml = document.getElementById("total-cost");
let creditDetails = document.getElementById("credit-details");
let name = document.getElementById("name");
let creditCard = document.getElementById("credit-card");
let cvc = document.getElementById("cvc");
let pay = document.getElementById("pay");
let thanks = document.getElementById("thanks");

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
    let subSection = { // make a dictionary to then render
        "name":`${element.name}`,
        "price":`${element.price}`,
        "quantity":0
    }
    order_dict.push(subSection)
    // console.log(order_dict)
    menu.innerHTML += html_string; // Append the generated HTML to the menu div
});

document.addEventListener('click', function(e){
    let addToCartBtn = e.target.closest(".add-to-cart"); // Check if the clicked element or its parent is .add-to-cart
    let completeOrderBtn = e.target.closest(".complete-order"); // check if the clicked element or its parent is complete-order

    if (addToCartBtn) {
        let food = addToCartBtn.dataset.food; // Get the dataset value from the correct element
        if (food) {
            create_order(food);
            render();
        }
    }
    if (e.target.dataset.remove) {
        removeOrder(e.target.dataset.remove)
        render()
    }
    if (completeOrderBtn) {
        completeOrder()
    }

    // if (e.target != creditDetails) {
    //     if (creditDetails.style.display) {
    //         creditDetails.style.display = 'none';
    //         console.log('test')
    //     }
    // }
});

pay.addEventListener('click', () => {
    payment()
})

function render(){
    //turn on the display if there is a quantity for anything
    for (let i = 0; i < order_dict.length; i++) {
        if (order_dict[i].quantity > 0) {
            order.style.display = "block"
            break
        } else {
            order.style.display = "none"
        }
    }

    orders.innerHTML = "";
    let totalCost = 0;
    order_dict.forEach(food => {
    if (food.quantity > 0) {
        let html_string = `
        <div class="item-holder">
            <div class="item-left">
                <p>${food.name}</p>
                <a data-remove="${food.name}">remove</a>
            </div>
            <div class="item-right">
                <p>${food.quantity * food.price}</p>
            </div>
        </div>
            `;
            orders.innerHTML += html_string;
            totalCost += food.quantity * food.price;
            totalCostHtml.innerHTML = `${totalCost}$`;
        }
    })
}

function create_order(food) {
    order_dict.forEach(item =>{
        if (food == item.name){
            item.quantity += 1;
        }
    })
}

function removeOrder(food) {
    order_dict.forEach(item => {
        if (item.name == food) {
            item.quantity = 0
        }
    })
}

function completeOrder() {
    if (!creditDetails.style.display) {
        creditDetails.style.display = "block";
    }
}

function payment() {
    if (name.value.length > 0) {
        if (creditCard.value.length == 16) {
            if (cvc.value.length == 3) {
                creditDetails.style.display = 'none'
                thanks.style.display = 'block'
                order.style.display = "none"
            } else {
                console.log("cvc must be 3 digits")
            }
        } else {
            console.log("credit card must be 16 digits")
        }
    } else {
        console.log("name is too short")
    }
}
