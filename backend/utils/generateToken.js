const jwt = require("jsonwebtoken");

// ⚠️ Token bina expiry ke generate ho raha hai (manually logout hoga)
const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET);
};

module.exports = generateToken;
