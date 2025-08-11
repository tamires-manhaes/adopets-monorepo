import type { FastifyPluginCallbackZod } from "fastify-type-provider-zod";
import z from "zod";
import { prisma } from "../../lib/prisma.ts";

export const getTransactionsByStoreRoute: FastifyPluginCallbackZod = (app) => {
  app.get(
    "/transaction/store/:storeId",
    {
      schema: {
        tags: ["Transaction"],
        summary: "Get all transactions for a specific store",
        params: z.object({
          storeId: z.string(),
        }),
      },
    },
    async (request, reply) => {
      const { storeId } = request.params;

      const transactions = await prisma.transaction.findMany({
        where: {
          storeId,
        },
        include: {
          store: true,
        },
      });

      if (transactions.length === 0) {
        return reply
          .status(404)
          .send({ message: "No transactions found for this store" });
      }

      return reply.status(200).send(transactions);
    }
  );
};
