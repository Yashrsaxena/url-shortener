const express = require("express");
const { handleGetAllURLs } = require("../controllers/url.controller");
const router = express.Router();

router.get("/test", handleGetAllURLs);

module.exports = router;
