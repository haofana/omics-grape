import React, {useEffect, useState} from 'react'
import {Spin, Layout, Tabs, theme, Button, Checkbox, Card, Table, Form, Input} from 'antd';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vs } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import '../index.css';
import { CDSlist, ProteinList } from "../../config/dbList";
import { useI18n } from "../../hooks/useI18n";

const { Content } = Layout;
const { TextArea } = Input;
const CheckboxGroup = Checkbox.Group;
const getPidentColor = (p) => {
  if (p >= 95) return '#2E8B57'
  if (p >= 80) return '#32CD32'
  if (p >= 60) return '#FFD700'
  return '#FF4500'
}

export default function BlastMultiDB() {
  const t = useI18n();
  const [program, setProgram] = useState('blastn')  // 选择基因组/蛋白tab
  const [activeTab, setActiveTab] = useState('1')  // 输出结果tab
  const [params, setParams] = useState({});
  const [form] = Form.useForm();
  const [DBOptions, setDBOptions] = useState(CDSlist);
  const [result, setResult] = useState(null)
  const [queryLen, setQueryLen] = useState(0)
  const [loading, setLoading] = useState(false)

  useEffect(()=>{
    form.resetFields();
    setDBOptions(program === 'blastn' ? CDSlist : ProteinList);
  }, [program]);

  // 分类 cds/pro
  const items = [
    {
      key: 'blastn',
      label: 'Blastn genome'
    }, {
      key: 'blastp',
      label: 'Blastp protein'
    }]

  const onFinish = async (values) => {
    // setParams(values)
    setLoading(true)
    setActiveTab('1')
    const { seq, databaseList, evalue, wordSize, maxTarget } = values;

    const qlen = seq.replace(/\s/g, '').length
    setQueryLen(qlen)
    const res = await fetch('/api/blast', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sequence: seq,
        program: program,
        dblist: DBOptions.filter(item=>databaseList.includes(item.name)).map(i=>i.db), // 勾选的库
        wordSize,
        evalue,
        maxTarget
      })
    })
    const data = await res.json()
    setResult(data)
    setLoading(false)
  };
  const {token: { colorBorder, borderRadiusLG },} = theme.useToken();
  const onChange = key => {
    setProgram(key)
  }
  const selectAll = () => {
    form.setFieldValue( 'databaseList', DBOptions.map(item=>item.name))
  }
  const inverse = () => {
    form.setFieldValue( 'databaseList', [])
  }
  const setSeq = () => {
    form.setFieldValue( 'seq', '>Vitvi05g01265_t001\tVitvi05g01265|cdna chromosome:PN40024.v4:5:18622473:18624191:1 gene:Vitvi05g01265 gene_biotype:protein_coding transcript_biotype:protein_coding description:Vitvi05g01265\n' +
      'CTCAAGTCTTAACCCCTATATATATATGCCATTTCCTCCCTTTCCTAAAACCCCACATCCAATTCTACAAAACCCTCTCTTCTCTTCTCTTCTCACAAAA\n' +
      'TGGGGTCTTCTTCAAATGGGTATTCAGTGTTTTTGTTGCTTTTTGCAGTGGTGGTGGCTACTGCCTCCGCTAGTAACTTCTATCAAGACTTTGACCTTAC\n' +
      'ATGGGGTGATAATCGTGCTAAGATCTTCAATGGAGGACAGCTGCTGTCTCTCTCCCTAGACCAGGCATCTGGCTCTGGGTTTCAGTCCAAGAAGGAGTAT\n' +
      'CTGTTTGGGAGGATTGACATGCAGCTCAAGCTTGTCGCTGGCAACTCTGCTGGCACCGTCACTGCCTACTACTTATCTTCTCAAGGGTCAACCCATGATG\n' +
      'AGATTGACTTCGAGTTCCTGGGAAACCTGAGTGGAGATCCTTACATCCTTCATACCAATGTATTCACTCAAGGGAAGGGCAACAGGGAGCAGCAATTCTA\n' +
      'CCTCTGGTTCGACCCCACCCGTAACTTCCACACCTATTCCATCATCTGGACCGCCCGGCACATCATTTTCTTGGTGGACAACGTTCCCATAAGGCTATTC\n' +
      'AAGAATGCAGAATCAATGGGAGTTCCCTTCCCAAAGAACCAGCCCATGAGGATATACTCAAGCCTCTGGAACGCGGATGACTGGGCCACAAGAGGAGGGT\n' +
      'TGGTGAAAACTGACTGGTCCAAGGCACCCTTCACAGCATACTACCGGAACTTCAGAGCCAACTCCTCGACCCCCACAAGTTCATTCCCTGACAGTACCTT\n' +
      'CCAGACCCAAGAACTCGATTCCTACAGCAGAAGAAGGCTGAGATGGGTTCAGAAGAACTTCATGATTTACAACTACTGCACTGATCTCAAACGCTTTCCT\n' +
      'CAAGGTGTCCCTGCTGAGTGTAAGCGCTCAAGGTTTAATCTCTAGAACAGTATGGGTGGAGTTTATACAAGGGTGAGGCGTGAATATTATTCTTTTGTTG\n' +
      'TTTCCTCTCCATCATGGGCTTGGTGCTTATAAGTCATAAGTTACGGTACAAATAAATTATTCTTTGCTTTGTATGTAAGGGTTAATTATTGTCATATATC\n' +
      'AACCTGTTTTTGTATTTCAAATAATAATATAATAAATTATATGGTGTTGTATTTTTGAAATTTTGGAGAGGACCCAGTCCAAATCAAGCAATGTCTCCAA\n' +
      'TTGAAT')
  }

  // Tab 1: Descriptions（结果列表）
  const descColumns = [
    { title: 'Description', dataIndex: 'description', key: 'desc', width: '60%' },
    { title: 'Bit Score', dataIndex: 'bitscore', key: 'bitscore', width: '15%' },
    { title: 'E-value', dataIndex: 'evalue', key: 'evalue', width: '25%', render: e => e.toExponential(2) }
  ]

  // Tab 2: Graphic Summary（彩色条带图）
  const renderGraphicSummary = () => {
    if (!result?.graphicHits.length) return <p>No hits found</p>
    const queryLen = result.queryLen
    const svgWidth = 1000
    const barHeight = 16
    const gap = 4

    return (
      <div style={{ padding: '20px' }}>
        <h3>Distribution of the top {result.graphicHits.length} Blast Hits</h3>
        <svg width={svgWidth} height={result.graphicHits.length * (barHeight + gap) + 60}>
          {/* Query 参考条 */}
          <rect x={0} y={10} width={svgWidth} height={20} fill="#87CEEB" rx={4} />
          <text x={svgWidth/2} y={25} textAnchor="middle" fontSize={16} fontWeight="bold">Query</text>
          {/* 坐标刻度 */}
          {[0, 200, 400, 600, 800, 1000].map(x => (
            <g key={x}>
              <line x1={(x/1000)*svgWidth} y1={30} x2={(x/1000)*svgWidth} y2={40} stroke="#000" />
              <text x={(x/1000)*svgWidth} y={55} textAnchor="middle" fontSize={12}>
                {Math.round((x/1000)*queryLen)}
              </text>
            </g>
          ))}
          {/* 匹配条带 */}
          {result.graphicHits.map((hit, i) => {
            const x = (hit.qstart / queryLen) * svgWidth
            const width = ((hit.qend - hit.qstart) / queryLen) * svgWidth
            return (
              <rect
                key={i}
                x={x}
                y={60 + i * (barHeight + gap)}
                width={width}
                height={barHeight}
                fill={getPidentColor(hit.pident)}
                rx={2}
              />
            )
          })}
        </svg>
      </div>
    )
  }

  // Tab 3: Alignments（详细比对）
  const renderAlignments = () => {
    if (!result?.alignments.length) return <p>No alignments found</p>
    return result.alignments.map((align, i) => (
      <Card key={i} title={`${align.db} | ${align.header}`} style={{ marginBottom: 20 }}>
        <SyntaxHighlighter
          language="text"
          style={vs}
          customStyle={{ fontSize: 13, lineHeight: 1.6 }}
        >
          {align.query.map((q, idx) => (
            `Query  ${q.pos}  ${q.seq}\n${align.midline[idx]}\nSbjct  ${align.subject[idx].pos}  ${align.subject[idx].seq}\n`
          )).join('')}
        </SyntaxHighlighter>
      </Card>
    ))
  }

  // Tab 4: Taxonomy（分类学）
  const renderTaxonomy = () => {
    if (!result?.taxonomy.length) return <p>No taxonomy data</p>
    return (
      <div style={{ padding: '20px' }}>
        {result.taxonomy.map((tax, i) => (
          <div key={i} style={{ marginBottom: 10 }}>
            <h4>Database: {tax.db}</h4>
            <p style={{ fontSize: 14, lineHeight: 1.8 }}>
              {tax.lineage.split(' > ').map((rank, idx) => (
                <span key={idx}>
                  {rank}
                  {idx < tax.lineage.split(' > ').length - 1 && ' > '}
                </span>
              ))}
            </p>
          </div>
        ))}
      </div>
    )
  }

  return (
    <Content style={{ padding: '16px 48px', backgroundColor: colorBorder, minHeight: 'calc(100vh - 64px)' }}>
      <div className={'item-title '}>
        BLAST
      </div>
      <Spin description="Loading" size="large" spinning={loading}>
        <Tabs activeKey={program} items={items} onChange={onChange} />
        <Form
          form={form}
          name="blast"
          // layout="inline"
          style={{ width: '100%', marginBottom: 20 }}
          initialValues={{ evalue: '1e-5', wordSize: '28', maxTarget: '10' }}
          onFinish={onFinish}
          // onFinishFailed={onFinishFailed}
          autoComplete="off"
          labelAlign="right"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
        >
          <Form.Item
            label='Fasta sequences'
            name="seq"
            rules={[{ required: true, message: 'Fasta sequences is required!' }]}
          >
            <TextArea style={{ width: 800 }} autoSize={{ minRows: 4, maxRows: 10 }} allowClear={true} />
          </Form.Item>
          <Form.Item
            label={null}
          >
            <a onClick={setSeq}>example</a>
          </Form.Item>
          <Form.Item
            label='Database'
            name="databaseList"
            rules={[{ required: true, message: 'Database is required!' }]}
          >
            <CheckboxGroup options={DBOptions.map(item=>item.name)} />
          </Form.Item>
          <Form.Item label={null}>
            <Button type="primary" onClick={selectAll} size="small">
              {t.all}
            </Button>
            <Button type="primary" onClick={inverse} size="small" style={{ marginLeft: 18 }}>
              {t.inverse}
            </Button>
          </Form.Item>
          <Form.Item
            label='Evalue'
            name="evalue"
            rules={[{ required: true, message: 'Evalue is required!' }]}
          >
            <Input style={{ width: 150 }}/>
          </Form.Item>
          <Form.Item
            label='Word size'
            name="wordSize"
            rules={[{ required: true, message: 'Evalue is required!' }]}
          >
            <Input style={{ width: 150 }}/>
          </Form.Item>
          <Form.Item
            label='Max target seqs'
            name="maxTarget"
            rules={[{ required: true, message: 'Evalue is required!' }]}
          >
            <Input style={{ width: 150 }}/>
          </Form.Item>
          <Form.Item label={null}>
            <Button type="primary" htmlType="submit">
              {t.start}
            </Button>
          </Form.Item>

        </Form>

        {result && (
          <Tabs
            activeKey={activeTab}
            onChange={setActiveTab}
            items={[
              {
                key: '1',
                label: 'Descriptions',
                children: (
                  <Table
                    columns={descColumns}
                    dataSource={result.descriptions}
                    rowKey={(r, i) => i}
                    pagination={false}
                    bordered
                  />
                )
              },
              {
                key: '2',
                label: 'Graphic Summary',
                children: renderGraphicSummary()
              },
              {
                key: '3',
                label: 'Alignments',
                children: renderAlignments()
              },
              {
                key: '4',
                label: 'Taxonomy',
                children: renderTaxonomy()
              }
            ]}
          />
        )}
      </Spin>
    </Content>
  )
}
