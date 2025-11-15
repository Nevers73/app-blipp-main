import { publicProcedure } from "@/backend/trpc/create-context";
import { couleursStorage } from "@/backend/storage/couleurs-storage";
import { z } from "zod";

export const searchCouleurs = publicProcedure
  .input(z.object({ query: z.string() }))
  .query(async ({ input }) => {
    await couleursStorage.initialize();
    console.log(`[tRPC] Searching couleurs with query: ${input.query}`);
    const couleurs = couleursStorage.search(input.query);
    return { couleurs };
  });
