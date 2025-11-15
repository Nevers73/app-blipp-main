import { publicProcedure } from "@/backend/trpc/create-context";
import { usersStorage } from "@/backend/storage/users-storage";
import { sessionsStorage } from "@/backend/storage/sessions-storage";
import { z } from "zod";

export const login = publicProcedure
  .input(
    z.object({
      email: z.string().email(),
    })
  )
  .mutation(({ input }) => {
    console.log(`[tRPC] Login attempt: ${input.email}`);

    const user = usersStorage.getByEmail(input.email);
    if (!user) {
      throw new Error("User not found");
    }

    const sessionId = sessionsStorage.create(user.id);

    return {
      user,
      sessionId,
    };
  });
