/* eslint-disable no-underscore-dangle */
import { getProducts } from '../api'
import rating from '../components/rating'
import { hideOverlay, showOverlay } from '../utils'

const homeScreen = {
    render: async () => {
        try {
            //    change from fetch to axios for no reason !!!
            showOverlay()
            const response =await getProducts()
            hideOverlay()
            if(response.error){
                return `<div>Error ${response.error}</div>`
            }
            const {products} = response
                      
            return `<ul  class='cardList'>
            ${products.map( product => `<li>
                    <div class="mycard">
                        <a href="/#/product/${product._id}">
                            <img src="../images/${product.image}" alt="${product.name}">
                            </a>
                        <div class="mycard-content">
                            <a href="/#/product/${product._id}"><p class="name">${product.name}</p></a>
                            <p class="status">${product.brand}</p>
                            <p class="price">$${product.price}</p>
                            <div>${rating.render({value: product.rating, text: `${product.numReviews  } reviews`})}
                            </div>
                        </div>
                    </div>
                </li>`).join('\n')}
            </ul>`
        } catch (E) {
            return `<div>there is something wrong with the server ${E}</div>`
        }
    },
}

export default homeScreen
