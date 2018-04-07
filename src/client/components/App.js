import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./Home";
import Products from "./Products";
import Product from "./Product";
import Cart from "./Cart";
import Header from "./Header";
import { Container } from "reactstrap";

export default class App extends React.Component {
  render() {
    return (
      <div>
        <Header location={this.props.location} />
        <Container className="mt-5">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/products" component={Products} />
            <Route path="/products/:id" component={Product} />
            <Route path="/cart" component={Cart} />
          </Switch>
        </Container>
      </div>
    );
  }
}
