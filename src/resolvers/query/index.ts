import { getUserId, Context } from "../../utils/auth";

export const query = {
  users: async (parent, args, ctx: Context) => {
    return await ctx.prisma.users();
  },
  me(parent, args, ctx: Context) {
    const userId = getUserId(ctx);
    return ctx.prisma.user({ id: userId });
  },
};
