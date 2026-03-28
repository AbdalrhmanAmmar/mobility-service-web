export class BaseRepository<T> {
  constructor(protected model: any) {}

  // جلب كل البيانات
  async findAll(orderBy: any = { createdAt: "desc" }) {
    return await this.model.findMany({
      orderBy,
    });
  }

  async findById(id: string, include?: any) {
    return (await this.model.findUnique({
      where: { id },
      include,
    })) as T | null;
  }

  async create(data: any) {
    return await this.model.create({
      data,
    });
  }

  async update(id: string, data: any) {
    return await this.model.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return await this.model.delete({
      where: { id },
    });
  }

  async deleteMany(where: any) {
    return await this.model.deleteMany({
      where,
    });
  }

  async findManyPaginated({
    page = 1,
    limit = 10,
    where = {},
    include = undefined,
    orderBy = { createdAt: "desc" },
  }: {
    page?: number;
    limit?: number;
    where?: any;
    include?: any;
    orderBy?: any;
  }) {
    const skip = (page - 1) * limit;

    // تشغيل الاستعلامين في نفس الوقت لسرعة الأداء
    const [data, total] = await Promise.all([
      this.model.findMany({
        where,
        skip,
        take: limit,
        include,
        orderBy,
      }),
      this.model.count({ where }),
    ]);

    return {
      data: data as T[],
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findForExport(where: any = {}, orderBy: any = { createdAt: "desc" }) {
    return await this.model.findMany({
      where,
      orderBy,
    });
  }
}
