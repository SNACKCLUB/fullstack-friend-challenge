import React, { useState } from "react";
import { Input, Button, Form } from "antd";
import useUserStore from "@/store/users/userStore";
import { useRouter } from "next/router";

const Register = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { createUser } = useUserStore();

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      await createUser(formData);
      router.push("/login");
    } catch (error) {
      console.error("Failed to create user:", error);
    }
  };

  return (
    <Form onFinish={handleSubmit}>
      <Form.Item
        label="Nome"
        name="name"
        rules={[{ required: true, message: "Por favor, insira seu nome." }]}
      >
        <Input name="name" value={formData.name} onChange={handleChange} />
      </Form.Item>

      <Form.Item
        label="E-mail"
        name="email"
        rules={[
          { required: true, message: "Por favor, insira seu e-mail." },
          { type: "email", message: "Formato de e-mail inválido." },
        ]}
      >
        <Input
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
        />
      </Form.Item>

      <Form.Item
        label="Senha"
        name="password"
        rules={[
          { required: true, message: "Por favor, insira sua senha." },
          { min: 6, message: "A senha deve ter pelo menos 6 caracteres." },
        ]}
      >
        <Input.Password
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Registrar
        </Button>
      </Form.Item>
    </Form>
  );
};

export { Register };
