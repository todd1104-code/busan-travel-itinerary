// 韓國釜山 6天5夜行程網頁互動邏輯 (V4 100% 精準行程對應照片與線上記錄)

// 行程資料集
const itineraryData = [
  {
    day: 1,
    date: "8/9（日）",
    subTitle: "影島 · 白淺灘 · 烤肉",
    title: "抵達釜山 ➔ 影島絕美海景 ➔ 白淺灘夕陽 ➔ 南浦洞燒肉與夜生活",
    items: [
      {
        time: "09:55",
        title: "抵達金海國際機場 (PUS)",
        desc: "搭乘長榮 BR1194 班機抵達釜山，辦理入境與提領 8 個大行李箱。",
        icon: "✈️",
        badges: ["航班報到", "入境手續"],
        mapUrl: "https://www.google.com/maps/search/?api=1&query=Gimhae+International+Airport"
      },
      {
        time: "11:00 - 11:45",
        title: "金海機場 ➔ 東橫INN 釜山站1號店",
        desc: "預約專車或叫 2 台 Kakao T Venti 大型計程車直達飯店寄放行李。",
        icon: "🚕",
        badges: ["專車接送", "行李寄放"],
        mapUrl: "https://www.google.com/maps/search/?api=1&query=Toyoko+Inn+Busan+Station+No.1"
      },
      {
        time: "12:00 - 13:30",
        title: "午餐：本錢豬肉湯飯 / 大建名家",
        desc: "釜山站必吃 30 年老店，每碗約 9,000 韓元（約 NT$ 216），湯頭濃郁鮮美，附新鮮韭菜與蝦醬。",
        icon: "🍲",
        badges: ["老字號湯飯", "道地美食"],
        badgeType: "food",
        mapUrl: "https://www.google.com/maps/search/?api=1&query=Bonjeon+Dwaeji-gukbap+Busan"
      },
      {
        time: "14:00 - 16:30",
        title: "影島海景複合空間（P.ARK）",
        desc: "挑高 6 層樓超大型海景文化空間，坐在冷氣觀景台喝咖啡，遠眺釜山港與港灣景色（人均約 8,000-12,000 韓元 / NT$ 192-288）。",
        icon: "☕",
        badges: ["海景咖啡廳", "網美拍照"],
        badgeType: "sight",
        mapUrl: "https://www.google.com/maps/search/?api=1&query=P.ARK+Yeongdo+Busan"
      },
      {
        time: "16:45 - 18:30",
        title: "白淺灘文化村 & 海岸隧道",
        desc: "釜山版聖托里尼，沿著彩虹階梯走下海邊，穿過「絕影海岸隧道」拍網美剪影照，夕陽西下時極度夢幻。",
        icon: "📸",
        badges: ["絕影海岸", "網美打卡"],
        badgeType: "sight",
        mapUrl: "https://www.google.com/maps/search/?api=1&query=Huinnyeoul+Culture+Village+Busan"
      },
      {
        time: "19:00 - 21:00",
        title: "晚餐：味贊王鹽烤肉 + BIFF 廣場",
        desc: "享用 3.5cm 超厚切熟成豬五花（人均約 NT$ 480-600），飯後逛 BIFF 廣場吃黑糖餅 (2,000 韓元 / NT$ 48)。",
        icon: "🥩",
        badges: ["厚切燒肉", "黑糖餅"],
        badgeType: "food",
        mapUrl: "https://www.google.com/maps/search/?api=1&query=Matchandeul+Wangso-geum-gui+Nampo+Busan"
      },
      {
        time: "21:15 - 23:00",
        title: "成年人夜生活：南浦洞布帳馬車或釜山塔夜景",
        desc: "登釜山塔俯瞰夜景（門票 12,000 韓元 / NT$ 288），或至南浦洞布帳馬車攤位喝燒酒配辣炒雞體驗韓劇氛圍。",
        icon: "🍺",
        badges: ["韓劇布帳馬車", "釜山塔夜景"],
        badgeType: "food",
        mapUrl: "https://www.google.com/maps/search/?api=1&query=Busan+Tower+Yongdusan+Park"
      }
    ]
  },
  {
    day: 2,
    date: "8/10（一）",
    subTitle: "膠囊列車 · SPA LAND · 夜景",
    title: "天空膠囊列車 ➔ SPA LAND 頂級汗蒸幕 ➔ 百貨購物 ➔ BUSAN X the SKY 100樓夜景",
    items: [
      {
        time: "09:30 - 11:30",
        title: "海雲台藍線公園（天空膠囊 & 海岸列車）",
        desc: "包 2 台可愛的天空膠囊列車（尾浦➔青沙浦，4人車 40,000 韓元 / NT$ 960，8人共 2台），空中俯瞰彩色海景。",
        icon: "🚃",
        badges: ["天空膠囊", "海岸列車"],
        badgeType: "sight",
        mapUrl: "https://www.google.com/maps/search/?api=1&query=Haeundae+Blueline+Park+Mipo+Station"
      },
      {
        time: "11:30 - 13:15",
        title: "午餐：青沙浦 秀敏家烤貝 / 海鮮麵",
        desc: "青沙浦紅燈塔旁的超人氣烤扇貝與烤鮑魚（大份烤貝約 50,000 韓元 / NT$ 1,200，人均約 NT$ 480-720）。",
        icon: "🦪",
        badges: ["海鮮烤貝", "青沙浦地標"],
        badgeType: "food",
        mapUrl: "https://www.google.com/maps/search/?api=1&query=Suminine+Cheongsapo+Busan"
      },
      {
        time: "13:45 - 16:45",
        title: "【高溫避暑】SPA LAND 汗蒸幕（新世界 Centum City 店）",
        desc: "門票 23,000 韓元（約 NT$ 552，可用 PASS 兌換）。全釜山最奢華汗蒸幕，內有 13 種主題黃土/冰雪房與戶外天然溫泉足浴。",
        icon: "♨️",
        badges: ["頂級汗蒸幕", "天然溫泉"],
        badgeType: "sight",
        mapUrl: "https://www.google.com/maps/search/?api=1&query=SPA+LAND+Centum+City+Busan"
      },
      {
        time: "16:45 - 19:15",
        title: "【購物天堂】新世界百貨 Centum City 店",
        desc: "吉尼斯紀錄全球最大百貨，集合 Gentle Monster、Tamburins、Acne Studios 與韓國在地潮牌，買好買滿。",
        icon: "🛍️",
        badges: ["全球最大百貨", "韓國潮牌"],
        badgeType: "shop",
        mapUrl: "https://www.google.com/maps/search/?api=1&query=Shinsegae+Centum+City+Busan"
      },
      {
        time: "20:45 - 22:00",
        title: "【夜景地標】BUSAN X the SKY (100樓觀景台)",
        desc: "門票 27,000 韓元（約 NT$ 648）。韓國第二高樓，搭乘超高速電梯直達 100 樓，俯瞰海雲台沙灘與廣安大橋夜景，內有全球最高星巴克。",
        icon: "🌃",
        badges: ["100樓高空觀景", "最高星巴克"],
        badgeType: "sight",
        mapUrl: "https://www.google.com/maps/search/?api=1&query=BUSAN+X+the+SKY"
      }
    ]
  },
  {
    day: 3,
    date: "8/11（二）",
    subTitle: "松島纜車 · 美妝 · 超市大採購",
    title: "松島纜車&龍宮雲橋 ➔ 札嘎其海鮮宴 ➔ 光復路美妝血拼 ➔ 樂天超市大採購",
    items: [
      {
        time: "10:00 - 12:15",
        title: "松島海上纜車 ➔ 松島龍宮雲橋 ➔ 天空步道",
        desc: "纜車來回 17,000 韓元（約 NT$ 408，可用 PASS），搭水晶車廂過海；連通走松島龍宮雲橋（門票 1,000 韓元 / NT$ 24），跨海踏在無人島斷崖上。",
        icon: "🈳",
        badges: ["水晶纜車", "龍宮雲橋"],
        badgeType: "sight",
        mapUrl: "https://www.google.com/maps/search/?api=1&query=Songdo+Marine+Cable+Car+Busan"
      },
      {
        time: "12:30 - 14:30",
        title: "午餐：札嘎其海鮮市場 (자갈치시장)",
        desc: "1樓現挑活帝王蟹、松葉蟹、比目魚生魚片，2樓代客料理（人均約 NT$ 960-1,440）；或吃烤魚定食（每人約 NT$ 288）。",
        icon: "🦀",
        badges: ["活帝王蟹", "札嘎其烤魚"],
        badgeType: "food",
        mapUrl: "https://www.google.com/maps/search/?api=1&query=Jagalchi+Market+Busan"
      },
      {
        time: "14:30 - 17:45",
        title: "【血拼主戰場】南浦洞光復路時尚街 & 樂天百貨光復店",
        desc: "光復路美妝 (Olive Young 旗艦店)、韓系潮牌 (Musinsa, COVERNAT, Kodak)，並可上樂天百貨 13 樓頂樓庭園俯瞰港區全景。",
        icon: "👗",
        badges: ["光復路美妝", "韓系潮牌"],
        badgeType: "shop",
        mapUrl: "https://www.google.com/maps/search/?api=1&query=Gwangbok-ro+Fashion+Street+Busan"
      },
      {
        time: "17:45 - 19:30",
        title: "【伴手禮大採購】樂天超市 光復店 (Lotte Mart)",
        desc: "在百貨連通樂天超市採買 HBAF 堅果、辛拉麵、海苔、韓國燒酒等，現場辦理退稅！買完搭計程車（NT$ 120）提回飯店放，免後續負擔。",
        icon: "🛒",
        badges: ["伴手禮採購", "現場退稅"],
        badgeType: "shop",
        mapUrl: "https://www.google.com/maps/search/?api=1&query=Lotte+Mart+Gwangbok+Busan"
      },
      {
        time: "19:45 - 21:30",
        title: "晚餐：南浦洞豬腳街 漢陽豬腳 (한양족발)",
        desc: "涼拌芥末豬腳 (냉채족발, 大份約 45,000 韓元 / NT$ 1,080)，酸辣小黃瓜配切片豬腳，清爽開胃。",
        icon: "🍖",
        badges: ["涼拌豬腳", "南浦洞必吃"],
        badgeType: "food",
        mapUrl: "https://www.google.com/maps/search/?api=1&query=Hanyang+Jokbal+Nampo+Busan"
      }
    ]
  },
  {
    day: 4,
    date: "8/12（三）",
    subTitle: "龍宮寺 · 松葉蟹 · Outlet",
    title: "海東龍宮寺 ➔ 機張松葉蟹盛宴 ➔ Ananti Cove 海景咖啡 ➔ 樂天 Outlet",
    items: [
      {
        time: "09:30 - 11:30",
        title: "海東龍宮寺 (Haedong Yonggungsa Temple)",
        desc: "全韓國唯一建在海邊斷崖上的古剎，8位成年人可挑戰 108 階梯，欣賞海浪拍打石壁的壯麗景致（免費參觀）。",
        icon: "🏯",
        badges: ["海邊古剎", "108階梯"],
        badgeType: "sight",
        mapUrl: "https://www.google.com/maps/search/?api=1&query=Haedong+Yonggungsa+Temple"
      },
      {
        time: "12:00 - 13:45",
        title: "午餐：機張市場松葉蟹 或 長竹海鮮麵",
        desc: "機張市場清蒸松葉蟹（蟹膏炒飯極品，人均約 NT$ 1,440-1,920）或濃郁海鮮湯麵（每碗約 NT$ 288）。",
        icon: "🦀",
        badges: ["機張松葉蟹", "海鮮炒飯"],
        badgeType: "food",
        mapUrl: "https://www.google.com/maps/search/?api=1&query=Gijang+Market+Busan"
      },
      {
        time: "14:00 - 16:00",
        title: "Ananti Cove 奢華海景廊道 & 海景咖啡廳",
        desc: "釜山頂級渡假村沿海廊道，在挑高冷氣海景咖啡廳享用下午茶，拍照極具高級質感（人均約 NT$ 288-432）。",
        icon: "🌊",
        badges: ["奢華渡假村", "極美海景"],
        badgeType: "sight",
        mapUrl: "https://www.google.com/maps/search/?api=1&query=Ananti+Cove+Busan"
      },
      {
        time: "16:15 - 18:45",
        title: "【露天 Outlet】東釜山樂天 Outlet",
        desc: "希臘聖托里尼風格超大型 Outlet，運動品牌（Nike, Adidas, NB）與韓國在地休閒品牌常有 3~5 折折扣。",
        icon: "🏷️",
        badges: ["露天Outlet", "品牌折扣"],
        badgeType: "shop",
        mapUrl: "https://www.google.com/maps/search/?api=1&query=Lotte+Premium+Outlets+Dongbusan"
      }
    ]
  },
  {
    day: 5,
    date: "8/13（四）",
    subTitle: "五六島 · 西面商圈 · 廣安夜景",
    title: "五六島斷崖 ➔ 西面潮牌與地下街 ➔ 廣安里海景酒吧與燦爛夜景",
    items: [
      {
        time: "09:30 - 10:45",
        title: "五六島天空步道 (Oryukdo Skywalk)",
        desc: "免費入場，踏在懸崖邊 U 型玻璃棧道上，看五六島與壯麗海浪，拍出凌空絕景。",
        icon: "🌉",
        badges: ["懸崖天空步道", "免費景點"],
        badgeType: "sight",
        mapUrl: "https://www.google.com/maps/search/?api=1&query=Oryukdo+Skywalk+Busan"
      },
      {
        time: "11:15 - 16:00",
        title: "【年輕潮牌與地下街】西面商圈 (Seomyeon)",
        desc: "午餐吃松亭3代豬肉湯飯 (NT$ 216)，逛全釜山最大地下街平價服飾與田浦咖啡街潮牌店。",
        icon: "🛍️",
        badges: ["西面地下街", "松亭豬肉湯飯"],
        badgeType: "shop",
        mapUrl: "https://www.google.com/maps/search/?api=1&query=Seomyeon+Underground+Shopping+Center"
      },
      {
        time: "16:45 - 18:30",
        title: "廣安里海水浴場景觀咖啡廳散步",
        desc: "沿海灣散步，在海景第一排觀景窗咖啡廳喝咖啡，欣賞正對面的廣安大橋全景。",
        icon: "☕",
        badges: ["廣安里沙灘", "廣安大橋景"],
        badgeType: "sight",
        mapUrl: "https://www.google.com/maps/search/?api=1&query=Gwangalli+Beach+Busan"
      },
      {
        time: "18:30 - 21:30",
        title: "晚餐與夜生活：海景餐酒館 Clam / 精釀酒吧 Gorilla / 海邊野餐",
        desc: "可至 Clam 吃西班牙海鮮燉飯看夜景、或 Gorilla Brewing 喝精釀啤酒、或民樂市場外帶生魚片至海邊野餐（人均約 NT$ 480-840）。",
        icon: "🍸",
        badges: ["廣安大橋夜景", "精釀啤酒"],
        badgeType: "food",
        mapUrl: "https://www.google.com/maps/search/?api=1&query=Clam+Gwangalli+Busan"
      }
    ]
  },
  {
    day: 6,
    date: "8/14（五）",
    subTitle: "古蹟咖啡 · 退房 · 返台",
    title: "飯店悠閒退房 ➔ 釜山站周邊文青咖啡/採買 ➔ 機場返台",
    items: [
      {
        time: "09:00 - 10:45",
        title: "【慢活早晨】飯店悠閒早餐與整理行李",
        desc: "伴手禮已在 Day 3 買齊，早上免趕行程。可在東橫INN享用早餐、打包行李，或走至百濟醫院古蹟咖啡廳 (Brown Hands) 喝手沖咖啡 (NT$ 144)。",
        icon: "☕",
        badges: ["悠閒早晨", "百濟古蹟咖啡"],
        badgeType: "sight",
        mapUrl: "https://www.google.com/maps/search/?api=1&query=Brown+Hands+Baekje+Busan"
      },
      {
        time: "11:00 - 11:40",
        title: "專車 / Kakao T Venti 前往金海機場",
        desc: "飯店退房提行李，搭乘預約車直達機場國際線航廈。",
        icon: "🚕",
        badges: ["專車前往", "直達機場"],
        mapUrl: "https://www.google.com/maps/search/?api=1&query=Gimhae+International+Airport"
      },
      {
        time: "14:10",
        title: "搭乘長榮 BR1193 返抵桃園機場 T2",
        desc: "11:40 前抵達金海機場辦理報到退稅，14:10 起飛圓滿結束韓國釜山 6 天 5 夜奢華慢遊。",
        icon: "✈️",
        badges: ["長榮航空", "順利返台"],
        mapUrl: "https://www.google.com/maps/search/?api=1&query=Taoyuan+International+Airport"
      }
    ]
  }
];

