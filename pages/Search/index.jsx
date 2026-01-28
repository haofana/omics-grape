'use client'
import React, { useState, useEffect } from 'react';
import { Table, Layout, Checkbox, theme, Divider } from 'antd';
import 'antd/dist/reset.css';
import '../index.css';
import file from '../../source/demo.json';

const { Header, Content, Footer } = Layout;

const columns = file['列名'];
const columnConfig = columns.map(item => {
  return {
    title: item,
    dataIndex: item,
    key: item,
  }
})

const plainOptions = columns;
plainOptions.shift();
plainOptions.shift();

const Search = () => {
  const {
    token: { colorBorder, colorBgContainer },
  } = theme.useToken();
  const [filterColumn, setFilterColumn] = useState(columnConfig);
  const [dataSource, setDataSource] = useState(file['数据']);
  const [checkedList, setCheckedList] = useState(plainOptions);
  const checkAll = plainOptions.length === checkedList.length;
  const indeterminate = checkedList.length > 0 && checkedList.length < plainOptions.length;

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFilterColumn(columnConfig.filter(item => checkedList.includes(item.title) || item.title == '序号' || item.title == '品种'));
  }, [checkedList]);

  const onChange = list => {
    setCheckedList(list);

  };
  const onCheckAllChange = e => {
    if (e.target.checked) {
      setCheckedList(plainOptions);
      // setFilterColumn(columnConfig);
    } else {
      setCheckedList([]);
      // setFilterColumn(columnConfig.filter(item => item.title == '序号' || item.title == '品种'));
    }

  };

  return (
    <Content style={{ padding: '16px 48px', backgroundColor: colorBorder, minHeight: 'calc(100vh - 64px)' }}>
      {/*<Breadcrumb*/}
      {/*  style={{ marginBottom: 24 }}*/}
      {/*  items={[{ title: 'Download' }]}*/}
      {/*/>*/}
      <div className={'item-title '}>
        模拟数据
      </div>
      <div style={{ color: '#012648' }}>
        <span>选择列：</span>
        <Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}>
          Check all
        </Checkbox>
        <Divider />
        <Checkbox.Group options={plainOptions} value={checkedList} onChange={onChange} />
        <Divider />
      </div>
      <Table
        columns={filterColumn}
        dataSource={dataSource}
        scroll={{ x: 'max-content' }}
        bordered
      />
    </Content>
  );
};

export default Search;
