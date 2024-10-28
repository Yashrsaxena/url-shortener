const Url = require("../models/url.models");
const ShortUniqueId = require("short-unique-id");

const { randomUUID } = new ShortUniqueId({ length: 10 });

// CREATE
const handleCreateNewShortURL = async (req, res) => {
  const body = req.body;
  if (body.id) {
    let url = await Url.findOne({ shortId: body.id });
    if (!url) {
      url = new Url({
        shortId: body.id,
        redirectUrl: body.url,
        name: body.name,
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
      name: body.name,
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

const handleGetAnalyticsById = (req, res) => {};

// UPDATE
const handleUpdateNameById = (req, res) => {};

// DELETE
const handleDeleteURLById = (req, res) => {};

module.exports = {
  handleCreateNewShortURL,
  handleGetAllURLs,
  handleGetURLById,
  handleGetAnalyticsById,
  handleUpdateNameById,
  handleDeleteURLById,
};
