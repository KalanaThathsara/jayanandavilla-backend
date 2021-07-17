const mongoose = require("mongoose");

const receptionSchema = new mongoose.Schema({
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
  discount: {
    type: String,
  },
  bookings: {
    type: Array,
  },
});

const Reception = mongoose.model("Reception", receptionSchema);

exports.Reception = Reception;
exports.receptionSchema = receptionSchema;
