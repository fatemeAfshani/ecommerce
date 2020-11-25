/* eslint-disable import/prefer-default-export */
// this function is for getting the url and splite it to find the right screen to render.

export const requestURLSplite = () => {
    const URL = document.location.hash
    const request = URL.split('/')

    return {
        source: request[1],
        id: request[2],
        action: request[3],
    }
}

export const rerender = async (page) => {
    const main = document.getElementById('main-container')
    main.innerHTML = await page.render()
    await page.after_render()

}

export const showOverlay = () => {
   
    document.getElementById('progress-overlay').classList.add('active')
}

export const hideOverlay = () => {
     document.getElementById('progress-overlay').classList.remove('active')
}

export const showMessageOverlay = (message) => {
    const messageContainer = document.getElementById('message-overlay')
    messageContainer.innerHTML = `<div class='message-container'>
        <div>${message}</div>
        <button id='message-container-close'>OK</button>
    </div>`
    messageContainer.classList.add('active')
    document.getElementById('message-container-close').addEventListener('click', () =>{
        messageContainer.classList.remove('active')
    })
}
