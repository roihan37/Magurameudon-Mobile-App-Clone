const { Item, Ingredient } = require('../models/index')
class Controller {
    static async getAllItems(req, res){
            try {

                const items = await Item.findAll(
                    {
                        order: [
                            ['id', 'ASC']
                        ],
                        attributes: {
                            exclude: ['createdAt', 'updatedAt']
                        },
                        include : ['Category', 'Ingredients']
                    }
                )
                res.status(200).json(items)
            } catch (error) {
                console.log(error);
                res.status(500).json({ message: "Internal Server Error" })
            }
    }

    static async getAllItemsById(req, res){
        try {
            const { id } = req.params
            const item = await Item.findByPk(id, 
                {include : ['Category', 'Ingredients']}
                )
            if(!item){
                throw { name : 'notFound'}
            }
            res.status(200).json(item)
        } catch (error) {
            
            if(error.name === "notFound"){
                res.status(404).json({message : "Item Not Found"})
            }else {
                res.status(500).json({ message: "Internal Server Error" })
            }
        }
    }

    static async getAllIngredientById(req, res){
        try {
            let { itemId } = req.params
            console.log(req);
            const item = await Item.findByPk(itemId)
            console.log(item);
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