const { Gadget, Store } = require("../models");

class adminController {
  static async addGadget(req, res, next) {
    try {
      const { name, imgUrl, price, description, specification, type } =
        req.body;
      const newGadget = await Gadget.create({
        name,
        imgUrl,
        price,
        description,
        specification,
        type,
      });
      res.status(201).json(newGadget);
    } catch (error) {
      next(error);
    }
  }

  static async addStore(req, res, next) {
    try {
      const { name, address, city, phoneNumber, latitude, longitude } =
        req.body;
      const newStore = await Store.create({
        name,
        address,
        city,
        phoneNumber,
        latitude,
        longitude,
      });
      res.status(201).json(newStore);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = adminController;
