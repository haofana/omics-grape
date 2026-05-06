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
      { label: 'Fruit Fiber', key: 'fruitFiber' },
      { label: 'Glandular trichome and downy hair traits', key: 'fruitFuzz' },
      { label: 'Coloration of nutrient organs', key: 'fruitOrgan' },
    ]
  },
  {
    label: 'Transcription',
    key: 'transcription',
  },
  {
    label: 'Metabolism ',
    key: 'metabolism',
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
    label: 'About',
    key: 'about',
  },
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
      { label: '纤维素', key: 'fruitFiber' },
      { label: '腺毛绒毛性状', key: 'fruitFuzz' },
      { label: '营养器官着色', key: 'fruitOrgan' },
    ]
  },
  {
    label: '转录组',
    key: 'transcription',
  },
  {
    label: '代谢组 ',
    key: 'metabolism',
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
    label: '关于团队',
    key: 'about',
  },
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
