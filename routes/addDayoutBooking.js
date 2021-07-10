const express = require("express");
const router = express.Router();

const { Dayout } = require("../modules/dayoutModule");
const { DayoutBooking } = require("../modules/dayoutBooking");

router.post("/", async (req, res) => {
  console.log(req.body);

  const package = await Dayout.findById(req.body.package);
  if (!package.bookings) {
    package.bookings = [];
    package.bookings[0] = req.body.date;
  } else {
    let currBookings = package.bookings;
    currBookings.push(req.body.date);
    package.bookings = currBookings;
  }
  await package.save();

  let newBooking = new DayoutBooking(req.body);
  await newBooking.save();

  res.status(200).send(
    `Dayout Package Successfully Booked for 
      ${new Date(req.body.date).toLocaleDateString()}`
  );

  return;
});

module.exports = router;
