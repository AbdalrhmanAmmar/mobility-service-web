import { Vin } from "@crm/shared";
import { BaseRepository } from "../../../packages/db/base.repository";
import { prisma } from "../../../packages/db/Prisma";

class vinRepoistory extends BaseRepository<Vin> {
  constructor() {
    super(prisma.vin);
  }
}

export const VinRepository = new vinRepoistory();
