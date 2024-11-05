// IMPORTS
const express = require("express");
const path = require("path");
const { PORT, connectionStringToDatabase } = require("./utils/contants");
const connectToDB = require("./utils/db_connection");
const urlRouter = require("./routes/url.route");
const staticRouter = require("./routes/static.route");

const app = express();
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// MIDDLEWARES
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// CONNECTION TO DATABASE
connectToDB(connectionStringToDatabase);

app.use("/url", urlRouter);
app.use("/", staticRouter);

// PORT SETTING
app.listen(PORT, () => console.log(`Server Started at:  ${PORT}`));
