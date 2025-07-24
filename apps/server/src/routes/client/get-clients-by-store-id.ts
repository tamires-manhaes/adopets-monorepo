import type { FastifyPluginCallbackZod } from "fastify-type-provider-zod";
import z from "zod";
import { prisma } from "../../lib/prisma.ts";

export const getClientsByStoreIDRoute: FastifyPluginCallbackZod = (app) => {
  app.get(
    "/clients/store/:storeId",
    {
      schema: {
        tags: ["Client"],
        summary: "Fetch clients by store id",
        params: z.object({
          storeId: z.string(),
        }),
      },
    },
    async (request, reply) => {
      const { storeId } = request.params;

      const clientsByStore = await prisma.client.findMany({
        where: {
          storeId,
        },
      });

      if (clientsByStore.length === 0) {
        return reply
          .status(404)
          .send({ message: "Nenhum client encontrado nessa Loja" });
      }

      return reply.status(200).send(clientsByStore);
    },
  );
};
