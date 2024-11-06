const express = require("express");
const { handleGetAllURLs } = require("../controllers/url.controller");
const Url = require("../models/url.models");
const router = express.Router();

router.get("/", async (req, res) => {
    const allUrls = await Url.find({});
    res.render("index", { PORT: process.env.PORT, urls: allUrls, async: true });
});

module.exports = router;
