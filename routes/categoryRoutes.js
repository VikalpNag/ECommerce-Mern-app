import express from "express";
import { isAdmin, requireSignIn } from "../middleware/authMIddleware.js";
import { createCategoryController, updateCategoryController } from "../controller/categoryController.js";

const router = express.Router();

//routes
router.post('/create-category', requireSignIn, isAdmin, createCategoryController);

//update-category
router.put('update-category/:id', requireSignIn, isAdmin, updateCategoryController)

export default router;