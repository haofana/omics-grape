import { Modal, Table, theme } from 'antd';
import React from 'react';
import Image, { StaticImageData } from 'next/image';
import img from './img_1.png';
import items from './items';


interface TreatmentModalProps {
  open: boolean;
  onCancel: () => void;
  activeKey: string;
}
const columns = [
  {
    title: '组别',
    dataIndex: 'group',
    key: 'group',
    width: 100,
  },
  {
    title: '处理方式',
    dataIndex: 'treatment',
    key: 'treatment',
  },
];

const data = [
  { key: '1', group: 'CK', treatment: '0' },
  { key: '2', group: 'BR-1', treatment: '0.2mg·L⁻¹ BR' },
  { key: '3', group: 'BR-2', treatment: '0.4mg·L⁻¹ BR' },
  { key: '4', group: 'BR-3', treatment: '0.6mg·L⁻¹ BR' },
  { key: '5', group: 'BR-4', treatment: '0.8mg·L⁻¹ BR' },
  { key: '6', group: 'BR-5', treatment: '0.5mg·L⁻¹ BRZ' },
  { key: '7', group: 'BR-6', treatment: '0.4mg·L⁻¹ BR + 0.5mg·L⁻¹ BRZ' },
  { key: '8', group: 'GR-1', treatment: '1μmol·L⁻¹ GR' },
  { key: '9', group: 'GR-2', treatment: '2μmol·L⁻¹ GR' },
  { key: '10', group: 'GR-3', treatment: '3μmol·L⁻¹ GR' },
  { key: '11', group: 'GR-4', treatment: '1μmol·L⁻¹ Tis' },
  { key: '12', group: 'GR-5', treatment: '1μmol·L⁻¹ GR + 1μmol·L⁻¹ Tis' },
  { key: '13', group: 'Mel-1', treatment: '5μmol·L⁻¹ Mel' },
  { key: '14', group: 'Mel-2', treatment: '50μmol·L⁻¹ Mel' },
  { key: '15', group: 'Mel-3', treatment: '200μmol·L⁻¹ Mel' },
];

const TreatmentModal: React.FC<TreatmentModalProps> = ({ open, onCancel, activeKey }) => {
  const { token: { colorBorder, borderRadiusLG }, } = theme.useToken();
  const localItem= items.find(item => item.key === activeKey);
  return (
    <Modal
      title={localItem?.label}
      open={open}
      onCancel={onCancel}
      footer={null}
      width={'60vw'}
    >
      <p style={{ marginBottom: 16, color: '#666' }}>
        {localItem?.description}
      </p>
      {
        localItem?.table &&
        <Table
          columns={columns}
          dataSource={data}
          pagination={false}
          bordered
          size="small"
        />
      }
      {
        localItem?.img &&
        <Image src={localItem?.img} alt={''} />
      }
    </Modal>
  );
}

export default TreatmentModal;
