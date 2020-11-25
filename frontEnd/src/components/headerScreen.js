import { getUserFromLocalStorage } from "../localstorage"

const headerScreen = {
    render : () => {
        const {name , isAdmin} = getUserFromLocalStorage()
        return ` <div class="mynavbar ">
        <div class="brand">
            <a href="/#/">fateme shopping</a>
         
        </div>

        <div class="links">
        ${name ? `<a href='/#/profile'> ${name} </a>` : `<a href="/#/signin">Sign In</a>`}
              <a href="/#/cart">Cart</a>
              ${isAdmin ? `<a href='/#/dashboard'>Dashboard</a>` : '' }
              
        </div>

   </div>`

    }
}

export default headerScreen

