// server.js
const cors = require('cors');
const costPaymentRoute = require('./route/CostPaymentRoute');
const express = require("express");
const mongoose = require('mongoose');
const app = express();

const uri = "mongodb+srv://Loichi:mdp123@cluster0.srdtv22.mongodb.net/?retryWrites=true&w=majority";

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

async function connect() {
  try {
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

connect();

const server = app.listen(3030, () => {
  console.log("Server started on port 3030");
});

app.use('/costs-payments', costPaymentRoute);

module.exports = server; 