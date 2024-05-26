import express from 'express';
import { requireSignIn, isAdmin } from '../middleware/authMIddleware.js';
import formidable from 'express-formidable';
import {
    createProductController,
    deleteProductController,
    getProductController,
    getSingleProductController,
    productCountController,
    productFilterController,
    productListController,
    productPhotoController,
    relatedProductController,
    searchProductController,
    updateProductController
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
router.delete('/delete-product/:pid', requireSignIn, isAdmin, deleteProductController);

//update-product
router.put('/update-product/:pid', requireSignIn, isAdmin, formidable(), updateProductController);

//filter-product
router.post('/product-filter', productFilterController);

//product-count
router.get('/product-count', productCountController);

//product-per-page
router.get('/product-list/:page', productListController);

//search-product
router.get('/search/:keyword', searchProductController)

//similar products
router.get('/related-product/:pid/:cid', relatedProductController)
export default router;