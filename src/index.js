import React from "react";
import ReactDOM from "react-dom";
import App from "./client/components/App";
import { ApolloProvider } from "react-apollo";
import apolloClient from "./client/data/apollo-client";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route } from "react-router-dom";

ReactDOM.render(
  <ApolloProvider client={apolloClient}>
    <BrowserRouter>
      <Route path="/" component={App} />
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById("root")
);
