import type { FastifyPluginCallbackZod } from "fastify-type-provider-zod";
import z from "zod";
import { prisma } from "../../lib/prisma.ts";

export const createProductRoute: FastifyPluginCallbackZod = (app) => {
  app.post(
    "/product/:storeId",
    {
      schema: {
        tags: ["Product"],
        summary: "Create a new product",
        params: z.object({
          storeId: z.string(),
        }),
        body: z.object({
          name: z.string(),
          description: z.string(),
          category: z.string(),
          price: z.number(),
          stock: z.number(),
          expirationDate: z.iso.datetime(),
        }),
      },
    },
    async (request, reply) => {
      const { storeId } = request.params;
      const { name, description, price, stock, category, expirationDate } =
        request.body;

      const storeWithID = await prisma.store.findUnique({
        where: {
          id: storeId,
        },
      });

      if (!storeWithID) {
        return reply.status(404).send({ message: "Loja nao encontrada" });
      }

      const newProduct = await prisma.product.create({
        data: {
          storeId,
          name,
          description,
          price,
          stock,
          category,
          expirationDate,
        },
      });

      if (!newProduct) {
        return reply.status(500).send({ message: "Error criando produto" });
      }

      return reply.status(201).send(newProduct);
    },
  );
};
