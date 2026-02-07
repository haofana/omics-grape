import type { ThemeConfig } from 'antd';

const mytheme: ThemeConfig = {
  token: {
    fontSize: 18,
    colorPrimary: '#3c7963',
    colorBgContainer: '#3c7963',
    colorBorder: '#ffffffC8',
  },
  components: {
    Menu: {
      darkPopupBg: '#458c71',
      darkItemColor: '#ffffffC8',
    },
    Table: {
      colorBgContainer: '#ffffffC8',
      // footerBg: '#ffffffC8',
    },
    Pagination: {
      // itemActiveBg: '#ffffffC8',
      // itemBg: '#ffffffC8',
      // itemInputBg: '#ffffffC8',
      colorBgContainer: '#ffffffC8',
    },
    Select: {
      colorBgContainer: '#ffffffC8',
    },
    Input: {
      colorBgContainer: '#ffffffC8',
    },
    Breadcrumb: {
      fontSize: 20,
    },
  }
};

export default mytheme;
