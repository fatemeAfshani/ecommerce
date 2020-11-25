import checkout from '../components/checkout'
import { getUserFromLocalStorage, saveShippingData, getShippingData} from '../localstorage'


const shippingScreen = {
    after_render: () => {
        document.getElementById('shipping-form').addEventListener('submit',async (e) =>{
            e.preventDefault()
            const address = document.getElementById('address').value
            const code = document.getElementById('code').value
            const city = document.getElementById('city').value
            
            saveShippingData({address, code, city})
            document.location.hash = '/payment'
           
        })
    },
    render: () => {
        if(!getUserFromLocalStorage().name){
            document.location.hash = '/'
        }
       
        const  {address, code, city} = getShippingData()

        return `
        ${ checkout.render({step1: true, step2: true})}
        <div class='form-container'>
        <form id='shipping-form' class='signin-form'>
             <h1>shipping</h1>
             <div class="form-group">
            <label for="address">Address</label>
            <input type="text" class="form-control form-control-lg" id="address" name='address' value='${address}' required>
            </div>
            <div class="form-group">
            <label for="city">City</label>
            <input type="text" class="form-control form-control-lg" id="city" name='city' value="${city}" required>
            </div>
            <div class="form-group">
            <label for="code">Postal Code</label>
            <input type="text" class="form-control form-control-lg" id="code" name='code' value="${code}" required>
            </div>
            
            <button type="submit" class="product-button">Continue</button>
            </form>
        </div>`
    }
}


export default shippingScreen