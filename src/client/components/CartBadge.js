import React from "react";
import { Badge } from "reactstrap";
import { CART_ITEMS_QUERY } from "../data/queries";
import { graphql } from "react-apollo";
import gql from "graphql-tag";

class CartBadge extends React.Component {
  componentDidMount() {
    this.props.subscribeToNewCartItem();
  }
  render() {
    console.log(this.props);
    const { data: { loading, cartItems } } = this.props;
    if (loading) {
      return null;
    }
    return cartItems.length ? (
      <Badge color="dark">{cartItems.length}</Badge>
    ) : null;
  }
}

const cartItemSubscribe = gql`
  subscription {
    onNewCartItem {
      id
      product {
        id
        name
        price
      }
    }
  }
`;

export default graphql(CART_ITEMS_QUERY, {
  props: props => ({
    ...props,
    subscribeToNewCartItem: params => {
      return props.data.subscribeToMore({
        document: cartItemSubscribe,
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) {
            return prev;
          }
          const newCartItem = subscriptionData.data.onNewCartItem;
          if (prev.cartItems.find(cartItem => cartItem.id === newCartItem.id)) {
            return prev;
          }
          return {
            ...prev,
            cartItems: [...prev.cartItems, newCartItem]
          };
        }
      });
    }
  })
})(CartBadge);
