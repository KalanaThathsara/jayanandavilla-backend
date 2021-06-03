const express = require('express');
const Joi = require('joi');
const router = express.Router();

const {Room} = require('../modules/roomModule')

router.get('/',async function(req, res) {

    const rooms = await Room.find({})

    // //filter most popular
    // let popularF = products.filter(p => {
    //     if(p.sales > 0) return true
    // })
    // popularF.sort( compare )
    // let popular = popularF.slice(0,2)
    // let popularIds = popular.map(p => p._id)

    // //set popular
    // products.forEach(p => {
    //     if(popularIds.includes(p._id)) return p.popular = true
    // })
    
    res.status(200).send(rooms)
});

router.get('/:id',async function(req, res) {

    const product = await Product.findById(req.params.id)

    console.log("One Products Admin", product)
    res.status(200).send(product)
});

function compare( a, b ) {
    if ( parseInt(a.sales) < parseInt(b.sales) ){
      return 1;
    }
    if ( parseInt(a.sales) > parseInt(b.sales) ){
      return -1;
    }
    return 0; 
}

module.exports = router;

