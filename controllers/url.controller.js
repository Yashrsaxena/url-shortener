const Url = require("../models/url.models");
const ShortUniqueId = require("short-unique-id");

const { randomUUID } = new ShortUniqueId({ length: 10 });

// CREATE
const handleCreateNewShortURL = async (req, res) => {
  
};

// READ
const handleGetAllURLs = async (req, res) => {
  
};

const handleGetURLById = async (req, res) => {
  
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
