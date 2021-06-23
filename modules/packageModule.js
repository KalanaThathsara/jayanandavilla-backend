const Joi = require('joi');
const mongoose = require('mongoose');

const Package = mongoose.model('Package', new mongoose.Schema({
    name: {
        type: String,
        ref: "Room"
    },
    description: {
        type: String,
        ref: "Room"
    },
    image: {
        type: String,
        ref: "Room"
    },
    pdf: {
        type: String,
        ref: "Room"
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

exports.Package = Package;
// exports.validateCustomer = validateCustomer;
