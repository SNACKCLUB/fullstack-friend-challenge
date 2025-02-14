import { LoginFormData } from "@/components/forms/loginForm";
import { createSession } from "@/lib/session";
import { useApi } from "@/lib/useApi";

export async function signIn(formData: LoginFormData) {
  const response = await useApi.post("/auth/login", formData);
  const token = response.data?.token;

  await createSession(token);
}
