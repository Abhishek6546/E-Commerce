import express from "express"
import { addToCart,updateCart,getUsercart } from "../controllers/cartController.js"
import authUser from "../middleware/auth.js";

const cartRouter =express.Router();

cartRouter.post("/get",authUser,getUsercart)
cartRouter.post("/add",authUser,addToCart)
cartRouter.post("/update",authUser,updateCart)

export default cartRouter;

