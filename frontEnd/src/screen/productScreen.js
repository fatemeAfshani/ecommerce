import { hideOverlay, requestURLSplite, showOverlay } from '../utils'
import {getProduct} from '../api'
import rating from '../components/rating'



const productScreen = {
    after_render:  () => {
        const requestUrl = requestURLSplite()
        document.getElementById('addToCart').addEventListener('click', async () => {
            showOverlay()
            const product = await getProduct(requestUrl.id)
            hideOverlay()
            if(product){
                if(product.countInStock > 0){
                    document.location.hash = `/cart/${requestUrl.id}`
                }else {
                    alert('Sorry, this product is not available.')
                }
            }else if(product.error){
                alert(product.error)
            }
           

         })

    },
    render: async () => {
        const requestUrl = requestURLSplite()
        const response = await getProduct(requestUrl.id)
        if(response.error){
            return `<div>${response.error}</div>`
        }
        
        return `
        <div class='product-page'>
            <div class='product-link'>
            <a href='/#/'>back to home</a>
            </div>
            <div class='product-content'>
                <div class='product-image'>
                    <img src='${response.image}' alt='${response.name}'>
                </div>
                <div class='product-details'>
                    <ul>
                        <li>
                            <h1>${response.name}</h1>
                        </li>
                        <li>
                            ${rating.render({value: response.rating, text: `${response.numReviews} reviews`})}
                        </li>
                        <li>
                            Price: <strong>$${response.price}</strong>
                        </li>
                        <li>
                            Description: ${response.brand}
                        </li>
                    </ul>
                </div>
                <div class='product-card'>
                    <ul>
                        <li>
                            Price: $${response.price}
                        </li>
                        <li>
                            Status: ${response.countInStock> 0 ? `<span class='green'>In Stack</span>` : `<span class='red'>Unavailable</span>`}
                        </li>
                        <li>
                            <button class='product-button' id='addToCart' >Add to Cart</button>
                        </li>

                    </ul>
                </div>
            </div> 
        </div>`
    
    }
}

export default productScreen
