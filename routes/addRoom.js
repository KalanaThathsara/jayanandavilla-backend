const express = require('express');
// const Joi = require('joi');
var multer = require('multer')
const router = express.Router();
const authCustomer = require('../middleware/authMiddleware')

const {Room} = require('../modules/roomModule')


router.post('/',  async (req, res) => {

    // console.log(req.body)
    // res.send('Received')

    // const {error} = validateCustomer(req.body);
    // if(error) return res.status(400).send(error.details[0].message);
    console.log(req.body)
        
    let roomAvailable = await Room.findOne({ roomNo: req.body.roomNo });

    if (!roomAvailable) {

        let room = new Room({
            roomNo: req.body.roomNo,
            roomName: req.body.roomName,
            description: req.body.description,
            image: '',
            price: req.body.price,
            totalQuantity: req.body.quantity,
            noOfBookings: 0,
            discount: 0,
            bookingCombinations: []
        });
        room.combinations.push({ size: req.body.size , qty: req.body.quantity });

        roomR = await room.save();
        res.status(200).send(`${req.body.size} Size Room Successfully Saved `);
        console.log("Room recorded result", roomR)

        return
    }
    else {

        let avaiSize = roomAvailable.combinations.filter((c) => {
            if(c.size == req.body.size) return true
        })
        console.log("avai size", avaiSize)

        if(avaiSize.length > 0) {
            roomAvailable.combinations.forEach(p => {
                if(p.size == req.body.size) p.qty = parseInt(p.qty) +  parseInt(req.body.quantity)
            });
            roomAvailable.totalQuantity = parseInt(roomAvailable.totalQuantity)  + parseInt(req.body.quantity)
            roomAvailable.save()
            res.status(200).send(`Room Size ${req.body.size} Quantity Successfully Updated`);
            return
        }
        
        roomAvailable.combinations.push({ size: req.body.size , qty: req.body.quantity })
        roomAvailable.totalQuantity = parseInt(roomAvailable.totalQuantity)  + parseInt(req.body.quantity)
        console.log("After", roomAvailable)
        roomAvailable.save()
        res.status(200).send(`Room Sizes ${req.body.size} Successfully Updated`); 
    }
});


router.post('/update',  async (req, res) => {

    // console.log(req.body)
    // res.send('Received')

    // const {error} = validateCustomer(req.body);
    // if(error) return res.status(400).send(error.details[0].message);
        
    let product = await Product.findOne({ productNo: req.body.productNo });
    console.log('Before product', product)
    product.productName = req.body.productName
    product.description = req.body.description
    product.supplierID = req.body.supplier
    product.material = req.body.material
    product.color = req.body.color
    product.price = req.body.price
    product.category = req.body.category
    product.popular = false

    console.log('After product', product)

    let avaiSize = product.combinations.filter((c) => {
        if(c.size == req.body.size) return true
    })
    console.log("avai size", avaiSize)

    if(avaiSize.length > 0) {
        product.combinations.forEach(p => {
            if(p.size == req.body.size) p.qty = parseInt(p.qty) +  parseInt(req.body.quantity)
        });
        product.totalQuantity = parseInt(product.totalQuantity)  + parseInt(req.body.quantity)
        product.save()
        res.status(200).send(`Product Size ${req.body.size} Quantity Successfully Updated`);
        return
    }
    
    product.combinations.push({ size: req.body.size , qty: req.body.quantity })
    product.totalQuantity = parseInt(product.totalQuantity)  + parseInt(req.body.quantity)
    console.log("After", product)
    await product.save()
    res.status(200).send(`Product Sizes ${req.body.size} Successfully Updated`);
  
});


var fileToDB = ''
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, `roomImages`)
    },

    filename: function (req, file, cb) {

        const fileType = file.originalname.split('.')[1] 
        fileToDB = req.headers.nameofimage + '.' + fileType

        cb(null, req.headers.nameofimage + '.' + fileType )
    }
    
})

var upload = multer({ storage: storage }).single('file')

router.post('/image',function(req, res) {
    // console.log('Image Request Received')
    // console.log(req.body)
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            console.log(err)
            return res.status(500).json(err)
        } else if (err) {
            console.log(err)
            return res.status(500).json(err)
        }

        addImage(req, res)

    })

});

async function addImage(req, res) {

    const result = await Room.updateOne({roomNo: req.headers.nameofimage} , {
        $set: {
            image: fileToDB
        }
    })
    console.log("Found product for image", result)
    res.status(200).send("Image Successfully Saved")
}

module.exports = router;