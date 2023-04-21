const HOST = "http://users:4001/users";
const axios = require("axios");
const redis = require("../helpers/redis");

const typeDefs = `#graphql
type User{
    _id: ID
    id : ID
    username : String
    email : String
    role : String
    phoneNumber : String
    address : String
}

type userCreatedResault{
    statusCode: Int
    id : String
    email : String
}

type userDeleted{
    message : String
}

type Query {
    getAllUsers: [User]
    getUserById(id : String) : User
  }

type Mutation {
    createUser(
        username : String
        email : String
        password : String
        role : String
        phoneNumber : String
        address : String
    ) : userCreatedResault

    destroyUser(id : String) : userDeleted
}
`
const resolvers = {
    Query : {
        getAllUsers : async () => {

            const dataChace = await redis.get("users:getAllUsers") 

            if(dataChace){
                return JSON.parse(dataChace)
            }

            const { data } = await axios({
                method : 'GET',
                url : HOST
            })
           
            await redis.set("users:getAllUsers", JSON.stringify(data))
            
            return data
        },
        getUserById : async (_,{id}) => {
            // console.log(id);

            const dataChace = await redis.get("users:getUsersId"+ `:${id}`) 

            if(dataChace){
                return JSON.parse(dataChace)
            }

            const { data } = await axios({
                method : 'GET',
                url : HOST + `/${id}`
            })
            
            
            await redis.set("users:getUsersId", JSON.stringify(data), 'EX', 300)

            return data
        }
    },
    Mutation : {
        createUser : async (_,{username, email, password, role, phoneNumber, address}) => {
            const { data } = await axios({
                method : 'POST',
                url : 'http://localhost:4001/users/register',
                data : {username, email, password, role, phoneNumber, address}
            })

            await redis.del("users:getAllUsers")
            return data
        },
        destroyUser : async (_ ,{id}) => {
            try {
                
                const { data } = await axios({
                    method : 'DELETE',
                    url : HOST + `/${id}`,
                })
    
                await redis.del("users:getAllUsers")
                return data
            } catch (error) {
                return error
            }
        }
    }
};

module.exports = {
    typeDefs, resolvers
}
