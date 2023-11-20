const customerController = require("../controllers/custController");
const { authentication } = require("../middlewares/authentication");
const { transactionAuthorization } = require("../middlewares/authorization");
const router = require("express").Router();

router.post("/register", customerController.register);
router.post("/login", customerController.login);

router.get("/gadgets", customerController.getAllGadgets);
router.get("/stores", customerController.getAllStores);
router.get("/gadgets/:gadgetId", customerController.getGadgetDetail);

router.use(authentication);
router.get("/customers", customerController.getCustomerDetail);

router.get(
  "/transactions/:status",
  customerController.getTransactionsByCustomer
);
router.post("/transactions/:gadgetId", customerController.createOrder);
router.post(
  "/reviews/:transactionId",
  transactionAuthorization,
  customerController.createReview
);
router.patch(
  "/transactions/:transactionId",
  transactionAuthorization,
  customerController.updateOrderStatus
);

router.post("/payments", customerController.getPaymentData);

module.exports = router;
