const Joi = require("joi");
const mongoose = require("mongoose");

// const Sizes = new mongoose.Schema({
//     size : String,
//     qty: Number
// })

const dayoutSchema = new mongoose.Schema({
  packageNo: {
    type: String,
    required: true,
  },
  packageName: {
    type: String,
    required: true,
  },
  services: {
    type: String,
  },
  menu: {
    type: String,
  },
  image1: {
    type: String,
  },
  image2: {
    type: String,
  },
  image3: {
    type: String,
  },
  aprice: {
    type: String,
    required: true,
  },
  cprice: {
    type: String,
    required: true,
  },
  discount: {
    type: String,
  },
});

const Dayout = mongoose.model("Dayout", dayoutSchema);

// function validateCustomer(customer) {
//     const schema = {
//         name : Joi.string().min(5).required(),
//         phone : Joi.string().min(5).required(),
//         isGold: Joi.boolean()
//     };
//     return Joi.validate(customer, schema);
// }
exports.Dayout = Dayout;
exports.dayoutSchema = dayoutSchema;
// exports.validateCustomer = validateCustomer;
