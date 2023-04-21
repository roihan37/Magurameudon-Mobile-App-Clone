const { ObjectId } = require("mongodb");
const { getDatabase } = require("../config/mongoConnection");
const { hash } = require('../helpers/bcryptjs')

class User {
  static getCollections() {
    const db = getDatabase();
    const users = db.collection("users");
    return users;
  }

  static async createUser(user) {
    return this.getCollections().insertOne({
        username: user.username,
        email: user.email,
        password : hash(user.password),
        role : 'admin',
        phoneNumber : user.phoneNumber,
        address : user.address
    });
  }

  static async findOne(user){
    return this.getCollections().findOne({
      email : user.email,
    })
  }

  static async findAll(){
    return this.getCollections().find({},{
      projection : {'password' : 0}
    }).toArray();
  }

  static async findById(objectId) {
    return this.getCollections().findOne({
      _id: new ObjectId(objectId),
    });
  }

  static async destroyById(objectId) {
    return this.getCollections().deleteOne({
      _id: new ObjectId(objectId),
    });
  }

  
}

module.exports = User;
