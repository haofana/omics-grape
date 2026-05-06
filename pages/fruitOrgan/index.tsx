import React, { useState, useEffect } from 'react';
import { Form, Col, Layout, Input, theme, Button, Select, Spin, Table, Tabs } from 'antd';
import type { TableProps } from 'antd';
import type { FormProps } from 'antd';
import '../index.css';
import { useI18n } from '@/hooks/useI18n';
import Modal2 from './Modal';

type FieldType = {
  position?: string;
  gene_names?: string;
  id?: string;
};

const { Content } = Layout;

const Metabolism = () =>
{
  const t = useI18n();
  const { token: { colorBorder, borderRadiusLG }, } = theme.useToken();
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [params, setParams] = useState<FieldType>({});
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [open, setOpen] = React.useState(false);

  const [activeKey, setActiveKey] = useState('gwasOrgan')
  // tab分页
  const items = [
    {
      key: 'gwasOrgan',
      label: '葡萄营养器官着色'
    }]
  const onChange = (key: string) => {
    setActiveKey(key)
  }
  const organColumns = [
    { title: t.no, dataIndex: 'no', key: 'no' },
    { title: t.traits, dataIndex: 'traits', key: 'traits' },
    { title: t.chromosome, dataIndex: 'chromosome', key: 'chromosome' },
    { title: t.position, dataIndex: 'position', key: 'position' },
    { title: t.snp, dataIndex: 'snp', key: 'snp' },
    { title: t.p_value_2023, dataIndex: 'p_value_2023', key: 'p_value_2023' },
    { title: t.p_value_2024, dataIndex: 'p_value_2024', key: 'p_value_2024' },
    { title: t.model, dataIndex: 'model', key: 'model' },
    { title: t.gene_names, dataIndex: 'gene_names', key: 'gene_names' },
    { title: t.functional_annotation, dataIndex: 'functional_annotation', key: 'functional_annotation' },
    { title: t.length, dataIndex: 'length', key: 'length' },
  ];
  useEffect(() => {
    const fetchGrapeData = async () => {
      try {
        // 调用 Page Router 的 API 接口
        setLoading(true);
        const res = await fetch(`/api/gwasList?table=${activeKey}&page=${page}&size=${pageSize}&params=${JSON.stringify(params)}`);
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
        setLoading(false);
      }
    };
    fetchGrapeData();
  }, [page, pageSize, params, activeKey, t]);
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
    <Content style={{ padding: '16px 48px', backgroundColor: colorBorder, minHeight: 'calc(100vh - 64px)', fontSize: '14px' }}>
      {/*<div className={'item-title '}>*/}
      {/*  果实香气-植物生长调节剂处理*/}
      {/*</div>*/}
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
            label={t.position}
            name="position"
          >
            <Input style={{ width: 200 }} allowClear={true} />
          </Form.Item>
          <Form.Item<FieldType>
            label={t.gene_names}
            name="gene_names"
          >
            <Input style={{ width: 200 }} allowClear={true} />
          </Form.Item>

          <Form.Item label={null}>
            <Button type="primary" htmlType="submit">
              {t.query}
            </Button>
            <Button style={{ marginLeft: 20 }} htmlType="button" type="primary" onClick={onReset}>
              {t.reset}
            </Button>
          </Form.Item>
        </Form>
      </div>
      <Tabs activeKey={activeKey} items={items} onChange={onChange} />
      <Spin description="Loading" size="large" spinning={loading}>
        <Modal2 title={t.abbreviation} open={open} onCancel={()=>setOpen(false)} />
        <Button className={'mb-4'} type="primary" onClick={()=>setOpen(true)}>
          {t.abbreviation}
        </Button>
        <Table
          columns={organColumns}
          dataSource={data}
          scroll={{ x: 'max-content' }}
          bordered
          pagination={{ total, current: page, pageSize, onChange: onPageChange }}
        />
      </Spin>
    </Content>
  );
}

export default Metabolism;
