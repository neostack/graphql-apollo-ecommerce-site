export default `
  type User {
    id: Int!
    firstName: String
    lastName: String
  }

  type Product {
    id: Int!
    name: String
    description: String
    price: Int
    url: String
  }

  type CartItem {
    id: Int!
    product: Product
  }

  type Query {
    user: User
    product(id: Int): Product
    products: [Product]
    cartItem(id: Int): CartItem
    cartItems: [CartItem]
  }

  type Mutation {
    deleteCartItem(id: Int): Int
    addProduct(id: Int, name: String, price: Int): Product
    addToCart(productId: Int): CartItem,
  }

  type Subscription {
    onNewCartItem: CartItem
  }
  schema {
    query: Query
    mutation: Mutation
    subscription: Subscription
  }

`;
