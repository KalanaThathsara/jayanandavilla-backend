const express = require("express");
const Joi = require("joi");
const router = express.Router();

const { Dayout } = require("../modules/dayoutModule");
const { ReceptionBooking } = require("../modules/receptionBooking");

// router.get("/", async function (req, res) {
//   const bookings = await Booking.find({})
//     .sort({ timeStamp: "desc" })
//     .populate("room")
//     .populate("customer");

//   console.log(bookings);
//   res.status(200).send(bookings);
// });

router.get("/all-dates", async function (req, res) {
  let dates = [];

  const bookings = await ReceptionBooking.find({})
    .sort({ timeStamp: "desc" })
    .populate("package")
    .populate("customer");

  //   console.log(bookings);
  bookings.forEach((b) => {
    let start = b.date;
    let end = b.date;

    dates.push({
      start: start,
      end: end,
      title: `Hall - ${b.package && b.package.packageNo}`,
      color: "#42fffc",
    });
  });

  console.log("bookings", bookings);
  res.status(200).send(dates);
});

// router.get("/booked-dates/:id", async function (req, res) {
//   let dates = [];

//   const bookings = await Booking.find({ room: req.params.id })
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
//       title: `Booked`,
//       color: "red",
//     });
//   });

//   // console.log(bookings)
//   res.status(200).send(dates);
// });

module.exports = router;
