const axios = require("axios");
const { appCategoryAPI } = require("../helpers/api_services");
const redis = require("../helpers/redis");
// const appAPI = "http://localhost:4002/categories";

class Controller {
  static async getAllCategory(req, res) {
    try {
        const dataChace = await redis.get("app:categories")

        if(dataChace){
            // console.log(dataChace);
            return res.status(200).json(JSON.parse(dataChace));
        }

      const { data } = await axios({
        method: "get",
        url: appCategoryAPI,
      });

      await redis.set("app:categories", JSON.stringify( data))

      res.status(200).json(data);
    } catch (error) {
      res.status(error.response.status).json(error.response.data);
    }
  }

  static async addCategory(req, res) {
    try {
      const { name } = req.body;

      const { data } = await axios({
        method: "post",
        url: appCategoryAPI,
        data : {name}
      });
      res.status(200).json(data);

      await redis.del("app:categories")
    } catch (error) {
      res.status(error.response.status).json(error.response.data);
    }
  }

  static async deleteCategory(req, res){
    try {
        const { id } = req.params

        const { data } = await axios({
            method: "delete",
            url: appCategoryAPI + `/${id}`,
          });
          await redis.del("app:categories")
          res.status(200).json(data);
    } catch (error) {
        res.status(error.response.status).json(error.response.data);
    }
  }
}
module.exports = Controller;
