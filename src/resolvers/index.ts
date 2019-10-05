import { query } from "./query";
import { mutation } from "./mutation";

export default {
  Mutation: {
    ...mutation
  },
  Query: {
    ...query
  },
};