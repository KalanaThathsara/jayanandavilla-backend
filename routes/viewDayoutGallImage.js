var express = require("express");
const router = express.Router();
const path = require("path");

const { DayoutGallery } = require("../modules/dayoutGalleryModule");

router.get("/:name", async function (req, res, next) {
  console.log(req.params.name);

  if (req.params.name) {
    const imageName = await DayoutGallery.findOne(
      { name: req.params.name },
      { image: 1 }
    );

    // console.log(typeof imageName.image)

    var options = {
      root: path.join(appRoot + "/dayoutGallery"),
      dotfiles: "deny",
      headers: {
        "x-timestamp": Date.now(),
        "x-sent": true,
      },
    };

    res.sendFile(imageName.image, options, function (err) {
      if (err) {
        console.log(err);
      } else {
        // console.log('Sent:', imageName.image)
      }
    });
  }
});

module.exports = router;
