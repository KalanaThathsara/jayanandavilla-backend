const express = require('express');
const Joi = require('joi');
const router = express.Router();

const {Gallery} = require('../modules/galleryModule')

router.get('/',async function(req, res) {

    const images = await Gallery.find({})
    
    res.status(200).send(images)

    // const today = new Date()
    // const threedaysFromNow = new Date('2021-06-06T13:20:15.990Z')
    // // threedaysFromNow.setDate( threedaysFromNow.getDate() + 3)

    // getDatesBetweenDates(today, threedaysFromNow)

    // function getDatesBetweenDates(startDate, endDate) {
    //     let dates = []
    //     //to avoid modifying the original date
    //     const theDate = new Date(startDate)
    //     while (theDate < endDate) {
    //       dates = [...dates, new Date(theDate)]
    //       theDate.setDate(theDate.getDate() + 1)
    //     }
    //     dates = [...dates, endDate]
    //     console.log(dates)
    //     return dates
    //   }
});


module.exports = router;

