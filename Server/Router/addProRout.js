import express from "express";
import { addProduct } from "../controller/addProduct.js";
import Authorize from "../protectmidleware/adminprotect.js";

const addRouter = express.Router();
// only admin can add product
addRouter.post("/",Authorize(["admin"]), addProduct);// Authorize(["admin"]),

export default addRouter;
