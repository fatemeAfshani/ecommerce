
const getLocalProducts = () => {
    const cartItems = localStorage.getItem('cartItems') ?
    JSON.parse(localStorage.getItem('cartItems')) : []

    return cartItems
}

const saveLocalProducts = (cartItems) => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems))
}

const saveUserToLocalStorage = ({_id= '',email = "", password = "", isAdmin= false, name= '', token = '' }) => {
    localStorage.setItem('user',
       JSON.stringify({
        _id,
        name,
        email,
        password,
        token,
        isAdmin,
       })
    )
}

const logout= () => {
    localStorage.clear()
}

const getUserFromLocalStorage = () => {
    const userData = localStorage.getItem('user') ? 
    JSON.parse(localStorage.getItem('user')) : 
    {email : "", password : "", name: ''}
     
    return userData
}


const saveShippingData = ({address='',code='', city=''}) => {
    localStorage.setItem('shipping', JSON.stringify({address, code, city}))
}

const getShippingData = () => {
    const shippingData = localStorage.getItem('shipping')
     ? JSON.parse(localStorage.getItem('shipping'))
     : {address: '',code: '', city: ''}

    return shippingData
}


const savePaymentData = (paymentMethod = 'paypal') => {
    localStorage.setItem('payment', JSON.stringify({paymentMethod}))
   
}

const getPaymentData = () => {
    const paymentData = localStorage.getItem('payment') ? 
    JSON.parse(localStorage.getItem('payment')) : 
    {paymentMethod : 'paypal'}

    return paymentData
}

const cleanCart = () => {
    localStorage.removeItem('cartItems')
}

module.exports = { 
    getLocalProducts,
    saveLocalProducts,
    saveUserToLocalStorage,
    getUserFromLocalStorage,
    logout,
    saveShippingData,
    getShippingData,
    savePaymentData,
    getPaymentData,
    cleanCart
    
}