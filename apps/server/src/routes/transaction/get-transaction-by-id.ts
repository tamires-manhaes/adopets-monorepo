import type { FastifyPluginCallbackZod } from "fastify-type-provider-zod";
import z from "zod";
import { prisma } from "../../lib/prisma.ts";

export const getTransactionByIdRoute: FastifyPluginCallbackZod = (app) => {
  app.get(
    "/transaction/:transactionId",
    {
      schema: {
        tags: ["Transaction"],
        summary: "Get a transaction by ID",
        params: z.object({
          transactionId: z.string(),
        }),
      },
    },
    async (request, reply) => {
      const { transactionId } = request.params;

      const transaction = await prisma.transaction.findUnique({
        where: {
          id: transactionId,
        },
        include: {
          store: true,
        },
      });

      if (!transaction) {
        return reply.status(404).send({ message: "Transaction not found" });
      }

      return reply.status(200).send(transaction);
    }
  );
};
