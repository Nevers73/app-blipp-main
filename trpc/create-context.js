// create-context.js

import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";
import { sessionsStorage } from "../storage/sessions-storage.js";
import { usersStorage } from "../storage/users-storage.js";

// Crée le contexte pour TRPC
export const createContext = async (opts) => {
  const sessionId = opts.req.headers.get("x-session-id") || "";
  const userId = sessionId ? sessionsStorage.getUserId(sessionId) : undefined;
  const user = userId ? usersStorage.getById(userId) : undefined;

  return {
    req: opts.req,
    sessionId,
    userId,
    user,
  };
};

const t = initTRPC.context().create({
  transformer: superjson,
});

// Middleware pour utilisateur authentifié
const isAuthenticated = t.middleware(({ ctx, next }) => {
  if (!ctx.user || !ctx.userId) {
    throw new TRPCError({ code: "UNAUTHORIZED", message: "Not authenticated" });
  }
  return next({
    ctx: {
      ...ctx,
      user: ctx.user,
      userId: ctx.userId,
    },
  });
});

// Middleware pour admin
const isAdmin = t.middleware(({ ctx, next }) => {
  if (!ctx.user || !ctx.userId) {
    throw new TRPCError({ code: "UNAUTHORIZED", message: "Not authenticated" });
  }
  if (ctx.user.role !== "admin") {
    throw new TRPCError({ code: "FORBIDDEN", message: "Admin access required" });
  }
  return next({
    ctx: {
      ...ctx,
      user: ctx.user,
      userId: ctx.userId,
    },
  });
});

// Export TRPC
export const createTRPCRouter = t.router;
export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(isAuthenticated);
export const adminProcedure = t.procedure.use(isAdmin);
