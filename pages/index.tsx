import React from 'react';
import { Layout, Row, Col, theme, Divider } from 'antd';
import './globals.css';
import Image from 'next/image'
import img from './img/pt.png';
import './index.css';
import { quickTools } from '../config'
import { useRouter } from 'next/navigation';

const { Header, Content, Footer } = Layout;


const Home = () =>
{
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const router = useRouter()
  const goto = (url: string) => {
    router.push(url, { scroll: false })
  }
  return (
    <div>
      <Content style={{ padding: '0 5% 60px' }}>
        <div className={'title-container'}>
          <div className={'title'}>探索葡萄多组学</div>
          <div className={'description'}>葡萄多组学数据库汇聚了来自全球研究者的高质量数据集，提供可重复的分析管线、交互式可视化和多维数据集的整合分析。无论你是入门研究者还是资深学者，这里都是你发现新知识的起点。</div>
        </div>
        <Row justify="space-between">
          <Col span={14}>
            <div className={'title'}>关于葡萄多组学数据库</div>
            <div
              style={{
                background: colorBgContainer,
                minHeight: 280,
                padding: '16px',
                borderRadius: borderRadiusLG,
              }}
            >
              针对制约我国南方鲜食葡萄产业发展的关键性问题，历经30余年，开展葡萄优良品种创制、安全生产以及贮藏加工等整个产业链的系统研究，形成系列原创性成果。收集中国、日本和美国等地葡萄种质400余个，在慈溪、北仑、镇海、余姚等地建立了种质资源保存圃。针对葡萄果实糖酸、香气、硬度、形状和抗性等重要性状，利用遗传学、多组学和分子生物学技术，挖掘出一系列调控葡萄果实糖酸代谢、挥发性香味物质合成和硬度形成等的关键基因。开发基因编辑等定向分子育种技术和分子标记辅助选择技术等，建立现代分子育种平台；结合杂交育种、诱变育种等常规育种技术和现代定向分子育种技术，选育葡萄新种质200余个，筛选优良新种质50余个，获得‘甬早红’、‘甬紫晶’、‘甬妃红’、‘甬早绿’、‘甬绿妃’和‘甬香玉’国家葡萄新品种权6个，正在申请12个；审定省级良种‘鄞红’1个，且已为浙江省葡萄主栽品种之一。构建设施葡萄三膜覆盖促早增效栽培技术，耐储运安全高效栽培技术模式，累计在全国各地推广‘鄞红’葡萄25.5万亩，累计新增产值20.6亿多元，新增利润11.6亿元，促进葡萄产业绿色健康发展和农民增收，取得了显著效益。授权发明专利7项、软件著作权2件、实用新型专利5项，发表学术论文100余篇，制定技术标准2套。
            </div>
          </Col>
          <Col span={10}>
            <Image alt='' src={img} width={600} style={{ paddingTop: 60, paddingLeft: 40 }} />
          </Col>
        </Row>
      </Content>
      <Content className={'white-container'}>
        <Divider style={{ borderColor: colorBgContainer, color: colorBgContainer }} >
          Quick Tools
        </Divider>
        <div className={'cards-container'}>
          {
            quickTools.map((item, index) => (
              <div className={'card'} key={item.label} onClick={() => goto(item.label)} >
                {item.ico}
                <div key={index}>{item.label}</div>
              </div>
            ))
          }
        </div>
      </Content>
    </div>
  );
}

export default Home;
