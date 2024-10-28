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
const handleGetAllURLs = async (req, res) => {};

const handleGetURLById = async (req, res) => {};

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
