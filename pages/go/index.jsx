'use client';
import React, { useState } from 'react';
import {
  Card,
  Form,
  Select,
  Input,
  Button,
  Space,
  Table,
  message,
  Spin,
  Layout,
  theme
} from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import '../index.css';

const { Content } = Layout;
const { TextArea } = Input;
const { Option } = Select;

export default function GOToolsPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [form] = Form.useForm();
  const {token: { colorBorder, borderRadiusLG },} = theme.useToken();

  // 模拟 GO 数据库（和南农网站一致）
  const goDatabases = [
    { value: 'go_biological_process', label: 'Biological Process（生物过程）' },
    { value: 'go_cellular_component', label: 'Cellular Component（细胞组分）' },
    { value: 'go_molecular_function', label: 'Molecular Function（分子功能）' },
  ];

  // 模拟物种数据库
  const species = [
    { value: 'grape', label: '葡萄（Vitis vinifera）' },
    { value: 'arabidopsis', label: '拟南芥' },
    { value: 'rice', label: '水稻' },
  ];

  // 提交 GO 分析
  const handleSubmit = async (values) => {
    if (!values.geneIds || values.geneIds.trim() === '') {
      message.warning('请输入基因 ID 列表');
      return;
    }
    setLoading(true);

    // 这里对接后端接口即可
    setTimeout(() => {
      setResult([
        {
          id: 1,
          goId: 'GO:0005886',
          name: '质膜',
          type: '细胞组分',
          pValue: '0.00023',
          geneCount: 15,
          genes: 'VvSWEET10, VvSUT2, VvPIP2...',
        },
        {
          id: 2,
          goId: 'GO:0009503',
          name: '光系统',
          type: '生物过程',
          pValue: '0.0012',
          geneCount: 9,
          genes: 'VvPSBA, VvPSBB...',
        },
      ]);
      setLoading(false);
      message.success('GO 富集分析完成');
    }, 1500);
  };

  // 表格列
  const columns = [
    { title: 'GO ID', dataIndex: 'goId', key: 'goId', width: 120 },
    { title: '功能描述', dataIndex: 'name', key: 'name', width: 260 },
    { title: '类型', dataIndex: 'type', key: 'type', width: 110 },
    { title: 'P 值', dataIndex: 'pValue', key: 'pValue', width: 100 },
    { title: '基因数', dataIndex: 'geneCount', key: 'geneCount', width: 90 },
    { title: '富集基因', dataIndex: 'genes', key: 'genes' },
  ];

  return (
    <Content style={{ padding: '16px 48px', backgroundColor: colorBorder, minHeight: 'calc(100vh - 64px)' }}>
      <div className={'item-title '}>
        BLAST
      </div>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{ database: 'go_biological_process' }}
      >
        <Form.Item
          label="选择物种"
          name="species"
          rules={[{ required: true, message: '请选择物种' }]}
        >
          <Select style={{ width: '100%' }}>
            {species.map((item) => (
              <Option key={item.value} value={item.value}>
                {item.label}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="选择 GO 数据库"
          name="database"
          rules={[{ required: true, message: '请选择 GO 类型' }]}
        >
          <Select style={{ width: '100%' }}>
            {goDatabases.map((item) => (
              <Option key={item.value} value={item.value}>
                {item.label}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="输入基因 ID 列表（一行一个，支持批量）"
          name="geneIds"
          rules={[{ required: true, message: '请输入基因列表' }]}
        >
          <TextArea style={{ width: 800 }} autoSize={{ minRows: 4, maxRows: 10 }} allowClear={true} />
        </Form.Item>
        <Form.Item>
          <Space>
            <Button
              type="primary"
              htmlType="submit"
              icon={<SearchOutlined />}
              loading={loading}
            >
              开始富集分析
            </Button>
            <Button type="primary" htmlType="reset">重置</Button>
          </Space>
        </Form.Item>
      </Form>

      {/* 结果展示 */}
      {loading && (
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <Spin size="large" />
          <p style={{ marginTop: '16px' }}>正在进行 GO 富集分析，请稍候...</p>
        </div>
      )}

      {result && !loading && (
        <Table
          columns={columns}
          dataSource={result}
          rowKey="id"
          bordered
          pagination={false}
          scroll={{ x: 'max-content' }}
        />
      )}
    </Content>
  );
}
