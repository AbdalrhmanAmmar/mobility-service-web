import { BaseService } from "./base.service";

export interface Vin {
  id: string;
  vin: string;
  make?: string;
  model?: string;
  year?: number;
  color?: string;
  status?: string;
  createdAt: string;
  updatedAt: string;
}

class VinService extends BaseService<Vin> {
  constructor() {
    super("/vin");
  }

  // getAll results are already handled by BaseService
}

export const vinService = new VinService();
