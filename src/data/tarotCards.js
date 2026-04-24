export const tarotCards = [
  // === 大阿尔卡纳 (Major Arcana) 0-21 ===
  {
    id: 0,
    name: "愚者",
    nameEn: "The Fool",
    number: "0",
    category: "major",
    suit: null,
    uprightKeywords: ["新开始", "自由", "冒险", "天真"],
    reversedKeywords: ["鲁莽", "冒失", "不计后果", "停滞"],
    uprightMeaning: "愚者代表着全新的开始与无限的可能性。你正站在一段新旅程的起点，心中充满了对未知的期待与好奇。现在是放下过去包袱、勇敢迈出第一步的时候。保持开放的心态，相信宇宙会引导你走向正确的方向。不要被恐惧束缚，拥抱变化与冒险。",
    reversedMeaning: "逆位的愚者提醒你注意盲目冲动的风险。你可能正在做出不够深思熟虑的决定，或者因为恐惧而迟迟不敢行动。建议你在自由与责任之间找到平衡，既不要过于鲁莽，也不要因循守旧。审视一下自己是否在逃避某些重要的事情。",
    symbol: "◇"
  },
  {
    id: 1,
    name: "魔术师",
    nameEn: "The Magician",
    number: "I",
    category: "major",
    suit: null,
    uprightKeywords: ["创造力", "意志力", "技能", "资源充足"],
    reversedKeywords: ["欺骗", "操控", "才能浪费", "缺乏方向"],
    uprightMeaning: "魔术师象征着你拥有将愿望化为现实的能力。你手中已经握有所需的一切资源和技能，现在需要的是专注与行动。这是一个充满创造力的时刻，善用你的才华，将想法付诸实践。宇宙正在支持你的创造与表达。",
    reversedMeaning: "逆位的魔术师暗示你可能没有充分发挥自己的潜力，或者在某些事情上存在自欺欺人的倾向。也许你感到缺乏方向感，不知道该如何运用自己的能力。重新审视你的目标，找回内在的力量与专注力。",
    symbol: "∞"
  },
  {
    id: 2,
    name: "女祭司",
    nameEn: "The High Priestess",
    number: "II",
    category: "major",
    suit: null,
    uprightKeywords: ["直觉", "潜意识", "内在智慧", "神秘"],
    reversedKeywords: ["忽视直觉", "表面化", "秘密", "脱节"],
    uprightMeaning: "女祭司邀请你向内探索，倾听来自潜意识的声音。答案不在外界，而在你的内心深处。现在是冥想、反思和信任直觉的时刻。不要急于行动，让事情自然展开，保持耐心与觉察。你的内在智慧比你想象的更加深邃。",
    reversedMeaning: "逆位的女祭司提示你可能正在忽视自己的直觉，过于依赖外在的意见和理性分析。你可能与自己的内在世界失去了联系，感到迷茫或不安。试着放慢脚步，给自己独处和反思的时间。",
    symbol: "☽"
  },
  {
    id: 3,
    name: "女皇",
    nameEn: "The Empress",
    number: "III",
    category: "major",
    suit: null,
    uprightKeywords: ["丰盛", "滋养", "自然", "感官享受"],
    reversedKeywords: ["过度依赖", "创造力受阻", "忽视自我", "匮乏感"],
    uprightMeaning: "女皇带来丰盛与滋养的能量。这是一个享受生活美好事物的时刻——美食、自然、艺术和爱。你的创造力正处于巅峰，无论是艺术创作还是孕育新生命。拥抱你的感官体验，对自己和他人都给予温柔的关怀。",
    reversedMeaning: "逆位的女皇暗示你可能在照顾他人的同时忽略了自己的需求。你可能感到创造力枯竭或情感上的空虚。是时候将注意力转回自身，给自己更多的爱与滋养。检视一下你与丰盛感之间的关系。",
    symbol: "♀"
  },
  {
    id: 4,
    name: "皇帝",
    nameEn: "The Emperor",
    number: "IV",
    category: "major",
    suit: null,
    uprightKeywords: ["权威", "结构", "稳定", "领导力"],
    reversedKeywords: ["专制", "僵化", "失控", "过度控制"],
    uprightMeaning: "皇帝代表着秩序、结构与权威。现在是建立稳固基础、制定清晰计划的好时机。运用你的领导力和组织能力，为生活创造有序的框架。自律和坚持将帮助你实现目标。你有能力掌控局面并做出明智的决策。",
    reversedMeaning: "逆位的皇帝可能暗示过度控制或权力的滥用。你可能对自己或他人过于严厉，或者相反，感到生活失去了控制。试着在坚定与灵活之间找到平衡，不要让规则和秩序变成束缚。",
    symbol: "♂"
  },
  {
    id: 5,
    name: "教皇",
    nameEn: "The Hierophant",
    number: "V",
    category: "major",
    suit: null,
    uprightKeywords: ["传统", "指引", "信仰", "教育"],
    reversedKeywords: ["打破常规", "质疑权威", "个人信念", "非传统"],
    uprightMeaning: "教皇代表传统智慧与精神指引。你可能正在寻求一位导师的帮助，或者从既有的体系中获取知识。遵循已被验证的方法和传统价值观会给你带来指引。这也是学习、教育和深化信仰的好时机。",
    reversedMeaning: "逆位的教皇鼓励你质疑既有的规则和传统。也许你需要走出一条属于自己的道路，而不是盲目遵从他人的期望。信任你自己的判断，勇于挑战不再适合你的旧有信念和体制。",
    symbol: "✝"
  },
  {
    id: 6,
    name: "恋人",
    nameEn: "The Lovers",
    number: "VI",
    category: "major",
    suit: null,
    uprightKeywords: ["爱情", "和谐", "选择", "价值观"],
    reversedKeywords: ["不和谐", "失衡", "价值观冲突", "错误选择"],
    uprightMeaning: "恋人牌不仅关乎爱情，更关乎重要的人生选择。你正面临一个需要遵从内心的决定。这张牌鼓励你追随真心，选择与你核心价值观一致的道路。在关系中，它预示着深层的连接与和谐。",
    reversedMeaning: "逆位的恋人暗示你可能在某段关系或重要决定中感到矛盾和不和谐。你的选择可能与内心的价值观产生了冲突。重新审视你真正珍视的是什么，不要因外在压力而违背本心。",
    symbol: "♡"
  },
  {
    id: 7,
    name: "战车",
    nameEn: "The Chariot",
    number: "VII",
    category: "major",
    suit: null,
    uprightKeywords: ["胜利", "决心", "意志力", "前进"],
    reversedKeywords: ["失去方向", "缺乏控制", "攻击性", "受阻"],
    uprightMeaning: "战车象征着凭借坚定的意志力冲破障碍、走向胜利。你有足够的决心和力量来克服当前的挑战。保持专注，控制好内心矛盾的力量，将它们统一到同一个方向。成功就在前方，但需要你坚定不移地前行。",
    reversedMeaning: "逆位的战车暗示你可能感到失去了方向或控制力。内心的冲突让你难以前进，或者你的推进方式过于激进。停下来重新校准你的方向，确保你是在正确的道路上前行，而不只是盲目冲刺。",
    symbol: "⚡"
  },
  {
    id: 8,
    name: "力量",
    nameEn: "Strength",
    number: "VIII",
    category: "major",
    suit: null,
    uprightKeywords: ["勇气", "内在力量", "耐心", "温柔的坚定"],
    reversedKeywords: ["自我怀疑", "软弱", "缺乏信心", "压抑"],
    uprightMeaning: "力量牌告诉你，真正的力量不在于蛮力，而在于内心的勇气与温柔。你有能力以平和而坚定的方式面对困难。用爱与耐心来驯服内心的恐惧和冲动。相信自己的内在力量，它比你想象的更加强大。",
    reversedMeaning: "逆位的力量暗示你可能正在经历自我怀疑，感到内心缺乏勇气和信心。也许你在压抑自己的情感，或者屈服于恐惧。提醒自己，脆弱不等于软弱，承认自己的感受是重新找回力量的第一步。",
    symbol: "∮"
  },
  {
    id: 9,
    name: "隐士",
    nameEn: "The Hermit",
    number: "IX",
    category: "major",
    suit: null,
    uprightKeywords: ["内省", "独处", "智慧", "寻求真理"],
    reversedKeywords: ["孤立", "逃避", "过度封闭", "拒绝帮助"],
    uprightMeaning: "隐士邀请你暂时从喧嚣的外部世界中抽身，进行深入的内省与反思。独处不是孤独，而是与内在智慧对话的珍贵时刻。通过冥想和自我探索，你将找到一直在寻找的答案。让内心的光芒照亮你前行的道路。",
    reversedMeaning: "逆位的隐士可能暗示你过度封闭自己，将独处变成了一种逃避。你可能害怕与他人建立联系，或者固执地拒绝外界的帮助和建议。适度的独处有益，但完全的孤立会让你迷失方向。",
    symbol: "☆"
  },
  {
    id: 10,
    name: "命运之轮",
    nameEn: "Wheel of Fortune",
    number: "X",
    category: "major",
    suit: null,
    uprightKeywords: ["转变", "机遇", "命运", "循环"],
    reversedKeywords: ["厄运", "抗拒改变", "失控", "坏运气"],
    uprightMeaning: "命运之轮提醒你，生命是一个不断变化的循环。好运正在向你靠近，新的机遇即将出现。顺应变化的潮流，抓住时机。记住，万事皆有其时，保持乐观与信心，因为轮转的方向正在对你有利。",
    reversedMeaning: "逆位的命运之轮暗示你可能正经历一段不顺利的时期。你可能感到命运在作弄你，事情不在你的控制之中。但请记住，低谷是暂时的，轮子终会转向。在逆境中保持坚韧，寻找其中的成长机会。",
    symbol: "☸"
  },
  {
    id: 11,
    name: "正义",
    nameEn: "Justice",
    number: "XI",
    category: "major",
    suit: null,
    uprightKeywords: ["公正", "真相", "因果", "平衡"],
    reversedKeywords: ["不公正", "逃避责任", "偏见", "不诚实"],
    uprightMeaning: "正义牌提醒你，每一个行为都有其后果。现在是正视真相、做出公正决定的时候。诚实地面对自己和他人，承担应有的责任。如果你一直在做正确的事，公正的结果即将到来。法律和合约相关的事务将会得到公正的处理。",
    reversedMeaning: "逆位的正义暗示可能存在不公正的情况，或者你在逃避某些责任。也许你对某件事的判断存在偏见，或者有人对你不够诚实。审视一下自己的行为是否符合你的道德标准，勇于面对不舒服的真相。",
    symbol: "⚖"
  },
  {
    id: 12,
    name: "倒吊人",
    nameEn: "The Hanged Man",
    number: "XII",
    category: "major",
    suit: null,
    uprightKeywords: ["暂停", "新视角", "放下", "牺牲"],
    reversedKeywords: ["拖延", "抗拒", "无谓牺牲", "固执"],
    uprightMeaning: "倒吊人邀请你换一个角度看世界。有时候暂停和等待比行动更有力量。放下对结果的执着，让事情自然发展。从另一个视角审视当前的处境，你会发现之前看不到的真相。这段等待期将带来深刻的领悟。",
    reversedMeaning: "逆位的倒吊人暗示你可能在不必要地拖延或抗拒改变。你可能固执地坚持旧有的方式，不愿意尝试新的视角。或者你的牺牲并没有带来预期的结果。是时候行动起来，不要继续被困在原地。",
    symbol: "⊥"
  },
  {
    id: 13,
    name: "死神",
    nameEn: "Death",
    number: "XIII",
    category: "major",
    suit: null,
    uprightKeywords: ["结束", "转变", "重生", "告别过去"],
    reversedKeywords: ["抗拒结束", "恐惧改变", "停滞", "依赖过去"],
    uprightMeaning: "死神牌并不代表实际的死亡，而是象征一个重要阶段的结束和新阶段的开始。旧的事物必须消逝，才能为新生腾出空间。接受这个自然的转变过程，勇敢地告别不再服务于你的人事物。蜕变虽然不易，但重生后的你将更加完整。",
    reversedMeaning: "逆位的死神暗示你正在抗拒一个必要的结束。你可能紧紧抓住过去不放，害怕改变带来的未知。然而，这种抗拒只会让你陷入停滞。尝试放手，信任生命的自然流动，允许旧的离开，新的到来。",
    symbol: "⚰"
  },
  {
    id: 14,
    name: "节制",
    nameEn: "Temperance",
    number: "XIV",
    category: "major",
    suit: null,
    uprightKeywords: ["平衡", "调和", "耐心", "适度"],
    reversedKeywords: ["失衡", "极端", "过度", "缺乏耐心"],
    uprightMeaning: "节制牌教导你中庸之道的智慧。在对立的力量之间寻找平衡点——工作与休息、理性与感性、给予与接受。耐心地调和生活中的各个方面，不要走极端。保持适度和谐的状态，一切都会在合适的时机到来。",
    reversedMeaning: "逆位的节制暗示你的生活中存在某种失衡。你可能在某方面过度投入而忽略了其他重要的部分，或者缺乏耐心而急于求成。重新审视你的生活节奏，找到让身心都感到舒适的平衡状态。",
    symbol: "⚗"
  },
  {
    id: 15,
    name: "恶魔",
    nameEn: "The Devil",
    number: "XV",
    category: "major",
    suit: null,
    uprightKeywords: ["束缚", "欲望", "物质主义", "阴影面"],
    reversedKeywords: ["解放", "摆脱束缚", "面对恐惧", "恢复自由"],
    uprightMeaning: "恶魔牌揭示那些束缚你的执念和不健康的依附。你可能被物质欲望、坏习惯或有害的关系所困住。认识到这些锁链虽然看似牢固，但其实你随时有选择离开的力量。直面你的阴影面，才能真正获得自由。",
    reversedMeaning: "逆位的恶魔是一个积极的信号，暗示你正在挣脱束缚，重获自由。你开始认识到那些不健康的模式，并有勇气做出改变。这是摆脱坏习惯、结束有害关系、找回自我力量的好时机。",
    symbol: "⛓"
  },
  {
    id: 16,
    name: "塔",
    nameEn: "The Tower",
    number: "XVI",
    category: "major",
    suit: null,
    uprightKeywords: ["突变", "崩塌", "觉醒", "解放"],
    reversedKeywords: ["恐惧改变", "逃避灾难", "内在动荡", "延迟崩塌"],
    uprightMeaning: "塔牌代表突如其来的剧变和旧有结构的崩塌。虽然这个过程可能令人震惊和不安，但它其实是必要的清理——摧毁那些建立在虚假基础上的东西。在废墟中你会发现真相和新的可能性。拥抱这次觉醒，它将引领你走向更真实的自己。",
    reversedMeaning: "逆位的塔暗示你可能在极力避免一场必要的变革，或者变化正在你的内心深处酝酿但尚未爆发。你可能隐约感到某些事情已经不稳固了。与其等待它自行崩塌，不如主动面对和处理那些需要改变的部分。",
    symbol: "⚡"
  },
  {
    id: 17,
    name: "星星",
    nameEn: "The Star",
    number: "XVII",
    category: "major",
    suit: null,
    uprightKeywords: ["希望", "灵感", "宁静", "更新"],
    reversedKeywords: ["失去信心", "绝望", "缺乏灵感", "消极"],
    uprightMeaning: "星星牌带来希望与疗愈的光芒。经历风暴之后，宁静和美好正在降临。保持信心，你正走在正确的道路上。让灵感自由流动，敞开心扉接受宇宙的祝福。这是一段疗愈和精神更新的时期，你值得拥有内心的平静与喜悦。",
    reversedMeaning: "逆位的星星暗示你可能暂时失去了希望和信心，感到前路渺茫。灵感似乎枯竭，内心充满了不确定感。但请记住，星星的光芒从未真正消失，它只是被云层暂时遮住了。重新连接你内心的希望之光。",
    symbol: "✦"
  },
  {
    id: 18,
    name: "月亮",
    nameEn: "The Moon",
    number: "XVIII",
    category: "major",
    suit: null,
    uprightKeywords: ["幻觉", "恐惧", "潜意识", "不确定"],
    reversedKeywords: ["释放恐惧", "真相浮现", "走出迷雾", "清晰"],
    uprightMeaning: "月亮牌揭示了隐藏在表面之下的真相与幻觉。你可能正处于一段充满不确定性的时期，事情并非表面看到的那样。注意你的梦境和直觉信号，它们正在向你传递重要信息。不要被恐惧和焦虑所控制，耐心等待迷雾散去。",
    reversedMeaning: "逆位的月亮是积极的信号，暗示你正在走出迷雾，看清真相。那些曾经困扰你的恐惧和焦虑正在消散。你开始区分幻觉与现实，内心变得更加清晰和平静。继续信任你的直觉，真相正在显露。",
    symbol: "☾"
  },
  {
    id: 19,
    name: "太阳",
    nameEn: "The Sun",
    number: "XIX",
    category: "major",
    suit: null,
    uprightKeywords: ["喜悦", "成功", "活力", "光明"],
    reversedKeywords: ["暂时受阻", "过度乐观", "延迟的成功", "倦怠"],
    uprightMeaning: "太阳牌是整副塔罗中最积极的牌之一。它带来温暖、喜悦和成功的能量。一切都在朝着好的方向发展，你可以充满自信地前行。享受这段光明的时刻，分享你的快乐与活力。太阳照耀着你，让你的真我光芒绽放。",
    reversedMeaning: "逆位的太阳虽然减弱了一些光芒，但本质上仍是积极的。成功和快乐可能会有些延迟，或者你暂时感到缺乏活力。也许你对某些事过于乐观而忽略了潜在的问题。调整期望，但不要失去信心，好的结果终将到来。",
    symbol: "☀"
  },
  {
    id: 20,
    name: "审判",
    nameEn: "Judgement",
    number: "XX",
    category: "major",
    suit: null,
    uprightKeywords: ["觉醒", "重生", "使命", "内在召唤"],
    reversedKeywords: ["自我怀疑", "逃避使命", "内疚", "不愿改变"],
    uprightMeaning: "审判牌象征着灵魂层面的觉醒和内在召唤。你正被邀请回顾过去、审视现在、拥抱更高层次的自我。一个重要的人生转折点正在到来，倾听内心深处的声音，它正在引导你走向真正的使命。是时候从旧的自我中重生了。",
    reversedMeaning: "逆位的审判暗示你可能在逃避一个重要的内在召唤。过去的遗憾或内疚感阻碍了你的前进。你可能害怕做出重大改变，或者对自己的判断缺乏信心。学会原谅自己和他人，放下包袱才能迎接新生。",
    symbol: "⚜"
  },
  {
    id: 21,
    name: "世界",
    nameEn: "The World",
    number: "XXI",
    category: "major",
    suit: null,
    uprightKeywords: ["完成", "圆满", "成就", "整合"],
    reversedKeywords: ["未完成", "缺少收尾", "停滞不前", "空虚"],
    uprightMeaning: "世界牌代表一个重要周期的圆满完成。你已经走过了一段完整的旅程，获得了宝贵的经验与智慧。庆祝你的成就吧！同时准备好迎接下一个全新的循环。你已经整合了所有必要的教训，站在了一个更高的起点上。",
    reversedMeaning: "逆位的世界暗示你可能感到某件事尚未真正完成，或者在终点线前停了下来。也许你还没有完全整合这段经历带给你的教训。不要急于开始新的旅程，先给当前的事情画上一个完整的句号。",
    symbol: "◎"
  },

  // === 小阿尔卡纳 - 权杖 (Wands) ===
  {
    id: 22, name: "权杖王牌", nameEn: "Ace of Wands", number: "A", category: "minor", suit: "wands",
    uprightKeywords: ["灵感", "新机遇", "创造力", "潜力"], reversedKeywords: ["延迟", "缺乏方向", "创意受阻", "错失机会"],
    uprightMeaning: "权杖王牌代表一股全新的创造能量正在涌入你的生活。一个令人兴奋的新机遇或灵感即将到来，它将点燃你内心的热情。抓住这个火花，大胆地去追求你的愿景。现在是开始新项目、新冒险的绝佳时机。",
    reversedMeaning: "逆位的权杖王牌暗示你可能正经历创造力的枯竭或新项目的延迟。灵感似乎迟迟不来，或者你对新的开始感到犹豫不决。不要强迫自己，给灵感一些酝酿的时间，但也不要让恐惧阻止你前行。",
    symbol: "🜂"
  },
  {
    id: 23, name: "权杖二", nameEn: "Two of Wands", number: "2", category: "minor", suit: "wands",
    uprightKeywords: ["规划", "远见", "决策", "探索"], reversedKeywords: ["恐惧未知", "犹豫", "缺乏规划", "局限"],
    uprightMeaning: "权杖二表示你正站在十字路口，手握地图展望未来。你已经有了初步的成功，现在需要制定更宏大的计划。勇敢地走出舒适区，探索更广阔的可能性。世界在等待你的下一步行动。",
    reversedMeaning: "逆位的权杖二暗示你可能因恐惧未知而犹豫不前，或者缺乏清晰的长期规划。你可能把自己局限在了安全区域内。试着重新审视你的目标，制定一个可行的行动方案。",
    symbol: "🜂"
  },
  {
    id: 24, name: "权杖三", nameEn: "Three of Wands", number: "3", category: "minor", suit: "wands",
    uprightKeywords: ["展望", "扩展", "进展", "远见"], reversedKeywords: ["受阻", "延迟", "视野狭窄", "回报未至"],
    uprightMeaning: "权杖三象征着你的计划正在稳步推进，前方的道路一片光明。你的远见和努力开始显现成效。继续保持耐心和信心，更大的回报即将到来。这也是拓展视野、寻求更广阔发展空间的时候。",
    reversedMeaning: "逆位的权杖三暗示你的计划可能遇到了阻碍或延迟。预期的进展没有如期到来，让你感到沮丧。重新评估你的策略，也许需要调整方向或耐心等待更合适的时机。",
    symbol: "🜂"
  },
  {
    id: 25, name: "权杖四", nameEn: "Four of Wands", number: "4", category: "minor", suit: "wands",
    uprightKeywords: ["庆祝", "和谐", "团聚", "里程碑"], reversedKeywords: ["不稳定", "冲突", "过渡期", "缺少归属"],
    uprightMeaning: "权杖四带来庆祝与欢乐的能量。一个重要的里程碑已经达成，是时候与亲朋好友分享喜悦了。你的家庭和社交关系处于和谐的状态。享受这段稳定和幸福的时光，你值得这份快乐。",
    reversedMeaning: "逆位的权杖四暗示你可能在家庭或社交关系中感到不安定。某个预期的庆祝或团聚可能被推迟，或者你在寻找归属感方面遇到了困难。给自己时间来重建内心的安全感和稳定感。",
    symbol: "🜂"
  },
  {
    id: 26, name: "权杖五", nameEn: "Five of Wands", number: "5", category: "minor", suit: "wands",
    uprightKeywords: ["竞争", "冲突", "挑战", "多元意见"], reversedKeywords: ["回避冲突", "内在矛盾", "化解分歧", "妥协"],
    uprightMeaning: "权杖五代表竞争和挑战的出现。你可能正面临来自多方的压力或意见分歧。虽然冲突让人不舒服，但它也是成长和完善的催化剂。以建设性的态度面对分歧，将竞争转化为自我提升的动力。",
    reversedMeaning: "逆位的权杖五暗示冲突正在缓和，或者你在回避必要的对抗。内在的矛盾需要被正视和解决。也许是时候寻求妥协和共识，找到一个各方都能接受的解决方案。",
    symbol: "🜂"
  },
  {
    id: 27, name: "权杖六", nameEn: "Six of Wands", number: "6", category: "minor", suit: "wands",
    uprightKeywords: ["胜利", "认可", "自信", "公众赞誉"], reversedKeywords: ["失败", "缺乏认可", "自负", "私下成功"],
    uprightMeaning: "权杖六象征着胜利和公众的认可。你的努力终于得到了应有的回报和赞誉。自信地接受成功带来的荣耀，同时保持谦逊。你的领导力和成就正在激励着周围的人。",
    reversedMeaning: "逆位的权杖六暗示你可能没有得到期望中的认可，或者成功带来了过度的自负。外界的评价不应成为你唯一的动力。重新定义什么是真正的成功，学会从内心而非外界寻找肯定。",
    symbol: "🜂"
  },
  {
    id: 28, name: "权杖七", nameEn: "Seven of Wands", number: "7", category: "minor", suit: "wands",
    uprightKeywords: ["坚守", "防御", "坚持立场", "勇气"], reversedKeywords: ["退缩", "被压制", "放弃", "不堪重负"],
    uprightMeaning: "权杖七代表你正在坚守自己的立场，面对来自外界的挑战和质疑。虽然压力重重，但你有足够的勇气和能力捍卫自己的位置。不要退缩，坚持你相信的事情，胜利属于那些不轻言放弃的人。",
    reversedMeaning: "逆位的权杖七暗示你可能感到不堪重负，考虑放弃或退让。持续的压力让你身心俱疲。有时候战略性的撤退并不是软弱，而是为了更好地重新出发。评估哪些战斗值得坚持。",
    symbol: "🜂"
  },
  {
    id: 29, name: "权杖八", nameEn: "Eight of Wands", number: "8", category: "minor", suit: "wands",
    uprightKeywords: ["快速行动", "进展", "旅行", "信息"], reversedKeywords: ["延迟", "受阻", "仓促", "混乱"],
    uprightMeaning: "权杖八象征着事情正在飞速推进。障碍已经清除，能量畅通无阻。重要的消息、旅行机会或突破性进展即将到来。顺应这股高速前进的势能，抓住每一个机会。一切都在加速运转中。",
    reversedMeaning: "逆位的权杖八暗示进展受到了延迟或阻碍。你可能感到事情进展得太慢，或者相反，一切来得太快让你应接不暇。耐心等待正确的时机，不要因焦虑而做出仓促的决定。",
    symbol: "🜂"
  },
  {
    id: 30, name: "权杖九", nameEn: "Nine of Wands", number: "9", category: "minor", suit: "wands",
    uprightKeywords: ["坚韧", "毅力", "最后考验", "警惕"], reversedKeywords: ["疲惫", "放弃边缘", "偏执", "防御过度"],
    uprightMeaning: "权杖九代表你已经经历了许多考验，虽然疲惫但依然坚持。终点就在眼前，不要在最后一刻放弃。你的坚韧和毅力将帮助你度过这最后的挑战。保持警惕，汲取过去的经验教训来面对当下。",
    reversedMeaning: "逆位的权杖九暗示你可能已经到了精疲力竭的边缘。长期的战斗让你身心俱疲，你开始怀疑一切是否值得。允许自己休息一下，补充能量。有时候放下防备，接受帮助是更明智的选择。",
    symbol: "🜂"
  },
  {
    id: 31, name: "权杖十", nameEn: "Ten of Wands", number: "10", category: "minor", suit: "wands",
    uprightKeywords: ["重负", "责任", "压力", "过度承担"], reversedKeywords: ["释放", "委托", "减负", "崩溃"],
    uprightMeaning: "权杖十表示你正承受着过重的负担和责任。你可能同时处理太多事情，快要被压垮。虽然你的付出令人敬佩，但这种状态不可持续。学会分辨哪些是真正重要的，将不必要的重担放下或委托给他人。",
    reversedMeaning: "逆位的权杖十暗示你正在学会放下不必要的负担。也许你已经意识到不能一个人扛下所有事情，开始将任务委托给他人。这是一个积极的信号，继续简化你的生活，专注于最重要的事情。",
    symbol: "🜂"
  },
  {
    id: 32, name: "权杖侍从", nameEn: "Page of Wands", number: "侍从", category: "minor", suit: "wands",
    uprightKeywords: ["热情", "探索", "新想法", "好奇心"], reversedKeywords: ["缺乏方向", "三分钟热度", "受挫", "幼稚"],
    uprightMeaning: "权杖侍从代表一个充满热情和好奇心的新开始。一个令人兴奋的想法或机会正在向你招手。用孩子般的热忱和勇气去探索未知领域。不要害怕犯错，每一次尝试都是宝贵的学习经验。",
    reversedMeaning: "逆位的权杖侍从暗示你的热情可能很快消退，容易半途而废。你可能有很多想法但缺乏坚持到底的决心。集中精力，选择一两件真正让你热情燃烧的事情，全身心地投入其中。",
    symbol: "🜂"
  },
  {
    id: 33, name: "权杖骑士", nameEn: "Knight of Wands", number: "骑士", category: "minor", suit: "wands",
    uprightKeywords: ["冒险", "行动力", "热情", "大胆"], reversedKeywords: ["冲动", "鲁莽", "延迟", "缺乏耐心"],
    uprightMeaning: "权杖骑士象征着充沛的行动力和冒险精神。你现在精力充沛，准备好大胆追逐你的梦想。不要犹豫，带着热情和自信全力以赴。虽然前路充满未知，但你的勇气和决心会为你开辟道路。",
    reversedMeaning: "逆位的权杖骑士暗示你的行动可能过于冲动和鲁莽。在追求目标的过程中，你可能忽略了重要的细节或他人的感受。放慢脚步，在激情与深思熟虑之间找到平衡。",
    symbol: "🜂"
  },
  {
    id: 34, name: "权杖王后", nameEn: "Queen of Wands", number: "王后", category: "minor", suit: "wands",
    uprightKeywords: ["自信", "魅力", "温暖", "独立"], reversedKeywords: ["不安全感", "嫉妒", "自私", "控制欲"],
    uprightMeaning: "权杖王后代表着自信、温暖和强大的个人魅力。你正散发着吸引人的光芒，能够以积极的能量影响周围的人。相信自己的能力，大方地展现你的才华和热情。你的独立精神和创造力正在开花结果。",
    reversedMeaning: "逆位的权杖王后暗示你可能正被不安全感或嫉妒所困扰。你的自信可能暂时动摇，或者你试图通过控制他人来弥补内心的不足。重新连接你内在的力量之源，真正的自信来自自我接纳。",
    symbol: "🜂"
  },
  {
    id: 35, name: "权杖国王", nameEn: "King of Wands", number: "国王", category: "minor", suit: "wands",
    uprightKeywords: ["领导力", "远见", "企业家精神", "荣誉"], reversedKeywords: ["专横", "不切实际", "急躁", "傲慢"],
    uprightMeaning: "权杖国王象征着天生的领导力和企业家精神。你有能力将愿景转化为现实，带领他人走向成功。你的决断力和远见使你成为天然的领袖。大胆地承担领导角色，用你的热情和智慧激励身边的人。",
    reversedMeaning: "逆位的权杖国王暗示你的领导方式可能过于专横或不切实际。你可能期望过高，对他人和自己都过于苛刻。学会倾听和协作，真正伟大的领袖懂得谦逊与尊重他人的价值。",
    symbol: "🜂"
  },

  // === 小阿尔卡纳 - 圣杯 (Cups) ===
  {
    id: 36, name: "圣杯王牌", nameEn: "Ace of Cups", number: "A", category: "minor", suit: "cups",
    uprightKeywords: ["爱", "新感情", "直觉", "情感丰盈"], reversedKeywords: ["情感封闭", "空虚", "压抑情感", "失恋"],
    uprightMeaning: "圣杯王牌带来新的情感开始——也许是一段新的恋情、深刻的友谊或内在的情感觉醒。你的心正在打开，准备好接受和给予爱。让情感自由流动，不要害怕展示你柔软的一面。丰盈的爱正在流向你。",
    reversedMeaning: "逆位的圣杯王牌暗示你可能在情感上有所封闭。也许过去的伤痛让你不敢再次敞开心扉。情感的压抑会导致内心的空虚和孤立。试着慢慢地重新打开你的心，允许爱的能量再次流动。",
    symbol: "☽"
  },
  {
    id: 37, name: "圣杯二", nameEn: "Two of Cups", number: "2", category: "minor", suit: "cups",
    uprightKeywords: ["伙伴", "互吸", "联结", "平等关系"], reversedKeywords: ["不平衡", "分离", "误解", "关系破裂"],
    uprightMeaning: "圣杯二象征着两个人之间深刻的情感联结和相互吸引。这可能是浪漫关系、商业伙伴或深厚的友谊。在平等和尊重的基础上建立的联结将带来美好的合作与成长。珍惜这份难得的心灵共鸣。",
    reversedMeaning: "逆位的圣杯二暗示某段关系中可能出现了不平衡或误解。双方的付出不对等，或者沟通出现了障碍。需要双方共同努力来修复联结，坦诚地表达各自的需求和感受。",
    symbol: "☽"
  },
  {
    id: 38, name: "圣杯三", nameEn: "Three of Cups", number: "3", category: "minor", suit: "cups",
    uprightKeywords: ["友谊", "庆祝", "社交", "快乐"], reversedKeywords: ["孤立", "八卦", "过度放纵", "社交疲惫"],
    uprightMeaning: "圣杯三是友谊和庆祝的牌。你被关爱你的朋友所环绕，分享着快乐和感恩。这是一个享受社交活动、参加聚会和加强友谊的好时机。让喜悦自由流动，与他人共同创造美好的回忆。",
    reversedMeaning: "逆位的圣杯三暗示你可能在社交方面感到疲惫或孤立。朋友圈中可能存在八卦或不真诚的关系。审视你的社交圈，保留那些真正滋养你的友谊，远离消耗你能量的关系。",
    symbol: "☽"
  },
  {
    id: 39, name: "圣杯四", nameEn: "Four of Cups", number: "4", category: "minor", suit: "cups",
    uprightKeywords: ["冷漠", "不满", "沉思", "错失机会"], reversedKeywords: ["觉醒", "接受", "新视角", "走出低谷"],
    uprightMeaning: "圣杯四表示你可能对当前的生活感到不满或冷漠。你沉浸在自己的世界里，可能忽略了摆在面前的机会。停止聚焦于失去的和缺少的，打开眼睛看看宇宙正在给你的礼物。感恩和开放的心态会带来改变。",
    reversedMeaning: "逆位的圣杯四是一个积极的转变信号。你开始走出情感的低谷，重新对生活产生兴趣和动力。曾经被忽视的机会现在引起了你的注意。抓住这个觉醒的时刻，积极拥抱新的可能性。",
    symbol: "☽"
  },
  {
    id: 40, name: "圣杯五", nameEn: "Five of Cups", number: "5", category: "minor", suit: "cups",
    uprightKeywords: ["失落", "悲伤", "遗憾", "聚焦损失"], reversedKeywords: ["释怀", "接受", "向前看", "疗愈"],
    uprightMeaning: "圣杯五反映了失落和悲伤的情绪。你可能正在为失去的东西感到痛苦，沉浸在遗憾之中。允许自己悲伤是健康的，但也请记住，还有未被打翻的杯子在你身后。不要让悲伤蒙蔽了你对仍然拥有的美好事物的感知。",
    reversedMeaning: "逆位的圣杯五暗示你正在从悲伤中走出来，开始接受和释怀。你逐渐转移目光，看到了生活中仍然美好的部分。疗愈正在发生，虽然伤痕还在，但你已经准备好向前迈进了。",
    symbol: "☽"
  },
  {
    id: 41, name: "圣杯六", nameEn: "Six of Cups", number: "6", category: "minor", suit: "cups",
    uprightKeywords: ["怀旧", "童真", "回忆", "纯真的爱"], reversedKeywords: ["活在过去", "不成熟", "脱离现实", "放下过去"],
    uprightMeaning: "圣杯六带你回到温暖的回忆之中。你可能会重遇老朋友、回到故乡，或者在回忆中找到慰藉。这张牌提醒你珍惜纯真美好的时光，同时也鼓励你将那份童真和善良带入当下的生活之中。",
    reversedMeaning: "逆位的圣杯六暗示你可能过于沉溺在过去的回忆中，而忽略了当下和未来。怀旧是美好的，但如果它阻碍了你前进，就需要学会放下。活在当下，用过去的美好来激励而不是束缚你。",
    symbol: "☽"
  },
  {
    id: 42, name: "圣杯七", nameEn: "Seven of Cups", number: "7", category: "minor", suit: "cups",
    uprightKeywords: ["幻想", "选择", "白日梦", "诱惑"], reversedKeywords: ["清晰", "决断", "脚踏实地", "去除幻想"],
    uprightMeaning: "圣杯七展示了众多诱人的选择和幻想。你面前摆着许多可能性，但并非每一个都如表面看起来那样美好。在做决定之前，仔细辨别哪些是真实的机会，哪些只是海市蜃楼。让白日梦激发你的想象力，但行动要脚踏实地。",
    reversedMeaning: "逆位的圣杯七暗示你正在从幻想中清醒过来，开始脚踏实地地面对现实。你不再被不切实际的梦想所迷惑，能够做出更加清晰和务实的选择。这是一个积极的转变，继续保持这份清醒。",
    symbol: "☽"
  },
  {
    id: 43, name: "圣杯八", nameEn: "Eight of Cups", number: "8", category: "minor", suit: "cups",
    uprightKeywords: ["离开", "放下", "寻找更深意义", "转身"], reversedKeywords: ["害怕离开", "困顿", "逃避", "留恋"],
    uprightMeaning: "圣杯八代表着一个勇敢的决定——离开那些不再满足你的事物，去寻找更深层的意义和满足。虽然放下已有的一切需要极大的勇气，但你内心深知，继续停留只会带来更多的空虚。踏上寻找真正让你灵魂共鸣的旅程。",
    reversedMeaning: "逆位的圣杯八暗示你可能在该离开的时候选择了停留，或者害怕未知而迟迟不敢做出改变。你可能在逃避一个必要的告别。面对你内心的真实感受，有时候最好的选择就是转身离去。",
    symbol: "☽"
  },
  {
    id: 44, name: "圣杯九", nameEn: "Nine of Cups", number: "9", category: "minor", suit: "cups",
    uprightKeywords: ["愿望成真", "满足", "感恩", "幸福"], reversedKeywords: ["不满足", "贪婪", "物质主义", "空虚"],
    uprightMeaning: "圣杯九被称为「许愿牌」，象征着心愿的达成和深深的满足感。你正处于一个丰盈和幸福的阶段，大部分的愿望正在实现。享受这份满足，同时心怀感恩。你值得拥有这份快乐和丰盈。",
    reversedMeaning: "逆位的圣杯九暗示你可能在物质上得到了满足，但内心仍然感到空虚。外在的成功并不等同于内在的幸福。重新审视什么才是真正让你快乐的东西，也许你需要从物质追求转向精神层面的满足。",
    symbol: "☽"
  },
  {
    id: 45, name: "圣杯十", nameEn: "Ten of Cups", number: "10", category: "minor", suit: "cups",
    uprightKeywords: ["幸福", "家庭和谐", "圆满", "情感完满"], reversedKeywords: ["家庭矛盾", "不和谐", "破碎的梦", "价值观冲突"],
    uprightMeaning: "圣杯十是情感圆满和家庭幸福的象征。你正经历着最温暖的人际关系和最深层的情感满足。家庭和谐、爱情美满、友情深厚。感恩这份幸福，与你爱的人分享这份喜悦。这就是你一直追求的那个美好画面。",
    reversedMeaning: "逆位的圣杯十暗示理想中的家庭和谐可能出现了裂痕。家庭成员之间可能存在矛盾或价值观的冲突。完美的画面被现实打破了一些，但这并不意味着无法修复。以真诚和爱心来面对家庭中的挑战。",
    symbol: "☽"
  },
  {
    id: 46, name: "圣杯侍从", nameEn: "Page of Cups", number: "侍从", category: "minor", suit: "cups",
    uprightKeywords: ["敏感", "直觉", "创意", "情感消息"], reversedKeywords: ["情绪化", "不成熟", "逃避", "创意受阻"],
    uprightMeaning: "圣杯侍从带来情感上的新消息或创意灵感。你正处于一个情感敏感和直觉增强的时期。倾听内心的声音，让想象力自由飞翔。一个意想不到的情感机会或创意灵感即将降临，保持开放和接受的心态。",
    reversedMeaning: "逆位的圣杯侍从暗示你可能过于情绪化或在情感上不够成熟。你可能用幻想来逃避现实中的情感问题。学会以更成熟的方式处理自己的情感，不要让情绪完全主导你的决定。",
    symbol: "☽"
  },
  {
    id: 47, name: "圣杯骑士", nameEn: "Knight of Cups", number: "骑士", category: "minor", suit: "cups",
    uprightKeywords: ["浪漫", "追求", "理想主义", "魅力"], reversedKeywords: ["不切实际", "情感操控", "失望", "虚假承诺"],
    uprightMeaning: "圣杯骑士象征着浪漫的追求和理想化的爱情。一个充满魅力的提议或浪漫的邂逅可能正在到来。跟随你的心，但也不要完全忽略理性。将你的梦想和热情化为实际的行动，追求你心中的理想。",
    reversedMeaning: "逆位的圣杯骑士暗示可能存在不切实际的期望或虚假的情感承诺。有人可能在用甜言蜜语来操控你，或者你自己也在对某段关系过度理想化。保持清醒，分辨真实与幻想之间的界限。",
    symbol: "☽"
  },
  {
    id: 48, name: "圣杯王后", nameEn: "Queen of Cups", number: "王后", category: "minor", suit: "cups",
    uprightKeywords: ["同理心", "关怀", "情感智慧", "直觉"], reversedKeywords: ["情感不稳", "过度付出", "依赖", "界限模糊"],
    uprightMeaning: "圣杯王后代表着深沉的同理心和情感智慧。你拥有理解他人感受的天赋，是朋友和家人心中的倾听者和治愈者。信任你的直觉，它正在引导你走向正确的方向。在关爱他人的同时，也别忘了照顾自己的情感需求。",
    reversedMeaning: "逆位的圣杯王后暗示你可能在情感上过度付出或依赖他人。你的界限变得模糊，别人的情绪影响了你自己的稳定。学会设定健康的情感界限，在关爱他人和保护自己之间找到平衡。",
    symbol: "☽"
  },
  {
    id: 49, name: "圣杯国王", nameEn: "King of Cups", number: "国王", category: "minor", suit: "cups",
    uprightKeywords: ["情感成熟", "平衡", "外交", "智慧"], reversedKeywords: ["情感压抑", "操控", "冷漠", "情绪波动"],
    uprightMeaning: "圣杯国王象征着情感的成熟和平衡。你能够在感性和理性之间自如切换，以智慧和外交手腕处理复杂的人际关系。你的情感稳定性让你成为他人信赖的对象。继续保持这种优雅的平衡感。",
    reversedMeaning: "逆位的圣杯国王暗示你可能在压抑自己的情感，或者用操控的方式来处理关系。表面的冷静下可能隐藏着内心的波澜。允许自己真实地感受和表达情感，真正的成熟不是压抑而是接纳。",
    symbol: "☽"
  },

  // === 小阿尔卡纳 - 宝剑 (Swords) ===
  {
    id: 50, name: "宝剑王牌", nameEn: "Ace of Swords", number: "A", category: "minor", suit: "swords",
    uprightKeywords: ["清晰", "真理", "突破", "新思维"], reversedKeywords: ["混乱", "误解", "信息不足", "思维受阻"],
    uprightMeaning: "宝剑王牌代表思维上的重大突破。一个全新的洞见或真理正在显现，为你带来前所未有的清晰感。现在是做出理性决策、切断混乱的最佳时机。用这把锋利的思维之剑，斩断一切障碍和谎言。",
    reversedMeaning: "逆位的宝剑王牌暗示你的思维可能处于混乱状态，难以做出清晰的判断。信息可能是不完整或被误解的。在做重要决定之前，先花时间收集更多信息，理清思路。",
    symbol: "⚔"
  },
  {
    id: 51, name: "宝剑二", nameEn: "Two of Swords", number: "2", category: "minor", suit: "swords",
    uprightKeywords: ["犹豫", "僵局", "两难", "回避"], reversedKeywords: ["做出决定", "信息浮现", "困境解除", "面对真相"],
    uprightMeaning: "宝剑二代表你正面临一个两难的抉择，内心处于僵持状态。你可能在有意回避一个需要面对的决定。但逃避不会让问题消失。试着放下恐惧，打开蒙住的双眼，让直觉和理性共同引导你做出选择。",
    reversedMeaning: "逆位的宝剑二暗示僵局正在被打破，新的信息或视角出现了。你终于准备好面对一直在回避的决定。虽然这可能不轻松，但做出选择会让你从纠结中解脱出来。",
    symbol: "⚔"
  },
  {
    id: 52, name: "宝剑三", nameEn: "Three of Swords", number: "3", category: "minor", suit: "swords",
    uprightKeywords: ["心碎", "悲痛", "痛苦", "分离"], reversedKeywords: ["疗愈", "释放悲伤", "原谅", "走出伤痛"],
    uprightMeaning: "宝剑三是心碎和情感痛苦的象征。你可能正在经历一段痛苦的分离、背叛或深深的失望。虽然这份痛苦令人难以承受，但它也是一个必经的净化过程。允许自己悲伤，但不要让痛苦成为永久的牢笼。",
    reversedMeaning: "逆位的宝剑三暗示你正从心碎中慢慢恢复。伤痛还在，但你已经开始疗愈和原谅的过程。释放悲伤不代表忘记，而是选择不再让它定义你的生活。你比你想象的更坚强。",
    symbol: "⚔"
  },
  {
    id: 53, name: "宝剑四", nameEn: "Four of Swords", number: "4", category: "minor", suit: "swords",
    uprightKeywords: ["休息", "恢复", "冥想", "退隐"], reversedKeywords: ["焦虑", "倦怠", "强迫行动", "无法放松"],
    uprightMeaning: "宝剑四呼吁你暂停一切，给自己充分的休息和恢复时间。你的身心都需要一段安静的疗愈期。通过冥想、睡眠和退隐来重新充电。这不是懒惰，而是为下一次出发积蓄能量的必要准备。",
    reversedMeaning: "逆位的宝剑四暗示你可能在该休息的时候强迫自己继续行动，或者即使休息也无法真正放松。持续的焦虑和忙碌正在消耗你。学会真正地放下和休息，你的身体和心灵都在向你发出信号。",
    symbol: "⚔"
  },
  {
    id: 54, name: "宝剑五", nameEn: "Five of Swords", number: "5", category: "minor", suit: "swords",
    uprightKeywords: ["冲突", "失败", "自私", "不光彩的胜利"], reversedKeywords: ["和解", "认错", "放下", "吸取教训"],
    uprightMeaning: "宝剑五代表冲突和不光彩的胜利。即使你赢了争论，也可能失去了更重要的东西——关系、尊重或内心的平静。审视一下你追求的胜利是否值得。有时候选择退让比赢得战斗更需要智慧和勇气。",
    reversedMeaning: "逆位的宝剑五暗示冲突正在化解，或者你已经从过去的争执中吸取了教训。你可能准备好道歉、和解或放下不必要的争斗。选择和平和理解，而不是继续战斗。",
    symbol: "⚔"
  },
  {
    id: 55, name: "宝剑六", nameEn: "Six of Swords", number: "6", category: "minor", suit: "swords",
    uprightKeywords: ["过渡", "远离困境", "疗愈之旅", "改变"], reversedKeywords: ["困在过去", "无法前进", "抗拒改变", "旧伤复发"],
    uprightMeaning: "宝剑六象征着从困难时期走向平静的过渡。虽然过去的伤痛还在，但你正在稳步地远离风暴。接受帮助，允许他人陪伴你度过这段旅程。前方的水域会更加平静，耐心和信心是你最好的伙伴。",
    reversedMeaning: "逆位的宝剑六暗示你可能困在过去的伤痛中无法前行。虽然你知道需要改变，但内心的某些部分在抗拒离开。也许你需要更多的时间来准备，或者寻求专业的帮助来完成这个过渡。",
    symbol: "⚔"
  },
  {
    id: 56, name: "宝剑七", nameEn: "Seven of Swords", number: "7", category: "minor", suit: "swords",
    uprightKeywords: ["策略", "隐瞒", "独立行动", "谨慎"], reversedKeywords: ["暴露", "坦白", "良心不安", "被揭穿"],
    uprightMeaning: "宝剑七暗示需要策略性地行动。你可能需要独自完成某件事，或者在行动中保持一定的隐蔽。但要注意区分智慧的策略和不诚实的欺骗。确保你的行为不会伤害他人或违背自己的良心。有时候聪明的退路比正面冲突更明智。",
    reversedMeaning: "逆位的宝剑七暗示隐藏的事情即将被揭露。如果你一直在隐瞒什么，现在可能是坦白的时候。与其等待被揭穿，不如主动说出真相。诚实虽然艰难，但终究比谎言带来更大的解脱。",
    symbol: "⚔"
  },
  {
    id: 57, name: "宝剑八", nameEn: "Eight of Swords", number: "8", category: "minor", suit: "swords",
    uprightKeywords: ["困境", "自我限制", "无力感", "恐惧"], reversedKeywords: ["解脱", "新视角", "自我释放", "重获力量"],
    uprightMeaning: "宝剑八代表一种被困住的感觉，但仔细看，你的束缚其实是可以挣脱的。你可能被自己的恐惧和消极思维所困住，而不是真正的外在障碍。改变你的思维方式，你就能看到一直存在的出路。你比自己以为的更自由。",
    reversedMeaning: "逆位的宝剑八暗示你正在从自我设限的牢笼中走出来。你开始看清那些束缚你的想法只是幻觉。重获力量和自由的感觉正在回归。继续挑战那些限制性的信念，你的世界会越来越开阔。",
    symbol: "⚔"
  },
  {
    id: 58, name: "宝剑九", nameEn: "Nine of Swords", number: "9", category: "minor", suit: "swords",
    uprightKeywords: ["焦虑", "噩梦", "绝望", "深夜忧虑"], reversedKeywords: ["释放焦虑", "寻求帮助", "内心平静", "最坏已过"],
    uprightMeaning: "宝剑九反映了深夜的焦虑和恐惧。你可能被担忧和负面思维折磨，失眠或噩梦困扰着你。但请记住，很多时候我们恐惧的事情并不会真正发生。寻求支持，与他人分享你的忧虑，不要独自承受这份痛苦。",
    reversedMeaning: "逆位的宝剑九暗示你正在从焦虑和恐惧中恢复。最糟糕的时刻已经过去，你开始意识到情况并没有你想象的那么可怕。寻求心理健康支持是明智的选择，你值得拥有内心的平静。",
    symbol: "⚔"
  },
  {
    id: 59, name: "宝剑十", nameEn: "Ten of Swords", number: "10", category: "minor", suit: "swords",
    uprightKeywords: ["终结", "触底", "痛苦的结局", "新黎明"], reversedKeywords: ["恢复", "抗拒结束", "最低点已过", "重建"],
    uprightMeaning: "宝剑十虽然看起来沉重，但它代表的是触底反弹。最痛苦的时刻即将过去，因为事情不可能比现在更糟了。黎明就在最黑暗之后到来。接受这个结局，释放所有的痛苦，准备好迎接全新的开始。",
    reversedMeaning: "逆位的宝剑十暗示你正在从一段极其困难的时期中慢慢恢复。最低点已经过去了，虽然恢复的过程缓慢而艰辛。你正在重建自己的生活和信心。耐心一些，每一天都在变好。",
    symbol: "⚔"
  },
  {
    id: 60, name: "宝剑侍从", nameEn: "Page of Swords", number: "侍从", category: "minor", suit: "swords",
    uprightKeywords: ["好奇", "机敏", "新想法", "求知欲"], reversedKeywords: ["八卦", "尖刻", "缺乏深度", "轻率"],
    uprightMeaning: "宝剑侍从代表着旺盛的好奇心和敏锐的思维。你正对某个领域产生强烈的求知欲，渴望学习和探索新的知识。保持这份机敏和热情，但也要学会深入思考而不仅仅停留在表面。新的信息和消息即将到来。",
    reversedMeaning: "逆位的宝剑侍从暗示你可能在使用言语时不够谨慎，容易卷入八卦或尖刻的评论中。你的好奇心可能过于表面，缺乏深度的思考。在说话之前多想想，言语一旦说出就无法收回。",
    symbol: "⚔"
  },
  {
    id: 61, name: "宝剑骑士", nameEn: "Knight of Swords", number: "骑士", category: "minor", suit: "swords",
    uprightKeywords: ["果断", "直接", "快速思维", "雄心"], reversedKeywords: ["冲动", "攻击性", "不顾后果", "混乱"],
    uprightMeaning: "宝剑骑士象征着以极快的速度和坚定的决心追求目标。你的思维敏捷，行动果断。现在是大胆出击、直面挑战的时候。但也要注意不要在速度中失去了判断力。快速而精准地行动，才能赢得胜利。",
    reversedMeaning: "逆位的宝剑骑士暗示你的行动可能过于冲动和攻击性。在急于达成目标的过程中，你可能伤害了他人或忽略了重要的细节。放慢速度，在行动之前多做一些思考和规划。",
    symbol: "⚔"
  },
  {
    id: 62, name: "宝剑王后", nameEn: "Queen of Swords", number: "王后", category: "minor", suit: "swords",
    uprightKeywords: ["理性", "独立", "洞察力", "直言不讳"], reversedKeywords: ["冷酷", "偏见", "尖酸", "情感隔离"],
    uprightMeaning: "宝剑王后代表清晰的思维和独立的判断力。你能够以理性和客观的态度分析情况，不被情绪所左右。你的洞察力让你能够看透事物的本质。坚持你的原则，以诚实和公正的态度面对一切。",
    reversedMeaning: "逆位的宝剑王后暗示你可能过于冷酷或苛刻，将理性推向了冷漠的极端。你的直言不讳可能伤害了他人的感受。试着在保持清晰思维的同时，加入一些温暖和同理心。",
    symbol: "⚔"
  },
  {
    id: 63, name: "宝剑国王", nameEn: "King of Swords", number: "国王", category: "minor", suit: "swords",
    uprightKeywords: ["权威", "真理", "纪律", "公正判断"], reversedKeywords: ["暴政", "操控", "冷酷无情", "滥用权力"],
    uprightMeaning: "宝剑国王象征着以真理和公正为基础的权威。你有能力做出公平合理的判断，用清晰的逻辑和坚定的原则来指导他人。你的话语有分量，你的决策基于事实和道德。以智慧和公正来行使你的权力。",
    reversedMeaning: "逆位的宝剑国王暗示权力可能被滥用或变成了暴政。你或你身边的某人可能在用理性来操控他人，或者用冷酷无情的方式对待周围的人。真正的力量不需要通过压迫来体现。",
    symbol: "⚔"
  },

  // === 小阿尔卡纳 - 星币 (Pentacles) ===
  {
    id: 64, name: "星币王牌", nameEn: "Ace of Pentacles", number: "A", category: "minor", suit: "pentacles",
    uprightKeywords: ["新机会", "财富", "稳定", "物质基础"], reversedKeywords: ["错失机会", "财务问题", "规划不周", "贪婪"],
    uprightMeaning: "星币王牌带来物质层面的新机遇——可能是一份新工作、一笔投资或财务上的好消息。这是为未来打下坚实基础的好时机。脚踏实地地规划和行动，将这颗种子培育成丰硕的果实。财富和稳定正在向你靠近。",
    reversedMeaning: "逆位的星币王牌暗示你可能错过了一个财务或物质上的好机会，或者在金钱管理方面出了问题。也许你的规划不够周全，或者过于关注物质而忽略了其他重要的方面。重新审视你的财务状况和优先次序。",
    symbol: "⬠"
  },
  {
    id: 65, name: "星币二", nameEn: "Two of Pentacles", number: "2", category: "minor", suit: "pentacles",
    uprightKeywords: ["平衡", "灵活", "多任务", "时间管理"], reversedKeywords: ["失衡", "混乱", "难以兼顾", "财务压力"],
    uprightMeaning: "星币二象征着在多个任务和责任之间灵活平衡。你正在同时处理生活中的多个方面，虽然有些忙碌，但你有能力保持一切运转顺畅。灵活应对变化，调整优先级，享受这种动态的平衡状态。",
    reversedMeaning: "逆位的星币二暗示你可能难以兼顾生活中的各个方面。事情变得混乱，你感到不堪重负。也许你承担了太多，需要放下一些不那么重要的事情。简化你的生活，专注于最关键的优先事项。",
    symbol: "⬠"
  },
  {
    id: 66, name: "星币三", nameEn: "Three of Pentacles", number: "3", category: "minor", suit: "pentacles",
    uprightKeywords: ["团队合作", "技能", "学习", "高质量"], reversedKeywords: ["缺乏协作", "平庸", "不被认可", "动力不足"],
    uprightMeaning: "星币三代表团队合作和专业技能的运用。你的才能正在得到他人的认可和赏识。这是与他人协作、共同创造高质量成果的好时机。继续精进你的技艺，在团队中发挥你独特的价值。合作将带来比独自行动更大的成就。",
    reversedMeaning: "逆位的星币三暗示团队协作可能出现了问题，或者你的工作没有得到应有的认可。你可能缺乏提升技能的动力，或者工作质量有所下降。重新投入热情，与同伴沟通，找回合作的节奏。",
    symbol: "⬠"
  },
  {
    id: 67, name: "星币四", nameEn: "Four of Pentacles", number: "4", category: "minor", suit: "pentacles",
    uprightKeywords: ["安全感", "控制", "保守", "守财"], reversedKeywords: ["慷慨", "释放控制", "过度消费", "财务不安"],
    uprightMeaning: "星币四反映了对安全感和控制的强烈需求。你可能紧紧守护着自己的财富和资源，害怕失去已有的一切。适度的谨慎是明智的，但过度的守护会让你错过分享和成长的机会。找到安全与开放之间的平衡点。",
    reversedMeaning: "逆位的星币四暗示你正在学会放手——也许是过度控制的心态，也许是不必要的物质执着。你开始更加慷慨地与他人分享，或者相反，你可能在过度消费导致财务不安。找到健康的金钱观。",
    symbol: "⬠"
  },
  {
    id: 68, name: "星币五", nameEn: "Five of Pentacles", number: "5", category: "minor", suit: "pentacles",
    uprightKeywords: ["困难", "贫困", "孤立", "健康问题"], reversedKeywords: ["恢复", "寻求帮助", "精神富足", "度过难关"],
    uprightMeaning: "星币五代表物质或精神上的困难时期。你可能正面临财务压力、健康问题或深深的孤立感。但请注意，帮助可能就在你身边，只是你还没有注意到。不要因为骄傲或羞耻而拒绝向他人求助。这段困难终会过去。",
    reversedMeaning: "逆位的星币五暗示你正在走出困境，情况开始好转。你可能找到了新的财务来源，或者终于接受了他人的帮助。虽然还不是完全的复苏，但最艰难的阶段已经过去。继续坚持，光明就在前方。",
    symbol: "⬠"
  },
  {
    id: 69, name: "星币六", nameEn: "Six of Pentacles", number: "6", category: "minor", suit: "pentacles",
    uprightKeywords: ["慷慨", "施与受", "公平", "分享"], reversedKeywords: ["不平等", "附带条件", "自私", "施恩图报"],
    uprightMeaning: "星币六象征着慷慨的给予和感恩的接受。你可能正处于给予他人帮助的位置，或者正在接受来自他人的善意。分享你的资源和时间，因为给予的同时你也在接受。保持施与受的平衡，让善意在人与人之间流动。",
    reversedMeaning: "逆位的星币六暗示施与受之间可能存在不平衡。也许帮助附带了隐含的条件，或者你在接受帮助时感到不舒服。审视你的人际关系中是否存在不平等的权力动态，确保给予和接受都是出于真心。",
    symbol: "⬠"
  },
  {
    id: 70, name: "星币七", nameEn: "Seven of Pentacles", number: "7", category: "minor", suit: "pentacles",
    uprightKeywords: ["耐心", "收获", "评估", "长期投资"], reversedKeywords: ["急功近利", "浪费", "收效甚微", "迷茫"],
    uprightMeaning: "星币七代表着耐心等待和评估成果的时刻。你已经付出了大量的努力，现在是停下来看看成效的时候。有些成果需要时间来成熟。继续保持耐心，你的长期投资终将带来丰厚的回报。相信过程，信任时间。",
    reversedMeaning: "逆位的星币七暗示你可能因为急于看到结果而感到挫败。你的努力似乎没有得到期望中的回报。重新评估你的方向和方法，也许需要调整策略或降低短期期望。成长有时是看不见的。",
    symbol: "⬠"
  },
  {
    id: 71, name: "星币八", nameEn: "Eight of Pentacles", number: "8", category: "minor", suit: "pentacles",
    uprightKeywords: ["勤奋", "精益求精", "学习", "专注"], reversedKeywords: ["完美主义", "缺乏热情", "敷衍了事", "重复"],
    uprightMeaning: "星币八象征着勤奋和对技艺的精益求精。你正处于一个学习和提升技能的重要阶段。专注于每一个细节，用匠人的精神来对待你的工作。持续的练习和投入将让你成为领域中的专家。享受这个磨练的过程。",
    reversedMeaning: "逆位的星币八暗示你可能对工作失去了热情，开始敷衍了事。或者相反，你陷入了完美主义的陷阱，无法前进。找回对工作的初心和热爱，同时接受「足够好」有时候就是最好的。",
    symbol: "⬠"
  },
  {
    id: 72, name: "星币九", nameEn: "Nine of Pentacles", number: "9", category: "minor", suit: "pentacles",
    uprightKeywords: ["富足", "独立", "自给自足", "优雅"], reversedKeywords: ["过度依赖", "财务挫折", "缺乏安全感", "虚荣"],
    uprightMeaning: "星币九代表通过自己的努力获得的富足和独立。你可以自豪地享受你创造的美好生活——这一切都是你辛勤工作的成果。以优雅和感恩的态度享受物质上的充裕，同时继续保持你的独立和自信。你已经证明了自己的价值。",
    reversedMeaning: "逆位的星币九暗示你可能在财务上遇到了挫折，或者你的安全感过于依赖物质条件。也许你在用外在的奢华来掩饰内心的不安。真正的富足来自内心的安宁和自我价值感，而不仅仅是银行账户的数字。",
    symbol: "⬠"
  },
  {
    id: 73, name: "星币十", nameEn: "Ten of Pentacles", number: "10", category: "minor", suit: "pentacles",
    uprightKeywords: ["财富传承", "家族", "长期成就", "稳固基础"], reversedKeywords: ["家族矛盾", "财务纠纷", "短视", "不稳定"],
    uprightMeaning: "星币十象征着长期的成就和世代的财富传承。你正建立的不仅是个人的成功，更是能够惠及家人和后代的持久基业。家庭的支持和传统给你带来了力量和安全感。珍惜这份世代积累的智慧和资源。",
    reversedMeaning: "逆位的星币十暗示家族中可能存在财务纠纷或价值观的冲突。你可能过于关注短期利益而忽视了长期的建设。也许是时候重新审视你与家族、传统和金钱之间的关系，找到一个更健康的平衡。",
    symbol: "⬠"
  },
  {
    id: 74, name: "星币侍从", nameEn: "Page of Pentacles", number: "侍从", category: "minor", suit: "pentacles",
    uprightKeywords: ["学习", "新技能", "务实", "机遇"], reversedKeywords: ["缺乏进展", "懒惰", "不切实际", "错失学习机会"],
    uprightMeaning: "星币侍从代表着一个务实的新开始——也许是学习新技能、开始新工作或启动一个有潜力的项目。带着认真和专注的态度去拥抱这个机会。脚踏实地地行动，将你的想法一步步变为现实。机遇眷顾那些有准备的人。",
    reversedMeaning: "逆位的星币侍从暗示你可能缺乏将想法付诸行动的动力，或者对新机会不够重视。也许你的目标不够切合实际，或者你在拖延一个重要的学习机会。重新激发你的动力，用行动来证明你的决心。",
    symbol: "⬠"
  },
  {
    id: 75, name: "星币骑士", nameEn: "Knight of Pentacles", number: "骑士", category: "minor", suit: "pentacles",
    uprightKeywords: ["坚持", "可靠", "勤勉", "稳步前进"], reversedKeywords: ["固执", "停滞", "无聊", "过度保守"],
    uprightMeaning: "星币骑士象征着稳定、可靠和持之以恒的努力。你可能不是走得最快的那个人，但你是最终能到达目的地的人。以坚定而稳健的步伐前进，不要被短期的诱惑或挫折所动摇。你的勤勉和忠诚将得到丰厚的回报。",
    reversedMeaning: "逆位的星币骑士暗示你可能陷入了固执和停滞的状态。过度的保守和对安全感的执着让你错过了需要灵活应对的时刻。有时候你需要打破常规，尝试一些新的方法来重新激发你的前进动力。",
    symbol: "⬠"
  },
  {
    id: 76, name: "星币王后", nameEn: "Queen of Pentacles", number: "王后", category: "minor", suit: "pentacles",
    uprightKeywords: ["滋养", "务实", "安全感", "家庭"], reversedKeywords: ["忽视家庭", "物质依赖", "不平衡", "过度操心"],
    uprightMeaning: "星币王后代表着温暖的滋养和务实的关怀。你有能力创造一个舒适、安全和充满爱的环境。你善于理财，也善于照顾他人的身心需求。在追求物质稳定的同时，你不忘关注生活中温馨和温暖的一面。",
    reversedMeaning: "逆位的星币王后暗示你可能在工作和家庭之间失去了平衡。你可能过度关注物质层面而忽略了情感需求，或者过度操心他人而疏忽了自己。重新找到照顾自己和照顾他人之间的平衡点。",
    symbol: "⬠"
  },
  {
    id: 77, name: "星币国王", nameEn: "King of Pentacles", number: "国王", category: "minor", suit: "pentacles",
    uprightKeywords: ["成功", "富裕", "稳重", "商业头脑"], reversedKeywords: ["贪婪", "物质主义", "固执", "财务管理不善"],
    uprightMeaning: "星币国王象征着通过努力和智慧获得的物质成功与稳定。你拥有出色的商业头脑和管理财富的能力。你的稳重和可靠让你成为他人信赖的依靠。继续以负责任和慷慨的态度管理你的资源，你的成功将惠及更多的人。",
    reversedMeaning: "逆位的星币国王暗示你可能过于关注金钱和物质，成为了贪婪或物质主义的俘虏。也许你的财务管理出了问题，或者你变得过于固执和保守。重新审视财富对你的真正意义，记住金钱是服务生活的工具而非目的。",
    symbol: "⬠"
  }
];

