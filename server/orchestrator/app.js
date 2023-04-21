const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");

if(process.env.NODE_ENV = "production"){
    require('dotenv').config()
  }

const { typeDefs : itemsTypeDef, resolvers : itemsResolvers } = require('./schemas/items');
const { typeDefs : usersTypeDef, resolvers : usersResolvers } = require('./schemas/users');   
const { typeDefs : ingredientTypeDef, resolvers : ingredientResolvers } = require('./schemas/ingredients');    
const { typeDefs : categoriesTypeDef, resolvers : categoriesResolvers } = require('./schemas/categories');       


(async () => {
  const server = new ApolloServer({
    // Jadi typeDefs di sini bisa menerima array
    typeDefs: [usersTypeDef, itemsTypeDef, ingredientTypeDef, categoriesTypeDef],
    // sama seperti typeDefs, resolvers juga bisa menerima array
    resolvers: [usersResolvers, itemsResolvers, ingredientResolvers, categoriesResolvers],
    // Ini supaya kita tetap bisa membuka explorer sekalipun di production
    introspection : true
    // (in real case yang digunakan adalah sebagai berikut)
    // introspection: process.env.NODE_ENV !== 'production'
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });
  console.log(`🚀  Server ready at: ${url}`);
})();
