// types/user.interface.ts

export type UserRole = "ADMIN" | "SALES";
export type UserStatus = "ACTIVE" | "NOT_ACTIVE";

export interface IUser {
  id: string;
  fullName: string;
  username: string;
  phone: string;
  salary: number;
  role: UserRole;
  status: UserStatus;

  // لربط بيانات الفرع كاملة (لو الباك إند باعت include: branch)
  branchId: string; // ده الـ ID (String)
  branch?: {
    // ده الكائن اللي جاي من الـ include
    id: string;
    name: string;
  };

  createdAt: string | Date;
  updatedAt?: string | Date;
}

/**
 * البيانات المطلوبة لإنشاء موظف جديد
 * نستخدم Omit لحذف الحقول التي يولدها السيرفر تلقائياً
 * ونضيف الباسورد لأنه إجباري عند الإنشاء
 */
export interface ICreateUserInput extends Omit<IUser, "id" | "createdAt" | "updatedAt" | "branch"> {
  password?: string;
}

/**
 * البيانات المطلوبة لتعديل موظف
 * نجعل كل الحقول اختيارية (Partial) مع بقاء الـ id إجباري
 */

export interface IUpdateUserInput extends Omit<Partial<ICreateUserInput>, "status"> {
  // هنا بنقول لتايب سكريبت: "احذف تعريف status القديم، وخليه يقبل النوعين دول هنا"
  status?: UserStatus | boolean;
}
/**
 * البيانات المطلوبة لتسجيل الدخول
 */
export interface ILoginInput {
  username: string;
  password: string;
}

export interface ILoginResponse {
  user: IUser;
  token: string;
}

export interface IUpdatePasswordInput {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}
