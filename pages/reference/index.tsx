import React from 'react';
import { Breadcrumb, Layout, Menu, theme, Button, Checkbox, Divider, Table } from 'antd';
import type { TableProps } from 'antd';
import '../index.css';
import { useI18n } from '@/hooks/useI18n';

interface DataType {
  reference: string;
  url: string;
}
const { Content } = Layout;

const Reference = () =>
{
  const { token: { colorBorder } } = theme.useToken();
  const t = useI18n();
  const columns: TableProps<DataType>['columns'] = [
    {
      title: t.reference,
      dataIndex: 'reference',
      render: (text, record) => <a href={`/reference/${record.url}.pdf`} target="_blank" >{text}</a>,
    },
    {
      title: t.download,
      dataIndex: 'url',
      render: (text, record) => <a href={`/reference/${record.url}.pdf`} download>PDF</a>,
    },
  ];
  const dataSource: DataType[] = [
    {
      reference: '2025-Identifying Candidate Genes for Grape (Vitis vinifera L.) Fruit Firmness through Genome-Wide As',
      url: '2025-Identifying Candidate Genes for Grape (Vitis vinifera L.) Fruit Firmness through Genome-Wide As'
    },
    {
      reference: '不同砧木对\'阳光玫瑰\'葡萄果实品质及糖异生相关基因表达的影响_沈乐意',
      url: '不同砧木对\'阳光玫瑰\'葡萄果实品质及糖异生相关基因表达的影响_沈乐意'
    },
    {
      reference: '葡萄纤维素合酶超家族基因鉴定及其表达分析',
      url: '葡萄纤维素合酶超家族基因鉴定及其表达分析'
    },
    {
      reference: '葡萄CLE基因家族鉴定及表达分析',
      url: '葡萄CLE基因家族鉴定及表达分析'
    },
    {
      reference: '葡萄CYP707A基因家族的鉴定及对果实成熟的功能验证_龚丽丽',
      url: '葡萄CYP707A基因家族的鉴定及对果实成熟的功能验证_龚丽丽'
    },
    {
      reference: '葡萄TST基因家族鉴定及表达分析_杨杰',
      url: '葡萄TST基因家族鉴定及表达分析_杨杰'
    },
    {
      reference: 'Effects of Girdling and Foliar Fertilization with K on Physicochemical Parameters, Phenolic and Volatile Composition in \'Hanxiangmi\' Table Grape',
      url: '1'
    },
    {
      reference: 'Effects of Rootstock and Exogenous Plant Growth Regulators on Volatile Aroma Profiles and Terpenoid-Mediated Defense in Table Grape Fruit',
      url: 'Effects of Rootstock and Exogenous Plant Growth Regulators on Volatile Aroma Profiles and Terpenoid-Mediated Defense in Table Grape Fruit'
    },
    {
      reference: 'Food Science  Nutrition - 2026 - Cai - Identification of Key Determinants for Perceived Sweetness and Sourness in Fresh (1)',
      url: '2'
    },
    {
      reference: 'Genome-Wide Association Study Identifies Candidate Genes Associated with Vegetative Organ Coloration in Grapevine (Vitis vinifera L.)',
      url: 'Genome-Wide Association Study Identifies Candidate Genes Associated with Vegetative Organ Coloration in Grapevine (Vitis vinifera L.)'
    },
    {
      reference: 'Genome-Wide Association Study Identifies Candidate Genes',
      url: 'Genome-Wide Association Study Identifies Candidate Genes'
    },
    {
      reference: 'Genome-Wide Identification and Characterization of the USP Gene Family in Grapes (Vitis vinifera L.)',
      url: '3'
    },
    {
      reference: 'Genome-Wide Identification of the BZR Gene Family and Expression Validation of VvBZR7 in Grape (Vitis vinifera L.)',
      url: 'Genome-Wide Identification of the BZR Gene Family and Expression Validation of VvBZR7 in Grape (Vitis vinifera L.)'
    },
    {
      reference: 'Identification of ABA Signaling Pathway Genes and Their Differential Regulation in Response to Suboptimal Light Stress in Grape (Vitis vinifera L.)',
      url: 'Identification of ABA Signaling Pathway Genes and Their Differential Regulation in Response to Suboptimal Light Stress in Grape (Vitis vinifera L.)'
    },
    {
      reference: 'Pre-harvest treatment with gibberellin (GA',
      url: 'Pre-harvest treatment with gibberellin (GA'
    },
    {
      reference: 'Regulation of Cell Metabolism and Changes in Berry Shape of Shine Muscat Gra...Growth Regulators Gibberellin A3 and N-(2-Chloro-4-Pyridyl)-N\'-Phenylurea',
      url: '4'
    },
    {
      reference: 'The PEPCK and FBP Genes Regulate Gluconeogenesis',
      url: 'The PEPCK and FBP Genes Regulate Gluconeogenesis'
    },
    {
      reference: 'Transcriptomic and free monoterpene ',
      url: 'Transcriptomic and free monoterpene '
    }
  ];
  return (
    <Content style={{ padding: '16px 48px', backgroundColor: colorBorder, minHeight: 'calc(100vh - 64px)' }}>
      <div className={'item-title '}>
        {t.reference}
      </div>
      <Table
        // title={() => '葡萄属基因组'}
        columns={columns}
        dataSource={dataSource}
        scroll={{ x: 'max-content' }}
        bordered
        pagination={false}
      />
    </Content>
  );
}

export default Reference;