// 100% 精準對應本 6 天行程的真實高畫質景點相片集 (非本行程景點已剔除)
const galleryPhotos = [
  {
    title: "海雲台天空膠囊列車",
    location: "Day 2 行程：海雲台藍線公園 (尾浦 ➔ 青沙浦)",
    src: "https://bobbytravel.tw/wp-content/uploads/2025/07/20250917000451_0_63bbf1.jpg",
    desc: "實景拍攝：超萌彩色天空膠囊列車懸空行駛於海濱懸崖邊，遠眺藍天海水。"
  },
  {
    title: "海雲台海水浴場沙灘",
    location: "Day 2 行程：海雲台區海雲台海邊路",
    src: "https://bobbytravel.tw/wp-content/uploads/pixnet/33f02593d6cb524436ebddef9aa579cb.jpg",
    desc: "實景拍攝：韓國最具代表性的美麗白沙海灘，周邊摩天大樓林立。"
  },
  {
    title: "BUSAN X the SKY 100樓景觀",
    location: "Day 2 行程：海雲台 LCT 塔 100樓",
    src: "https://bobbytravel.tw/wp-content/uploads/2025/12/20251230192952_0_86319f.jpg",
    desc: "實景拍攝：韓國第二高樓，360度俯瞰海雲台海灣全景與最高星巴克。"
  },
  {
    title: "海東龍宮寺臨海全景",
    location: "Day 4 行程：機張郡海東龍宮寺",
    src: "https://bobbytravel.tw/wp-content/uploads/2025/12/20251218004310_0_f3a6c2.jpg",
    desc: "實景拍攝：建於礁岩石壁之上的神聖海邊古剎，海浪拍岸非常壯麗。"
  },
  {
    title: "松島海上纜車與水域",
    location: "Day 3 行程：松島海水浴場",
    src: "https://bobbytravel.tw/wp-content/uploads/2025/12/20251208102655_0_96c489.jpg",
    desc: "實景拍攝：韓國第一條海上纜車，跨越 1.62 公里汪洋大海。"
  },
  {
    title: "松島龍宮雲橋",
    location: "Day 3 行程：松島岩南公園對岸",
    src: "https://bobbytravel.tw/wp-content/uploads/2026/01/20251216142051_0_73adad.jpg",
    desc: "實景拍攝：360度跨海步道連通無人島，踩在懸崖斷崖上極具震撼。"
  },
  {
    title: "白淺灘文化村海岸步道",
    location: "Day 1 行程：影島區白淺灘文化村",
    src: "https://bobbytravel.tw/wp-content/uploads/2025/07/20250916235936_0_f75aff.jpg",
    desc: "實景拍攝：藍白色調小白屋沿海步道，文青咖啡廳與彩虹階梯聚落。"
  },
  {
    title: "SPA LAND 奢華汗蒸幕",
    location: "Day 2 行程：新世界 Centum City 店 1F",
    src: "https://bobbytravel.tw/wp-content/uploads/2026/01/20260106101923_0_60fd9a.jpg",
    desc: "實景拍攝：六星級奢華汗蒸幕設施，13種主題桑拿房與戶外溫泉足浴。"
  },
  {
    title: "五六島天空步道",
    location: "Day 5 行程：南區五六島路",
    src: "https://bobbytravel.tw/wp-content/uploads/pixnet/7f1e572ed63347666a60876d27a9270d.jpg",
    desc: "實景拍攝：建於 35 公尺懸崖邊的 U 型玻璃步道，踏在浪花之上。"
  },
  {
    title: "廣安大橋夜景",
    location: "Day 5 行程：廣安里海水浴場",
    src: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?q=80&w=1200&auto=format&fit=crop",
    desc: "實景拍攝：廣安大橋夜間點燈，坐在海邊餐酒館或沙灘野餐感受最迷人的微醺夜生活。"
  }
];

