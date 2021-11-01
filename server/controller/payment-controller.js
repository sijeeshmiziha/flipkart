import Order from "../model/orderSchema.js";
import Razorpay from "razorpay";


export const createOrder = (request, response) => {
  try {
    const instance = (instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    }));
   console.log(request.body);
    const options = {
      amount: request.body.price,
      currency: "INR",
    };
    const order = instance.create(options);
    if (!order) response.send("Some error occured");
    response.send(order);
  } catch (error) {
    response.send(error);
  }
};

export const payOrder = async (request, response) => {
  // console.log("triiggerd payOder");
  // console.log(request.body);
  try {
    const { amount, razorpayPaymentId, razorpayOrderId, razorpaySignature } =
      request.body;
    const newOrder = Order.create({
      isPaid: true,
      amount: amount,
      razorpay: {
        order_id: razorpayOrderId,
        payment_id: razorpayPaymentId,
        signature: razorpaySignature,
      },
    });
    await response.send({msg:"payment was successfull"});
  } catch (error) {
    response.send(error);
  }
};

export const paymentResponse= async(request,response)=>{
 const orders=await Order.find();
 console.log(orders);
 response.send(orders);
}
