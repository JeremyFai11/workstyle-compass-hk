export type AxisKey = "EI" | "SN" | "TF" | "JP";
export type Letter = "E" | "I" | "S" | "N" | "T" | "F" | "J" | "P";
export type FunctionKey = "Ne" | "Ni" | "Se" | "Si" | "Te" | "Ti" | "Fe" | "Fi";
export type TypeCode =
  | "ISTJ" | "ISFJ" | "INFJ" | "INTJ"
  | "ISTP" | "ISFP" | "INFP" | "INTP"
  | "ESTP" | "ESFP" | "ENFP" | "ENTP"
  | "ESTJ" | "ESFJ" | "ENFJ" | "ENTJ";

export type Question = {
  prompt: string;
  a: string;
  b: string;
  axis: AxisKey;
  aLetter: Letter;
  bLetter: Letter;
  aFn: FunctionKey;
  bFn: FunctionKey;
};

export const questions: Question[] = [
  { prompt: "你收到一項方向未算清晰的新任務，第一步較可能是……", a: "找相關同事傾一轉，一邊交流一邊打開可能性", b: "先自己整理問題，形成初步方向才找人討論", axis: "EI", aLetter: "E", bLetter: "I", aFn: "Ne", bFn: "Ni" },
  { prompt: "公司採用一套你未接觸過的軟件，你會較自然地……", a: "先理解背後原理，再探索其他用法", b: "照實例逐步試用，先掌握穩定做法", axis: "SN", aLetter: "N", bLetter: "S", aFn: "Ne", bFn: "Si" },
  { prompt: "同事提出一個可行但不完美的方案，你首先留意……", a: "方案對各人感受、合作氣氛與投入度的影響", b: "能否在時限內達成目標，以及資源是否合理", axis: "TF", aLetter: "F", bLetter: "T", aFn: "Fe", bFn: "Te" },
  { prompt: "星期五有幾項工作要交，你會較傾向……", a: "保留調動空間，按進展和新發現決定下一步", b: "一開始就排好次序和時段，按計劃完成", axis: "JP", aLetter: "P", bLetter: "J", aFn: "Ne", bFn: "Te" },
  { prompt: "會議出現一段沉默時，你通常會……", a: "先觀察和整理，想清楚才發言", b: "拋出想法或問題，透過對話推進思考", axis: "EI", aLetter: "I", bLetter: "E", aFn: "Ti", bFn: "Fe" },
  { prompt: "客戶的要求有點含糊，你會先……", a: "追問具體例子、限制和可驗收的細節", b: "推敲他真正想達到的長遠效果", axis: "SN", aLetter: "S", bLetter: "N", aFn: "Se", bFn: "Ni" },
  { prompt: "團隊對一個決定意見分歧，你會較重視……", a: "各個論點是否前後一致、經得起反例", b: "決定是否符合自己相信的重要原則", axis: "TF", aLetter: "T", bLetter: "F", aFn: "Ti", bFn: "Fi" },
  { prompt: "面對一個為期三個月的項目，你較安心的做法是……", a: "先定里程碑、責任和完成標準", b: "先做出小型版本，按實際反應一路調整", axis: "JP", aLetter: "J", bLetter: "P", aFn: "Si", bFn: "Se" },
  { prompt: "參加業界交流活動時，你較可能……", a: "跟多幾位新朋友短談，看看有甚麼連結", b: "集中與一兩位合拍的人深入交流", axis: "EI", aLetter: "E", bLetter: "I", aFn: "Ne", bFn: "Fi" },
  { prompt: "完成一項工作後，你較自然會回顧……", a: "當中的整體模式，以及未來可能演變成甚麼", b: "實際出錯位、做過的步驟和可沿用經驗", axis: "SN", aLetter: "N", bLetter: "S", aFn: "Ni", bFn: "Si" },
  { prompt: "時間很趕，只能快速作決定，你會較依賴……", a: "具體相關人士的需要和處境", b: "可量度的影響、成本和效益", axis: "TF", aLetter: "F", bLetter: "T", aFn: "Fi", bFn: "Te" },
  { prompt: "截止時間快到，但你仍想到可改善之處，你較可能……", a: "只要仍有空間，就繼續探索更好的做法", b: "先交出已達標的版本，另記下日後改善", axis: "JP", aLetter: "P", bLetter: "J", aFn: "Ti", bFn: "Te" },
  { prompt: "與一班新同事午膳，你較容易……", a: "偏向與身旁一兩位慢慢熟絡", b: "投入大家的話題，從現場互動取得能量", axis: "EI", aLetter: "I", bLetter: "E", aFn: "Si", bFn: "Se" },
  { prompt: "在繁忙辦公環境工作時，你較常……", a: "很快留意四周聲音、動靜和即時變化", b: "沉浸於腦內思路，偶爾忽略身邊發生甚麼", axis: "SN", aLetter: "S", bLetter: "N", aFn: "Se", bFn: "Ni" },
  { prompt: "要向同事提出改善意見時，你會優先……", a: "具體指出行為、標準和需要改變的地方", b: "調整說法，讓對方容易接收和維持合作", axis: "TF", aLetter: "T", bLetter: "F", aFn: "Te", bFn: "Fe" },
  { prompt: "上司交給你一項全新的工作，你會想先……", a: "確認成果、時限與各項要求", b: "看看有哪些做法和方向值得一試", axis: "JP", aLetter: "J", bLetter: "P", aFn: "Ni", bFn: "Ne" },
  { prompt: "參與腦震盪時，甚麼狀態較像你？", a: "聽到別人的點子就立即聯想到更多，邊講邊想", b: "先把零散想法記下來，整理後才完整表達", axis: "EI", aLetter: "E", bLetter: "I", aFn: "Ne", bFn: "Ni" },
  { prompt: "閱讀一份操作教學時，你較想……", a: "先看整體架構，明白每部分為何存在", b: "跟著步驟立即試，從實際操作掌握", axis: "SN", aLetter: "N", bLetter: "S", aFn: "Ni", bFn: "Se" },
  { prompt: "如果公司規則看來不合理，你首先會問……", a: "它是否照顧團隊共同重視的需要？", b: "這套規則的邏輯是否成立、有沒有矛盾？", axis: "TF", aLetter: "F", bLetter: "T", aFn: "Fe", bFn: "Ti" },
  { prompt: "安排一個工作星期時，你較喜歡……", a: "保留一份彈性清單，按狀態選擇處理", b: "預先把重要事情放入明確時段", axis: "JP", aLetter: "P", bLetter: "J", aFn: "Ne", bFn: "Si" },
  { prompt: "公司聚會中沒有熟人時，你較可能……", a: "先待在較安靜的位置，等自然的對話出現", b: "主動加入不同小圈子，從互動找到切入點", axis: "EI", aLetter: "I", bLetter: "E", aFn: "Fi", bFn: "Fe" },
  { prompt: "處理一項重複流程時，你比較信任……", a: "已證實可靠的次序與檢查方法", b: "新想到的替代路線或捷徑", axis: "SN", aLetter: "S", bLetter: "N", aFn: "Si", bFn: "Ne" },
  { prompt: "分配團隊工作時，你會較重視……", a: "按能力和產出效率作最合理配置", b: "各人的成長需要、投入感和團隊氣氛", axis: "TF", aLetter: "T", bLetter: "F", aFn: "Te", bFn: "Fe" },
  { prompt: "處理一串來回電郵時，你較想……", a: "總結決定、負責人和下一步，盡快收結", b: "保持討論開放，讓新資料逐步加入", axis: "JP", aLetter: "J", bLetter: "P", aFn: "Te", bFn: "Ne" },
  { prompt: "你的提議被否決後，你較常……", a: "即場追問和交換觀點，從回應中調整想法", b: "先自行消化原因，想通後再決定是否回應", axis: "EI", aLetter: "E", bLetter: "I", aFn: "Ne", bFn: "Ti" },
  { prompt: "看一份有大量數據的報告，你通常先注意……", a: "數據背後的主題、走勢和長遠含意", b: "數字、例外和目前確實發生的情況", axis: "SN", aLetter: "N", bLetter: "S", aFn: "Ni", bFn: "Se" },
  { prompt: "同事因為一句準確但直接的批評而不開心，你較想先……", a: "修補理解和關係，讓對話可以繼續", b: "釐清批評內容是否合理和準確", axis: "TF", aLetter: "F", bLetter: "T", aFn: "Fe", bFn: "Ti" },
  { prompt: "工作比預期早完成，你較可能……", a: "利用餘下時間加試一個新方向", b: "按清單最後檢查，確認完成便交出", axis: "JP", aLetter: "P", bLetter: "J", aFn: "Ne", bFn: "Si" },
  { prompt: "入職首星期學習新工作，你較希望……", a: "有清晰資料讓自己先獨立理解", b: "跟同事一起做，透過即時問答上手", axis: "EI", aLetter: "I", bLetter: "E", aFn: "Ti", bFn: "Fe" },
  { prompt: "考慮下一個職涯方向時，你較傾向……", a: "從已累積的實際技能和經驗逐步延伸", b: "由想成為怎樣的人倒推長遠方向", axis: "SN", aLetter: "S", bLetter: "N", aFn: "Si", bFn: "Ni" },
  { prompt: "遇到一個灰色地帶的道德問題，你較依靠……", a: "內心真正在意、不能妥協的價值", b: "一套能一致應用、經得起推敲的原則", axis: "TF", aLetter: "F", bLetter: "T", aFn: "Fi", bFn: "Ti" },
  { prompt: "同時收到幾項未講明優先次序的要求，你會先……", a: "找負責人釐清次序，定下處理方案", b: "按新消息和現場需要靈活切換", axis: "JP", aLetter: "J", bLetter: "P", aFn: "Te", bFn: "Se" },
  { prompt: "經過一整天密集會議後，你較需要……", a: "再跟人傾一傾，把未清楚的地方講通", b: "有一段安靜時間，重新整理自己的狀態", axis: "EI", aLetter: "E", bLetter: "I", aFn: "Fe", bFn: "Fi" },
  { prompt: "要了解一個陌生市場，你較想先……", a: "整理不同趨勢，推想可能出現的新需求", b: "接觸用戶和現場，觀察真實使用情況", axis: "SN", aLetter: "N", bLetter: "S", aFn: "Ne", bFn: "Se" },
  { prompt: "同事帶著一個困難來找你，你較自然的第一反應是……", a: "協助拆解問題，找出最有效的解決辦法", b: "先聽清楚他在意甚麼、希望得到哪種支持", axis: "TF", aLetter: "T", bLetter: "F", aFn: "Te", bFn: "Fi" },
  { prompt: "開始一個自己的小項目時，你較可能……", a: "先順著好奇心試幾條路，再決定做成甚麼", b: "先定義想完成的成果和日期", axis: "JP", aLetter: "P", bLetter: "J", aFn: "Ne", bFn: "Ni" },
  { prompt: "向一班人簡報時，你較接近……", a: "預先準備好的內容讓我發揮得更穩定", b: "觀眾的提問和即場反應會令我更投入", axis: "EI", aLetter: "I", bLetter: "E", aFn: "Si", bFn: "Fe" },
  { prompt: "公司運作出現問題時，你較快察覺……", a: "眼前流程、工具或空間造成的實際阻力", b: "多個問題背後可能共用的系統模式", axis: "SN", aLetter: "S", bLetter: "N", aFn: "Se", bFn: "Ni" },
  { prompt: "參與招聘選擇時，你會較看重……", a: "他的動機、價值取向和團隊是否合拍", b: "候選人有沒有可證明的能力和客觀表現", axis: "TF", aLetter: "F", bLetter: "T", aFn: "Fi", bFn: "Te" },
  { prompt: "資料仍不完整，但團隊需要前進時，你較傾向……", a: "選定一個足夠合理的方向並開始執行", b: "再保留一點空間，等待可能改變判斷的新訊號", axis: "JP", aLetter: "J", bLetter: "P", aFn: "Te", bFn: "Ne" },
];

