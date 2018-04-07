import gql from "graphql-tag";

export const CART_ITEMS_QUERY = gql`
  {
    cartItems {
      id
      product {
        id
        name
        price
      }
    }
  }
`;

export const SELECTED_PRODUCTS_QUERY = gql`
  {
    selectedProducts @client
  }
`;
