/* eslint-disable no-unused-vars */
import homeScreen from './screen/homeScreen'
import { hideOverlay, requestURLSplite, showOverlay } from './utils'
import productSrceen from './screen/productScreen'
import Error404Screen from './screen/Error404Screen'
import cardScreen from './screen/cardScreen'
import singinScreen from './screen/signinScreen'
import headerScreen from './components/headerScreen'
import registerScreen from './screen/registerScreen'
import profileScreen from './screen/profileScreen'
import shippingScreen from './screen/shippingScreen'
import paymentScreen from './screen/paymentScreen'
import placeOrderScreen from './screen/placeOrderScreen'
import orderScreen from './screen/orderScreen'
import dashboardScreen from './screen/dashboardScreen'
import productListScreen from './screen/productListScreen'

const routes = {
    '/': homeScreen,
    '/product/:id': productSrceen,
    '/order/:id': orderScreen,
    '/cart': cardScreen,
    '/cart/:id': cardScreen,
    '/signin': singinScreen,
    '/register': registerScreen,
    '/profile': profileScreen,
    '/shipping': shippingScreen,
    '/payment': paymentScreen,
    '/placeOrder': placeOrderScreen,
    '/dashboard': dashboardScreen,
    '/productList': productListScreen
}

const router = async () => {
    showOverlay()
    const main = document.getElementById('main-container')
    const header = document.getElementById('header-container')
    try {
        const request = requestURLSplite()
        const requestUrl = (request.source ? `/${request.source}` : '/') + (request.id ? '/:id' : '') + (request.action ? `/${request.action}` : '')
        const screen = routes[requestUrl] ? routes[requestUrl] : Error404Screen
        main.innerHTML = await screen.render()
        header.innerHTML = await headerScreen.render()
        if(screen.after_render){
           
            await screen.after_render()
        }


    } catch (e) {
        main.innerHTML = `<div>can not render data because : </div> ${e}`
    }
    hideOverlay()
}


window.addEventListener('load', router)
window.addEventListener('hashchange', router)

