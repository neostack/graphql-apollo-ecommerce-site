import React from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import { Link } from "react-router-dom";
import { ListGroup, ListGroupItem } from "reactstrap";
import ProductSelect from "./ProductSelect";
import Price from "./Price";

function Product({ product }) {
  return (
    <ListGroupItem>
      <div className="row">
        <div className="col-auto mr-auto">
          <ProductSelect product={product} />
          <Link to={`/products/${product.id}`}>{product.name}</Link>
        </div>
        <div className="col-auto">
          <Price value={product.price} />
        </div>
      </div>
    </ListGroupItem>
  );
}

export class Products extends React.Component {
  render() {
    const { data: { products, loading } } = this.props;
    if (loading) {
      return <div>Loading...</div>;
    }
    return (
      <div>
        Products
        <ListGroup>
          {products.map(product => (
            <Product key={product.id} product={product} />
          ))}
        </ListGroup>
      </div>
    );
  }
}

const productsQuery = gql`
  {
    products {
      id
      name
      price
    }
  }
`;

export default graphql(productsQuery)(Products);
