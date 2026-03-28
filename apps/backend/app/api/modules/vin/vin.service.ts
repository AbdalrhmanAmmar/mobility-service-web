import { CreateVinDto } from "@crm/shared";
import { VinRepository } from "./vin.repoistory";

export const createVin = (data: CreateVinDto) => {
  return VinRepository.create(data);
};
