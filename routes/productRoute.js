import express from 'express';
import { requireSignIn, isAdmin } from '../middleware/authMIddleware.js';
import formidable from 'express-formidable';
import { createProductController, getProductController } from '../controller/productController.js';

const router = express.Router();

//routes
router.post('/create-product', requireSignIn, isAdmin, formidable(), createProductController)

//get-products
router.get('/get-product', getProductController)

export default router;