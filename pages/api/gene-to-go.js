export default async function handler(req, res) {
  const { id } = req.query;
  if (!id) return res.status(400).json({ error: "need id" });

  try {
    // 1. 从 UniProt 获取 GO 编号
    const uniprotResp = await fetch(
      `https://rest.uniprot.org/uniprotkb/${id}?format=json`
    );
    const data = await uniprotResp.json();

    console.log(data, 'data');
    const goIds = [];
    if (data?.uniProtKBCrossReferences) {
      data.uniProtKBCrossReferences.forEach((ref) => {
        if (ref.database === "GO") {
          goIds.push(ref.id);
        }
      });
    }

    // 2. 使用 EBI 稳定接口获取 GO 详情
    const goDetails = [];
    for (const goId of goIds.slice(0, 15)) {
      try {
        const resp = await fetch(`https://api.geneontology.org/api/ontology/term/${goId}`);
        const d = await resp.json();
        goDetails.push({
          goId: d.id || goId,
          name: d.label || d.name || "",
          type: (d.aspect || "").toUpperCase(),
          description: d.definition || "",
        });
      } catch (e) {}
    }

    res.status(200).json({ list: goDetails });

  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "查询失败" });
  }
}
