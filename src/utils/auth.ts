const jwt = require("jsonwebtoken");

import { Prisma } from "../generated/prisma-client";

export const APP_SECRET = "secret123";

export interface Context {
  prisma: Prisma;
  request: any;
}

export const getUserId = context => {
  const Authorization = context.event.headers.authorization;
  if (Authorization) {
    const token = Authorization.replace("Bearer ", "");
    const verifiedToken = jwt.verify(token, APP_SECRET);
    return verifiedToken && verifiedToken.userId;
  }
  throw new AuthError();
};

export class AuthError extends Error {
  constructor() {
    super("Not authorized");
  }
}