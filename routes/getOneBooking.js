const express = require("express");
const router = express.Router();

const { DayoutBooking } = require("../modules/dayoutBooking");
const { Booking } = require("../modules/bookingModule");
const { ReceptionBooking } = require("../modules/receptionBooking");

router.get("/reception/:id", async function (req, res) {
  const recepBookings = await ReceptionBooking.findById(req.params.id)
    .populate("package")
    .populate("customer");

  res.status(200).send(recepBookings);
});

router.get("/dayout/:id", async function (req, res) {
  const dayoutBookings = await DayoutBooking.findById(req.params.id)
    .populate("package")
    .populate("customer");

  res.status(200).send(dayoutBookings);
});

router.get("/room/:id", async function (req, res) {
  console.log("Getting room", req.params.id);
  const booking = await Booking.findById(req.params.id)
    .populate("room")
    .populate("customer");

  res.status(200).send(booking);
});

module.exports = router;
