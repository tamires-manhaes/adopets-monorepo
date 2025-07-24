import type { FastifyPluginCallbackZod } from "fastify-type-provider-zod";
import z from "zod";
import { prisma } from "../../lib/prisma.ts";

export const getStoreByIDRoute: FastifyPluginCallbackZod = (app) => {
  app.get(
    "/store/:id",
    {
      schema: {
        tags: ["Store"],
        summary: "Get store by ID",
        params: z.object({
          id: z.string(),
        }),
      },
    },
    async (request, reply) => {
      const { id } = request.params;

      const store = await prisma.store.findUnique({
        where: {
          id,
        },
      });

      if (!store) {
        return reply.status(404).send({ message: "Loja nao encontrada" });
      }

      return reply.status(200).send(store);
    },
  );
};
