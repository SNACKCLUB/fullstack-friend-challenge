import { Login } from "@/components/Login";
import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";

const LoginPage = () => {
  return (
    <Layout>
      <Content>
        <Login />
      </Content>
    </Layout>
  );
};

export default LoginPage;
