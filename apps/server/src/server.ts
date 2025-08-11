import { env } from "@adopets/env";
import { fastifyCors } from "@fastify/cors";
import fastifyJwt from "@fastify/jwt";
import { fastifyMultipart } from "@fastify/multipart";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUI from "@fastify/swagger-ui";
import { fastify } from "fastify";
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from "fastify-type-provider-zod";

import { errorHandler } from "./error-handler.ts";
import { loginWithPasswordRoute } from "./routes/auth/login-with-password.ts";
import { requestPasswordRecoverRoute } from "./routes/auth/request-password-recover.ts";
import { resetPasswordRoute } from "./routes/auth/reset-password.ts";
import { createClientRoute } from "./routes/client/create-client.ts";
import { getClientByIDRoute } from "./routes/client/get-client-by-id.ts";
import { getClientsByStoreIDRoute } from "./routes/client/get-clients-by-store-id.ts";
import { healthCheckRoute } from "./routes/health/status.ts";
import { createNetworkRoute } from "./routes/network/create-network.ts";
import { getNetworkByIDRoute } from "./routes/network/get-network-by-id.ts";
import { createStoreRoute } from "./routes/store/create-store.ts";
import { getStoreByIDRoute } from "./routes/store/get-store-by-id.ts";
import { getStoresByNetworkIdRoute } from "./routes/store/get-stores-by-network-id.ts";
import { createTransactionRoute } from "./routes/transaction/create-transaction.ts";
import { getTransactionByIdRoute } from "./routes/transaction/get-transaction-by-id.ts";
import { getTransactionsByStoreRoute } from "./routes/transaction/get-transactions-by-store.ts";
import { updateTransactionRoute } from "./routes/transaction/update-transaction.ts";
import { createUserRoute } from "./routes/user/create-user.ts";
import { getAllUsersRoute } from "./routes/user/get-all-users.ts";
import { getUserByIDRoute } from "./routes/user/get-by-id.ts";

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.setErrorHandler(errorHandler);

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: "adopets API",
      description: "adopets API documentation",
      version: "1.0.0",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  transform: jsonSchemaTransform,
});

app.register(fastifySwaggerUI, {
  routePrefix: "/docs",
});

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
});

app.register(fastifyCors, {
  origin: "*",
});

app.register(fastifyMultipart);

app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);

// ROUTES
app.register(healthCheckRoute);

// -------- AUTH ---------
app.register(loginWithPasswordRoute);
app.register(resetPasswordRoute);
app.register(requestPasswordRecoverRoute);

// -------- USER --------
app.register(getAllUsersRoute);
app.register(createUserRoute);
app.register(getUserByIDRoute);

// -------- STORE --------
app.register(createStoreRoute);
app.register(getStoresByNetworkIdRoute);
app.register(getStoreByIDRoute);

// -------- CLIENT --------
app.register(createClientRoute);
app.register(getClientsByStoreIDRoute);
app.register(getClientByIDRoute);

// -------- NETWORK --------
app.register(createNetworkRoute);
app.register(getNetworkByIDRoute);

// -------- TRANSACTION --------
app.register(createTransactionRoute);
app.register(getTransactionByIdRoute);
app.register(getTransactionsByStoreRoute);
app.register(updateTransactionRoute);

app.listen({ port: env.PORT }).then(() => {
  console.log(`HTTP Server running at http://localhost:${env.PORT}`);
});
