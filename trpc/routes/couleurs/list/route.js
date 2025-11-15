import { publicProcedure } from "../../../create-context.js";
import { couleursStorage } from "../../../../storage/couleurs-storage.js";

export const listCouleurs = publicProcedure.query(async () => {
  await couleursStorage.initialize();
  console.log("[tRPC] Fetching all couleurs");
  const couleurs = couleursStorage.getAll();
  return { couleurs };
});
