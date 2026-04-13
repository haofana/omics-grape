import React from 'react';
import { Layout, theme } from 'antd';
import Image from 'next/image';
import img from './img.png';
import bg from '../img/img_1.png';

const { Content } = Layout;

export default function LabIntro() {
  const { token: { colorBorder, borderRadiusLG }, } = theme.useToken();
  return (
    <Content style={{ padding: '16px 48px', backgroundColor: colorBorder, minHeight: 'calc(100vh - 64px)', fontSize: '14px' }}>
      <div className="max-w-5xl mx-auto px-4 py-10 text-gray-800 space-y-12">
      {/* 标题区 */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-[#2D5D37]">
          浙江万里学院植物生理与分子改良实验室
        </h1>
      </div>

      {/* 实验室概况 */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-[#2D5D37] border-l-4 border-[#507D5A] pl-3">
          实验室概况
        </h2>
        <p className="leading-relaxed">
          植物生理与分子改良实验室长期聚焦葡萄种质资源创新、果实品质生物学与新品种创制，是我国南方地区较早持续开展葡萄相关研究的团队之一。面向南方鲜食葡萄产业发展需求，实验室围绕优质、耐贮运、早熟和抗逆等目标性状，逐步形成了以种质资源保存与评价、重要性状形成机制解析、分子改良技术研发、新品种选育与配套栽培应用为主要内容的研究体系。
        </p>
        <p className="leading-relaxed">
          自1990年以来，实验室持续开展葡萄相关研究，已积累较为丰富的种质资源和育种材料，建立了较稳定的资源保存与研究基础。围绕葡萄果实糖酸协调、香气形成、质地与硬度塑造、果实外观及抗性等关键性状，实验室综合运用遗传学、多组学和分子生物学等技术，持续开展关键基因挖掘、调控机制研究与育种利用研究，推动葡萄改良研究由经验筛选向机制解析与精准创制延伸。
        </p>
        <p className="leading-relaxed">
          在长期研究与实践中，实验室坚持基础研究与应用研究并重，将常规杂交育种、诱变育种与分子标记辅助选择、基因编辑等现代育种技术有机结合，持续开展葡萄新种质创制、新品种选育及配套栽培技术研究。经过多年积累，已获得国家葡萄新品种权6个，另有多个新品种处于申请阶段；审定省级良种‘鄞红’1个，并已成为浙江省葡萄主栽品种之一。
        </p>
        <p className="leading-relaxed">
          实验室已形成一定的成果积累和平台基础。相关研究获得授权发明专利、软件著作权和实用新型专利15项，发表学术论文100余篇，并在葡萄种质创新、品质改良和产业服务等方面形成了较为系统的研究基础。依托新品种与配套技术推广应用，相关工作在促进葡萄产业提质增效、绿色发展和农民增收方面发挥了积极作用。
        </p>
      </div>

      {/* 研究方向 */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-[#2D5D37] border-l-4 border-[#507D5A] pl-3">
          研究方向
        </h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>葡萄种质资源的收集、保存与评价</li>
          <li>葡萄果实品质（糖酸、硬度、形状和香气等）性状形成机制研究</li>
          <li>葡萄分子标记辅助选择、基因编辑与定向改良技术研究</li>
          <li>葡萄新品种创制及配套栽培技术研究</li>
        </ul>
      </div>

      {/* 科研团队 */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-[#2D5D37] border-l-4 border-[#507D5A] pl-3">
          主要科研人员
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-4 bg-gray-50 rounded-xl">
            <h3 className="font-medium text-[#2D5D37]">吴月燕</h3>
            <p className="text-sm text-gray-500">二级教授，硕士生导师</p>
            <p className="mt-2 text-sm">
              主要从事植物营养生理与品质调控、植物遗传育种与分子生物学研究，是团队葡萄遗传改良与品质研究学术带头人。
            </p>
          </div>
          <div className="p-4 bg-gray-50 rounded-xl">
            <h3 className="font-medium text-[#2D5D37]">王立如</h3>
            <p className="text-sm text-gray-500">推广研究员，硕士研究生行业导师</p>
            <p className="mt-2 text-sm">
              主要从事果树栽培技术研究与推广，是团队葡萄设施栽培关键技术研发与推广带头人。
            </p>
          </div>
          <div className="p-4 bg-gray-50 rounded-xl">
            <h3 className="font-medium text-[#2D5D37]">房聪玲</h3>
            <p className="text-sm text-gray-500">高级工程师，硕士研究生行业导师</p>
            <p className="mt-2 text-sm">
              主要从事葡萄栽培技术研究与推广，在果树产业技术提升、生产服务方面经验丰富。
            </p>
          </div>
          <div className="p-4 bg-gray-50 rounded-xl">
            <h3 className="font-medium text-[#2D5D37]">杨中义</h3>
            <p className="text-sm text-gray-500">博士，硕士生导师</p>
            <p className="mt-2 text-sm">
              主要从事葡萄果实品质生物学与遗传育种研究，是葡萄品质研究与遗传改良主要力量。
            </p>
          </div>
        </div>
        <Image src={img} alt={''} className="rounded-xl" />
      </div>

      {/* 研究生培养 */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-[#2D5D37] border-l-4 border-[#507D5A] pl-3">
          研究生培养
        </h2>
        <p className="leading-relaxed">
          实验室重视研究生培养，依托葡萄种质资源、育种材料、多组学数据和产业实践平台，围绕果实品质调控、重要性状机制解析、分子育种与新品种创制等方向开展科研训练。团队由高校教师与行业导师共同参与指导，注重基础研究与生产实践相结合，强调科研思维、实验技能与产业认知的协同提升。
        </p>
        <p className="leading-relaxed">
          从近年培养情况看，团队在研究生继续深造、就业发展和人才培养质量方面均形成了较为稳定的基础。多位研究生考取浙江大学、兰州大学、南京农业大学等高校博士研究生，部分毕业生进入高校、科研院所、企业和基层公共服务岗位工作；近五年，团队研究生连续获得国家奖学金、省级优秀毕业生等荣誉，体现了较好的培养成效。
        </p>
      </div>

      {/* 招生专业 */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-[#2D5D37] border-l-4 border-[#507D5A] pl-3">
          招生专业与方向
        </h2>
        <div className="space-y-2">
          <p><span className="font-medium">生物学：</span>植物学 / 生物化学与分子生物学</p>
          <p><span className="font-medium">生物与医药：</span>生物技术与种质工程</p>
          <p><span className="font-medium">食品与营养：</span>食品营养与健康 / 农产品贮藏保鲜</p>
        </div>
      </div>
    </div>
    </Content>
  );
}
