/**
 * 나와 닮은 소울 푸드 - 데이터 정의 및 16가지 음식 사전
 */

const questions = [
  {
    id: 1,
    title: "주말 아침, 눈을 떴을 때 당신의 첫 번째 행동은?",
    category: "에너지 & 루틴",
    icon: "🌅",
    options: [
      { text: "침대에서 뒹굴거리며 유튜브나 책을 보며 혼자만의 정적을 만끽한다.", score: { I: 1, P: 1 } },
      { text: "단톡방에 \"오늘 번개 할 사람?\" 카톡을 띄우거나 약속을 잡는다.", score: { E: 1, P: 1 } },
      { text: "미리 계획해둔 주말 루틴(청소, 운동, 공부)을 하나씩 실행한다.", score: { I: 1, J: 1 } },
      { text: "오늘 참여하기로 한 동호회나 지인 모임 준비를 위해 일찍 일어난다.", score: { E: 1, J: 1 } }
    ]
  },
  {
    id: 2,
    title: "오랜만에 친구들과 맛집을 정해야 할 때 나의 스타일은?",
    category: "경험 & 탐색",
    icon: "🍽️",
    options: [
      { text: "평점이 검증되고 내가 이미 가봐서 실패 없는 안전한 맛집 추천.", score: { S: 1, J: 1 } },
      { text: "SNS에서 핫한 곳을 3~4군데 찾아두고, 당일 줄 상황에 따라 결정.", score: { S: 1, P: 1 } },
      { text: "\"이런 독특한 콘셉트의 가게가 있대!\" 신메뉴나 이색 식당 탐색.", score: { N: 1, P: 1 } },
      { text: "동선, 주차, 예약 가능 여부, 후기별 장단점을 꼼꼼히 정리해 투표에 부친다.", score: { N: 1, J: 1 } }
    ]
  },
  {
    id: 3,
    title: "친구가 \"나 오늘 회사에서 부장님한테 한소리 들었어...\"라며 울상일 때?",
    category: "공감 & 사고",
    icon: "💬",
    options: [
      { text: "\"어쩌다가? 무슨 일 때문에 혼났는데?\" (원인 파악 우선)", score: { T: 1, S: 1 } },
      { text: "\"헐 진짜 속상했겠다... 오늘 맛있는 거 먹으러 가자!\" (기분 공감 우선)", score: { F: 1, S: 1 } },
      { text: "\"그 부장님 왜 그러신대? 다음엔 이렇게 대처해보는 건 어때?\" (대안 제시)", score: { T: 1, N: 1 } },
      { text: "\"네가 얼마나 고생했는지 아는데 진짜 너무하다...\" (전폭적인 내 편 들기)", score: { F: 1, N: 1 } }
    ]
  },
  {
    id: 4,
    title: "퇴근/하교 후, 완전히 방전된 당신을 가장 빠르게 충전하는 방법은?",
    category: "충전 & 휴식",
    icon: "🔋",
    options: [
      { text: "암막 커튼 치고 조용히 배달 음식 먹으며 넷플릭스 보기.", score: { I: 1, S: 1 } },
      { text: "친한 친구를 불러내 맥주 한잔하며 수다로 스트레스 털어내기.", score: { E: 1, S: 1 } },
      { text: "조용한 카페나 산책로를 걸으며 혼자 생각 정리하기.", score: { I: 1, N: 1 } },
      { text: "사람 많은 번화가나 핫플레이스를 걸으며 활기찬 분위기 느끼기.", score: { E: 1, N: 1 } }
    ]
  },
  {
    id: 5,
    title: "낯선 여행지에 도착했을 때 당신의 행동 양식은?",
    category: "여행 & 계획",
    icon: "✈️",
    options: [
      { text: "분 단위까지는 아니더라도, 시간대별 일정과 동선대로 움직인다.", score: { J: 1, S: 1 } },
      { text: "목적지만 대략 정해두고 발길 닿는 골목골목을 즉흥적으로 탐방한다.", score: { P: 1, N: 1 } },
      { text: "유명 관광지 랜드마크를 순서대로 인증하며 효율적으로 이동한다.", score: { J: 1, T: 1 } },
      { text: "현지에서 만난 사람들의 추천이나 그날의 감정에 따라 일정을 바꾼다.", score: { P: 1, F: 1 } }
    ]
  },
  {
    id: 6,
    title: "요리나 작업을 할 때 조리법(가이드라인)을 대하는 태도는?",
    category: "방식 & 프로세스",
    icon: "🍳",
    options: [
      { text: "정량과 타이머를 엄격히 지키며 안내된 순서대로 진행한다.", score: { S: 1, J: 1 } },
      { text: "대략적인 틀만 보고 \"이 정도면 되겠지\" 감으로 조절하며 만든다.", score: { S: 1, P: 1 } },
      { text: "\"이 재료 대신 다른 걸 넣으면 어떨까?\" 독창적인 변주를 시도한다.", score: { N: 1, P: 1 } },
      { text: "기존 방식의 비효율적인 단계를 개선해 나만의 최적화된 프로세스를 만든다.", score: { N: 1, J: 1 } }
    ]
  },
  {
    id: 7,
    title: "단체 모임이나 대화 도중 어색한 침묵이 흘렀을 때?",
    category: "대인 관계 & 소통",
    icon: "🤫",
    options: [
      { text: "'누가 말하겠지' 생각하며 침묵을 크게 불편해하지 않고 지켜본다.", score: { I: 1, T: 1 } },
      { text: "어색함을 깨기 위해 재미있는 질문이나 화제를 적극적으로 던진다.", score: { E: 1, F: 1 } },
      { text: "조용히 주변 사람들의 표정을 살피며 분위기가 편안해지도록 리액션한다.", score: { I: 1, F: 1 } },
      { text: "모임의 본래 목적이나 화두로 자연스럽게 대화를 정리해 전환한다.", score: { E: 1, T: 1 } }
    ]
  },
  {
    id: 8,
    title: "영화나 드라마를 보고 난 후 드는 주된 생각은?",
    category: "감상 & 분석",
    icon: "🎬",
    options: [
      { text: "\"결말 복선 회수 대박이다. 스토리 구조가 탄탄하네.\" (전개/논리 중심)", score: { T: 1, N: 1 } },
      { text: "\"주인공이 너무 불쌍해... 그 심정이 이해돼서 눈물 나.\" (감정/이입 중심)", score: { F: 1, N: 1 } },
      { text: "\"주인공 옷이나 배경 연출이 감각적이더라.\" (시각적/현실적 묘사 중심)", score: { S: 1, F: 1 } },
      { text: "\"저 상황에서 저런 판단을 한 건 비현실적이지 않나?\" (현실성/개연성 분석)", score: { S: 1, T: 1 } }
    ]
  },
  {
    id: 9,
    title: "방이나 책상이 어질러져 있을 때 당신의 심리는?",
    category: "정리 & 공간",
    icon: "🧹",
    options: [
      { text: "눈에 거슬려서 바로바로 제자리에 정돈해야 마음이 편하다.", score: { J: 1 } },
      { text: "어질러져 있어도 나만의 기준이 있어서 물건 찾는 데 지장 없다.", score: { P: 1 } },
      { text: "주말이나 쉬는 날 날 잡아서 완벽하게 대청소한다.", score: { J: 1 } },
      { text: "치워야지 생각만 하다가 급한 일이 생기면 잊어버린다.", score: { P: 1 } }
    ]
  },
  {
    id: 10,
    title: "인생에서 가장 중요하게 생각하는 가치는?",
    category: "인생관 & 가치",
    icon: "🌟",
    options: [
      { text: "안정적이고 예측 가능한 일상, 그리고 확실한 성취.", score: { S: 1, J: 1 } },
      { text: "끊임없는 새로운 경험과 내면의 자유로움.", score: { N: 1, P: 1 } },
      { text: "논리적인 진실과 공정함, 유능함.", score: { T: 1, J: 1 } },
      { text: "사람들과의 따뜻한 관계와 서로 나누는 정서적 유대.", score: { F: 1, P: 1 } }
    ]
  }
];

