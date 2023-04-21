'use strict';
const { hash } = require('../helper/bcrypt')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('Categories', [
      {
        
        "name": "Udon",
        "createdAt" : new Date(),
        "updatedAt" : new Date(),
        
      },
      {
        
        "name": "Tempura",
        "createdAt" : new Date(),
        "updatedAt" : new Date()
      }
    ], {})

    await queryInterface.bulkInsert('Users', [
      {
        "username": "roy",
        "email" : "roy@gmail.com",
        "password" : hash("12345"),
        "role" : "admin",
        "phoneNumber" : "081111111",
        "address" : "tasik",
        "createdAt" : new Date(),
        "updatedAt" : new Date(),
        
      },
      {
        "username": "roy1",
        "email" : "roy1@gmail.com",
        "password" : hash("12345"),
        "role" : "admin",
        "phoneNumber" : "081111111",
        "address" : "tasik",
        "createdAt" : new Date(),
        "updatedAt" : new Date()
      }
    ], {})

    await queryInterface.bulkInsert('Items', [
      {
        
        "name": "KAMAAGE UDON FAMILY",
        "description": "Mie udon autentik Jepang, disajikan dengan 4 porsi set bukake dashi. Cocok dinikmati saat udara dingin bersama keluarga atau teman.",
        "price": 17000,
        "imgUrl": "https://www.marugameudon.co.id/webroot/files/MenuDetails/picture/u2.jpg",
        "authorId": 1,
        "categoryId": 1,
        "createdAt" : new Date(),
        "updatedAt" : new Date(),
        "UserMongoId" : "63f77858c70524622fc829fd"
      },
      {
        
        "name": "KAMAAGE UDON REGULER",
        "description": "Mie udon autentik Jepang, disajikan dengan set bukake dashi. Cocok dinikmati saat cuaca sedang dingin.",
        "price": 19000,
        "imgUrl": "https://www.marugameudon.co.id/webroot/files/MenuDetails/picture/u1.jpg",
        "authorId": 1,
        "categoryId": 1,
        "createdAt" : new Date(),
        "updatedAt" : new Date(),
        "UserMongoId" : "63f77858c70524622fc829fd"
      },
      {
        
        "name": "KAKE UDON",
        "description": "Mie udon hangat, disajikan dengan sup kake dashi yang juga hangat.",
        "price": 21000,
        "imgUrl": "https://www.marugameudon.co.id/webroot/files/MenuDetails/picture/Kake-Udon-1.jpg",
        "authorId": 1,
        "categoryId": 1,
        "createdAt" : new Date(),
        "updatedAt" : new Date(),
        "UserMongoId" : "63f77858c70524622fc829fd"
      },
      {
        
        "name": "SPICY TORI BAITAN UDON",
        "description": "Mie udon dengan sup ayam, bertabur daging ayam spicy dan jamur. Pedas pas rasa gurih ayam.",
        "price": 21000,
        "imgUrl": "https://www.marugameudon.co.id/webroot/files/MenuDetails/picture/Spicy-tory-baytan-Udon-1.jpg",
        "authorId": 1,
        "categoryId": 1,
        "createdAt" : new Date(),
        "updatedAt" : new Date(),
        "UserMongoId" : "63f77858c70524622fc829fd"
      },
      {
        
        "name": "NIKU UDON",
        "description": "Mie udon disajikan dengan sup kake dashi dan daging sapi sukiyaki impor yang manis juga gurih.",
        "price": 21000,
        "imgUrl": "https://www.marugameudon.co.id/webroot/files/MenuDetails/picture/Niku-Udon-1.jpg",
        "authorId": 1,
        "categoryId": 1,
        "createdAt" : new Date(),
        "updatedAt" : new Date(),
        "UserMongoId" : "63f77858c70524622fc829fd"
      },
      {
        
        "name": "BEEF CURRY UDON",
        "description": "Mie udon dengan kuah kari gurih, disajikan dengan daging sapi sukiyaki.",
        "price": 21000,
        "imgUrl": "https://www.marugameudon.co.id/webroot/files/MenuDetails/picture/beef-curry-udon-1.jpg",
        "authorId": 1,
        "categoryId": 1,
        "createdAt" : new Date(),
        "updatedAt" : new Date(),
        "UserMongoId" : "63f77b0272e79f76a9e524a0"
      },
      {
        
        "name": "CHICKEN KATSU CURRY UDON",
        "description": "Mie udon yang disajikan dengan kuah kari dan katsu ayam spesial.",
        "price": 21000,
        "imgUrl": "https://www.marugameudon.co.id/webroot/files/MenuDetails/picture/Chiken-Katsu-curry-udon-1.jpg",
        "authorId": 1,
        "categoryId": 1,
        "createdAt" : new Date(),
        "updatedAt" : new Date(),
        "UserMongoId" : "63f77b0272e79f76a9e524a0"
      },
      {
        
        "name": "BEEF CARBONARA UDON",
        "description": "Mie Udon creamy dengan topping beef sausage berkualitas dengan campuran garlic mayo dan cream dilengkapi taburan keju cheddar, blackpepper dan parsley",
        "price": 21000,
        "imgUrl": "https://www.marugameudon.co.id/webroot/files/MenuDetails/picture/beef-carbonara-udon.jpg",
        "authorId": 1,
        "categoryId": 1,
        "createdAt" : new Date(),
        "updatedAt" : new Date(),
        "UserMongoId" : "63f77b0272e79f76a9e524a0"
      },
      {
        
        "name": "BEEF ABURA UDON ",
        "description": "Mie Udon yang disajikan dengan saus abura tanpa kuah dengan topping daging sapi sukiyaki, manis gurih. Tersedia dalam varian rasa original & spicy",
        "price": 21000,
        "imgUrl": "https://www.marugameudon.co.id/webroot/files/MenuDetails/picture/Beef%20Abura%20Udon_New_Menu%20Board_.png",
        "authorId": 1,
        "categoryId": 1,
        "createdAt" : new Date(),
        "updatedAt" : new Date(),
        "UserMongoId" : "63f77b0272e79f76a9e524a0"
      },
      {
        
        "name": "NIKU ZARU UDON",
        "description": "Udon dengan sup bukkake dashi (panas/dingin) dan topping daging sapi sukiyaki serta ikan cakalang serut.",
        "price": 21000,
        "imgUrl": "https://www.marugameudon.co.id/webroot/files/MenuDetails/picture/Niku%20Zaru%20Udon.png",
        "authorId": 1,
        "categoryId": 1,
        "createdAt" : new Date(),
        "updatedAt" : new Date(),
        "UserMongoId" : "63f77b0272e79f76a9e524a0"
      },
      {
        
        "name": "NIKUTAMA ZARU UDON",
        "description": "Udon dengan sup bukkake dashi (panas/dingin) dan topping daging sapi sukiyaki, telur, serta ikan cakalang serut.",
        "price": 21000,
        "imgUrl": "https://www.marugameudon.co.id/webroot/files/MenuDetails/picture/Nikutama%20Zaru%20Udon.png",
        "authorId": 1,
        "categoryId": 1,
        "createdAt" : new Date(),
        "updatedAt" : new Date(),
        "UserMongoId" : "63f77b0272e79f76a9e524a0"
      },
      {
        
        "name": "ONTAMA ZARU UDON",
        "description": "Udon dengan sup bukkake dashi (panas/dingin) dan topping telur serta ikan cakalang serut.",
        "price": 21000,
        "imgUrl": "https://www.marugameudon.co.id/webroot/files/MenuDetails/picture/Ontama%20Zaru%20Udon.png",
        "authorId": 1,
        "categoryId": 1,
        "createdAt" : new Date(),
        "updatedAt" : new Date(),
        "UserMongoId" : "63f77b0272e79f76a9e524a0"
      },
      {
        
        "name": "BEEF CROQUETTE",
        "description": "Kroket kentang dengan daging sapi cincang.",
        "price": 15000,
        "imgUrl": "https://www.marugameudon.co.id/webroot/files/MenuDetails/picture/Image%20Web_500x397px_Beef%20Croquette.png",
        "authorId": 1,
        "categoryId": 2,
        "createdAt" : new Date(),
        "updatedAt" : new Date(),
        "UserMongoId" : "63f77b0272e79f76a9e524a0"
      },
      {
        
        "name": "CHICKEN KATSU",
        "description": "Dua lapis katsu daging ayam tebal, fillet dan cincang yang gurih dan crunchy.",
        "price": 15000,
        "imgUrl": "https://www.marugameudon.co.id/webroot/files/MenuDetails/picture/Chiken-katsu-tempura-2.jpg",
        "authorId": 1,
        "categoryId": 2,
        "createdAt" : new Date(),
        "updatedAt" : new Date(),
        "UserMongoId" : "63f77b0272e79f76a9e524a0"
      }
    ], {})
   
    await queryInterface.bulkInsert('Ingredients', [
      {
        
        "itemId": 1,
        "name": "Mie udon",
        "createdAt" : new Date(),
        "updatedAt" : new Date()
      },
      {
        
        "itemId": 1,
        "name": "Kuah Kari",
        "createdAt" : new Date(),
        "updatedAt" : new Date()
      },
      {
        
        "itemId": 1,
        "name": "Daging Sapi",
        "createdAt" : new Date(),
        "updatedAt" : new Date()
      },
      {
        
        "itemId": 2,
        "name": "Kuah Kari",
        "createdAt" : new Date(),
        "updatedAt" : new Date()
      },
      {
        
        "itemId": 2,
        "name": "Daging Sapi",
        "createdAt" : new Date(),
        "updatedAt" : new Date()
      },
      {
        
        "itemId": 2,
        "name": "Mie udon",
        "createdAt" : new Date(),
        "updatedAt" : new Date()
      },
      {
        
        "itemId": 3,
        "name": "Daging Sapi",
        "createdAt" : new Date(),
        "updatedAt" : new Date()
      },
      {
        
        "itemId": 3,
        "name": "Mie udon",
        "createdAt" : new Date(),
        "updatedAt" : new Date()
      },
      {
        
        "itemId": 3,
        "name": "Kuah Kari",
        "createdAt" : new Date(),
        "updatedAt" : new Date()
      },
      {
        
        "itemId": 4,
        "name": "Mie udon",
        "createdAt" : new Date(),
        "updatedAt" : new Date()
      },
      {
        
        "itemId": 4,
        "name": "Kuah Kari",
        "createdAt" : new Date(),
        "updatedAt" : new Date()
      },
      {
        
        "itemId": 4,
        "name": "Daging Sapi",
        "createdAt" : new Date(),
        "updatedAt" : new Date()
      },
      {
        
        "itemId": 5,
        "name": "Kuah Kari",
        "createdAt" : new Date(),
        "updatedAt" : new Date()
      },
      {
        
        "itemId": 5,
        "name": "Daging Sapi",
        "createdAt" : new Date(),
        "updatedAt" : new Date()
      },
      {
        
        "itemId": 5,
        "name": "Mie udon",
        "createdAt" : new Date(),
        "updatedAt" : new Date()
      },
      {
        
        "itemId": 6,
        "name": "Daging Sapi",
        "createdAt" : new Date(),
        "updatedAt" : new Date()
      },
      {
        
        "itemId": 6,
        "name": "Mie udon",
        "createdAt" : new Date(),
        "updatedAt" : new Date()
      },
      {
        
        "itemId": 6,
        "name": "Kuah Kari",
        "createdAt" : new Date(),
        "updatedAt" : new Date()
      },
      {
        
        "itemId": 7,
        "name": "Mie udon",
        "createdAt" : new Date(),
        "updatedAt" : new Date()
      },
      {
        
        "itemId": 7,
        "name": "Kuah Kari",
        "createdAt" : new Date(),
        "updatedAt" : new Date()
      },
      {
        
        "itemId": 7,
        "name": "Daging Sapi",
        "createdAt" : new Date(),
        "updatedAt" : new Date()
      },
      {
        
        "itemId": 8,
        "name": "Kuah Kari",
        "createdAt" : new Date(),
        "updatedAt" : new Date()
      },
      {
        
        "itemId": 8,
        "name": "Daging Sapi",
        "createdAt" : new Date(),
        "updatedAt" : new Date()
      },
      {
        
        "itemId": 8,
        "name": "Mie udon",
        "createdAt" : new Date(),
        "updatedAt" : new Date()
      },
      {
        
        "itemId": 9,
        "name": "Daging Sapi",
        "createdAt" : new Date(),
        "updatedAt" : new Date()
      },
      {
        
        "itemId": 9,
        "name": "Mie udon",
        "createdAt" : new Date(),
        "updatedAt" : new Date()
      },
      {
        
        "itemId": 9,
        "name": "Kuah Kari",
        "createdAt" : new Date(),
        "updatedAt" : new Date()
      },
      {
        
        "itemId": 10,
        "name": "Mie udon",
        "createdAt" : new Date(),
        "updatedAt" : new Date()
      },
      {
        
        "itemId": 10,
        "name": "Kuah Kari",
        "createdAt" : new Date(),
        "updatedAt" : new Date()
      },
      {
        
        "itemId": 10,
        "name": "Daging Sapi",
        "createdAt" : new Date(),
        "updatedAt" : new Date()
      },
      {
        
        "itemId": 11,
        "name": "Kuah Kari",
        "createdAt" : new Date(),
        "updatedAt" : new Date()
      },
      {
        
        "itemId": 11,
        "name": "Daging Sapi",
        "createdAt" : new Date(),
        "updatedAt" : new Date()
      },
      {
        
        "itemId": 11,
        "name": "Mie udon",
        "createdAt" : new Date(),
        "updatedAt" : new Date()
      },
      {
        
        "itemId": 12,
        "name": "Daging Sapi",
        "createdAt" : new Date(),
        "updatedAt" : new Date()
      },
      {
        
        "itemId": 12,
        "name": "Mie udon",
        "createdAt" : new Date(),
        "updatedAt" : new Date()
      },
      {
        
        "itemId": 12,
        "name": "Kuah Kari",
        "createdAt" : new Date(),
        "updatedAt" : new Date()
      },
      {
        
        "itemId": 13,
        "name": "Mie udon",
        "createdAt" : new Date(),
        "updatedAt" : new Date()
      },
      {
        
        "itemId": 13,
        "name": "Kuah Kari",
        "createdAt" : new Date(),
        "updatedAt" : new Date()
      },
      {
        
        "itemId": 13,
        "name": "Daging Sapi",
        "createdAt" : new Date(),
        "updatedAt" : new Date()
      },
      {
        
        "itemId": 14,
        "name": "Kuah Kari",
        "createdAt" : new Date(),
        "updatedAt" : new Date()
      },
      {
        
        "itemId": 14,
        "name": "Kuah Kari",
        "createdAt" : new Date(),
        "updatedAt" : new Date()
      },
      {
        
        "itemId": 14,
        "name": "Daging Sapi",
        "createdAt" : new Date(),
        "updatedAt" : new Date()
      },
      
      

    ], {})
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Items', null, {})
    await queryInterface.bulkDelete('Categories', null, {})
    await queryInterface.bulkDelete('Ingredients', null, {})
  }
};