// The core assessment stays at 40 questions. These items are only shown when
// the core answers leave one or more dimensions close or internally mixed.
// Each axis has two A-left and two A-right items to limit position bias.
export const followUpQuestions: Question[] = [
  { prompt: "完成一場內容複雜的會議後，你較自然會怎樣理清想法？", a: "找一位同事再傾一轉，透過說話逐步想清楚", b: "先獨自寫下重點，整理成自己的理解才再交流", axis: "EI", aLetter: "E", bLetter: "I", aFn: "Ne", bFn: "Ni" },
  { prompt: "剛加入一個新團隊討論時，你較可能……", a: "先聽和觀察，私下形成觀點後才提出", b: "在對話中測試初步想法，從別人的反應再修正", axis: "EI", aLetter: "I", bLetter: "E", aFn: "Ti", bFn: "Fe" },
  { prompt: "獨自專注工作一段長時間後，哪種小休較能令你回復精神？", a: "走到同事附近聊幾句，接觸一下現場氣氛", b: "留在安靜位置，讓注意力慢慢回到自己", axis: "EI", aLetter: "E", bLetter: "I", aFn: "Se", bFn: "Si" },
  { prompt: "要處理一段較敏感的工作訊息時，你較傾向……", a: "先自己起草和斟酌，確定真正立場才發出", b: "先跟對方或可信任的人談談，從互動找到合適說法", axis: "EI", aLetter: "I", bLetter: "E", aFn: "Fi", bFn: "Fe" },

  { prompt: "公司推出一項新政策，你首先想知道……", a: "實際流程、例子，以及日常工作會改變甚麼", b: "政策背後的目的，以及它可能帶來的長遠影響", axis: "SN", aLetter: "S", bLetter: "N", aFn: "Si", bFn: "Ni" },
  { prompt: "某項表現突然下跌，你較自然的調查起點是……", a: "先提出一個可能解釋，再找資料驗證背後模式", b: "逐宗查看近期個案和數據，找出實際發生了甚麼", axis: "SN", aLetter: "N", bLetter: "S", aFn: "Ni", bFn: "Se" },
  { prompt: "要向新人解釋一個工作概念，你較容易由哪裡開始？", a: "用一個具體案例示範，再逐步說明做法", b: "先給他一個整體框架，再連結不同情況", axis: "SN", aLetter: "S", bLetter: "N", aFn: "Se", bFn: "Ne" },
  { prompt: "考慮一份未來工作是否適合自己時，你較看重……", a: "它可開啟哪些新方向，以及能發展甚麼潛力", b: "實際日常內容是否合適，過往經驗能否派上用場", axis: "SN", aLetter: "N", bLetter: "S", aFn: "Ne", bFn: "Si" },

  { prompt: "團隊要作一個有人不滿但必須落實的決定，你較重視……", a: "是否依照一致準則，並能清楚交代原因", b: "是否充分考慮每個人的特殊處境和真正需要", axis: "TF", aLetter: "T", bLetter: "F", aFn: "Te", bFn: "Fi" },
  { prompt: "一位平日可靠的同事突然錯過期限，你首先會……", a: "了解他遇到甚麼情況，以及目前需要哪種支援", b: "釐清失誤原因、責任和如何避免再次發生", axis: "TF", aLetter: "F", bLetter: "T", aFn: "Fe", bFn: "Ti" },
  { prompt: "評估一個很有感染力的新點子時，你較快檢查……", a: "論點是否成立，資源和執行方法是否可行", b: "它是否符合重要價值，並真正回應人的需要", axis: "TF", aLetter: "T", bLetter: "F", aFn: "Ti", bFn: "Fi" },
  { prompt: "兩位同事各執一詞，需要你協助調解，你較可能先……", a: "找出共同關心的事情，讓雙方恢復可以合作的氣氛", b: "分開事實、假設和規則，界定爭議究竟在哪裡", axis: "TF", aLetter: "F", bLetter: "T", aFn: "Fe", bFn: "Te" },

  { prompt: "一項重要工作快要正式推出，你較安心的是……", a: "確認清單、負責人和交付時間已經定好", b: "仍保留少量空間，讓團隊按最後反應作調整", axis: "JP", aLetter: "J", bLetter: "P", aFn: "Si", bFn: "Ne" },
  { prompt: "突然多了一天空檔，你較自然會……", a: "到時看看狀態和環境，再即興決定做甚麼", b: "預先揀一件最值得做的事，安排好大概節奏", axis: "JP", aLetter: "P", bLetter: "J", aFn: "Se", bFn: "Ni" },
  { prompt: "項目進行中途突然改變範圍，你較傾向……", a: "重新定優先次序和里程碑，再按新方案推進", b: "先試幾個可行做法，隨新資料一路調整", axis: "JP", aLetter: "J", bLetter: "P", aFn: "Te", bFn: "Ne" },
  { prompt: "兩個方案各有優點，而資料未必會再增加，你較容易……", a: "保持選項開放多一點，避免太早限制可能性", b: "選一個足夠可行的方向，讓事情正式向前", axis: "JP", aLetter: "P", bLetter: "J", aFn: "Ne", bFn: "Te" },
];

