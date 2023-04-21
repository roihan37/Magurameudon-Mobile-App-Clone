const axios = require("axios");
const { appAPI, userAPI } = require("../helpers/api_services");
const redis = require("../helpers/redis");



class Controllers {
  static async getAllItems(req, res) {
    try {
        const dataChace = await redis.get("app:items") 

        if(dataChace){
            // console.log(dataChace);
            return res.status(200).json(JSON.parse( dataChace));
        }

        const { data : items } = await axios({
            method: "get",
            url: appAPI,
          });
          
          const { data : users} = await axios({
            method : 'get',
            url : userAPI
          })
        
          items.map((item) => {
            users.map((user) => {
                if(item.UserMongoId === user._id){
                    item.User = user
                }
            })
          })

      await redis.set("app:items", JSON.stringify(items))

      res.status(200).json(items);
    } catch (error) {
      res.status(error.response.status).json(error.response.data);
    }
  }

  static async addItem(req, res) {
    try {
        
        let { name, description, price, imgUrl, authorId, categoryId, nameIngredient } =
          req.body;
        //   console.log(name, description, price, imgUrl, categoryId, nameIngredient);
        const { data } = await axios({
          method: "post",
          url: appAPI,
          data: {
            name,
            description,
            price,
            imgUrl,
            authorId,
            categoryId,
            nameIngredient,
          },
        });

     
        await redis.del("app:items")

        
        res.status(201).json(data);

    } catch (error) {
        // console.log(error);
        res.status(error.response.status).json(error.response.data);
    }
  }

  static async getItemById(req, res){
    try {
        const { id } = req.params

        const dataChace = await redis.get("app:getItemsById")

        
        const { data : item } = await axios({
            method: "get",
            url: appAPI + `/${id}`
        });
        
        const { data : user } = await axios({
            method: "get",
            url: userAPI + `/${item.UserMongoId}`
        });
        
        item.User = user
        
        if(dataChace === JSON.stringify(item)){
            // console.log(dataChace);
            return res.status(200).json(JSON.parse(dataChace));
        }

          await redis.set("app:getItemsById", JSON.stringify(item))

          res.status(200).json(item);
    } catch (error) {
        
        res.status(error.response.status).json(error.response.data);
    }
  }

  static async editItem(req, res){
    try {
        
        const { id } = req.params
        let { name, description, price, imgUrl, categoryId, nameIngredient } =
              req.body;
            const { data } = await axios({
              method: "put",
              url: appAPI + `/${id}`,
              data: {
                name,
                description,
                price,
                imgUrl,
                categoryId,
                nameIngredient,
              },
            });

            await redis.del("app:items")

            res.status(200).json(data);
    } catch (error) {
        res.status(error.response.status).json(error.response.data);
    }
  }

  static async destroyItem(req, res){
    try {
        const { id } = req.params
       
        const { data } = await axios({
            method: "delete",
            url: appAPI + `/${id}`
          });

          await redis.del("app:items")

          res.status(200).json(data);
    } catch (error) {
        res.status(error.response.status).json(error.response.data);
    }
  }
  
}

module.exports = Controllers;