// 初始化
document.addEventListener("DOMContentLoaded", () => {
  renderDayTabs();
  renderDayTimeline(1);
  renderGallery();
  setupEventListeners();
  calculateExchange();
});

function renderDayTabs() {
  const tabGroup = document.getElementById("tab-group-container");
  let html = "";
  
  itineraryData.forEach(d => {
    html += `
      <button class="tab-btn ${d.day === 1 ? 'active' : ''}" data-day="${d.day}" id="tab-day-${d.day}">
        <span class="tab-day-code">DAY 0${d.day}</span>
        <span class="tab-day-date">${d.date}</span>
        <span class="tab-day-sub">${d.subTitle}</span>
      </button>
    `;
  });
  
  tabGroup.innerHTML = html;
}

function renderDayTimeline(dayNum) {
  const container = document.getElementById("timeline-container");
  const dayData = itineraryData.find(d => d.day === dayNum);
  
  if (!dayData) return;
  
  document.getElementById("day-title").textContent = `Day ${dayData.day}｜${dayData.date} - ${dayData.title}`;
  
  let html = `<div class="timeline">`;
  dayData.items.forEach(item => {
    let badgeClass = "badge-sight";
    if (item.badgeType === "food") badgeClass = "badge-food";
    if (item.badgeType === "shop") badgeClass = "badge-shop";
    
    html += `
      <div class="timeline-item">
        <div class="timeline-icon">${item.icon}</div>
        <div class="event-card">
          <div class="event-header-flex">
            <span class="event-time">${item.time}</span>
            ${item.mapUrl ? `<a href="${item.mapUrl}" target="_blank" rel="noopener" class="btn-map-link">📍 導航地圖</a>` : ''}
          </div>
          <h3 class="event-title">${item.title}</h3>
          <p class="event-desc">${item.desc}</p>
          <div class="event-badges">
            ${item.badges.map(b => `<span class="badge ${badgeClass}">${b}</span>`).join("")}
          </div>
        </div>
      </div>
    `;
  });
  html += `</div>`;
  
  container.innerHTML = html;
  
  document.querySelectorAll(".tab-btn").forEach(btn => {
    btn.classList.toggle("active", parseInt(btn.dataset.day) === dayNum);
  });
}

