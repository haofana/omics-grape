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
  mRNA?: string;
  Protein?: string;
  filename: string;
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
    render: (text, recrecordord) => <a>FASTA</a>,
  },
  {
    title: 'GFF',
    dataIndex: 'GFF',
    key: 'GFF',
    render: (text, record) => <a href={`/file/${record.filename}.gff3`}>GFF</a>,
  },
  {
    title: 'CDS',
    dataIndex: 'CDS',
    key: 'CDS',
    render: (text, record) => <a href={`/file/${record.filename}.CDS.fasta`}>FASTA</a>,
  },
  {
    title: 'mRNA',
    dataIndex: 'mRNA',
    key: 'mRNA',
    render: (text, record) => <a href={`/file/${record.filename}.mRNA.fasta`}>FASTA</a>,
  },
  {
    title: 'Protein',
    dataIndex: 'Protein',
    key: 'Protein',
    render: (text, record) => <a href={`/file/${record.filename}.protein.fasta`}>FASTA</a>,
  },
];
const dataSource: DataType[] = [
  {
    Species: '河岸葡萄',
    key: 'Riverbank',
    filename: 'VITVri588271_v1.0'
  },
  {
    Species: '美洲葡萄',
    key: 'America',
    filename: 'VITVlaGREM4_v1.0'
  },
  {
    Species: '沙地葡萄',
    key: 'Sandy',
    filename: 'VITVrpB38_v1.0'
  },
  {
    Species: '圆叶葡萄',
    key: 'Round',
    filename: 'VITMroTrayshed_v2.0'
  }
]
const columns2: TableProps<DataType>['columns'] = [
  {
    title: 'Species',
    dataIndex: 'Species',
    key: 'Species',
  },
  {
    title: 'Genome',
    dataIndex: 'Genome',
    key: 'Genome',
    render: (text, record) => <a href={`/file/${record.filename}.dna.toplevel.fa`}>FASTA</a>,
  },
  {
    title: 'GFF',
    dataIndex: 'GFF',
    key: 'GFF',
    render: (text, record) => <a href={`/file/${record.filename}.gff3`}>GFF</a>,
  },
  {
    title: 'CDS',
    dataIndex: 'CDS',
    key: 'CDS',
    render: (text, record) => <a href={`/file/${record.filename}.cds.all.fa`}>FASTA</a>,
  },
  {
    title: 'Protein',
    dataIndex: 'Protein',
    key: 'Protein',
    render: (text, record) => <a href={`/file/${record.filename}.pep.all.fa`}>FASTA</a>,
  },
];
const dataSource2: DataType[] = [
  {
    Species: '‘黑比诺’葡萄12X',
    key: '2022',
    filename: 'Vitis_vinifera.12X'
  },
  {
    Species: '‘黑比诺’葡萄PN_T2T',
    key: '2023',
    filename: 'Vitis_vinifera.PN40024.v4'
  },
]

const Genome = () =>
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
        columns={columns2}
        dataSource={dataSource2}
        scroll={{ x: 'max-content' }}
        bordered
        pagination={false}
      />
    </Content>
  );
}

export default Genome;
