import { protectedProcedure } from "@/backend/trpc/create-context";
import { usersStorage } from "@/backend/storage/users-storage";
import { z } from "zod";

export const updateProfile = protectedProcedure
  .input(
    z.object({
      nom: z.string().min(1).optional(),
      telephone: z.string().optional(),
    })
  )
  .mutation(({ ctx, input }) => {
    console.log(`[tRPC] Updating profile for user: ${ctx.userId}`);

    const updatedUser = usersStorage.update(ctx.userId, input);

    return { user: updatedUser };
  });
