const express = require("express");
const Joi = require("joi");
const router = express.Router();

const { Booking } = require("../modules/bookingModule");
const { DayoutBooking } = require("../modules/dayoutBooking");
const { ReceptionBooking } = require("../modules/receptionBooking");
const { Room } = require("../modules/roomModule");

router.get("/", async function (req, res) {
  const bookings = await Booking.find({})
    .sort({ timeStamp: "desc" })
    .populate("room")
    .populate("customer");

  // console.log(bookings);
  res.status(200).send(bookings);
});

router.get("/all-dates", async function (req, res) {
  let dates = [];
  //room boked dates
  const bookings = await Booking.find({})
    .sort({ timeStamp: "desc" })
    .populate("room")
    .populate("customer");

  bookings.forEach((b) => {
    let start = "";
    let end = "";

    b.dates.forEach((d, index) => {
      if (index == 0) {
        start = d;
      }
      if (index == b.dates.length - 1) {
        end = d;
      }
    });
    dates.push({
      start: start,
      end: end,
      title: `Room - ${b.room.roomName}`,
      color: "#42fffc",
      allDay: true,
    });
  });

  //dayouts booked dates
  const dayoutbookings = await DayoutBooking.find({})
    .sort({ timeStamp: "desc" })
    .populate("package")
    .populate("customer");

  dayoutbookings.forEach((b) => {
    let start = b.date;
    let end = b.date;

    dates.push({
      start: start,
      end: end,
      allDay: true,
      title: `Dayout- ${b.package && b.package.packageNo}`,
      color: "#FCD02C",
    });
  });

  //get reception booking
  const recepbookings = await ReceptionBooking.find({})
    .sort({ timeStamp: "desc" })
    .populate("package")
    .populate("customer");

  recepbookings.forEach((b) => {
    let start = b.date;
    let end = b.date;

    dates.push({
      start: start,
      end: end,
      allDay: true,
      title: `Reception Hall - ${b.package && b.package.packageNo}`,
      color: "#3EB650",
    });
  });

  // console.log(bookings)
  res.status(200).send(dates);
});

// router.get("/all-dates", async function (req, res) {
//   let dates = [];

//   const bookings = await Booking.find({})
//     .sort({ timeStamp: "desc" })
//     .populate("room")
//     .populate("customer");

//   bookings.forEach((b) => {
//     let start = "";
//     let end = "";

//     b.dates.forEach((d, index) => {
//       if (index == 0) {
//         start = d;
//       }
//       if (index == b.dates.length - 1) {
//         end = d;
//       }
//     });
//     dates.push({
//       start: start,
//       end: end,
//       title: `Room - ${b.room.roomName}`,
//       color: "#42fffc",
//     });
//   });

//   // console.log(bookings)
//   res.status(200).send(dates);
// });

router.get("/booked-dates/:id", async function (req, res) {
  let dates = [];

  const bookings = await Booking.find({ room: req.params.id })
    .sort({ timeStamp: "desc" })
    .populate("room")
    .populate("customer");

  bookings.forEach((b) => {
    let start = "";
    let end = "";

    b.dates.forEach((d, index) => {
      if (index == 0) {
        start = d;
      }
      if (index == b.dates.length - 1) {
        end = d;
      }
    });
    dates.push({
      start: start,
      end: end,
      title: `Booked`,
      color: "red",
    });
  });

  // console.log(bookings)
  res.status(200).send(dates);
});

module.exports = router;
