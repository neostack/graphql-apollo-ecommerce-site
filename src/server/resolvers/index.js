import {
  getUser,
  getProducts,
  getProduct,
  addProduct,
  getCartItems,
  getCartItem,
  addToCart,
  deleteCartItem
} from "../connectors";
import pubsub from "../pubnub";

export default {
  CartItem: {
    product(cart, args, ctx) {
      return getProduct(cart.productId);
    }
  },
  Query: {
    user(_, args, ctx) {
      return getUser();
    },
    products(_, args, ctx) {
      return getProducts();
    },
    product(_, args, ctx) {
      return getProduct(args.id);
    },
    cartItem(_, args, ctx) {
      return getCartItem(args.id);
    },
    cartItems(_, args, ctx) {
      return getCartItems();
    }
  },
  Mutation: {
    addProduct(_, args, ctx) {
      return addProduct(args);
    },
    addToCart(_, args, ctx) {
      return addToCart(args);
    },
    deleteCartItem(_, args, ctx) {
      return deleteCartItem(args);
    }
  },
  Subscription: {
    onNewCartItem: {
      resolve(payload) {
        console.log("Subscription", payload);
        return payload;
      },
      subscribe: () => pubsub.asyncIterator("ON_NEW_CART_ITEM")
    }
  }
};
