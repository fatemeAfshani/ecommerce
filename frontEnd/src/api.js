/* eslint-disable import/prefer-default-export */
import axios from 'axios'
import { apiurl } from './confing'
import { getUserFromLocalStorage } from './localstorage'

export const getProduct = async (id) => {
    try{
        
        const response = await axios({
            url: `${apiurl}/api/products/${id}`,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        
        if(response.statusText !== 'OK'){
            throw new Error(response.data.message)
        }
       
        return response.data 

    } catch (e) {
       return {error: e.response.data.message || e.message} 
    }
}

export const getProducts = async () => {
    try{
        const response = await axios({
            url: `${apiurl}/api/products`,
            method: 'GET',
            headers:{
                'Content-Type': 'application/json'
            }
        })
        if(response.status !== 200){
            throw new Error(response.data.message)
        }
        console.log(response.data)
        return response.data
        

    }catch(E) {
        return ({error: E.response.error.message || E.message})
    }
}

export const signin = async ({email, password}) => {
    try{
        const res = await axios({
            url: `${apiurl}/user/signin`,
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            data: {
                email, password
            }

        })

        if(res.statusText !== 'OK'){
            throw new error(res.data.message)
        }
        return res.data

    }catch(err) {
        console.log(err)
        return ({error : err.response.data.message || err.message})
    }
}

export const register = async ({name, email, password}) => {
    try{
        const res = await axios({
            url: `${apiurl}/user/register`,
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            data: {
                name, email, password
            }

        })

        if(res.statusText !== 'OK'){
            throw new error(res.data.message)
        }
        return res.data

    }catch(err) {
        console.log(err)
        return ({error : err.response.data.message || err.message})
    }
}


export const update = async ({name, email, password}) => {
    try{
        const {token} = getUserFromLocalStorage()
        const res = await axios({
            url: `${apiurl}/user/update`,
            method: 'PUT',
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${token}`
            },
            data: {
                name, email, password
            }

        })

        if(res.statusText !== 'OK'){
            throw new Error(res.data.message)
        }
        return res.data

    }catch(err) {
        console.log(err)
        return ({error : err.response.data.message || err.message})
    }
}

export const createOrder = async (order) => {
   try{
        const {token} = getUserFromLocalStorage()
        const response = await axios({
            url: `${apiurl}/order`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            data : order
        })
        console.log(response)
        if(response.status !== 201){
            throw new Error(response.data.message)
        }

        return response.data.order
   }catch (e){
   
       return ({error: e.response.data.message.message || e.message })
   } 

}

export const getOrder =async (id) => {
    try{
        const {token} = getUserFromLocalStorage()
        const response = await axios({
            url: `${apiurl}/order/${id}`,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        console.log(response)
        if(response.status !== 200) {
            throw new Error ('can not get order from server ')
        }else {
            return response.data
        }
    }catch (e){
        return ({error: e.response.data.message || e.message})
    }
}

export const getOrders = async () => {
    try{
        const {token} = getUserFromLocalStorage()
        const response = await axios({
            url: `${apiurl}/order/my/orders`,
            method:'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        if(response.status !== 200){
            throw new Error(response.data.message)
        }
        return response.data

    }catch(e){
        return ({error : e.response.data.message || e.message})
    }
}