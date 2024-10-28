const Url = require("../models/url.models");
const ShortUniqueId = require("short-unique-id");

const { randomUUID } = new ShortUniqueId({ length: 10 });

// CREATE
const handleCreateNewShortURL = async (req, res) => {
  const body = req.body;
  let name = req.body.name;
  if (!body.redirectUrl || body.redirectUrl == null) {
    return res.status(400).json({ message: `Give a URL to shorten` });
  }
  if (body.id) {
    let url = await Url.findOne({ shortId: body.id });
    if (!url) {
      url = new Url({
        shortId: body.id,
        redirectUrl: body.url,
        name: body.name || short.id,
      });
      url.save();
      return res.json({
        Error_message: `Short Url unavailable, please select a unique one.`,
      });
    } else {
      return res.status(201).json({
        message: `Your short-id is ${url.shortId}`,
      });
    }
  } else {
    const id = randomUUID();
    const url = new Url({
      shortId: id,
      redirectUrl: body.url,
      name: body.name || short.id,
    });
    url.save();
    return res.status(201).json({
      message: `Your short-id is ${url.shortId}`,
    });
  }
};

// READ
const handleGetAllURLs = async (req, res) => {
  const urls = await Url.find({});
  if (!urls) return res.status(404).json({ Error_message: `No url found` });
  else {
    return res.status(200).json({ message: urls });
  }
};

const handleGetURLById = async (req, res) => {
  const url = await Url.findOneAndUpdate(
    { shortId: req.params.id },
    { $push: { visitHistory: { clickTime: Date.now() } } },
    { new: true }
  );
  if (!url)
    return res
      .status(404)
      .json({ Error_message: `No url found with id: ${url.shortId}` });
  else {
    return res.status(200).redirect(url.redirectUrl);
  }
};

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
      res
        .status(404)
        .json({ Error_message: `No URL found by id: ${req.params.id}` });
    else {
      await url.deleteOne();

      return res.status(200).json({ message: "URL deleted successfully" });
    }
  } catch (error) {
    console.error("Error deleting URL:", error);
    return res
      .status(500)
      .json({ Error_message: "An error occurred while deleting the URL" });
  }
};

module.exports = {
  handleCreateNewShortURL,
  handleGetAllURLs,
  handleGetURLById,
  handleGetAnalyticsById,
  handleUpdateNameById,
  handleDeleteURLById,
};
