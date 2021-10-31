import Order from "../model/orderSchema";
import Razorpay from "razorpay";
import Order from "../model/orderSchema";


export const createOder = (request, response) => {
  try {
    const instance = (instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    }));

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

export const payOder = (request, response) => {
  try {
    const { amount, razorpayPaymentId, razorpayOrderId, razorpaySignature } =
      request.body;
    const newOrder = Order({
      isPaid: true,
      amount: amount,
      razorpay: {
        paymentId: razorpayPaymentId,
        orderId: razorpayOrderId,
        signature: razorpaySignature,
      },
    });
    await response.send({msg:"payment was successfull"});
  } catch (error) {
    response.send(error);
  }
};

export const paymentResponse=(request,response)=>{
 const orders=Order.find();
 response.send(orders);
}
