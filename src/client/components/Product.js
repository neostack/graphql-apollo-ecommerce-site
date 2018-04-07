import React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { Media } from "reactstrap";
import AddToCart from "./AddToCart";
import Price from "./Price";

const productQuery = gql`
  query product($id: Int) {
    product(id: $id) {
      id
      name
      description
      price
      url
    }
  }
`;

export default class Product extends React.Component {
  render() {
    const { match: { params: { id } } } = this.props;
    return (
      <Query query={productQuery} variables={{ id }}>
        {({ loading, data: { product } }) => {
          if (loading) return <div>loading</div>;
          return (
            <Media>
              <Media left>
                <img src={product.url} alt="product" />
              </Media>
              <Media body>
                <Media heading>{product.name}</Media>
                <div>{product.description}</div>
                <div>
                  Price: <Price value={product.price} />
                </div>
                <AddToCart product={product} />
              </Media>
            </Media>
          );
        }}
      </Query>
    );
  }
}
