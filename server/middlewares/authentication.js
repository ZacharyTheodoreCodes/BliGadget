const { verifyToken } = require("../helpers/auth");
const { Customer } = require("../models");

const authentication = async (req, res, next) => {
  try {
    const { access_token } = req.headers;
    if (!access_token) throw { name: "InvalidToken" };

    const verified = verifyToken(access_token);

    const customer = await Customer.findByPk(verified.id);
    if (!customer) throw { name: "InvalidToken" };

    req.customer = customer;

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { authentication };
