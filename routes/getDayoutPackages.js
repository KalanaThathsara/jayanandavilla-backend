const express = require("express");
const Joi = require("joi");
const router = express.Router();

const { Dayout } = require("../modules/dayoutModule");

router.get("/", async function (req, res) {
  const packages = await Dayout.find({});

  res.status(200).send(packages);
});

router.get("/:id", async function (req, res) {
  // console.log('Req came', req.params.id)
  const package = await Dayout.findById(req.params.id);
  // console.log(room)
  res.status(200).send(package);
});

module.exports = router;
