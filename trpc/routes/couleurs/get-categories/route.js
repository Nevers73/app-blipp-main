// trpc/routes/couleurs/get-categories/route.js

import { publicProcedure } from "../../../create-context.js";
import { couleursStorage } from "../../../../storage/couleurs-storage.js";

export const getCategories = publicProcedure.query(async () => {
  await couleursStorage.initialize();
  console.log("[tRPC] Fetching categories");
  const categories = couleursStorage.getCategories();
  return { categories };
});
