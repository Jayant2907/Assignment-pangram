import axios from "axios"
require('dotenv').config()
const API = axios.create({baseURL:"http://localhost:7000"})

API.interceptors.request.use((req) =>
{
    if(localStorage.getItem('profile'))
    {
        req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
    }
    return req
})


export const signIn = (formData) => API.post("/login" , formData)
export const signUp = (formData) => API.post("/signup" , formData)