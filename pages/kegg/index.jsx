import { useState, useRef, useEffect } from 'react'
import echarts from 'echarts/dist/echarts.min.js';
import {Button, Card, Upload, Table, Select, Space, Empty, message, Input, theme, Layout} from 'antd'
import { UploadOutlined, DownloadOutlined, FileTextOutlined } from '@ant-design/icons'
import '../index.css';

const { Content } = Layout;
const { TextArea } = Input;
export default function KeggEnrich() {
  // 表单状态
  const [geneText, setGeneText] = useState('')
  const [fdrCut, setFdrCut] = useState(0.05)
  const [topLimit, setTopLimit] = useState(50)
  const [loading, setLoading] = useState(false)
  const [tableData, setTableData] = useState([])
  const [activeTab, setActiveTab] = useState('bubble')

  // ECharts容器ref
  const bubbleRef = useRef(null)
  const barRef = useRef(null)
  let bubbleChart = null
  let barChart = null

  // 示例基因
  const demoGene = `Vitvi00g00444
Vitvi00g00447
Vitvi00g00449
Vitvi00g00610
Vitvi00g00614
Vitvi00g00615`

  // 解析输入基因
  const parseGeneArr = () => {
    const raw = geneText.trim()
    if (!raw) return []
    return [...new Set(raw.split(/[\n, ]/).filter(s => s.trim()))]
  }

  // 发起富集请求
  const runEnrich = async () => {
    const genes = parseGeneArr()
    if (genes.length === 0) return message.warn('请输入基因ID')
    setLoading(true)
    setTableData([])
    try {
      const res = await fetch('/api/kegg', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          geneList: genes,
          fdrThreshold: fdrCut,
          topNum: topLimit
        })
      })
      const data = await res.json()
      if (data.success) {
        setTableData(data.data)
        message.success(`分析完成，共${data.data.length}条显著通路`)
      } else {
        message.error(data.msg)
      }
    } catch (err) {
      message.error('接口请求失败，请检查服务')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  // 渲染图表
  const renderChart = () => {
    if (!tableData.length) return
    // 关键判断：DOM不存在直接退出，不初始化echarts
    if (activeTab === 'bubble' && !bubbleRef.current) return
    if (activeTab === 'bar' && !barRef.current) return

    // 销毁旧实例防止内存泄漏
    if (bubbleChart) bubbleChart.dispose()
    if (barChart) barChart.dispose()
    bubbleChart = null
    barChart = null

    const data = tableData
    const yAxisName = data.map(i => i.pathwayName)
    const xLogFdr = data.map(i => -Math.log10(i.fdr))
    const geneNum = data.map(i => i.hitCount)

    if (activeTab === 'bubble') {
      bubbleChart = echarts.init(bubbleRef.current)
      bubbleChart.setOption({
        tooltip: { trigger: 'item' },
        grid: { left: 180, right: 30 },
        xAxis: { name: '-log10(FDR)' },
        yAxis: { type: 'category', data: yAxisName },
        series: [{ type: 'scatter', data: xLogFdr.map((x, i) => [x, i, geneNum]), symbolSize: val => val[2] * 3, itemStyle: { color: '#1677ff' } }]
      })
    } else {
      barChart = echarts.init(barRef.current)
      barChart.setOption({
        tooltip: { trigger: 'axis' },
        grid: { left: 180 },
        xAxis: { type: 'value', name: '富集基因数量' },
        yAxis: { type: 'category', data: yAxisName },
        series: [{ type: 'bar', data: geneNum, color: '#52c41a' }]
      })
    }
  }

  // 窗口缩放、Tab切换重绘
  useEffect(() => {
    const resizeFunc = () => {
      bubbleChart?.resize()
      barChart?.resize()
    }
    window.addEventListener('resize', resizeFunc)
    if (tableData.length) renderChart()
    return () => window.removeEventListener('resize', resizeFunc)
  }, [activeTab, tableData])

  // 文件上传读取
  const handleUpload = (file) => {
    const reader = new FileReader()
    reader.readAsText(file)
    reader.onload = e => setGeneText(e.target.result)
    return false
  }

  // 导出CSV
  const exportCSV = () => {
    const header = ['通路ID', '通路名称', '富集基因数', '通路背景基因', 'P值', 'FDR', '富集基因']
    const rows = tableData.map(item => [
      item.pathwayId,
      item.pathwayName,
      item.hitCount,
      item.bgCount,
      item.pValue,
      item.fdr,
      item.hitGenes.join(';')
    ])
    let csvText = header.join(',') + '\n'
    rows.forEach(line => {
      csvText += line.map(v => `"${v}"`).join(',') + '\n'
    })
    const blob = new Blob([csvText], { type: 'text/csv;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `KEGG富集结果_${Date.now()}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  // 表格列定义
  const tableColumns = [
    { title: 'KEGG通路ID', dataIndex: 'pathwayId', width: 130 },
    { title: '通路名称', dataIndex: 'pathwayName', ellipsis: true },
    { title: '富集基因数', dataIndex: 'hitCount', width: 100, sorter: (a, b) => b.hitCount - a.hitCount },
    { title: '通路背景基因', dataIndex: 'bgCount', width: 110 },
    { title: 'P值', dataIndex: 'pValue', width: 130 },
    { title: 'FDR校正', dataIndex: 'fdr', width: 140 },
    { title: '富集基因', dataIndex: 'hitGenes', render: arr => arr.join('、') }
  ]

  const { token: { colorBorder } } = theme.useToken();
  return (
    <Content style={{ padding: '16px 48px', backgroundColor: colorBorder, minHeight: 'calc(100vh - 64px)' }}>
      <div className={'item-title '}>KEGG 富集分析</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 330px', gap: 24 }}>
          <div>
            <TextArea
              value={geneText}
              onChange={e => setGeneText(e.target.value)}
              rows={8}
              placeholder="Vitvi00g00444"
            />
            <Space style={{ marginTop: 12 }}>
              <Button type="primary" onClick={() => setGeneText(demoGene)}>填充示例</Button>
              <Button type="primary" onClick={() => setGeneText('')}>清空</Button>
              <Upload beforeUpload={handleUpload} showUploadList={false}>
                <Button type="primary" icon={<UploadOutlined />}>上传txt/csv</Button>
              </Upload>
            </Space>
          </div>
          <div style={{ color: '#000' }}>
            <p style={{ marginBottom: 8 }}>筛选配置</p>
            <Space orientation="vertical" size="middle" style={{ width: '100%' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span>FDR阈值</span>
                <Select value={fdrCut} onChange={() => setFdrCut} style={{ flex: 1 }}>
                  <Select.Option value={0.01}>0.01</Select.Option>
                  <Select.Option value={0.05}>0.05</Select.Option>
                  <Select.Option value={0.1}>0.1</Select.Option>
                </Select>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span>展示条数</span>
                <Select value={topLimit} onChange={() => setTopLimit} style={{ flex: 1 }}>
                  <Select.Option value={20}>Top20</Select.Option>
                  <Select.Option value={50}>Top50</Select.Option>
                  <Select.Option value={9999}>全部</Select.Option>
                </Select>
              </div>
              <Button
                block
                type="primary"
                size="large"
                loading={loading}
                onClick={runEnrich}
              >
                开始富集分析
              </Button>
            </Space>
          </div>
        </div>

      {/* 结果区域 */}
      {tableData.length > 0 ? (
        <div style={{ marginTop: 24 }}>
          <Card
            tabList={[
              { key: 'bubble', tab: '富集气泡图' },
              { key: 'bar', tab: '通路基因柱状图' }
            ]}
            activeTabKey={activeTab}
            onTabChange={setActiveTab}
            style={{ marginBottom: 16 }}
          >
            {activeTab === 'bubble'
              ? <div ref={bubbleRef} style={{ width: '100%', height: 500 }} />
              : <div ref={barRef} style={{ width: '100%', height: 500 }} />
            }
          </Card>

          <div>
            <div className={'item-title '}>
              富集结果（共${tableData.length}条显著通路）
              <Button icon={<DownloadOutlined />} onClick={exportCSV} type="primary">导出CSV</Button>
            </div>
            <Table
              columns={tableColumns}
              dataSource={tableData}
              rowKey="pathwayId"
              bordered
              scroll={{ x: 'max', y: 600 }}
            />
          </div>
        </div>
      ) : (
        <Empty
          style={{ marginTop: 80 }}
          description="输入基因后点击【开始富集分析】生成结果"
          icon={<FileTextOutlined style={{ fontSize: 40 }} />}
        />
      )}
    </Content>
  )
}
