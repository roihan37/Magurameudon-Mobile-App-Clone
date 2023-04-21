const {Ingredient, Item} = require('../models/index')
class Controller{
    static async getAllIngredient(req, res){
        try {
            const ingredients = await Ingredient.findAll({attributes: {
                        exclude: ['createdAt', 'updatedAt']
                    }})
            res.status(200).json(ingredients)
        } catch (error) {
            res.status(500).json({message : 'Internal Server Error'})
        }
    }

    static async getIngredientById(req, res){
        try {
            let { itemId } = req.params
            // console.log(req.params);
            const item = await Item.findByPk(itemId)
            if(!item){
                throw { name : 'notFound'}
            }
            const ingredient = await Ingredient.findAll({where : { itemId }})
            if(!ingredient){
                throw { name : 'notFound'}
            }
            res.status(200).json(ingredient)
        } catch (error) {
            if(error.name === 'notFound'){
                res.status(404).json({message : 'data not found'})
            }else{
                res.status(500).json({message : "Internal Server Error"})
            }
        }
    }
 
}
module.exports = Controller