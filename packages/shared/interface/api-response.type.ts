// packages/shared/interface/api-response.ts

export interface IPaginationMeta {
  total: number; // إجمالي عدد السجلات
  page: number; // الصفحة الحالية
  limit: number; // عدد السجلات في الصفحة الواحدة
  totalPages: number; // إجمالي عدد الصفحات
}

export interface BaseResponse {
  success: boolean; // تأكد من توحيدها (success أو status)
  message: string;
}

// الرد الخاص بالقوائم التي تحتوي على ترقيم
export interface PaginatedResponse<T> extends BaseResponse {
  data: T[];
  meta: IPaginationMeta; // هنا الميتا داتا
}

export interface ApiResponse<T> extends BaseResponse {
  data: T;
}
