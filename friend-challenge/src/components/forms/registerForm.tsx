"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import InputGroup from "../ui/input-group";

const registerFormSchema = z.object({
  name: z
    .string()
    .nonempty("Name is required!")
    .min(3, "Name must have at least 3 characters")
    .max(50, "Name must have up to 50 characters"),
  email: z.string().nonempty("Email is required!").email("Email is invalid!"),
  password: z
    .string()
    .nonempty("Password is required!")
    .min(8, "Password must have at least 8 characters"),
});

export type RegisterFormData = z.infer<typeof registerFormSchema>;

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
  });

  const onSubmit = (data: RegisterFormData) => {
    console.log("xxxx", data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 w-[80%] text-sm"
    >
      <InputGroup>
        <InputGroup.Label htmlFor="name">Name</InputGroup.Label>
        <input
          type="text"
          placeholder="Your name"
          required
          {...register("name")}
        />
        {errors.name && <InputGroup.ErrorLabel message={errors.name.message} />}
      </InputGroup>
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
        >
          Register
        </button>
      </div>
    </form>
  );
}
