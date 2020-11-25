import { getProduct } from "../api"
import { getLocalProducts, saveLocalProducts } from "../localstorage"
import { requestURLSplite, rerender } from "../utils"

const addToCart = async (item, forceUpdate = false) => {
    let cartItems = getLocalProducts()
    const ItemInCart = cartItems.find(cart => cart.id === item.id)
    
    if(ItemInCart){
       cartItems = cartItems.map(cart=> cart.id === ItemInCart.id ? item : cart)
    }else {
        cartItems = [...cartItems, item]
    }

    saveLocalProducts(cartItems)
    if(forceUpdate){
      await rerender(cardScreen)
    }
}

const deleteItemFromCard = async (id) => {
    var cartItems = getLocalProducts()
    saveLocalProducts(cartItems.filter(item => item.id != id))
    if(requestURLSplite().id == id){
        document.location.hash = '/cart'
    }else {
        rerender(cardScreen)
    }
}

const cardScreen = {
    after_render: () => {
        const productSelects = document.getElementsByClassName('product-select')
        Array.from(productSelects).forEach(select => {
            select.addEventListener('change', (e) => {
                const item = getLocalProducts().find(product => product.id == select.id)
                addToCart({...item, qty: parseInt(e.target.value)}, true)

            })
        })

        const delets = document.getElementsByClassName('delete')
        Array.from(delets).forEach(deleteButton => {
            deleteButton.addEventListener('click', () => {
                deleteItemFromCard(deleteButton.id)
            })
        })

        document.getElementById('product-button').addEventListener('click', () => {
            document.location.hash = '/signin'
        })
    },
    render: async () =>{
        const requestUrl = requestURLSplite()
        if(requestUrl.id) {
            const product = await getProduct(requestUrl.id)
           addToCart({
            id: product._id,
            name: product.name,
            image: product.image,
            price: product.price,
            countInStock: product.countInStock,
            qty: 1,
           })
        }
        const productsInCart = getLocalProducts()

        return `
            <div class='cart'>
                <div class='card-detail'>
                    <ul>
                        <li>
                            <h3>Shooping Card</h3>
                            <div>Price</div>
                        </li>
                        ${productsInCart.length === 0 ? `<div>Shopping Card Is Empty <a href="/#/">Go to Home Page</a></div>` :
                            productsInCart.map( product => 
                                `<li>
                                    <div class='card-product-image'>
                                         <a href='/#/product/${product.id}'><img src='${product.image}' alt='${product.name}'></a>
                                    </div>
                                    <div class='card-product-name prouduct-link'>
                                        <a href='/#/product/${product.id}' class='item-link'><h3>${product.name}</h3></a>
                                        <div class='qty'>qty: 
                                            <select id='${product.id}' class='product-select'>
                                                ${[...Array(product.countInStock).keys()].map(x => product.qty == x+1 ? 
                                                    `<option selected value='${x+1}'>${x+1}</option>` :
                                                    `<option  value='${x+1}'>${x+1}</option>`
                                                )}
                                            </select>
                                            <button class='delete' id='${product.id}'>Delete</button>
                                        </div>
                                    </div>
                                    <div class='card-product-price'>$${product.price}</div>
                                </li>`
                            ).join('\n')
                        }
                    </ul>
                </div>
                <div class='card-action'>
                    <h3>Subtotal(${productsInCart.reduce((a, c) => a + c.qty , 0)} items) : $${productsInCart.reduce((a, c) => a + c.qty * c.price, 0)}</h3>
                    <button type='button' class='product-button' id='product-button'>Proceed to Checkout</button>
                </div>
            </div>`
    }
}

export default cardScreen