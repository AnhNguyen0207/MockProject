import SideBar from "../components/SideBar";
import HeaderMenu from "../components/Header";
import { useLocation, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Layout } from "antd";
import React from "react";
import Authen from "../components/Authen";
import { RootState } from "../app/store";
const { Sider, Content, Header } = Layout;

const Dashboard: React.FC = () => {
  const auth = useSelector((state: RootState) => state?.user?.authorities);
  const location = useLocation();
  if (auth?.length < 0 || !localStorage.getItem("token")) {
    return <Navigate to="/login" replace={true} />;
  }
  return (
    <Layout style={{ height: "100vh" }}>
      <Sider breakpoint="xl" collapsible>
        <SideBar />
      </Sider>
      <Layout className="site-layout">
        {!location.pathname.includes("stock_transfers") && (
          <Header
            className="top-header z-10"
            // style={{ padding: 0,boxShadow: "1px 0px 5px 1px black" }}
          >
            <HeaderMenu />
          </Header>
        )}
        <Content>
          <Authen />
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
