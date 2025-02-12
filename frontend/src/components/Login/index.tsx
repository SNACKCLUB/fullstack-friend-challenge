"use client";

import { Button, Input, Typography } from "antd";
import { useState } from "react";
import { useAuthStore } from "@/store/auth/authStore";
import axiosInstance from "@/api/axios";
import { FormInputTypes } from "./types";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

import styles from "./login.module.scss";

export const Login = () => {
  const router = useRouter();
  const { setToken } = useAuthStore();
  const [form, setForm] = useState<FormInputTypes>({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleClick = async () => {
    try {
      const response = await axiosInstance.post("auth", form);

      if (response.data.status === "error") {
        throw new Error(response.data.message);
      }

      setToken(response.data.accessToken, response.data.refreshToken);
      toast.success("Login efetuado com sucesso");
      router.push("/friends");
    } catch (error: any) {
      toast.error("Erro ao efetuar login!");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Typography.Title level={2}>Login</Typography.Title>
        <Input
          name="email"
          placeholder="Informe seu e-mail"
          value={form.email}
          onChange={handleChange}
        />
        <Input.Password
          name="password"
          placeholder="Informe sua senha"
          value={form.password}
          onChange={handleChange}
        />
        <Button
          type="primary"
          onClick={() => handleClick()}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleClick();
            }
          }}
        >
          Login
        </Button>
        <Button type="primary" onClick={() => router.push("register")}>
          Cadastrar
        </Button>
      </div>
    </div>
  );
};
