const express = require("express");
const Joi = require("joi");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const env = require("../envVariables");
const sendMails = require("./sendMails");

const { Booking } = require("../modules/bookingModule");
const { Room } = require("../modules/roomModule");
const { Customer } = require("../modules/customerModule");

router.post("/", async (req, res) => {
  //console.log(req.body);

  let from = new Date(req.body.from);
  let to = new Date(req.body.to);

  let bookedDates = getDatesBetweenDates(from, to);
  // res.send('Received')

  // const {error} = validateBooking(req.body);
  // if(error) return res.status(400).send(error.details[0].message);

  // let booking = await Booking.findOne({ email: req.body.email});
  // if(booking) return res.status(400).send('Booking Already Registered.')
  const room = await Room.findById(req.body.room);
  let roomPrice = room.price;
  let subtotal = parseInt(roomPrice) * parseInt(bookedDates.length);
  // console.log(roomPrice)
  // console.log(bookedDates.length)
  // console.log(subtotal)

  let newBooking = new Booking({
    timeStamp: new Date().toISOString(),
    dates: bookedDates,
    room: req.body.room,
    customer: req.body.customer,
    subtotal: subtotal,
    remarks: [],
  });

  await newBooking.save();

  //send mails
  const customer = await Customer.findById(req.body.customer).select(
    "-password"
  );
  sendMails.sendRoomBooked(room, customer, newBooking);

  let newBookings = room.bookings;
  bookedDates.forEach((d) => newBookings.push(d));

  room.bookings = newBookings;
  room
    .save()
    .then(() =>
      res
        .status(200)
        .send(
          `Room Successfully Booked from ${new Date(
            req.body.from
          ).toLocaleDateString()} to ${new Date(
            req.body.to
          ).toLocaleDateString()}`
        )
    )
    .catch((e) => console.log(e));
  return;
});

function getDatesBetweenDates(startDate, endDate) {
  let dates = [];
  //to avoid modifying the original date
  const theDate = new Date(startDate);
  while (theDate < endDate) {
    dates = [...dates, new Date(theDate)];
    theDate.setDate(theDate.getDate() + 1);
  }
  dates = [...dates, endDate];
  dates.pop();
  // console.log(dates)
  return dates;
}

module.exports = router;
