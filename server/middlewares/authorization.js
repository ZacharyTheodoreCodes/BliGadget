const { Transaction, Gadget } = require("../models");

const transactionAuthorization = async (req, res, next) => {
  try {
    const transactionId = req.params.transactionId;
    const transaction = await Transaction.findOne({
      where: {
        id: transactionId,
      },
    });
    if (!transaction) {
      throw "notFound";
    }
    if (transaction.CustomerId !== req.customer.id) {
      throw "forbidden";
    }
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { transactionAuthorization };
