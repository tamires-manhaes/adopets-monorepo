import type { FastifyPluginCallbackZod } from "fastify-type-provider-zod";
import z from "zod";
import { prisma } from "../../lib/prisma.ts";

export const getProductByIdRoute: FastifyPluginCallbackZod = (app) => {
  app.get(
    "/product/:productId",
    {
      schema: {
        tags: ["Product"],
        summary: "Fetch product By ID",
        params: z.object({
          productId: z.string(),
        }),
      },
    },
    async (request, reply) => {
      const { productId } = request.params;

      const productByID = await prisma.product.findUnique({
        where: {
          id: productId,
        },
      });

      if (!productByID) {
        return reply.status(404).send({ message: "Produto nao encontrado" });
      }

      return reply.status(200).send(productByID);
    },
  );
};
