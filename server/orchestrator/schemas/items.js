const HOST = "http://app:4002/items";
const HOST_USERS = "http://users:4001/users";
const axios = require("axios");
const redis = require("../helpers/redis");

const typeDefs = `#graphql
type Items{
    id : ID
    name : String
    description : String
    price : Int
    imgUrl : String
    authorId : Int
    categoryId : Int
    UserMongoId : String
    Category : Category
    Ingredients : [Ingredients]
    user : userMongoId
}


type userMongoId {
    id : ID
    username : String
    email : String
}

type resultItem{
    item : Items
    ingredient : [Ingredients]
}

type Category{
    id : ID
    name : String
}

type Ingredients{
    id : ID
    itemId : Int
    name : String
}

type messageItem{
    message : String
}

type Query {
    getAllItems: [Items]
    getItemById(id : Int) : Items
  }

type Mutation{
    postItem(
    name : String
    description : String
    price : Int
    imgUrl : String
    categoryId : Int
    nameIngredient : [String]
    ) : resultItem 

    putItem(
    id : Int
    name : String
    description : String
    price : Int
    imgUrl : String
    categoryId : Int
    nameIngredient : [String]
    ) : resultItem

    destroyItem(id : Int) : messageItem 
}


`;
const resolvers = {
  Query: {
    getAllItems: async () => {
      try {
        const dataChace = await redis.get("app:getAllItems");

        if (dataChace) {
          return JSON.parse(dataChace);
        }

        const { data } = await axios({
          method: "GET",
          url: HOST,
        });

        await redis.set("app:getAllItems", JSON.stringify(data));

        return data;
      } catch (error) {
        console.log(error);
      }
    },
    getItemById: async (_, { id }) => {
      try {
        const dataChace = await redis.get("app:getItemById"+ `:${id}`);
        if (dataChace){
          return JSON.parse(dataChace);
        }
        
        const { data: item } = await axios({
          method: "GET",
          url: HOST + `/${id}`,
        });

         if(item.UserMongoId){
        
            const { data: user } = await axios({
              method: "GET",
              url: HOST_USERS + `/${item.UserMongoId}`,
            });

            item.user = user;
        }

        

        await redis.set("app:getItemById"+`:${id}`, JSON.stringify(item), "EX", 300);

        return item;
      } catch (error) {
        console.log(error);
        return error;
      }
    },
  },
  Mutation: {
    postItem: async (
      _,
      { name, description, price, imgUrl, categoryId, nameIngredient }
    ) => {
      // console.log(name, description, price, imgUrl, categoryId, nameIngredient);
      try {
        const { data } = await axios({
          method: "POST",
          url: HOST,
          data: {
            name,
            description,
            price,
            imgUrl,
            categoryId,
            nameIngredient,
          },
        });

        await redis.del("app:getAllItems");
        return data;
      } catch (error) {
        return error;
      }
    },
    putItem: async (
      _,
      { id, name, description, price, imgUrl, categoryId, nameIngredient }
    ) => {
      try {
        const { data } = await axios({
          method: "PUT",
          url: HOST + `/${id}`,
          data: {
            name,
            description,
            price,
            imgUrl,
            categoryId,
            nameIngredient,
          },
        });

        await redis.del("app:getAllItems");
        return data;
      } catch (error) {
        
        return error;
      }
    },
    destroyItem: async (_, { id }) => {
      try {
        const { data } = await axios({
          method: "DELETE",
          url: HOST + `/${id}`,
        });

        await redis.del("app:getAllItems");
        return data;
      } catch (error) {
        console.log(error);
        return error;
      }
    },
  },
};

module.exports = {
  typeDefs,
  resolvers,
};
