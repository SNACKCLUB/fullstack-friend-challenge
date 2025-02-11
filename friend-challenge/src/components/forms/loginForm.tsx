"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "@/app/actions/auth/signIn";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

import InputGroup from "../ui/input-group";
import { useState } from "react";

const loginFormSchema = z.object({
  email: z
    .string()
    .nonempty("Email is required!")
    .email("Email is invalid!")
    .trim(),
  password: z
    .string()
    .nonempty("Password is required!")
    .min(8, "Password must have at least 8 characters")
    .trim(),
});

export type LoginFormData = z.infer<typeof loginFormSchema>;

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
  });

  const { toast } = useToast();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit = async (data: LoginFormData) => {
    try {
      setLoading(true);
      await signIn(data);
      router.push("/dashboard");

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast({
        variant: "destructive",
        title: "User not found or invalid data!",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 w-[80%] text-sm"
    >
      <InputGroup>
        <InputGroup.Label htmlFor="email">Email</InputGroup.Label>
        <input
          type="email"
          placeholder="Your email"
          required
          {...register("email")}
        />
        {errors.email && (
          <InputGroup.ErrorLabel message={errors.email.message} />
        )}
      </InputGroup>
      <InputGroup>
        <InputGroup.Label htmlFor="password">Password</InputGroup.Label>
        <input
          type="password"
          placeholder="Your password"
          required
          {...register("password")}
        />
        {errors.password && (
          <InputGroup.ErrorLabel message={errors.password.message} />
        )}
      </InputGroup>
      <div className="py-4">
        <button
          className="bg-gray-800 w-full h-[40px] rounded-md outline-none hover:outline-red-400"
          type="submit"
          disabled={loading}
        >
          {loading ? "logging in..." : "login"}
        </button>
      </div>
    </form>
  );
}
