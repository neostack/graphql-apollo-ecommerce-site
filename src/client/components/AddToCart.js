import React from "react";
import { Button, UncontrolledAlert } from "reactstrap";
import { Mutation, Query } from "react-apollo";
import gql from "graphql-tag";
import { CART_ITEMS_QUERY } from "../data/queries";

const ADD_TO_CART = gql`
  mutation addToCart($productId: Int) {
    addToCart(productId: $productId) {
      id
      product {
        id
        name
        price
      }
    }
  }
`;

function addCartItemToCache(cache, { data: { addToCart } }) {
  const { cartItems } = cache.readQuery({ query: CART_ITEMS_QUERY });
  if (cartItems.find(cartItem => cartItem.id === addToCart.id)) {
    return null;
  }
  const newCartItems = cartItems.concat(addToCart);

  cache.writeQuery({
    query: CART_ITEMS_QUERY,
    data: { cartItems: newCartItems }
  });
}

export default class AddToCart extends React.Component {
  render() {
    const { product } = this.props;
    console.log(product, "rp");
    return (
      <Query query={CART_ITEMS_QUERY}>
        {({ loading, data: { cartItems } }) => {
          if (loading) {
            return null;
          }
          return (
            <Mutation
              mutation={ADD_TO_CART}
              update={addCartItemToCache}
              optimisticResponse={{
                __typename: "Mutation",
                addToCart: {
                  __typename: "CartItem",
                  id: cartItems.length,
                  product
                }
              }}
            >
              {(addToCart, { error }) => {
                return (
                  <div>
                    <Button
                      className="mt-4"
                      color="primary"
                      onClick={() =>
                        addToCart({ variables: { productId: product.id } })
                      }
                    >
                      Add to cart
                    </Button>
                    {error ? (
                      <UncontrolledAlert className="mt-2" color="danger">
                        {error.message}
                      </UncontrolledAlert>
                    ) : null}
                  </div>
                );
              }}
            </Mutation>
          );
        }}
      </Query>
    );
  }
}
