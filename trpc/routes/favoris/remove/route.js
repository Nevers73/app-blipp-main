import { protectedProcedure } from "@/backend/trpc/create-context";
import { usersStorage } from "@/backend/storage/users-storage";
import { z } from "zod";

export const removeFavori = protectedProcedure
  .input(z.object({ couleurId: z.string() }))
  .mutation(({ ctx, input }) => {
    console.log(`[tRPC] Removing favori ${input.couleurId} for user ${ctx.userId}`);
    
    const user = usersStorage.removeFavori(ctx.userId, input.couleurId);
    
    return { user };
  });
