const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

const registerCustomer = require("./routes/registerCustomer");
const authCustomer = require("./routes/authCustomer");
const addRoom = require("./routes/addRoom");
const getRooms = require("./routes/getRooms");
const viewImage = require("./routes/viewRoomImage");
const addGallery = require("./routes/addGallery");
const viewGalleryImage = require("./routes/viewGalleryImage");
const getGallery = require("./routes/getGallery");
const bookRooms = require("./routes/bookRoom");
const getBookings = require("./routes/getBookings");
const addPackage = require("./routes/addPackage");
const viewPDF = require("./routes/viewPDF");
const viewCustomer = require("./routes/getCustomers");
const addDayout = require("./routes/addDayout");
const dayoutGallery = require("./routes/addDayoutGallery");
const viewDayoutGalleryImage = require("./routes/viewDayoutGallImage");

const env = require("./envVariables");
global.appRoot = path.resolve(__dirname);

mongoose
  .connect(env.mongoDB)
  .then(() => {
    console.log("Connected to mongoDB");
  })
  .catch((err) => {
    console.log("Could not Connect to mongoDB", err);
  });

app.use(cors());
app.use(express.json());
app.use("/api/user/register", registerCustomer);
app.use("/api/user/auth", authCustomer);
app.use("/api/user/rooms", getRooms);
app.use("/api/user/room/image", viewImage);
app.use("/api/user/room/book", bookRooms);
app.use("/api/user/view-pdf", viewPDF);

app.use("/api/admin/addroom", addRoom);
app.use("/api/admin/gallery", addGallery);
app.use("/api/admin/get-gallery", getGallery);
app.use("/api/admin/gallery/view", viewGalleryImage);
app.use("/api/admin/view-bookings", getBookings);
app.use("/api/admin/addpackage", addPackage);
app.use("/api/admin/view-customers", viewCustomer);
app.use("/api/admin/add-dayout", addDayout);
app.use("/api/admin/dayout-gallery", dayoutGallery);
app.use("/api/admin/dayout-gallery/view", viewDayoutGalleryImage);

const port = process.env.PORT || 3002;
app.listen(port, () => console.log(`Listening on port ${port} ...`));
