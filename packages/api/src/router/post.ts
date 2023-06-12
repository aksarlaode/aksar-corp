import * as z from "zod";

import { genId } from "@aksar/db";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const postRouter = createTRPCRouter({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.db
      .selectFrom("Post")
      .selectAll()
      .orderBy("id", "desc")
      .execute();
  }),

  byId: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db
        .selectFrom("Post")
        .selectAll()
        .where("Post.id", "=", input.id)
        .executeTakeFirst();
    }),

  create: protectedProcedure
    .input(
      z.object({
        title: z.string().min(3).max(128),
        // TODO: Type this properly from editorjs block types?
        content: z.any().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const id = genId();
      await ctx.db
        .insertInto("Post")
        .values({
          id,
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          content: input.content,
          title: input.title,
          userId: ctx.auth.userId,
        })
        .execute();

      return ctx.db
        .selectFrom("Post")
        .selectAll()
        .where("Post.id", "=", id)
        .execute();
    }),

  update: protectedProcedure
    .input(
      z.object({
        title: z.string().min(3).max(128).optional(),
        // TODO: Type this properly from editorjs block types?
        content: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const id = genId();
      await ctx.db
        .updateTable("Post")
        .set({
          id,
          title: input.title,
          content: input.content,
          userId: ctx.auth.userId,
        })
        .where("Post.id", "=", id)
        .execute();

      return ctx.db
        .selectFrom("Post")
        .selectAll()
        .where("Post.id", "=", id)
        .execute();
    }),

  delete: protectedProcedure.input(z.string()).mutation(({ ctx, input }) => {
    return ctx.db.deleteFrom("Post").where("Post.id", "=", input).execute();
  }),
});
