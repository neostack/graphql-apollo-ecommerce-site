import { makeExecutableSchema } from "graphql-tools";
import Resolvers from "../resolvers";
import Schema from "./schema";

export const executableSchema = makeExecutableSchema({
  typeDefs: Schema,
  resolvers: Resolvers
});

export default executableSchema;
