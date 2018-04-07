import React from "react";
import { Navbar, NavbarBrand, Nav, NavItem } from "reactstrap";
import { Link } from "react-router-dom";
import classnames from "classnames";
import CartBadge from "./CartBadge";

export default class Header extends React.Component {
  render() {
    const { location: { pathname } } = this.props;
    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">Apollo Store</NavbarBrand>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <Link
                className={classnames("nav-link", {
                  active: pathname === "/products"
                })}
                to="/products"
              >
                Products
              </Link>
            </NavItem>
            <NavItem>
              <Link
                className={classnames("nav-link", {
                  active: pathname === "/cart"
                })}
                to="/cart"
              >
                Cart <CartBadge />
              </Link>
            </NavItem>
          </Nav>
        </Navbar>
      </div>
    );
  }
}
