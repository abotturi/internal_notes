import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://127.0.0.1:8080'
})

export const getAxios = async (url:string = '/') => {
    return await instance.get(url)
    .then(res => {        
        return res.status
    })
    .catch(e => {
        console.log(e)
    })
}

export const postAxios = async (url: string = '/', data: {}) => {
    return await instance.post(url, data)
    .then(res => {
        return res.status
    })
    .catch(e => {
        console.log(e)
    })
}

export const deleteAxios = async (url: string = '/') => {
    return await instance.delete(url)
    .then(res => {
        return res.status
    })
    .catch(e => {
        console.log(e)
    })
}