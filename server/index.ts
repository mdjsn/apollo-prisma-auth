// const express = require("express");
const { ApolloServer } = require('apollo-server-lambda')

import { prisma } from "../src/generated/prisma-client";
import resolvers from "../src/resolvers";
import schema from "../src/schema";

const server = new ApolloServer({
  playground: true,
  introspection: true,
  typeDefs: schema,
  resolvers,
  context: request => {
    return {
      ...request,
      prisma,
    };
  }
});

export const handler = server.createHandler({
	cors: {
		origin: '*',
		credentials: true,
	}
})