const { getDatabase } = require("../config/mongoConnection");
const { compare } = require('../helpers/bcryptjs')
const User = require("../model/user");

module.exports = {
  createUser: async (req, res, next) => {
    try {
        const { email, username, password, role, phoneNumber, address } = req.body;
        const newUser = await User.createUser({
          email,
          username,
          password,
          role,
          phoneNumber,
          address,
        });
        
        res.status(201).json({
          statusCode: 201,
          id: newUser.insertedId,
          email,
        });
    } catch (error) {
      console.log(error);
        res.status(500).json({message : 'Internal Server Error'})
    }
  },

  loginUser : async (req, res, next) => {
    try {
      const { email, password } = req.body;

      if(!email || !password){
        throw { name : 'badRequest'}
      }

      const userLogin = await User.findOne({email})
      if(!userLogin){
        throw { name : 'invalidEmailPassword'}
      }
      // console.log(userLogin);
      const comparePassword = compare(password, userLogin.password)
      // console.log(comparePassword);
      if(!comparePassword){
        throw { name : 'invalidEmailPassword'}
      }
      res.status(200).json({message : 'success login'})

    } catch (error) {
      if(error.name == 'invalidEmailPassword'){
        res.status(400).json({message : 'Invalid Email / Password'})
      } else if(error.name == 'badRequest'){
        res.status(401).json({message : 'Email / Password Required'})
      }{
        res.status(500).json({message : 'Internal Server Error'})
      }
    }
  },

  findAllUser : async (req, res, next) => {
    try {
      
      const allUser = await User.findAll()
      
      res.status(200).json(allUser)

    } catch (error) {
      console.log(error);
      res.status(500).json({message : 'Internal Server Error'})
    }
  },

  destroyUser :  async (req, res, next) => {
    try {
      const { id } = req.params
      const userLogin = await User.findById({id})
      // console.log(userLogin);
      // console.log(id);
      if(!userLogin){
        throw {
          name : 'dataNotFound'
        }
      }

      await User.destroyById(id)
      res.status(200).json({message : 'deleted successfully'})

    } catch (error) {
      if(error.name === 'dataNotFound'){
        res.status(404).json({message : "Data Not Found"})
      }else{
        res.status(500).json({message : 'Internal Server Error'})
      }
    }
  },

  findById : async (req, res, next) => {
    try {
      const { id } = req.params
      const userLogin = await User.findById({id})

      if(!userLogin){
        throw {
          name : 'dataNotFound'
        }
      }

      res.status(200).json({
        id : userLogin._id, 
        email : userLogin.email,
        username : userLogin.username
      })

    } catch (error) {
      if(error.name === 'dataNotFound'){
        res.status(404).json({message : "Data Not Found"})
      }else{
        res.status(500).json({message : 'Internal Server Error'})
      }
    }
  }

};
