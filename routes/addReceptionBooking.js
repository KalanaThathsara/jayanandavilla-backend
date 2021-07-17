const express = require("express");
const router = express.Router();

const { Reception } = require("../modules/receptionModule");
const { ReceptionBooking } = require("../modules/receptionBooking");

router.post("/", async (req, res) => {
  console.log(req.body);

  const package = await Reception.findById(req.body.package);
  if (!package.bookings) {
    // console.log("New booking");
    package.bookings = [];
    package.bookings[0] = req.body.date;
    package.save();
  } else {
    // console.log("Curr booking");
    let currBookings = package.bookings;
    currBookings.push(req.body.date);
    package.bookings = currBookings;
    // console.log("new list", package.bookings);
    package.save();
  }

  let newBooking = new ReceptionBooking(req.body);
  await newBooking.save();

  res.status(200).send(
    `Reception Hall Successfully Booked for 
      ${new Date(req.body.date).toLocaleDateString()}`
  );

  return;
});

module.exports = router;
