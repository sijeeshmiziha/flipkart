import mongoose from "mongoose"

export const OrderSchema=mongoose.Schema({

    isPaid:Boolean,
    amount:Number,
    razorpay:{
        order_id:String,
        payment_id:String,
        signature:String,
    },

})

const order=mongoose.model("order",OrderSchema);

export default order;