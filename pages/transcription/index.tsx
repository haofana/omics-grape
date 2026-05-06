import React, { useState, useEffect } from 'react';
import { Form, Col, Layout, Input, theme, Button, Select, Spin, Table, Tabs } from 'antd';
import type { FormProps } from 'antd';
import items from './items';
import '../index.css';
import { useI18n } from '@/hooks/useI18n';
import Modal1 from './Modal1';

type FieldType = {
  metabolite?: string;
  gene_id?: string;
};

const { Content } = Layout;

const Metabolism = () =>
{
  const t = useI18n();
  const { token: { colorBorder, borderRadiusLG }, } = theme.useToken();
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [params, setParams] = useState<FieldType>({});
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [open, setOpen] = React.useState(false);


  const [activeKey, setActiveKey] = useState('fruitDevelopment')
  // tab分页
  const onChange = (key: string) => {
    setActiveKey(key)
  }
  const fruitAromaColumns = [
    { title: t.no, dataIndex: 'no', key: 'no', width: 80 },
    { title: t.gene_id, dataIndex: 'gene_id', key: 'gene_id' },
    { title: t.g2_1_count, dataIndex: 'g2_1_count', key: 'g2_1_count' },
    { title: t.g2_2_count, dataIndex: 'g2_2_count', key: 'g2_2_count' },
    { title: t.g2_3_count, dataIndex: 'g2_3_count', key: 'g2_3_count' },
    { title: t.t_1_count, dataIndex: 't_1_count', key: 't_1_count' },
    { title: t.t_2_count, dataIndex: 't_2_count', key: 't_2_count' },
    { title: t.t_3_count, dataIndex: 't_3_count', key: 't_3_count' },
    { title: t.ck_1_count, dataIndex: 'ck_1_count', key: 'ck_1_count' },
    { title: t.ck_2_count, dataIndex: 'ck_2_count', key: 'ck_2_count' },
    { title: t.ck_3_count, dataIndex: 'ck_3_count', key: 'ck_3_count' },
    { title: t.g2_1_tpm, dataIndex: 'g2_1_tpm', key: 'g2_1_tpm' },
    { title: t.g2_2_tpm, dataIndex: 'g2_2_tpm', key: 'g2_2_tpm' },
    { title: t.g2_3_tpm, dataIndex: 'g2_3_tpm', key: 'g2_3_tpm' },
    { title: t.t_1_tpm, dataIndex: 't_1_tpm', key: 't_1_tpm' },
    { title: t.t_2_tpm, dataIndex: 't_2_tpm', key: 't_2_tpm' },
    { title: t.t_3_tpm, dataIndex: 't_3_tpm', key: 't_3_tpm' },
    { title: t.ck_1_tpm, dataIndex: 'ck_1_tpm', key: 'ck_1_tpm' },
    { title: t.ck_2_tpm, dataIndex: 'ck_2_tpm', key: 'ck_2_tpm' },
    { title: t.ck_3_tpm, dataIndex: 'ck_3_tpm', key: 'ck_3_tpm' },
    { title: t.g2_tpm_average, dataIndex: 'g2_tpm_average', key: 'g2_tpm_average' },
    { title: t.t_tpm_average, dataIndex: 't_tpm_average', key: 't_tpm_average' },
    { title: t.ck_tpm_average, dataIndex: 'ck_tpm_average', key: 'ck_tpm_average' },
    { title: t.fc_g2_t_, dataIndex: 'fc_g2_t_', key: 'fc_g2_t_' },
    { title: t.log2fc_g2_t_, dataIndex: 'log2fc_g2_t_', key: 'log2fc_g2_t_' },
    { title: t.pvalue_g2_t_, dataIndex: 'pvalue_g2_t_', key: 'pvalue_g2_t_' },
    { title: t.padjust_g2_t_, dataIndex: 'padjust_g2_t_', key: 'padjust_g2_t_' },
    { title: t.fc_t_ck_, dataIndex: 'fc_t_ck_', key: 'fc_t_ck_' },
    { title: t.log2fc_t_ck_, dataIndex: 'log2fc_t_ck_', key: 'log2fc_t_ck_' },
    { title: t.pvalue_t_ck_, dataIndex: 'pvalue_t_ck_', key: 'pvalue_t_ck_' },
    { title: t.padjust_t_ck_, dataIndex: 'padjust_t_ck_', key: 'padjust_t_ck_' },
    { title: t.fc_g2_ck_, dataIndex: 'fc_g2_ck_', key: 'fc_g2_ck_' },
    { title: t.log2fc_g2_ck_, dataIndex: 'log2fc_g2_ck_', key: 'log2fc_g2_ck_' },
    { title: t.pvalue_g2_ck_, dataIndex: 'pvalue_g2_ck_', key: 'pvalue_g2_ck_' },
    { title: t.padjust_g2_ck_, dataIndex: 'padjust_g2_ck_', key: 'padjust_g2_ck_' },
    { title: t.gene_name, dataIndex: 'gene_name', key: 'gene_name' },
    { title: t.gene_chr, dataIndex: 'gene_chr', key: 'gene_chr' },
    { title: t.gene_start, dataIndex: 'gene_start', key: 'gene_start' },
    { title: t.gene_end, dataIndex: 'gene_end', key: 'gene_end' },
    { title: t.gene_strand, dataIndex: 'gene_strand', key: 'gene_strand' },
    { title: t.gene_length, dataIndex: 'gene_length', key: 'gene_length' },
    { title: t.gene_biotype, dataIndex: 'gene_biotype', key: 'gene_biotype' },
    { title: t.gene_description, dataIndex: 'gene_description', key: 'gene_description' },
  ];
  const fruitAstringentColumns = [
    { title: t.no, dataIndex: 'no', key: 'no', width: 80 },
    { title: t.gene_id, dataIndex: 'gene_id', key: 'gene_id' },
    { title: t.br_1_1_count, dataIndex: 'br_1_1_count', key: 'br_1_1_count' },
    { title: t.br_1_2_count, dataIndex: 'br_1_2_count', key: 'br_1_2_count' },
    { title: t.br_1_3_count, dataIndex: 'br_1_3_count', key: 'br_1_3_count' },
    { title: t.ck_1_count, dataIndex: 'ck_1_count', key: 'ck_1_count' },
    { title: t.ck_2_count, dataIndex: 'ck_2_count', key: 'ck_2_count' },
    { title: t.ck_3_count, dataIndex: 'ck_3_count', key: 'ck_3_count' },
    { title: t.gr_3_1_count, dataIndex: 'gr_3_1_count', key: 'gr_3_1_count' },
    { title: t.gr_3_2_count, dataIndex: 'gr_3_2_count', key: 'gr_3_2_count' },
    { title: t.gr_3_3_count, dataIndex: 'gr_3_3_count', key: 'gr_3_3_count' },
    { title: t.br_1_1_tpm, dataIndex: 'br_1_1_tpm', key: 'br_1_1_tpm' },
    { title: t.br_1_2_tpm, dataIndex: 'br_1_2_tpm', key: 'br_1_2_tpm' },
    { title: t.br_1_3_tpm, dataIndex: 'br_1_3_tpm', key: 'br_1_3_tpm' },
    { title: t.ck_1_tpm, dataIndex: 'ck_1_tpm', key: 'ck_1_tpm' },
    { title: t.ck_2_tpm, dataIndex: 'ck_2_tpm', key: 'ck_2_tpm' },
    { title: t.ck_3_tpm, dataIndex: 'ck_3_tpm', key: 'ck_3_tpm' },
    { title: t.gr_3_1_tpm, dataIndex: 'gr_3_1_tpm', key: 'gr_3_1_tpm' },
    { title: t.gr_3_2_tpm, dataIndex: 'gr_3_2_tpm', key: 'gr_3_2_tpm' },
    { title: t.gr_3_3_tpm, dataIndex: 'gr_3_3_tpm', key: 'gr_3_3_tpm' },
    { title: t.br_1_tpm_average, dataIndex: 'br_1_tpm_average', key: 'br_1_tpm_average' },
    { title: t.ck_tpm_average, dataIndex: 'ck_tpm_average', key: 'ck_tpm_average' },
    { title: t.gr_3_tpm_average, dataIndex: 'gr_3_tpm_average', key: 'gr_3_tpm_average' },
    { title: t.fc, dataIndex: 'fc', key: 'fc' },
    { title: t.log2fc, dataIndex: 'log2fc', key: 'log2fc' },
    { title: t.pvalue, dataIndex: 'pvalue', key: 'pvalue' },
    { title: t.padjust, dataIndex: 'padjust', key: 'padjust' },
    { title: t.fc_1, dataIndex: 'fc_1', key: 'fc_1' },
    { title: t.log2fc_1, dataIndex: 'log2fc_1', key: 'log2fc_1' },
    { title: t.pvalue_1, dataIndex: 'pvalue_1', key: 'pvalue_1' },
    { title: t.padjust_1, dataIndex: 'padjust_1', key: 'padjust_1' },
    { title: t.gene_name, dataIndex: 'gene_name', key: 'gene_name' },
    { title: t.gene_chr, dataIndex: 'gene_chr', key: 'gene_chr' },
    { title: t.gene_start, dataIndex: 'gene_start', key: 'gene_start' },
    { title: t.gene_end, dataIndex: 'gene_end', key: 'gene_end' },
    { title: t.gene_strand, dataIndex: 'gene_strand', key: 'gene_strand' },
    { title: t.gene_length, dataIndex: 'gene_length', key: 'gene_length' },
    { title: t.gene_biotype, dataIndex: 'gene_biotype', key: 'gene_biotype' },
    { title: t.gene_description, dataIndex: 'gene_description', key: 'gene_description' },
    { title: t.tf_family, dataIndex: 'tf_family', key: 'tf_family' },
  ];
  const fruitDevelopmentColumns = [
    { title: t.no, dataIndex: 'no', key: 'no', width: 80 },
    { title: t.gene_id, dataIndex: 'gene_id', key: 'gene_id' },
    { title: t.fpkm_s1a, dataIndex: 'fpkm_s1a', key: 'fpkm_s1a' },
    { title: t.fpkm_s1b, dataIndex: 'fpkm_s1b', key: 'fpkm_s1b' },
    { title: t.fpkm_s1c, dataIndex: 'fpkm_s1c', key: 'fpkm_s1c' },
    { title: t.fpkm_s2a, dataIndex: 'fpkm_s2a', key: 'fpkm_s2a' },
    { title: t.fpkm_s2b, dataIndex: 'fpkm_s2b', key: 'fpkm_s2b' },
    { title: t.fpkm_s2c, dataIndex: 'fpkm_s2c', key: 'fpkm_s2c' },
    { title: t.fpkm_s3a, dataIndex: 'fpkm_s3a', key: 'fpkm_s3a' },
    { title: t.fpkm_s3b, dataIndex: 'fpkm_s3b', key: 'fpkm_s3b' },
    { title: t.fpkm_s3c, dataIndex: 'fpkm_s3c', key: 'fpkm_s3c' },
    { title: t.fpkm_s4a, dataIndex: 'fpkm_s4a', key: 'fpkm_s4a' },
    { title: t.fpkm_s4b, dataIndex: 'fpkm_s4b', key: 'fpkm_s4b' },
    { title: t.fpkm_s4c, dataIndex: 'fpkm_s4c', key: 'fpkm_s4c' },
    { title: t.fpkm_t1a, dataIndex: 'fpkm_t1a', key: 'fpkm_t1a' },
    { title: t.fpkm_t1b, dataIndex: 'fpkm_t1b', key: 'fpkm_t1b' },
    { title: t.fpkm_t1c, dataIndex: 'fpkm_t1c', key: 'fpkm_t1c' },
    { title: t.fpkm_t2a, dataIndex: 'fpkm_t2a', key: 'fpkm_t2a' },
    { title: t.fpkm_t2b, dataIndex: 'fpkm_t2b', key: 'fpkm_t2b' },
    { title: t.fpkm_t2c, dataIndex: 'fpkm_t2c', key: 'fpkm_t2c' },
    { title: t.fpkm_t3a, dataIndex: 'fpkm_t3a', key: 'fpkm_t3a' },
    { title: t.fpkm_t3b, dataIndex: 'fpkm_t3b', key: 'fpkm_t3b' },
    { title: t.fpkm_t3c, dataIndex: 'fpkm_t3c', key: 'fpkm_t3c' },
  ];
  const fruitFirmness1Columns = [
    { title: t.no, dataIndex: 'no', key: 'no', width: 80 },
    { title: t.gene_id, dataIndex: 'gene_id', key: 'gene_id' },
    { title: t.fpkm_ck_1, dataIndex: 'fpkm_ck_1', key: 'fpkm_ck_1' },
    { title: t.fpkm_ck_2, dataIndex: 'fpkm_ck_2', key: 'fpkm_ck_2' },
    { title: t.fpkm_ck_3, dataIndex: 'fpkm_ck_3', key: 'fpkm_ck_3' },
    { title: t.fpkm_ga_1, dataIndex: 'fpkm_ga_1', key: 'fpkm_ga_1' },
    { title: t.fpkm_ga_2, dataIndex: 'fpkm_ga_2', key: 'fpkm_ga_2' },
    { title: t.fpkm_ga_3, dataIndex: 'fpkm_ga_3', key: 'fpkm_ga_3' },
    { title: t.fpkm_lh_1, dataIndex: 'fpkm_lh_1', key: 'fpkm_lh_1' },
    { title: t.fpkm_lh_2, dataIndex: 'fpkm_lh_2', key: 'fpkm_lh_2' },
    { title: t.fpkm_lh_3, dataIndex: 'fpkm_lh_3', key: 'fpkm_lh_3' },
    { title: t.fpkm_snp_1, dataIndex: 'fpkm_snp_1', key: 'fpkm_snp_1' },
    { title: t.fpkm_snp_2, dataIndex: 'fpkm_snp_2', key: 'fpkm_snp_2' },
    { title: t.fpkm_snp_3, dataIndex: 'fpkm_snp_3', key: 'fpkm_snp_3' },
    { title: t.fpkm_ta_1, dataIndex: 'fpkm_ta_1', key: 'fpkm_ta_1' },
    { title: t.fpkm_ta_2, dataIndex: 'fpkm_ta_2', key: 'fpkm_ta_2' },
    { title: t.fpkm_ta_3, dataIndex: 'fpkm_ta_3', key: 'fpkm_ta_3' },
  ];
  const fruitFirmness2Columns = [
    { title: t.no, dataIndex: 'no', key: 'no', width: 80 },
    { title: t.gene_id, dataIndex: 'gene_id', key: 'gene_id' },
    { title: t.t0_1_fpkm, dataIndex: 't0_1_fpkm', key: 't0_1_fpkm' },
    { title: t.t0_2_fpkm, dataIndex: 't0_2_fpkm', key: 't0_2_fpkm' },
    { title: t.t0_3_fpkm, dataIndex: 't0_3_fpkm', key: 't0_3_fpkm' },
    { title: t.t1_1_fpkm, dataIndex: 't1_1_fpkm', key: 't1_1_fpkm' },
    { title: t.t1_2_fpkm, dataIndex: 't1_2_fpkm', key: 't1_2_fpkm' },
    { title: t.t1_3_fpkm, dataIndex: 't1_3_fpkm', key: 't1_3_fpkm' },
    { title: t.t2_1_fpkm, dataIndex: 't2_1_fpkm', key: 't2_1_fpkm' },
    { title: t.t2_2_fpkm, dataIndex: 't2_2_fpkm', key: 't2_2_fpkm' },
    { title: t.t2_3_fpkm, dataIndex: 't2_3_fpkm', key: 't2_3_fpkm' },
    { title: t.y0_1_fpkm, dataIndex: 'y0_1_fpkm', key: 'y0_1_fpkm' },
    { title: t.y0_2_fpkm, dataIndex: 'y0_2_fpkm', key: 'y0_2_fpkm' },
    { title: t.y0_3_fpkm, dataIndex: 'y0_3_fpkm', key: 'y0_3_fpkm' },
    { title: t.y1_1_fpkm, dataIndex: 'y1_1_fpkm', key: 'y1_1_fpkm' },
    { title: t.y1_2_fpkm, dataIndex: 'y1_2_fpkm', key: 'y1_2_fpkm' },
    { title: t.y1_3_fpkm, dataIndex: 'y1_3_fpkm', key: 'y1_3_fpkm' },
    { title: t.y2_1_fpkm, dataIndex: 'y2_1_fpkm', key: 'y2_1_fpkm' },
    { title: t.y2_2_fpkm, dataIndex: 'y2_2_fpkm', key: 'y2_2_fpkm' },
    { title: t.y2_3_fpkm, dataIndex: 'y2_3_fpkm', key: 'y2_3_fpkm' },
    { title: t.t0_1_count, dataIndex: 't0_1_count', key: 't0_1_count' },
    { title: t.t0_2_count, dataIndex: 't0_2_count', key: 't0_2_count' },
    { title: t.t0_3_count, dataIndex: 't0_3_count', key: 't0_3_count' },
    { title: t.t1_1_count, dataIndex: 't1_1_count', key: 't1_1_count' },
    { title: t.t1_2_count, dataIndex: 't1_2_count', key: 't1_2_count' },
    { title: t.t1_3_count, dataIndex: 't1_3_count', key: 't1_3_count' },
    { title: t.t2_1_count, dataIndex: 't2_1_count', key: 't2_1_count' },
    { title: t.t2_2_count, dataIndex: 't2_2_count', key: 't2_2_count' },
    { title: t.t2_3_count, dataIndex: 't2_3_count', key: 't2_3_count' },
    { title: t.y0_1_count, dataIndex: 'y0_1_count', key: 'y0_1_count' },
    { title: t.y0_2_count, dataIndex: 'y0_2_count', key: 'y0_2_count' },
    { title: t.y0_3_count, dataIndex: 'y0_3_count', key: 'y0_3_count' },
    { title: t.y1_1_count, dataIndex: 'y1_1_count', key: 'y1_1_count' },
    { title: t.y1_2_count, dataIndex: 'y1_2_count', key: 'y1_2_count' },
    { title: t.y1_3_count, dataIndex: 'y1_3_count', key: 'y1_3_count' },
    { title: t.y2_1_count, dataIndex: 'y2_1_count', key: 'y2_1_count' },
    { title: t.y2_2_count, dataIndex: 'y2_2_count', key: 'y2_2_count' },
    { title: t.y2_3_count, dataIndex: 'y2_3_count', key: 'y2_3_count' },
    { title: t.symbol, dataIndex: 'symbol', key: 'symbol' },
    { title: t.description, dataIndex: 'description', key: 'description' },
    { title: t.kegg_a_class, dataIndex: 'kegg_a_class', key: 'kegg_a_class' },
    { title: t.kegg_b_class, dataIndex: 'kegg_b_class', key: 'kegg_b_class' },
    { title: t.pathway, dataIndex: 'pathway', key: 'pathway' },
    { title: t.k_id, dataIndex: 'k_id', key: 'k_id' },
    { title: t.go_component, dataIndex: 'go_component', key: 'go_component' },
    { title: t.go_function, dataIndex: 'go_function', key: 'go_function' },
    { title: t.go_process, dataIndex: 'go_process', key: 'go_process' },
    { title: t.tf_family, dataIndex: 'tf_family', key: 'tf_family' },
  ];
  const fruitMetabolismColumns = [
    { title: t.no, dataIndex: 'no', key: 'no', width: 80 },
    { title: t.gene_id, dataIndex: 'gene_id', key: 'gene_id' },
    { title: t.ck_1_fpkm, dataIndex: 'ck_1_fpkm', key: 'ck_1_fpkm' },
    { title: t.ck_2_fpkm, dataIndex: 'ck_2_fpkm', key: 'ck_2_fpkm' },
    { title: t.ck_3_fpkm, dataIndex: 'ck_3_fpkm', key: 'ck_3_fpkm' },
    { title: t.suc150_1_fpkm, dataIndex: 'suc150_1_fpkm', key: 'suc150_1_fpkm' },
    { title: t.suc150_2_fpkm, dataIndex: 'suc150_2_fpkm', key: 'suc150_2_fpkm' },
    { title: t.suc150_3_fpkm, dataIndex: 'suc150_3_fpkm', key: 'suc150_3_fpkm' },
    { title: t.ck_1_count, dataIndex: 'ck_1_count', key: 'ck_1_count' },
    { title: t.ck_2_count, dataIndex: 'ck_2_count', key: 'ck_2_count' },
    { title: t.ck_3_count, dataIndex: 'ck_3_count', key: 'ck_3_count' },
    { title: t.suc150_1_count, dataIndex: 'suc150_1_count', key: 'suc150_1_count' },
    { title: t.suc150_2_count, dataIndex: 'suc150_2_count', key: 'suc150_2_count' },
    { title: t.suc150_3_count, dataIndex: 'suc150_3_count', key: 'suc150_3_count' },
    { title: t.symbol, dataIndex: 'symbol', key: 'symbol' },
    { title: t.description, dataIndex: 'description', key: 'description' },
    { title: t.kegg_a_class, dataIndex: 'kegg_a_class', key: 'kegg_a_class' },
    { title: t.kegg_b_class, dataIndex: 'kegg_b_class', key: 'kegg_b_class' },
    { title: t.pathway, dataIndex: 'pathway', key: 'pathway' },
    { title: t.k_id, dataIndex: 'k_id', key: 'k_id' },
    { title: t.go_component, dataIndex: 'go_component', key: 'go_component' },
    { title: t.go_function, dataIndex: 'go_function', key: 'go_function' },
    { title: t.go_process, dataIndex: 'go_process', key: 'go_process' },
    { title: t.tf_family, dataIndex: 'tf_family', key: 'tf_family' },
  ];
  const fruitShape1Columns = [
    { title: t.no, dataIndex: 'no', key: 'no', width: 80 },
    { title: t.gene_id, dataIndex: 'gene_id', key: 'gene_id' },
    { title: t.fpkm_c1_1, dataIndex: 'fpkm_c1_1', key: 'fpkm_c1_1' },
    { title: t.fpkm_c1_2, dataIndex: 'fpkm_c1_2', key: 'fpkm_c1_2' },
    { title: t.fpkm_ck_1, dataIndex: 'fpkm_ck_1', key: 'fpkm_ck_1' },
    { title: t.fpkm_ck_3, dataIndex: 'fpkm_ck_3', key: 'fpkm_ck_3' },
    { title: t.fpkm_z1_1, dataIndex: 'fpkm_z1_1', key: 'fpkm_z1_1' },
    { title: t.fpkm_z1_2, dataIndex: 'fpkm_z1_2', key: 'fpkm_z1_2' },
    { title: t.fpkm_z1_3, dataIndex: 'fpkm_z1_3', key: 'fpkm_z1_3' },
  ];
  const fruitShape2Columns = [
    { title: t.no, dataIndex: 'no', key: 'no', width: 80 },
    { title: t.gene_id, dataIndex: 'gene_id', key: 'gene_id' },
    { title: t.t0_1_fpkm, dataIndex: 't0_1_fpkm', key: 't0_1_fpkm' },
    { title: t.t0_2_fpkm, dataIndex: 't0_2_fpkm', key: 't0_2_fpkm' },
    { title: t.t0_3_fpkm, dataIndex: 't0_3_fpkm', key: 't0_3_fpkm' },
    { title: t.t1_1_fpkm, dataIndex: 't1_1_fpkm', key: 't1_1_fpkm' },
    { title: t.t1_2_fpkm, dataIndex: 't1_2_fpkm', key: 't1_2_fpkm' },
    { title: t.t1_3_fpkm, dataIndex: 't1_3_fpkm', key: 't1_3_fpkm' },
    { title: t.t2_1_fpkm, dataIndex: 't2_1_fpkm', key: 't2_1_fpkm' },
    { title: t.t2_2_fpkm, dataIndex: 't2_2_fpkm', key: 't2_2_fpkm' },
    { title: t.t2_3_fpkm, dataIndex: 't2_3_fpkm', key: 't2_3_fpkm' },
    { title: t.t3_1_fpkm, dataIndex: 't3_1_fpkm', key: 't3_1_fpkm' },
    { title: t.t3_2_fpkm, dataIndex: 't3_2_fpkm', key: 't3_2_fpkm' },
    { title: t.t3_3_fpkm, dataIndex: 't3_3_fpkm', key: 't3_3_fpkm' },
    { title: t.g2_1_fpkm, dataIndex: 'g2_1_fpkm', key: 'g2_1_fpkm' },
    { title: t.g2_2_fpkm, dataIndex: 'g2_2_fpkm', key: 'g2_2_fpkm' },
    { title: t.g2_3_fpkm, dataIndex: 'g2_3_fpkm', key: 'g2_3_fpkm' },
    { title: t.c2_1_fpkm, dataIndex: 'c2_1_fpkm', key: 'c2_1_fpkm' },
    { title: t.c2_2_fpkm, dataIndex: 'c2_2_fpkm', key: 'c2_2_fpkm' },
    { title: t.c2_3_fpkm, dataIndex: 'c2_3_fpkm', key: 'c2_3_fpkm' },
    { title: t.t0_1_count, dataIndex: 't0_1_count', key: 't0_1_count' },
    { title: t.t0_2_count, dataIndex: 't0_2_count', key: 't0_2_count' },
    { title: t.t0_3_count, dataIndex: 't0_3_count', key: 't0_3_count' },
    { title: t.t1_1_count, dataIndex: 't1_1_count', key: 't1_1_count' },
    { title: t.t1_2_count, dataIndex: 't1_2_count', key: 't1_2_count' },
    { title: t.t1_3_count, dataIndex: 't1_3_count', key: 't1_3_count' },
    { title: t.t2_1_count, dataIndex: 't2_1_count', key: 't2_1_count' },
    { title: t.t2_2_count, dataIndex: 't2_2_count', key: 't2_2_count' },
    { title: t.t2_3_count, dataIndex: 't2_3_count', key: 't2_3_count' },
    { title: t.t3_1_count, dataIndex: 't3_1_count', key: 't3_1_count' },
    { title: t.t3_2_count, dataIndex: 't3_2_count', key: 't3_2_count' },
    { title: t.t3_3_count, dataIndex: 't3_3_count', key: 't3_3_count' },
    { title: t.g2_1_count, dataIndex: 'g2_1_count', key: 'g2_1_count' },
    { title: t.g2_2_count, dataIndex: 'g2_2_count', key: 'g2_2_count' },
    { title: t.g2_3_count, dataIndex: 'g2_3_count', key: 'g2_3_count' },
    { title: t.c2_1_count, dataIndex: 'c2_1_count', key: 'c2_1_count' },
    { title: t.c2_2_count, dataIndex: 'c2_2_count', key: 'c2_2_count' },
    { title: t.c2_3_count, dataIndex: 'c2_3_count', key: 'c2_3_count' },
    { title: t.symbol, dataIndex: 'symbol', key: 'symbol' },
    { title: t.description, dataIndex: 'description', key: 'description' },
    { title: t.kegg_a_class, dataIndex: 'kegg_a_class', key: 'kegg_a_class' },
    { title: t.kegg_b_class, dataIndex: 'kegg_b_class', key: 'kegg_b_class' },
    { title: t.pathway, dataIndex: 'pathway', key: 'pathway' },
    { title: t.k_id, dataIndex: 'k_id', key: 'k_id' },
    { title: t.go_component, dataIndex: 'go_component', key: 'go_component' },
    { title: t.go_function, dataIndex: 'go_function', key: 'go_function' },
    { title: t.go_process, dataIndex: 'go_process', key: 'go_process' },
    { title: t.tf_family, dataIndex: 'tf_family', key: 'tf_family' },
  ];

  const [activeColumn, setActiveColumn] = useState(fruitAromaColumns);
  useEffect(() => {
    const fetchGrapeData = async () => {
      try {
        // 调用 Page Router 的 API 接口
        setLoading(true);
        const res = await fetch(`/api/fruitList?table=${activeKey}&page=${page}&size=${pageSize}&params=${JSON.stringify(params)}`);
        if (!res.ok) {
          throw new Error('接口请求失败');
        }
        const result = await res.json();
        if (result.success) {
          setData(result.data);
          setTotal(result.total);
        } else {
          console.error(result.msg || '查询数据失败');
        }
      } catch (err) {
        console.error('网络错误或服务器异常');
        console.error('请求失败：', err);
      } finally {
        setLoading(false);
      }
    };
    switch (activeKey) {
      case 'fruitAroma': setActiveColumn(fruitAromaColumns);break;
      case 'fruitAstringent': setActiveColumn(fruitAstringentColumns);break;
      case 'fruitDevelopment': setActiveColumn(fruitDevelopmentColumns);break;
      case 'fruitFirmness1': setActiveColumn(fruitFirmness1Columns);break;
      case 'fruitFirmness2': setActiveColumn(fruitFirmness2Columns);break;
      case 'fruitMetabolism': setActiveColumn(fruitMetabolismColumns);break;
      case 'fruitShape1': setActiveColumn(fruitShape1Columns);break;
      case 'fruitShape2': setActiveColumn(fruitShape2Columns);break;
    }
    fetchGrapeData();
  }, [page, pageSize, params, activeKey, t]);
  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    setParams(values)
    setPage(1)
  };
  const onReset = () => {
    form.resetFields();
    setPage(1)
    setParams({})
  };
  const onPageChange = (page: number, pageSize: number) => {
    setPage(page);
    setPageSize(pageSize);
  }

  return (
    <Content style={{ padding: '16px 48px', backgroundColor: colorBorder, minHeight: 'calc(100vh - 64px)', fontSize: '14px' }}>
      {/*<div className={'item-title '}>*/}
      {/*  果实香气-植物生长调节剂处理*/}
      {/*</div>*/}
      <div>
        <Form
          form={form}
          name="search"
          layout="inline"
          style={{ width: '100%', marginBottom: 20 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          // onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            label={t.gene_id}
            name="gene_id"
          >
            <Input style={{ width: 200 }} allowClear={true} />
          </Form.Item>
          {/*<Form.Item<FieldType>*/}
          {/*  label={t.metabolite}*/}
          {/*  name="metabolite"*/}
          {/*>*/}
          {/*  <Input style={{ width: 200 }} allowClear={true} />*/}
          {/*</Form.Item>*/}

          <Form.Item label={null}>
            <Button type="primary" htmlType="submit">
              {t.query}
            </Button>
            <Button style={{ marginLeft: 20 }} htmlType="button" type="primary" onClick={onReset}>
              {t.reset}
            </Button>
          </Form.Item>
        </Form>
      </div>
      <Tabs activeKey={activeKey} items={items} onChange={onChange} />
      <Spin description="Loading" size="large" spinning={loading}>
        <Modal1 activeKey={activeKey} open={open} onCancel={()=>setOpen(false)} />
        <Button className={'mb-4'} type="primary" onClick={()=>setOpen(true)}>
          {t.explanation}
        </Button>
        <Table
          columns={activeColumn}
          dataSource={data}
          scroll={{ x: 'max-content' }}
          bordered
          pagination={{ total, current: page, pageSize, onChange: onPageChange }}
        />
      </Spin>
    </Content>
  );
}

export default Metabolism;
