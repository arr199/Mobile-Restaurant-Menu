import { menuArray } from "./data.js"
import { v4 as uuidv4 } from "https://jspm.dev/uuid"

const sectionEl = document.getElementById("product-section")
const shoppingListEl  = document.getElementById("shopping-car") 
const totalPriceContainerEl = document.getElementById("total-price-container")
const formContainerEl = document.getElementById("form-container")
const payFormEl = document.getElementById("pay-form")

//AN ARRAY TO HANDLE THE ORDERS
const orders = []



document.addEventListener("click",function(e){
    // CHEKING FOR PLUS BTN CLICK
    if (e.target.dataset.id){
        handlePlusClick(e.target.dataset.id)
    
        
      
    }
    // CHECKING FOR REMOVE BTN CLICK
    else if (e.target.dataset.remove) {
            
        handleRemoveClick(e.target.dataset.remove) 
     
    }
    // CALL THE FORM WITH THE "COMPLETE ORDER" BUTTON
    else if (e.target.dataset.completeOrder && orders.length > 0){

        formContainerEl.classList.toggle("hidden")
    } 
   
    // CLOSE FORM BUTTON
    else if (e.target.dataset.close){

        formContainerEl.classList.toggle("hidden")
    }
    //FORM PAY BUTTON
    else if (e.target.dataset.pay){
        
        handlePayButton()

    }
    
})
// PREVENT THE FORM DEFAULT BEHAVIOR
payFormEl.addEventListener('submit', function(e){
    e.preventDefault()
   
})



// RETURNING THE ELEMENT THAT I WANT TO BUY 

function handlePlusClick(id){

    document.getElementById("ty-message").classList.add("hidden")
    const element = menuArray.filter(function(products){
        return Number(id) === products.id

    
    })[0]
    
    //PUSHING THE NEW ORDERS OBJECT TO THE ORDERS ARRAY
    
    orders.push({
        name: element.name,
        price: element.price,
        id:uuidv4()
    
    })
     // RENDERING THE ORDERS ARRAY 
    renderOrders(orders)
   

}

// REMOVING AN OBJECT FROM ORDERS ARRAY
function handleRemoveClick(id){
    orders.forEach(function(order){
        
        if (order.id == id ){
            
            orders.splice(orders.indexOf(order),1)
        }
    })
    
    renderOrders(orders)
}


function handlePayButton(){
     
// GET ALL THE FORM INPUTS
const inputs = document.getElementsByClassName("form-inputs")

// CHECK IF AT LEAST ONE INPUT IS EMPTY
function emptyChecker() {
    for (let input of inputs){
        if (input.value == ""){

            return true
        }
    }
    return false
}
    /// RENDER THE THANKS! MESSAGE IF ALL THE INPUTS ARE FILLED  
    if (emptyChecker() == false ){
        document.getElementById("ty-message").classList.remove("hidden")
        document.getElementById("order-container").classList.add("hidden")
        document.getElementById("form-container").classList.add("hidden")
    
         //CLEAR THE ORDERS ARRAY
        orders.splice(0,orders.length)
}}


// RENDERING THE ORDERS LIST
function renderOrders(orders){
    
    let totalPrice = 0
    orders.forEach(function(order){
    totalPrice += order.price

    })
        if (orders.length > 0){
           
        document.getElementById("order-container").classList.remove("hidden")
        shoppingListEl.innerHTML = ""
        totalPriceContainerEl.innerHTML = ""
        
        for (let order of orders){
    
            const addProduct = ` 
            <div class="shopping-car">
                <p class="font38">${order.name}</p>
                <p class="remove-btn" data-remove="${order.id}">remove</p>
                <p class="product-price order-price">$${order.price}</p>
            </div>`
            
        
            const AddTotalPriceElement = `<p class="price font38"  >Total Price: </p>
                             <p class="product-price order-price" id="total-price">$${totalPrice}</p>`
        
            shoppingListEl.innerHTML += addProduct
            totalPriceContainerEl.innerHTML = AddTotalPriceElement
        
        }}
        else {

            document.getElementById("order-container").classList.add("hidden")
        }

        
}


//RENDERING THE PRODUCTS LIST

function renderProducts(){


     const productsList =  menuArray.forEach(function(product){
        sectionEl.innerHTML += ` 
        
        
        <div class="container">
            
            <div class="containers-data">
                
                
                <div class="products-container" >
                        <img  class="products-icons" src="${product.img}">
                        <div class="product-info" >
                            <p class="product-name">${product.name}</p>
                            <p class="product-ingredients">${product.ingredients}</p>
                            <p class="product-price">$ ${product.price}</p>
                        </div>
                        
                </div>
                <i class="fa-solid fa-plus plus-btn" style="color: #3c3c3c;" data-id="${product.id}"></i>
                
            </div>
        </div>`

      }) 
}

renderProducts()
