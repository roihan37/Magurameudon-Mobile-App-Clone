// import { decoded } from "../helper/jwt"
const { decoded } = require('../helper/jwt')
const { User } = require('../models/index')

const authentication = async (req, res, next) => {
    try {
        let { access_token } = req.headers
        // console.log(access_token);
        if(!access_token){
            throw { name : 'Unauthorized'}
        }
        const token =  decoded(access_token)
        const user = await User.findByPk(token.id)
        // console.log(token);
        if(!user){
            throw { name : 'Unauthorized'}
        }

        req.userLogin = {
            id : user.id
        }

        next()
    } catch (error) {
        if(error.name === "Unauthorized" || error.name === "JsonWebTokenError"){
            res.status(401).json({message : 'Invalid Token'})
        }else{
            res.status(500).json({message : "Internal Server Error"})
        }
    }
}
module.exports = { authentication}