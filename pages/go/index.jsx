import React, { useState } from 'react';
import {Button, Input, Card, Tabs, Table, Tag, Layout, theme} from 'antd';
import '../index.css';
const { Content } = Layout;

export default function GoEnrich() {
  const [geneText, setGeneText] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const run = async () => {
    const genes = geneText.split(/\s+/).filter(Boolean);
    if (!genes.length) return alert('请输入基因ID');

    setLoading(true);
    try {
      const res = await fetch('/api/go-enrich', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ geneList: genes }),
      });
      const result = await res.json();
      // 兜底为数组
      setData(result.results || []);
    } catch (e) {
      alert('富集失败：' + e.message);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { title: 'GO ID', dataIndex: 'goId', key: 'goId' },
    { title: '功能名称', dataIndex: 'goName', key: 'goName', width: 300 },
    {
      title: '分类', dataIndex: 'category', key: 'category', render: (cat) => (
        <Tag color={cat === 'BP' ? 'blue' : cat === 'MF' ? 'orange' : 'green'}>{cat}</Tag>
      )
    },
    { title: 'P值', dataIndex: 'pValue', key: 'pValue' },
    { title: 'FDR', dataIndex: 'fdr', key: 'fdr' },
    { title: '富集基因数', dataIndex: 'count', key: 'count' },
  ];
  const { token: { colorBorder } } = theme.useToken();

  return (
    <Content style={{ padding: '16px 48px', backgroundColor: colorBorder, minHeight: 'calc(100vh - 64px)' }}>
      <div className={'item-title '}>
        🍇 葡萄 GO 富集分析
      </div>
      <Input.TextArea
        rows={6}
        value={geneText}
        onChange={(e) => setGeneText(e.target.value)}
        placeholder="输入葡萄基因ID，一行一个"
        style={{ marginBottom: 16 }}
      />
      <Button type="primary" onClick={run} loading={loading}>
        开始富集分析
      </Button>

      <div className={'item-title '}>
        富集结果
      </div>

      <Tabs defaultActiveKey="BP">
        <Tabs.TabPane tab={`BP(${data.filter(i => i.category === 'BP').length})`} key="BP">
          <Table dataSource={data.filter(i => i.category === 'BP')} columns={columns} rowKey="goId" pagination={false} />
        </Tabs.TabPane>
        <Tabs.TabPane tab={`MF(${data.filter(i => i.category === 'MF').length})`} key="MF">
          <Table dataSource={data.filter(i => i.category === 'MF')} columns={columns} rowKey="goId" pagination={false} />
        </Tabs.TabPane>
        <Tabs.TabPane tab={`CC(${data.filter(i => i.category === 'CC').length})`} key="CC">
          <Table dataSource={data.filter(i => i.category === 'CC')} columns={columns} rowKey="goId" pagination={false} />
        </Tabs.TabPane>
      </Tabs>

    </Content>
  );
}
