// Public-source review, not a confirmation of vacancies or individual provision.
const schoolProfileReviewDate = "2026-09-11";
const schoolProfiles = {
  "Escola Els Xiprers": {
    focus: "艺术与自然项目值得了解；先确认低年级语言支持和实际接送路线。",
    teaching: "官网列有 Cinema、AraArt 和可持续教育项目，并公开 2023–2027 学校发展计划；不能据此推断一年级所有课堂均采用同一种方法。",
    staff: "官网设团队与组织架构入口；一年级实际班额、班主任及语言支援教师工时待确认。",
    safety: "官网有共处计划和校车信息入口；须核对校车交接、户外活动清点和不会当地语言时的求助方式。",
    ask: "请给出一年级示例课表、零加泰语孩子前四周安排，以及家长到校门的实际路线。",
    sources: [["学校项目与团队入口", "https://www.elsxiprers.cat/escola/"]]
  },
  "Escola Nabí": {
    focus: "有主动学习传统；自由活动中能否得到语言引导是关键。",
    teaching: "旧官网说明借鉴 Freinet 教育；新官网保留自由工作、艺术、阅读和可持续项目。具体本学年低年级实施方式须核实。",
    staff: "新官网公开教师团队入口；未核实一年级助教和第二语言专任支持的配置。",
    ask: "自由工作时老师如何让零当地语言的孩子理解任务？托管 Acollida 是否仅为早晚照护？",
    sources: [["现行学校网站", "https://www.escolanabi.cat/"], ["旧站教学理念（历史参考）", "https://agora.xtec.cat/escolanabi/projecte-educatiu/salut/"]]
  },
  "Escola Dolors Monserdà-Santapau": {
    focus: "历史方案重视项目和合作；需核实现在的一年级语言衔接。",
    teaching: "2016 年 PEC 强调项目学习、合作学习和综合评价。这是历史教育方案，不能当作 2026 年教师配置或课表。",
    ask: "请发新版 PEC、语言计划及一年级课表；合作任务中是否用图片、示范和同伴帮助新生参与？",
    sources: [["PEC 2016（历史参考）", "https://agora.xtec.cat/esc-dms/wp-content/uploads/usu439/2014/09/PEC_juliol_2016.pdf"]]
  },
  "Escola Orlandai": {
    focus: "本轮仅查到教育项目入口，尚不足以判断是否适合零语言插班。",
    teaching: "校方有教育项目页面，但本轮正文访问受限；不使用旧疫情安排推断目前教学或小班支持。",
    ask: "请提供现行一年级教学方法、课堂授课语言比例、欢迎计划和家校沟通样例。",
    sources: [["校方项目入口（正文未能核实）", "https://agora.xtec.cat/ceiporlandai/lescola/projectes-descola/"]]
  },
  "Escola Tàber": {
    focus: "强调儿童与家庭参与；具体的新生支持需逐项问清。",
    teaching: "学校公开说明以儿童为中心、重视家庭合作；这些理念不足以证明一年级有固定的个别语言课程。",
    staff: "官网设教师团队入口；需问实际班额、班主任接收外国低龄新生的经验及可投入的支持时间。",
    ask: "是否安排固定家校联系人、迎新同伴和首月每周反馈？不会当地语言的家长怎样参与？",
    sources: [["学校与团队", "https://taber.cat/ESCOLA/"], ["家庭合作", "https://taber.cat/les-families/"]]
  },
  "Institut Escola Costa i Llobera": {
    focus: "3–18 岁一贯制；低龄孩子与大龄学生的活动分区需要现场看。",
    teaching: "校方说明覆盖 3–18 岁，并提供 PEC 和内部运行规范；历史共处计划涉及小学合作学习，现行课堂安排须确认。",
    safety: "公开有共处计划，但所查 PDF 为历史版本；应索取现行反欺凌流程，核实不同年龄学生的操场、厕所及出入口管理。",
    ask: "一年级语言支持由谁负责？低年级是否有独立活动区，午餐和转场由谁带领？",
    sources: [["学校及教育文件", "https://costaillobera.cat/institut-escola/"], ["历史共处计划", "https://costaillobera.cat/wp-content/uploads/2021/06/pla_de_convivenciaCosta-i-llobera_2013.pdf"]]
  },
  "Betània-Patmos": {
    focus: "强调学习要求与自律；要谈清语言适应期是否调整任务和评价。",
    teaching: "校方核心理念重视全面发展、努力、自主及个人纪律。不能把高学术要求理解为一定不适合新移民，也不能默认有语言过渡班。",
    ask: "首学期是否区分学科理解与语言表达来评价？作业是否提供图示，家长不懂当地语言时怎样配合？",
    sources: [["学校核心理念", "https://www.betania-patmos.org/es/276-espanol/la-escuela-c/ideas-clave-c.html"]]
  },
  "Jesuïtes Sarrià - Sant Ignasi": {
    focus: "已公开多专业团队；关键是这些资源能否落实到你们女儿的课表。",
    teaching: "1–4 年级 PIN 强调综合学习、情绪与社会能力、自主和差异化；不是国际学校的全英语课程。",
    staff: "校方小学页列出导师、学科教师、教育心理人员、英语会话助理及照护人员共同规划和评价；未核实个人可获得的时数。",
    ask: "可否由一年级负责人和教育心理人员共同制定首月接收方案？英语助理能否支持新生，还是只服务英语课？",
    sources: [["小学教学与团队", "https://www.fje.edu/ca/jesuites-sarria/escola-de-primaria-concertada-sarria-barcelona"], ["PIN 教育方案", "https://www.fje.edu/es/jesuites-sarria/proyecto-educativo-de-primaria"]]
  },
  "Montserrat": {
    focus: "项目式与多元智能教学；零语言时能否参与小组任务应优先核实。",
    teaching: "巴塞罗那本校小学页说明以理解为目标的项目学习，涉及语言、科学、艺术、体育和宗教，并安排日常价值观与社交活动。勿混用其他城市同名学校资料。",
    ask: "一年级如何用操作活动和图示教授读写？宗教活动如何安排非天主教家庭？语言过渡期如何评价？",
    sources: [["本校小学方案", "https://www.cmontserrat.org/educacio-primaria/"]]
  },
  "Padre Damián Sagrados Corazones": {
    focus: "有护理和言语服务入口，但不等于有针对外国新生的语言课程。",
    teaching: "校方强调多语言、音乐和个人陪伴，具有基督教价值观背景；具体一年级授课比例需看课表。",
    staff: "官网列有护理及言语治疗服务；言语治疗不能直接等同西语/加泰语作为第二语言教学。",
    safety: "有护理服务入口；值班时间、给药授权、过敏处理及联系家长的语言尚待核实。",
    ask: "是否配有初学者语言教师？校医/护士是否覆盖完整上学时间及午餐时段？",
    sources: [["学校项目及服务", "https://www.padredamiansscc.org/"], ["小学入口", "https://www.padredamiansscc.org/etapes/primaria/"]]
  },
  "Peter Pan": {
    focus: "英语项目清晰，但小学英语强化不代表低基础插班可直接跟上。",
    teaching: "校方说明为单线、世俗学校；小学采用多层次教学，三类学习领域使用英语，一年级开始 Science。幼儿阶段 75% 英语不能套用于小学。",
    language: "有英语导师及母语会话助理，未公开确认接受零西语/加泰语、少量英语的一年级新生及补习时数。",
    staff: "校方明确介绍英语教师和会话助理；需确认一年级班主任、实际班额及新生支持职责。",
    safety: "官网展示情绪教育与同伴辅导内容；不能据此确认一年级已经有专属伙伴或零欺凌。",
    ask: "10 月新生能否参与 Science？是否有低龄语言初学者案例、分层任务及固定陪伴同学？",
    sources: [["小学方法、英语及团队", "https://peterpan.cat/"]]
  },
  "Reial Monestir de Santa Isabel": {
    focus: "公开正文访问受限，先取得一年级课程和接收条件再比较。",
    teaching: "本轮未能核实小学教学细节；查到 2025–2026 内部运行规范，不能以旧规范替代本学年教学介绍。",
    safety: "校方存在 NOFC 文件；须索取 2026–2027 适用版本、儿童保护负责人及反欺凌和投诉流程。",
    ask: "请发一年级课程、语言支持和教师介绍；说明宗教活动参与要求及国际新生适应安排。",
    sources: [["NOFC 2025–2026（历史参考）", "https://www.rmsantaisabel.com/wp-content/uploads/2026/02/NOFC-25-26.pdf"]]
  },
  "Sagrado Corazón": {
    focus: "有小学辅导部门，校方明确将非招生季申请指向教育局流程。",
    teaching: "本校小学页列有阅读、多语言、机器人、体育及宗教活动，网站重视读写和数学基础。",
    staff: "公开列有小学教育辅导部门；具体语言初学者支持、教师背景与班额须询问。",
    admission: "校方招生页提供非预注册期申请的 Consorci 入口。10 月入学需按官方流程及实际空位办理，不是邮件询问后自动获得学位。",
    ask: "请确认小学咨询是否应使用官网的 bienvenidos.b@corazonistas.com；询问一年级空位、语言辅导和午餐适应。",
    sources: [["小学课程与辅导", "https://www.barcelona.corazonistas.com/primaria/"], ["招生及现行联系入口", "https://www.barcelona.corazonistas.com/informacion/"]]
  },
  "Sagrat Cor-Sarrià": {
    focus: "有导师和共处方案；课后活动的低龄交接值得进一步确认。",
    teaching: "校方项目入口列有导师计划、共处项目、教师培训和可持续教育；须索取一年级具体教学安排。",
    safety: "课外文化活动页面说明幼儿与小学一、二年级由活动人员课后接走；应确认当前执行、授权接送和缺席核查。",
    ask: "对不会西语/加泰语的孩子，午餐和课外活动是否也安排沟通支持？宗教活动有哪些要求？",
    sources: [["教育项目", "https://sagratcorsarria.com/entusiasmate/?lang=es"], ["低龄课外活动交接", "https://sagratcorsarria.com/activitats-culturals/"]]
  },
  "Sant Marc de Sarrià": {
    focus: "重视个别关注与情绪教育；要核实承诺对应的教师时间。",
    teaching: "小学页面介绍项目、合作学习、个别化关注及情绪教育，按儿童节奏和能力安排学习。",
    safety: "校方公开共处计划与 NOFC；需确认本学年版本及涉及排斥、语言嘲笑时的具体处理时限。",
    ask: "请给出一年级实际班额、负责新生的老师和每周语言支持时数；旧空位表不能替代 10 月实时空位。",
    sources: [["小学教学", "https://www.santmarc.com/oferta-educativa/primaria/"], ["共处计划", "https://www.santmarc.com/wp-content/uploads/2023/07/PROJECTE-DE-CONVIVENCIA-SANT-MARC.pdf"]]
  },
  "Santa Dorotea": {
    focus: "合作与项目学习，有心理教育团队；要确认支持包含新生语言适应。",
    teaching: "小学页介绍主动学习、合作、思维导图和项目，重视个体差异；不是只靠课本讲授的单一路径。",
    staff: "官网提供教师及心理教育团队入口；资源存在不代表孩子自动获得一对一支持。",
    safety: "网站列有意外险、给药授权及内部规范；需核实操场/午餐监管和孩子无法口头求助时的替代方式。",
    ask: "小学班主任与心理教育团队能否一起制定首月计划？合作任务如何为零当地语言学生调整？",
    sources: [["小学、团队与服务", "https://sarria.salesianes.org/oferta-educativa/primaria/"]]
  },
  "Santa Teresa - Ganduxer": {
    focus: "有完整学段与生活服务；具体低龄插班支持尚待校方说明。",
    teaching: "官网提供小学学段及德肋撒教育背景、托管和课外活动入口；本轮未核实一年级详细方法与课表。",
    ask: "请发一年级教师与课堂介绍、语言接收计划；宗教活动、校服及长日程是否有适应期安排？",
    sources: [["本校教学与服务入口", "https://ganduxer.escolateresiana.com/"]]
  },
  "Escola Poeta Foix": {
    focus: "本轮官网正文访问受限，需先拿到一年级教学与迎新资料。",
    teaching: "查到校方学校介绍及数字教育策略入口；未核实当年读写教学、作业量或语言课程，不能凭网站栏目推断教学质量。",
    ask: "请索取新版 PEC、语言方案和班额；第一次家长会能否用英语或提供翻译协助？",
    sources: [["学校介绍入口（正文未能核实）", "https://agora.xtec.cat/ceippoetafoix/lescola/"]]
  },
  "Institut Escola Projecte": {
    focus: "单线、个性化教育；规模小不等于班额小或额外支持充分。",
    teaching: "官网说明是公立、世俗、单线学校，重视每个孩子的学习方式与个性化陪伴。",
    staff: "教育方案由教师团队共同参与制定；新移民语言教师、助教和一年级实际人数未核实。",
    ask: "单线班级有多少学生？若语言支持教师不在班里，谁负责解释指令、如厕及情绪安抚？",
    sources: [["学校及个性化教育", "https://escolaprojecte.org/escola/"]]
  },
  "Augusta": {
    focus: "单线、情绪教育与英语强化；需确认可用的当地语言补充支持。",
    teaching: "小学采用数学/语言学习角、环境项目及机器人等学习情境，公开情绪教育项目；英语另有每周两小时跨学科学习。",
    staff: "校方说明单线并强调个别关注，但没有据此核实班额或初学者支援师生比。",
    ask: "是否能用英语协助理解基础指令？西语与加泰语如何分阶段引入，而不是同时要求达到本地同龄水平？",
    sources: [["小学方法与情绪教育", "https://www.escola-augusta.com/primaria/"]]
  },
  "Canigó": {
    focus: "先核实校区和当前招生安排，不能直接沿用旧目录判断。",
    teaching: "Viaró 的 2026–2027 信息页已列 Canigó Barcelona 与 Vallès 校区；本轮未核实 6 岁女孩具体在哪个校区及当前小学教学安排。",
    admission: "先书面确认小学一年级校址、办学及协约状态、女生招生安排与 10 月入学途径。原目录性质、距离及费用不能作为这些事项已获确认的证据。",
    ask: "女孩一年级具体在 Barcelona 还是 Vallès？当前是否协约及收费多少？语言接收安排和每日接送地点是什么？",
    sources: [["2026–2027 校区信息", "https://viaro.org/informacion-general/"]]
  },
  "Decroly": {
    focus: "主动与操作式学习值得看课；仍需专门的初学者语言支持。",
    teaching: "学校公开采用 Decroly 主动教育，强调创造力、自主与批判思考；操作活动可能提供非语言参与机会，这是适配推断，不是入学保证。",
    safety: "官网介绍 2019 年校舍健康与可持续措施；建筑健康认证不等于儿童保护或反欺凌效果已获核实。",
    ask: "能否观摩一年级？老师如何用示范和图片支持不会当地语言的孩子？户外与操作工具活动怎么监管？",
    sources: [["学校教育项目", "https://escoladecroly.org/"], ["校舍健康说明", "https://escoladecroly.org/escola/escola-saludable/"]]
  },
  "Escola Pia Balmes": {
    focus: "强调有意义的学习和参与；插班语言衔接需落实到实际课堂。",
    teaching: "小学页以学会共同生活、解决问题和认识环境为目标，采用促进有意义学习与学生参与的方法。",
    safety: "学校公开说明曾参与 Protegim les Escoles 校门周边改造；不能以历史街道改造保证当前通学安全，仍需现场走路线。",
    ask: "一年级合作任务和作业怎样分层？家长不会当地语言时学校如何反馈？校门高峰期怎样交接？",
    sources: [["小学方案", "https://balmes.escolapia.cat/primaria/"], ["校门周边项目（历史）", "https://balmes.escolapia.cat/projecte-sostenibilitat/"]]
  },
  "Escola Pia de Sarrià-Calassanç": {
    focus: "课程与生活服务较丰富；需找小学负责人，勿误投职业教育部门。",
    teaching: "小学页强调学科基础、社会能力、艺术和音乐教育，以及课堂以外的跨学科学习。",
    staff: "官网列有心理教育部门和教师团队；须核实初学者支援不是仅学科学习困难辅导。",
    ask: "目录邮箱带 FP，请通过小学官网确认联系人；询问一年级语言方案、接送授权和首月适应日程。",
    sources: [["小学及支持服务入口", "https://escolapissarria.cat/oferta-educativa/primaria/"]]
  },
  "Frederic Mistral-Tècnic Eulàlia": {
    focus: "Kósmos 跨学科项目；先确认一年级校址和语言参与办法。",
    teaching: "本校小学介绍以自然与社会环境知识为主线的 Kósmos 项目。须与 L'Hospitalet 同名公立学校区别。",
    ask: "一年级在哪个校区？项目中的阅读、展示、合作如何为新移民调整？孩子未能用当地语言表达时如何评价？",
    sources: [["本校小学教育", "https://fredericmistral-tecniceulalia.cat/es/oferta-educativa/educacion-primaria/"]]
  },
  "Galí Bellesguard": {
    focus: "人文与自主学习，低年级独立楼宇；需确认语言接收资源。",
    teaching: "PEC 自述为世俗、人文取向、两线学校；低年级与幼儿在 Maria Montessori 楼。楼名不代表所有课程均是 Montessori 教法。",
    language: "校方介绍英语从幼儿阶段开始，小学低年级系统学习，高年级再扩展英语学科教学；不是全英语小学。零西语/加泰语支持未核实。",
    ask: "一年级是否有额外口语支持及迎新伙伴？低年级楼与公共区域转场由谁照看？",
    sources: [["PEC 与学段楼宇", "https://galibellesguard.cat/wp-content/uploads/2024/08/PEC-Escola-Gali-Bellesguard-1.pdf"], ["语言教学", "https://galibellesguard.cat/innovacio-conscient/"]]
  },
  "Jesuïtes Sant Gervasi - Infant Jesús": {
    focus: "主动学习和整合教师团队；适合度取决于初学者能否参与。",
    teaching: "1–4 年级 PIN 运用主动学习、合作与认知策略，强调真实任务、反思和灵活适应。",
    staff: "校方介绍整合教师团队；创新方案提及导师团队与学段管理、心理辅导共同讨论学生情况。",
    ask: "请让 PIN1 负责人说明首月图示指令、读写起点、同伴安排和定期家校反馈。",
    sources: [["小学教学与团队", "https://www.fje.edu/ca/jesuites-sant-gervasi/projecte-educatiu-primaria"], ["团队协作", "https://www.fje.edu/ca/jesuites-sant-gervasi/escola-innovadora"]]
  },
  "John Talabot": {
    focus: "多语言与个性化支持，但未公开承诺零当地语言插班。",
    teaching: "小学在加泰课程框架内强化英语，并列有音乐、游泳、艺术和文化活动；不是纯英式课程。",
    staff: "小学页公开心理教育与辅导部门；未核实 EAL 或加泰语初学者专任师资及课时。",
    safety: "学生福祉入口跳转登录，本轮无法审核其完整制度；需索取公开版本及小学儿童保护负责人联系方式。",
    ask: "6 岁少量英语是否达到入口要求？需要几种语言同时读写？游泳课如何向零语言新生解释安全指令？",
    sources: [["小学课程及辅导", "https://johntalabotschool.com/primary/"], ["学生福祉入口（需登录）", "https://johntalabotschool.com/student-wellbeing/"]]
  },
  "La Salle Bonanova": {
    focus: "已公开 KiVa 反欺凌项目；仍需询问低龄外国新生的执行细节。",
    teaching: "官网提供小学学段与个性化参观入口；本轮未核实一年级每科教学方法及新生语言课表。",
    safety: "校方公开 KiVa 反欺凌项目；这证明有项目说明，不证明无欺凌。应问一年级实施、语言/国籍相关排斥报告方式和处理反馈时限。",
    ask: "一年级是否参加 KiVa？不会语言的孩子怎样报告问题？谁跟进午餐、操场和入学初期的同伴关系？",
    sources: [["本校小学入口", "https://bonanova.lasalle.cat/es/"], ["KiVa 校方说明", "https://bonanova.lasalle.cat/la-salle-bonanova-aposta-per-una-convivencia-positiva-amb-el-projecte-kiva/"]]
  },
  "L'Horitzó": {
    focus: "个性化学习路线明确；自主程度高时更要问清教师语言引导。",
    teaching: "学校说明个性化不是全班做同一套独立作业，而是按需要与兴趣制定路线，运用跨学科项目和微型学习环境。",
    staff: "校方将教师定位为照顾、协调和引导学习的团队；实际班额和负责第二语言的老师未核实。",
    ask: "能否展示零语言孩子的一周个性化计划？每个任务由谁解释、多久检查一次，如何避免孩子只是旁观？",
    sources: [["个性化学习 FAQ", "https://www.escola-horitzo.cat/faqs/"], ["教育与教师角色", "https://www.escola-horitzo.cat/9-idees/"]]
  },
  "Lleó XIII": {
    focus: "有个别化与心理教育团队；体育特长安排不能套用于一年级插班。",
    teaching: "官网强调按学生需要调整学习；其体育/舞蹈/音乐特殊日程主要介绍 ESO 和高中，不能推断小学也有相同安排。",
    staff: "信息页公开小学教师与心理教育部门联系人；需确认 2026–2027 一年级班主任和第二语言支援。",
    ask: "一年级个别化计划能否覆盖语言初学者？主要教学语言、班额、专任支持和家校反馈频率如何？",
    sources: [["教育方案与适用学段", "https://lleoxiii.com/"], ["教师与辅导团队", "https://lleoxiii.com/informacion-practica/"]]
  },
  "Lys": {
    focus: "做中学与合作氛围；语言支援不能仅依靠孩子自行融入。",
    teaching: "校方强调直接经验、实践、反思和儿童主动参与，教育目标包含尊重、合作、自主及批判思考。",
    ask: "一年级的自由/实践活动如何配上明确语言引导？是否能安排固定伙伴、情绪签到及英语家校联系人？",
    sources: [["学校学习理念", "https://www.escolalys.cat/"]]
  },
  "Madres Concepcionistas de la Enseñanza": {
    focus: "操作数学与项目学习，低年级有游泳；语言和水上安全需一起问。",
    teaching: "小学公开项目、合作、思维训练及操作式数学；Aqua 项目为 1–4 年级每周游泳，另有音乐和机器人。",
    safety: "有游泳及出游活动不等于安全安排已核实。应问泳池分组、救生员、换衣照护、孩子听不懂指令时的措施。",
    ask: "孩子是否必须参加游泳？零当地语言的水上安全指令怎么教？一年级是否用平板及每天多久？",
    sources: [["小学项目与 Aqua", "https://barcelonaconcepcionistas.es/primaria/"]]
  },
  "Nausica": {
    focus: "个性化、多方法与三语环境；需确认语言初学者支持的具体形式。",
    teaching: "校方以儿童为中心，按学习差异运用多种方法，强调家庭式、多语言教育及与社区联系。",
    language: "校方介绍加泰语、西语、英语环境；多语言不等于三种语言都从零教，也不代表有普通话沟通人员。",
    ask: "是否接收过少量英语、零当地语言的一年级新生？首月读写任务与课堂参与如何调整？",
    sources: [["个性化方法", "https://escolanausica.cat/metodologies-educatives-collegi/"], ["语言与学校定位", "https://escolanausica.cat/the-school/"]]
  },
  "Nostra Senyora de Lurdes": {
    focus: "专注 3–12 岁、艺术与情绪发展；实际支援强度仍要核实。",
    teaching: "校方自述两线、专注幼儿与小学，关注身体、智力、情绪、艺术和精神成长，强调对话与创造力。",
    ask: "艺术和操作活动能否帮助语言初学者参与？怎样处理第一月焦虑？宗教/精神活动具体如何安排？",
    sources: [["学校教育理念", "https://www.escolalurdes.cat/ideari/"]]
  },
  "Sil": {
    focus: "三语、体验学习与游泳；三语标签不等于零基础接收能力。",
    teaching: "小学页介绍实验和体验学习、不同分组方式，并按学习节奏调整内容；校内泳池活动纳入体育。",
    language: "官网定位三语学校；需校方明确一年级各科实际授课语言、初学者分组和补习收费。",
    safety: "校内泳池需要核实监管比例、救生资格、过敏/用药和换衣照护；网站展示设施不是现场安全评估。",
    ask: "如何帮助只会一点英语的孩子理解三语指令？游泳课有何适应安排？家长可否英文沟通？",
    sources: [["小学方法及泳池活动", "https://colegiosil.com/en/educative-offer/primary/"], ["三语及导师定位", "https://colegiosil.com/en/home-2/"]]
  },
  "Jesús María Sant Gervasi": {
    focus: "个别关注与家校关系；要区分宗教理念与对新生的具体支持。",
    teaching: "学校集团本校介绍强调按学生需要设计教学、人文与基督教价值、家庭合作及音乐项目。",
    ask: "请确认一年级课程、当地语言补习、宗教活动参与要求；是否有家长英文联系人和首月反馈计划？",
    sources: [["本校课程与价值观", "https://colegiosjesusmaria.com/colegio/jesus-maria-sant-gervasi-barcelona"]]
  },
  "Benjamin Franklin International School": {
    focus: "公开语言入口对低年级初学者较友好，可优先询问；不代表已有空位。",
    teaching: "小学采用探究单元，重视读写与社会情绪学习；涉及尊重差异及儿童保护主题。",
    language: "招生 FAQ 明确 Nursery 至 Grade 2 可无英语基础，并有英语语言专员与课堂教师协作。需确认女儿所属年级、支持课时及收费；零西语不代表无需学习当地语言。",
    staff: "公开说明专门英语支持教师，以及为轻至中度学习差异提供支持/共同备课的专业人员。",
    safety: "公开儿童保护、包容与安全政策，校方说明员工定期接受儿童保护培训；实际报告和处置效果仍需核实。",
    admission: "实行滚动招生，合格申请仍可能候补；完整申请通常约两周审查，涉及学习支持可能更久。10 月初能否开始必须得到书面确认。",
    ask: "请确认低年级名额、语言支持是否计入费用、前四周计划与实际班额；材料不足两学年时接受何种替代证明？",
    sources: [["语言门槛 FAQ", "https://www.bfischool.org/admissions/admissions-faq"], ["小学与师资", "https://www.bfischool.org/learning/elementary-school"], ["儿童保护政策", "https://www.bfischool.org/about-us/policies-transparency"], ["申请时限与候补", "https://www.bfischool.org/admissions/application-process"]]
  },
  "BSB City - Lucà Campus": {
    focus: "先评估英语口语：Y1–2 也有语言要求，不能默认少量英语即可入学。",
    teaching: "英式小学以探究和跨学科联系组织学习，持续评价；英语授课，西语/加泰语课除外。",
    language: "招生页要求 Y1–2 具备年龄相应的英语口语；Y3 起要求口语及书面能力。公开有 EAL 支持，但不等于豁免入学门槛，需确认 City 校区可提供的课时和费用。",
    staff: "BSB 小学页称小学教师为有资格的英语母语教师，另有语言与学生支持团队；属于学校自述，具体 City 班主任待确认。",
    safety: "小学页将网络安全列为重点；需另索取 City 校区儿童保护、访客控制、操场与接送程序，不能套用其他校区旧检查结果。",
    admission: "先由 City 招生确认出生日期对应年级、英语评估与 10 月空位；不能将幼儿零英语规则套用小学。",
    ask: "少量英语可否达到 Y1/Y2 要求？EAL 频率、入班内/抽离支持和额外费用是多少？是否可先做远程口语评估？",
    sources: [["入学语言要求", "https://www.britishschoolbarcelona.com/admissions-process/"], ["小学教学、师资及 EAL", "https://www.britishschoolbarcelona.com/primary/"]]
  },
  "Oak House School": {
    focus: "双重语言适应需谨慎评估：Y2 起英语门槛，零西语可能要求一对一支持。",
    teaching: "本轮以招生 FAQ 为主要可核查来源，未充分核实一年级日常教法；应索取实际课表及读写教学样例。",
    language: "FAQ 说明小学按个案评估，Y2 起需一定英语；没有西语的小学申请者可能被要求由家庭安排课堂一对一支持。职责、资格、时长和费用都需书面澄清。",
    staff: "不能将家长安排的一对一支持理解为学校免费配置助教；具体专业人员资质和学校监督安排未核实。",
    admission: "FAQ 表示学年中有空位时可启动申请，仍需评估及候补顺序，不保证 10 月学位。",
    ask: "女儿对应哪个 Year？是否必须自费一对一支持、每月多少钱、持续多久、由谁雇用和做儿童保护审查？",
    sources: [["语言门槛、个别支持与学年中申请", "https://www.oakhouseschool.com/admissions/"]]
  },
  "Santa Clara International School": {
    focus: "当前资料可核查性较弱，先确认在办学、校址和小学接收条件。",
    teaching: "可查学校自述三语和个性化教育，但本轮官网不可读取；未核实 2026–2027 课程、现有师资与安全制度，不沿用旧目录作确定判断。",
    language: "三语自述不证明有 EAL、中文人员或零西语小学支持；需直接取得最新招生与语言政策。",
    admission: "先确认本学年小学仍招生及当前正式学校名称、校址、资质，再讨论 10 月初插班。",
    ask: "请提供现行小学课程、师资、语言接收政策和儿童保护文件，以及可预约参观的地址。",
    sources: [["学校自述（非当年招生文件）", "https://es.linkedin.com/company/santa-clara-international-college"]]
  },
  "St. George Barcelona": {
    focus: "接受全年申请；少量英语能否进入对应年级仍需个案评估。",
    teaching: "小学采用英国国家课程，辅以西语、加泰语和社会学习；强调持续反馈与社会情绪发展。",
    language: "主要英语教学，但西语/加泰语仍属课程部分；本轮未核实针对 6 岁低英语新生的正式最低门槛及 EAL 课时，不套用幼儿无英语案例。",
    staff: "招生 FAQ 自述由英语母语教师教授主体课程，语言课程由相应母语教师承担；小学定期报告及家长会帮助跟踪进展。",
    safety: "查到 2025–2026 儿童保护政策，含指定负责人和员工培训；需索取 2026–2027 当前版本与负责人。",
    admission: "官网明确全年接受申请，可线上会面；具体年级、评估与 10 月空位需校方确认。",
    ask: "能否先做非惩罚性的英语与学科起点评估？是否有初学者 EAL、首月陪伴、中文/英文家校沟通和额外费用？",
    sources: [["小学教学", "https://www.stgeorgebarcelona.com/en/learning-journey/primary-school-barcelona"], ["全年申请与师资说明", "https://www.stgeorgebarcelona.com/en/admissions/how-to-apply"], ["儿童保护 2025–2026（待更新确认）", "https://www.stgeorgebarcelona.com/St%20George%20Barcelona/new%20docs/SGB%20Safeguarding%202025-26.pdf"]]
  }
};

