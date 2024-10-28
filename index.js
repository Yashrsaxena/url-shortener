// IMPORTS
const express = require("express");
const { PORT, connectionStringToDatabase } = require("./utils/contants");
const connectToDB = require("./utils/db_connection");
const router = require("./routes/url.router");

const app = express();

// MIDDLEWARES
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// CONNECTION TO DATABASE
connectToDB(connectionStringToDatabase);

app.use("/", router);

// PORT SETTING
app.listen(PORT, () => console.log(`Server Started at:  ${PORT}`));
