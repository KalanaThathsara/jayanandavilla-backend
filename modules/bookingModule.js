const Joi = require('joi');
const mongoose = require('mongoose');

const Booking = mongoose.model('Booking', new mongoose.Schema({
    timeStamp: {
        type: String,
        required: true
    },
    dates: {
        type: Array,
        required: true
    },
    room: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Room"
    },
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer"
    },
    subtotal: {
        type: String,
        // required: true
    }
}));

// function validateCustomer(customer) {
//     const schema = {
//         name : Joi.string().min(5).required(),
//         phone : Joi.string().min(5).required(),
//         isGold: Joi.boolean()
//     };
//     return Joi.validate(customer, schema);
// }

exports.Booking = Booking;
// exports.validateCustomer = validateCustomer;
