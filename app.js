// 韓國釜山 6天5夜家族慢遊行程網頁互動邏輯 (V10.0 全功能修復完整版：含主題切換、每日行程切換、OY 20大好物、韓語搭車卡與試算工具)

// 1. SPA Section 切換邏輯 (全域掛載)
window.switchSection = function(sectionId) {
  const buttons = document.querySelectorAll('.main-tab-btn');
  buttons.forEach(btn => {
    const onclickAttr = btn.getAttribute('onclick') || '';
    if (onclickAttr.includes(`'${sectionId}'`) || onclickAttr.includes(`"${sectionId}"`)) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  const sections = document.querySelectorAll('.app-section');
  sections.forEach(sec => {
    if (sec.id === sectionId) {
      sec.classList.add('active');
    } else {
      sec.classList.remove('active');
    }
  });

  const mainNav = document.getElementById('main-nav');
  if (mainNav) {
    mainNav.scrollIntoView({ behavior: 'smooth' });
  }
};

// 行程資料集 (完全同步最新行程、車資標註與帝王蟹/備案餐廳指南)
const itineraryData = [
  { day: 1, 
    date: "8/9（日）",
    subTitle: "抵達釜山 ➔ 飯店 Check-in ➔ 豬肉湯飯 ➔ 光復路換錢血拼 ➔ 南浦參雞湯/海帶湯 ➔ 釜山塔夜景",
    title: "金海機場 ➔ 東橫INN 釜山站1號店 ➔ 本錢豬肉湯飯 ➔ 光復路換錢/逛街 ➔ 晚餐 ➔ 釜山塔",
    items: [
      {
        time: "11:35",
        title: "長榮航空入境手續",
        desc: "搭乘長榮 BR1194 班機 (08:20 桃園 T2 起飛 ➔ 11:35 抵達釜山)，辦理入境與提領 8 個大行李箱。",
        icon: "🛬",
        badges: ["釜山機場", "抵達"],
        badgeType: "transport",
        transport: "✈️ 長榮 BR1194 (08:20 桃園出發)",
        mapUrl: "https://www.google.com/maps/search/?api=1&query=Gimhae+International+Airport"
      },
  {
        time: "12:30 - 13:15",
        title: "專車接送行李寄放",
        desc: "叫 2 台 Kakao T Venti 大型計程車直達飯店寄放行李與辦理預備手續，避免行李塞不下。",
        icon: "🚕",
        badges: ["計程車", "飯店入住"],
        badgeType: "hotel",
        transport: "🚕 Kakao T Venti 包車 (約 35 分鐘 / 預估車資 ₩25,000-30,000/台 / 約 NT$ 600-720)",
        mapUrl: "https://www.google.com/maps/search/?api=1&query=Toyoko+Inn+Busan+Station+No.1"
      },
  {
        time: "13:20 - 14:30",
        title: "釜山必吃豬肉湯飯",
        desc: "🍲<b>【首選】本錢豬肉湯飯 (본전돼지국밥)</b> ─ 飯店步行 3 分鐘即達之釜山站必吃老店，每日 09:00–20:30 營業，湯頭濃郁鮮美 (4.1星)。<a href='https://www.google.com/maps/search/?api=1&query=Bonjeon+Dwaeji+Gukbap' target='_blank' style='color:var(--primary-glow); font-weight:bold; margin-left:5px;'>📍 本錢地圖</a><br>💡<b>【防排隊備案 A】大建名家 (대건명가돼지국밥)</b> ─ 採用純豬骨慢火燉煮呈乳白色，口感濃郁無腥味，每日 07:00–22:00 營業 (4.4星)。<a href='https://www.google.com/maps/search/?api=1&query=%EB%8C%80%EA%B1%B4%EB%AA%85%EA%B0%80%EB%8F%BC%EC%A7%80%EA%B5%AD%EB%B0%A5' target='_blank' style='color:var(--primary-glow); font-weight:bold; margin-left:5px;'>📍 大建名家地圖</a><br>💡<b>【防排隊備案 B】草梁知名辣炒豬肉包飯 (소문난 불백)</b> ─ 草梁名店，鐵板現炒鹹香微辣醃豬肉，全天候 24 小時營業 (4.4星)。<a href='https://www.google.com/maps/search/?api=1&query=%EC%86%8C%EB%AC%B8%EB%82%9C+%EB%B6%88%EB%B0%B1' target='_blank' style='color:var(--primary-glow); font-weight:bold; margin-left:5px;'>📍 草梁辣炒豬肉地圖</a>",
        icon: "🍲",
        badges: ["豬肉湯飯", "大建名家", "辣炒豬肉"],
        badgeType: "food",
        transport: "🚶 飯店步行 3 分鐘",
        mapUrl: "https://www.google.com/maps/search/?api=1&query=Bonjeon+Dwaeji+Gukbap"
      },
  {
        time: "15:00 - 18:00",
        title: "光復路時尚街 (換錢與購物)",
        desc: "抵達光復路後，首先前往民間換錢所用台幣換韓元，接著開逛 Olive Young 兩大門市：<br>✨ <b>Olive Young Gwangbok Town</b>：南浦洞 BIFF 廣場旁。<a href='https://www.google.com/maps/search/?api=1&query=Olive+Young+Gwangbok+Town' target='_blank' style='color:var(--primary-glow); font-weight:bold; margin-left:5px;'>📍 地圖</a><br>✨ <b>Olive Young Busan Nampo</b>：光復路美妝街上，品項齊全！<a href='https://www.google.com/maps/search/?api=1&query=Olive+Young+Busan+Nampo' target='_blank' style='color:var(--primary-glow); font-weight:bold; margin-left:5px;'>📍 地圖</a><br>💵 <b>推薦換錢所：</b><a href='https://www.google.com/maps/search/?api=1&query=Woori+Exchange+Busan' target='_blank' style='color:var(--primary-glow); font-weight:bold; margin-left:5px;'>📍 友利/映珍 換錢所 (兩家緊鄰)</a>",
        icon: "🛍️",
        badges: ["南浦洞", "光復路", "換錢"],
        badgeType: "sight",
        transport: "🚕 強烈建議搭計程車：車程約 5 分鐘直達換錢所 (預估車資 ₩5,500/台，8人搭 2 台約 NT$ 260，每人僅 NT$ 32！免去步行 20 分鐘保護長輩體力)",
        mapUrl: "https://www.google.com/maps/search/?api=1&query=Gwangbok-ro+Fashion+Street"
      },
  {
        time: "18:00 - 19:30",
        title: "南浦美食大賞 (南浦雪濃湯 / 三煥畜產 / 百花烤腸)",
        desc: "🥣<b>【方案 A (清爽)】南浦雪濃湯</b> - 長時間熬煮雪白高湯，清爽暖胃 (4.2星)。<a href='https://www.google.com/maps/search/?api=1&query=%EB%82%A8%ED%8F%AC%EC%85%A4%EB%A6%89%ED%83%95' target='_blank' style='color:var(--primary-glow); font-weight:bold; margin-left:5px;'>📍 南浦雪濃湯地圖</a><br>🥩<b>【方案 B (燒肉)】三煥畜產</b> - 超高 CP 值熟成豬肉與韓牛，肉質紅潤厚實 (4.3星)。<a href='https://www.google.com/maps/search/?api=1&query=%EC%82%BC%ED%99%A1%EC%B6%95%EC%82%B0+%EB%82%A8%ED%8F%AC%EC%A0%90' target='_blank' style='color:var(--primary-glow); font-weight:bold; margin-left:5px;'>📍 三煥畜產地圖</a><br>🔥<b>【方案 C (烤腸)】百花烤腸</b> - 札嘎其市場旁傳統炭火爐烤牛腸，復古煙火氣 (4.0星)。<a href='https://www.google.com/maps/search/?api=1&query=%EB%B0%B1%ED%99%94%EC%96%91%EA%B3%B1%EC%B0%BD' target='_blank' style='color:var(--primary-glow); font-weight:bold; margin-left:5px;'>📍 百花烤腸地圖</a>",
        icon: "🍲",
        badges: ["南浦雪濃湯", "三煥畜產", "百花烤腸"],
        badgeType: "food",
        transport: "🚶 南浦洞商圈內步行即達",
        mapUrl: "https://www.google.com/maps/search/?api=1&query=%EB%82%A8%ED%8F%AC%EC%85%A4%EB%A6%89%ED%83%95"
      },
  {
        time: "19:30 - 21:00",
        title: "釜山塔觀景台登頂 (🎫 BIG 5 - B區 No. 8)",
        desc: "搭乘光復路手扶梯上山，憑 Pass 免費兌換門票登上釜山塔觀景台，俯瞰 360 度釜山港夜景與璀璨燈火。",
        icon: "🗼",
        badges: ["龍頭山公園", "釜山塔", "夜景"],
        badgeType: "sight",
        transport: "🚶 光復路手扶梯上山",
        mapUrl: "https://www.google.com/maps/search/?api=1&query=Yongdusan+Park+Busan"
      }
    ]
  },
  { day: 2, 
    date: "8/10（一）",
    subTitle: "Klook 專車一日遊 · 膠囊列車 · 白淺灘 · 晚餐",
    title: "Klook 專車 (天空膠囊列車 ➔ 五六島 ➔ 白淺灘 ➔ 甘川洞) ➔ 晚餐彈性選 ➔ 東橫INN",
    items: [
      {
        time: "08:40 - 09:00",
        title: "Klook B方案KTX釜山站集合",
        desc: "於 KTX 釜山站 1 號出口集合搭乘 Klook 專車（憑證號：KLK5807654069 / 訂單號：VTR876120），輕鬆出發往海雲台。",
        icon: "🚌",
        badges: ["Klook專車", "KTX釜山站"],
        badgeType: "transport",
        transport: "🚶 步行至釜山站 1號出口",
        mapUrl: "https://www.google.com/maps/search/?api=1&query=Busan+Station"
      },
  {
        time: "10:00 - 13:00",
        title: "海雲台藍線公園 (天空膠囊列車3小時體驗)",
        desc: "搭乘彩色天空膠囊列車飽覽海岸線全景！導遊說明後，於海雲台沿岸及藍線公園自由散策並享用海邊午餐。",
        icon: "🚃",
        badges: ["天空膠囊列車", "海雲台海岸"],
        badgeType: "sight",
        transport: "🚌 Klook 旅遊專車接送",
        mapUrl: "https://www.google.com/maps/search/?api=1&query=Haeundae+Blueline+Park+Mipo"
      },
  {
        time: "13:30 - 14:30",
        title: "五六島天空步道 (Oryukdo Skywalk)",
        desc: "站在 35 公尺高的懸崖玻璃步道上，腳下即是波濤洶湧的大海。天氣好時還能遠眺對馬島，感受海天一色的壯闊。",
        icon: "🌊",
        badges: ["天空步道", "絕美海景"],
        badgeType: "sight",
        transport: "🚌 Klook 旅遊專車接送",
        mapUrl: "https://www.google.com/maps/search/?api=1&query=Oryukdo+Skywalk+Busan"
      },
  {
        time: "15:00 - 16:10",
        title: "白淺灘文化村 (Huinnamyeol Culture Village)",
        desc: "被譽為釜山聖托里尼的網美小白屋聚落。沿著絕美海岸線散步，並拍攝彩虹階梯。",
        icon: "🏠",
        badges: ["聖托里尼", "海景漫步"],
        badgeType: "sight",
        transport: "🚌 Klook 旅遊專車接送",
        mapUrl: "https://www.google.com/maps/search/?api=1&query=Huinnamyeol+Culture+Village"
      },
  {
        time: "16:30 - 17:40",
        title: "甘川洞文化村 (Gamcheon Culture Village)",
        desc: "釜山馬丘比丘！七彩積木彩繪小屋聚落，尋找經典小王子與狐狸合照，俯瞰山城與港灣美景。",
        icon: "🎨",
        badges: ["小王子", "七彩山城"],
        badgeType: "sight",
        transport: "🚌 Klook 旅遊專車接送",
        mapUrl: "https://www.google.com/maps/search/?api=1&query=Gamcheon+Culture+Village+Busan"
      },
  {
        time: "18:00 - 20:00",
        title: "抵達釜山站 ➔ 晚餐三選一方案 (富慶辣炒豬肉 vs 大建名家 vs BHC炸雞)",
        desc: "🐷<b>【首選】富慶辣炒豬肉 (Bugyeongbulbaek)</b> ─ 草梁必吃30年老字號辣炒豬肉包飯街，炭香濃郁下飯。評分4.2星。<a href='https://www.google.com/maps/search/?api=1&query=Bugyeongbulbaek' target='_blank' style='color:var(--primary-glow); font-weight:bold; margin-left:5px;'>📍 富慶辣炒豬肉地圖</a><br>🥣<b>【備案 B】大建名家 豬肉湯飯 (Daegeon Myeongga)</b> ─ 湯頭純淨無腥味，薄切豬肉片鮮嫩無比。評分4.1星。<a href='https://www.google.com/maps/search/?api=1&query=Daegeon+Myeongga' target='_blank' style='color:var(--primary-glow); font-weight:bold; margin-left:5px;'>📍 大建名家地圖</a><br>🍗<b>【備案 C】BHC Chicken (BHC炸雞 釜山站店)</b> ─ 離飯店極近，外帶經典芝士/蒜香炸雞當宵夜。評分4.6星。<a href='https://www.google.com/maps/search/?api=1&query=BHC+Chicken+Busan+Station' target='_blank' style='color:var(--primary-glow); font-weight:bold; margin-left:5px;'>📍 BHC炸雞地圖</a>",
        icon: "🍽️",
        badges: ["富慶辣炒豬肉", "大建名家", "BHC炸雞"],
        badgeType: "food",
        transport: "🚗 專車行程結束後，前往餐廳",
        mapUrl: "https://www.google.com/maps/search/?api=1&query=Bugyeongbulbaek"
      },
  {
        time: "20:30 - 21:30",
        title: "返程 ➔ 返回東橫INN飯店休息",
        desc: "步行返回飯店，整理行李並充分休息，準備明天的西面與南浦之旅。",
        icon: "🏨",
        badges: ["返回飯店", "休息"],
        badgeType: "hotel",
        transport: "🚶 晚餐後步行返回飯店",
        mapUrl: "https://www.google.com/maps/search/?api=1&query=Toyoko+Inn+Busan+Station+No.1"
      }
    ]
  },
  { day: 3, 
    date: "8/11（二）",
    subTitle: "SPA LAND · Snoopy海景咖啡 · Marine City散步 · 晚餐四選一",
    title: "Centum City SPA LAND ➔ Snoopy Place ➔ Marine City 散步 ➔ 廣安里晚餐四選一",
    items: [
      {
        time: "10:30 - 14:00",
        title: "SPA LAND 汗蒸幕 (新世界 Centum City 店)",
        desc: "【六星級放鬆】韓國頂級奢華汗蒸幕！體驗 13 種主題桑拿房、戶外露天足浴與甜米露洗禮。<br><br>🥤<b>【經典汗蒸幕必吃小吃】(1樓 Snack Bar)</b><br>• 甜米露 (식혜 / Sikhye) ─ 冰涼清甜、淡淡米香，剛蒸完桑拿補充水分極為過癮。<br>• 烤雞蛋 (맥반석 계란) ─ 麥飯石烘烤，蛋白Q彈、微帶烘焙香，沾鹽巴吃是經典體驗。<br><br>🍲<b>【午餐正餐首選】(2樓 韓式餐廳)</b><br>• 全州石鍋拌飯 (돌솥비빔밥) ─ 熱騰騰石鍋與豐富蔬菜及特製辣椒醬，焦香鍋巴酥脆。<br>• 韓式海鮮嫩豆腐鍋 (해물순두부찌개) ─ 湯頭鮮辣滾燙，豆腐滑嫩，汗蒸完非常開胃。<br>• 牛肉雪濃湯 / 美味排骨湯 (갈비탕) ─ 不吃辣極佳選擇，牛肉湯清甜濃郁，附泡菜。<br>• 韓式炸豬排 (돈까스) ─ 外皮香酥、肉質厚實，很受大人小孩歡迎。",
        icon: "♨️",
        badges: ["頂級汗蒸幕", "天然溫泉"],
        badgeType: "sight",
        transport: "🚕 飯店搭計程車約 20 分鐘 (預估車資 ₩12,000 / 台)",
        mapUrl: "https://www.google.com/maps/search/?api=1&query=Spa+Land+Centum+City"
      },
  {
        time: "14:30 - 16:30",
        title: "Snoopy Place Busan (海雲台店)",
        desc: "位在海雲台海岸沿線，打卡巨大衝浪史努比雕像、享用史努比造型蛋糕與香濃咖啡，享受悠閒時光！",
        icon: "☕",
        badges: ["史努比主題", "海景咖啡"],
        badgeType: "shop",
        transport: "🚕 Centum City 搭計程車約 12 分鐘 (預估車資 ₩7,500/台)",
        mapUrl: "https://www.google.com/maps/search/?api=1&query=Snoopy+Place+Busan"
      },
  {
        time: "17:00 - 18:30",
        title: "Marine City 摩天大樓海岸步道",
        desc: "釜山曼哈頓水岸步道，沿海欣賞豪宅摩天大樓與落日餘暉海景。",
        icon: "🏙️",
        badges: ["摩天大樓群", "廣安大橋"],
        badgeType: "sight",
        transport: "🚕 搭計程車約 10 分鐘 (車資 ₩6,000)",
        mapUrl: "https://www.google.com/maps/search/?api=1&query=Gwangalli+Beach+Busan"
      },
  {
        time: "18:45 - 21:00",
        title: "廣安里晚餐四選一方案 (海景餐酒館 vs 熟成烤肉 vs 韓牛 vs 辣炒章魚)",
        desc: "🍷<b>【首選】CLAM (廣安里海邊第一排美式/西班牙餐酒館)</b> ─ 戶外及玻璃座直面廣安大橋夜景，享用西班牙Tapas、海鮮燉飯與精釀啤酒。評分4.3星。<a href='https://www.google.com/maps/search/?api=1&query=Clam+Gwangalli+Busan' target='_blank' style='color:var(--primary-glow); font-weight:bold; margin-left:5px;'>📍 CLAM地圖</a><br>🥩<b>【備案 A】Gwanganmok (廣安木 熟成豬肉專賣)</b> ─ 厚切熟成烤肉，火候完美，專人代烤。離海灘幾步之遙。評分4.7星。<a href='https://www.google.com/maps/search/?api=1&query=Gwanganmok' target='_blank' style='color:var(--primary-glow); font-weight:bold; margin-left:5px;'>📍 廣安木地圖</a><br>🍖<b>【備案 B】廣安里彥陽烤肉 釜山家 (언양불고기 부산집)</b> ─ 嚴選高品質韓牛炭火烘烤，肉嫩多汁有炭香味，專人代烤. 評分4.2星。<a href='https://www.google.com/maps/search/?api=1&query=Gwangan-ri+Eonyang+Bulgogi+Busan+House' target='_blank' style='color:var(--primary-glow); font-weight:bold; margin-left:5px;'>📍 彥陽烤肉地圖</a><br>🐙<b>【備案 C】윤슬낙지 (尹瑟章魚 / 辣炒章魚鍋)</b> ─ 釜山道地辣炒章魚蝦子牛腸鍋 (낙곱새)，食材鮮美，微辣過癮。評分5.0星。<a href='https://www.google.com/maps/search/?api=1&query=%ec%9c%a4%ec%8a%ac%eb%82%99%ec%a7%80' target='_blank' style='color:var(--primary-glow); font-weight:bold; margin-left:5px;'>📍 尹瑟章魚地圖</a>",
        icon: "🌉",
        badges: ["廣安大橋夜景", "晚餐四選一", "CLAM餐酒館"],
        badgeType: "food",
        transport: "🚕 從 Marine City 搭計程車約 10 分鐘 (預估車資 ₩6,000/台)",
        mapUrl: "https://www.google.com/maps/search/?api=1&query=Clam+Gwangalli+Busan"
      }
    ]
  },
  { day: 4, 
    date: "8/12（三）",
    subTitle: "海邊古剎 · 斜坡滑車 · 大蟹萬燦松葉蟹 · Outlet 購物",
    title: "海東龍宮寺 ➔ Skyline Luge 斜坡滑車 ➔ 午餐雙方案 (大蟹萬燦松葉蟹 vs Diomea海景鮑魚粥) ➔ Ananti Cove 廊道 ➔ 樂天 Outlet 購物",
    items: [
      {
        time: "09:00 - 10:30",
        title: "海東龍宮寺 (Haedong Yonggungsa Temple)",
        desc: "全韓國唯一建在海邊斷崖上的礁岩古剎，氣氛能讓人慢下來看海、拜佛（免費參觀）。",
        icon: "🏯",
        badges: ["海邊古剎", "沉澱心靈"],
        badgeType: "sight",
        transport: "🚕 飯店搭計程車直達約 40 分鐘 (約 ₩25,000 / 台)",
        mapUrl: "https://www.google.com/maps/search/?api=1&query=Haedong+Yonggungsa+Temple"
      },
  {
        time: "10:45 - 12:45",
        title: "【高評價強推】釜山斜坡滑車 (Skyline Luge 釜山)",
        desc: "玩兩次約 30,000 韓元（可用 PASS 兌換）。全長 2.4 公里、高低差 100 公尺，刺激好玩，搭乘纜車上去視野開闊，被評為釜山必玩！",
        icon: "🏎️",
        badges: ["斜坡滑車", "必玩景點"],
        badgeType: "sight",
        transport: "🚕 龍宮寺搭車 5 分鐘即達 (車資 ₩4,500)",
        mapUrl: "https://www.google.com/maps/search/?api=1&query=Skyline+Luge+Busan"
      },
  {
        time: "13:00 - 15:00",
        title: "午餐雙方案彈性選擇 (大蟹萬燦松葉蟹 vs Diomea海景鮑魚粥)",
        desc: "🦀<b>【方案 A (豪氣海景松葉蟹大餐)】Daege Manchan (大蟹萬燦 / 대게만찬)</b> ─ 滑車搭計程車5分，現場秤重活松葉蟹現蒸，附靈魂蟹膏炒飯與海景包廂。評分4.2星。<a href='https://www.google.com/maps/search/?api=1&query=Daege+Manchan' target='_blank' style='color:var(--primary-glow); font-weight:bold; margin-left:5px;'>📍 大蟹萬燦地圖</a><br>🥣<b>【方案 B (舒適無負擔)】Diomea (디오메아 / 海景鮑魚料理專賣)</b> ─ 滑車搭計程車7分，位於Ananti步道旁，主打深濃綠色內臟鮑魚粥與澎湃海鮮拉麵。評分4.5星。<a href='https://www.google.com/maps/search/?api=1&query=Diomea' target='_blank' style='color:var(--primary-glow); font-weight:bold; margin-left:5px;'>📍 Diomea地圖</a>",
        icon: "🦀",
        badges: ["大蟹萬燦松葉蟹", "Diomea海景鮑魚粥"],
        badgeType: "food",
        transport: "🚕 從滑車處搭計程車約 5-7 分鐘 (大蟹萬燦約 ₩5,000 / Diomea 約 ₩6,000)",
        mapUrl: "https://www.google.com/maps/search/?api=1&query=Daege+Manchan"
      },
  {
        time: "15:00 - 16:30",
        title: "Ananti Cove 奢華海景廊道 & 海景咖啡廳",
        desc: "釜山頂級度假村沿海廊道，在挑高冷氣海景咖啡廳享用下午茶，拍照極具高級質感（人均約 NT$ 288-432）。",
        icon: "🌊",
        badges: ["奢華渡假村", "極美海景"],
        badgeType: "sight",
        transport: "🚶 步行前往",
        mapUrl: "https://www.google.com/maps/search/?api=1&query=Ananti+Cove+Busan"
      },
  {
        time: "16:45 - 19:00",
        title: "【露天 Outlet】東釜山樂天 Outlet",
        desc: "希臘聖托里尼風格超大型 Outlet，運動品牌（Nike, Adidas, NB）與韓國在地休閒品牌常有 3~5 折折扣。",
        icon: "🏷️",
        badges: ["露天Outlet", "品牌折扣"],
        badgeType: "shop",
        transport: "🚕 搭計程車約 5 分鐘",
        mapUrl: "https://www.google.com/maps/search/?api=1&query=Lotte+Premium+Outlets+Dongbusan"
      },
  {
        time: "19:30 - 21:00",
        title: "晚餐雙彈性方案：奧西利亞直吃 vs 返回市區享用",
        desc: "🍽️<b>【方案 A (奧西利亞園區直吃)】</b><br>🥩<b>備案 1 (Anmok 奧西利亞店 / 안목)</b> ─ 米其林必比登推薦清爽豬肉湯飯，薄切專利。評分4.5星。<a href='https://www.google.com/maps/search/?api=1&query=Anmok+Osiria' target='_blank' style='color:var(--primary-glow); font-weight:bold; margin-left:5px;'>📍 Anmok湯飯地圖</a><br>🍖<b>備案 2 (廣安木 機張店 / 광안목 기장점)</b> ─ 桌邊代烤熟成五花肉與梅花肉，大快朵頤。評分4.6星。<a href='https://www.google.com/maps/search/?api=1&query=Gwang-anmok+Gijang' target='_blank' style='color:var(--primary-glow); font-weight:bold; margin-left:5px;'>📍 廣安木烤肉地圖</a><br><br>🚗<b>【方案 B (返回市區/飯店周邊享用)】</b><br>🍲<b>備案 1 (南浦雪濃湯 / Nampo Seolleongtang)</b> ─ 24小時營業，乳白色牛骨高湯，溫潤舒緩疲勞。評分4.2星。<a href='https://www.google.com/maps/search/?api=1&query=Nampo+Seolleongtang' target='_blank' style='color:var(--primary-glow); font-weight:bold; margin-left:5px;'>📍 南浦雪濃湯地圖</a><br>🍗<b>備案 2 (BHC炸雞 釜山站店 / BHC치킨 부산역점)</b> ─ 離飯店極近，外帶招牌芝士/蒜香炸雞回房當宵夜。營業至24:00。評分4.6星。<a href='https://www.google.com/maps/search/?api=1&query=BHC+Chicken+Busan+Station' target='_blank' style='color:var(--primary-glow); font-weight:bold; margin-left:5px;'>📍 BHC炸雞地圖</a>",
        icon: "🍽️",
        badges: ["奧西利亞直吃", "回市區宵夜", "晚餐雙方案"],
        badgeType: "food",
        transport: "🚗 方案A：搭車 3-5 分鐘即達；方案B：搭計程車約 40 分鐘返回市區",
        mapUrl: "https://www.google.com/maps/search/?api=1&query=Anmok+Osiria"
      },
  {
        time: "21:00 - 22:00",
        title: "返程 ➔ 返回東橫INN飯店休息",
        desc: "結束東釜山一日遊，搭計程車或於晚餐後返回釜山站東橫INN飯店充分休息。",
        icon: "🏨",
        badges: ["返回飯店", "充分休息"],
        badgeType: "hotel",
        transport: "🚕 計程車約 40 分鐘 (約 ₩30,000 / 台 / 約 NT$ 720)",
        mapUrl: "https://www.google.com/maps/search/?api=1&query=Toyoko+Inn+Busan+Station+No.1"
      }
    ]
  },
  { day: 5, 
    date: "8/13（四）",
    subTitle: "松島纜車 · 午餐三方案 · 影島光影展 · 樂天採買",
    title: "松島海上纜車 ➔ 帝王蟹/海鮮定食三方案 ➔ ARTE MUSEUM ➔ 樂天超市 ➔ 晚餐四選一",
    items: [
      {
        time: "10:00 - 12:30",
        title: "松島海上纜車 & 松島龍宮雲橋",
        desc: "搭乘水晶透明車廂跨越 1.62 公里汪洋大海，再走上連接無人島的懸崖龍宮雲橋。",
        icon: "🚠",
        badges: ["水晶纜車", "龍宮雲橋"],
        badgeType: "sight",
        transport: "🚕 飯店搭計程車約 15 分鐘 (預估車資 ₩12,000/台)",
        mapUrl: "https://www.google.com/maps/search/?api=1&query=Songdo+Marine+Cable+Car"
      },
  {
        time: "12:30 - 15:00",
        title: "午餐三方案彈性選擇 (新東亞帝王蟹 vs 札嘎其帝王蟹 vs 避膩海鮮定食)",
        desc: "🦀<b>【方案 A (首選)】新東亞水產市場 (8號 華僑攤位)</b> ─ 中文溝通親切，免代蒸費與人頭費，大方送蟹膏炒飯與小菜，CP值最高！<a href='https://www.google.com/maps/search/?api=1&query=Shin+Dong-A+Market+Busan' target='_blank' style='color:var(--primary-glow); font-weight:bold; margin-left:5px;'>📍 地圖</a><br>🦀<b>【方案 B (海景)】札嘎其水產大樓 (渡邊水產)</b> ─ 1樓買蟹、2樓海景餐廳享用，送生魚片拼盤 (需加收代蒸/人頭費)。<a href='https://www.google.com/maps/search/?api=1&query=Jagalchi+Market+Busan' target='_blank' style='color:var(--primary-glow); font-weight:bold; margin-left:5px;'>📍 地圖</a><br>🦪<b>【方案 C (清爽)】南浦洞韓式烤魚/海鮮湯</b> ─ 若不吃大蟹時的避膩定食選擇。<a href='https://www.google.com/maps/search/?api=1&query=Nampo-dong+Gwangbok-ro+Busan' target='_blank' style='color:var(--primary-glow); font-weight:bold; margin-left:5px;'>📍 地圖</a>",
        icon: "🦀",
        badges: ["新東亞水產", "札嘎其大樓", "韓式烤魚"],
        badgeType: "food",
        transport: "🚕 搭計程車約 10-15 分",
        mapUrl: "https://www.google.com/maps/search/?api=1&query=%EC%8B%A0%EB%8F%99%EC%95%84%EC%88%98%EC%82%B0%EB%AC%BC%EC%A2%85%ED%95%A9%EC%8B%9C%EC%9E%A5"
      },
  {
        time: "15:00 - 17:00",
        title: "ARTE MUSEUM Busan 影島光影展",
        desc: "【2024全新開幕】體驗全球最大沉浸式數位自然藝術展，極致絢麗的光影海浪與花海波浪！",
        icon: "🖼️",
        badges: ["沉浸光影", "最新景點"],
        badgeType: "sight",
        transport: "🚕 札嘎其市場搭計程車約 12 分鐘直達 (預估車資 ₩7,000/台)",
        mapUrl: "https://www.google.com/maps/search/?api=1&query=Arte+Museum+Busan"
      },
  {
        time: "17:00 - 17:30",
        title: "樂天百貨光復店 13樓 高空露台",
        desc: "免費登上空中庭園露台，360 度俯瞰影島大橋與釜山港港灣全貌。",
        icon: "🏢",
        badges: ["高空露台", "港灣美景"],
        badgeType: "sight",
        transport: "🚕 從 Arte Museum 搭車返回樂天百貨",
        mapUrl: "https://www.google.com/maps/search/?api=1&query=Lotte+Department+Store+Gwangbok"
      },
  {
        time: "17:30 - 19:00",
        title: "樂天超市 光復店 (Lotte Mart) 大採購",
        desc: "買齊零食、海苔、泡麵與韓國伴手禮，現場提供退稅服務。",
        icon: "🛒",
        badges: ["伴手禮採購", "現場退稅"],
        badgeType: "shop",
        transport: "🚶 樂天百貨 B1 直通超市",
        mapUrl: "https://www.google.com/maps/search/?api=1&query=Lotte+Mart+Gwangbok+Busan"
      },
  {
        time: "19:00 - 20:45",
        title: "晚餐四選一方案 (味贊王烤肉 vs 熟成到黑豬肉 vs 烤豬肉麵 vs 百花烤腸)",
        desc: "🥩<b>【首選】Matchandeul Wang Sogeum Gui Bupyeong (味贊王鹽烤肉 富平店)</b> ─ 3.5cm 厚切熟成豬五花與梅花肉，專人桌邊代烤，大醬湯口碑極佳。評分4.2星。<a href='https://www.google.com/maps/search/?api=1&query=Matchandeul+Wang+Sogeum+Gui+Bupyeong' target='_blank' style='color:var(--primary-glow); font-weight:bold; margin-left:5px;'>📍 味贊王地圖</a><br>🐖<b>【備案 A】숙성도 부산부평점 (熟成到 釜山富平店)</b> ─ 濟州島頂級熟成黑豬肉，香氣與多汁感極佳，專人代烤。評分4.4星。<a href='https://www.google.com/maps/search/?api=1&query=Sukseongdo+Bupyeong' target='_blank' style='color:var(--primary-glow); font-weight:bold; margin-left:5px;'>📍 熟成到地圖</a><br>🍜<b>【備案 B】도야지면옥 (Doyaji Myeonok 富平店)</b> ─ 切片烤豬肉、熟成五花肉與白湯豬肉麵聞名，出餐迅速。評分4.2星。<a href='https://www.google.com/maps/search/?api=1&query=Doyaji+Myeonok+Bupyeong' target='_blank' style='color:var(--primary-glow); font-weight:bold; margin-left:5px;'>📍 Doyaji地圖</a><br>🐙<b>【備案 C】백화양곱창 (百花烤腸)</b> ─ 老字號炭烤牛腸與燒肉店，阿姨專人代烤，炭香味濃郁。評分4.0星。<a href='https://www.google.com/maps/search/?api=1&query=Baekhwa+Yanggopchang' target='_blank' style='color:var(--primary-glow); font-weight:bold; margin-left:5px;'>📍 百花烤腸地圖</a>",
        icon: "🥩",
        badges: ["味贊王鹽烤肉", "熟成到", "Doyaji豬肉麵", "百花烤腸"],
        badgeType: "food",
        transport: "🚕 建議搭計程車約 3-5 分鐘直達 (車資 ₩5,000/台)；或步行約 15-18 分鐘",
        mapUrl: "https://www.google.com/maps/search/?api=1&query=Matchandeul+Wang+Sogeum+Gui+Bupyeong"
      },
  {
        time: "20:45 - 21:30",
        title: "BIFF 廣場 ➔ 散步回飯店",
        desc: "品嚐香酥滿滿堅果餡料的黑糖餅作為最佳晚餐甜點，隨後返回飯店休息。",
        icon: "🥞",
        badges: ["BIFF廣場", "堅果黑糖餅"],
        badgeType: "food",
        transport: "🚶 燒肉店步行約 3 分鐘至 BIFF 廣場",
        mapUrl: "https://www.google.com/maps/search/?api=1&query=BIFF+Square+Busan"
      }
    ]
  },
  { day: 6, 
    date: "8/14（五）",
    subTitle: "退房 ➔ 專車直達機場 ➔ 免稅店 ➔ 滿載而歸",
    title: "飯店 Check-out ➔ 金海機場辦理退稅購物 ➔ 搭乘長榮 BR1193 返台",
    items: [
      {
        time: "07:30 - 09:00",
        title: "飯店辦理退房 & 享用早餐",
        desc: "東橫 INN 享用免費早餐、完成 8 件大行李打包並辦理退房手續。",
        icon: "🏨",
        badges: ["退房", "免費早餐"],
        badgeType: "sight",
        transport: "🚶 飯店大廳",
        mapUrl: "https://www.google.com/maps/search/?api=1&query=Toyoko+Inn+Busan+Station+No.1"
      },
  {
        time: "09:40 - 10:20",
        title: "專車接送直達金海機場",
        desc: "搭乘預約的 Kakao T Venti 或大型包車直達金海國際機場航廈，避開地鐵搬運。建議提早到機場以便辦理退稅。",
        icon: "🚕",
        badges: ["機場接送", "免搬行李"],
        badgeType: "sight",
        transport: "🚕 車程約 40 分鐘 (預估車資 ₩25,000-30,000 / 台)",
        mapUrl: "https://www.google.com/maps/search/?api=1&query=Gimhae+International+Airport"
      },
  {
        time: "10:20 - 12:45",
        title: "金海機場辦理登機 & 退稅 ➔ 登機返台",
        desc: "抵達機場後辦理報到與退稅手續，隨後可逛機場免稅店。搭乘長榮 BR1193 班機於 12:45 起飛 (預計 14:10 抵達桃園 T2)，圓滿結束釜山 6 天 5 夜奢華慢遊！",
        icon: "✈️",
        badges: ["辦理退稅", "長榮 BR1193"],
        badgeType: "sight",
        transport: "✈️ 飛行時間約 2.5 小時",
        mapUrl: "https://www.google.com/maps/search/?api=1&query=Gimhae+International+Airport"
      }
    ]
  }
];

const oyProductsData = [
  {
    "id": "mediheal_mask",
    "name": "MEDIHEAL 精華面膜 10片組 (+1片 Olive Young 獨家限定版)",
    "en_name": "MEDIHEAL Essential Mask Sheet 10ea Set (+1ea)",
    "price_krw": "半價約 $13.5 USD",
    "price_twd": "約 NT$ 430",
    "category": "skincare",
    "category_zh": "面膜保養",
    "img_url": "./images/oy/oy_mediheal_mask.jpg",
    "raw_img": "https://global.oliveyoung.com/product/detail?prdtNo=GA240824996",
    "features": "多款針對不同膚況（積雪草苷/茶樹/膠原蛋白/玻尿酸/神經醯胺/維他命C/玫瑰PDRN）、Olive Young 獨家大容量加贈組合",
    "skin_type": "各種膚質均有對應款式",
    "reason": "MEDIHEAL 面膜是韓國國民級護膚必備單品。這款是 Olive Young 獨家的超高 CP 值大容量組合，並針對保濕、修護、提亮、抗痘等不同需求推出多款選擇，非常適合大量囤貨或作為伴手禮。",
    "tips": "洗臉後敷 10-20 分鐘，將剩餘精華輕拍吸收。"
  },
  {
    "id": "bringgreen_lip",
    "name": "BRINGGREEN 竹子玻尿酸護唇精華 4入組",
    "en_name": "BRINGGREEN Bamboo Hyalu Lip Essence 4pcs Set",
    "price_krw": "依現場活動為準",
    "price_twd": "依現場活動為準",
    "category": "makeup",
    "category_zh": "唇部保養",
    "img_url": "./images/oy/oy_bringgreen_lip.jpg",
    "raw_img": "https://global.oliveyoung.com/product/detail?prdtNo=GA260237872",
    "features": "竹子玻尿酸成分、高保濕修護、4入超值組",
    "skin_type": "乾燥、易脫皮唇部",
    "reason": "韓國超高人氣的開架護唇精華，含有竹水與玻尿酸保濕成分，能夠快速舒緩乾燥龜裂的雙唇，四入組合買起來非常划算，也是送禮的好選擇。",
    "tips": "日常可薄擦作為護唇膏，夜間厚敷可作為唇膜深層修護。"
  },
  {
    "id": "green_tomato",
    "name": "SUNGBOON EDITOR 綠番茄緊緻毛孔泥膜",
    "en_name": "SUNGBOON EDITOR Green Tomato Pore Clay Pack",
    "price_krw": "₩19,800 / 罐",
    "price_twd": "約 NT$ 475",
    "category": "skincare",
    "category_zh": "臉部清潔與護理",
    "img_url": "./images/oy/green_tomato_clay.jpg",
    "raw_img": "https://global.oliveyoung.com/product/detail?prdtNo=GA250228504&dataSource=search_result",
    "features": "李多慧強烈推薦代言、綠番茄專利毛孔緊緻、吸附黑頭粉刺",
    "skin_type": "毛孔粗大、易出油、有黑頭粉刺與需要角質清潔者",
    "reason": "李多慧熱烈代言與強烈推薦！在 Olive Young 爆紅的毛孔保養神物。採用專利綠番茄萃取與高嶺土泥膜，能深層吸附油脂黑頭、收斂粗大毛孔，質地濕潤滑順，洗後肌膚細緻亮白且完全不緊繃。",
    "tips": "洗臉後敷於全臉約 10-15 分鐘，待泥膜轉乾後以溫水搭配打圈輕柔洗淨，每週使用 1-2 次即可獲得驚人毛孔清潔效果。",
    "badge": "李多慧代言熱銷"
  },
  {"id": "mediheal", "name": "MEDIHEAL 精華面膜片", "en_name": "MEDIHEAL Essential Mask", "price_krw": "₩20,000 / 10片", "price_twd": "約 NT$ 476", "category": "skincare", "category_zh": "臉部護理", "img_url": "./images/oy/mediheal.jpg", "raw_img": "https://global.oliveyoung.com/product/detail?prdtNo=GA260539900&dataSource=search_result", "features": "高濃度精華、服貼度高、高CP值", "skin_type": "所有膚質，特別是缺水肌與需要曬後鎮靜者", "reason": "金針菇姐姐強烈推薦的國民面膜。精華液含量極高，面膜紙薄且貼合度優秀。在 Olive Young 購買通常有 10 片一盒的包裝，並且常常有 1+1 (買一送一) 的促銷活動，是去韓國必囤的保濕聖品。", "tips": "建議洗完臉後敷 10-15 分鐘，取下後輕輕按摩至吸收，再擦上乳液鎖水。若有醫美術後泛紅，綠色積雪草款是很好的鎮靜選擇。"},
  {"id": "biodance", "name": "Biodance 膠原蛋白深層全效面膜", "en_name": "Biodance Bio-Collagen Real Deep Mask", "price_krw": "₩19,000 / 4片", "price_twd": "約 NT$ 452", "category": "skincare", "category_zh": "臉部護理", "img_url": "./images/oy/biodance.jpg", "raw_img": "https://global.oliveyoung.com/product/detail?prdtNo=GA251235738&dataSource=search_result", "features": "水凝膠材質、敷完變透明、深層彈力", "skin_type": "乾性肌、熟齡肌、暗沉無光澤肌", "reason": "近期紅遍全球的「敷著睡覺面膜」。它是果凍般的水凝膠材質，敷上後面膜中的超低分子玻尿酸與膠原蛋白會慢慢被肌膚吸收，面膜會隨時間變為完全透明。能顯著改善毛孔與提亮膚色。", "tips": "適合在夜間保養的最後一步使用，建議敷 3-4 小時以上（甚至敷著入睡），醒來後撕下即可看見驚人的水光感與澎潤肌膚。", "badge": "熱銷斷貨王"},
  {"id": "torriden", "name": "Torriden 5D微分子玻尿酸保濕精華", "en_name": "Torriden Dive-In Serum", "price_krw": "₩22,000 / 50ml", "price_twd": "約 NT$ 524", "category": "skincare", "category_zh": "臉部護理", "img_url": "./images/oy/torriden.jpg", "raw_img": "https://global.oliveyoung.com/product/detail?prdtNo=GA260539968&dataSource=search_result", "features": "5重玻尿酸、秒速補水、清爽不黏", "skin_type": "油性肌、混合肌、極度缺水乾燥肌", "reason": "Klook 激推的補水第一名精華！在 Olive Young 連續多年榮獲精華類大賞第一名。含有5種不同分子大小的玻尿酸，能深層滲透肌膚底層，瞬間解渴。質地如水般清爽，吸收後完全不黏膩，是極致的補水神器。", "tips": "洗完臉後，在化妝水後使用 1-2 滴輕拍至全臉吸收，後續疊加面霜鎖水。夏日曬後可厚塗做修護。", "badge": "霸榜精華王"},
  {"id": "manyo", "name": "ma:nyo 魔女工廠 純淨潔顏油", "en_name": "manyo Pure Cleansing Oil", "price_krw": "₩29,000 / 200ml", "price_twd": "約 NT$ 690", "category": "skincare", "category_zh": "臉部清潔", "img_url": "./images/oy/manyo.jpg", "raw_img": "https://global.oliveyoung.com/product/detail?prdtNo=GA240724566&dataSource=search_result", "features": "天然植物油、秒乳化、溫和卸妝", "skin_type": "所有膚質、易長黑頭粉刺肌", "reason": "Klook 批踢踢極力推薦，Olive Young 長年霸榜的國民卸妝油！採用 99.9% 自然衍生植物油成分，溫和不熏眼。遇水瞬間乳化，不僅能徹底卸除濃妝與防曬，更能透過打圈按摩溫和軟化毛孔中的黑頭與髒污。", "tips": "乾手乾臉塗抹全臉按摩，再沾取少量溫水使其完全「乳化」變白，輕柔按摩 30 秒後以溫水徹底洗淨。", "badge": "回購率No.1"},
  {"id": "aestura", "name": "AESTURA Atobarrier 365 舒緩保濕乳霜", "en_name": "AESTURA Atobarrier 365 Cream", "price_krw": "₩31,000 / 80ml", "price_twd": "約 NT$ 738", "category": "skincare", "category_zh": "臉部護理", "img_url": "./images/oy/aestura.jpg", "raw_img": "https://global.oliveyoung.com/product/detail?prdtNo=GA240121573&srsltid=AfmBOor_ycl2QK76cyd-cKXXDOvAttgdduNlgnS_tC2jRMpZBy9_nQJ_", "features": "專利保濕膠囊、修護屏障、舒緩過敏", "skin_type": "敏感肌、乾性肌、肌膚壓痛/紅腫/泛紅者", "reason": "Klook 激推敏感肌救星！由愛茉莉太平洋集團推出的醫學美容護膚品牌。乳霜中含有肉眼可見的專利「Atobarrier」微小保濕膠囊，抹開後迅速融化並形成鎖水膜，修護因過敏或乾燥而受損的肌膚屏障。", "tips": "在護膚最後一步塗抹，特別適合在寒冷季節或搭飛機、乾冷國家時做深層鎖水防護。", "badge": "敏感肌神霜"},
  {"id": "unove", "name": "UNOVE 深層受損修護髮膜", "en_name": "UNOVE Deep Damage Treatment", "price_krw": "₩23,000 / 207ml", "price_twd": "約 NT$ 548", "category": "body", "category_zh": "身體保養", "img_url": "./images/oy/unove.jpg", "raw_img": "https://global.oliveyoung.com/product/detail?prdtNo=GS260540514&dataSource=search_result", "features": "高濃度蛋白質、沙龍級修護、香氣迷人", "skin_type": "受損髮質、染燙後毛躁分岔、粗糙無光澤髮質", "reason": "Klook 強力推薦，去韓國必囤的沙龍級髮品！Dr.FORHAIR 旗下專攻受損髮的品牌。富含 30,000ppm 高濃度蛋白質，能瞬間撫平毛躁，讓頭髮恢復絲滑柔順的光澤，香氣是溫柔的法式玫瑰與麝香。", "tips": "洗髮後稍微擰乾水分，塗抹於髮尾處並靜置 2-3 分鐘後徹底沖洗，每週使用 2-3 次即可達到深層護髮效果。", "badge": "護髮斷貨王"},
  {"id": "dokdo", "name": "Round Lab 1025 獨島化妝水", "en_name": "Round Lab 1025 Dokdo Toner", "price_krw": "₩30,000 / 500ml", "price_twd": "約 NT$ 714", "category": "skincare", "category_zh": "臉部護理", "img_url": "./images/oy/dokdo.jpg", "raw_img": "https://global.oliveyoung.com/product/detail?prdtNo=GA210002228&dataSource=search_result", "features": "鬱陵島深海水、溫和角質調理、補水清透", "skin_type": "所有膚質，包括敏感肌與易泛紅肌膚", "reason": "Klook 經典推薦！採用鬱陵島深層海水配方，富含 72 種天然礦物質，質地溫和清爽。含有專利去角質酵素，能在日常擦拭中溫和代謝老廢角質，恢復肌膚的細緻亮透。", "tips": "適合搭配化妝棉使用。每天早晚潔面後，用浸濕的化妝棉由內向外順著肌膚紋理輕輕擦拭，也可用於濕敷。", "badge": "獨島系列明星"},
  {"id": "bagel_chip", "name": "Delight Project 貝果脆片", "en_name": "Delight Project Bagel Chip", "price_krw": "₩3,500 / 包", "price_twd": "約 NT$ 83", "category": "lifestyle", "category_zh": "健康飲品", "img_url": "./images/oy/bagel_chip.jpg", "raw_img": "https://global.oliveyoung.com/product/detail?prdtNo=GA210000508&dataSource=search_result", "features": "低卡低熱量、慢火烘焙、超人氣辦公室零食", "skin_type": "喜愛零嘴但注重身材管理與低卡健康飲食者", "reason": "Klook 伴手禮極力推薦！Olive Young 的明星自有零食品牌。將真實貝果切片後塗抹奶油慢火烘焙，口感極其酥脆，有蒜香奶油、蜂蜜奶油與披薩等多種口味，熱量極低且飽足感強。", "tips": "極度推薦搭配 Teazen 康普茶一起享用，作為下午茶或宵夜，解饞又完全沒有罪惡感！", "badge": "收銀台秒殺款"},
  {"id": "beyond", "name": "Beyond 美白身體乳", "en_name": "Beyond Body Emulsion", "price_krw": "₩22,000 / 450ml", "price_twd": "約 NT$ 524", "category": "body", "category_zh": "身體保養", "img_url": "./images/oy/beyond.jpg", "raw_img": "https://global.oliveyoung.com/product/detail?prdtNo=GA260741898&dataSource=search_result", "features": "溫和草本、高級白麝香、深層鎖水", "skin_type": "所有膚質、身體肌膚乾燥脫屑者", "reason": "LG 生活健康旗下的環保自然品牌。這款身體乳以療癒且高級的「白麝香」香氣聞名，質地乳爽不黏膩，保濕度極佳，能修護乾燥的肌膚屏障。", "tips": "每天洗澡後，在身體微濕時塗抹，保濕與持香效果最佳。"},
  {"id": "yunjac", "name": "Yunjac 然植亞保濕底霜", "en_name": "Yunjac Base Prep", "price_krw": "₩48,000 / 40ml", "price_twd": "約 NT$ 1,143", "category": "makeup", "category_zh": "彩妝與定妝", "img_url": "./images/oy/yunjac.jpg", "raw_img": "https://global.oliveyoung.com/product/detail?prdtNo=GA260540541&dataSource=search_result", "features": "底妝膠水、防護隔離、透亮光澤", "skin_type": "乾性肌、混合偏乾、底妝容易浮粉起皮者", "reason": "高端草本護膚品牌推出的妝前精華。被譽為「乾皮親媽」與「化妝師的秘密武器」，質地如水般輕盈，能迅速覆平臉部角質，讓後續不論是粉底液還是氣墊粉餅都非常貼合，展現高級的水光感。", "tips": "在防曬後、底妝前，取 2-3 滴均勻塗抹於全臉，特別是易卡粉的鼻翼與兩頰，輕拍至微黏狀態再上底妝。", "badge": "美妝大賞第一"},
  {"id": "obge", "name": "OBgE 自然防曬棒", "en_name": "OBgE Natural Light Sunstick", "price_krw": "₩24,900 / 18g", "price_twd": "約 NT$ 593", "category": "skincare", "category_zh": "防曬護理", "img_url": "./images/oy/obge.jpg", "raw_img": "https://global.oliveyoung.com/product/detail?prdtNo=GA250430215&dataSource=search_result", "features": "不沾手、清爽控油、不泛白", "skin_type": "所有膚質、混合偏油、男士、喜愛戶外活動者", "reason": "韓國男士理容第一品牌推出的防曬棒，女生也非常愛用！具備 SPF50+/PA++++ 最高防曬規格。棒狀設計極為方便，完全不沾手，上臉後呈乾爽霧面，且完全不泛白、不黏膩，抗汗效果優秀。", "tips": "適合隨身攜帶，在戶外每 2-3 小時隨時塗抹補防曬。因其清爽度高，妝後輕拍補防曬也不易弄髒妝容。"},
  {"id": "the_saem", "name": "THE SAEM 三色遮瑕膏", "en_name": "THE SAEM Triple Pot Concealer", "price_krw": "₩15,000 / 盤", "price_twd": "約 NT$ 357", "category": "makeup", "category_zh": "彩妝與定妝", "img_url": "./images/oy/the_saem.jpg", "raw_img": "https://global.oliveyoung.com/product/detail?prdtNo=GA260540072&dataSource=search_result", "features": "三色調色校色、高遮瑕力、保濕不卡粉", "skin_type": "有黑眼圈、泛紅淚溝、深色痘疤需要高度精準遮瑕者", "reason": "Olive Young 超高人氣三色遮瑕盤！一盤集結膚色遮瑕、鮭魚粉（校正黑眼圈）與綠色（校正泛紅），質地膏狀絲滑保濕，服貼度極佳不卡細紋。", "tips": "先用橘粉色校正黑眼圈、綠色修飾鼻翼泛紅，最後疊加膚色遮瑕膏，能打造零瑕疵立體底妝。", "badge": "三色遮瑕王"},
  {"id": "about_tone", "name": "About Tone 柔焦控油蜜粉餅", "en_name": "About Tone Blur Powder Pact", "price_krw": "₩12,000 / 9g", "price_twd": "約 NT$ 286", "category": "makeup", "category_zh": "彩妝與定妝", "img_url": "./images/oy/about_tone.jpg", "raw_img": "https://global.oliveyoung.com/product/detail?prdtNo=GA260641155&dataSource=search_result", "features": "一秒磨皮、粉質極細、強效控油", "skin_type": "油性肌、混合肌、毛孔粗大者", "reason": "前身為風靡韓國的 Eglips 蜜粉餅。這款粉餅主打「空氣柔焦」效果，粉質如輕煙般細緻，能瞬間吸附皮脂，讓毛孔隱形，打造如陶瓷娃娃般的乾淨霧面妝效。", "tips": "使用附帶的粉撲，在底妝後輕壓在容易出油的 T 字部位、鼻翼，或用於眼周打底防暈染。"},
  {"id": "so_natural", "name": "So Natural 經典定妝噴霧", "en_name": "So Natural Make Up Fixer", "price_krw": "₩16,000 / 75ml", "price_twd": "約 NT$ 380", "category": "makeup", "category_zh": "彩妝與定妝", "img_url": "./images/oy/so_natural.jpg", "raw_img": "https://global.oliveyoung.com/product/detail?prdtNo=GA260540030&dataSource=search_result", "features": "細緻霧化、快速成膜、抗摩擦防脫妝", "skin_type": "所有膚質、混合偏油、需要長時間持妝者", "reason": "韓國定妝噴霧界的常勝冠軍，粉紅色瓶身非常具有代表性。其壓頭噴出的水霧極其細緻，不會在臉上結成水珠，能快速在底妝上形成保護膜，抗汗、抗油且防摩擦。", "tips": "化妝完成後，將噴霧距離臉部 20-30 公分，畫 'X' 和 'T' 字形噴灑全臉，靜待 1 分鐘自然風乾成膜，切勿用手拍打。"},
  {"id": "fillimilli", "name": "Fillimilli 胖胖氣墊粉撲", "en_name": "Fillimilli Cushion Puff", "price_krw": "₩5,000 / 2入", "price_twd": "約 NT$ 119", "category": "tools", "category_zh": "美妝工具", "img_url": "./images/oy/fillimilli.jpg", "raw_img": "https://global.oliveyoung.com/product/detail?prdtNo=GA210510618&dataSource=search_result", "features": "厚實有彈性、上妝服貼、省時省粉底", "skin_type": "所有使用氣墊粉餅或粉底液的化妝者", "reason": "Olive Young 自有美妝配件品牌 Fillimilli 的明星產品。這款氣墊粉撲非常厚實，彈性極佳，能將粉底均勻且輕薄地拍入肌膚，大幅提升底妝的服貼度，是去 OY 必抓好幾個回台的貼心小物。", "tips": "可用於氣墊粉餅，也適合搭配普通粉底液使用。上妝時採用「快速拍打」的方式，能讓妝效更具光澤與遮瑕力。"},
  {"id": "too_cool", "name": "Too Cool for School 修容餅", "en_name": "Too Cool for School Shading", "price_krw": "₩16,000 / 9.5g", "price_twd": "約 NT$ 380", "category": "makeup", "category_zh": "彩妝與定妝", "img_url": "./images/oy/too_cool.jpg", "raw_img": "https://global.oliveyoung.com/product/detail?prdtNo=GA230317872&dataSource=search_result", "features": "發色自然、柔滑粉質、不易失手", "skin_type": "彩妝新手、喜愛溫柔日常妝容者", "reason": "Too Cool for School 的經典美術課系列，以極佳的發色與粉質著稱。提供了極為溫柔、自然且符合亞洲人膚色的冷暖平衡色調，不易結塊且能完美修飾臉部輪廓。", "tips": "用修容刷或腮紅刷沾取後，在手背上稍微拍掉多餘粉末，再輕刷於臉頰或下顎線，可少量多次疊加。"},
  {"id": "peripera", "name": "Peripera 水光唇釉", "en_name": "Peripera Ink Mood Glowy Tint", "price_krw": "₩10,000 / 4g", "price_twd": "約 NT$ 238", "category": "makeup", "category_zh": "彩妝與定妝", "img_url": "./images/oy/peripera.jpg", "raw_img": "https://global.oliveyoung.com/product/detail?prdtNo=GA260136903&dataSource=search_result", "features": "玻璃水光感、滋潤修飾唇紋、持久顯色", "skin_type": "唇紋明顯、喜愛水光嘟嘟唇與純欲妝效者", "reason": "平價彩妝之王 Peripera 的明星水光唇釉。上嘴後會形成一層晶瑩剔透的水光膜，質地保濕不乾澀，且帶有輕微的染唇效果，不容易完全掉色，是打造網紅玻璃唇的首選。", "tips": "塗抹於雙唇後，靜待 1-2 分鐘不要抿嘴，等它自動成膜後，水光感和持久度會大幅提升。"},
  {"id": "banila_co", "name": "Banila Co 緻柔卸妝膏", "en_name": "Banila Co Clean It Zero", "price_krw": "₩20,000 / 100ml", "price_twd": "約 NT$ 476", "category": "skincare", "category_zh": "臉部清潔", "img_url": "./images/oy/banila_co.jpg", "raw_img": "https://global.oliveyoung.com/product/detail?prdtNo=GA260540552&dataSource=search_result", "features": "雪酪質地、秒乳化、溫和不緊繃", "skin_type": "所有膚質，包括敏感肌與日常化濃妝者", "reason": "風靡全球的「國民卸妝膏」。雪酪般的固體質地，接觸體溫後會瞬間融化並乳化，能溫和、徹底地卸除所有頑固的防水彩妝與毛孔髒污，且洗後完全不熏眼、不緊繃。", "tips": "保持雙手和臉部乾燥，取適量卸妝膏塗抹於臉部輕柔按摩打圈，再沾取少量清水使其完全「乳化」變白，最後用溫水徹底沖洗乾淨。"},
  {"id": "teazen", "name": "Teazen 康普茶", "en_name": "Teazen Kombucha", "price_krw": "₩7,500 / 10條", "price_twd": "約 NT$ 178", "category": "lifestyle", "category_zh": "健康飲品", "img_url": "./images/oy/teazen.jpg", "raw_img": "https://global.oliveyoung.com/product/detail?prdtNo=GA260640949&dataSource=search_result", "features": "低卡無糖、富含益生菌、清爽氣泡感", "skin_type": "注重腸道健康、想戒含糖飲料的健康追求者", "reason": "因為 BTS 成員飲用而火遍全韓的健康機能飲品。採用凍乾技術保留乳酸菌與益生元，沖泡後帶有碳酸微氣泡感，口味酸甜清爽（如檸檬、水蜜桃等），一包熱量僅 15 卡，解膩無負擔。", "tips": "用 250ml - 500ml 的冷水或冰水沖泡，氣泡感會更加強烈，喝起來就像健康的汽水，非常適合作為大餐後的消食飲料。"}
];

// 景點寫真照片資料集
const galleryPhotosData = [
  {
    title: "1. 海雲台藍線公園天空膠囊列車",
    location: "Day 2 行程：海雲台藍線公園 (尾浦 ➔ 青沙浦)",
    src: "https://bobbytravel.tw/wp-content/uploads/2025/07/20250917000451_0_63bbf1.jpg",
    desc: "《波比看世界》實景拍攝：超萌彩色天空膠囊列車懸空行駛於海濱懸崖邊，遠眺藍天海水。"
  },
  {
    title: "2. 海雲台海水浴場沙灘",
    location: "Day 2 行程：海雲台區海雲台海邊路",
    src: "https://bobbytravel.tw/wp-content/uploads/pixnet/33f02593d6cb524436ebddef9aa579cb.jpg",
    desc: "《波比看世界》實景拍攝：韓國最具代表性的美麗白沙海灘，周邊摩天大樓林立。"
  },
  {
    title: "3. 海東龍宮寺臨海古剎全景",
    location: "Day 4 行程：機張郡海東龍宮寺",
    src: "https://bobbytravel.tw/wp-content/uploads/2025/12/20251218004310_0_f3a6c2.jpg",
    desc: "《波比看世界》實景拍攝：建於礁岩石壁之上的神聖海邊古剎，海浪拍岸非常壯麗。"
  },
  {
    title: "4. 甘川洞文化村山城彩虹聚落",
    location: "Day 2 行程：沙下區甘川文化村",
    src: "https://bobbytravel.tw/wp-content/uploads/2026/01/20251126140602_0_569c43.jpg",
    desc: "《波比看世界》實景拍攝：層層疊疊的彩色小房子與小王子雕像，俯瞰山城海岸景緻。"
  },
  {
    title: "5. 松島海上纜車海景車廂",
    location: "Day 3 行程：松島海水浴場",
    src: "https://bobbytravel.tw/wp-content/uploads/2025/12/20251208102655_0_96c489.jpg",
    desc: "《波比看世界》實景拍攝：韓國第一條海上纜車，跨越 1.62 公里汪洋大海。"
  },
  {
    title: "6. 松島龍宮雲橋海景步道",
    location: "Day 3 行程：松島岩南公園對岸",
    src: "https://bobbytravel.tw/wp-content/uploads/2026/01/20251216142051_0_73adad.jpg",
    desc: "《波比看世界》實景拍攝：360度跨海步道連通無人島，踩在懸崖斷崖上極具震撼。"
  },
  {
    title: "7. 白淺灘文化村海岸步道",
    location: "Day 2 行程：影島區白淺灘文化村",
    src: "https://bobbytravel.tw/wp-content/uploads/2025/07/20250916235936_0_f75aff.jpg",
    desc: "《波比看世界》實景拍攝：藍白色調小白屋沿海步道，文青咖啡廳與彩虹階梯聚落。"
  },
  {
    title: "8. 新世界 Spa Land 奢華汗蒸幕",
    location: "Day 5 行程：新世界 Centum City 店 1F",
    src: "https://bobbytravel.tw/wp-content/uploads/2026/01/20260106101923_0_60fd9a.jpg",
    desc: "《波比看世界》實景拍攝：六星級奢華汗蒸幕設施，13種主題桑拿房與戶外溫泉足浴。"
  },
  {
    title: "9. 五六島天空步道海岸景觀",
    location: "Day 2 行程：南區五六島路",
    src: "https://bobbytravel.tw/wp-content/uploads/pixnet/7f1e572ed63347666a60876d27a9270d.jpg",
    desc: "《波比看世界》實景拍攝：建於 35 公尺懸崖邊的 U 型玻璃步道，踏在浪花之上。"
  },
  {
    title: "10. 札嘎其市場海鮮與帝王蟹攤位",
    location: "Day 3 行程：札嘎其水產市場",
    src: "https://bobbytravel.tw/wp-content/uploads/2026/03/20260318092438_0_990d37.jpg",
    desc: "《波比看世界》實景拍攝：釜山最大水產市場，現挑現蒸鮮甜肥美帝王蟹與松葉蟹。"
  }
];

const koreanLocations = [
  { zh: "金海國際機場 (PUS)", kr: "김해국제공항", addr: "부산 강서구 공항진입로 108", cat: "taxi", pinyin: "Gimhae Gukje Gonghang" },
  { zh: "東橫INN 釜山站1號店", kr: "토요코인 부산역1호점", addr: "부산 동구 중앙대로 196", cat: "hotel", pinyin: "Toyoko Inn Busan Yeok" },
  { zh: "松島海上纜車", kr: "송도해상케이블카", addr: "부산 서구 송도해변로 171", cat: "sight", pinyin: "Songdo Haesang Cable Car" },
  { zh: "釜山斜坡滑車 (Skyline Luge)", kr: "스카이라인루지 부산", addr: "부산 기장군 기장읍 기장해안로 205", cat: "sight", pinyin: "Skyline Luge Busan" },
  { zh: "SPA LAND 汗蒸幕 (新世界)", kr: "스파랜드 신세계백화점 센텀시티점", addr: "부산 해운대구 센텀남대로 35", cat: "sight", pinyin: "Spa Land Centum City" },
  { zh: "釜山 X the SKY 觀景台", kr: "부산 엑스더스카이", addr: "부산 해운대구 달맞이길 30", cat: "sight", pinyin: "Busan X the SKY" },
  { zh: "廣安里海水浴場 (海灘/餐酒館)", kr: "광안리해수욕장", addr: "부산 수영구 광안해변로 219", cat: "sight", pinyin: "Gwangalli Haesuyokjang" },
  { zh: "甘川文化村", kr: "감천문화마을", addr: "부산 사하구 감내2로 203", cat: "sight", pinyin: "Gamcheon Munhwa Maeul" },
  { zh: "味贊王鹽烤肉 富平店 (新址)", kr: "맛찬들왕소금구이 부평점", addr: "부산 중구 광복로 3", cat: "food", pinyin: "Matchandeul Bupyeong" },
  { zh: "新東亞水產市場 1樓 華僑攤位", kr: "신동아수산시장 1층", addr: "부산 중구 자갈치로 42", cat: "food", pinyin: "Shindonga Market 1F" },
  { zh: "機張黃海鮮 / 松葉蟹市場", kr: "기장시장 (대게거리)", addr: "부산 기장군 기장읍 읍내로104번길 16", cat: "food", pinyin: "Gijang Sijang Daege" },
  { zh: "西面 Olive Young 旗艦店", kr: "올리브영 부산서면타운점", addr: "부산 부산진구 중앙대로 692번길 15", cat: "shop", pinyin: "Olive Young Seomyeon Town" }
];

const koreanPhrases = [
  { zh: "請開後車廂 (放 8 個大行李箱)", kr: "트렁크 좀 열어주세요", pron: "Teureongkeu jom yeoreojuseyo", cat: "taxi" },
  { zh: "請帶我們到這個地址 (請看導航/秀圖卡)", kr: "이 주소로 가주세요", pron: "I jusoro gajuseyo", cat: "taxi" },
  { zh: "請問可以用信用卡付款嗎？", kr: "카드 결제 돼요?", pron: "Kadeu gyeolje dwaeyo?", cat: "taxi" },
  { zh: "請在這裡靠邊停就可以了", kr: "여기서 내려주세요", pron: "Yeogiseo naeryeojuseyo", cat: "taxi" },
  { zh: "請問可以開收據嗎？", kr: "영수증 주세용", pron: "Yeongsujeung juseyo", cat: "taxi" },
  { zh: "請問有提供現場退稅嗎？", kr: "택스 리펀 돼요?", pron: "Taekseu ripeon dwaeyo?", cat: "shop" },
  { zh: "請給我中文菜單", kr: "중국어 메뉴판 좀 주세요", pron: "Jung-gug-eo me-nyu-pan jom ju-se-yo", cat: "food" },
  { zh: "請給我冰水 (韓國餐廳預設)", kr: "찬물 좀 주세요", pron: "Chanmul jom juseyo", cat: "food" },
  { zh: "請不要做太辣 (微辣即可)", kr: "덜 매운 것으로 해주세요", pron: "Deol maeun geoseuro haejuseyo", cat: "food" },
  { zh: "請問這個總共多少錢？", kr: "얼마예요?", pron: "Eolmayeyo?", cat: "shop" },
  { zh: "你好 (早午晚安通用)", kr: "안녕하세요", pron: "An-nyeong-ha-se-yo", cat: "common" },
  { zh: "謝謝", kr: "감사합니다", pron: "Gam-sa-ham-ni-da", cat: "common" },
  { zh: "再見 (對留下的人說)", kr: "안녕히 계세요", pron: "An-nyeong-hi gye-se-yo", cat: "common" },
  { zh: "再見 (對走的人說)", kr: "안녕히 가세요", pron: "An-nyeong-hi ga-se-yo", cat: "common" },
  { zh: "不好意思 (詢問/借過)", kr: "실례합니다", pron: "Sil-rye-ham-ni-da", cat: "common" },
  { zh: "對不起", kr: "죄송합니다", pron: "Joe-song-ham-ni-da", cat: "common" },
  { zh: "沒關係", kr: "괜찮아요", pron: "Gwaen-chan-ha-yo", cat: "common" },
  { zh: "是的 / 好的", kr: "네", pron: "Ne", cat: "common" },
  { zh: "不是 / 不用", kr: "아니요", pron: "A-ni-yo", cat: "common" },
  { zh: "非常好吃", kr: "너무 맛있어요", pron: "Neo-mu mas-is-seo-yo", cat: "common" },
  { zh: "請幫幫我", kr: "도와주세요", pron: "Do-wa-ju-se-yo", cat: "common" }
]

// 預設頁面渲染初始化
document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  renderDayTabs();
  renderDayTimeline(1);
  renderOliveYoung('all');
  renderGallery();
  renderKoreanCards('all');
  setupEventListeners();
  setupTransitTools();
  setupCalcTools();
});

