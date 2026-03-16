import React, { useState, useEffect } from 'react';
import { Layout, Checkbox, theme, Divider, Table } from 'antd';
import type { TableProps } from 'antd';
import '../index.css';
import { useI18n } from '@/hooks/useI18n';

interface BerryItem {
  no: number;
  variety: string;
  scientific: string;
  aromaType: string;
  aromaIntensity: string;
  berrySize: string;
  singleBerryWeight: string;
  fruitShapeIndex: string;
  fruitShape: string;
  solubleSolidsContent: string;
  titratableAcid: string;
  sugarAcidRatio: string;
  tartaricAcid: string;
  citricAcid: string;
  malicAcid: string;
  fructose: string;
  glucose: string;
  fleshFirmness: string;
  skinFirmness: string;
  fleshCellulose: string;
  skinCellulose: string;
  skinHemicellulose: string;
  fleshHemicellulose: string;
  maturityPeriod: string;
  berryPhotos: string;
}
const { Content } = Layout;

const Home = () =>
{
  const t = useI18n();
  const { token: { colorBorder, borderRadiusLG }, } = theme.useToken();
  const [data, setData] = useState<BerryItem[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const columns: TableProps<BerryItem>['columns']  = [ { title: t.variety, dataIndex: 'variety', fixed: 'start', },
    { title: t.scientific, dataIndex: 'scientific', fixed: 'start', },
    { title: t.aromaType, dataIndex: 'aromaType' },
    { title: t.aromaIntensity, dataIndex: 'aromaIntensity' },
    { title: t.berrySize, dataIndex: 'berrySize' },
    { title: t.singleBerryWeight, dataIndex: 'singleBerryWeight' },
    { title: t.fruitShapeIndex, dataIndex: 'fruitShapeIndex' },
    { title: t.fruitShape, dataIndex: 'fruitShape' },
    { title: t.solubleSolidsContent, dataIndex: 'solubleSolidsContent' },
    { title: t.titratableAcid, dataIndex: 'titratableAcid' },
    { title: t.sugarAcidRatio, dataIndex: 'sugarAcidRatio' },
    { title: t.tartaricAcid, dataIndex: 'tartaricAcid' },
    { title: t.citricAcid, dataIndex: 'citricAcid' },
    { title: t.malicAcid, dataIndex: 'malicAcid' },
    { title: t.fructose, dataIndex: 'fructose' },
    { title: t.glucose, dataIndex: 'glucose' },
    { title: t.fleshFirmness, dataIndex: 'fleshFirmness' },
    { title: t.skinFirmness, dataIndex: 'skinFirmness' },
    { title: t.fleshCellulose, dataIndex: 'fleshCellulose' },
    { title: t.skinCellulose, dataIndex: 'skinCellulose' },
    { title: t.skinHemicellulose, dataIndex: 'skinHemicellulose' },
    { title: t.fleshHemicellulose, dataIndex: 'fleshHemicellulose' },
    { title: t.stage, dataIndex: 'maturityPeriod' },
    {
      title: t.berryPhotos,
      dataIndex: 'berryPhotos',
      render: (text: string) => <img alt={''} src={text} style={{ width: 120, height: 120, objectFit: 'contain' }} onError={(e) => {
        e.currentTarget.style.display = 'none';
        e.currentTarget.parentElement!.innerHTML = '<div style="color: #dddddd">暂无图片</div>';
      }} />,
    }
  ]
  const plainOptions = columns.slice(2).map(item => item.title)

  const [filterColumn, setFilterColumn] = useState(columns);
  const [checkedList, setCheckedList] = useState(plainOptions);
  const checkAll = plainOptions.length === checkedList.length;
  const indeterminate = checkedList.length > 0 && checkedList.length < plainOptions.length;
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFilterColumn(columns.filter(item => checkedList.includes(item.title) || item.title == t.variety || item.title == t.scientific));
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
        const res = await fetch(`/api/list?table=PhenomicsFruit&page=${page}&size=${pageSize}`);
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
        {t.fruitComprehensive}
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
