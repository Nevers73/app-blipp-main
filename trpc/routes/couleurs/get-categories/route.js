import { publicProcedure } from "@/backend/trpc/create-context";
import { couleursStorage } from "@/backend/storage/couleurs-storage";

export const getCategories = publicProcedure.query(async () => {
  await couleursStorage.initialize();
  console.log("[tRPC] Fetching categories");
  const categories = couleursStorage.getCategories();
  return { categories };
});
