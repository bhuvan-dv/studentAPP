const express = require("express");
const app = express();
const { engine } = require("express-handlebars");
const mongoose = require("mongoose");
const path = require("path");
// const ContactModel = require("ContactModel");
import ContactModel from "./Model/Contact";
const nodemailer = require("nodemailer");
//set template engine
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");
//set database connection
let mongodbURl = "mongodb://localhost:27017/students";
mongoose.connect(mongodbURl, err => {
  if (err) throw err;
  console.log("database connected");
});
//connection ends here
/*serve static files to or middleware block */
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true })); //for catching post data
//end of middleware block
/*================all post starts here=============*/
app.post("/contact", async (req, res) => {
  //save incoming request inot mongo database
  let payload = await req.body;
  //node mailer block
  // nodemailer
  //   .createTransport({
  //     service: "gmail",
  //     auth: {
  //       user: "hypertasker98@gmail.com",
  //       pass: ",.",
  //     },
  //   })
  //   .sendMail({
  //     from: "hypertasker98@gmail.com",
  //     to: [req.body.email, "priyanka.km@testyantra.com"],
  //     subject: "Bhuvan Contact form",
  //     html: `<h1>${req.body.firstname}${req.body.lastname}</h1>
  //   <p>Email:${req.body.email}</p>
  //   <p>Phno:${req.body.phno}</p>
  //   <p>Comments:${req.body.description}</p>
  //   `,
  //   });
  //end of node mailer
  let data = await ContactModel.create(payload);
  res.send({ data, text: "successfully created " });
});
/*================all post ends here=============*/
//basic route
//fetching from database
app.get("/all-students", async (req, res) => {
  let dev = await ContactModel.find({}).lean();
  console.log(dev);
  res.render("all-students", { dev });
});
//end of fetching from database
app.get("/", (req, res) => {
  res.render("home", { title: "student app" });
});
app.get("/contact", (req, res) => {
  res.render("contact", { title: "submit name" });
});
app.get("/create-students", (req, res) => {
  res.render("create-students", {
    title: "create-students",
  });
});
//listen port
app.listen(5000, err => {
  if (err) throw err;
  console.log("server is online");
});
