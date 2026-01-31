import React from 'react';
import { Breadcrumb, Layout, Menu, theme, Button, Checkbox, Divider, Table } from 'antd';
import type { TableProps } from 'antd';
import '../index.css';

interface DataType {
  key: string;
  Species: string;
  Genome?: string;
  GFF?: string;
  CDS?: string;
  Protein?: string;
}
const { Content } = Layout;
const columns: TableProps<DataType>['columns'] = [
  {
    title: 'Species',
    dataIndex: 'Species',
    key: 'Species',
  },
  {
    title: 'Genome',
    dataIndex: 'Genome',
    key: 'Genome',
    render: (text) => <a>FASTA</a>,
  },
  {
    title: 'GFF',
    dataIndex: 'GFF',
    key: 'GFF',
    render: (text) => <a>GFF</a>,
  },
  {
    title: 'CDS',
    dataIndex: 'CDS',
    key: 'CDS',
    render: (text) => <a>FASTA</a>,
  },
  {
    title: 'Protein',
    dataIndex: 'Protein',
    key: 'Protein',
    render: (text) => <a>FASTA</a>,
  },
];
const dataSource: DataType[] = [
  {
    Species: '河岸葡萄',
    key: 'Riverbank',
  },
  {
    Species: '美洲葡萄',
    key: 'America',
  },
  {
    Species: '沙地葡萄',
    key: 'Sandy',
  },
  {
    Species: '圆叶葡萄',
    key: 'Round',
  }
]
const dataSource2: DataType[] = [
  {
    Species: '2022年葡萄基因组12X.51',
    key: '2022',
  },
  {
    Species: '2023年葡萄基因组PN_T2T',
    key: '2023',
  },
]

const Home = () =>
{
  const {
    token: { colorBorder, borderRadiusLG },
  } = theme.useToken();
  return (
    <Content style={{ padding: '16px 48px', backgroundColor: colorBorder, minHeight: 'calc(100vh - 64px)' }}>
      <div className={'item-title '}>
        葡萄属基因组
      </div>
      <Table
        // title={() => '葡萄属基因组'}
        columns={columns}
        dataSource={dataSource}
        scroll={{ x: 'max-content' }}
        bordered
        pagination={false}
      />
      <div className={'item-title '}>
        基因组序列
      </div>
      <Table
        // title={() => '基因组序列'}
        columns={columns}
        dataSource={dataSource2}
        scroll={{ x: 'max-content' }}
        bordered
        pagination={false}
      />
    </Content>
  );
}

export default Home;
