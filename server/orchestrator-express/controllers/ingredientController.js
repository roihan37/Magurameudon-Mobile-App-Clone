const axios = require("axios");
const { appIngredientAPI } = require("../helpers/api_services");
const redis = require("../helpers/redis");
// const appAPI = "http://localhost:4002/ingredients";


class Controller {
     static async getAllIngredient(req, res){
        try {
            const dataChace = await redis.get("app:ingredients")

            if(dataChace){
                // console.log(dataChace);
                return res.status(200).json(JSON.parse(dataChace));
            }

            const { data } = await axios({
              method: "get",
              url: appIngredientAPI,
            });
            
            await redis.set("app:ingredients", JSON.stringify( data))
            res.status(200).json(data);
          } catch (error) {
            res.status(error.response.status).json(error.response.data);
          }
     }

     static async getIngredientById(req, res){
        try {

            const { itemId } = req.params
            const dataChace = await redis.get("app:ingredients")

            
            const { data } = await axios({
                method: "get",
                url: appIngredientAPI +`/${itemId}`,
            });

            // console.log(data);
            if(dataChace === JSON.stringify( data)){
                return res.status(200).json(JSON.parse(dataChace));
            }

              await redis.set("app:ingredients", JSON.stringify( data))
              res.status(200).json(data);
        } catch (error) {
            res.status(error.response.status).json(error.response.data);
        }
     }
}

module.exports = Controller