import { Vin } from "@crm/shared";
import { BaseRepository } from "../../../packages/db/base.repository";
import { prisma } from "../../../packages/db/Prisma";

class vinRepoistory extends BaseRepository<Vin> {
  constructor() {
    super(prisma.vin);
  }

  async findOne(condition: Partial<Vin>) {
    return await this.model.findFirst({
      where: condition,
    });
  }
}

export const VinRepository = new vinRepoistory();
