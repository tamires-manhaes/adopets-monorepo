import type { FastifyInstance } from "fastify";
import fastifyPlugin from "fastify-plugin";
import { UnauthorizedError } from "../routes/_errors/unauthorized-error.ts";

export const auth = fastifyPlugin((app: FastifyInstance) => {
  app.addHook("preHandler", async (request) => {
    request.getCurrentUserId = async () => {
      try {
        const { sub } = await request.jwtVerify<{ sub: string }>();

        return sub;
      } catch {
        throw new UnauthorizedError("Invalid token");
      }
    };
  });
});