const foodProfiles = {
  ISTJ: {
    mbti: "ISTJ",
    emoji: "🍲",
    foodName: "전통 곰탕",
    titleTag: "정갈하고 신뢰를 주는 뚝배기",
    subtitle: "원칙과 루틴의 미학",
    summary: "오랜 시간 푹 고아내어 한결같은 깊이를 전하는 맑고 든든한 곰탕 같은 사람입니다.",
    keywords: ["#원칙주의", "#깊고진한신뢰", "#루틴의미학"],
    accentColor: "from-amber-600 to-amber-800",
    themeBg: "bg-amber-500/10 text-amber-500 border-amber-500/20",
    appearance: "군더더기 없이 단정하고 맑은 국물처럼 언제나 깔끔하고 신뢰감을 주는 첫인상입니다. 과장이나 허세 없이 본인의 자리를 묵묵히 지킵니다.",
    ingredients: "잡내 없는 사골과 양지머리처럼 철저한 현실 감각과 단단한 책임감으로 꽉 차 있습니다. 정해진 원칙과 사실에 근거해 결정을 내립니다.",
    recipe: "불필요한 참견 없이 고요한 개인 공간에서 규칙적인 휴식을 취하고, 계획된 루틴을 하나씩 완수할 때 진정한 에너지 회복이 일어납니다.",
    bestMatch: "모둠 핑거푸드 & 샴페인 (ESFP)",
    bestMatchReason: "단조로울 수 있는 일상에 톡 쏘는 탄산처럼 유쾌한 활력과 즐거움을 선물합니다.",
    worstMatch: "팝핑 보바 에이드 (ENFP)",
    worstMatchReason: "어디로 튈지 모르는 즉흥성과 잦은 계획 변경이 곰탕의 깊은 맛을 흔들어 놓을 수 있습니다."
  },
  ISFJ: {
    mbti: "ISFJ",
    emoji: "🍳",
    foodName: "계란말이 / 미역국",
    titleTag: "곁에서 묵묵히 위로를 건네는 따뜻한 집밥",
    subtitle: "다정하고 세심한 보살핌",
    summary: "어떤 식탁에 놓여도 편안함과 든든한 온기를 건네는 다정한 집밥 같은 사람입니다.",
    keywords: ["#세심한배려", "#소리없는온기", "#수호자소울"],
    accentColor: "from-yellow-500 to-amber-600",
    themeBg: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
    appearance: "노릇노릇하고 부드러운 달걀말이처럼 누구에게나 친절하고 다가가기 편안한 인상을 줍니다.",
    ingredients: "겹겹이 정성껏 말아 올린 달걀옷 속에 숨겨진 섬세한 관찰력과 타인의 필요를 먼저 알아채는 따뜻한 이타심으로 채워져 있습니다.",
    recipe: "가장 익숙하고 안락한 나만의 공간에서 편안한 잠옷을 입고 잔잔한 위로를 받을 때 마음의 온도가 제자리를 찾습니다.",
    bestMatch: "마라탕 / 불닭 (ESTP)",
    bestMatchReason: "주저하고 망설일 때 시원하게 앞장서서 이끌어주는 화끈한 추진력이 최고의 짝꿍입니다.",
    worstMatch: "민트초코 피자 (ENTP)",
    worstMatchReason: "너무 실험적이고 규칙을 깨는 도발적인 태도가 마음에 잔잔한 체기를 남길 수 있습니다."
  },
  INFJ: {
    mbti: "INFJ",
    emoji: "☕",
    foodName: "드립 커피 & 다크 초콜릿",
    titleTag: "겉은 단순해 보이지만 깊은 층위가 있는",
    subtitle: "깊은 통찰과 여운",
    summary: "한 모금 넘긴 뒤에야 천천히 피어오르는 깊은 잔향과 위로를 품은 사람입니다.",
    keywords: ["#깊은통찰", "#풍부한여운", "#내면의오아시스"],
    accentColor: "from-stone-600 to-amber-950",
    themeBg: "bg-stone-500/10 text-stone-400 border-stone-500/20",
    appearance: "세련되고 차분하지만, 쉽게 속마음을 전부 드러내지 않는 신비롭고 깊이 있는 아우라를 풍깁니다.",
    ingredients: "산미와 쓴맛, 단맛이 정교하게 블렌딩된 원두처럼 사람의 심리와 미래의 본질을 꿰뚫어 보는 풍부한 직관과 이상주의를 지녔습니다.",
    recipe: "음악이 흐르는 조용한 카페나 밤 산책길을 홀로 걸으며 내면의 생각과 감정을 글이나 상상으로 정돈합니다.",
    bestMatch: "팝핑 보바 에이드 (ENFP)",
    bestMatchReason: "진중하고 깊은 내면에 통통 튀는 영감과 환한 미소를 불어넣어 주는 유쾌한 비타민입니다.",
    worstMatch: "마라탕 / 불닭 (ESTP)",
    worstMatchReason: "지나치게 직설적이고 속도감 있는 자극에 내면의 여린 잔향이 흩어지기 쉽습니다."
  },
  INTJ: {
    mbti: "INTJ",
    emoji: "♟️",
    foodName: "에스프레소 코스",
    titleTag: "군더더기 없는 최적의 분자 요리",
    subtitle: "전략적이고 완벽한 설계",
    summary: "한 방울의 군더더기 없이 완벽한 압력과 비율로 추출해낸 지적 설계자 같은 사람입니다.",
    keywords: ["#전략적완벽주의", "#정밀한추출", "#군더더기없는본질"],
    accentColor: "from-zinc-700 to-neutral-900",
    themeBg: "bg-zinc-500/10 text-zinc-400 border-zinc-500/20",
    appearance: "짙은 크레마 아래 차갑고 날카로운 지성이 돋보이는 프로페셔널하고 단호한 인상입니다.",
    ingredients: "고압을 견뎌내고 에센스만 추출한 에스프레소처럼 비효율을 거부하는 명쾌한 논리와 장기적인 전략적 로드맵으로 무장되어 있습니다.",
    recipe: "누구에게도 방해받지 않는 독립된 공간에서 복잡한 문제를 해결하거나 새로운 지식을 체계화할 때 충전됩니다.",
    bestMatch: "팝핑 보바 에이드 (ENFP)",
    bestMatchReason: "견고한 이성의 벽을 허물고 생각지도 못한 창의적인 영감과 온기를 건넵니다.",
    worstMatch: "해물 전골 / 떡볶이 파티 (ESFJ)",
    worstMatchReason: "형식적인 감정 표현과 끊임없는 친목 도모 요구에 시스템 과부하를 느낍니다."
  },
  ISTP: {
    mbti: "ISTP",
    emoji: "🍢",
    foodName: "바비큐 꼬치",
    titleTag: "효율과 실용의 극치, 캠핑장에서 굽는",
    subtitle: "군더더기 없는 쿨한 손맛",
    summary: "화려한 수식어 없이도 손맛 하나로 완벽한 풍미를 내는 쿨한 실력자입니다.",
    keywords: ["#효율적미니멀", "#직관적손맛", "#자유로운해결사"],
    accentColor: "from-orange-600 to-red-800",
    themeBg: "bg-orange-500/10 text-orange-500 border-orange-500/20",
    appearance: "센 척하지 않아도 느껴지는 자연스러운 여유와 군더더기 없이 담백하고 쿨한 아우라를 지닙니다.",
    ingredients: "숯불의 화력을 기가 막히게 조절하는 꼬치 장인처럼 즉각적인 현실 관찰력과 도구 활용 능력이 매우 뛰어납니다.",
    recipe: "혼자만의 취미 생활(조립, 드라이브, 게임, 스포츠)에 몰입하며 잡다한 소음에서 로그아웃합니다.",
    bestMatch: "해물 전골 / 떡볶이 파티 (ESFJ)",
    bestMatchReason: "무심한 듯 챙겨주는 세심한 보살핌이 꼬치의 투박함을 부드럽게 감싸줍니다.",
    worstMatch: "정성 가득한 비빔밥 (ENFJ)",
    worstMatchReason: "과도한 감정적 연대와 모든 행동에 의미를 부여하는 태도가 부담스럽게 느껴질 수 있습니다."
  },
  ISFP: {
    mbti: "ISFP",
    emoji: "🥑",
    foodName: "아보카도 브런치 플래터",
    titleTag: "감각적인 색감과 편안함이 공존하는",
    subtitle: "자유로운 미적 감각",
    summary: "신선한 색감과 조화로운 맛으로 일상에 소박한 예술을 선사하는 사람입니다.",
    keywords: ["#감각적낭만", "#유연한힐링", "#소소한행복"],
    accentColor: "from-emerald-500 to-teal-700",
    themeBg: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
    appearance: "부담스럽지 않고 자연스러우며, 본인만의 감각적인 취향과 분위기가 은은하게 묻어납니다.",
    ingredients: "부드러운 아보카도와 상큼한 드레싱처럼 다정하고 평화를 사랑하며, 지금 이 순간의 오감과 아름다움을 깊이 음미합니다.",
    recipe: "포근한 침대 속, 햇살이 드는 창가, 기분 좋은 향기 속에서 아무런 압박 없이 늘어질 때 회복됩니다.",
    bestMatch: "하이엔드 드라이에이징 티본 스테이크 (ENTJ)",
    bestMatchReason: "선택이 어렵고 망설여질 때 든든한 결단력과 방향성을 제시해주는 든든한 리더입니다.",
    worstMatch: "든든한 풀코스 솥밥 정식 (ESTJ)",
    worstMatchReason: "빡빡한 일정표와 통제적인 지시 앞에 고유의 감각적 자유가 질식할 수 있습니다."
  },
  INFP: {
    mbti: "INFP",
    emoji: "🧁",
    foodName: "몽블랑 디저트",
    titleTag: "몽환적인 감성과 위로를 품은",
    subtitle: "따뜻하고 순수한 낭만",
    summary: "섬세한 밤 크림 속에 반짝이는 동화 같은 상상과 따뜻한 진심을 품은 사람입니다.",
    keywords: ["#순수한낭만", "#섬세한위로", "#내면의우주"],
    accentColor: "from-purple-500 to-pink-600",
    themeBg: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    appearance: "눈 덮인 산처럼 고요하고 부드러워 보이지만 묘한 신비로움과 호기심을 자극합니다.",
    ingredients: "머랭과 밤 크림이 겹겹이 쌓인 것처럼 풍부한 감수성, 도덕적 진정성, 타인을 향한 깊은 공감력으로 빚어져 있습니다.",
    recipe: "감성적인 영화를 보거나, 음악을 들으며 나만의 비밀 일기장을 채우는 몽환적인 혼자만의 밤.",
    bestMatch: "하이엔드 드라이에이징 티본 스테이크 (ENTJ)",
    bestMatchReason: "머릿속으로만 꿈꾸던 이상과 아이디어를 현실 세계에 멋지게 실현해주는 실행력의 파트너입니다.",
    worstMatch: "든든한 풀코스 솥밥 정식 (ESTJ)",
    worstMatchReason: "감정을 배제한 직설적인 피드백과 융통성 없는 규율에 깊은 마음의 상처를 받습니다."
  },
  INTP: {
    mbti: "INTP",
    emoji: "🍣",
    foodName: "블라인드 퓨전 오마카세",
    titleTag: "독특한 배합과 끊임없는 호기심",
    subtitle: "지적 탐구와 독창성",
    summary: "아무도 상상 못한 재료의 배합으로 맛의 새로운 법칙을 증명하는 연구원 같은 사람입니다.",
    keywords: ["#지적호기심", "#엉뚱한독창성", "#논리적탐구"],
    accentColor: "from-cyan-600 to-blue-800",
    themeBg: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
    appearance: "조용하고 무심해 보이지만 머릿속에서는 기상천외한 가설 검증이 24시간 돌아가는 뇌섹남녀.",
    ingredients: "정교한 화학 반응처럼 복잡하게 얽힌 호기심, 편견 없는 분석력, 독창적인 사고방식으로 채워져 있습니다.",
    recipe: "새벽에 흥미로운 주제를 끝까지 파고드는 위키 탐색이나 아무도 방해하지 않는 지적 몰입.",
    bestMatch: "하이엔드 드라이에이징 티본 스테이크 (ENTJ)",
    bestMatchReason: "번뜩이는 창의적 아이디어를 구체적인 현실의 성과물로 함께 견인해 줍니다.",
    worstMatch: "해물 전골 / 떡볶이 파티 (ESFJ)",
    worstMatchReason: "사회적 관습과 형식적인 예의를 강요받는 순간 퓨전 오마카세의 불꽃이 꺼져버립니다."
  },
  ESTP: {
    mbti: "ESTP",
    emoji: "🔥",
    foodName: "마라탕 / 불닭",
    titleTag: "자극적이고 화끈한 액션",
    subtitle: "거침없는 실행력과 현실 즐김",
    summary: "망설임 없이 얼얼하게 직진하는, 지금 이 순간을 가장 뜨겁게 즐기는 사람입니다.",
    keywords: ["#거침없는직진", "#짜릿한도전", "#현장중심액션"],
    accentColor: "from-red-600 to-rose-700",
    themeBg: "bg-red-500/10 text-red-500 border-red-500/20",
    appearance: "눈빛부터 에너지가 넘치고 자신감이 뚝뚝 묻어나며, 어떤 자리에서든 금세 중심을 꿰찹니다.",
    ingredients: "화자오의 얼얼한 매운맛처럼 빠른 상황 판단력, 순발력, 그리고 리스크를 두려워하지 않는 승부사 기질로 꽉 차 있습니다.",
    recipe: "가만히 있는 휴식은 오히려 독! 땀을 흠뻑 흘리는 익스트림 스포츠나 즉흥적인 모임에서 도파민을 얻습니다.",
    bestMatch: "계란말이 / 미역국 (ISFJ)",
    bestMatchReason: "거침없이 질주하다가도 따뜻하고 순한맛으로 속을 부드럽게 감싸 안아주는 최고의 안식처입니다.",
    worstMatch: "드립 커피 & 다크 초콜릿 (INFJ)",
    worstMatchReason: "지나치게 깊은 복선과 복잡한 내면 심리를 분석하려 들면 답답해서 뛰쳐나가고 싶어집니다."
  },
  ESFP: {
    mbti: "ESFP",
    emoji: "🍾",
    foodName: "모둠 핑거푸드 & 샴페인",
    titleTag: "파티의 중심이자 모두를 기분 좋게 만드는",
    subtitle: "타고난 분위기 메이커",
    summary: "터지는 탄산 버블처럼 함께 있는 모든 사람의 하루를 파티로 만들어주는 사람입니다.",
    keywords: ["#분위기메이커", "#스파클링매력", "#축제의주인공"],
    accentColor: "from-pink-500 to-rose-600",
    themeBg: "bg-pink-500/10 text-pink-500 border-pink-500/20",
    appearance: "화사한 미소와 풍부한 리액션으로 어색한 공기를 1초 만에 유쾌한 축제로 바꾸어 놓습니다.",
    ingredients: "한 입 크기의 핑거푸드처럼 누구에게나 친근하고, 기분 좋은 샴페인 기포처럼 밝고 긍정적인 에너지를 내면에 품고 있습니다.",
    recipe: "좋아하는 사람들과 맛있는 음식을 먹고, 노래하고 춤추며 흥겨운 순간을 온몸으로 누릴 때 완충됩니다.",
    bestMatch: "전통 곰탕 (ISTJ)",
    bestMatchReason: "들뜬 텐션을 묵묵히 받아주고 현실의 바운더리를 든든하게 지켜주는 든든한 닻이 되어줍니다.",
    worstMatch: "에스프레소 코스 (INTJ)",
    worstMatchReason: "너무 진지하고 비판적인 시선으로 파티의 즐거움에 찬물을 끼얹는 것처럼 느껴집니다."
  },
  ENFP: {
    mbti: "ENFP",
    emoji: "🍹",
    foodName: "팝핑 보바 에이드",
    titleTag: "톡 쏘는 상큼함과 다채로운 토핑의",
    subtitle: "통통 튀는 아이디어 뱅크",
    summary: "톡톡 터지는 보바처럼 매 순간 기발한 아이디어와 무한한 가능성을 뿜어내는 사람입니다.",
    keywords: ["#스파크아이디어", "#열정보부상", "#사랑스러운에너지"],
    accentColor: "from-amber-400 to-pink-500",
    themeBg: "bg-pink-500/10 text-pink-400 border-pink-500/20",
    appearance: "알록달록 청량한 비주얼처럼 어디서나 활기차고 사람의 경계심을 단숨에 녹이는 햇살 같은 매력.",
    ingredients: "입안 가득 터지는 달콤한 과즙처럼 반짝이는 영감과 사람들의 숨은 장점을 찾아내는 순수한 애정으로 채워져 있습니다.",
    recipe: "새로운 자극을 주는 전시회, 충동적인 감성 여행, 깊은 공감을 나누는 밤샘 대화.",
    bestMatch: "에스프레소 코스 (INTJ)",
    bestMatchReason: "서로 다른 맛이 만나 경이로운 하모니를 이루는 지적이고 창의적인 소울메이트입니다.",
    worstMatch: "전통 곰탕 (ISTJ)",
    worstMatchReason: "틀에 박힌 규칙과 반복적인 루틴을 강요받으면 보바의 탄산이 맥없이 빠져버립니다."
  },
  ENTP: {
    mbti: "ENTP",
    emoji: "🍕",
    foodName: "민트초코 피자",
    titleTag: "익숙한 틀을 깨는 논쟁적인 맛",
    subtitle: "유쾌한 도발과 창의적 발상",
    summary: "익숙한 클리셰를 비틀어 세상에 유쾌하고 지적인 충격을 던지는 혁신가입니다.",
    keywords: ["#지적도발", "#클리셰파괴", "#아이디어빅뱅"],
    accentColor: "from-teal-500 to-emerald-700",
    themeBg: "bg-teal-500/10 text-teal-400 border-teal-500/20",
    appearance: "호기심 가득한 눈빛과 위트 있는 말솜씨로 어떤 토론이든 흥미진진하게 이끄는 이야기꾼.",
    ingredients: "민트의 청량함과 초콜릿의 달콤씁쓸함처럼 날카로운 논리력과 고정관념을 부수는 창의적 발상이 공존합니다.",
    recipe: "치열한 끝장 토론, 새로운 프로젝트 기획, 상식을 뒤엎는 기발한 실험에 빠져들 때 에너지가 솟구칩니다.",
    bestMatch: "드립 커피 & 다크 초콜릿 (INFJ)",
    bestMatchReason: "나의 엉뚱하고 도발적인 질문을 가장 깊이 있고 따뜻한 통찰로 받아쳐 주는 상대입니다.",
    worstMatch: "계란말이 / 미역국 (ISFJ)",
    worstMatchReason: "토론을 싸움으로 오해하고 전통만을 고집하면 답답함에 몸부림치게 됩니다."
  },
  ESTJ: {
    mbti: "ESTJ",
    emoji: "🍚",
    foodName: "든든한 풀코스 솥밥 정식",
    titleTag: "확실한 성과와 든든한 체계",
    subtitle: "체계적인 추진력과 리더십",
    summary: "빈틈없이 차려진 정갈한 한 상처럼, 계획한 목표를 반드시 이루어내는 리더입니다.",
    keywords: ["#철저한실행력", "#믿음직한기둥", "#효율과체계"],
    accentColor: "from-amber-700 to-orange-900",
    themeBg: "bg-amber-600/10 text-amber-600 border-amber-600/20",
    appearance: "흐트러짐 없는 단정한 태도와 결단력 있는 목소리로 주변의 질서를 정리하는 리더의 풍모.",
    ingredients: "고슬고슬하게 뜸이 잘 든 솥밥처럼 단단한 현실 감각, 공정한 룰, 빈틈없는 조직 관리력으로 이루어져 있습니다.",
    recipe: "할 일 목록(To-Do)을 완벽히 클리어하고, 정돈된 책상 앞에서 성취의 보람을 곱씹을 때.",
    bestMatch: "아보카도 브런치 플래터 (ISFP)",
    bestMatchReason: "경직된 어깨를 가볍게 풀어주고 일상에 감각적인 여유와 쉼표를 찍어줍니다.",
    worstMatch: "몽블랑 디저트 (INFP)",
    worstMatchReason: "마감과 현실적 결과를 고려하지 않고 감정적 이유만 앞세우면 참기 어렵습니다."
  },
  ESFJ: {
    mbti: "ESFJ",
    emoji: "🥘",
    foodName: "해물 전골 / 떡볶이 파티",
    titleTag: "모두를 한 식탁에 둘러앉히는 화합의 아이콘",
    subtitle: "따뜻한 배려와 친화력",
    summary: "보글보글 끓어오르는 냄비 주위로 모두를 둘러앉혀 따뜻함을 나누는 호스트입니다.",
    keywords: ["#다정한친화력", "#모임의구심점", "#황금케어"],
    accentColor: "from-orange-500 to-rose-600",
    themeBg: "bg-orange-500/10 text-orange-500 border-orange-500/20",
    appearance: "따뜻한 눈빛으로 주변을 살피며 누구 하나 숟가락을 놓치지 않게 챙겨주는 사려 깊은 인상.",
    ingredients: "온갖 해물이 어우러져 깊은 국물을 내듯 주변 사람들의 기분과 관계의 조화를 이끌어내는 탁월한 공감 능력.",
    recipe: "내가 소중히 여기는 사람들과 한 식탁에 둘러앉아 맛있는 음식을 먹으며 근황을 도란도란 나눌 때.",
    bestMatch: "바비큐 꼬치 (ISTP)",
    bestMatchReason: "말은 없어도 뒤에서 묵묵히 현실적인 문제를 해결해주는 듬직한 손맛의 파트너입니다.",
    worstMatch: "블라인드 퓨전 오마카세 (INTP)",
    worstMatchReason: "모임의 분위기를 고려하지 않고 비판적인 논쟁만 던지면 속이 상합니다."
  },
  ENFJ: {
    mbti: "ENFJ",
    emoji: "🥗",
    foodName: "정성 가득한 비빔밥",
    titleTag: "사람들의 잠재력을 끌어올리는 건강한 에너지",
    subtitle: "사람을 모으는 리더십",
    summary: "각양각색의 나물들이 조화롭게 어우러지도록 중심을 잡아주는 따뜻한 리더입니다.",
    keywords: ["#조화로운리더십", "#사람을키우는온기", "#열정적격려"],
    accentColor: "from-green-600 to-emerald-800",
    themeBg: "bg-green-500/10 text-green-500 border-green-500/20",
    appearance: "진심 어린 미소와 긍정적인 오라로 주변 사람들에게 영감과 용기를 주는 멘토 같은 모습.",
    ingredients: "고추장의 감칠맛처럼 서로 다른 개성을 하나로 묶어 최고의 하모니를 만들어내는 포용력과 진정성.",
    recipe: "내가 도운 사람이 성장하는 모습을 지켜보거나, 뜻을 같이하는 동료들과 의미 있는 비전을 공유할 때.",
    bestMatch: "몽블랑 디저트 (INFP)",
    bestMatchReason: "서로의 이상과 감성을 깊이 이해하고 응원해주는 영혼의 단짝입니다.",
    worstMatch: "바비큐 꼬치 (ISTP)",
    worstMatchReason: "마음의 문을 닫고 지나치게 냉소적인 태도를 보이면 감정적 소모가 극에 달합니다."
  },
  ENTJ: {
    mbti: "ENTJ",
    emoji: "🥩",
    foodName: "하이엔드 드라이에이징 티본 스테이크",
    titleTag: "압도적인 퀄리티와 확고한 기준",
    subtitle: "비전과 카리스마",
    summary: "타협 없는 숙성과 완벽한 시어링으로 정상의 맛을 증명하는 카리스마 비저너리입니다.",
    keywords: ["#압도적카리스마", "#명확한비전", "#정상의품격"],
    accentColor: "from-red-800 to-rose-950",
    themeBg: "bg-rose-900/10 text-rose-500 border-rose-900/20",
    appearance: "당당한 걸음걸이와 확신에 찬 눈빛으로 어떤 도전 과제 앞에서도 두려움 없는 지도자.",
    ingredients: "오랜 시간 숙성된 깊은 육즙처럼 높은 기준과 전략적 사고, 불가능을 가능하게 만드는 강한 의지.",
    recipe: "치열한 목표를 정복한 후 최고급 와인과 함께 다음 스텝의 큰 그림을 구상할 때.",
    bestMatch: "몽블랑 디저트 / 퓨전 오마카세 (INFP / INTP)",
    bestMatchReason: "나의 강력한 추진력에 창의적인 영감과 독창적인 아이디어를 채워주는 최고의 파트너입니다.",
    worstMatch: "아보카도 브런치 플래터 (ISFP)",
    worstMatchReason: "명확한 결단을 내리지 못하고 우물쭈물하는 모습에 인내심이 시험받게 됩니다."
  }
};

// Global export for file:// protocol support & ES Module support
if (typeof window !== 'undefined') {
  window.SoulFoodData = { questions, foodProfiles };
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { questions, foodProfiles };
}
