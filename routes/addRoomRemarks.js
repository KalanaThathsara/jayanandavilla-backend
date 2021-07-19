const express = require("express");
const Joi = require("joi");
const router = express.Router();

const { Booking } = require("../modules/bookingModule");
const { DayoutBooking } = require("../modules/dayoutBooking");
const { ReceptionBooking } = require("../modules/receptionBooking");

router.post("/room", async (req, res) => {
  const booking = await Booking.findById(req.body.room);
  //   booking.remarks = req.body.remark;
  booking.subtotal = parseInt(booking.subtotal) + parseInt(req.body.amount);
  let re = booking.remarks;
  re.push(`${req.body.remark} - Rs.${req.body.amount}`);
  console.log("re", re);
  booking.remarks = re;
  //   console.log("amount", req.body.amount);
  booking
    .save()
    .then(() => res.status(200).send(`Remarks Added`))
    .catch((e) => console.log(e));
  return;
});

router.post("/dayout", async (req, res) => {
  const booking = await DayoutBooking.findById(req.body.room);
  //   booking.remarks = req.body.remark;
  booking.total = parseInt(booking.total) + parseInt(req.body.amount);
  let re = booking.remarks;
  re.push(`${req.body.remark} - Rs.${req.body.amount}`);
  console.log("re", re);
  booking.remarks = re;
  //   console.log("amount", req.body.amount);
  booking
    .save()
    .then(() => res.status(200).send(`Remarks Added`))
    .catch((e) => console.log(e));
  return;
});

router.post("/reception", async (req, res) => {
  const booking = await ReceptionBooking.findById(req.body.room);
  //   booking.remarks = req.body.remark;
  booking.total = parseInt(booking.total) + parseInt(req.body.amount);
  let re = booking.remarks;
  re.push(`${req.body.remark} - Rs.${req.body.amount}`);
  console.log("re", re);
  booking.remarks = re;
  //   console.log("amount", req.body.amount);
  booking
    .save()
    .then(() => res.status(200).send(`Remarks Added`))
    .catch((e) => console.log(e));
  return;
});

module.exports = router;