// 渲染 Day 切換頁籤
function renderDayTabs() {
  const container = document.getElementById("sub-nav-container") || document.getElementById("day-tabs");
  if (!container) return;

  let html = `<button class="sub-tab-btn active" data-day="1">Day 1 (8/9)</button>`;
  for (let i = 2; i <= 6; i++) {
    html += `<button class="sub-tab-btn" data-day="${i}">Day ${i} (${itineraryData[i-1].date.split('（')[0]})</button>`;
  }
  html += `<button class="sub-tab-btn" data-day="all">全 6 天總覽</button>`;
  container.innerHTML = html;
}

// 渲染每日行程時間軸
function renderDayTimeline(dayFilter = 1) {
  const container = document.getElementById("timeline-container");
  const dayTitleEl = document.getElementById("day-title");
  if (!container) return;

  // 動態更新頂部單一主標題 #day-title
  if (dayTitleEl) {
    if (dayFilter === 'all') {
      dayTitleEl.innerHTML = `📍 韓國釜山 6 天 5 夜行程全覽指南`;
    } else {
      const curDay = itineraryData.find(d => d.day === parseInt(dayFilter, 10));
      if (curDay) {
        dayTitleEl.innerHTML = `Day ${curDay.day}｜${curDay.date} - ${curDay.title}`;
      }
    }
  }

  container.innerHTML = "";
  let filteredDays = [];

  if (dayFilter === 'all') {
    filteredDays = itineraryData;
  } else {
    filteredDays = itineraryData.filter(d => d.day === parseInt(dayFilter, 10));
  }

  let html = "";
  filteredDays.forEach(day => {
    html += `<div class="day-section" style="margin-bottom: 2rem;">`;
    
    // 僅在「全 6 天總覽」模式下呈現分天小區塊頭，單天模式下只保留頂部唯一主標題
    if (dayFilter === 'all') {
      html += `
        <div class="day-header" style="background: linear-gradient(135deg, rgba(0,210,255,0.1), rgba(58,123,213,0.2)); border: 1px solid var(--border-light); padding: 1rem 1.25rem; border-radius: var(--radius-md); margin-bottom: 1.25rem;">
          <h3 style="color: var(--primary-glow); font-size: 1.2rem; margin-bottom: 0.3rem;">📍 Day ${day.day}｜${day.date} - ${day.subTitle}</h3>
          <p style="color: var(--text-sub); font-size: 0.9rem; margin: 0; line-height: 1.5;">${day.title}</p>
        </div>
      `;
    }

    html += `<div class="timeline" style="display: flex; flex-direction: column; gap: 1rem;">`;

    day.items.forEach(item => {
      const badgeHtml = item.badges.map(b => `<span class="badge badge-blue" style="background: rgba(0,210,255,0.15); color: var(--primary-glow); border: 1px solid rgba(0,210,255,0.3); padding: 0.15rem 0.5rem; border-radius: 4px; font-size: 0.75rem; margin-right: 0.4rem; font-weight: 700;">${b}</span>`).join("");
      
      html += `
        <div class="timeline-item" style="background: rgba(15, 23, 42, 0.6); border: 1px solid var(--border-light); border-radius: var(--radius-md); padding: 1.1rem; backdrop-filter: blur(10px);">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 0.5rem; flex-wrap: wrap;">
            <div style="font-weight: 800; color: var(--accent-gold); font-size: 0.95rem;">⏰ ${item.time}</div>
            <div>${badgeHtml}</div>
          </div>
          <h3 style="font-size: 1.1rem; color: #fff; margin: 0.5rem 0 0.35rem 0; font-weight: 700;">${item.icon} ${item.title}</h3>
          <p style="color: #cbd5e1; font-size: 0.9rem; line-height: 1.6; margin-bottom: 0.6rem;">${item.desc}</p>
          <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px dashed rgba(255,255,255,0.1); padding-top: 0.6rem; margin-top: 0.5rem; font-size: 0.82rem;">
            <span style="color: var(--text-sub);"><i class="fa-solid fa-route"></i> ${item.transport}</span>
            ${item.mapUrl ? `<a href="${item.mapUrl}" target="_blank" rel="noopener" class="map-link-btn" style="color: var(--primary-glow); text-decoration: none; font-weight: 700;"><i class="fa-solid fa-map-location-dot"></i> Google 地圖 📍</a>` : ''}
          </div>
        </div>
      `;
    });

    html += `
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
}

function renderOliveYoung(filterCategory = 'all') {
  const container = document.getElementById("oy-product-grid");
  if (!container) return;

  let html = "";
  let count = 0;
  oyProductsData.forEach(p => {
    if (filterCategory !== 'all' && p.category !== filterCategory) return;
    count++;
    
    let targetUrl = p.raw_img;

    html += `
      <div class="product-card" style="background: var(--bg-card); border: 1px solid var(--border-light); border-radius: var(--radius-md); padding: 1.25rem; display: flex; flex-direction: column; gap: 0.75rem;">
        <div class="oy-thumb-container" style="position: relative; border-radius: 8px; overflow: hidden; height: 180px; background: #ffffff; display: flex; align-items: center; justify-content: center;">
          <img src="${p.img_url}" alt="${p.name}" loading="lazy" referrerpolicy="no-referrer" style="max-width: 100%; max-height: 100%; object-fit: contain; padding: 10px;" onerror="this.style.opacity='0.3'">
        </div>
        <div class="product-badge" style="background: rgba(14, 165, 233, 0.15); color: var(--primary-glow); padding: 0.2rem 0.6rem; border-radius: 4px; font-size: 0.75rem; font-weight: 700; width: fit-content;">${p.badge || p.category_zh}</div>
        <h3 class="product-title" style="font-size: 1.1rem; color: #fff; font-weight: 700; margin: 0;">${p.name}</h3>
        <p style="font-size: 0.8rem; color: var(--text-muted); margin: 0;">${p.en_name || ''}</p>
        <div style="background: rgba(255,255,255,0.05); padding: 0.5rem 0.75rem; border-radius: 6px; border: 1px dashed rgba(255,255,255,0.15); display: flex; align-items: center; justify-content: space-between; font-size: 0.85rem;">
          <span style="color: #4ade80; font-weight: 700;">🏷️ ${p.price_krw || '定價依現場為準'}</span>
          <span style="color: #fdba74; font-weight: 700;">(${p.price_twd || ''})</span>
        </div>
        <p class="product-features" style="font-size: 0.88rem; color: #e2e8f0; margin: 0;">💡 <b>特色：</b>${p.features}</p>
        <p class="product-skin" style="font-size: 0.85rem; color: var(--text-sub); margin: 0;">👤 <b>適用：</b>${p.skin_type}</p>
        <p class="product-reason" style="font-size: 0.88rem; color: #cbd5e1; line-height: 1.5; margin: 0;">${p.reason}</p>
        <div style="margin-top: auto; display: flex; flex-direction: column; gap: 0.4rem;">
          <a href="${targetUrl}" target="_blank" rel="noopener" class="map-link-btn" style="text-align: center; justify-content: center; background: linear-gradient(135deg, #00d2ff, #3a7bd5); color: #fff; font-weight: 700; padding: 0.6rem;">
            <i class="fa-solid fa-globe"></i> 前往 Olive Young 官網直達 🔗
          </a>
        </div>
      </div>
    `;
  });

  if (count === 0) {
    html = `<div style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: 3rem;">此分類尚無商品</div>`;
  }

  container.innerHTML = html;
}

window.filterOyCategory = function(category, btn) {
  document.querySelectorAll('.oy-filter-btn').forEach(b => b.classList.remove('active'));
  if (btn) {
    btn.classList.add('active');
  } else if (window.event && window.event.target) {
    window.event.target.classList.add('active');
  }
  renderOliveYoung(category);
};

// 渲染藝廊寫真
function renderGallery() {
  const container = document.getElementById("gallery-container") || document.getElementById("gallery-grid");
  if (!container) return;

  container.innerHTML = "";
  let html = "";
  galleryPhotosData.forEach(p => {
    html += `
      <div class="gallery-card" style="background: rgba(15, 23, 42, 0.7); border: 1px solid var(--border-light); border-radius: var(--radius-md); overflow: hidden; backdrop-filter: blur(10px); box-shadow: 0 10px 25px rgba(0,0,0,0.5);">
        <div style="height: 200px; overflow: hidden; background: #0f172a; position: relative;">
          <img src="${p.src}" alt="${p.title}" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.style.opacity='0.5'">
        </div>
        <div class="gallery-info" style="padding: 1.1rem;">
          <h3 class="gallery-title" style="color: #fff; font-size: 1.05rem; margin-bottom: 0.35rem; font-weight: 700;">${p.title}</h3>
          <p class="gallery-location" style="color: var(--accent-gold); font-size: 0.85rem; font-weight: 600; margin-bottom: 0.4rem;">📍 ${p.location}</p>
          <p style="color: var(--text-sub); font-size: 0.85rem; line-height: 1.5;">${p.desc}</p>
        </div>
      </div>
    `;
  });
  container.innerHTML = html;
}

// 交通試算工具
function setupTransitTools() {
  const btn1 = document.getElementById("btn-transit-1");
  const btn2 = document.getElementById("btn-transit-2");
  const btn3 = document.getElementById("btn-transit-3");
  const detailBox = document.getElementById("transit-detail");
  if (!detailBox) return;

  const plans = {
    venti: `
      <strong style="color: var(--accent-gold); font-size: 1.05rem;">👍 方案 1：預先預約 1 台 9~12 人座接送包車（極推薦！）</strong>
      <p class="transit-plan-desc" style="margin-top: 0.5rem; line-height: 1.6;">強烈建議提前預訂機場包車！入境後司機直接舉牌接機，將 8 人與 8 個大行李箱一次載走直達東橫 INN，單趟約 NT$ 1,800-2,200（人均僅約 NT$ 250 元），最方便省心。</p>
    `,
    kakao: `
      <strong style="color: var(--primary-glow); font-size: 1.05rem;">🚕 方案 2：現場叫 2 台 Kakao T Venti (大型計程車)</strong>
      <p class="transit-plan-desc" style="margin-top: 0.5rem; line-height: 1.6;">機場入境後現場使用 Kakao T App 呼叫 2 台 Venti 大型車（黑卡/大容量）。預估單台車資約 ₩25,000-30,000（約 NT$ 600-720），兩台合計約 NT$ 1,200-1,440，彈性高但需分兩台車搭乘。</p>
    `,
    subway: `
      <strong style="color: var(--text-sub); font-size: 1.05rem;">🚇 方案 3：金海輕軌 ➔ 沙上站轉地鐵 1 號線至釜山站</strong>
      <p class="transit-plan-desc" style="margin-top: 0.5rem; line-height: 1.6;">票價最便宜（人均約 ₩2,000 / NT$ 48），但需要手提 28-30 吋大行李箱在沙上站進行長距離轉乘與爬樓梯，對 8 人團隊體力消耗較大，較不推薦入境首日使用。</p>
    `
  };

  const updatePlan = (planKey, activeBtn) => {
    [btn1, btn2, btn3].forEach(b => {
      if (b) {
        b.classList.remove("active");
        b.style.background = "";
        b.style.border = "";
      }
    });
    if (activeBtn) {
      activeBtn.classList.add("active");
      activeBtn.style.background = "rgba(0, 210, 255, 0.2)";
      activeBtn.style.border = "1px solid var(--primary-glow)";
    }
    detailBox.innerHTML = plans[planKey];
  };

  if (btn1) btn1.addEventListener("click", () => updatePlan("venti", btn1));
  if (btn2) btn2.addEventListener("click", () => updatePlan("kakao", btn2));
  if (btn3) btn3.addEventListener("click", () => updatePlan("subway", btn3));
}

// 韓元試算工具
function setupCalcTools() {
  const krwInput = document.getElementById("krw-input");
  const rateInput = document.getElementById("rate-input");
  const peopleInput = document.getElementById("people-input");
  const twdResult = document.getElementById("twd-result");
  const twdPerPerson = document.getElementById("twd-per-person");

  if (!krwInput || !rateInput || !peopleInput || !twdResult || !twdPerPerson) return;

  const updateCalc = () => {
    const krw = parseFloat(krwInput.value) || 0;
    const rate = parseFloat(rateInput.value) || 0.024;
    const people = parseInt(peopleInput.value, 10) || 1;

    const totalTwd = Math.round(krw * rate);
    const perPersonTwd = Math.round(totalTwd / Math.max(1, people));

    twdResult.innerText = `NT$ ${totalTwd.toLocaleString()}`;
    twdPerPerson.innerText = `NT$ ${perPersonTwd.toLocaleString()}`;
  };

  [krwInput, rateInput, peopleInput].forEach(el => {
    el.addEventListener("input", updateCalc);
  });
}

// 渲染韓語卡
function renderKoreanCards(catFilter = 'all') {
  const container = document.getElementById("korean-cards-container");
  if (!container) return;

  container.innerHTML = "";
  let html = "";
  
  // 只有當 catFilter === 'locations' 時才渲染地點指引卡片
  if (catFilter === 'locations') {
    koreanLocations.forEach(loc => {
      html += `
        <div class="korean-card-box" style="background: rgba(15, 23, 42, 0.7); border: 1px solid var(--border-light); border-radius: var(--radius-md); padding: 1.25rem; display: flex; flex-direction: column; justify-content: space-between; height: 100%; min-height: 250px; backdrop-filter: blur(10px); box-shadow: 0 10px 25px rgba(0,0,0,0.5);">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
              <span style="font-size: 0.75rem; background: rgba(0, 210, 255, 0.15); color: var(--primary-glow); border: 1px solid rgba(0, 210, 255, 0.3); padding: 0.15rem 0.5rem; border-radius: 4px; font-weight: 700;">🚖 地點指引</span>
            </div>
            <div style="font-size: 1.1rem; font-weight: 700; color: #fff; min-height: 2.8rem; display: flex; align-items: center;">${loc.zh}</div>
            <div style="font-size: 1.25rem; font-weight: 800; color: var(--accent-gold); letter-spacing: 0.5px; min-height: 3.2rem; display: flex; align-items: center; word-break: break-all;">${loc.kr}</div>
            <div style="font-size: 0.85rem; color: var(--text-sub); line-height: 1.4; margin-top: 0.3rem;">📍 ${loc.addr}</div>
          </div>
          <div style="display: flex; gap: 0.5rem; margin-top: 1rem;">
            <button class="map-link-btn" onclick="copyText('${loc.kr}\\n${loc.addr}')" style="flex: 1; padding: 0.45rem 0.6rem; font-size: 0.8rem; justify-content: center;">
              <i class="fa-solid fa-copy"></i> 複製地址
            </button>
            <button class="map-link-btn" onclick="showBigCard('${loc.kr}', '${loc.zh}', '${loc.addr}')" style="flex: 1.2; background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%) !important; color: #fff !important; padding: 0.45rem 0.6rem; font-size: 0.8rem; justify-content: center; font-weight: 700;">
              <i class="fa-solid fa-expand"></i> 📱 秀給司機看
            </button>
          </div>
        </div>
      `;
    });
  }

  // 渲染實用對話卡片
  if (catFilter !== 'locations') {
    koreanPhrases.forEach(p => {
      if (catFilter !== 'all' && catFilter !== p.cat) return;
      html += `
        <div class="korean-card-box" style="background: rgba(15, 23, 42, 0.7); border: 1px solid var(--border-light); border-radius: var(--radius-md); padding: 1.25rem; display: flex; flex-direction: column; justify-content: space-between; height: 100%; min-height: 250px; backdrop-filter: blur(10px); box-shadow: 0 10px 25px rgba(0,0,0,0.5);">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
              <span style="font-size: 0.75rem; background: rgba(255, 183, 3, 0.15); color: var(--accent-gold); border: 1px solid rgba(255, 183, 3, 0.3); padding: 0.15rem 0.5rem; border-radius: 4px; font-weight: 700;">🗣️ 實用對話</span>
            </div>
            <div style="font-size: 1.1rem; font-weight: 700; color: #fff; min-height: 2.8rem; display: flex; align-items: center;">${p.zh}</div>
            <div style="font-size: 1.25rem; font-weight: 800; color: #4ade80; letter-spacing: 0.5px; min-height: 3.2rem; display: flex; align-items: center; word-break: break-all;">${p.kr}</div>
            <div style="font-size: 0.85rem; color: var(--text-sub); line-height: 1.4; margin-top: 0.3rem;">🗣️ 發音：${p.pron}</div>
          </div>
          <div style="display: flex; gap: 0.5rem; margin-top: 1rem;">
            <button class="map-link-btn" onclick="copyText('${p.kr}')" style="flex: 1; padding: 0.45rem 0.6rem; font-size: 0.8rem; justify-content: center;">
              <i class="fa-solid fa-copy"></i> 複製韓文
            </button>
            <button class="map-link-btn" onclick="showBigCard('${p.kr}', '${p.zh}', '音譯：${p.pron}')" style="flex: 1.2; background: linear-gradient(135deg, #10b981 0%, #059669 100%) !important; color: #fff !important; padding: 0.45rem 0.6rem; font-size: 0.8rem; justify-content: center; font-weight: 700;">
              <i class="fa-solid fa-expand"></i> 📱 大字秀給店家
            </button>
          </div>
        </div>
      `;
    });
  }

  container.innerHTML = html;
}

window.filterKoreanCat = function(cat, btn) {
  document.querySelectorAll('.korean-cat-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  renderKoreanCards(cat);
};

window.copyText = function(text) {
  navigator.clipboard.writeText(text).then(() => {
    alert("已成功複製到剪貼簿：\n" + text);
  }).catch(() => {
    alert("複製成功：\n" + text);
  });
};

window.showBigCard = function(kr, zh, addr) {
  document.querySelectorAll('.big-card-modal-overlay').forEach(el => el.remove());

  const modal = document.createElement("div");
  modal.className = "big-card-modal-overlay";
  modal.style.cssText = `
    position: fixed !important;
    top: 0 !important;
    left: 0 !important;
    width: 100vw !important;
    height: 100vh !important;
    background: rgba(0, 0, 0, 0.92) !important;
    z-index: 999999 !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    padding: 1.5rem !important;
    backdrop-filter: blur(15px) !important;
  `;

  modal.innerHTML = `
    <div style="background: #0f172a; border: 2px solid var(--accent-gold); border-radius: 20px; padding: 2rem; width: 100%; max-width: 550px; text-align: center; box-shadow: 0 0 50px rgba(255, 183, 3, 0.3); position: relative; animation: modalPop 0.3s ease-out;">
      <button onclick="this.closest('.big-card-modal-overlay').remove()" style="position: absolute; top: 1rem; right: 1rem; background: rgba(255,255,255,0.1); border: none; color: #fff; width: 40px; height: 40px; border-radius: 50%; font-size: 1.2rem; cursor: pointer;">✕</button>
      <div style="color: var(--primary-glow); font-size: 1.1rem; font-weight: 700; margin-bottom: 0.5rem;">${zh}</div>
      <div style="color: var(--accent-gold); font-size: 2.2rem; font-weight: 900; margin: 1rem 0; line-height: 1.3; word-break: break-all;">${kr}</div>
      <div style="color: #cbd5e1; font-size: 1.05rem; line-height: 1.5; margin-bottom: 1.5rem; background: rgba(255,255,255,0.05); padding: 0.8rem; border-radius: 10px;">${addr}</div>
      <button onclick="this.closest('.big-card-modal-overlay').remove()" style="background: linear-gradient(135deg, var(--primary-glow), #3a7bd5); color: #fff; border: none; padding: 0.8rem 2rem; border-radius: 30px; font-weight: 800; font-size: 1rem; cursor: pointer; width: 100%;">關閉</button>
    </div>
  `;

  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.remove();
  });

  document.body.appendChild(modal);
};

