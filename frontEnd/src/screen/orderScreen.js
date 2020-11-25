import { getOrder } from '../api'
import { requestURLSplite, showMessageOverlay } from '../utils'


const orderScreen = {
    after_render: () => {
        
    },
    render:async () => {
       const {id} = requestURLSplite() 
       const {_id,isDeliverd, DeliverdAt,isPaid, PaidAt, orderItems , shipping, payment, itemsPrice, tax, shippingPrice, totalMoney , error} = await getOrder(id)
       console.log(_id, orderItems , shipping, payment, itemsPrice, tax, shippingPrice, totalMoney )
       if(error){
           showMessageOverlay(error)
       }
        return `
        <h1>Order number ${_id}</h1>
        <div class='placeOrder'>
            <div class='placeOrder-info'>
                <div class='info-item'>
                    <h2>Shipping</h2>
                    <div>${shipping.address}, ${shipping.code}, ${shipping.city}</div>
                    ${isDeliverd 
                     ? `<div class='green'> Deliverd at ${DeliverdAt}</div>`
                     : `<div class='red' >Not Deliverd</div>`  }
             </div>
                <div class='info-item'>
                    <h2>Payment</h2>
                    <div>${payment.paymentMethod}</div>
                    ${isPaid 
                        ? `<div class='green'> Paid at ${PaidAt}</div>`
                        : `<div class='red' >Not Paid</div>`  }
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
            </div>
        </div> 
        `
    }
}

export default orderScreen