function renderGallery() {
  const galleryContainer = document.getElementById("gallery-container");
  let html = "";
  
  galleryPhotos.forEach((photo, index) => {
    html += `
      <div class="photo-card" onclick="openModal(${index})">
        <img src="${photo.src}" alt="${photo.title}" loading="lazy">
        <div class="photo-overlay">
          <h4 class="photo-title">${photo.title}</h4>
          <span class="photo-location">📍 ${photo.location}</span>
        </div>
      </div>
    `;
  });
  
  galleryContainer.innerHTML = html;
}

function openModal(index) {
  const photo = galleryPhotos[index];
  document.getElementById("modal-img").src = photo.src;
  document.getElementById("modal-title").textContent = photo.title;
  document.getElementById("modal-location").textContent = `📍 ${photo.location}`;
  document.getElementById("modal-desc").textContent = photo.desc;
  document.getElementById("photo-modal").classList.add("active");
}

function closeModal() {
  document.getElementById("photo-modal").classList.remove("active");
}

function calculateExchange() {
  const krwInput = document.getElementById("krw-input").value;
  const rateInput = document.getElementById("rate-input").value || 0.024;
  const peopleInput = document.getElementById("people-input").value || 8;
  
  const krw = parseFloat(krwInput) || 0;
  const rate = parseFloat(rateInput);
  const people = parseInt(peopleInput) || 1;
  
  const twdTotal = Math.round(krw * rate);
  const twdPerPerson = Math.round(twdTotal / people);
  
  document.getElementById("twd-result").textContent = `NT$ ${twdTotal.toLocaleString()}`;
  document.getElementById("twd-per-person").textContent = `NT$ ${twdPerPerson.toLocaleString()}`;
}

