const jwt = require('jsonwebtoken');
const JWT_SECRET_KEY = "HJABDHABDSASBDK"

const createToken = (payload) => {
   return jwt.sign(payload, JWT_SECRET_KEY);
} 

const decoded = (token) => {
   return jwt.verify(token, JWT_SECRET_KEY);
} 

module.exports = {
    createToken, decoded
}