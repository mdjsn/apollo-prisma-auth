const express = require("express");
const { ApolloServer } = require("apollo-server-express");

import schema from "./schema";
import resolvers from "./resolvers";
import { prisma } from "./generated/prisma-client";

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  // middlewares: [permissions],
  context: request => {
    return {
      ...request,
      prisma,
    };
  }
});

const PORT = 4001;
const app = express();
server.applyMiddleware({ app });

app.listen(PORT, () => {
  console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
});
