import { CreateVinDto } from "@crm/shared";
import { VinRepository } from "./vin.repoistory";

export const createVin = async (data: CreateVinDto) => {
  // تحقق الأول هل موجودة
  const existing = await VinRepository.findOne({ vin: data.vin });
  if (existing) {
    throw new Error("VIN already exists");
  }
  return VinRepository.create(data);
};

export const getAllVins = () => {
  return VinRepository.findAll();
};
