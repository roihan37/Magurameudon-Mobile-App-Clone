const HOST = "http://app:4002/categories";
const axios = require("axios");
const redis = require("../helpers/redis");

const typeDefs = `#graphql
    type Category{
        id : ID
        name : String
    }

   type messageCategory{
         message : String
   }

    type Query{
        getAllCategories : [Category]
    }

    type Mutation{
        postCategory(
            name : String
        ) : Category

        destroyCategory(id : Int) : messageCategory
    }
`;

const resolvers = {
  Query: {
    getAllCategories: async () => {
      try {

        const dataChace = await redis.get("app:getAllCategories");

        if (dataChace) {
          return JSON.parse(dataChace);
        }

        const { data } = await axios({
          method: "GET",
          url: HOST,
        });
        

        await redis.set("app:getAllCategories", JSON.stringify(data));

        return data;
      } catch (error) {
        return error;
      }
    },
  },

  Mutation: {
    postCategory: async (_, { name }) => {
      try {
        const { data } = await axios({
          method: "POST",
          url: HOST,
          data: {
            name,
          },
        });

        await redis.del("app:getAllCategories");

        return data;
      } catch (error) {
        return error;
      }
    },

    destroyCategory: async (_, { id }) => {
      try {
        const { data } = await axios({
            method: "DELETE",
            url: HOST + `/${id}`,
          });
        await redis.del("app:getAllCategories");
        return data;
      } catch (error) {
        return data;
      }
    },
  },
};

module.exports = { resolvers, typeDefs };
