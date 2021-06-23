var express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

const {Gallery} = require('../modules/galleryModule')

router.get('/:name', async function (req, res, next) {

    //requiring path and fs modules
    let fileName = req.params.name
    //joining path of directory 
    const directoryPath = path.join(__dirname, '../packagesPDFs');
    //passsing directoryPath and callback function
    fs.readdir(directoryPath, function (err, files) {
        //handling error
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        } 
        //listing all files using forEach
        files.forEach(function (file) {
            // Do whatever you want to do with the file
            if(file.split('.')[0] == fileName) {
                console.log(file); 
                res.status(200).send("D:\\Projects\\jayanandavilla-backend\\packagesPDFs"+ "\\" + file)
            }
           
        });
    });
    })

module.exports = router;


