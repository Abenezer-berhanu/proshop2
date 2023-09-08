import asyncHnalder from '../middleware/asyncHandler.js'
import Order from '../model/orderModel.js'


const addOrderItems = asyncHnalder(async(req, res) => {
    res.send('add order items')
})

const getMyOrders = asyncHnalder(async(req, res) => {
    res.send('my orders')
})

const getOrderById = asyncHnalder(async(req, res) => {
    res.send('order by Id')
})

const updateOrderToPaid = asyncHnalder(async(req, res) => {
    res.send('update order to paid')
})

const updateOrderToDelivered = asyncHnalder(async(req, res) => {
    res.send('update order to delivered')
})

const getOrders = asyncHnalder(async(req, res) => {
    res.send('all orders')
})

export {addOrderItems, getMyOrders, getOrderById, updateOrderToPaid, updateOrderToDelivered, getOrders} 
