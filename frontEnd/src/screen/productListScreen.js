import { getProducts } from "../api"
import dashboardMenu from "../components/dashboardMenu"

const productListScreen = {
    after_render: () => {

    },
    render: async() => {
        const {products} = await getProducts()
        console.log(products)
        return `
            <div class='dashboard'>
                ${dashboardMenu.render({selected: 'products'})}
                <div class='dashboard-content'>
                    <h1>Product List</h1>
                    <button id='create-product-button' class='normal-button'>Create Product</button>
                        <table class="table table-striped">
                            <thead>
                                <tr>
                                <th scope="col">ID</th>
                                <th scope="col">NAME</th>
                                <th scope="col">PRICE</th>
                                <th scope="col">CATEGORY</th>
                                <th scope="col">BRAND</th>
                                <th scope="col">ACTIONS</th>
                                
                                </tr>
                            </thead>
                            <tbody>
                            ${products.length === 0 
                                ? `<tr> <td colspan='5'>No Product Yet<td></tr>` 
                                : products.map(product => `
                                    <tr>
                                    <td>${product._id}</td>
                                    <td>${product.name}</td>
                                    <td>${product.price}</td>
                                    <td>${product.category}</td>
                                    <td>${product.brand}</td>
                                    <td>
                                    <button id=${product._id} class='table-button'>Delete</button>
                                    <button id=${product._id} class='table-button'>Edit</button>
                                    </td>
                                    </tr>
                                 `).join('\n')}
                                   
                            </tbody>
                            </table>
                </div>
            </div>
            `
    }
}

export default productListScreen