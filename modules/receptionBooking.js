const Joi = require("joi");
const mongoose = require("mongoose");

const ReceptionBooking = mongoose.model(
  "ReceptionBooking",
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
      ref: "Reception",
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
  })
);

exports.ReceptionBooking = ReceptionBooking;
// exports.validateCustomer = validateCustomer;
