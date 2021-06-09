import React from "react";
import TableView from "../../components/TableView";
import GraphView from "../../components/GraphView";
import { Layout, Menu } from "antd";

const { Header, Content, Footer } = Layout;

const componentsRenderer: Record<string, JSX.Element> = {
  "1": <TableView />,
  "2": <GraphView />,
  "3": <div></div>,
};

const MainLayout = () => {
  const [selectedMenuItem, setSelectedMenuItem] = React.useState("1");
  return (
    <div>
      <Layout className="layout">
        <Header>
          <div className="logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            selectedKeys={[selectedMenuItem]}
            onSelect={(e) => setSelectedMenuItem(e.key)}
          >
            <Menu.Item key="1">Table View</Menu.Item>
            <Menu.Item key="2">Graph View</Menu.Item>
            <Menu.Item key="3">About</Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: "0 50px" }}>
          <div
            className="site-layout-content"
            // style={{
            //   display: "flex",
            //   flexWrap: "wrap",
            //   justifyContent: "center",
            // }}
          >
            {componentsRenderer[selectedMenuItem]}
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>Created by Halit Batur</Footer>
      </Layout>
    </div>
  );
};

export default MainLayout;
