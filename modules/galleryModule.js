const Joi = require('joi');
const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    
})


const Gallery = mongoose.model('Gallery', gallerySchema);

// function validateCustomer(customer) {
//     const schema = {
//         name : Joi.string().min(5).required(),
//         phone : Joi.string().min(5).required(),
//         isGold: Joi.boolean()
//     };
//     return Joi.validate(customer, schema);
// }

exports.Gallery = Gallery;
exports.gallerySchema = gallerySchema
// exports.validateCustomer = validateCustomer;