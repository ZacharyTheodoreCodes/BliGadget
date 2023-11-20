"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Review.belongsTo(models.Gadget);
      Review.belongsTo(models.Customer);
      Review.belongsTo(models.Transaction);
    }
  }
  Review.init(
    {
      CustomerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Customer is required",
          },
          notEmpty: {
            msg: "Customer is required",
          },
        },
      },
      GadgetId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Gadget is required",
          },
          notEmpty: {
            msg: "Gadget is required",
          },
        },
      },
      comment: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Review comment is required",
          },
          notEmpty: {
            msg: "Review comment is required",
          },
        },
      },
      TransactionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Review",
    }
  );
  return Review;
};