export const suitInfo = {
  wands: { name: "权杖", nameEn: "Wands", element: "火", color: "#C17F59" },
  cups: { name: "圣杯", nameEn: "Cups", element: "水", color: "#7B9EBF" },
  swords: { name: "宝剑", nameEn: "Swords", element: "风", color: "#A8A8A8" },
  pentacles: { name: "星币", nameEn: "Pentacles", element: "土", color: "#B8A88A" }
};

const _majorNames = [
  "愚人","魔法师","女祭司","皇后","皇帝",
  "教皇","恋人","战车","力量","隐士",
  "命运之轮","正义","倒吊人","死神","节制",
  "恶魔","高塔","星星","月亮","太阳",
  "审判","世界"
];
const _suitCn = { wands:"权杖", cups:"圣杯", swords:"宝剑", pentacles:"星币" };
const _courtTitle = { "侍从":"侍从", "骑士":"骑士", "王后":"皇后", "国王":"皇帝" };

tarotCards.forEach(card => {
  if (card.category === "major") {
    card.image = `/cards/Tarot-${card.id}${_majorNames[card.id]}.jpg`;
  } else {
    const suit = _suitCn[card.suit];
    if (card.number === "A") {
      card.image = `/cards/Tarot-${suit}1皇牌.jpg`;
    } else if (_courtTitle[card.number]) {
      card.image = `/cards/Tarot-${suit}${_courtTitle[card.number]}.jpg`;
    } else {
      card.image = `/cards/Tarot-${suit}${card.number}.jpg`;
    }
  }
});
