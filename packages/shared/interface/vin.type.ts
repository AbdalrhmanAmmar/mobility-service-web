import { z } from "zod";
import { vinSchema } from "../schema/vin";
import { BaseResponse, PaginatedResponse } from "./api-response.type";

export interface Vin {
  id: string;
  vin: string;
  createdAt: Date;
  updatedAt: Date;
}

export type CreateVinDto = z.infer<typeof vinSchema>;
export interface vinResponseDto extends BaseResponse {
  data: Vin;
}
export interface vinListResponseDto extends PaginatedResponse<Vin> {}
