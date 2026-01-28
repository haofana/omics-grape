import React from 'react';
import { Breadcrumb, Layout, Menu, theme, Button } from 'antd';
const { Header, Content, Footer } = Layout;


const Home = () =>
{
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (

      <Content style={{ padding: '0 48px' }}>
        <Breadcrumb
          style={{ margin: '16px 0' }}
          items={[{ title: 'Download' }]}
        />
        <div
          style={{
            background: colorBgContainer,
            minHeight: 280,
            padding: 24,
            borderRadius: borderRadiusLG,
          }}
        >
          Content1
        </div>
      </Content>
  );
}

export default Home;
