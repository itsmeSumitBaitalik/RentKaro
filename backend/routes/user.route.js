import express from "express"
import {login,signup,contact,properties,logout, addProperty, propertyId} from '../components/auth.components.js'
// import {checkAuth} from '../middleware/checkAuth.js'

export const userRoute = express.Router()

userRoute.post('/login',login)
userRoute.post('/signup',signup)
userRoute.post('/logout',logout)
userRoute.post('/contact',contact)
userRoute.get('/properties',properties)
userRoute.get('/properties/byid/:id',propertyId)
userRoute.post('/properties/add',addProperty)
// userRoute.post('/dashboard/',properties)
// userRoute.post('/dashboard/',properties)
