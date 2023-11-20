const errHandler = (err, req, res, next) => {
  console.log(err);
  switch (err.name) {
    case "SequelizeUniqueConstraintError":
    case "SequelizeValidationError":
      res.status(400).json({ message: err.errors[0].message });
      break;
    case "InvalidInput":
      res.status(400).json({ message: "Email and password is required" });
      break;
    case "InvalidEmail/Password":
      res.status(401).json({ message: "Invalid email or password" });
      break;
    case "NotFound":
      res.status(404).json({ message: `Error not found` });
      break;
    case "JsonWebTokenError":
    case "InvalidToken":
      res.status(401).json({ message: "Invalid Token" });
      break;
    case "Forbidden":
      res.status(403).json({ message: "Forbidden" });
      break;
    case "MidtransError":
      res.status(400).json({ message: err.ApiResponse.error_messages[0] });
      break;
    default:
      console.log(err.name);
      res.status(500).json({ message: `Internal Server Error` });
      break;
  }
};

module.exports = { errHandler };
