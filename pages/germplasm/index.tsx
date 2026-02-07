import React, { useState, useEffect } from 'react';
    import { Form, Col, Layout, Input, theme, Button, Select, Divider, Table } from 'antd';
import type { TableProps } from 'antd';
import type { FormProps } from 'antd';
import '../index.css';

interface GrapeItem {
  id: number,
  variety: string,
  feature: string,
  stage: string,
  type: string,
  unit: string,
}
type FieldType = {
  variety?: string;
  stage?: string;
  type?: string;
};
const stageOptions = ['早熟','早中熟','中熟','中晚熟','晚熟'];
const typeOptions = ['东亚种','美洲种','欧亚种','欧美杂交种']
const { Content } = Layout;
const columns: TableProps<GrapeItem>['columns'] = [
  // {
  //   title: '序号',
  //   dataIndex: 'id',
  //   key: 'id',
  // },
  {
    title: '葡萄品种',
    dataIndex: 'variety',
    key: 'variety',
  },
  {
    title: '主要特性',
    dataIndex: 'feature',
    key: 'feature',
    width: 800,
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
  const [params, setParams] = useState<FieldType>({});
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchGrapeData = async () => {
      try {
        // 调用 Page Router 的 API 接口
        const res = await fetch(`/api/list?page=${page}&size=${pageSize}&params=${JSON.stringify(params)}`);
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
  }, [page, pageSize, params]);
  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    setParams(values)
    setPage(1)
  };
  const onReset = () => {
    form.resetFields();
    setPage(1)
    setParams({})
  };
  const onPageChange = (page: number, pageSize: number) => {
    setPage(page);
    setPageSize(pageSize);
  }

  return (
    <Content style={{ padding: '16px 48px', backgroundColor: colorBorder, minHeight: 'calc(100vh - 64px)' }}>
      <div className={'item-title '}>
        种质资源
      </div>
      <div>
        <Form
          form={form}
          name="search"
          layout="inline"
          style={{ width: '100%', marginBottom: 20 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          // onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            label="葡萄品种"
            name="variety"
            rules={[{ message: 'Please input your username!' }]}
          >
            <Input style={{ width: 200 }} allowClear={true} />
          </Form.Item>
          <Form.Item<FieldType>
            label="成熟期"
            name="stage"
            rules={[{ message: 'Please input your username!' }]}
          >
            <Select
              style={{ width: 200 }}
              allowClear={true}
              options={stageOptions.map(i=>{ return {value: i, label: i }})}
            />
          </Form.Item>
          <Form.Item<FieldType>
            label="品种类型"
            name="type"
            rules={[{ message: 'Please input your username!' }]}
          >
            <Select
              allowClear={true}
              style={{ width: 200 }}
              options={typeOptions.map(i=>{ return {value: i, label: i }})}
            />
          </Form.Item>
          <Form.Item label={null}>
            <Button type="primary" htmlType="submit">
              查询
            </Button>
            <Button style={{ marginLeft: 20 }} htmlType="button" type="primary" onClick={onReset}>
              重置
            </Button>
          </Form.Item>
        </Form>
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
