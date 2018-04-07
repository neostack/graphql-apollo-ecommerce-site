import React from "react";
import { Query } from "react-apollo";
import { ListGroup, ListGroupItem, Alert } from "reactstrap";
import DeleteCartItem from "./DeleteCartItem";
import { CART_ITEMS_QUERY } from "../data/queries";

function CartItem({ cartItem }) {
  return (
    <ListGroupItem>
      <div className="row">
        <div className="col-auto mr-auto">{cartItem.product.name}</div>
        <div className="col-auto">
          <DeleteCartItem id={cartItem.id} />
        </div>
      </div>
    </ListGroupItem>
  );
}

export default class Cart extends React.Component {
  render() {
    return (
      <div>
        <Query query={CART_ITEMS_QUERY}>
          {({ loading, data: { cartItems } }) => {
            if (loading) {
              return <div>Loading...</div>;
            }
            if (!cartItems.length) {
              return <Alert color="primary">Cart is empty</Alert>;
            }
            return (
              <ListGroup>
                {cartItems.map(cartItem => (
                  <CartItem key={cartItem.id} cartItem={cartItem} />
                ))}
              </ListGroup>
            );
          }}
        </Query>
      </div>
    );
  }
}
