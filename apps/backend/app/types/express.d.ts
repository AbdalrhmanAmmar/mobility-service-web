import { User } from "../packages/db/prisma/generated/prisma";

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}
