import { publicProcedure } from "@/backend/trpc/create-context";
import { couleursStorage } from "@/backend/storage/couleurs-storage";

export const listCouleurs = publicProcedure.query(async () => {
  await couleursStorage.initialize();
  console.log("[tRPC] Fetching all couleurs");
  const couleurs = couleursStorage.getAll();
  return { couleurs };
});
