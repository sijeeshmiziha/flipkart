import mongoose from "mongoose"

const OrderSchema=mongoose.Schema({

    isPaid:Boolean,
    amount:Number,
    razorpay:{
        orderId:String,
        paymentId:String,
        signature:String,
    },

})

const order=mongoose.model("order",OrderSchema);

export default order;