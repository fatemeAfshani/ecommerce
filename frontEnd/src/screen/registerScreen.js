import { redirect } from '../../../backend/utils'
import {register} from '../api'
import {saveUserToLocalStorage, getUserFromLocalStorage} from '../localstorage'
import { hideOverlay, showMessageOverlay, showOverlay } from '../utils'

const registerScreen = {
    after_render: () => {
        document.getElementById('register-form').addEventListener('submit',async (e) =>{
            e.preventDefault()
            const name = document.getElementById('name').value
            const email = document.getElementById('Email').value
            const password = document.getElementById('Password').value
            showOverlay()
            const data = await register({name, email, password})
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

        return `<div class='form-container'>
        <form id='register-form' class='signin-form'>
             <h1>Register</h1>
             <div class="form-group">
            <label for="name">name</label>
            <input type="text" class="form-control form-control-lg" id="name" name='name' placeholder="name">
            </div>
            <div class="form-group">
            <label for="Email">Email address</label>
            <input type="email" class="form-control form-control-lg" id="Email" name='email' placeholder="Enter email">
            </div>
            <div class="form-group">
            <label for="Password">Password</label>
            <input type="password" class="form-control form-control-lg" id="Password" name='pasword'placeholder="Password">
            </div>
            <button type="submit" class="product-button">Submit</button>
            <p>Already have an account?<a href='/#/signin'>Click here to signin</a></p>
            </form>
        </div>`
    }
}


export default registerScreen