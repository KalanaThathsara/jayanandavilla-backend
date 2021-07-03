var express = require('express');
const router = express.Router();
const path = require('path');

const {Customer} = require('../modules/customerModule')

router.get('/', async function (req, res, next) {


    const customers = await Customer.find({}).select('-password')
        
    res.status(200).send(customers)
    
})

module.exports = router;