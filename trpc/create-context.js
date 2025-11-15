import { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";
import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";
import { sessionsStorage } from "@/backend/storage/sessions-storage";
import { usersStorage } from "@/backend/storage/users-storage";
import { Utilisateur } from "@/types";

export const createContext = async (opts: FetchCreateContextFnOptions) => {
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

export type Context = Awaited<ReturnType<typeof createContext>>;

const t = initTRPC.context<Context>().create({
  transformer: superjson,
});

const isAuthenticated = t.middleware(({ ctx, next }) => {
  if (!ctx.user || !ctx.userId) {
    throw new TRPCError({ code: "UNAUTHORIZED", message: "Not authenticated" });
  }
  return next({
    ctx: {
      ...ctx,
      user: ctx.user as Utilisateur,
      userId: ctx.userId,
    },
  });
});

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
      user: ctx.user as Utilisateur,
      userId: ctx.userId,
    },
  });
});

export const createTRPCRouter = t.router;
export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(isAuthenticated);
export const adminProcedure = t.procedure.use(isAdmin);
