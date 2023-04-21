const { User } = require('../models/index')
const { compare } = require('../helper/bcrypt')
const { createToken } = require('../helper/jwt')
class Controller{
    static async registerUser(req, res){
        try {
            const user = await User.create({
                username : req.body.username,
                email : req.body.email,
                role : 'admin',
                password : req.body.password,
                phoneNumber : req.body.phoneNumber,
                address : req.body.address
            })

            res.status(201).json({id : user.id, username : user.username })

        } catch (error) {
            if(error.name === "SequelizeUniqueConstraintError" || error.name === "SequelizeValidationError"){
                res.status(400).json({message : error.errors[0].message})
            }else{
                res.status(500).json({message : "Internal Server Error"})
            }
        }
    }

    static async loginUser(req, res){
        try {
            const { email, password } = req.body
            if(!email || !password){
                throw {name : "badRequest" }
            }

            const user = await User.findOne({where : { email }})
            // console.log(user);

            if(!user){
                throw { name : "Unauthorized"}
            }

            const comparePassword = compare(password, user.password)
            // console.log(comparePassword);
            if(!comparePassword){
                throw { name : "Unauthorized"}
            }

            const token = createToken({
                id : user.id
            })
           
            res.status(200).json({access_token : token})
        } catch (error) {
            if(error.name === "badRequest"){
                res.status(400).json({message : "Email / Password is required"})
            }else if(error.name === "Unauthorized"){
                res.status(401).json({message : "Invalid Email / Password"})
            }else {
                res.status(500).json({message : "Internal Server Error"})
            }
        }
    }


}

module.exports = Controller