import { createOrder } from '../api'
import checkout from '../components/checkout'
import {cleanCart, getLocalProducts, getPaymentData, getShippingData} from '../localstorage'
import { hideOverlay, showMessageOverlay, showOverlay } from '../utils'

const cartToOrder = () => {
    const orderItems = getLocalProducts()
    if(orderItems.length ===0) {
        document.location.hash = '/cart'
    }

    const shipping = getShippingData()
    if(!shipping.address){
        document.location.hash = '/shipping'
    }

    const payment = getPaymentData()
    if(!payment.paymentMethod){
        document.location.hash = '/payment'
    }

    const itemsPrice = orderItems.reduce((a, c) => a + c.price * c.qty, 0)
    const shippingPrice = itemsPrice > 100 ? 0 : 10
    const tax = Math.round((0.9 * itemsPrice *100) / 100)
    const totalMoney = itemsPrice + tax + shippingPrice
    return {
        orderItems,
        shipping,
        payment,
        itemsPrice,
        shippingPrice,
        tax,
        totalMoney
    }
}

const placeOrderScreen = {
    after_render: () => {
        document.getElementById('placeOrder').addEventListener('click',async () =>{
            const order = cartToOrder()
            console.log(order)
            showOverlay()
            const data = await createOrder(order)
            hideOverlay()
            if(data.error){
                showMessageOverlay(data.error.message)
            }else{
            cleanCart()
            document.location.hash = `/order/${data._id}`
            }
        })
    },
    render: () => {
        
        const {  orderItems,
            shipping,
            payment,
            itemsPrice,
            shippingPrice,
            tax,
            totalMoney} = cartToOrder()

        return `
        <div>${checkout.render({step1: true, step2: true, step3: true, step4: true})}
        </div>
        <div class='placeOrder'>
            <div class='placeOrder-info'>
                <div class='info-item'>
                    <h2>Shipping</h2>
                    <div>${shipping.address}, ${shipping.code}, ${shipping.city}</div>
                </div>
                <div class='info-item'>
                    <h2>Payment</h2>
                    <div>${payment.paymentMethod}</div>
                </div>
                <div class='info-item'>
                    
                    <ul>
                        <li>
                            <h2>Shopping Cart</h2>
                            <h4>Price</h4>
                        </li>
                            ${orderItems.map(item => 
                                `<li>
                                    <div class='card-product-image'>
                                    <img src=${item.image} alt=${item.name} />
                                    </div>
                                    <div class='card-product-name'>
                                        <h5>${item.name}</h5>
                                        <p>${item.qty}</p>
                                    </div>
                                    <div class='card-product-price'>
                                        <h6>$ ${item.price}</h6>
                                    </div>

                                </li>`
                            ).join('\n')}
                    </ul>
                
                </div>
            </div>
            <div class='placeOrder-action'>
                <h2>Other summery</h2>   
                <ul>
                    <li>
                        <p>Price</p>
                        <p>${itemsPrice}</p>
                    </li>
                    <li>
                        <p>Shipping</p>
                        <p>${shippingPrice}</p>
                    </li>
                    <li>
                        <p>Tax</p>
                        <p>${tax}</p>
                    </li>
                    <li>
                        <p>Total Price</p>
                        <p>${totalMoney}</p>
                    </li>
                </ul>  
                <button id='placeOrder' type='button' class='product-button' >Place Order</button>              
            </div>
        </div> 
        `
    }
}

export default placeOrderScreen



