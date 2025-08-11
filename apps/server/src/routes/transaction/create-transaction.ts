import { TransactionType } from "@prisma/client";
import type { FastifyPluginCallbackZod } from "fastify-type-provider-zod";
import z from "zod";
import { prisma } from "../../lib/prisma.ts";

export const createTransactionRoute: FastifyPluginCallbackZod = (app) => {
  app.post(
    "/transaction/new/:storeId",
    {
      schema: {
        tags: ["Transaction"],
        summary: "Create a new transaction for Store",
        params: z.object({
          storeId: z.string(),
        }),
        body: z.object({
          type: z.enum(TransactionType),
          amount: z.number().positive(),
          dateTime: z.string().datetime(),
        }),
      },
    },
    async (request, reply) => {
      const { storeId } = request.params;
      const { type, amount, dateTime } = request.body;

      const storeFromId = await prisma.store.findUnique({
        where: {
          id: storeId,
        },
      });

      if (!storeFromId) {
        return reply.status(404).send({ message: "Loja nao encontrada" });
      }

      const transaction = await prisma.transaction.create({
        data: {
          storeId,
          type,
          amount,
          dateTime: new Date(dateTime),
        },
      });

      const balance = await prisma.balance.update({
        where: {
          id: storeId,
        },
        data: {
          balance: {
            increment: type === TransactionType.INCOME ? amount : -amount,
          },
          updatedAt: new Date(),
        },
      });

      return reply.status(201).send({
        transaction: {
          type: transaction.type,
          store: transaction.storeId,
          amount: transaction.amount,
        },
        balance: {
          inCash: balance.balance,
        },
      });
    }
  );
};
