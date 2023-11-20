const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secret_key = process.env.SECRET_KEY;

function hashPassword(password) {
  return bcrypt.hashSync(password, 8);
}

function comparePassword(password, hashedPassword) {
  return bcrypt.compareSync(password, hashedPassword);
}

function signToken(payload) {
  return jwt.sign(payload, secret_key);
}

function verifyToken(token) {
  return jwt.verify(token, secret_key);
}

module.exports = { hashPassword, comparePassword, signToken, verifyToken };
