import { redirect } from '../../../backend/utils'
import {signin} from '../api'
import checkout from '../components/checkout'
import {saveUserToLocalStorage, getUserFromLocalStorage} from '../localstorage'
import { hideOverlay, showMessageOverlay, showOverlay } from '../utils'

const singinScreen = {
    after_render: () => {
        document.getElementById('signin-form').addEventListener('submit',async (e) =>{
            e.preventDefault()
            const email = document.getElementById('Email').value
            const password = document.getElementById('Password').value
            showOverlay()
            const data = await signin({email, password})
            hideOverlay()

            if(data.error){
                showMessageOverlay(data.error)
            }else {
                saveUserToLocalStorage(data)                
                redirect()
                
            }
           
        })
    },
    render: () => {
        if(getUserFromLocalStorage().name){
            redirect()
        }
        
        return `
        ${checkout.render({step1: true})}
        <div class='form-container'>
        <form id='signin-form' class='signin-form'>
             <h1>sign in</h1>
            <div class="form-group">
            <label for="Email">Email address</label>
            <input type="email" class="form-control form-control-lg" id="Email" name='email' placeholder="Enter email">
            </div>
            <div class="form-group">
            <label for="Password">Password</label>
            <input type="password" class="form-control form-control-lg" id="Password" name='pasword'placeholder="Password">
            </div>
            <button type="submit" class="product-button">Submit</button>
            <p>new user? <a href='/#/register'>Click here to register</a></p>
            </form>
        </div>`
    }
}


export default singinScreen