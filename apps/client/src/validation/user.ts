import z from "zod";

export const createUserSchema = z.object({
  // تصحيح الخطأ الإملائي من crearte إلى create
  fullName: z.string().min(3, "الرجاء ادخال اسم الموظف بالكامل"),
  username: z.string().min(3, "الرجاء ادخال اسم المستخدم ويجب ان يكون فريد"),
  phone: z.string().regex(/^01[0-2,5]\d{8}$/, "رقم الهاتف غير صحيح (مثال: 01012345678)"),

  // Salary: في الـ Inputs غالباً القيمة بتيجي String، فبنستخدم coerce لتحويلها لرقم تلقائياً
  salary: z.coerce.number().min(0, "المرتب لا يمكن أن يكون بالسالب"),

  // كلمة السر ضرورية عند الإنشاء
  password: z.string().min(6, "كلمة السر يجب أن لا تقل عن 6 أحرف"),

  // مهم جداً: الـ BranchId لأن الموظف لازم يتبع فرع
  branchId: z.string().min(1, "الرجاء اختيار الفرع التابع له الموظف"),
});
export const editUserSchema = createUserSchema.extend({
  // نجعل الباسورد اختيارياً أو نحذفه
  password: z.string().optional(),
  // نضيف حقل الحالة لأنه موجود في صفحة التعديل
  status: z.boolean().optional(),
});

export const loginSchema = z.object({
  username: z.string().min(1, "اسم المستخدم مطلوب"),
  password: z.string().min(1, "كلمة المرور مطلوبة"),
});

export type EditUserInput = z.infer<typeof editUserSchema>;
export type CreateUserInput = z.infer<typeof createUserSchema>;
// @/validation/user.ts

// استخراج النوع (Type) لاستخدامه في React Hook Form
export type LoginInput = z.infer<typeof loginSchema>;

export const updatePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "كلمة المرور الحالية مطلوبة"),
    newPassword: z.string().min(6, "كلمة المرور الجديدة يجب أن تكون 6 أحرف على الأقل"),
    confirmPassword: z.string().min(6, "تأكيد كلمة المرور مطلوب"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "كلمات المرور الجديدة غير متطابقة",
    path: ["confirmPassword"], // مكان ظهور الخطأ
  })
  .refine((data) => data.currentPassword !== data.newPassword, {
    message: "كلمة المرور الجديدة يجب أن تختلف عن الحالية",
    path: ["newPassword"],
  });

export type UpdatePasswordInput = z.infer<typeof updatePasswordSchema>;
