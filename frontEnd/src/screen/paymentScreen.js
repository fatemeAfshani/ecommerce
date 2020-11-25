
import checkout from '../components/checkout'
import { getPaymentData, getUserFromLocalStorage, savePaymentData} from '../localstorage'


const paymentScreen = {
    after_render: () => {
        document.getElementById('payment-form').addEventListener('submit', (e) =>{
            e.preventDefault()
            var paymentMethod = ''
            const inputs = document.getElementsByName('payment')
            for(var i= 0 ;i< inputs.length; i++ ){
                if(inputs[i].checked){
                    paymentMethod = inputs[i].value
                }
            }
            savePaymentData(paymentMethod)
            document.location.hash = '/placeOrder'
           
        })
    },
    render: () => {
        if(!getUserFromLocalStorage().name){
            document.location.hash = '/'
        }
   
        var paypalCheck = ''
        var oflineCheck = ''
        const {paymentMethod} = getPaymentData()
        if(paymentMethod === 'paypal'){
            paypalCheck = 'checked'
        }else{
            oflineCheck = 'checked'
        }
        return `
        ${checkout.render({step1: true, step2: true, step3: true})}
        <div class='form-container'>
        <form id='payment-form' class='signin-form'>
             <h1>Payment</h1>
              <div class="form-check  mb-3">
             <input class="form-check-input" type="radio" name="payment" id="paymal" value="paypal" ${paypalCheck}>
             <label class="form-check-label" for="paypal">
             Online(PayPal)
             </label>
             </div>
             <div class="form-check mb-3">
             <input class="form-check-input " type="radio" name="payment" id="ofline" value="ofline" ${oflineCheck}>
             <label class="form-check-label" for="ofline">
             ofline
             </label>
             </div> 
                
            <button type="submit" class="product-button">Continue</button>
            </form>
        </div>`
    }
}


export default paymentScreen