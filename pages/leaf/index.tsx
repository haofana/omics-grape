import React, { useState, useEffect } from 'react';
import { Layout, Checkbox, theme, Divider, Table } from 'antd';
import type { TableProps } from 'antd';
import '../index.css';
import { useI18n } from '@/hooks/useI18n';

interface LeafItem {
  no: number;
  variety: string;
  grapeScientificName: string;
  anthocyaninIntensityOnMainVeinOfMatureLeaf: string;
  matureLeafSize: string;
  lengthOfSerrationsOnMatureLeaf: string;
  lengthToWidthRatioOfSerrationsOnMatureLeaf: string;
  ratioOfPetioleLengthToSerrationLengthOnMatureLeaf: string;
  densityOfProstratePubescenceOnYoungShootTip: string;
  densityOfErectPubescenceOnYoungShootTip: string;
  anthocyaninIntensityOfProstratePubescenceOnYoungShootTip: string;
  opennessOfYoungShootTip: string;
  mainColorOfMatureCane: string;
  typeOfPetiolarSinusRestrictionByVeinsOnMatureLeaf: string;
  blisteringOfMatureLeaf: string;
  depthOfUpperLobesOnMatureLeaf: string;
  overlappingTypeOfUpperLobesOnMatureLeaf: string;
  overlappingTypeOfLowerLobesOnMatureLeaf: string;
  densityOfProstratePubescenceBetweenMainVeinsOnYoungLeaf: string;
  densityOfErectPubescenceOnMainVeinOfYoungLeaf: string;
  youngLeafColor: string;
  densityOfProstratePubescenceBetweenMainVeinsOnMatureLeaf: string;
  densityOfErectPubescenceOnMainVeinOfMatureLeaf: string;
  densityOfErectPubescenceOnInternodesOfYoungShoot: string;
  ventralColorOfInternodeOnYoungShoot: string;
  colorOfDorsalSideOfNodesOnYoungShoot: string;
  colorOfVentralSideOfNodesOnYoungShoot: string;
  colorOfDorsalSideOfNodesOnYoungShoot1: string;
  numberOfLobesOnMatureLeaf: string;
  shapeOfMatureLeaf: string;
  shapeOfSerrationsOnMatureLeaf: string;
  crossSectionalShapeOfMatureLeaf: string;
  overlappingTypeOfPetiolarSinusOnMatureLeaf: string;
  youngShootAdaxialSide: string;
  youngLeafAdaxialSide: string;
  matureLeafAdaxialSide: string;
}
const { Content } = Layout;

