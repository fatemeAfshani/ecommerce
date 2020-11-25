import dashboardMenu from "../components/dashboardMenu"

const dashboardScreen = {
    after_render: () => {

    },
    render: () =>{
        return `
        <div class='dashboard'>
            ${dashboardMenu.render({selected: 'dashboard'})}
            <div class='dashboard-content'>
                <h1>Dashboard</h1>
                <p>content</p>
            </div>
        </div>
        `
    }
}

export default dashboardScreen