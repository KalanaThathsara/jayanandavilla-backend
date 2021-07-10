var express = require("express");
const router = express.Router();
const path = require("path");

const { Dayout } = require("../modules/dayoutModule");

router.get("/:id", async function (req, res, next) {
  console.log(req.params.id);

  if (req.params.id) {
    const imageName = await Dayout.findOne(
      { _id: req.params.id },
      { image1: 1 }
    );

    // console.log(typeof imageName.image)

    var options = {
      root: path.join(appRoot + "/dayoutImages"),
      dotfiles: "deny",
      headers: {
        "x-timestamp": Date.now(),
        "x-sent": true,
      },
    };

    res.sendFile(imageName.image1, options, function (err) {
      if (err) {
        console.log(err);
      } else {
        // console.log('Sent:', imageName.image)
      }
    });
  }
});

module.exports = router;
