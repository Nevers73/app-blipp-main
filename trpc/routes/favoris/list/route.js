import { protectedProcedure } from "@/backend/trpc/create-context";
import { couleursStorage } from "@/backend/storage/couleurs-storage";

export const listFavoris = protectedProcedure.query(({ ctx }) => {
  console.log(`[tRPC] Fetching favoris for user ${ctx.userId}`);
  
  const favoriIds = ctx.user.favoris;
  const couleurs = favoriIds
    .map((id) => couleursStorage.getById(id))
    .filter((c) => c !== undefined);
  
  return { couleurs };
});
