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
    key: 'JBS',
    abbreviation: 'JBS',
    fullNameEn: 'Dorsal color of young node',
    fullNameZh: '新梢节背侧颜色',
  },
  {
    key: 'JFS',
    abbreviation: 'JFS',
    fullNameEn: 'Ventral color of young node',
    fullNameZh: '新梢节腹侧颜色',
  },
  {
    key: 'JJBS',
    abbreviation: 'JJBS',
    fullNameEn: 'Dorsal color of young internode',
    fullNameZh: '新梢节间背侧颜色',
  },
  {
    key: 'JJFS',
    abbreviation: 'JJFS',
    fullNameEn: 'Ventral color of young internode',
    fullNameZh: '新梢节间腹侧颜色',
  },
  {
    key: 'YXS',
    abbreviation: 'YXS',
    fullNameEn: 'Anthocyanin coloration intensity along the main vein on the adaxial side of mature leaves',
    fullNameZh: '成熟叶正面主脉花青素着色强度',
  },
  {
    key: 'ZTS',
    abbreviation: 'ZTS',
    fullNameEn: 'Surface color of mature canes',
    fullNameZh: '成熟枝蔓表面颜色',
  },
  {
    key: 'SJXS',
    abbreviation: 'SJXS',
    fullNameEn: 'Shoot tip pubescence anthocyanin intensity',
    fullNameZh: '梢尖绒毛花青素着色强度',
  },
  {
    key: 'YYYS',
    abbreviation: 'YYYS',
    fullNameEn: 'Adaxial color of young leaves',
    fullNameZh: '幼叶正面颜色',
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
