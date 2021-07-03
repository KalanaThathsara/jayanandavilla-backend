const express = require("express");
const Joi = require("joi");
const router = express.Router();

const { Gallery } = require("../modules/galleryModule");
const { DayoutGallery } = require("../modules/dayoutGalleryModule");

router.get("/", async function (req, res) {
  const images = await Gallery.find({});

  res.status(200).send(images);
});

router.get("/dayouts", async function (req, res) {
  console.log("re qcme");
  const images = await DayoutGallery.find({});

  res.status(200).send(images);
});

module.exports = router;
