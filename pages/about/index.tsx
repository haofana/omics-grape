import React from 'react';
import { Carousel, Layout, theme } from 'antd';
import Image from 'next/image';
import img from './img.png';
import bg from '../img/img_1.png';
import { useI18n } from '@/hooks/useI18n';

const { Content } = Layout;

export default function LabIntro() {
  const { token: { colorBorder, borderRadiusLG }, } = theme.useToken();

  const t = useI18n();

  return (
    <Content style={{ padding: '16px 48px', backgroundColor: colorBorder, minHeight: 'calc(100vh - 64px)', fontSize: '14px' }}>
      <div className="max-w-5xl mx-auto px-4 py-10 text-gray-800 space-y-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#2D5D37]">
            R&D Group for Southern Grape Genetics, Breeding and Cultivation Technology
          </h1>
          <p className="text-gray-500 mt-2 text-lg">Zhejiang Wanli University</p>
          <p className="text-gray-400 mt-1 text-sm">南方葡萄遗传育种与栽培技术研发团队</p>
        </div>

        {/* Group Overview | 团队概况 */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-[#2D5D37] border-l-4 border-[#507D5A] pl-3">
            Group Overview
            <span className="text-sm text-gray-400 ml-2">团队概况</span>
          </h2>
          <div className="space-y-3">
            <p className="leading-relaxed">
              Focusing on grape germplasm innovation, fruit quality biology and new cultivar development, our group is one of the earliest continuous grape research teams in South China. Aiming at the industrial demands of subtropical table grape production, we have built a complete research system covering germplasm conservation & phenotypic evaluation, dissection of key trait regulatory mechanisms, molecular breeding technology development, new cultivar breeding and matched cultivation techniques, targeting elite traits including high fruit quality, long shelf life, early ripening and multi-stress resistance.
            </p>
            <p className="leading-relaxed">
              Since 1990, we have carried out long-term systematic grape research, assembled abundant germplasm resources and breeding populations, and established stable platforms for resource preservation and phenotypic analysis. Centered on sugar-acid balance, aroma biosynthesis, fruit texture, berry appearance and stress resistance, we integrate genetics, multi-omics and molecular biology to excavate functional genes and clarify regulatory pathways, advancing grape improvement from empirical screening to mechanistic research and precision germplasm creation.
            </p>
            <p className="leading-relaxed">
              We attach equal importance to basic research and industrial translational study. Conventional cross breeding, mutation breeding are combined with modern biotechnologies including marker-assisted selection and CRISPR gene editing to develop novel grape germplasm, commercial varieties and supporting cultivation protocols. Up to now, we have obtained 6 national new plant variety rights for grapes, with multiple varieties pending application. Our provincial registered cultivar <i>Yinhong</i> has become one of the dominant table grape varieties cultivated in Zhejiang Province.
            </p>
            <p className="leading-relaxed">
              We have accumulated abundant research outputs and built comprehensive research platforms. Our achievements include 15 authorized invention patents, software copyrights and utility patents, as well as more than 100 peer-reviewed academic papers, forming a systematic research system for grape germplasm innovation, quality improvement and industrial technical services. The popularization of our proprietary varieties and cultivation technologies effectively promotes quality & efficiency upgrading, eco-friendly viticulture and farmers’ income growth in local grape industry.
            </p>
            <details className="bg-gray-50 p-3 rounded-lg mt-2">
              <summary className="text-gray-600 cursor-pointer text-sm">查看中文介绍</summary>
              <p className="mt-2 text-gray-700 text-sm leading-relaxed">
                南方葡萄遗传育种与栽培技术研发团队长期聚焦葡萄种质资源创新、果实品质生物学与新品种创制，是我国南方地区较早持续开展葡萄相关研究的团队之一。面向南方鲜食葡萄产业发展需求，实验室围绕优质、耐贮运、早熟和抗逆等目标性状，逐步形成了以种质资源保存与评价、重要性状形成机制解析、分子改良技术研发、新品种选育与配套栽培应用为主要内容的研究体系。
                自1990年以来，实验室持续开展葡萄相关研究，已积累较为丰富的种质资源和育种材料，建立了较稳定的资源保存与研究基础。围绕葡萄果实糖酸协调、香气形成、质地与硬度塑造、果实外观及抗性等关键性状，实验室综合运用遗传学、多组学和分子生物学等技术，持续开展关键基因挖掘、调控机制研究与育种利用研究，推动葡萄改良研究由经验筛选向机制解析与精准创制延伸。
                在长期研究与实践中，实验室坚持基础研究与应用研究并重，将常规杂交育种、诱变育种与分子标记辅助选择、基因编辑等现代育种技术有机结合，持续开展葡萄新种质创制、新品种选育及配套栽培技术研究。经过多年积累，已获得国家葡萄新品种权6个，另有多个新品种处于申请阶段；审定省级良种‘鄞红’1个，并已成为浙江省葡萄主栽品种之一。
                实验室已形成一定的成果积累和平台基础。相关研究获得授权发明专利、软件著作权和实用新型专利15项，发表学术论文100余篇，并在葡萄种质创新、品质改良和产业服务等方面形成了较为系统的研究基础。依托新品种与配套技术推广应用，相关工作在促进葡萄产业提质增效、绿色发展和农民增收方面发挥了积极作用。
              </p>
            </details>
          </div>
        </div>

        {/* Research Directions | 研究方向 */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-[#2D5D37] border-l-4 border-[#507D5A] pl-3">
            Research Directions
            <span className="text-sm text-gray-400 ml-2">研究方向</span>
          </h2>
          <ul className="list-disc pl-6 space-y-3">
            <li>
              <p className="font-medium">Collection, Ex-situ Conservation and Phenotypic Evaluation of Grape Germplasm Resources</p>
              <p className="text-sm text-gray-500">葡萄种质资源收集、离体保存与表型综合评价</p>
            </li>
            <li>
              <p className="font-medium">Molecular Regulatory Mechanisms of Grape Fruit Quality Traits (Sugar-Acid Metabolism, Berry Firmness, Fruit Shape, Volatile Aroma Components, etc.)</p>
              <p className="text-sm text-gray-500">葡萄果实品质性状分子调控机制（糖酸代谢、果肉硬度、果形、香气物质等）</p>
            </li>
            <li>
              <p className="font-medium">Development of Marker-Assisted Selection, Gene Editing and Targeted Germplasm Improvement Technologies for Grape</p>
              <p className="text-sm text-gray-500">葡萄分子标记辅助育种、基因编辑与种质定向改良技术研发</p>
            </li>
            <li>
              <p className="font-medium">Novel Grape Cultivar Creation and Matched Sustainable Cultivation Technology System</p>
              <p className="text-sm text-gray-500">葡萄新品种创制及配套绿色栽培技术体系研发</p>
            </li>
          </ul>
        </div>

        {/* Key Researchers | 主要科研人员 */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-[#2D5D37] border-l-4 border-[#507D5A] pl-3">
            Key Researchers
            <span className="text-sm text-gray-400 ml-2">主要科研人员</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-4 bg-gray-50 rounded-xl">
              <h3 className="font-medium text-[#2D5D37] text-lg">Wu Yueyan</h3>
              <p className="text-sm text-gray-500">Professor Level II, Master Supervisor</p>
              <p className="mt-2 text-sm">
                Research Focus: Plant nutritional physiology & fruit quality regulation, plant genetics and molecular breeding. Academic leader of the group’s grape genetic improvement program.
              </p>
              <p className="mt-1 text-xs text-gray-400">二级教授，硕士生导师，团队葡萄遗传改良与品质研究学术带头人</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl">
              <h3 className="font-medium text-[#2D5D37] text-lg">Wang Liru</h3>
              <p className="text-sm text-gray-500">Extension Researcher, Industrial Master Supervisor</p>
              <p className="mt-2 text-sm">
                Research Focus: Fruit cultivation technology R&D and industrial popularization. Lead scientist for protected grape cultivation technical innovation and field promotion.
              </p>
              <p className="mt-1 text-xs text-gray-400">推广研究员，硕士行业导师，团队葡萄设施栽培技术研发与推广负责人</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl">
              <h3 className="font-medium text-[#2D5D37] text-lg">Fang Congling</h3>
              <p className="text-sm text-gray-500">Senior Engineer, Industrial Master Supervisor</p>
              <p className="mt-2 text-sm">
                Research Focus: Grape cultivation technology extension, industrial technical upgrading and on-site agricultural production services.
              </p>
              <p className="mt-1 text-xs text-gray-400">高级工程师，硕士行业导师，专注葡萄栽培技术推广、果树产业升级与一线生产服务</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl">
              <h3 className="font-medium text-[#2D5D37] text-lg">Yang Zhongyi</h3>
              <p className="text-sm text-gray-500">Ph.D., Master Supervisor</p>
              <p className="mt-2 text-sm">
                Research Focus: Grape fruit quality biology and genetic breeding. Core researcher for grape quality regulatory mechanism and germplasm improvement.
              </p>
              <p className="mt-1 text-xs text-gray-400">博士，硕士生导师，主攻葡萄果实品质生物学与遗传育种，葡萄品质调控与种质改良核心骨干</p>
            </div>
          </div>
        </div>

        {/* Graduate Training | 研究生培养 */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-[#2D5D37] border-l-4 border-[#507D5A] pl-3">
            Graduate Training
            <span className="text-sm text-gray-400 ml-2">研究生培养</span>
          </h2>
          <div className="space-y-3">
            <p className="leading-relaxed">
              Our group prioritizes high-quality graduate education. Supported by abundant grape germplasm collections, breeding populations, multi-omics datasets and industrial viticulture practice platforms, we provide systematic research training covering fruit quality regulation, molecular dissection of agronomic traits, molecular breeding and new cultivar development. Each student receives joint supervision from university academic supervisors and industrial technical mentors, integrating fundamental laboratory research with real-world field production, to cultivate comprehensive capabilities including scientific logical thinking, experimental proficiency and industrial agricultural cognition.
            </p>
            <p className="leading-relaxed">
              Our graduate training program has achieved outstanding long-term outcomes. Numerous alumni have pursued doctoral degrees at top-tier universities including Zhejiang University, Lanzhou University and Nanjing Agricultural University. Other graduates take professional roles in higher education institutions, research institutes, agricultural enterprises and grassroots agricultural service sectors. Over the past five years, our graduate students have continuously received prestigious honors including National Graduate Scholarship and Provincial Outstanding Graduate, demonstrating remarkable training quality.
            </p>
            <details className="bg-gray-50 p-3 rounded-lg mt-2">
              <summary className="text-gray-600 cursor-pointer text-sm">查看中文介绍</summary>
              <p className="mt-2 text-gray-700 text-sm leading-relaxed">
                实验室重视研究生培养，依托葡萄种质资源、育种材料、多组学数据和产业实践平台，围绕果实品质调控、重要性状机制解析、分子育种与新品种创制等方向开展科研训练。团队由高校教师与行业导师共同参与指导，注重基础研究与生产实践相结合，强调科研思维、实验技能与产业认知的协同提升。
                从近年培养情况看，团队在研究生继续深造、就业发展和人才培养质量方面均形成了较为稳定的基础。多位研究生考取浙江大学、兰州大学、南京农业大学等高校博士研究生，部分毕业生进入高校、科研院所、企业和基层公共服务岗位工作；近五年，团队研究生连续获得国家奖学金、省级优秀毕业生等荣誉，体现了较好的培养成效。
              </p>
            </details>
          </div>
        </div>

        {/* Admissions Majors & Research Tracks | 招生专业与方向 */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-[#2D5D37] border-l-4 border-[#507D5A] pl-3">
            Admissions Majors & Research Tracks
            <span className="text-sm text-gray-400 ml-2">招生专业与研究方向</span>
          </h2>
          <div className="space-y-3">
            <div>
              <p className="font-medium">Biology</p>
              <p className="text-sm">Botany / Biochemistry & Molecular Biology</p>
              <p className="text-xs text-gray-500">生物学：植物学 / 生物化学与分子生物学</p>
            </div>
            <div>
              <p className="font-medium">Biology and Medicine</p>
              <p className="text-sm">Biotechnology & Germplasm Engineering</p>
              <p className="text-xs text-gray-500">生物与医药：生物技术与种质工程</p>
            </div>
            <div>
              <p className="font-medium">Food Science & Nutrition</p>
              <p className="text-sm">Food Nutrition & Health / Postharvest Storage and Preservation of Agricultural Products</p>
              <p className="text-xs text-gray-500">食品与营养：食品营养与健康 / 农产品贮藏保鲜</p>
            </div>
          </div>
        </div>
      {/*<div className="w-full py-2">*/}
      {/*    <Carousel*/}
      {/*      autoplay*/}
      {/*      infinite*/}
      {/*      arrows*/}
      {/*      dots={{ className: 'custom-dots' }}*/}
      {/*      slidesToShow={4} // 桌面端一屏5张，自适应*/}
      {/*      slidesToScroll={1}*/}
      {/*      speed={800}*/}
      {/*      className="grape-carousel"*/}
      {/*    >*/}
      {/*      {bannerImages.map((item, index) => (*/}
      {/*        <div key={index} className="img-bg">*/}
      {/*          <Image*/}
      {/*            src={item.src}*/}
      {/*            alt={item.alt}*/}
      {/*            title={item.alt}*/}
      {/*            width={300}*/}
      {/*            height={100}*/}
      {/*            className="object-cover hover:scale-110 transition-transform duration-500 mx-auto"*/}
      {/*          />*/}
      {/*        </div>*/}
      {/*      ))}*/}
      {/*    </Carousel>*/}
      {/*  </div>*/}
    </div>
    </Content>
  );
}
