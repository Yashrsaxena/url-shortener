const Url = require("../models/url.models");
const ShortUniqueId = require("short-unique-id");

const { randomUUID } = new ShortUniqueId({ length: 10 });

// CREATE
const handleCreateNewShortURL = async (req, res) => {
    const body = req.body;
    let name = req.body.name;
    if (!body.url || body.url == null) {
        return res.status(400).json({ message: `Give a URL to shorten` });
    }
    if (body.id) {
        let url = await Url.findOne({ shortId: body.id });
        if (!url) {
            url = new Url({
                shortId: body.id,
                redirectUrl: body.url,
                name: body.name || body.id,
            });
            url.save();
            handleGetAllURLs(req, res);
        } else {
            return res.json({
                Error_message: `Short Url unavailable, please select a unique one.`,
            });
        }
    } else {
        const id = randomUUID();
        const url = new Url({
            shortId: id,
            redirectUrl: body.url,
            name: body.name || id,
        });
        url.save();
        handleGetAllURLs(req, res);
    }
};

// READ
const handleGetAllURLs = async (req, res) => {
    const urls = await Url.find({});
    if (!urls) return res.status(404).json({ Error_message: `No url found` });
    else {
        return res
            .status(200)
            .render("index", { urls: urls, PORT: process.env.PORT });
    }
};

// const handleGetURLById = async (req, res) => {
//     const url = await Url.findOneAndUpdate(
//         { shortId: req.params.id },
//         { $push: { visitHistory: { clickTime: Date.now() } } },
//         { new: true }
//     );
//     if (!url)
//         return res
//             .status(404)
//             .json({ Error_message: `No url found with id: ${req.params.id}` });
//     else {
//         handleGetAllURLs(req, res);
//         return res.status(200).redirect(url.redirectUrl);
//     }
// };

const handleGetAnalyticsById = async (req, res) => {
    const url = await Url.findOne({ shortId: req.params.id });
    if (!url)
        return res
            .status(404)
            .json({ Error_message: `No url found with id: ${url.shortId}` });
    else {
        return res.status(200).json({
            name: url.name,
            totalClicks: url.visitHistory.length,
            clicks: url.visitHistory,
        });
    }
};

// UPDATE
const handleUpdateNameById = async (req, res) => {
    if (!req.body.name || req.body.name == null)
        return res
            .status(400)
            .json({ Error_message: `Please give a name to update the record` });
    else {
        const url = await Url.findOneAndUpdate(
            { shortId: req.params.id },
            { name: req.body.name },
            { new: true }
        );
        res.status(200).json({ message: `Name UPDATED to ${url.name}` });
    }
};

// DELETE
const handleDeleteURLById = async (req, res) => {
    try {
        const url = await Url.findOne({ shortId: req.params.id });
        if (!url)
            res.status(404).json({
                Error_message: `No URL found by id: ${req.params.id}`,
            });
        else {
            await url.deleteOne();
            handleGetAllURLs(req, res);
        }
    } catch (error) {
        console.error("Error deleting URL:", error);
        return res.status(500).json({
            Error_message: "An error occurred while deleting the URL",
        });
    }
};

//Helping Functions
const updateVisitHistory = async (req, res, next) => {
    try {
        const { id } = req.params;
        const url = await Url.findOneAndUpdate(
            { shortId: id },
            { $push: { visitHistory: { clickTime: Date.now() } } },
            { new: true }
        );
        if (!url) {
            return res
                .status(404)
                .json({ Error_message: `No url found with id: ${id}` });
        }
        req.urlData = url;
        next();
    } catch (error) {
        return res.status(500).json({ error: "Error updating visit history" });
    }
};

const handleRedirectToUrl = (req, res) => {
    const { redirectUrl } = req.urlData; // URL data from middleware
    res.redirect(redirectUrl);
};

module.exports = {
    handleCreateNewShortURL,
    handleGetAllURLs,
    handleGetAnalyticsById,
    handleUpdateNameById,
    handleDeleteURLById,
    updateVisitHistory,
    handleRedirectToUrl,
};
