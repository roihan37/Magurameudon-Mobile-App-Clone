const HOST = "http://app:4002/ingredients";
// const HOST_USERS = "http://localhost:4001/users";
const axios = require("axios");
const redis = require("../helpers/redis");

const typeDefs = `#graphql
    type Ingredient{
        id : ID
        itemId : Int
        name : String
    }

    type Query{
        getAllIngredients : [Ingredient]
        getIngredientById(itemId : Int) : [Ingredient]
    }
`

const resolvers = {
    Query : {
        getAllIngredients : async () => {
            try {

                const dataChace = await redis.get("app:getAllIngredients");
          
                  if (dataChace) {
                    return JSON.parse(dataChace);
                  }

                const { data } = await axios({
                    method: "GET",
                    url: HOST,
                  });
                  
          
                  await redis.set("app:getAllIngredients", JSON.stringify(data));
          
                  return data;
            } catch (error) {
                return error
            }
        },
        getIngredientById : async (_,{itemId}) => {
            try {

                const dataChace = await redis.get("app:getIngredientById"+ `:${itemId}`);

                if (dataChace) {
                    return JSON.parse(dataChace);
                  }

                const { data } = await axios({
                    method: "GET",
                    url: HOST + `/${itemId}`,
                  });
          
                  await redis.set("app:getIngredientById"+ `:${itemId}`, JSON.stringify(data), 'EX', 300);
          
                  return data;
            } catch (error) {
                
                return error
            }
        }
    }
}

module.exports = {
    typeDefs, resolvers
}