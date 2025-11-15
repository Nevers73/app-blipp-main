import { protectedProcedure } from "@/backend/trpc/create-context";
import { usersStorage } from "@/backend/storage/users-storage";
import { z } from "zod";

export const addFavori = protectedProcedure
  .input(z.object({ couleurId: z.string() }))
  .mutation(({ ctx, input }) => {
    console.log(`[tRPC] Adding favori ${input.couleurId} for user ${ctx.userId}`);
    
    const user = usersStorage.addFavori(ctx.userId, input.couleurId);
    
    return { user };
  });