function setupEventListeners() {
  const subNav = document.getElementById("sub-nav-container");
  if (subNav) {
    subNav.addEventListener("click", e => {
      const btn = e.target.closest(".sub-tab-btn");
      if (!btn) return;
      
      document.querySelectorAll(".sub-tab-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      
      const dayVal = btn.dataset.day;
      if (dayVal === 'all') {
        renderDayTimeline('all');
      } else {
        renderDayTimeline(parseInt(dayVal, 10));
      }
    });
  }
}

// 主題切換 (Trip.com 明亮藍白 vs 尊爵暗黑)
function initTheme() {
  const savedTheme = localStorage.getItem('busan_theme_preference') || 'dark';
  applyTheme(savedTheme);
}

window.toggleTheme = function() {
  const currentTheme = document.documentElement.getAttribute('data-theme') === 'light-trip' ? 'light-trip' : 'dark';
  const newTheme = currentTheme === 'dark' ? 'light-trip' : 'dark';
  applyTheme(newTheme);
  localStorage.setItem('busan_theme_preference', newTheme);
};

function applyTheme(theme) {
  const heroText = document.getElementById('theme-btn-text-hero');
  const heroIcon = document.getElementById('theme-btn-icon-hero');
  const navText = document.getElementById('theme-btn-text-nav');
  const navIcon = document.getElementById('theme-btn-icon-nav');

  if (theme === 'light-trip') {
    document.documentElement.setAttribute('data-theme', 'light-trip');
    if (heroText) heroText.textContent = '🌙 切換為星空暗黑模式';
    if (heroIcon) heroIcon.className = 'fa-solid fa-moon';
    if (navText) navText.textContent = '🌙 暗黑星空';
    if (navIcon) navIcon.className = 'fa-solid fa-moon';
  } else {
    document.documentElement.removeAttribute('data-theme');
    if (heroText) heroText.textContent = '☀️ 切換為 Trip 藍白明亮風格';
    if (heroIcon) heroIcon.className = 'fa-solid fa-sun';
    if (navText) navText.textContent = '☀️ Trip藍白';
    if (navIcon) navIcon.className = 'fa-solid fa-sun';
  }
}