function profileForSchool(school) {
  const profile = schoolProfiles[school.name] || {};
  return {
    focus: "待补充校方资料，不作适配结论。",
    teaching: "本轮未核实详细教学方案。",
    language: "本轮未查到明确针对 6 岁、零西语/加泰语新生的支持承诺。需确认各科语言、支持教师、每周课时及收费；英语课不能替代当地语言接收方案。",
    staff: "本轮未核实当前一年级班额、助教配置、教师资格/流动率及接收中文母语新生的经验。需向学段负责人核实，不能用学校总师生比替代实际班额。",
    safety: "本轮未核实当前完整儿童保护与执行情况。需索取反欺凌/反歧视流程、负责人和反馈时限，并核对校门授权接送、午餐/操场照护、如厕隐私、给药及医疗应急。未查到不代表没有。",
    admission: school.ownership === "私立（非协约）" ? "向学校确认对应年级、评估和 2026 年 10 月初空位；公开介绍不代表录取承诺。" : "按公立/协约学段的非预注册期申请途径，向 Consorci 核实新迁入家庭材料与分配；可以并行询校，但未确认任何学校 10 月空位。先以出生日期及既往学籍确认年级。",
    ask: "请提供前四周适应计划、实际支持时数、家校沟通语言及所有新增费用。",
    sources: [],
    ...profile
  };
}

function renderSchoolProfile(school, escape) {
  const profile = profileForSchool(school);
  const sections = [["教学方式", profile.teaching], ["语言与适应", profile.language], ["师资与支持", profile.staff], ["安全与照护", profile.safety], ["10 月插班", profile.admission], ["针对本校必问", profile.ask]];
  return `<p class="profile-focus">${escape(profile.focus)}</p><details><summary>教学、师资、安全与插班详情</summary><p class="profile-date">公开资料核查 ${schoolProfileReviewDate}；适配判断为推断，非录取或安全保证。</p><dl>${sections.map(([label, value])=>`<dt>${escape(label)}</dt><dd>${escape(value)}</dd>`).join("")}</dl><div class="profile-sources">${profile.sources.map(([label, url])=>`<a href="${escape(url)}" target="_blank" rel="noopener noreferrer">${escape(label)}</a>`).join("")}</div></details>`;
}
