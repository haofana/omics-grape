import { Modal, Table, theme } from 'antd';
import React from 'react';

interface TreatmentModalProps {
  open: boolean;
  onCancel: () => void;
  title: string;
}

const columns = [
  {
    title: ' ',
    dataIndex: 'abbreviation',
    key: 'abbreviation',
    width: 120,
  },
  {
    title: 'fullName',
    dataIndex: 'fullNameEn',
    key: 'fullNameEn',
  },
  {
    title: '中文全称',
    dataIndex: 'fullNameZh',
    key: 'fullNameZh',
  },
];

const data = [
  {
    key: 'YPF',
    abbreviation: 'YPF',
    fullNameEn: 'density of prostrate trichomes in interveinal areas on the abaxial surface of mature leaves',
    fullNameZh: '成熟叶片远轴面脉间区域匍匐毛的密度',
  },
  {
    key: 'YZL',
    abbreviation: 'YZL',
    fullNameEn: 'density of erect trichomes on the main vein of the abaxial surface of mature leaves',
    fullNameZh: '成熟叶片远轴面主脉上直立毛的密度',
  },
  {
    key: 'YYPF',
    abbreviation: 'YYPF',
    fullNameEn: 'density of prostrate trichomes in interveinal areas on the abaxial surface of young leaves',
    fullNameZh: '幼嫩叶片远轴面脉间区域匍匐毛的密度',
  },
  {
    key: 'YYZL',
    abbreviation: 'YYZL',
    fullNameEn: 'density of erect trichomes on the main vein of the abaxial surface of young leaves',
    fullNameZh: '幼嫩叶片远轴面主脉上直立毛的密度',
  },
  {
    key: 'SJPf',
    abbreviation: 'SJPf',
    fullNameEn: 'density of prostrate trichomes at shoot apices',
    fullNameZh: '茎尖匍匐毛的密度',
  },
  {
    key: 'SJZL',
    abbreviation: 'SJZL',
    fullNameEn: 'density of erect trichomes at shoot apices',
    fullNameZh: '茎尖直立毛的密度',
  },
  {
    key: 'JZL',
    abbreviation: 'JZL',
    fullNameEn: 'density of erect trichomes on new shoot internodes',
    fullNameZh: '新梢节间直立毛的密度',
  },
  {
    key: 'LD',
    abbreviation: 'LD',
    fullNameEn: 'linkage disequilibrium',
    fullNameZh: '连锁不平衡',
  },
  {
    key: 'GWAS',
    abbreviation: 'GWAS',
    fullNameEn: 'Genome-wide association study',
    fullNameZh: '全基因组关联分析',
  },
  {
    key: 'GLM',
    abbreviation: 'GLM',
    fullNameEn: 'General Linear Model',
    fullNameZh: '一般线性模型',
  },
  {
    key: 'MLM',
    abbreviation: 'MLM',
    fullNameEn: 'Mixed Linear Model',
    fullNameZh: '混合线性模型',
  },
  {
    key: 'SNPs',
    abbreviation: 'SNPs',
    fullNameEn: 'single nucleotide polymorphisms',
    fullNameZh: '单核苷酸多态性（复数）',
  },
  {
    key: 'SNP',
    abbreviation: 'SNP',
    fullNameEn: 'single nucleotide polymorphism',
    fullNameZh: '单核苷酸多态性（单数）',
  },
  {
    key: 'r²',
    abbreviation: 'r²',
    fullNameEn: 'decay distance',
    fullNameZh: '连锁不平衡衰减距离',
  },
  {
    key: 'SEM',
    abbreviation: 'SEM',
    fullNameEn: 'mean ± standard error',
    fullNameZh: '均值±标准误',
  },
  {
    key: 'ANOVA',
    abbreviation: 'ANOVA',
    fullNameEn: 'one-way analysis of variance',
    fullNameZh: '单因素方差分析',
  },
  {
    key: 'CV',
    abbreviation: 'CV',
    fullNameEn: 'coefficients of variation',
    fullNameZh: '变异系数',
  },
  {
    key: 'PF',
    abbreviation: 'PF',
    fullNameEn: 'prostrate trichome',
    fullNameZh: '匍匐毛',
  },
  {
    key: 'CHR',
    abbreviation: 'CHR',
    fullNameEn: 'chromosome',
    fullNameZh: '染色体',
  },
  {
    key: 'ZL',
    abbreviation: 'ZL',
    fullNameEn: 'erect trichome',
    fullNameZh: '直立毛',
  },
  {
    key: 'GL1',
    abbreviation: 'GL1',
    fullNameEn: 'GLABRA1',
    fullNameZh: 'GLABRA1基因',
  },
];

const TreatmentModal: React.FC<TreatmentModalProps> = ({ open, onCancel, title }) => {
  const { token: { colorBorder, borderRadiusLG }, } = theme.useToken();
  return (
    <Modal
      title={title}
      open={open}
      onCancel={onCancel}
      footer={null}
      width={'60vw'}
    >
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        bordered
        size="small"
      />
    </Modal>
  );
}

export default TreatmentModal;
