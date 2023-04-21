const {
  Item,
  Ingredient,
  Category,
  sequelize,
  User,
} = require("../models/index");

class Controller {
  static async getAllItems(req, res) {
    try {
      const items = await Item.findAll({
        order: [["id", "ASC"]],
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
        include: [
          {
            model: Category,
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },
          {
            model: Ingredient,
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },
        ],
      });
      res.status(200).json(items);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async getItemById(req, res) {
    try {
      const { id } = req.params;
      const item = await Item.findByPk(id, {
        include: [
          {
            model: Category,
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },
          {
            model: Ingredient,
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },
        ],
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      });
      if (!item) {
        throw { name: "notFound" };
      }
      res.status(200).json(item);
    } catch (error) {
      if (error.name === "notFound") {
        res.status(404).json({ message: "Item Not Found" });
      } else {
        res.status(500).json({ message: "Internal Server Error" });
      }
    }
  }

  static async addItem(req, res) {
    const t = await sequelize.transaction();
    try {
      let { name, description, price, imgUrl, categoryId, nameIngredient } =
        req.body;

      const newItem = await Item.create(
        {
          name: name,
          description: description,
          price: price,
          imgUrl: imgUrl,
          authorId: 1,
          categoryId: categoryId,
        },
        { transaction: t }
      );
      // console.log(newItem.dataValues);

      delete newItem.dataValues.createdAt;
      delete newItem.dataValues.updatedAt;

      let ingredientResult = [];
      if (nameIngredient) {
        ingredientResult = nameIngredient.map((el) => {
          return {
            itemId: newItem.id,
            name: el,
          };
        });
      }

      const ingredient = await Ingredient.bulkCreate(ingredientResult, {
        transaction: t,
        validate: true,
      });
      await t.commit();

      ingredient.map((el) => {
        delete el.dataValues.createdAt;
        delete el.dataValues.updatedAt;
      });

      res.status(201).json({ item: newItem, ingredient: ingredient });
    } catch (error) {
      await t.rollback();
      // res.status(400).json(error)
      //   console.log(error);
      if (
        error.name === "SequelizeValidationError" ||
        error.name === "AggregateError"
      ) {
        res.status(400).json({ message: error.errors[0].message });
      } else {
        res.status(500).json({ message: "Internal Server Error" });
      }
      //   console.log(error);
    }
  }

  static async editItem(req, res) {
    const t = await sequelize.transaction();
    try {
      const { id } = req.params;
      const item = await Item.findByPk(id, { transaction: t });
      if (!item) {
        throw { name: "notFound" };
      }
      let { name, description, price, imgUrl, categoryId, nameIngredient } =
        req.body;

      await Ingredient.destroy(
        {
          where: { itemId: item.id },
        },
        { transaction: t }
      );

      await Item.update(
        {
          name: name,
          description: description,
          price: price,
          imgUrl: imgUrl,
          categoryId: categoryId,
        },
        { where: { id } },
        { transaction: t }
      );

      let ingredientResult = [];
      ingredientResult = nameIngredient.map((el) => {
        return {
          itemId: item.id,
          name: el,
        };
      });

      const ingredient = await Ingredient.bulkCreate(ingredientResult, {
        transaction: t,
        validate: true,
      });
      await t.commit();

      res.status(200).json({ message: "success updated" });
    } catch (error) {
      // console.log(error);
      await t.rollback();
      if (error.name === "notFound") {
        res.status(404).json({ message: "Item Not Found" });
      } else if (
        error.name === "SequelizeValidationError" ||
        error.name === "AggregateError"
      ) {
        res.status(400).json({ message: error.errors[0].message });
      } else {
        res.status(500).json({ message: "Internal Server Error" });
      }
    }
  }

  static async destroyItem(req, res) {
    try {
      let { id } = req.params;

      const itemById = await Item.findByPk(id);
      if (!itemById) {
        throw { name: "notFound" };
      }

      await Item.destroy({
        where: { id },
      });

      res.status(200).json({ message: `${itemById.name} deleted` });
    } catch (error) {
      // console.log(error);
      if (error.name === "notFound") {
        res.status(404).json({ message: "data not found" });
      } else {
        res.status(500).json({ message: "Internal Server Error" });
      }
    }
  }
}
module.exports = Controller;