export type Profile = {
  title: string;
  oneLiner: string;
  summary: string;
  stack: [FunctionKey, FunctionKey, FunctionKey, FunctionKey];
  strengths: string[];
  blindspots: string[];
  directions: string[];
};

export const profiles: Record<TypeCode, Profile> = {
  ISTJ: { title: "穩健執行者", oneLiner: "以可靠方法把承諾逐一落實", summary: "你傾向先掌握事實和既有經驗，再用清晰標準推進工作。穩定、準確和可交付通常比聲勢更重要。", stack: ["Si","Te","Fi","Ne"], strengths: ["重視細節、責任與一致品質", "善於建立可重複的流程", "在混亂中守住實際標準"], blindspots: ["可能過早否定未經驗證的新方法", "容易把可靠變成不必要的僵化", "未必主動說出個人需要"], directions: ["練習小規模試驗，而非等到完全確定", "培養跨部門溝通與變革適應力", "把流程能力發展成項目或營運專長"] },
  ISFJ: { title: "細心守護者", oneLiner: "以可靠行動照顧人和團隊需要", summary: "你會留意實際細節與他人需要，喜歡以安穩、周到的方式令合作順暢。你的貢獻往往低調但持久。", stack: ["Si","Fe","Ti","Ne"], strengths: ["記得重要細節並細心跟進", "營造可信任的合作關係", "把服務需要轉化為實際行動"], blindspots: ["可能為維持和諧而承擔過多", "面對突變時容易先感到不安", "自己的界線和意見或會太遲說出"], directions: ["練習及早說明容量與界線", "在熟悉框架內加入小型創新", "發展客戶體驗、協調或人才支援能力"] },
  INFJ: { title: "洞見引導者", oneLiner: "看見人的潛力與事情的深層走向", summary: "你傾向從複雜資訊中抓住核心脈絡，並關心方向如何影響人。工作有意義、價值一致時，你通常最投入。", stack: ["Ni","Fe","Ti","Se"], strengths: ["整合複雜訊息並看見長遠方向", "理解團隊氣氛與未說出口的需要", "以價值和意義推動改變"], blindspots: ["可能把內在願景視為理所當然", "容易吸收別人的情緒和期望", "現實細節累積後才一次過感到壓力"], directions: ["用短週期驗證長遠判斷", "練習把願景說成具體下一步", "發展策略、培育、研究或內容引導能力"] },
  INTJ: { title: "策略建構者", oneLiner: "由長遠方向倒推最有效的系統", summary: "你喜歡辨認模式、預視走向，再建立能長期運作的方案。自主、深度和持續改善會令你更有動力。", stack: ["Ni","Te","Fi","Se"], strengths: ["看見系統問題與長期機會", "能把願景拆成策略和標準", "獨立學習與改善能力強"], blindspots: ["可能低估推動改變所需的關係工作", "對效率較低的過程容易不耐煩", "壓力下或忽略身體和即時環境"], directions: ["在方案早期加入持份者回饋", "練習清楚表達欣賞與期望", "發展策略、產品、研究或系統設計能力"] },
  ISTP: { title: "靈活解難者", oneLiner: "冷靜拆解問題，快速找到可行槓桿", summary: "你傾向先理解事情如何運作，再以直接、實際的方法處理問題。面對突發狀況時，你往往比冗長規劃更有發揮。", stack: ["Ti","Se","Ni","Fe"], strengths: ["迅速找出故障和關鍵變數", "臨場反應冷靜而務實", "能獨立掌握工具與技術"], blindspots: ["可能到最後才交代進度或風險", "對重複行政和長會議耐性較低", "別人未必讀得到你的關心"], directions: ["建立最少但穩定的跟進習慣", "練習讓推理和進度可被團隊看見", "發展技術、營運改善或應變型工作能力"] },
  ISFP: { title: "敏銳實踐者", oneLiner: "以真誠價值回應當下真實需要", summary: "你重視真誠、自由和具體體驗，往往能察覺環境與人的細微變化。你喜歡用行動和作品表達價值。", stack: ["Fi","Se","Ni","Te"], strengths: ["對人和現場需要有敏銳觸覺", "適應當下並作出貼地回應", "工作風格真誠、有個人質感"], blindspots: ["可能避免太早作長期承諾", "面對冷硬指標或衝突時容易退後", "個人價值未必會主動解釋"], directions: ["把重要價值轉成清晰可量度目標", "練習直接而尊重地處理分歧", "發展體驗、設計、服務或實務創作能力"] },
  INFP: { title: "價值探索者", oneLiner: "以想像力尋找對人有意義的可能", summary: "你傾向由內在價值出發，再探索不同可能。當工作容許真誠表達、創造和幫助人成長，你會更投入。", stack: ["Fi","Ne","Si","Te"], strengths: ["看見個人潛力與另類可能", "對價值、語氣和真誠度敏銳", "能為有意義的事情投入創意"], blindspots: ["選項太多時可能延遲收結", "批評容易被體驗成價值否定", "日常結構不足會消耗執行力"], directions: ["用小型交付把理想帶進現實", "為項目設定決定點和完成定義", "發展內容、培育、創意或社會影響能力"] },
  INTP: { title: "概念分析者", oneLiner: "追問原理，建立精確而一致的理解", summary: "你喜歡拆解假設、理解系統和找出更優雅的解釋。只要有足夠自主和深度，你能處理別人未必耐心追究的難題。", stack: ["Ti","Ne","Si","Fe"], strengths: ["辨認邏輯漏洞與隱藏假設", "快速連結概念和可能方案", "能建立清晰而精確的模型"], blindspots: ["可能持續分析而遲遲不交付", "容易低估共識和關係的實際作用", "重複收尾會令動力快速下降"], directions: ["先交可測試版本，再深化理論", "設定分析期限和明確輸出", "發展研究、數據、技術或策略分析能力"] },
  ESTP: { title: "行動應變者", oneLiner: "掌握現場，快速把機會變成行動", summary: "你對即時環境和實際回應敏銳，喜歡邊做邊調整。高互動、可見成果和適度挑戰通常令你最有活力。", stack: ["Se","Ti","Fe","Ni"], strengths: ["臨場判斷快、敢於處理突發情況", "善於把問題化繁為簡", "透過互動推動事情前進"], blindspots: ["可能低估長期後果和維護成本", "容易在刺激下降後失去耐性", "先行動後交代會令團隊不安"], directions: ["為重要決定加入簡短風險檢查", "建立收尾與交接的固定節點", "發展商務、前線營運、談判或應變能力"] },
  ESFP: { title: "活力協作者", oneLiner: "用真誠互動令當下的人和事活起來", summary: "你重視真實體驗、人與人的連結，也善於感受現場需要。能即時看見工作的影響，會令你更有投入感。", stack: ["Se","Fi","Te","Ni"], strengths: ["容易建立親切和有活力的氣氛", "對客戶與現場反應十分敏銳", "願意動手把想法變成體驗"], blindspots: ["長期抽象規劃可能較難維持投入", "不喜歡的衝突有時會被暫時擱置", "眼前需要可能蓋過真正優先次序"], directions: ["用視覺化里程碑連接長期目標", "練習以數據支援直覺判斷", "發展客戶體驗、活動、銷售或團隊文化能力"] },
  ENFP: { title: "可能性催化者", oneLiner: "連結人與想法，為有意義的方向點火", summary: "你容易看見人的潛力和新的連結，喜歡在自由中創造可能。當方向符合個人價值，你能感染身邊的人一起投入。", stack: ["Ne","Fi","Te","Si"], strengths: ["產生新點子並連結不同資源", "察覺人的動機與獨特潛力", "以熱情推動具意義的改變"], blindspots: ["新鮮感消退後，收尾動力可能下降", "容易同時答應太多可能", "壓力累積時才突然注意細節和身體"], directions: ["限制同時進行的主要項目數量", "把靈感轉成短週期交付與檢視", "發展創新、培育、品牌或社群連結能力"] },
  ENTP: { title: "創新拆解者", oneLiner: "打開可能，再用邏輯測試更好的路", summary: "你傾向由新可能開始，透過提問、辯證和實驗理解問題。複雜、可改造和有學習空間的工作通常最能吸引你。", stack: ["Ne","Ti","Fe","Si"], strengths: ["快速看見替代方案與跨界連結", "敢於挑戰假設、重構問題", "在討論和試驗中迅速學習"], blindspots: ["破解核心後，對維護和收尾較易失去興趣", "可能為測試觀點而令別人感到被挑戰", "新線開得太多，壓力往往遲到才察覺"], directions: ["把探索、承諾和完成分成清晰階段", "用外部節點保護收尾與日常節奏", "發展創新、策略、產品或顧問式解難能力"] },
  ESTJ: { title: "目標推進者", oneLiner: "定下標準，組織資源，確保事情完成", summary: "你重視清晰、責任和可見成果，擅長把人和資源組織起來。明確權責與可衡量進度會令你發揮最好。", stack: ["Te","Si","Ne","Fi"], strengths: ["迅速定優先次序並推動落實", "建立清晰規則與問責", "在壓力下維持決斷和秩序"], blindspots: ["效率取向可能壓過個別人的處境", "對含糊或反覆探索容易不耐煩", "內在價值和疲累訊號可能被延後處理"], directions: ["在決策前加入關係和長期影響檢查", "為新方法預留有限試驗空間", "發展項目管理、營運、領導或制度優化能力"] },
  ESFJ: { title: "團隊凝聚者", oneLiner: "建立信任，讓每個人都能穩定參與", summary: "你會主動留意關係、實際需要和團隊規範，擅長創造可依靠的合作環境。看到人受惠是重要動力。", stack: ["Fe","Si","Ne","Ti"], strengths: ["主動協調人和實際安排", "建立歸屬感與合作慣例", "記得承諾並照顧服務細節"], blindspots: ["可能過度依賴外界肯定", "為避免失望而承諾過多", "對非主流但合理的觀點未必立即開放"], directions: ["把關心延伸至清楚界線和坦誠回饋", "練習區分共識與真正最佳方案", "發展人才、客戶關係、社群或協調管理能力"] },
  ENFJ: { title: "成長推動者", oneLiner: "凝聚人心，把共同願景轉成進步", summary: "你對群體需要和人的潛力敏銳，喜歡把大家帶向有意義的方向。你往往能把抽象願景說成人願意參與的故事。", stack: ["Fe","Ni","Se","Ti"], strengths: ["建立共識並鼓勵他人發揮", "掌握團隊氣氛與長遠成長需要", "以清晰價值帶動合作"], blindspots: ["可能太快承擔別人的情緒和責任", "為維持方向而忽略自己的懷疑", "邏輯或數據問題有時較遲處理"], directions: ["為助人角色建立容量界線", "邀請異議並用證據檢驗願景", "發展領導、培育、溝通或組織發展能力"] },
  ENTJ: { title: "遠見統籌者", oneLiner: "看準方向，以系統和決斷推動成果", summary: "你傾向快速辨認目標、障礙和長遠槓桿，再組織資源前進。高挑戰、可承擔責任和能改善系統的環境最能發揮你。", stack: ["Te","Ni","Se","Fi"], strengths: ["把複雜願景轉化為行動策略", "果斷分配資源並推動改變", "對效率、規模和長期成果敏銳"], blindspots: ["推進速度可能快過團隊消化速度", "容易把感受視為次要資料", "長期衝刺後才發現個人代價"], directions: ["把持份者投入視為策略的一部分", "定期檢查成果是否仍符合核心價值", "發展策略領導、創業、營運或轉型能力"] },
};

export const functionInfo: Record<FunctionKey, { name: string; short: string }> = {
  Ne: { name: "外向直覺", short: "連結想法，打開多種可能" },
  Ni: { name: "內向直覺", short: "整合脈絡，聚焦長遠走向" },
  Se: { name: "外向感覺", short: "掌握現場，即時回應變化" },
  Si: { name: "內向感覺", short: "參照經驗，維持可靠細節" },
  Te: { name: "外向思考", short: "組織資源，追求客觀成效" },
  Ti: { name: "內向思考", short: "拆解原理，檢查邏輯一致" },
  Fe: { name: "外向情感", short: "理解群體，促進關係協調" },
  Fi: { name: "內向情感", short: "忠於價值，辨認真實需要" },
};
