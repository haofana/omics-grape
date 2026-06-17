import db from '@/lib/prisma';
import { Prisma } from '@prisma/client';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, content: '仅支持POST请求' })
  }

  const API_KEY = process.env.DASHSCOPE_API_KEY
  if (!API_KEY) {
    return res.status(500).json({ success: false, content: '未配置API_KEY' })
  }

  try {
    const { messages } = req.body

    // 读取果实表
    const fruitData = await prisma.phenomicsFruit.findMany({
      orderBy: { no: 'asc' }
    })
    // 读取叶片表
    const leafData = await prisma.phenomicsLeaf.findMany({
      orderBy: { no: 'asc' }
    })

    // 合并两张表
    const combined = [...fruitData, ...leafData];

    const uniqueMap = new Map();
    for (const item of combined) {
      if (item.variety && !uniqueMap.has(item.variety)) {
        uniqueMap.set(item.variety, item);
      }
    }
    const finalData = Array.from(uniqueMap.values());


    const germplasm = await db.germplasm.findMany({ orderBy: { id: 'asc' } })

    // ======================
    // 育种规则
    // ======================
    const breedingRules = `
【育种选育规则】
一、单粒重分级标准（两套口径并行，选育参考）
精细五级分级
极小粒：单粒重 ≤ 5.18 g
小粒：单粒重 5.18 g ~ 6.33 g
中粒：单粒重 6.33 g ~ 8.05 g
大粒：单粒重 8.05 g ~ 9.54 g
极大粒：单粒重 ＞ 9.54 g
简易三级选育口径
小果：单粒重 ＜ 6 g
中果：单粒重 6 g ~ 8 g
大果：单粒重 ＞ 8 g
二、果形分级（依据果形指数）
扁圆形：果形指数 ＜ 1.00
圆形：果形指数 1.00 ~ 1.10
近圆形：果形指数 1.10 ~ 1.20
椭圆形：果形指数 1.20 ~ 1.40
长椭圆形：果形指数 ＞ 1.40
三、可溶性固形物（SSC）品质分级
一般：SSC ＜ 16
良好：SSC 16 ~ 18
优秀：SSC 18 ~ 20
极优：SSC ＞ 20
四、可滴定酸含量分级（单位：%）
极低酸：可滴定酸 ≤ 0.43%
低酸：可滴定酸 0.43% ~ 0.55%
中酸：可滴定酸 0.55% ~ 0.64%
高酸：可滴定酸 0.64% ~ 0.75%
极高酸：可滴定酸 ＞ 0.75%
五、风味分级（依据糖酸比）
偏酸：糖酸比 ＜ 20
酸甜协调：糖酸比 20 ~ 30
风味浓郁：糖酸比 30 ~ 40
极佳风味：糖酸比 ＞ 40
六、果肉硬度分级（单位：N，耐贮运判定）
不耐运：果肉硬度 ＜ 6 N
一般：果肉硬度 6 N ~ 9 N
耐贮运：果肉硬度 9 N ~ 12 N
极耐贮运：果肉硬度 ＞ 12 N
七、果皮硬度分级（单位：N）
极薄软：果皮硬度 ≤ 4.13 N
薄软：果皮硬度 4.13 N ~ 5.06 N
中等：果皮硬度 5.06 N ~ 5.97 N
较硬：果皮硬度 5.97 N ~ 7.14 N
极硬：果皮硬度 ＞ 7.14 N
八、鲜食葡萄定向选育核心目标（优选标准）
针对鲜食用途葡萄品种，选育优先满足以下指标：
果皮硬度：控制在 5 N ~ 7 N
果肉硬度：控制在 9 N ~ 12 N
优先选择酸甜协调、风味浓郁、果粒偏大、综合品质优良的个体。
`

    // ======================
    // 系统提示词
    // ======================
    const systemPrompt = `
你是葡萄育种选育AI助手，育种相关问题强制基于本数据库真实数据 + 育种规则回答，

回答专业、简洁、分条、可直接用于育种。

===== 数据（来自数据库）=====
${JSON.stringify(finalData, null, 2)}


===== 育种规律=====
${breedingRules}

你可以回答：
- 推荐早熟/晚熟品种
- 推荐可获得早熟的杂交组合
- 无核育种方案
- 倍性（2x/3x/4x）培育方案
- 亲本选配建议
`

    const response = await fetch(
      'https://dashscope.aliyuncs.com/api/v1/services/aigc/text-generation/generation',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
          model: 'qwen3.7-plus',
          input: { messages: [{ role: 'system', content: systemPrompt }, ...messages] },
          parameters: { result_format: 'message' },
        }),
      }
    )

    const data = await response.json()
    const content = data?.output?.choices?.[0]?.message?.content || '暂无回答'

    return res.status(200).json({ success: true, content })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ success: false, content: '服务异常，请稍后重试' })
  }
}
