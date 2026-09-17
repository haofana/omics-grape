import React, { useState, useEffect } from 'react';
import { Form, Col, Layout, Input, theme, Button, Select, Spin, Table, Tabs } from 'antd';
import type { FormProps } from 'antd';
import '../index.css';
import { useI18n } from '@/hooks/useI18n';

type FieldType = {
  qseqid?: string;
  sseqid?: string;
  id?: string;
};

const { Content } = Layout;


/**
 * 基因ID的统一化
 */
const Harmonization = () =>
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

  const [activeKey, setActiveKey] = useState('harmonization')
  // tab分页
  const items = [
    {
      key: 'harmonization',
      label: t.harmonization
    }]
  const onChange = (key: string) => {
    setActiveKey(key)
    setPage(1)
  }
  const organColumns = [
    { title: t.qseqid, dataIndex: 'qseqid', key: 'qseqid' },
    { title: t.sseqid, dataIndex: 'sseqid', key: 'sseqid' },
    { title: t.pident, dataIndex: 'pident', key: 'pident' },
    { title: t.length, dataIndex: 'length', key: 'length' },
    { title: t.mismatch, dataIndex: 'mismatch', key: 'mismatch' },
    { title: t.gapopen, dataIndex: 'gapopen', key: 'gapopen' },
    { title: t.qstart, dataIndex: 'qstart', key: 'qstart' },
    { title: t.qend, dataIndex: 'qend', key: 'qend' },
    { title: t.sstart, dataIndex: 'sstart', key: 'sstart' },
    { title: t.send, dataIndex: 'send', key: 'send' },
    { title: t.evalue, dataIndex: 'evalue', key: 'evalue' },
    { title: t.bitscore, dataIndex: 'bitscore', key: 'bitscore' },
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
            label={t.qseqid}
            name="qseqid"
          >
            <Input style={{ width: 200 }} allowClear={true} />
          </Form.Item>
          <Form.Item<FieldType>
            label={t.sseqid}
            name="sseqid"
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

export default Harmonization;
