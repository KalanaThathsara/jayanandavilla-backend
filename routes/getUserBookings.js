const express = require("express");
const router = express.Router();

const { DayoutBooking } = require("../modules/dayoutBooking");
const { Booking } = require("../modules/bookingModule");

router.get("/:user", async function (req, res) {
  console.log("User", req.params.user);
  const roomBookings = await Booking.find({ customer: req.params.user })
    .populate("customer")
    .populate("room");

  const dayoutBookings = await DayoutBooking.find({
    customer: req.params.user,
  })
    .populate("customer")
    .populate("package");

  res.status(200).json({
    roomBookings,
    dayoutBookings,
  });
});

module.exports = router;
