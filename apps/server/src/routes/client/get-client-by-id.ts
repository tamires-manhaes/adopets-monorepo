import type { FastifyPluginCallbackZod } from "fastify-type-provider-zod";
import z from "zod";
import { prisma } from "../../lib/prisma.ts";

export const getClientByIDRoute: FastifyPluginCallbackZod = (app) => {
  app.get(
    "/client/:id",
    {
      schema: {
        tags: ["Client"],
        summary: "Get client by ID",
        params: z.object({
          id: z.string(),
        }),
      },
    },
    async (request, reply) => {
      const { id } = request.params;

      const clientByID = await prisma.client.findUnique({
        where: {
          id,
        },
      });

      if (!clientByID) {
        return reply.status(404).send({ message: "Cliente nao encontrado" });
      }

      return reply.status(200).send(clientByID);
    },
  );
};
