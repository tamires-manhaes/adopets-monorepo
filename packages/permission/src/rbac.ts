import rbac from "@rbac/rbac";

const rbacConfig = {
  enableLogger: false,
};

export const configureRBAC = rbac(rbacConfig);
