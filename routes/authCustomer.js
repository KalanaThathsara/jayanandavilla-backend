const express = require("express");
const Joi = require("joi");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const env = require("../envVariables");

const { Customer } = require("../modules/customerModule");

router.post("/", async (req, res) => {
  // //console.log(req.body)
  // res.send('Received')

  // const {error} = validateCustomer(req.body);
  // if(error) return res.status(400).send(error.details[0].message);

  let customer = await Customer.findOne({ email: req.body.email });
  if (!customer) return res.status(400).send("Invalid email or password.");

  const validPassword = await bcrypt.compare(
    req.body.password,
    customer.password
  );
  if (!validPassword) res.status(400).send("Invalid Password.");

  const token = jwt.sign(
    { _id: customer._id, type: customer.type, name: customer.username },
    env.jewtKey
  );
  res.status(200).header("x-auth-token", token).json({
    jwt: token,
    msg: "Successfully Logged In.",
  });
  return;
});

module.exports = router;
