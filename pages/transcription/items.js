import img1 from './img_1.png';
import img2 from './img_2.png';
import img3 from './img_3.png';
import img4 from './img_4.png';
import img5 from './img_5.png';
import img6 from './img_6.png';
import img7 from './img_7.png';


const items = [
  {
    key: 'fruitDevelopment',
    label: '果实发育',
    description: '采集鄞红葡萄幼果期（S1）、膨大Ⅱ期（S2）、转色期（S3）和成熟期（S4），甜蜜蓝宝石葡萄膨大Ⅱ期（T1）、转色期（T2）和成熟期（T3）果实进行转录组测序。',
    img: img1
  },
  {
    key: 'fruitAroma',
    label: '果实香气',
    description: '对10年生‘寒香蜜’葡萄的硬核期果实，采用外源植物生长调节剂为2.0 μmol L-1独角金内酯（G2）、1.0 μmol/L 独角金内酯抑制剂（T）和清水（CK）进行处理。选择成熟期果实进行转录组测序。',
    img: img2
  },
  {
    key: 'fruitAstringent',
    label: '果实涩味',
    description: '选择生长势一致、无明显病虫害的5年生鲜食葡萄‘黑皇’（Black Emperor）植株，于果实硬核后期，分别采用独脚金内酯（GR24）、独脚金内酯合成抑制剂（Tis108）、油菜素内酯（BR）、油菜素内酯合成抑制剂（BRZ）、褪黑素（Mel）浸泡果穗，具体处理浓度见表1。采集成熟期果实选择差异最显著的材料（CK、BR-1和GR-3）进行转录组测序。',
    table: true,
    img: img3
  },
  {
    key: 'fruitFirmness1',
    label: '果实硬度-赤霉素和NO处理',
    description: '对15年生‘鄞红’葡萄的硬核期果实，喷施清水（TK）、2.5 μmol/L SNP、5μmol/L SNP、10μmol/L SNP、20μmol/L SNP、40μmol/L SNP、1.5mmol/L GA3、3mmol/LGA3、6mmol/LGA3、12mmol/LGA3、24mmol/L GA3和 SNP/GA3联合处理（LH）。选择成熟期果实进行转录组测序。',
    img: img4
  },
  {
    key: 'fruitFirmness2',
    label: '果实硬度-油菜素内脂处理',
    description: <div><p>对 ‘鄞红’葡萄的硬核期果实，喷施0（CK）、0.2、0.4、0.6和0.8 mg/L 油菜素内酯（BR）以及0.5和1 mg/L油菜素内酯抑制剂（BZR）。选择成熟期果实硬度差异最显著的材料（0.2 mg/L BR和0.5 mg/L BZR的果皮、0.6 mg/L BR和1 mg/L BZR果肉）分别进行转录组测序。</p>
      <p>T0  果肉CK</p>
      <p>T1  果肉0.6 mg/L\n</p>
      <p>T2  果肉BZR 1 mg/L</p>
      <p>Y0  果皮CK</p>
      <p>Y1  果皮0.2 mg/L</p>
      <p>Y2  果皮BZR0.5 mg/L</p>
    </div>
  },
  {
    key: 'fruitMetabolism',
    label: '糖酸代谢',
    description: '选取幼果期的‘鄞红’葡萄植株，分别用0、20、50、100和150 mM的蔗糖溶液进行根施处理。每隔12 d根施一次，每隔6 d采集一次样品。选择差异最显著的0和150 mM的转色期果实进行转录组测序。',
    img: img5
  },
  {
    key: 'fruitShape1',
    label: '果实形状-赤霉素和6BA处理',
    description: '在5年生‘阳光玫瑰’葡萄（Vitis vinifera ‘Shine-Muscat’）盛花期后15 d，使用清水（CK）、22.5 mg/L GA3 + 6 mg/L 6-BA（C1）和15.25 mg/L GA3 + 2 mg/L 6-BA（Z1）浸泡5min。幼果期、膨大I期、膨大Ⅱ期和成熟期葡萄果实形状差异明显。选择成熟期果实进行转录组测序。',
    img: img6
  },
  {
    key: 'fruitShape2',
    label: '果实形状-独脚金内脂处理',
    description: '在5年生‘阳光玫瑰’葡萄（Vitis vinifera ‘Shine-Muscat’）盛花期后15 d，使用清水（CK）、CPUU 2 μM（C2）、GA3 20 μM（G2）、独脚金内酯GR24 1 μM（T1）、独脚金内酯抑制剂Tis108 1 μM（T2）和GR24 1 μM + TIS108 1 μM（T3）浸泡5min。在幼果期（YS）、膨大I期（ESI）、膨大II期（ESII）和成熟期（MS）采集样品。选择果实形状差异最显著的膨大II期果实进行转录组测序。',
    img: img7
  }]

export default items;
