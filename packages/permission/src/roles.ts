import { configureRBAC } from "./rbac";

const roles = {
  superadmin: {
    can: ["network:*", "store:*", "user:*", "permissions:*"],
    inherits: ["user"],
  },
  admin: {
    can: [
      "network:create",
      "network:edit",
      "store:create",
      "store:edit",
      "products:*",
      "clients:*",
      "animals:*",
      "appointments:*",
      "sales:*",
    ],
  },
  employee: {
    can: ["products:*", "clients:*", "animals:*", "appointments:*", "sales:*"],
  },
};

export const RBAC = configureRBAC(roles);
