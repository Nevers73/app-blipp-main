import { publicProcedure } from "@/backend/trpc/create-context";
import { couleursStorage } from "@/backend/storage/couleurs-storage";
import { z } from "zod";

export const getCouleurById = publicProcedure
  .input(z.object({ id: z.string() }))
  .query(async ({ input }) => {
    await couleursStorage.initialize();
    console.log(`[tRPC] Fetching couleur by id: ${input.id}`);
    const couleur = couleursStorage.getById(input.id);
    
    if (!couleur) {
      throw new Error(`Couleur with id ${input.id} not found`);
    }
    
    return { couleur };
  });
