var express = require('express');
const router = express.Router();
const path = require('path');

const {Customer} = require('../modules/customerModule')

router.get('/:id', async function (req, res, next) {

    if(req.params.id) {

        const customer = await Customer.findById(req.params.id).select('-password')
        
        res.status(200).send(customer)
    }
})

module.exports = router;