import mongoose from 'mongoose'

const OrderSchema = new mongoose.Schema({
    orderItems: [{
        name: {type: String, required: true},
        image: {type: String, required: true},
        price: {type: String, required: true},
        qty: {type: String, required : true},
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'products',
            required: true,
        }
    }],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    shipping: {
        address: {type: String, required: true},
        code: {type: String, required: true},
        city: {type: String, required: true},
    },
    payment: {
        paymentMethod: {type: String, required: true},
        paymentResult:{
            paymentID: String,
            ownerID: String,
            orderID: String
        }
    },
    itemsPrice: Number,
    tax: Number,
    shippingPrice: Number,
    totalMoney: Number,
    isPaid: {type: Boolean, required: true, default: false},
    PaidAt: Date,
    isDeliverd: {type: Boolean, required: true, default: false},
    DeliverdAt: Date
},{
    timestamps: true,
})

const Order = mongoose.model('Order', OrderSchema)

export default Order