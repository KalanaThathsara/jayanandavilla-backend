const express = require("express");
// const Joi = require('joi');
var multer = require("multer");
const router = express.Router();

const { Gallery } = require("../modules/galleryModule");

var fileToDB = "";
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `galleryImages`);
  },

  filename: function (req, file, cb) {
    const fileType = file.originalname.split(".")[1];
    fileToDB = req.headers.nameofimage + "." + fileType;

    cb(null, req.headers.nameofimage + "." + fileType);
  },
});

var upload = multer({ storage: storage }).single("file");

router.post("/add", function (req, res) {
  // console.log('Image Request Received')
  // //console.log(req.body)
  console.log("Name of Image", req.headers.nameofimage);
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      console.log(err);
      return res.status(500).json(err);
    } else if (err) {
      console.log(err);
      return res.status(500).json(err);
    }

    addImage(req, res);
  });
});

async function addImage(req, res) {
  let galleryImage = new Gallery({
    name: req.headers.nameofimage,
    image: fileToDB,
  });

  await galleryImage.save();

  res.status(200).send("Image Successfully Saved");
}

module.exports = router;