function setupEventListeners() {
  document.getElementById("tab-group-container").addEventListener("click", (e) => {
    const tabBtn = e.target.closest(".tab-btn");
    if (tabBtn) {
      const day = parseInt(tabBtn.dataset.day);
      renderDayTimeline(day);
    }
  });
  
  document.getElementById("krw-input").addEventListener("input", calculateExchange);
  document.getElementById("rate-input").addEventListener("input", calculateExchange);
  document.getElementById("people-input").addEventListener("input", calculateExchange);
  
  document.querySelectorAll(".transit-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".transit-btn").forEach(b => b.style.borderColor = "var(--border-light)");
      btn.style.borderColor = "var(--primary-glow)";
      
      const plan = btn.dataset.plan;
      const detailBox = document.getElementById("transit-detail");
      
      if (plan === "venti") {
        detailBox.innerHTML = `
          <strong style="color: var(--accent-gold);">👍 方案 1：預先預約 1 台 9~12 人座接送包車（極推薦！）</strong>
          <p>強烈建議提前預訂機場包車！出關後司機直接舉牌接機，將 8 人與 8 個大行李箱一次載走直達釜山站東橫 INN，單趟約 NT$ 1,800-2,200（人均僅約 NT$ 250 元），最方便省心。</p>
        `;
      } else if (plan === "kakao") {
        detailBox.innerHTML = `
          <strong style="color: var(--primary-glow);">🚕 方案 2：現場 Kakao T 叫 2 台 Venti / 大型計程車</strong>
          <p>Kakao T App 已支援中文介面與海外信用卡。出關後可叫 2 台 Venti（每台 4 人 + 4 箱），2 台總費用約 70,000 - 90,000 韓元（約 NT$ 1,680 - 2,160）。但需注意班機抵達高峰期大型車可能需稍作等待。</p>
        `;
      } else if (plan === "bus") {
        detailBox.innerHTML = `
          <strong style="color: var(--accent-green);">🚌 方案 3：機場巴士 (Limousine Bus) 直達釜山站</strong>
          <p>於國際線 1 樓 3 號月台搭乘「釜山站/南浦洞線」，每人約 6,000-10,000 韓元（約 NT$ 144-240），8人總計約 NT$ 1,152-1,920。大行李放置下層車廂，車程約 45 分鐘。</p>
        `;
      }
    });
  });
}
