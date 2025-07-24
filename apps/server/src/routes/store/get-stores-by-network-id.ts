import type { FastifyPluginCallbackZod } from "fastify-type-provider-zod";
import z from "zod";
import { prisma } from "../../lib/prisma.ts";

export const getStoresByNetworkIdRoute: FastifyPluginCallbackZod = (app) => {
  app.get(
    "/network/:id/stores",
    {
      schema: {
        tags: ["Network"],
        summary: "Get stores from network by ID",
        params: z.object({
          id: z.string(),
        }),
      },
    },
    async (request, reply) => {
      const { id } = request.params;

      const network = await prisma.network.findUnique({
        where: {
          id,
        },
        include: {
          stores: true,
        },
      });

      if (!network) {
        return reply.status(404).send({ message: "Rede nao encontrada" });
      }

      return reply.status(200).send(network.stores);
    },
  );
};
