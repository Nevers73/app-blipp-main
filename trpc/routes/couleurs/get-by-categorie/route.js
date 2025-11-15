import { publicProcedure } from "@/backend/trpc/create-context";
import { couleursStorage } from "@/backend/storage/couleurs-storage";
import { z } from "zod";

export const getCouleursByCategorie = publicProcedure
  .input(z.object({ categorie: z.string() }))
  .query(async ({ input }) => {
    await couleursStorage.initialize();
    console.log(`[tRPC] Fetching couleurs by categorie: ${input.categorie}`);
    const couleurs = couleursStorage.getByCategorie(input.categorie);
    return { couleurs };
  });
