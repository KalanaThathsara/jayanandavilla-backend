var express = require('express');
const router = express.Router();
const path = require('path');

const {Room} = require('../modules/roomModule')

router.get('/:proNo', async function (req, res, next) {

    console.log(req.params.proNo)

    if(req.params.proNo) {

        const imageName = await Room.findOne({roomNo: req.params.proNo}, {image: 1})

        // console.log(typeof imageName.image)

        var options = {
            root: path.join(appRoot + '/roomImages'),
            dotfiles: 'deny',
            headers: {
                'x-timestamp': Date.now(),
                'x-sent': true
            } 
        }

        res.sendFile(imageName.image, options, function (err) {
            if (err) {
                console.log(err)
            } else {
                // console.log('Sent:', imageName.image)
            }
        })    
    }
})

module.exports = router;