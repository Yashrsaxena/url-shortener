const express = require("express");
const {
    handleCreateNewShortURL,
    handleGetAllURLs,
    handleGetURLById,
    handleUpdateNameById,
    handleDeleteURLById,
    handleGetAnalyticsById,
} = require("../controllers/url.controller");

const router = express.Router();

router.post("/", handleCreateNewShortURL);

router.get("/", handleGetAllURLs);

router
    .route("/:id")
    .get(handleGetURLById)
    .patch(handleUpdateNameById)
    .delete(handleDeleteURLById);

router.route("/analytics/:id").get(handleGetAnalyticsById);

module.exports = router;
