import orderModel from "../models/orderModel.js"
import userModel from "../models/userModel.js";

//placing orders using cod method
const PlaceOrder = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body;

        const orderData = {
            userId,
            items,
            address,
            amount,
            PaymentMethod: 'COD',
            payment: false,
            date: Date.now()
        }

        const neworder = new orderModel(orderData)
        await neworder.save();

        await userModel.findByIdAndUpdate(userId, { cartData: {} });

        res.json({ success: true, message: "Order Placed" })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}
//placing orders using Stripe method
const PlaceOrderStripe = async (req, res) => {

}
//placing orders using Razorpay method
const PlaceOrderRazorpay = async (req, res) => {

}
//All orders data for Admin panel
const allOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({})
        res.json({ success: true, orders })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}
//User order data for frontend
const userOrders = async (req, res) => {
    try {
        const { userId } = req.body;

        const orders = await orderModel.find({ userId })

        res.json({ success: true, orders })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}
//update order status for admin panel
const updateStatus = async (req, res) => {
      try {
        const {orderId,status}=req.body;

        await orderModel.findByIdAndUpdate(orderId,{status})
        res.json({success:true,message:"Status Updated"})
      } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
      }
}

export { PlaceOrder, PlaceOrderStripe, PlaceOrderRazorpay, allOrders, userOrders, updateStatus }