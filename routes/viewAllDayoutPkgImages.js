var express = require("express");
const router = express.Router();
const path = require("path");

const { Dayout } = require("../modules/dayoutModule");

router.get("/:id", async function (req, res, next) {
  console.log(req.params.id);
  let id = req.params.id.split(".")[0];
  let image = `image${req.params.id.split(".")[1]}`;

  if (req.params.id) {
    const imageName = await Dayout.findOne({ _id: id }, { [image]: 1 });

    // console.log(typeof imageName.image)

    var options = {
      root: path.join(appRoot + "/dayoutImages"),
      dotfiles: "deny",
      headers: {
        "x-timestamp": Date.now(),
        "x-sent": true,
      },
    };

    res.sendFile(imageName[image], options, function (err) {
      if (err) {
        console.log(err);
      } else {
        // console.log('Sent:', imageName.image)
      }
    });
  }
});

module.exports = router;
