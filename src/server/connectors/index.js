import pubsub from "../pubnub";

let products = [
  {
    id: 1,
    name: "Macbook",
    description: "Latest Macbook with 16GB ram and Quad core processor",
    price: 65000,
    url: "/img/macbook.jpeg"
  },
  {
    id: 2,
    name: "Keyboard",
    description: "Ergonomic keyboard",
    price: 3000,
    url: "/img/keyboard.jpeg"
  }
];

let cartItems = [];

export function getUser() {
  return {
    id: 1,
    firstName: "John",
    lastName: "Doe"
  };
}

export function getProducts() {
  return products;
}

export function getProduct(id) {
  return products.find(product => product.id === id);
}

export function getCartItem(id) {
  return cartItems.find(c => c.id === id);
}

export function getCartItems() {
  return cartItems;
}

export function addProduct(args) {
  if (products.find(p => p.id === args.id)) {
    throw new Error("Duplicate product id");
  }
  const newProduct = { id: args.id, name: args.name, price: args.price };
  products = [...products, newProduct];
  return newProduct;
}

export function addToCart(args) {
  if (cartItems.find(c => c.productId === args.productId)) {
    throw new Error("Product already in cart");
  }
  const newCartItem = { id: cartItems.length + 1, productId: args.productId };
  cartItems.push(newCartItem);
  pubsub.publish("ON_NEW_CART_ITEM", newCartItem);
  return newCartItem;
}

export function deleteCartItem(args) {
  cartItems = cartItems.filter(c => c.id !== args.id);
  return args.id;
}
