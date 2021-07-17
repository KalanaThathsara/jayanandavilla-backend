const express = require("express");
const router = express.Router();

const { DayoutBooking } = require("../modules/dayoutBooking");
const { Booking } = require("../modules/bookingModule");

router.get("/dayout/:id", async function (req, res) {
  const dayoutBookings = await DayoutBooking.findById(req.params.id);

  dayoutBookings.status = "Canceled";
  await dayoutBookings.save();

  res.status(200).send("Booking Canceled");
});

router.get("/room/:id", async function (req, res) {
  const bookings = await Booking.findById(req.params.id);

  bookings.status = "Canceled";
  await bookings.save();

  res.status(200).send("Booking Canceled");
});

module.exports = router;
