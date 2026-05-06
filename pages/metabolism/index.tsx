import React, { useState, useEffect } from 'react';
import { Form, Col, Layout, Input, theme, Button, Select, Spin, Table, Tabs } from 'antd';
import type { TableProps } from 'antd';
import type { FormProps } from 'antd';
import '../index.css';
import { useI18n } from '@/hooks/useI18n';
import Modal1 from './Modal1';
import Modal2 from './Modal';

type FieldType = {
  metabolite?: string;
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
  const [title, setTitle] = React.useState('');


  const [activeKey, setActiveKey] = useState('matUnvolatilize')
  // tab分页
  const items = [
    {
      key: 'matUnvolatilize',
      label: '寒香蜜-非挥发'
    }, {
      key: 'matVolatilize',
      label: '寒香蜜-挥发'
    },
    {
      key: 'matOther',
      label: '葡之梦、丛林玫瑰、茉莉香'
    }]
  const onChange = (key: string) => {
    setActiveKey(key)
    setTitle(items.filter(item=>item.key === key)[0].label)
  }
  const columnsMatOther = [
    {
      title: t.no,
      dataIndex: 'no',
      key: 'no',
      width: 80,
    },
    {
      title: t.metabolite,
      dataIndex: 'metabolite',
      key: 'metabolite',
      ellipsis: true,
    },
    {
      title: t.metab_id,
      dataIndex: 'metab_id',
      key: 'metab_id',
      width: 120,
    },
    {
      title: t.library_id,
      dataIndex: 'library_id',
      key: 'library_id',
      width: 120,
    },
    {
      title: t.kegg_compound_id,
      dataIndex: 'kegg_compound_id',
      key: 'kegg_compound_id',
      width: 160,
    },
    {
      title: t.quant_mass,
      dataIndex: 'quant_mass',
      key: 'quant_mass',
      width: 120,
    },
    {
      title: t.retention_time,
      dataIndex: 'retention_time',
      key: 'retention_time',
      width: 120,
    },
    {
      title: t.score,
      dataIndex: 'score',
      key: 'score',
      width: 80,
    },
    {
      title: t.ri,
      dataIndex: 'ri',
      key: 'ri',
      width: 80,
    },
    {
      title: t.library_ri,
      dataIndex: 'library_ri',
      key: 'library_ri',
      width: 100,
    },
    {
      title: t.odour,
      dataIndex: 'odour',
      key: 'odour',
      ellipsis: true,
    },
    {
      title: t.odour_zh,
      dataIndex: 'odour_zh',
      key: 'odour_zh',
      ellipsis: true,
    },
    {
      title: t.mode,
      dataIndex: 'mode',
      key: 'mode',
      width: 100,
    },
    {
      title: t.formula,
      dataIndex: 'formula',
      key: 'formula',
      width: 140,
    },
    {
      title: t.cas_id,
      dataIndex: 'cas_id',
      key: 'cas_id',
      width: 120,
    },
    {
     title: t.rsd,
      dataIndex: 'rsd',
      key: 'rsd',
      width: 80,
    },
  ];
  const columnsMatUnvolatilize = [
    {
      title: t.no,
      dataIndex: 'no',
      key: 'no',
      width: 80,
    },
    {
      title: t.id,
      dataIndex: 'id',
      key: 'id',
      width: 100,
    },
    {
      title: t.metabolite,
      dataIndex: 'metabolite',
      key: 'metabolite',
      ellipsis: true,
    },
    {
      title: t.metab_id,
      dataIndex: 'metab_id',
      key: 'metab_id',
      width: 120,
    },
    {
      title: t.library_id,
      dataIndex: 'library_id',
      key: 'library_id',
      width: 120,
    },
    {
      title: t.level,
      dataIndex: 'level',
      key: 'level',
      width: 100,
    },
    {
      title: t.kegg_compound_id,
      dataIndex: 'kegg_compound_id',
      key: 'kegg_compound_id',
      width: 160,
    },
    {
      title: t.m_z,
      dataIndex: 'm_z',
      key: 'm_z',
      width: 100,
    },
    {
      title: t.retention_time,
      dataIndex: 'retention_time',
      key: 'retention_time',
      width: 120,
    },
    {
      title: t.mode,
      dataIndex: 'mode',
      key: 'mode',
      width: 100,
    },
    {
      title: t.adducts,
      dataIndex: 'adducts',
      key: 'adducts',
      width: 120,
    },
    {
      title: t.formula,
      dataIndex: 'formula',
      key: 'formula',
      width: 140,
    },
    {
      title: t.fragmentation_score,
      dataIndex: 'fragmentation_score',
      key: 'fragmentation_score',
      width: 120,
    },
    {
      title: t.theoretical_fragmentation_score,
      dataIndex: 'theoretical_fragmentation_score',
      key: 'theoretical_fragmentation_score',
      width: 120,
    },
    {
      title: t.mass_error,
      dataIndex: 'mass_error',
      key: 'mass_error',
      width: 120,
    },
    {
      title: t.cas_id,
      dataIndex: 'cas_id',
      key: 'cas_id',
      width: 120,
    },
    {
      title: t.rsd,
      dataIndex: 'rsd',
      key: 'rsd',
      width: 80,
    },
  ];
  const columnsMatVolatilize = [
    {
      title: t.no,
      dataIndex: 'no',
      key: 'no',
      width: 80,
    },
    {
      title: t.metabolite,
      dataIndex: 'metabolite',
      key: 'metabolite',
      ellipsis: true,
    },
    {
      title: t.metab_id,
      dataIndex: 'metab_id',
      key: 'metab_id',
      width: 120,
    },
    {
     title: t.library_id,
      dataIndex: 'library_id',
      key: 'library_id',
      width: 120,
    },
    {
      title: t.kegg_compound_id,
      dataIndex: 'kegg_compound_id',
      key: 'kegg_compound_id',
      width: 160,
    },
    {
      title: t.quant_mass,
      dataIndex: 'quant_mass',
      key: 'quant_mass',
      width: 120,
    },
    {
      title: t.retention_time,
      dataIndex: 'retention_time',
      key: 'retention_time',
      width: 120,
    },
    {
      title: t.score,
      dataIndex: 'score',
      key: 'score',
      width: 80,
    },
    {
      title: t.ri,
      dataIndex: 'ri',
      key: 'ri',
      width: 80,
    },
    {
      title: t.library_ri,
      dataIndex: 'library_ri',
      key: 'library_ri',
      width: 100,
    },
    {
      title: t.odour,
      dataIndex: 'odour',
      key: 'odour',
      ellipsis: true,
    },
    {
      title: t.odour_zh,
      dataIndex: 'odour_zh',
      key: 'odour_zh',
      ellipsis: true,
    },
    {
      title: t.mode,
      dataIndex: 'mode',
      key: 'mode',
      width: 100,
    },
    {
      title: t.formula,
      dataIndex: 'formula',
      key: 'formula',
      width: 140,
    },
    {
      title: t.cas_id,
      dataIndex: 'cas_id',
      key: 'cas_id',
      width: 120,
    },
    {
     title: t.rsd,
      dataIndex: 'rsd',
      key: 'rsd',
      width: 80,
    },
  ];
  const [activeColumn, setActiveColumn] = useState(columnsMatUnvolatilize);
  useEffect(() => {
    const fetchGrapeData = async () => {
      try {
        // 调用 Page Router 的 API 接口
        setLoading(true);
        const res = await fetch(`/api/matList?table=${activeKey}&page=${page}&size=${pageSize}&params=${JSON.stringify(params)}`);
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
    setActiveColumn(activeKey === 'matUnvolatilize' ? columnsMatUnvolatilize : activeKey === 'matVolatilize' ? columnsMatVolatilize : columnsMatOther);
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
            label={t.id}
            name="id"
          >
            <Input style={{ width: 200 }} allowClear={true} />
          </Form.Item>
          <Form.Item<FieldType>
            label={t.metabolite}
            name="metabolite"
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
        {
          activeKey !== 'matOther' ?
            <Modal1 title={title} open={open} onCancel={()=>setOpen(false)} /> :
            <Modal2 open={open} onCancel={()=>setOpen(false)} />
        }
        <Button className={'mb-4'} type="primary" onClick={()=>setOpen(true)}>
          {t.explanation}
        </Button>
        <Table
          columns={activeColumn}
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
