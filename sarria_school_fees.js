// Per child and full academic year; incomplete quotes are not treated as totals.
const schoolFees = {
  "Benjamin Franklin International School": {
    total: "€19,920 / 年（已知项目小计）",
    detail: "2026–2027：小学学费 €17,000 + 年度注册 €1,100 + 可选全年午餐 €1,820。首年另加申请 €250、入学 €6,000，首年小计 €26,170。校车、课外活动等另计。",
    url: "https://www.bfischool.org/admissions/school-fees"
  },
  "BSB City - Lucà Campus": {
    total: "€15,180–18,080 / 年（已知项目小计）",
    detail: "2026–2027：Y1–2 €15,180；Y3 €17,980；Y4–6 €18,080。含午餐、教材及保险。首年另加注册 €3,400，首年小计 €18,580–21,480。校服、校车、课外活动及旅行另计。",
    url: "https://www.britishschoolbarcelona.com/fees/"
  },
  "St. George Barcelona": {
    total: "€15,180–17,750 / 年（已知项目小计）",
    detail: "2026–2027 PDF：Y1–2 €15,180；Y3–4 €17,500；Y5–6 €17,750，含午餐、材料和意外险。首年另加 €3,500，首年小计 €18,680–21,250。€1,000 留位费抵扣学费，不重复计入。校车等另计；官网摘要与 PDF 高年级价格不同，须书面确认。",
    url: "https://www.stgeorgebarcelona.com/IB%20-%20St%20George%20Barcelona/Download%20%26%20policies/SGB_NewEnrolments_TuitionFees_2026-2027.pdf"
  },
  "Oak House School": {
    total: "待询价（学费 + 杂费）",
    detail: "官网招生页目前链接 2025–2026 收费资料；未核实 2026–2027 小学完整费用。不把旧学年价格当作本年报价，请索取学费、餐费、材料、注册及首次入学费。",
    url: "https://www.oakhouseschool.com/admissions/"
  }
};

function feeForSchool(school) {
  if (schoolFees[school.name]) return schoolFees[school.name];
  if (school.ownership === "公立") return {
    total: "约 €1,570–1,970 / 年（预算假设）",
    detail: "学费 €0。假设全年午餐 175 天 × €7.83 ≈ €1,370，另预留材料/活动 €200–600；不是本校报价。不含校车、课外班及额外语言辅导；不在校用餐可扣除餐费。",
    url: "https://www.vallesoriental.cat/media/repository/ambits/politiques-socials/Ajuts_de_Menjador/26_27/RESOLUCIO_EDF_486_2026_PREU_MENJADOR.pdf"
  };
  if (school.ownership === "私立协约校（半公办）") return {
    total: "协约小学学费 €0；全年杂费待询价",
    detail: "未核实本校 2026–2027 逐项收费，暂不编造年度总额。需确认餐费、材料、补充课程、活动及自愿捐款；协约学段免费不等于在校全部服务免费。",
    url: "https://educacio.gencat.cat/ca/arees-actuacio/centres-serveis-educatius/centres/tipus-centres/segons-titularitat/centres-privats-concertats/"
  };
  return {
    total: "待询价（学费 + 杂费）",
    detail: "未核实本校 2026–2027 小学公开收费表。需学校提供学费、午餐、教材、校服、注册费及首次入学费，不能按其他国际学校价格代填。"
  };
}
