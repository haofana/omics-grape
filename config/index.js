import {
  SearchOutlined,
} from '@ant-design/icons';
export const menu = [
  {
    label: 'Home',
    label_zh: '主页',
    key: '/',
  },
  {
    label: 'Genome Sequence Archive',
    label_zh: '基因组序列存档',
    key: 'Genome-Sequence-Archive',
    children: [{
      label: 'Browse',
      label_zh: '浏览',
      key: 'Browse',
    },{
      label: 'Search',
      label_zh: '查询',
      key: 'Search',
    }]
  },
  {
    label: 'Transcriptome Atlas',
    key: 'Transcriptome-Atlas',
    children: [{
      label: 'Expression of tissue',
      key: 'Expression-of-tissue',
    },{
      label: 'Expression of transcriptome',
      key: 'Expression-of-transcriptome',
    }]
  },
  {
    label: 'Chloroplast ',
    label_zh: '叶绿体',
    key: 'Chloroplast',
  },
  {
    label: 'Germplasm',
    label_zh: '种质资源',
    key: 'Germplasm',
  },
  {
    label: 'Download',
    label_zh: '下载',
    key: 'Download',
  },
  {
    label: 'Blast',
    key: 'Blast',
  },
];

export const menuZh = [
  {
    label: '主页',
    key: '/',
  },
  {
    label: '种质资源',
    key: 'Germplasm',
  },
  {
    label: '基因组',
    key: 'Genome-Sequence-Archive',
  },
  {
    label: '转录组',
    key: 'Transcriptome-Atlas',
  },
  {
    label: '代谢组 ',
    key: 'Chloroplast',
  },
  {
    label: 'GWAS',
    key: 'Download',
  },
  {
    label: 'Blast',
    key: 'Blast',
  },
  {
    label: '文献',
    key: 'literature',
  },
];

export const quickTools = [
  {
    label: 'Blast',
    ico: <SearchOutlined />
  },
  {
    label: 'Search',
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
    label: 'Download',
    ico: <SearchOutlined />
  },
]
