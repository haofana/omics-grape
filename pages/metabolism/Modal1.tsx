import { Modal, Table, theme } from 'antd';
import React from 'react';
import Image from 'next/image';
import img from './img.png';

interface TreatmentModalProps {
  open: boolean;
  onCancel: () => void;
  title: string;
}

const TreatmentModal: React.FC<TreatmentModalProps> = ({ open, onCancel, title }) => {
  const { token: { colorBorder, borderRadiusLG }, } = theme.useToken();
  return (
    <Modal
      title={'果实香气-植物生长调节剂处理' + title}
      open={open}
      onCancel={onCancel}
      footer={null}
      width={'60vw'}
    >
      <p style={{ marginBottom: 16, color: '#666' }}>
        对10年生‘寒香蜜’葡萄的硬核期果实，采用外源植物生长调节剂为2.0 μmol L-1独角金内酯（G2）、1.0 μmol/L 独角金内酯抑制剂（T）和清水（CK）进行处理。选择成熟期果实进行靶向与非靶向代谢组测序。
      </p>
      <Image src={img} alt={''} />
    </Modal>
  );
}

export default TreatmentModal;
