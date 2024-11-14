const express = require("express");
const {
    handleCreateNewShortURL,
    handleGetAllURLs,
    handleUpdateNameById,
    handleDeleteURLById,
    handleGetAnalyticsById,
    updateVisitHistory,
    handleRedirectToUrl,
} = require("../controllers/url.controller");

const router = express.Router();

router.post("/", handleCreateNewShortURL);

router.get("/", handleGetAllURLs);

router
    .route("/:id")
    .get(updateVisitHistory, handleRedirectToUrl)
    .patch(handleUpdateNameById)
    .delete(handleDeleteURLById);

router.route("/analytics/:id").get(handleGetAnalyticsById);

module.exports = router;
