const express = require("express");
// const Joi = require('joi');
var multer = require("multer");
const router = express.Router();
const authCustomer = require("../middleware/authMiddleware");

const { Dayout } = require("../modules/dayoutModule");

router.post("/", async (req, res) => {
  // //console.log(req.body)
  // res.send('Received')

  // const {error} = validateCustomer(req.body);
  // if(error) return res.status(400).send(error.details[0].message);
  //console.log(req.body);

  // let roomAvailable = await Room.findOne({ roomNo: req.body.roomNo });

  // if (!roomAvailable) {

  let dayout = new Dayout({
    packageNo: req.body.packageNo,
    packageName: req.body.packageName,
    services: req.body.services,
    menu: req.body.menu,
    image1: "",
    image2: "",
    image3: "",
    aprice: req.body.aprice,
    cprice: req.body.cprice,
    discount: req.body.discount,
  });

  await dayout.save();
  res.status(200).send("Dayout Package Successfully Saved");

  return;
});

var fileToDB = "";
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `dayoutImages`);
  },

  filename: function (req, file, cb) {
    const fileType = file.originalname.split(".")[1];
    fileToDB = req.headers.nameofimage + "." + fileType;

    cb(null, req.headers.nameofimage + "." + fileType);
  },
});

var upload = multer({ storage: storage }).single("file");

router.post("/image1", function (req, res) {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      console.log(err);
      return res.status(500).json(err);
    } else if (err) {
      console.log(err);
      return res.status(500).json(err);
    }
    addImage1(req, res);
  });
});

async function addImage1(req, res) {
  console.log("img 1", req.headers.nameofimage);
  const result = await Dayout.updateOne(
    { packageNo: req.headers.nameofimage.slice(0, -1) },
    {
      $set: {
        image1: fileToDB,
      },
    }
  );
  //   console.log("Found product for image", result);
  res.status(200).send("Image 1 Successfully Saved");
}

router.post("/image2", function (req, res) {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      console.log(err);
      return res.status(500).json(err);
    } else if (err) {
      console.log(err);
      return res.status(500).json(err);
    }
    addImage2(req, res);
  });
});

async function addImage2(req, res) {
  console.log("img 2", req.headers.nameofimage);
  const result = await Dayout.updateOne(
    { packageNo: req.headers.nameofimage.slice(0, -1) },
    {
      $set: {
        image2: fileToDB,
      },
    }
  );
  //   console.log("Found product for image", result);
  res.status(200).send("Image 2 Successfully Saved");
}

router.post("/image3", function (req, res) {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      console.log(err);
      return res.status(500).json(err);
    } else if (err) {
      console.log(err);
      return res.status(500).json(err);
    }
    addImage3(req, res);
  });
});

async function addImage3(req, res) {
  console.log("img 3", req.headers.nameofimage);
  const result = await Dayout.updateOne(
    { packageNo: req.headers.nameofimage.slice(0, -1) },
    {
      $set: {
        image3: fileToDB,
      },
    }
  );
  //   console.log("Found product for image", result);
  res.status(200).send("Image 3 Successfully Saved");
}

module.exports = router;
