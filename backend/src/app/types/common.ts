import type { UserRole } from "@prisma/index.js";

export type IJWTPayload = {
  email: string;
  role: UserRole;
};
