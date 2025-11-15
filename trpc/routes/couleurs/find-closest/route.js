import { publicProcedure } from "@/backend/trpc/create-context";
import { couleursStorage } from "@/backend/storage/couleurs-storage";
import { z } from "zod";

export const findClosestCouleur = publicProcedure
  .input(z.object({ hex: z.string() }))
  .query(async ({ input }) => {
    await couleursStorage.initialize();
    console.log(`[tRPC] Finding closest couleur to hex: ${input.hex}`);
    const couleur = couleursStorage.findClosestByHex(input.hex);
    
    if (!couleur) {
      throw new Error("No couleurs available");
    }
    
    return { couleur };
  });
