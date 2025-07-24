import type { FastifyPluginCallbackZod } from "fastify-type-provider-zod";
import z from "zod";
import { prisma } from "../../lib/prisma.ts";

export const getProductsByStoreIDRoute: FastifyPluginCallbackZod = (app) => {
  app.get(
    "/products/:storeId",
    {
      schema: {
        tags: ["Product"],
        summary: "Fetch products by Store ID",
        params: z.object({
          storeId: z.string(),
        }),
      },
    },
    async (request, reply) => {
      const { storeId } = request.params;

      const storeByID = await prisma.store.findUnique({
        where: {
          id: storeId,
        },
        include: {
          products: true,
        },
      });

      if (!storeByID) {
        return reply.status(404).send({ message: "Loja nao encontrada" });
      }

      if (!storeByID.products) {
        return reply.status(404).send({ message: "Produtos nao encontrados" });
      }

      return reply.status(201).send(storeByID.products);
    },
  );
};
