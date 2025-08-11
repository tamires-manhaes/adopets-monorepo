import { TransactionType } from "@prisma/client";
import type { FastifyPluginCallbackZod } from "fastify-type-provider-zod";
import z from "zod";
import { prisma } from "../../lib/prisma.ts";

export const updateTransactionRoute: FastifyPluginCallbackZod = (app) => {
  app.put(
    "/transaction/update/:transactionId",
    {
      schema: {
        tags: ["Transaction"],
        summary: "Update an existing transaction",
        params: z.object({
          transactionId: z.string(),
        }),
        body: z.object({
          type: z.enum(TransactionType).optional(),
          amount: z.number().positive().optional(),
          dateTime: z.string().datetime().optional(),
        }),
      },
    },
    async (request, reply) => {
      const { transactionId } = request.params;
      const { type, amount, dateTime } = request.body;

      const transaction = await prisma.transaction.findUnique({
        where: {
          id: transactionId,
        },
      });

      if (!transaction) {
        return reply.status(404).send({ message: "Transaction not found" });
      }

      const updatedData = {
        ...(type && { type }),
        ...(amount && { amount }),
        ...(dateTime && { dateTime: new Date(dateTime) }),
      };

      const updatedTransaction = await prisma.transaction.update({
        where: {
          id: transactionId,
        },
        data: updatedData,
      });

      return reply.status(200).send(updatedTransaction);
    }
  );
};
