const mongoose = require("mongoose");

function connectToDB(url) {
  mongoose
    .connect(url)
    .then(() => {
      console.log("Database connected");
    })
    .catch((error) => {
      console.error("db error", error);
      process.exit(1);
    });
}

module.exports = connectToDB;
