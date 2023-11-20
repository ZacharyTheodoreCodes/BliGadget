const router = require("express").Router();
const adminRouter = require("./admin");
const customerRouter = require("./customer");

router.get("/", (req, res) => {
  res.send("Hello World!");
});

router.use("/admin", adminRouter);
router.use("/cust", customerRouter);

module.exports = router;
