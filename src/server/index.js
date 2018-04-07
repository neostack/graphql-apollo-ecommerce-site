import express from "express";
import bodyParser from "body-parser";
import { graphqlExpress, graphiqlExpress } from "apollo-server-express";
import { execute, subscribe } from "graphql";
import { createServer } from "http";
import { SubscriptionServer } from "subscriptions-transport-ws";
import morgan from "morgan";
import schema from "./schema";
const PORT = 8000;

const app = express();

app.use(
  morgan(function(tokens, req, res) {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, "content-length"),
      "-",
      tokens["response-time"](req, res),
      "ms",
      JSON.stringify(req.body, null, 2)
    ].join(" ");
  })
);

app.use(function(req, res, next) {
  setTimeout(next, 500);
});

app.use("/graphql", bodyParser.json(), graphqlExpress({ schema }));

const server = createServer(app);

new SubscriptionServer(
  { schema, execute, subscribe },
  { server, path: "/subscriptions" }
);

app.use(
  "/graphiql",
  graphiqlExpress({
    endpointURL: "/graphql"
  })
);

server.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
