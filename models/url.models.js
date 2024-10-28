const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema(
  {
    shortId: { type: String, require: true, unique: true },
    name: { type: String, require: true },
    redirectUrl: { type: String, require: true },
    visitHistory: [
      {
        clickTime: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
);

const Url = mongoose.model("url", urlSchema);

module.exports = Url;
