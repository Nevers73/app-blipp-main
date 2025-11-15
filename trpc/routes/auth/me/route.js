import { protectedProcedure } from "@/backend/trpc/create-context";

export const me = protectedProcedure.query(({ ctx }) => {
  console.log(`[tRPC] Fetching current user: ${ctx.userId}`);
  return { user: ctx.user };
});
