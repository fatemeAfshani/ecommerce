const dashboardMenu = {
    after_render: () => {

    },
    render: (props) => {
        return `
        <div class='dashboard-menu'>
            <ul>
                <li ${props.selected === 'dashboard' ? `class='selected'` : ''}>
                    <a href='/#/dashboard'>Dashboard</a>
                </li>
                <li  ${props.selected === 'orders' ? `class='selected'` : ''}>
                    <a href='/#/orders'>Orders</a>
                </li>
                <li  ${props.selected === 'products' ? `class='selected'` : ''}>
                    <a href='/#/productList'>Products</a>
                </li>
            </ul>
        </div>
        `
    }
}

export default dashboardMenu