const Home = () =>
{
  const t = useI18n();
  const { token: { colorBorder, borderRadiusLG }, } = theme.useToken();
  const [data, setData] = useState<LeafItem[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const leafColumns: TableProps<LeafItem>['columns'] = [
    { title: t.variety, dataIndex: 'variety', fixed: 'left' },
    { title: t.grapeScientificName, dataIndex: 'grapeScientificName', fixed: 'left' },

    { title: t.anthocyaninIntensityOnMainVeinOfMatureLeaf, dataIndex: 'anthocyaninIntensityOnMainVeinOfMatureLeaf' },
    { title: t.matureLeafSize, dataIndex: 'matureLeafSize' },
    { title: t.lengthOfSerrationsOnMatureLeaf, dataIndex: 'lengthOfSerrationsOnMatureLeaf' },
    { title: t.lengthToWidthRatioOfSerrationsOnMatureLeaf, dataIndex: 'lengthToWidthRatioOfSerrationsOnMatureLeaf' },
    { title: t.ratioOfPetioleLengthToSerrationLengthOnMatureLeaf, dataIndex: 'ratioOfPetioleLengthToSerrationLengthOnMatureLeaf' },
    { title: t.densityOfProstratePubescenceOnYoungShootTip, dataIndex: 'densityOfProstratePubescenceOnYoungShootTip' },
    { title: t.densityOfErectPubescenceOnYoungShootTip, dataIndex: 'densityOfErectPubescenceOnYoungShootTip' },
    { title: t.anthocyaninIntensityOfProstratePubescenceOnYoungShootTip, dataIndex: 'anthocyaninIntensityOfProstratePubescenceOnYoungShootTip' },
    { title: t.opennessOfYoungShootTip, dataIndex: 'opennessOfYoungShootTip' },
    { title: t.mainColorOfMatureCane, dataIndex: 'mainColorOfMatureCane' },
    { title: t.typeOfPetiolarSinusRestrictionByVeinsOnMatureLeaf, dataIndex: 'typeOfPetiolarSinusRestrictionByVeinsOnMatureLeaf' },
    { title: t.blisteringOfMatureLeaf, dataIndex: 'blisteringOfMatureLeaf' },
    { title: t.depthOfUpperLobesOnMatureLeaf, dataIndex: 'depthOfUpperLobesOnMatureLeaf' },
    { title: t.overlappingTypeOfUpperLobesOnMatureLeaf, dataIndex: 'overlappingTypeOfUpperLobesOnMatureLeaf' },
    { title: t.overlappingTypeOfLowerLobesOnMatureLeaf, dataIndex: 'overlappingTypeOfLowerLobesOnMatureLeaf' },
    { title: t.densityOfProstratePubescenceBetweenMainVeinsOnYoungLeaf, dataIndex: 'densityOfProstratePubescenceBetweenMainVeinsOnYoungLeaf' },
    { title: t.densityOfErectPubescenceOnMainVeinOfYoungLeaf, dataIndex: 'densityOfErectPubescenceOnMainVeinOfYoungLeaf' },
    { title: t.youngLeafColor, dataIndex: 'youngLeafColor' },
    { title: t.densityOfProstratePubescenceBetweenMainVeinsOnMatureLeaf, dataIndex: 'densityOfProstratePubescenceBetweenMainVeinsOnMatureLeaf' },
    { title: t.densityOfErectPubescenceOnMainVeinOfMatureLeaf, dataIndex: 'densityOfErectPubescenceOnMainVeinOfMatureLeaf' },
    { title: t.densityOfErectPubescenceOnInternodesOfYoungShoot, dataIndex: 'densityOfErectPubescenceOnInternodesOfYoungShoot' },
    { title: t.ventralColorOfInternodeOnYoungShoot, dataIndex: 'ventralColorOfInternodeOnYoungShoot' },
    { title: t.colorOfDorsalSideOfNodesOnYoungShoot, dataIndex: 'colorOfDorsalSideOfNodesOnYoungShoot' },
    { title: t.colorOfVentralSideOfNodesOnYoungShoot, dataIndex: 'colorOfVentralSideOfNodesOnYoungShoot' },
    { title: t.colorOfDorsalSideOfNodesOnYoungShoot1, dataIndex: 'colorOfDorsalSideOfNodesOnYoungShoot1' },
    { title: t.numberOfLobesOnMatureLeaf, dataIndex: 'numberOfLobesOnMatureLeaf' },
    { title: t.shapeOfMatureLeaf, dataIndex: 'shapeOfMatureLeaf' },
    { title: t.shapeOfSerrationsOnMatureLeaf, dataIndex: 'shapeOfSerrationsOnMatureLeaf' },
    { title: t.crossSectionalShapeOfMatureLeaf, dataIndex: 'crossSectionalShapeOfMatureLeaf' },
    { title: t.overlappingTypeOfPetiolarSinusOnMatureLeaf, dataIndex: 'overlappingTypeOfPetiolarSinusOnMatureLeaf' },
    {
      title: t.youngShootAdaxialSide,
      dataIndex: 'youngShootAdaxialSide',
      render: (text: string) => (
        <img alt="" src={text} style={{ width: 120, height: 120, objectFit: 'contain' }} onError={(e) => {
          e.currentTarget.style.display = 'none';
          e.currentTarget.parentElement!.innerHTML = '<div style="color: #dddddd">暂无图片</div>';
        }} />
      ),
    },
    {
      title: t.youngLeafAdaxialSide,
      dataIndex: 'youngLeafAdaxialSide',
      render: (text: string) => (
        <img alt="" src={text} style={{ width: 120, height: 120, objectFit: 'contain' }} onError={(e) => {
          e.currentTarget.style.display = 'none';
          e.currentTarget.parentElement!.innerHTML = '<div style="color: #dddddd">暂无图片</div>';
        }} />
      ),
    },
    {
      title: t.matureLeafAdaxialSide,
      dataIndex: 'matureLeafAdaxialSide',
      render: (text: string) => (
        <img alt="" src={text} style={{ width: 120, height: 120, objectFit: 'contain' }} onError={(e) => {
          e.currentTarget.style.display = 'none';
          e.currentTarget.parentElement!.innerHTML = '<div style="color: #dddddd">暂无图片</div>';
        }} />
      ),
    },
  ];
  const plainOptions = leafColumns.slice(2).map(item => item.title)

  const [filterColumn, setFilterColumn] = useState(leafColumns);
  const [checkedList, setCheckedList] = useState(plainOptions);
  const checkAll = plainOptions.length === checkedList.length;
  const indeterminate = checkedList.length > 0 && checkedList.length < plainOptions.length;
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFilterColumn(leafColumns.filter(item => checkedList.includes(item.title) || item.title == t.variety || item.title == t.scientific));
  }, [checkedList]);

  const onChange = list => {
    setCheckedList(list);
  };
  const onCheckAllChange = e => {
    if (e.target.checked) {
      setCheckedList(plainOptions);
    } else {
      setCheckedList([]);
    }

  };
  useEffect(() => {
    const fetchGrapeData = async () => {
      try {
        // 调用 Page Router 的 API 接口
        const res = await fetch(`/api/list?table=PhenomicsLeaf&page=${page}&size=${pageSize}`);
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
        // setLoading(false);
      }
    };
    fetchGrapeData();
  }, [page, pageSize]);

  const onPageChange = (page: number, pageSize: number) => {
    setPage(page);
    setPageSize(pageSize);
  }

  return (
    <Content style={{ padding: '16px 48px', backgroundColor: colorBorder, minHeight: 'calc(100vh - 64px)', fontSize: '14px' }}>
      <div className={'item-title '}>
        {t.stemLeafComprehensive}
      </div>
      <div style={{ color: '#012648' }}>
        <Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}>
          {t.all}
        </Checkbox>
        <Checkbox.Group options={plainOptions} value={checkedList} onChange={onChange} />
        <Divider />
      </div>

      <Table
        // title={() => '葡萄属基因组'}
        columns={filterColumn}
        rowKey={record => record.variety}
        dataSource={data}
        scroll={{ x: 'max-content' }}
        bordered
        pagination={{ total, current: page, pageSize, onChange: onPageChange }}
      />
    </Content>
  );
}

export default Home;
