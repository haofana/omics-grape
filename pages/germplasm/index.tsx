import React, { useState, useEffect } from 'react';
import { Breadcrumb, Layout, Menu, theme, Button, Checkbox, Divider, Table } from 'antd';
import type { TableProps } from 'antd';
import '../index.css';

interface GrapeItem {
  id: number,
  variety: string,
  feature: string,
  stage: string,
  type: string,
  unit: string,
}

const { Content } = Layout;
const columns: TableProps<GrapeItem>['columns'] = [
  {
    title: 'id',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: '葡萄品种',
    dataIndex: 'variety',
    key: 'variety',
  },
  {
    title: '主要特性',
    dataIndex: 'feature',
    key: 'feature',
    width: 700,
  },
  {
    title: '成熟期',
    dataIndex: 'stage',
    key: 'stage',

  },
  {
    title: '品种类型',
    dataIndex: 'type',
    key: 'type',
  },
  {
    title: '选育单位',
    dataIndex: 'unit',
    key: 'unit',
  },
];

const Home = () =>
{
  const { token: { colorBorder, borderRadiusLG }, } = theme.useToken();
  const [data, setData] = useState<GrapeItem[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    const fetchGrapeData = async () => {
      try {
        // 调用 Page Router 的 API 接口
        const res = await fetch(`/api/list?page=${page}&size=${pageSize}`);
        if (!res.ok) {
          throw new Error('接口请求失败');
        }
        const result = await res.json();
        if (result.success) {
          setData(result.data);
          setTotal(result.total);
        } else {
          console.error(result.msg || '查询数据失败');
        }
      } catch (err) {
        console.error('网络错误或服务器异常');
        console.error('请求失败：', err);
      } finally {
        // setLoading(false);
      }
    };

    fetchGrapeData();
  }, [page, pageSize]);
  const onPageChange = (page: number, pageSize: number) => {
    setPage(page);
    setPageSize(pageSize);
  }

  return (
    <Content style={{ padding: '16px 48px', backgroundColor: colorBorder, minHeight: 'calc(100vh - 64px)' }}>
      <div className={'item-title '}>
        葡萄属基因组
      </div>
      <Table
        // title={() => '葡萄属基因组'}
        columns={columns}
        rowKey={record => record.id}
        dataSource={data}
        scroll={{ x: 'max-content' }}
        bordered
        pagination={{ total, current: page, pageSize, onChange: onPageChange }}
      />
    </Content>
  );
}

export default Home;
