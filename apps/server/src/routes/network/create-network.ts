import type { FastifyPluginCallbackZod } from "fastify-type-provider-zod";
import { z } from "zod/v4";
import { prisma } from "../../lib/prisma.ts";

export const createNetworkRoute: FastifyPluginCallbackZod = (app) => {
  app.post(
    "/network/new",
    {
      schema: {
        tags: ["User"],
        summary: "Create a new user",
        body: z.object({
          name: z.string(),
          ownerId: z.string(),
        }),
      },
    },
    async (request, reply) => {
      const { name, ownerId } = request.body;

      const networkWithSameOwner = await prisma.network.findFirst({
        where: {
          ownerId,
        },
      });

      if (networkWithSameOwner) {
        return reply
          .status(500)
          .send({ error: "User is already a network owne" });
      }

      const result = await prisma.network.create({
        data: {
          name,
          ownerId,
        },
      });

      if (!result) {
        return reply.status(500).send({ error: "Failed to create network" });
      }

      return reply.status(201).send({
        network: {
          id: result.id,
          name: result.name,
          ownerId: result.ownerId,
        },
      });
    },
  );
};
