import type { UserRole } from "generated/prisma/enums.js";

export type IJWTPayload = {
  email: string;
  role: UserRole;
};
