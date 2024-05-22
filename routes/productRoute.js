import express from 'express';
import { requireSignIn, isAdmin } from '../middleware/authMIddleware.js';
import formidable from 'express-formidable';
import {
    createProductController,
    deleteProductController,
    getProductController,
    getSingleProductController,
    productPhotoController
} from '../controller/productController.js';

const router = express.Router();

//routes
router.post('/create-product', requireSignIn, isAdmin, formidable(), createProductController);

//get-products
router.get('/get-product', getProductController);

//single-product
router.get('/get-product/:slug', getSingleProductController);

//get-photo
router.get('/product-photo/:pid', productPhotoController);

//delete-product
router.delete('/delete-product/:pid', requireSignIn, isAdmin, deleteProductController)
export default router;