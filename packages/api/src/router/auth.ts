import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const authRouter = createTRPCRouter({
  mySubscription: protectedProcedure.query(async ({ ctx }) => {
    const customer = await ctx.db
      .selectFrom("Customer")
      .select(["plan", "endsAt"])
      .where("clerkUserId", "=", ctx.auth.userId)
      .executeTakeFirst();

    if (!customer) return null;

    return { plan: customer.plan ?? null, endsAt: customer.endsAt ?? null };
  }),
  getSession: publicProcedure.query(({ ctx }) => {
    return ctx.auth.session;
  }),
  getSecretMessage: protectedProcedure.query(() => {
    // testing type validation of overridden next-auth Session in @acme/auth package
    return "you can see this secret message!";
  }),
});
