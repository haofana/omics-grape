import {
  SearchOutlined,
} from '@ant-design/icons';

export const menu = [
  {
    label: 'Home',
    key: '/',
  },
  {
    label: 'Germplasm',
    key: 'germplasm',
  },
  {
    label: 'Phenomics ',
    key: 'phenomics',
    children: [
      { label: 'Fruit Traits', key: 'berry' },
      { label: 'Leaf Traits', key: 'leaf' },
    ],
  },
  {
    label: 'Genome',
    key: 'genome',
  },
  {
    label: 'GWAS',
    key: 'GWAS',
    children: [
      { label: 'Fruit Color', key: 'fruitColor' },
      { label: 'Fruit Firmness', key: 'fruitFirmness' },
      { label: 'Fruit Cellulose', key: 'fruitCellulose' },
      { label: 'Glandular trichome and downy hair traits', key: 'fruitFuzz' },
      { label: 'Coloration of nutrient organs', key: 'fruitOrgan' },
    ]
  },
  {
    label: 'Transcription',
    key: 'transcription',
    children: [
      { label: 'Grape Development', key: 'transcription_1' },
      { label: 'Grape Aroma', key: 'transcription_2' },
      { label: 'Grape Astringency', key: 'transcription_3' },
      { label: 'Grape Firmness', key: 'transcription_4' },
      { label: 'Grape Sugar-Acid Metabolism', key: 'transcription_5' },
      { label: 'Fruit Shape', key: 'transcription_6' },
    ]
  },
  {
    label: 'Metabolism ',
    key: 'metabolism',
    children: [
      { label: 'Vitis \'Reliance\' - Non-volatile Compounds', key: 'metabolism_1' },
      { label: 'Vitis \'Reliance\' - Volatile Compounds', key: 'metabolism_2' },
      { label: '\'Puzhimeng\', \'Conglin Meigui\', \'Vitis vinifera L.\'', key: 'metabolism_3' },
    ]
  },
  {
    label: 'Tool',
    key: 'tool',
    children: [
      {
        label: 'Blast',
        key: 'blast',
      },
      {
        label: 'GO enrichment',
        key: 'go',
      },
    ]
  },
  {
    label: 'AI Assistant',
    key: 'assistant',
  },
  {
    label: 'R&D team',
    key: 'about',
  },
  {
    label: 'Reference',
    key: 'reference',
  }
];

export const menuZh = [
  {
    label: '主页',
    key: '/',
  },
  {
    label: '种质资源',
    key: 'germplasm',
  },
  {
    label: '表型组 ',
    key: 'phenomics',
    children: [
      { label: '果实综合性状', key: 'berry' },
      { label: '茎叶综合性状', key: 'leaf' },
    ],
  },
  {
    label: '基因组 ',
    key: 'genome',
  },
  {
    label: 'GWAS',
    key: 'GWAS',
    children: [
      { label: '果实颜色', key: 'fruitColor' },
      { label: '果实硬度', key: 'fruitFirmness' },
      { label: '纤维素', key: 'fruitCellulose' },
      { label: '腺毛绒毛性状', key: 'fruitFuzz' },
      { label: '营养器官着色', key: 'fruitOrgan' },
    ]
  },
  {
    label: '转录组',
    key: 'transcription',
    children: [
      { label: '果实发育', key: 'transcription_1' },
      { label: '果实香气', key: 'transcription_2' },
      { label: '果实涩味', key: 'transcription_3' },
      { label: '果实硬度', key: 'transcription_4' },
      { label: '糖酸代谢', key: 'transcription_5' },
      { label: '果实形状', key: 'transcription_6' },
    ]
  },
  {
    label: '代谢组 ',
    key: 'metabolism',
    children: [
      { label: '寒香蜜-非挥发', key: 'metabolism_1' },
      { label: '寒香蜜-挥发', key: 'metabolism_2' },
      { label: '葡之梦、丛林玫瑰、茉莉香', key: 'metabolism_3' },
    ]
  },
  {
    label: '工具',
    key: 'tool',
    children: [
      {
        label: 'Blast ',
        key: 'blast',
      },
      {
        label: 'GO富集分析',
        key: 'go',
      },
    ]
  },
  {
    label: 'AI 助手',
    key: 'assistant',
  },
  {
    label: '研发团队',
    key: 'about',
  },
  {
    label: '相关文献',
    key: 'reference',
  }
];

export const quickTools = [
  {
    label: 'berry',
    ico: <SearchOutlined />
  },
  {
    label: 'leaf',
    ico: <SearchOutlined />
  },
  {
    label: 'Chloroplast',
    ico: <SearchOutlined />
  },
  {
    label: 'Germplasm',
    ico: <SearchOutlined />
  },
  {
    label: 'download',
    ico: <SearchOutlined />
  },
]
