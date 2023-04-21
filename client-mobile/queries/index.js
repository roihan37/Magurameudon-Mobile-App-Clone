import { gql } from "@apollo/client";

export const GET_ITEMS = gql`
query Query {
    getAllItems {
      id
      name
      description
      price
      imgUrl
      authorId
      categoryId
      UserMongoId
      Category {
        id
        name
      }
      Ingredients {
        id
        itemId
        name
      }
      user {
        id
        username
        email
      }
    }
  }
`;


export const GET_ITEMS_OURMENU = gql`
query GetAllItems {
    getAllItems {
      id
      name
      description
      price
      imgUrl
      authorId
      categoryId
      UserMongoId
      Category {
        name
        id
      }
      Ingredients {
        id
        itemId
        name
      }
      user {
        id
        username
        email
      }
    }
  }
`;

export const GET_ITEM_BYID= gql`
query GetItemById($getItemById: Int) {
    getItemById(id: $getItemById) {
      user {
        id
        username
        email
      }
      id
      name
      description
      price
      imgUrl
      authorId
      categoryId
      UserMongoId
      Category {
        id
        name
      }
      Ingredients {
        id
        itemId
        name
      }
    }
  }
`