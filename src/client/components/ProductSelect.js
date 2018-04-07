import React from "react";
import { Button, UncontrolledAlert } from "reactstrap";
import { Mutation, Query } from "react-apollo";
import gql from "graphql-tag";
import { SELECTED_PRODUCTS_QUERY } from "../data/queries";

const TOGGLE_PRODUCT_SELECTION = gql`
  mutation toggleProductSelection($productId: Int) {
    toggleProductSelection(productId: $productId) @client
  }
`;

export default class ProductSelect extends React.Component {
  render() {
    const { product } = this.props;
    console.log(product, "rp");
    return (
      <Query query={SELECTED_PRODUCTS_QUERY}>
        {({ data: { selectedProducts } }) => {
          return (
            <Mutation mutation={TOGGLE_PRODUCT_SELECTION}>
              {toggleProductSelection => {
                return (
                  <input
                    type="checkbox"
                    className="mr-4"
                    checked={selectedProducts.includes(product.id)}
                    onChange={() =>
                      toggleProductSelection({
                        variables: { productId: product.id }
                      })
                    }
                  />
                );
              }}
            </Mutation>
          );
        }}
      </Query>
    );
  }
}
