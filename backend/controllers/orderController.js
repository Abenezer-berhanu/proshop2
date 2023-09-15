import asyncHnalder from "../middleware/asyncHandler.js";
import Order from "../model/orderModel.js";

const addOrderItems = asyncHnalder(async (req, res) => {
  const {
    orderItems,
    deliveryPrice,
    itemsPrice,
    shippingAddress,
    taxPrice,
    paymentMethod,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("invalid try");
  } else {
    const order = new Order({
      orderItems: orderItems.map((x) => ({
        ...x,
        product: x._id,
        _id: undefined,
      })),
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      deliveryPrice,
      totalPrice,
    });
    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  }
});

const getMyOrders = asyncHnalder(async (req, res) => {
  const myOrder = await Order.find({ user: req.user._id });
  res.status(200).json(myOrder);
});

const getOrderById = asyncHnalder(async (req, res) => {
  const orderById = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );
  if (orderById) {
    res.status(200).json(orderById);
  } else {
    res.status(404);
    throw new Error("No order has found with this id");
  }
});

const updateOrderToPaid = asyncHnalder(async (req, res) => {
  const order = await Order.findById(req.params.id)

  if(order){
    order.isPaid = true;
    order.paidAt = Date.now()
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address
    }

    const updatedOrder = await order.save()

    res.status(200).json(updatedOrder)
  }else {
    res.status(404)
    throw new Error('order not found')
  }
});

const updateOrderToDelivered = asyncHnalder(async (req, res) => {
  res.send("update order to delivered");
});

const getOrders = asyncHnalder(async (req, res) => {
  res.send("all orders");
});

export {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getOrders,
};
