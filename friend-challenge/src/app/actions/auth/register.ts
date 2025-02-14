import { RegisterFormData } from "@/components/forms/registerForm";
import { useApi } from "@/lib/useApi";

export async function registerUser(formData: RegisterFormData) {
  await useApi.post("/auth/register", formData);
}
