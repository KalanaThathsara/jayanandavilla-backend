const express = require('express');
const Joi = require('joi');
const router = express.Router();

const {Booking} = require('../modules/bookingModule');
const { Room } = require('../modules/roomModule');

router.get('/',async function(req, res) {

    const bookings = await Booking.find({}).sort({timeStamp: 'desc'})
    .populate('room')
    .populate('customer')

    console.log(bookings)
    res.status(200).send(bookings)
});

router.get('/all-dates',async function(req, res) {

    let dates = []

    const bookings = await Booking.find({}).sort({timeStamp: 'desc'})
    .populate('room')
    .populate('customer')

    bookings.forEach((b) => {
        let start = ''
        let end = ''

        b.dates.forEach((d, index) => {
            if(index == 0) {
                start = d
            }
            if(index == b.dates.length - 1) {
                end = d
            }
            
        })
        dates.push({
            start: start,
            end: end,
            title: `Room - ${b.room.roomName}`,
            color: '#42fffc'
        })
    })

    // console.log(bookings)
    res.status(200).send(dates)
});

module.exports = router;

