import type { FastifyPluginCallbackZod } from "fastify-type-provider-zod";
import z from "zod";
import { prisma } from "../../lib/prisma.ts";

export const createStoreRoute: FastifyPluginCallbackZod = (app) => {
  app.post(
    "/store/:networkId",
    {
      schema: {
        tags: ["Store"],
        summary: "Create store for network",
        params: z.object({
          networkId: z.string(),
        }),
        body: z.object({
          name: z.string(),
          address: z.string(),
        }),
      },
    },
    async (request, reply) => {
      const { networkId } = request.params;
      const { address, name } = request.body;

      const networdByID = await prisma.network.findUnique({
        where: {
          id: networkId,
        },
      });

      if (!networdByID) {
        return reply.status(404).send({ message: "Rede nao encontrada" });
      }

      const store = await prisma.store.create({
        data: {
          networkId,
          name,
          address,
        },
      });

      if (!store) {
        return reply.status(500).send({ message: "Erro criando Rede" });
      }

      return reply.status(200).send(store);
    },
  );
};
