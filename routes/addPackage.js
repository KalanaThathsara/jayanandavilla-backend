const express = require('express');
// const Joi = require('joi');
var multer = require('multer')
const router = express.Router();
const authCustomer = require('../middleware/authMiddleware')

const {Package} = require('../modules/packageModule')


router.post('/',  async (req, res) => {

    // console.log(req.body)
    // res.send('Received')

    // const {error} = validateCustomer(req.body);
    // if(error) return res.status(400).send(error.details[0].message);
    console.log(req.body)
    //https://www.geeksforgeeks.org/how-to-display-a-pdf-as-an-image-in-react-app-using-url/
    //https://projects.wojtekmaj.pl/react-pdf/
        
    // let roomAvailable = await Room.findOne({ roomNo: req.body.roomNo });

    // if (!roomAvailable) {

        let package = new Package({
            name: req.body.name,
            description: req.body.description
        });

        let pkgR = await package.save();
        res.status(200).send(`Package Successfully Saved `);
        console.log("Room recorded result", pkgR)

        return
    // }
    
    // else {

    //     let avaiSize = roomAvailable.combinations.filter((c) => {
    //         if(c.size == req.body.size) return true
    //     })
    //     console.log("avai size", avaiSize)

    //     if(avaiSize.length > 0) {
    //         roomAvailable.combinations.forEach(p => {
    //             if(p.size == req.body.size) p.qty = parseInt(p.qty) +  parseInt(req.body.quantity)
    //         });
    //         roomAvailable.totalQuantity = parseInt(roomAvailable.totalQuantity)  + parseInt(req.body.quantity)
    //         roomAvailable.save()
    //         res.status(200).send(`Room Size ${req.body.size} Quantity Successfully Updated`);
    //         return
    //     }
        
    //     roomAvailable.combinations.push({ size: req.body.size , qty: req.body.quantity })
    //     roomAvailable.totalQuantity = parseInt(roomAvailable.totalQuantity)  + parseInt(req.body.quantity)
    //     console.log("After", roomAvailable)
    //     roomAvailable.save()
    //     res.status(200).send(`Room Sizes ${req.body.size} Successfully Updated`); 
    // }
});



router.post('/pdf',function(req, res) {
    // console.log('Image Request Received')
    // console.log(req.body)
    var fileToDB = ''
    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, `packagesPDFs`)
        },

        filename: function (req, file, cb) {

            const fileType = file.originalname.split('.')[1] 
            fileToDB = req.headers.nameofimage + '.' + fileType

            cb(null, req.headers.nameofimage + '.' + fileType )
        }
        
    })

    var upload = multer({ storage: storage }).single('file')

    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            console.log(err)
            return res.status(500).json(err)
        } else if (err) {
            console.log(err)
            return res.status(500).json(err)
        }

        addImage(req, res, fileToDB)

    })

});

router.post('/image',function(req, res) {
    // console.log('Image Request Received')
    // console.log(req.body)
    var fileToDB = ''
    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, `packagesImages`)
        },

        filename: function (req, file, cb) {

            const fileType = file.originalname.split('.')[1] 
            fileToDB = req.headers.nameofimage + '.' + fileType

            cb(null, req.headers.nameofimage + '.' + fileType )
        }
        
    })

    var upload = multer({ storage: storage }).single('file')

    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            console.log(err)
            return res.status(500).json(err)
        } else if (err) {
            console.log(err)
            return res.status(500).json(err)
        }

        addImage2(req, res, fileToDB)

    })

});

async function addImage(req, res, fileToDB) {

    const result = await Package.updateOne({name: req.headers.nameofimage} , {
        $set: {
            pdf: fileToDB
        }
    })
    console.log("Found product for image", result)
    res.status(200).send("PDF Successfully Saved")
}
async function addImage2(req, res, fileToDB) {

    const result = await Package.updateOne({name: req.headers.nameofimage} , {
        $set: {
            image: fileToDB
        }
    })
    console.log("Found product for image", result)
    res.status(200).send("Image Successfully Saved")
}

module.exports = router;