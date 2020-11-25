import {getOrders, update} from '../api'
import {saveUserToLocalStorage, getUserFromLocalStorage, logout} from '../localstorage'
import { hideOverlay, showMessageOverlay, showOverlay } from '../utils'

const profileScreen = {
    after_render: () => {
        document.getElementById('profile-form').addEventListener('submit',async (e) =>{
            e.preventDefault()
            const name = document.getElementById('name').value
            const email = document.getElementById('Email').value
            const password = document.getElementById('Password').value
            showOverlay()
            const data = await update({name, email, password})
            hideOverlay()

            if(data.error){
                showMessageOverlay(data.error)
            }else {
                saveUserToLocalStorage(data)         
                document.location.hash = '/profile'
            }
           
        })

        document.getElementById('logout').addEventListener('click', () =>{
            logout()
            document.location.hash = '/'
        })
    },
    render:async () => {
        const user = getUserFromLocalStorage()
        if(!user.name){
            document.location.hash = '/'
        }
        const orders = await getOrders()
        
        return `
        <div class='profile'>
            <div class='profile-form'>
            <form id='profile-form' class='signin-form'>
                <h1>Profile</h1>
                <div class="form-group">
                <label for="name">name</label>
                <input type="name" class="form-control form-control-lg" id="name" name='name' placeholder="name" value='${user.name}'>
                </div>
                <div class="form-group">
                <label for="Email">Email address</label>
                <input type="email" class="form-control form-control-lg" id="Email" name='email' placeholder="Enter email" value='${user.email}'>
                </div>
                <div class="form-group">
                <label for="Password">Password</label>
                <input type="password" class="form-control form-control-lg" id="Password" name='pasword'placeholder="Password" >
                </div>
                <button type="submit" class="product-button">update</button>
                <button type="button" id='logout' class="product-button">Log Out</button>

                </form>
            </div>
            <div class='orders'>
                <h1>Orders History</h1>
                <table class="table table-striped">
                    <thead>
                        <tr>
                        <th scope="col">Order Id</th>
                        <th scope="col">Date</th>
                        <th scope="col">Total</th>
                        <th scope="col">Paid at</th>
                        <th scope="col">Deliverd at</th>
                        <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${orders.length === 0 
                            ? `<tr> <td colspan='5'>No Order Yet<td></tr>`
                            : orders.map( order => `
                                <tr>
                                <th scope="row">${order._id}</th>
                                <td>${order.createdAt}</td>
                                <td>${order.totalMoney}</td>
                                <td>${order.PaidAt || 'NO'}</td>
                                <td>${order.isDeliverd || 'NO'}</td>
                                <td><a href=/#/order/${order._id}>Details</a></td>
                                </tr>
                            `).join('\n')
                        }
                      
                        
                    </tbody>
                    </table>
            </div>
        </div>
        
        `
    }
}


export default profileScreen