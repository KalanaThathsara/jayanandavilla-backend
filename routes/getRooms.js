const express = require('express');
const Joi = require('joi');
const router = express.Router();

const {Room} = require('../modules/roomModule')

router.get('/',async function(req, res) {

    const rooms = await Room.find({})
    
    res.status(200).send(rooms)
});

router.get('/:id',async function(req, res) {

  // console.log('Req came', req.params.id)
  const room = await Room.findById(req.params.id)
    // console.log(room)
    res.status(200).send(room)
});

module.exports = router;

