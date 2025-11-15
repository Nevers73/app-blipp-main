import { createTRPCRouter } from "./create-context";
import hiRoute from "./routes/example/hi/route";
import { listCouleurs } from "./routes/couleurs/list/route";
import { getCouleurById } from "./routes/couleurs/get-by-id/route";
import { getCouleursByCategorie } from "./routes/couleurs/get-by-categorie/route";
import { searchCouleurs } from "./routes/couleurs/search/route";
import { findClosestCouleur } from "./routes/couleurs/find-closest/route";
import { getCategories } from "./routes/couleurs/get-categories/route";
import { register } from "./routes/auth/register/route";
import { login } from "./routes/auth/login/route";
import { logout } from "./routes/auth/logout/route";
import { me } from "./routes/auth/me/route";
import { updateProfile } from "./routes/auth/update-profile/route";
import { addFavori } from "./routes/favoris/add/route";
import { removeFavori } from "./routes/favoris/remove/route";
import { listFavoris } from "./routes/favoris/list/route";
import { uploadCSV } from "./routes/admin/upload-csv/route";

export const appRouter = createTRPCRouter({
  example: createTRPCRouter({
    hi: hiRoute,
  }),
  couleurs: createTRPCRouter({
    list: listCouleurs,
    getById: getCouleurById,
    getByCategorie: getCouleursByCategorie,
    search: searchCouleurs,
    findClosest: findClosestCouleur,
    getCategories: getCategories,
  }),
  auth: createTRPCRouter({
    register,
    login,
    logout,
    me,
    updateProfile,
  }),
  favoris: createTRPCRouter({
    add: addFavori,
    remove: removeFavori,
    list: listFavoris,
  }),
  admin: createTRPCRouter({
    uploadCSV,
  }),
});

export type AppRouter = typeof appRouter;
