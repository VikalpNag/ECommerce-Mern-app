import express from "express";
import { isAdmin, requireSignIn } from "../middleware/authMIddleware.js";
import {
    createCategoryController,
    updateCategoryController,
    getCategoryController,
    singleCategoryController,
    deleteCategoryController
} from "../controller/categoryController.js";

const router = express.Router();

//routes
router.post('/create-category', requireSignIn, isAdmin, createCategoryController);

//update-category
router.put('/update-category/:id', requireSignIn, isAdmin, updateCategoryController);

//GetAll category
router.get('/get-category', getCategoryController)

//single category
router.get('/single-category/:slug', singleCategoryController);

//delete category
router.delete('/delete-category/:id', requireSignIn, isAdmin, deleteCategoryController)


export default router; 