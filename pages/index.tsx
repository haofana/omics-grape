import React from 'react';
import { Layout, Row, Col, theme, Divider, Carousel } from 'antd';
import './globals.css';
import Image from 'next/image'
import img from './img/pt.png';
import img3 from './img/pt3.png';
import img1 from './img/pt2.png';
import img2 from './img/pt2.jpg';
import './index.css';
import { quickTools } from '../config'
import { useRouter } from 'next/navigation';
import { useI18n } from '@/hooks/useI18n';

const { Header, Content, Footer } = Layout;

const bannerImages = [
  { src: '/home/甬夏艳.png', alt: '甬夏艳' },
  { src: '/home/甬晓脆.png', alt: '甬晓脆' },
  { src: '/home/甬翠玉露.png', alt: '甬翠玉露' },
  { src: '/home/甬翠蜜露.png', alt: '甬翠蜜露' },
  { src: '/home/甬翠香露.png', alt: '甬翠香露' },
  { src: '/home/甬脆丹霞.png', alt: '甬脆丹霞' },
  { src: '/home/甬脆彤露.png', alt: '甬脆彤露' },
  { src: '/home/甬脆玫瑰.png', alt: '甬脆玫瑰' },
  { src: '/home/甬脆香妃.png', alt: '甬脆香妃' },
  { src: '/home/甬霞光.png', alt: '甬霞光' },
  { src: '/home/碧露玫瑰.png', alt: '碧露玫瑰' },
  { src: '/home/翠香皇后.png', alt: '翠香皇后' },
];

const Home = () =>
{
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const t = useI18n();
  const router = useRouter()
  const goto = (url: string) => {
    router.push(url, { scroll: false })
  }
  return (
    <div>
      <Divider size={'small'} />
      <Content style={{ padding: '0 5%' }}>
        <div className="w-full flex flex-col lg:flex-row gap-6 my-8">
          <div className="lg:w-[60%] p-6 bg-white rounded-2xl shadow-sm" style={{
            height: 612,
            overflow: 'auto',
            padding: '20px',
            borderRadius: borderRadiusLG,
          }}>
            <div className={'title text-2xl font-bold text-[#507D5A] mb-4'}>{t.welcome}{t.title}</div>
            <div
              className="text-lg leading-[1.8] text-gray-700"
            >
              <div className={'description'}>{t.paragraph1}</div>
              <div className={'description'}>{t.paragraph2}</div>
              <div className={'description'}>{t.paragraph3}</div>
              {/*针对制约我国南方鲜食葡萄产业发展的关键性问题，历经30余年，开展葡萄优良品种创制、安全生产以及贮藏加工等整个产业链的系统研究，形成系列原创性成果。收集中国、日本和美国等地葡萄种质400余个，在慈溪、北仑、镇海、余姚等地建立了种质资源保存圃。针对葡萄果实糖酸、香气、硬度、形状和抗性等重要性状，利用遗传学、多组学和分子生物学技术，挖掘出一系列调控葡萄果实糖酸代谢、挥发性香味物质合成和硬度形成等的关键基因。开发基因编辑等定向分子育种技术和分子标记辅助选择技术等，建立现代分子育种平台；结合杂交育种、诱变育种等常规育种技术和现代定向分子育种技术，选育葡萄新种质200余个，筛选优良新种质50余个，获得‘甬早红’、‘甬紫晶’、‘甬妃红’、‘甬早绿’、‘甬绿妃’和‘甬香玉’国家葡萄新品种权6个，正在申请12个；审定省级良种‘鄞红’1个，且已为浙江省葡萄主栽品种之一。构建设施葡萄三膜覆盖促早增效栽培技术，耐储运安全高效栽培技术模式，累计在全国各地推广‘鄞红’葡萄25.5万亩，累计新增产值20.6亿多元，新增利润11.6亿元，促进葡萄产业绿色健康发展和农民增收，取得了显著效益。授权发明专利7项、软件著作权2件、实用新型专利5项，发表学术论文100余篇，制定技术标准2套。*/}
            </div>
          </div>
          <div className="lg:w-[45%] grid grid-cols-2 grid-rows-2 gap-3 h-full">
            {/*<Image alt='' src={img} style={{ paddingTop: 60, paddingLeft: 40, width: '100%', height: '100%', objectFit: 'cover' }} />*/}
            {/*<Row justify="space-between">*/}
              <div className="relative w-full h-full rounded-xl overflow-hidden shadow"><Image alt='' src={img2} className={'img-container'}/></div>
              <div className="relative w-full h-full rounded-xl overflow-hidden shadow"><Image alt='' src={img3} className={'img-container'}/></div>
              <div className="relative w-full h-full rounded-xl overflow-hidden shadow"><Image alt='' src={img} className={'img-container'}/></div>
              <div className="relative w-full h-full rounded-xl overflow-hidden shadow"><Image alt='' src={img1} className={'img-container'}/></div>
            {/*</Row>*/}
          </div>
        </div>
      </Content>
      <div className="w-full py-2 px-6 " style={{ backgroundColor: '#ffffffdd' }}>
        <Carousel
          autoplay
          infinite
          arrows
          dots={{ className: 'custom-dots' }}
          slidesToShow={7} // 桌面端一屏5张，自适应
          slidesToScroll={1}
          speed={800}
          responsive={[
            { breakpoint: 640, settings: { slidesToShow: 2 } },
            { breakpoint: 768, settings: { slidesToShow: 3 } },
            { breakpoint: 1024, settings: { slidesToShow: 4 } },
            { breakpoint: 1280, settings: { slidesToShow: 5 } },
          ]}
          className="grape-carousel"
        >
          {bannerImages.map((item, index) => (
            <div key={index} className="px-3 py-2 h-[200px] img-bg" >
              <Image
                src={item.src}
                alt={item.alt}
                title={item.alt}
                width={100}
                height={100}
                className="object-cover hover:scale-110 transition-transform duration-500 mx-auto"
              />
            </div>
          ))}
        </Carousel>
      </div>
      {/*<Footer className={'white-container'}>*/}
      {/*  <Divider style={{ borderColor: colorBgContainer, color: colorBgContainer }} >*/}
      {/*    Quick Tools*/}
      {/*  </Divider>*/}
      {/*  <div className={'cards-container'}>*/}
      {/*    {*/}
      {/*      quickTools.map((item, index) => (*/}
      {/*        <div className={'card'} key={item.label} onClick={() => goto(item.label)} >*/}
      {/*          {item.ico}*/}
      {/*          <div key={index}>{item.label}</div>*/}
      {/*        </div>*/}
      {/*      ))*/}
      {/*    }*/}
      {/*  </div>*/}
      {/*</Footer>*/}
    </div>
  );
}

export default Home;
