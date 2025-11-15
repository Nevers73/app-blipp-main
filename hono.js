// hono.js
import { Hono } from "hono";
import { trpcServer } from "@hono/trpc-server";
import { cors } from "hono/cors";
import { appRouter } from "./trpc/app-router.js";
import { createContext } from "./trpc/create-context.js";

const app = new Hono();

// Activer CORS pour toutes les routes
app.use("*", cors());

// TRPC endpoint
app.use(
  "/trpc/*",
  trpcServer({
    endpoint: "/api/trpc",
    router: appRouter,
    createContext,
  })
);

// Route racine pour tester si l'API tourne
app.get("/", (c) => {
  return c.json({ status: "ok", message: "API is running" });
});

export default app;
