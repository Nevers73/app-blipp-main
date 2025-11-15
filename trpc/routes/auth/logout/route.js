import { protectedProcedure } from "@/backend/trpc/create-context";
import { sessionsStorage } from "@/backend/storage/sessions-storage";

export const logout = protectedProcedure.mutation(({ ctx }) => {
  console.log(`[tRPC] Logout user: ${ctx.userId}`);
  
  if (ctx.sessionId) {
    sessionsStorage.delete(ctx.sessionId);
  }

  return { success: true };
});
