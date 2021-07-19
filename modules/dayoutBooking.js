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
      ref: "Dayout",
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
    },
    numOfPersons: {
      type: Object,
    },
    total: {
      type: String,
      // required: true
    },
    status: {
      type: String,
    },
    remarks: {
      type: Array,
    },
  })
);

exports.DayoutBooking = DayoutBooking;
// exports.validateCustomer = validateCustomer;
