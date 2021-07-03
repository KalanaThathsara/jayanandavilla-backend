const Joi = require("joi");
const mongoose = require("mongoose");

const dayoutGallerySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
});

const DayoutGallery = mongoose.model("DayoutGallery", dayoutGallerySchema);

// function validateCustomer(customer) {
//     const schema = {
//         name : Joi.string().min(5).required(),
//         phone : Joi.string().min(5).required(),
//         isGold: Joi.boolean()
//     };
//     return Joi.validate(customer, schema);
// }

exports.DayoutGallery = DayoutGallery;
exports.dayoutGallerySchema = dayoutGallerySchema;
// exports.validateCustomer = validateCustomer;
