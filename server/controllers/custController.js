const { Customer, Gadget, Store, Transaction, Review } = require("../models");

const {
  hashPassword,
  comparePassword,
  signToken,
  verifyToken,
} = require("../helpers/auth");

const { Op } = require("sequelize");
const axios = require("axios");
const { transporter, email } = require("../helpers/nodemailer");

class customerController {
  static async register(req, res, next) {
    try {
      const { name, email, password, phoneNumber } = req.body;
      const newCustomer = await Customer.create({
        name,
        email,
        password,
        phoneNumber,
      });
      res.status(201).json({
        id: newCustomer.id,
        email: newCustomer.email,
      });
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        throw { name: "InvalidInput" };
      }

      const customer = await Customer.findOne({ where: { email } });
      if (!customer) {
        throw { name: "InvalidEmail/Password" };
      }

      const isPasswordValid = comparePassword(password, customer.password);
      if (!isPasswordValid) {
        throw { name: "InvalidEmail/Password" };
      }

      const access_token = signToken({ id: customer.id });
      res.status(200).json({
        access_token,
        id: customer.id,
        email: customer.email,
      });
    } catch (err) {
      next(err);
    }
  }

  static async getAllGadgets(req, res, next) {
    try {
      const { name } = req.query;

      let option = {};
      if (name) {
        option = { name: { [Op.iLike]: `%${name}%` } };
      }

      const gadgets = await Gadget.findAll({
        order: [["id", "ASC"]],
        where: option,
      });
      res.status(200).json(gadgets);
    } catch (error) {
      next(error);
    }
  }

  static async getAllStores(req, res, next) {
    try {
      const stores = await Store.findAll({
        order: [["id", "ASC"]],
      });
      res.status(200).json(stores);
    } catch (error) {
      next(error);
    }
  }

  static async getGadgetDetail(req, res, next) {
    try {
      const gadgetId = req.params.gadgetId;
      const gadget = await Gadget.findOne({
        where: {
          id: gadgetId,
        },
        include: {
          model: Review,
          include: [
            {
              model: Customer,
              attributes: ["name"],
            },
          ],
        },
        order: [["id", "ASC"]],
      });
      if (!gadget) {
        throw "NotFound";
      }
      res.status(200).json(gadget);
    } catch (error) {
      next(error);
    }
  }

  static async getCustomerDetail(req, res, next) {
    try {
      res.status(200).json(req.customer);
    } catch (error) {
      next(error);
    }
  }

  static async getTransactionsByCustomer(req, res, next) {
    try {
      const status = req.params.status;
      let options = {
        order: [["createdAt", "ASC"]],
        where: {
          CustomerId: req.customer.id,
        },
        include: [
          Gadget,
          Review,
          {
            model: Customer,
            attributes: ["name"],
          },
        ],
      };
      if (status === "Paid") {
        options.where = {
          ...options.where,
          status,
        };
      }
      const transactions = await Transaction.findAll(options);
      res.status(200).json(transactions);
    } catch (error) {
      next(error);
    }
  }

  static async createOrder(req, res, next) {
    try {
      const gadgetId = req.params.gadgetId;
      const gadget = await Gadget.findByPk(gadgetId);
      if (!gadget) {
        throw "NotFound";
      }
      const transaction = await Transaction.create({
        CustomerId: req.customer.id,
        GadgetId: gadgetId,
        status: "Pending",
      });
      res.status(200).json(transaction);
    } catch (error) {
      next(error);
    }
  }

  static async createReview(req, res, next) {
    try {
      const transactionId = req.params.transactionId;
      const { comment } = req.body;
      const transaction = await Transaction.findByPk(transactionId);
      const review = await Review.create({
        CustomerId: transaction.CustomerId,
        GadgetId: transaction.GadgetId,
        comment,
        TransactionId: transaction.id,
      });
      res.status(201).json(review);
    } catch (error) {
      next(error);
    }
  }

  static async updateOrderStatus(req, res, next) {
    try {
      const transactionId = req.params.transactionId;
      const { status } = req.body;
      await Transaction.update(
        {
          status,
        },
        {
          where: {
            id: transactionId,
          },
        }
      );
      res.status(200).json({ message: "Update status successful" });
      if (status === "Paid") {
        const transaction = await Transaction.findOne({
          where: {
            id: transactionId,
          },
          include: [Gadget],
        });
        transporter.sendMail(
          {
            ...email,
            text: `Payment success for transaction #${transactionId}

Item: ${transaction.Gadget.name}
Total: ${+transaction.Gadget.price}
Payment Time: ${new Date(transaction.updatedAt).toLocaleString("en-GB", {
              timeZone: "UTC",
            })}

Thank you for shopping with bliGadget,

BliGadget
            `,
            to: req.customer.email,
          },
          function (err, info) {
            if (err) {
              return console.log(err);
            }
            console.log("Sent", info.response);
          }
        );
      }
    } catch (error) {
      next(error);
    }
  }
  static async getPaymentData(req, res, next) {
    const customer = req.body;
    const price = req.headers.price;
    axios({
      url: "https://app.sandbox.midtrans.com/snap/v1/transactions",
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization:
          "Basic " +
          Buffer.from(process.env.SERVERID_MIDTRANS).toString("base64"),
      },
      data: {
        transaction_details: {
          order_id: "order-bligadget-" + new Date().getTime(),
          gross_amount: +price,
        },
        credit_card: {
          secure: true,
        },
        customer_details: customer,
      },
    })
      .then((snapResponse) => {
        let snapToken = snapResponse.data.token;
        res.status(200).json({ snapToken });
      })
      .catch((err) => {
        next(err);
      });
  }
}

module.exports = customerController;
