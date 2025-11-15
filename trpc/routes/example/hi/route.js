// trpc/routes/example/hi/route.js

import { z } from "zod";
import { publicProcedure } from "../../../create-context.js";

export const hiRoute = publicProcedure
  .input(z.object({ name: z.string() }))
  .mutation(({ input }) => {
    console.log(`[tRPC] hiRoute called with name: ${input.name}`);
    return {
      hello: input.name,
      date: new Date(),
    };
  });
