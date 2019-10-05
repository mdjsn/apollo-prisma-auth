import { hash, compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

import { APP_SECRET, Context } from "../../utils/auth";

export const mutation = {
  async signup(parent, { email, password, name }, ctx: Context, info) {
    const hashedPassword = await hash(password, 10);
    const user = await ctx.prisma.createUser({
      email,
      name,
      password: hashedPassword
    });
    return {
      token: sign({ userId: user.id }, APP_SECRET),
      user
    };
  },

  async login(parent, { email, password }, ctx: Context, info) {
    const user = await ctx.prisma.user({ email });
    if (!user) {
      throw new Error(`No user found for email: ${email}`);
    }
    const passwordValid = await compare(password, user.password);
    if (!passwordValid) {
      throw new Error("Invalid password");
    }
    return {
      token: sign({ userId: user.id }, APP_SECRET),
      user
    };
  },

};
