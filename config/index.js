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
    label: 'Gene',
    key: 'download',
  },
  {
    label: 'GWAS',
    key: 'GWAS',
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
  },
  {
    label: 'Literature',
    key: 'Literature',
  },
  {
    label: 'News',
    key: 'news',
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
    key: 'download',
  },
  {
    label: 'GWAS',
    key: 'GWAS',
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
  },
  {
    label: '文献',
    key: 'literature',
  },
  {
    label: '新闻',
    key: 'news',
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
