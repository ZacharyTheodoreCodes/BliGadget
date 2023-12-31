if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const { errHandler } = require("./middlewares/errorHandler");
const router = require("./routes");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(router);
app.use(errHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
