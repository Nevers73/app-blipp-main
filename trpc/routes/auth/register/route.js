import { publicProcedure } from "@/backend/trpc/create-context";
import { usersStorage } from "@/backend/storage/users-storage";
import { sessionsStorage } from "@/backend/storage/sessions-storage";
import { z } from "zod";

export const register = publicProcedure
  .input(
    z.object({
      nom: z.string().min(1),
      email: z.string().email(),
      telephone: z.string().optional(),
    })
  )
  .mutation(({ input }) => {
    console.log(`[tRPC] Registering user: ${input.email}`);

    const existingUser = usersStorage.getByEmail(input.email);
    if (existingUser) {
      throw new Error("Email already registered");
    }

    const newUser = usersStorage.create({
      id: `user_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
      nom: input.nom,
      email: input.email,
      telephone: input.telephone || "",
      role: "user",
      favoris: [],
    });

    const sessionId = sessionsStorage.create(newUser.id);

    return {
      user: newUser,
      sessionId,
    };
  });
