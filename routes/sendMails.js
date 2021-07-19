const nodemailer = require("nodemailer");
const env = require("../envVariables");
const nodemailMailGun = require("nodemailer-mailgun-transport");
// const roomInvoiceHTML = require("../invoice/roomInvoiceHtml");

// let transporter = nodemailer.createTransport(nodemailMailGun(env.emailAuth));
// let mailContent = {
//   from: "thedini99.mit@gmail.com",
//   to: "",
//   subject: "",
//   text: "",
//   // html: roomInvoiceHTML(sale, customer, cart, subtotal),
// };

function sendRoomBooked(room, customer, newBooking) {
  console.log("Room In", room);
  console.log("Customer  In", customer);
  console.log("Booking  In", newBooking);
  // mailContent.to = customer.email;
  // mailContent.subject = "Room Reservation Confirmed ";
  // mailContent.text = `
  //   Dear ${customer.username},

  //       You have successfully reserved the room ${room.roomName} in Jayananda State Villas

  //       Customer : ${customer.username}              Email : ${customer.email}

  //       Room No : ${room.roomNo}
  //       Room Name : ${room.roomName}
  //       Size : ${room.size}
  //       Description : ${}

  // `;

  //   transporter.sendMail(mailContent, function (error, data) {
  //     if (error) {
  //       console.log(`Unable to send mail to ${email}`, error);
  //     } else {
  //       console.log(`Room email send successfully to ${email}`);
  //     }
  //   });
}

module.exports = {
  sendRoomBooked,
};
