import express from "express"
import {PlaceOrder,PlaceOrderStripe,PlaceOrderRazorpay,allOrders,userOrders,updateStatus} from "../controllers/orderController.js"
import adminAuth from "../middleware/adminAuth.js"
import authUser from "../middleware/auth.js"

const orderRouter=express.Router();

//Admin features
orderRouter.post("/list",adminAuth,allOrders)
orderRouter.post("/status",adminAuth,updateStatus)

//payment features
orderRouter.post("/place",authUser,PlaceOrder)
orderRouter.post("/stripe",authUser,PlaceOrderStripe)
orderRouter.post("/razorpay",authUser,PlaceOrderRazorpay)

//user features
orderRouter.post("/userorders",authUser,userOrders)

export default orderRouter;