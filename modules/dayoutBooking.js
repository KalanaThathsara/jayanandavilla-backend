const Joi = require("joi");
const mongoose = require("mongoose");

const DayoutBooking = mongoose.model(
  "DayoutBooking",
  new mongoose.Schema({
    timeStamp: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    package: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Package",
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
    },
    numOfPersons: {
      type: Object,
      ref: "Customer",
    },
    total: {
      type: String,
      // required: true
    },
  })
);

exports.DayoutBooking = DayoutBooking;
// exports.validateCustomer = validateCustomer;
