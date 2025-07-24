import type { FastifyPluginCallbackZod } from "fastify-type-provider-zod";
import z from "zod";
import { prisma } from "../../lib/prisma.ts";

export const createClientRoute: FastifyPluginCallbackZod = (app) => {
  app.post(
    "/client/new/:storeId",
    {
      schema: {
        tags: ["Client"],
        summary: "Create a new client",
        params: z.object({
          storeId: z.string(),
        }),
        body: z.object({
          name: z.string(),
          email: z.string().email(),
          phone: z.string(),
          address: z.string(),
        }),
      },
    },
    async (request, reply) => {
      const { storeId } = request.params;
      const { name, email, phone, address } = request.body;

      const storeFromId = await prisma.store.findUnique({
        where: {
          id: storeId,
        },
      });

      if (!storeFromId) {
        return reply.status(404).send({ message: "Loja nao encontrada" });
      }

      const newClient = await prisma.client.create({
        data: {
          storeId,
          name,
          email,
          phone,
          address,
        },
      });

      if (!newClient) {
        return reply
          .status(500)
          .send({ message: "Erro ao criar novo cliente, tente novamente" });
      }

      return reply.status(200).send(newClient);
    },
  );
};
