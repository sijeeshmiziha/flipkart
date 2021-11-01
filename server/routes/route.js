import express from  'express';
import { getProductById, getProducts } from '../controller/product-controller.js';
import { userSignUp, userLogIn } from '../controller/user-controller.js';
import { addItemInCart } from '../controller/cart-controller.js';
import { createOrder } from '../controller/payment-controller.js';
import { payOrder } from '../controller/payment-controller.js';
import { paymentResponse } from '../controller/payment-controller.js';


const router = express.Router();

//login & signup
router.post('/signup', userSignUp);
router.post('/login', userLogIn);

router.get('/products', getProducts);
router.get('/product/:id', getProductById);

router.post('/cart/add', addItemInCart);

router.get('/get-razorpay-key', (req, res) => {
    res.send({ key: process.env.RAZORPAY_KEY_ID });
  });
  
router.post("/create-order", createOrder);
router.post('/pay-order', payOrder);
router.get('/pay-res', paymentResponse);

export default router;