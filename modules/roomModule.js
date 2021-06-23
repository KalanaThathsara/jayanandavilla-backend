const Joi = require('joi');
const mongoose = require('mongoose');

// const Sizes = new mongoose.Schema({
//     size : String,
//     qty: Number
// })

const roomSchema = new mongoose.Schema({
    roomNo: {
        type: String,
        required: true
    },
    roomName: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    image: {
        type: String
    },
    price: {
        type: String,
        required: true
    },
    discount: {
        type: String
    },
    discountedPrice: {
        type: String
    },
    size: {
        type: String
    },
    quantity: {
        type: String
    },
    noOfBookings: {
        type: String
    },
    bookings: {
        type: Array
    }
})


const Room = mongoose.model('Room', roomSchema);

// function validateCustomer(customer) {
//     const schema = {
//         name : Joi.string().min(5).required(),
//         phone : Joi.string().min(5).required(),
//         isGold: Joi.boolean()
//     };
//     return Joi.validate(customer, schema);
// }

exports.Room = Room;
exports.roomSchema = roomSchema
// exports.validateCustomer = validateCustomer;