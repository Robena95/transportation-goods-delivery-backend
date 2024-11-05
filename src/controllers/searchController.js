const { searchTransporters } = require("../services/searchService");

const searchHandler = async (req, res, next) => {
  try {
    const criteria = req.query; // Get search criteria from query parameters
    const transporters = await searchTransporters(criteria);
    return res.status(200).json(transporters);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  searchHandler,
};
