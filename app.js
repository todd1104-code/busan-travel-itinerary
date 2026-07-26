// 韓國釜山 6天5夜家族慢遊行程網頁互動邏輯 (V5 旗艦完整版：20款OY商品 + 韓語卡美化 + 帝王蟹完整對比 Modal)

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

// 行程資料集 (完全同步 V5 規格、車資標註與帝王蟹對比指南)
const itineraryData = [
  {
    day: 1,
    date: "8/9（日）",
    subTitle: "抵達 · 換匯 · 烤肉放鬆",
    title: "抵達釜山 ➔ 飯店 Check-in ➔ 釜山站湯飯 ➔ 南浦洞換匯 ➔ 光復路商圈輕鬆逛 ➔ 味贊王烤肉 ➔ 回飯店休息",
    items: [
      {
        time: "11:35",
        title: "抵達金海國際機場 (PUS)",
        desc: "搭乘長榮 BR1194 班機 (08:20 桃園 T2 起飛 ➔ 11:35 抵達釜山)，辦理入境與提領 8 個大行李箱。",
        icon: "✈️",
        badges: ["長榮航空", "入境手續"],
        transport: "✈️ 長榮 BR1194 (08:20 桃園出發)",
        mapUrl: "https://www.google.com/maps/search/?api=1&query=Gimhae+International+Airport"
      },
      {
        time: "12:30 - 13:15",
        title: "金海機場 ➔ 東橫INN 釜山站1號店",
        desc: "叫 2 台 Kakao T Venti 大型計程車直達飯店寄放行李與辦理預備手續，避免行李塞不下。",
        icon: "🚕",
        badges: ["專車接送", "行李寄放"],
        transport: "🚕 Kakao T Venti 包車 (約 35 分鐘 / 預估車資 ₩25,000-30,000/台 / 約 NT$ 600-720)",
        mapUrl: "https://www.google.com/maps/search/?api=1&query=Toyoko+Inn+Busan+Station+No.1"
      },
      {
        time: "13:20 - 14:30",
        title: "午餐：本錢豬肉湯飯 (본전돼지국밥)",
        desc: "飯店步行 3 分鐘即達之釜山站必吃老店，每碗約 9,000 韓元（約 NT$ 216），湯頭濃郁鮮美，附新鮮韭菜與蝦醬。💡【防排隊/備案】若排隊過長，可直接前往隔壁「大建名家豬肉湯飯 (대건명가)」或釜山站前「草梁辣炒豬肉包飯 (초량불백)」。",
        icon: "🍲",
        badges: ["老字號湯飯", "附防排隊備案"],
        badgeType: "food",
        transport: "🚶 飯店徒步約 3 分鐘 (釜山站前 / 費用 ₩0)",
        mapUrl: "https://www.google.com/maps/search/?api=1&query=Bonjeon+Dwaeji-gukbap+Busan"
      },
      {
        time: "14:45 - 15:30",
        title: "南浦洞民間換錢所 (友利 / 映珍 / Money Box)",
        desc: "從飯店搭計程車約 6 分鐘直達南浦洞換匯（建議使用台幣千元大鈔或日圓萬圓大鈔，匯率最佳）。💡備案：亦可直接在飯店旁的 Money Box 釜山站店換匯。",
        icon: "💱",
        badges: ["匯率最佳", "換匯省錢"],
        badgeType: "sight",
        transport: "🚕 計程車約 6 分鐘 (預估車資 ₩5,000/台 / 約 NT$ 120) / 🚇 地鐵 2 站 (₩1,600/人)",
        mapUrl: "https://www.google.com/maps/search/?api=1&query=Woori+Exchange+Nampo+Busan"
      },
      {
        time: "15:30 - 18:00",
        title: "南浦洞光復路時尚街 & 地下街輕鬆散步",
        desc: "換完匯後於光復路商圈輕鬆逛街。逛潮牌店 (COVERNAT, Musinsa)、美妝店 (Olive Young 光復旗艦店)，步調放慢，隨時可至沿街咖啡廳喝冰咖啡避暑。",
        icon: "🛍️",
        badges: ["光復路時尚街", "美妝潮流"],
        badgeType: "shop",
        transport: "🚶 南浦洞商圈徒步漫遊 (費用 ₩0)",
        mapUrl: "https://www.google.com/maps/search/?api=1&query=Gwangbok-ro+Fashion+Street+Busan"
      },
      {
        time: "18:30 - 20:30",
        title: "晚餐：味贊王鹽烤肉 富平店 (맛찬들왕소금구이 부평점)",
        desc: "【已搬遷至新址正常營業！】舊南浦店已搬遷整合至富平店（札嘎其站 3 號出口旁 / 光復路入口）。享用 3.5cm 超厚切熟成豬五花與豬頸肉，專人桌邊代烤！<br>💡<b>【周邊防排隊燒肉備案】</b>：若富平店排隊人潮過多，可順走前往「河南豬肉家 南浦店 (하남돼지집)」或「南浦 88 豬肉 (88돼지)」，均有專人代烤且品質極佳。",
        icon: "🥩",
        badges: ["厚切熟成豬", "搬遷新址正常營業", "附熱門備案"],
        badgeType: "food",
        transport: "🚶 光復路商圈步行約 3-5 分鐘至札嘎其站 3 號出口新址 (費用 ₩0)",
        mapUrl: "https://www.google.com/maps/search/?api=1&query=Matchandeul+Wangso-geum-gui+Bupyeong+Busan"
      },
      {
        time: "20:30～",
        title: "返回飯店休息與早睡補眠",
        desc: "餐後搭計程車約 5 分鐘回飯店休息洗澡，補足飛行疲勞，為明日一日遊儲備充沛體力。",
        icon: "🏨",
        badges: ["早睡補眠", "恢復體力"],
        badgeType: "sight",
        transport: "🚕 計程車約 5 分鐘直達飯店門口 (預估車資 ₩5,000/台 / 約 NT$ 120)",
        mapUrl: "https://www.google.com/maps/search/?api=1&query=Toyoko+Inn+Busan+Station+No.1"
      }
    ]
  },
  {
    day: 2,
    date: "8/10（一）",
    subTitle: "膠囊列車 · 文化村 · 五六島",
    title: "【KKday 一日遊 B方案】天空膠囊列車 ➔ 五六島天空步道 ➔ 白淺灘文化村 ➔ 甘川文化村 ➔ 西面老牌湯飯",
    items: [
      {
        time: "09:00",
        title: "釜山站集合出發 (KKday 專車)",
        desc: "專車於 KTX 釜山站集合，飯店出門步行 3 分鐘即達集合地點。",
        icon: "🚌",
        badges: ["KKday專車", "釜山站集合"],
        transport: "🚶 飯店徒步約 3 分鐘至釜山站集合點 (專車車資已含)",
        mapUrl: "https://www.google.com/maps/search/?api=1&query=Busan+Station"
      },
      {
        time: "09:50 - 11:20",
        title: "海雲台藍線公園 (天空膠囊列車)",
        desc: "搭乘繽紛可愛的天空膠囊列車觀海，一日遊門票已包含並預約完成。",
        icon: "🚃",
        badges: ["海景第一排", "天空膠囊"],
        badgeType: "sight",
        transport: "🚌 KKday 專車行駛至尾浦站 (費用已含於一日遊)",
        mapUrl: "https://www.google.com/maps/search/?api=1&query=Haeundae+Blueline+Park"
      },
      {
        time: "11:30 - 13:00",
        title: "五六島天空步道 & 周邊午餐",
        desc: "踏在懸崖邊 U 型玻璃棧道觀浪，拍出凌空絕景。午餐於周邊小吃自由享用。",
        icon: "🌊",
        badges: ["玻璃步道", "絕美海景"],
        badgeType: "sight",
        transport: "🚌 KKday 專車行駛 (費用已含於一日遊)",
        mapUrl: "https://www.google.com/maps/search/?api=1&query=Oryukdo+Skywalk"
      },
      {
        time: "13:30 - 15:00",
        title: "白淺灘文化村",
        desc: "影島懸崖邊的藍白彩繪村落與沿海步道。專車接送至此，省去拉車麻煩。",
        icon: "🎨",
        badges: ["懸崖彩繪村", "藍白建築"],
        badgeType: "sight",
        transport: "🚌 KKday 專車行駛 (費用已含於一日遊)",
        mapUrl: "https://www.google.com/maps/search/?api=1&query=Huinnyeoul+Culture+Village"
      },
      {
        time: "15:30 - 17:30",
        title: "甘川文化村",
        desc: "釜山版馬丘比丘，山城彩色房子錯落，可與經典的小王子與沙漠狐狸合照。",
        icon: "🏡",
        badges: ["釜山馬丘比丘", "小王子"],
        badgeType: "sight",
        transport: "🚌 KKday 專車行駛 (費用已含於一日遊)",
        mapUrl: "https://www.google.com/maps/search/?api=1&query=Gamcheon+Culture+Village+Busan"
      },
      {
        time: "18:45 - 20:30",
        title: "晚餐雙方案：【方案 A】南浦洞/釜山站舒適大座位聚餐 VS 【方案 B】西面商圈 ➔ 松亭3代豬肉湯飯",
        desc: "【供家人當天視體力彈性選擇！】<br>• <b>方案 A (體力優先/極推薦)</b>：一日遊解散後直接於南浦洞/釜山站品嚐「南浦蔘雞湯 (남포삼계탕)」(50年米其林老字號/溫補補體力)、或「韓式炸雞/海鮮煎餅」或「李재모披薩」，避免連續兩天吃湯飯且免去西面排隊遠奔之苦。<br>• <b>方案 B (經典熱鬧)</b>：專車/地鐵前往西面商圈 Shopping 散策，品嚐排隊名店「松亭3代豬肉湯飯」(若排隊過長可改吃隔壁朴家豬肉湯飯)。",
        icon: "🍲",
        badges: ["雙方案彈性選擇", "方案A體力優先", "方案B西面湯飯"],
        badgeType: "food",
        transport: "🚌 方案 A: 專車直達南浦洞/釜山站 (₩0) / 🚇 方案 B: 地鐵至西面 (約 15 分鐘 / ₩1,600)",
        mapUrl: "https://www.google.com/maps/search/?api=1&query=Lee+Jae+Mo+Pizza+Nampo+Busan"
      }
    ]
  },
  {
    day: 3,
    date: "8/11（二）",
    subTitle: "水晶纜車 · 雙方案午餐 · 百貨大採購",
    title: "松島水晶纜車&龍宮雲橋 ➔ 札嘎其市場(雙方案:帝王蟹 VS 烤海鮮/石鍋拌飯) ➔ 樂天百貨與樂天超市大採購 ➔ BIFF 廣場小吃漫遊",
    items: [
      {
        time: "10:00 - 12:15",
        title: "【使用 PASS 兌換】松島海上纜車 ➔ 松島龍宮雲橋",
        desc: "換取來回纜車票（可現場補差價升級水晶車廂），穿越海面連通至松島龍宮雲橋（現場購票 1,000 韓元）。",
        icon: "🚡",
        badges: ["水晶透明車廂", "龍宮雲橋"],
        badgeType: "sight",
        transport: "🚕 釜山站搭計程車約 12 分鐘 (預估車資 ₩7,000/台 / 約 NT$ 168)",
        mapUrl: "https://www.google.com/maps/search/?api=1&query=Songdo+Marine+Cable+Car+Busan"
      },
      {
        time: "12:30 - 14:30",
        title: "午餐雙方案：【方案 A】札嘎其水產市場 帝王蟹饗宴 VS 【方案 B】札嘎其/南浦洞 烤海鮮/烤魚定食",
        desc: "【供家人當天彈性選擇！】<br>• <b>方案 A (頂級饗宴)</b>：於「新東亞水產市場 1樓 華僑攤位 (85/87/54號，免開桌費與加工費，送豐富小菜與蟹膏炒飯)」或「札嘎其大樓 100/101號」挑選現蒸活體大帝王蟹（鱈場蟹）。<br>• <b>方案 B (清爽避膩)</b>：改吃大份烤扇貝、鮮蝦海鮮湯或南浦洞「韓式烤魚/石鍋拌飯」，避免連續兩天吃大蟹產生味覺疲勞，大幅節省預算。",
        icon: "🦀",
        badges: ["雙方案彈性選擇", "方案A帝王蟹", "方案B烤海鮮/拌飯"],
        badgeType: "food",
        transport: "🚕 松島纜車搭計程車約 10 分鐘 (預估車資 ₩6,000/台 / 約 NT$ 144)",
        mapUrl: "https://www.google.com/maps/search/?api=1&query=Jagalchi+Market+Busan"
      },
      {
        time: "14:30 - 17:30",
        title: "購物時間：樂天百貨光復店 & 13樓屋頂庭園觀景",
        desc: "百貨商場內舒適購物冷氣充裕，可登上 13 樓免費屋頂庭園俯瞰釜山港與影島大橋景緻。",
        icon: "🏙️",
        badges: ["樂天百貨", "屋頂庭園觀景"],
        badgeType: "shop",
        transport: "🚶 札嘎其市場徒步 8 分鐘 / 🚇 地鐵 1 站 (費用 ₩0 ~ ₩1,600)",
        mapUrl: "https://www.google.com/maps/search/?api=1&query=Gwangbok-ro+Fashion+Street+Busan"
      },
      {
        time: "17:30 - 19:00",
        title: "伴手禮大採購：樂天超市 光復店 (Lotte Mart)",
        desc: "一次購足韓國零食、堅果與伴手禮並於現場辦理退稅！",
        icon: "🛒",
        badges: ["零食伴手禮", "現場退稅"],
        badgeType: "shop",
        transport: "🚶 樂天百貨內連通至樂天超市 (費用 ₩0)",
        mapUrl: "https://www.google.com/maps/search/?api=1&query=Lotte+Mart+Gwangbok+Busan"
      },
      {
        time: "19:00 - 21:30",
        title: "採買後雙彈性路線 (方案 A / 方案 B) ➔ BIFF 廣場夜市小吃",
        desc: "【方案 A (戰利品較多)】先搭 5 分鐘計程車回飯店擺放戰利品，再無後顧之憂去逛夜市；【方案 B (戰利品不多)】採買完直接步行 5~8 分鐘至相鄰的 BIFF 廣場與富平罐頭夜市吃黑糖餅、辣炒年糕與魚板，逛完後再一起搭車回飯店。",
        icon: "🍡",
        badges: ["雙彈性動線", "BIFF黑糖餅"],
        badgeType: "food",
        transport: "🚕 方案 A: 叫車回飯店 (5分鐘 / 車資 ₩5,000/台) / 🚶 方案 B: 徒步 5 分鐘 (₩0)",
        mapUrl: "https://www.google.com/maps/search/?api=1&query=BIFF+Square+Busan"
      }
    ]
  },
  {
    day: 4,
    date: "8/12（三）",
    subTitle: "斷崖古剎 · 斜坡滑車 · 松葉蟹 · Outlet",
    title: "海東龍宮寺 ➔ 釜山斜坡滑車 ➔ 機張松葉蟹盛宴 ➔ Ananti Cove 漫遊 ➔ 樂天 Outlet ➔ 返飯店休息",
    items: [
      {
        time: "09:00 - 10:30",
        title: "海東龍宮寺 (Haedong Yonggungsa Temple)",
        desc: "全韓國唯一建在海邊斷崖上的礁岩古剎，聽海浪聲拜佛參觀（免費參觀）。",
        icon: "⛩️",
        badges: ["海邊斷崖古剎", "免費參觀"],
        badgeType: "sight",
        transport: "🚕 釜山站搭計程車約 35 分鐘 (預估車資 ₩22,000/台 / 約 NT$ 528)",
        mapUrl: "https://www.google.com/maps/search/?api=1&query=Haedong+Yonggungsa+Temple"
      },
      {
        time: "10:45 - 12:45",
        title: "【使用 PASS 兌換】釜山斜坡滑車 (Skyline Luge 釜山)",
        desc: "體驗 2 次賽道滑行，搭乘纜車上山景觀極佳（原價 ₩30,000，可用 Pass 兌換）。預留 2 小時非常充裕。",
        icon: "🏎️",
        badges: ["斜坡滑車", "賽道體驗"],
        badgeType: "sight",
        transport: "🚕 海東龍宮寺搭計程車約 5 分鐘 (預估車資 ₩4,500/台 / 約 NT$ 108)",
        mapUrl: "https://www.google.com/maps/search/?api=1&query=Skyline+Luge+Busan"
      },
      {
        time: "13:00 - 14:45",
        title: "午餐：機張市場松葉蟹 (기장시장 대게)",
        desc: "產地現蒸松葉蟹與蟹膏炒飯，肉質細緻甜美（人均約 NT$ 1,440-1,920）。",
        icon: "🦀",
        badges: ["機張松葉蟹", "蟹膏炒飯"],
        badgeType: "food",
        transport: "🚕 滑車處搭計程車約 10 分鐘 (預估車資 ₩6,500/台 / 約 NT$ 156)",
        mapUrl: "https://www.google.com/maps/search/?api=1&query=Gijang+Market+Busan"
      },
      {
        time: "15:00 - 17:00",
        title: "Ananti Cove 奢華海景廊道 & Cabinet de Poissons 咖啡廳",
        desc: "充分停留 2 小時放慢腳步，在頂級渡假村海景廊道散步拍照、享用冷氣精緻下午茶。",
        icon: "☕",
        badges: ["奢華渡假村", "海景下午茶"],
        badgeType: "sight",
        transport: "🚕 機張市場搭計程車約 10 分鐘 (預估車資 ₩6,500/台 / 約 NT$ 156)",
        mapUrl: "https://www.google.com/maps/search/?api=1&query=Ananti+Cove+Busan"
      },
      {
        time: "17:15 - 19:00",
        title: "露天 Outlet：東釜山樂天 Outlet (Lotte Premium Outlet)",
        desc: "希臘聖托里尼風格超大型 Outlet，運動與韓國在地服飾品牌折扣多。",
        icon: "🛍️",
        badges: ["東釜山Outlet", "折扣購物"],
        badgeType: "shop",
        transport: "🚕 Ananti 搭計程車約 7 分鐘 (預估車資 ₩5,000/台 / 約 NT$ 120)",
        mapUrl: "https://www.google.com/maps/search/?api=1&query=Lotte+Premium+Outlet+Dongbusan"
      },
      {
        time: "19:15～",
        title: "返回飯店休息 / 釜山站周邊輕鬆晚餐",
        desc: "Outlet 結束後搭計程車直達飯店門口，晚上於釜山站周邊享用輕鬆晚餐或叫韓式炸雞外送，讓連續旅遊第四天的體力得到充分恢復。",
        icon: "🏨",
        badges: ["直達飯店", "充份休息"],
        badgeType: "sight",
        transport: "🚕 Outlet 搭計程車直達飯店約 35 分鐘 (預估車資 ₩22,000/台 / 約 NT$ 528)",
        mapUrl: "https://www.google.com/maps/search/?api=1&query=Toyoko+Inn+Busan+Station+No.1"
      }
    ]
  },
  {
    day: 5,
    date: "8/13（四）",
    subTitle: "SPA LAND · 100樓觀景 · 廣安里夜景",
    title: "SPA LAND 汗蒸幕 ➔ 新世界百貨 ➔ 青沙浦海岸線 ➔ 100樓觀景台 ➔ Marine City ➔ 廣安里夜景與海景餐酒館",
    items: [
      {
        time: "09:30 - 12:30",
        title: "【避暑放鬆】SPA LAND 汗蒸幕（新世界 Centum City 店）",
        desc: "全釜山最豪華汗蒸幕，內有 13 種主題桑拿房與戶外足浴區（【建議提前線上預買 Klook/KKday 電子票】約 NT$ 450~500）。",
        icon: "♨️",
        badges: ["最美汗蒸幕", "天然溫泉"],
        badgeType: "sight",
        transport: "🚇 地鐵 1 號線 釜山站 ➔ 2 號線 Centum City 站 (車資 ₩1,600/人 / 約 NT$ 38)",
        mapUrl: "https://www.google.com/maps/search/?api=1&query=Spa+Land+Centum+City"
      },
      {
        time: "12:30 - 14:30",
        title: "購物與美食：新世界百貨 Centum City 店 & 美食街午餐",
        desc: "全球最大百貨公司，於高級美食街享用午餐並逛國際潮牌。",
        icon: "🏬",
        badges: ["全球最大百貨", "潮牌購物"],
        badgeType: "shop",
        transport: "🚶 SPA LAND 內連通至新世界百貨 (費用 ₩0)",
        mapUrl: "https://www.google.com/maps/search/?api=1&query=Shinsegae+Centum+City+Busan"
      },
      {
        time: "15:00 - 16:45",
        title: "青沙浦 (Cheongsapo) 海岸散步 & 紅白燈塔",
        desc: "欣賞經典紅白燈塔、海濱雲端列車景致與青沙浦天空步道。",
        icon: "🏮",
        badges: ["紅白燈塔", "海岸散步"],
        badgeType: "sight",
        transport: "🚕 Centum City 搭計程車約 15 分鐘 (預估車資 ₩10,000/台 / 約 NT$ 240)",
        mapUrl: "https://www.google.com/maps/search/?api=1&query=Cheongsapo+Busan"
      },
      {
        time: "17:15 - 18:15",
        title: "【使用 PASS 兌換第 3 額度】釜山 X the SKY 觀景台 (100樓)",
        desc: "順路登上 100 樓觀景台（原價 ₩27,000，用 Pass 免費兌換），俯瞰夕陽下的海雲台海岸線與廣安大橋夜景！",
        icon: "🌆",
        badges: ["100樓觀景台", "PASS第三額度"],
        badgeType: "sight",
        transport: "🚕 青沙浦搭計程車約 8 分鐘 (預估車資 ₩5,500/台 / 約 NT$ 132)",
        mapUrl: "https://www.google.com/maps/search/?api=1&query=Busan+X+the+SKY"
      },
      {
        time: "18:30 - 19:30",
        title: "Marine City 摩天樓海景散步",
        desc: "順著沿海路線，欣賞海天一色的現代摩天大樓景致。",
        icon: "🌃",
        badges: ["摩天樓夜景", "海邊步道"],
        badgeType: "sight",
        transport: "🚕 X the SKY 搭計程車約 7 分鐘 (預估車資 ₩5,000/台 / 約 NT$ 120)",
        mapUrl: "https://www.google.com/maps/search/?api=1&query=Marine+City+Busan"
      },
      {
        time: "19:45 - 22:00",
        title: "微醺夜生活：廣安里海景餐酒館 (Clam) / 精釀酒吧 (Gorilla Brewing)",
        desc: "直接前往廣安里海景第一排的 Clam 餐酒館戶外座位，吃著海鮮燉飯與調酒，看著點燈的廣安大橋！飯後可在沙灘散步吹海風。",
        icon: "🍹",
        badges: ["廣安大橋夜景", "海景餐酒館"],
        badgeType: "food",
        transport: "🚕 Marine City 搭計程車約 8 分鐘 (預估車資 ₩5,500/台) / 回飯店約 20 分鐘 (₩13,000/台)",
        mapUrl: "https://www.google.com/maps/search/?api=1&query=Clam+Gwangalli+Busan"
      }
    ]
  },
  {
    day: 6,
    date: "8/14（五）",
    subTitle: "退房 · 機場免稅 · 返台",
    title: "飯店退房 ➔ 前往金海機場辦理退稅與購物 ➔ 搭機返台",
    items: [
      {
        time: "07:30 - 09:00",
        title: "【慢活早晨】飯店享用早餐與整理行李",
        desc: "在東橫INN享用免費早餐、完成戰利品打包與整理，準備退房。",
        icon: "☕",
        badges: ["飯店早餐", "行李打包"],
        badgeType: "sight",
        transport: "🏨 飯店內 (費用 ₩0)",
        mapUrl: "https://www.google.com/maps/search/?api=1&query=Toyoko+Inn+Busan+Station+No.1"
      },
      {
        time: "09:40 - 10:20",
        title: "專車前往金海機場 (Kakao T Venti 大型包車)",
        desc: "飯店辦退提行李，搭乘預約車直達金海機場國際線航廈。",
        icon: "🚕",
        badges: ["專車前往", "直達機場"],
        transport: "🚕 Kakao T Venti 包車約 35 分鐘 (預估車資 ₩25,000-30,000/台 / 約 NT$ 600-720)",
        mapUrl: "https://www.google.com/maps/search/?api=1&query=Gimhae+International+Airport"
      },
      {
        time: "12:45",
        title: "搭乘長榮 BR1193 起飛返抵桃園機場 T2",
        desc: "10:15 - 10:30 前抵達金海機場辦理報到退稅，12:45 起飛 (預計 14:10 抵達桃園 T2)，圓滿結束韓國釜山 6 天 5 夜奢華慢遊。",
        icon: "✈️",
        badges: ["長榮航空", "順利返台"],
        transport: "✈️ 長榮 BR1193 (12:45 起飛 ➔ 14:10 抵達桃園)",
        mapUrl: "https://www.google.com/maps/search/?api=1&query=Taoyuan+International+Airport"
      }
    ]
  }
];

// Olive Young 必買商品 20 款完整資料集 (採用專案本地 100% 永不失效高畫質圖檔與雙購物管道: 台灣 MOMO/PChome + Olive Young 官網)
const oyProductsData = [
  {"id": "mediheal", "time": "01:37", "name": "MEDIHEAL 精華面膜片", "en_name": "MEDIHEAL Essential Mask", "category": "skincare", "category_zh": "臉部護理", "img_url": "./images/oy/mediheal.jpg", "raw_img": "https://global.oliveyoung.com/search?query=MEDIHEAL+Essential+Mask&lang=zh_TW", "momo_url": "https://m.momoshop.com.tw/search.momo?searchKeyword=MEDIHEAL+面膜", "features": "高濃度精華、服貼度高、高CP值", "skin_type": "所有膚質，特別是缺水肌與需要曬後鎮靜者", "reason": "金針菇姐姐強烈推薦的國民面膜。精華液含量極高，面膜紙薄且貼合度優秀。在 Olive Young 購買通常有 10 片一盒的包裝，並且常常有 1+1 (買一送一) 的促銷活動，是去韓國必囤的保濕聖品。", "tips": "建議洗完臉後敷 10-15 分鐘，取下後輕輕按摩至吸收，再擦上乳液鎖水。若有醫美術後泛紅，綠色積雪草款是很好的鎮靜選擇。"},
  {"id": "biodance", "time": "03:25", "name": "Biodance 膠原蛋白深層全效面膜", "en_name": "Biodance Bio-Collagen Real Deep Mask", "category": "skincare", "category_zh": "臉部護理", "img_url": "./images/oy/biodance.jpg", "raw_img": "https://global.oliveyoung.com/search?query=Biodance+Bio-Collagen+Real+Deep+Mask&lang=zh_TW", "momo_url": "https://m.momoshop.com.tw/search.momo?searchKeyword=Biodance+面膜", "features": "水凝膠材質、敷完變透明、深層彈力", "skin_type": "乾性肌、熟齡肌、暗沉無光澤肌", "reason": "近期紅遍全球的「敷著睡覺面膜」。它是果凍般的水凝膠材質，敷上後面膜中的超低分子玻尿酸與膠原蛋白會慢慢被肌膚吸收，面膜會隨時間變為完全透明。能顯著改善毛孔與提亮膚色。", "tips": "適合在夜間保養的最後一步使用，建議敷 3-4 小時以上（甚至敷著入睡），醒來後撕下即可看見驚人的水光感與澎潤肌膚。", "badge": "熱銷斷貨王"},
  {"id": "torriden", "time": "Klook推薦", "name": "Torriden 5D微分子玻尿酸保濕精華", "en_name": "Torriden Dive-In Low Molecular Hyaluronic Acid Serum", "category": "skincare", "category_zh": "臉部護理", "img_url": "./images/oy/torriden.jpg", "raw_img": "https://global.oliveyoung.com/search?query=Torriden+Dive-In+Serum&lang=zh_TW", "momo_url": "https://m.momoshop.com.tw/search.momo?searchKeyword=Torriden+玻尿酸精華", "features": "5重玻尿酸、秒速補水、清爽不黏", "skin_type": "油性肌、混合肌、極度缺水乾燥肌", "reason": "Klook 激推的補水第一名精華！在 Olive Young 連續多年榮獲精華類大賞第一名。含有5種不同分子大小的玻尿酸，能深層滲透肌膚底層，瞬間解渴。質地如水般清爽，吸收後完全不黏膩，是極致的補水神器。", "tips": "洗完臉後，在化妝水後使用 1-2 滴輕拍至全臉吸收，後續疊加面霜鎖水。夏日曬後可厚塗做修護。", "badge": "霸榜精華王"},
  {"id": "manyo", "time": "Klook推薦", "name": "ma:nyo 魔女工廠 純淨潔顏油", "en_name": "ma:nyo Pure Cleansing Oil", "category": "skincare", "category_zh": "臉部清潔", "img_url": "./images/oy/manyo.jpg", "raw_img": "https://global.oliveyoung.com/search?query=manyo+Pure+Cleansing+Oil&lang=zh_TW", "momo_url": "https://m.momoshop.com.tw/search.momo?searchKeyword=魔女工廠+卸妝油", "features": "天然植物油、秒乳化、溫和卸妝", "skin_type": "所有膚質、易長黑頭粉刺肌", "reason": "Klook 批踢踢極力推薦，Olive Young 長年霸榜的國民卸妝油！採用 99.9% 自然衍生植物油成分，溫和不熏眼。遇水瞬間乳化，不僅能徹底卸除濃妝與防曬，更能透過打圈按摩溫和軟化毛孔中的黑頭與髒污。", "tips": "乾手乾臉塗抹全臉按摩，再沾取少量溫水使其完全「乳化」變白，輕柔按摩 30 秒後以溫水徹底洗淨。", "badge": "回購率No.1"},
  {"id": "aestura", "time": "Klook推薦", "name": "AESTURA Atobarrier 365 舒緩保濕乳霜", "en_name": "AESTURA Atobarrier 365 Cream", "category": "skincare", "category_zh": "臉部護理", "img_url": "./images/oy/aestura.jpg", "raw_img": "https://global.oliveyoung.com/search?query=AESTURA+Atobarrier+365+Cream&lang=zh_TW", "momo_url": "https://m.momoshop.com.tw/search.momo?searchKeyword=AESTURA+乳霜", "features": "專利保濕膠囊、修護屏障、舒緩過敏", "skin_type": "敏感肌、乾性肌、肌膚壓痛/紅腫/泛紅者", "reason": "Klook 激推敏感肌救星！由愛茉莉太平洋集團推出的醫學美容護膚品牌。乳霜中含有肉眼可見的專利「Atobarrier」微小保濕膠囊，抹開後迅速融化並形成鎖水膜，修護因過敏或乾燥而受損的肌膚屏障。", "tips": "在護膚最後一步塗抹，特別適合在寒冷季節或搭飛機、乾冷國家時做深層鎖水防護。", "badge": "敏感肌神霜"},
  {"id": "unove", "time": "Klook推薦", "name": "UNOVE 深層受損修護髮膜", "en_name": "UNOVE Deep Damage Treatment EX", "category": "body", "category_zh": "身體保養", "img_url": "./images/oy/unove.jpg", "raw_img": "https://global.oliveyoung.com/search?query=UNOVE+Deep+Damage+Treatment&lang=zh_TW", "momo_url": "https://m.momoshop.com.tw/search.momo?searchKeyword=UNOVE+髮膜", "features": "高濃度蛋白質、沙龍級修護、香氣迷人", "skin_type": "受損髮質、染燙後毛躁分岔、粗糙無光澤髮質", "reason": "Klook 強力推薦，去韓國必囤的沙龍級髮品！Dr.FORHAIR 旗下專攻受損髮的品牌。富含 30,000ppm 高濃度蛋白質，能瞬間撫平毛躁，讓頭髮恢復絲滑柔順的光澤，香氣是溫柔的法式玫瑰與麝香。", "tips": "洗髮後稍微擰乾水分，塗抹於髮尾處並靜置 2-3 分鐘後徹底沖洗，每週使用 2-3 次即可達到深層護髮效果。", "badge": "護髮斷貨王"},
  {"id": "dokdo", "time": "Klook推薦", "name": "Round Lab 1025 獨島化妝水", "en_name": "Round Lab 1025 Dokdo Toner", "category": "skincare", "category_zh": "臉部護理", "img_url": "./images/oy/dokdo.jpg", "raw_img": "https://global.oliveyoung.com/search?query=Round+Lab+1025+Dokdo+Toner&lang=zh_TW", "momo_url": "https://m.momoshop.com.tw/search.momo?searchKeyword=獨島化妝水", "features": "鬱陵島深海水、溫和角質調理、補水清透", "skin_type": "所有膚質，包括敏感肌與易泛紅肌膚", "reason": "Klook 經典推薦！採用鬱陵島深層海水配方，富含 72 種天然礦物質，質地溫和清爽。含有專利去角質酵素，能在日常擦拭中溫和代謝老廢角質，恢復肌膚的細緻亮透。", "tips": "適合搭配化妝棉使用。每天早晚潔面後，用浸濕的化妝棉由內向外順著肌膚紋理輕輕擦拭，也可用於濕敷。", "badge": "獨島系列明星"},
  {"id": "bagel_chip", "time": "Klook推薦", "name": "Delight Project 貝果脆片", "en_name": "Delight Project Bagel Chip", "category": "lifestyle", "category_zh": "健康飲品", "img_url": "./images/oy/bagel_chip.jpg", "raw_img": "https://global.oliveyoung.com/search?query=Delight+Project+Bagel+Chip&lang=zh_TW", "momo_url": "https://m.momoshop.com.tw/search.momo?searchKeyword=Delight+Project+貝果餅乾", "features": "低卡低熱量、慢火烘焙、超人氣辦公室零食", "skin_type": "喜愛零嘴但注重身材管理與低卡健康飲食者", "reason": "Klook 伴手禮極力推薦！Olive Young 的明星自有零食品牌。將真實貝果切片後塗抹奶油慢火烘焙，口感極其酥脆，有蒜香奶油、蜂蜜奶油與披薩等多種口味，熱量極低且飽足感強。", "tips": "極度推薦搭配 Teazen 康普茶一起享用，作為下午茶或宵夜，解饞又完全沒有罪惡感！", "badge": "收銀台秒殺款"},
  {"id": "beyond", "time": "04:14", "name": "Beyond 美白乳液 / 身體乳", "en_name": "Beyond Body Emulsion", "category": "body", "category_zh": "身體保養", "img_url": "./images/oy/beyond.jpg", "raw_img": "https://global.oliveyoung.com/search?query=Beyond+Body+Emulsion&lang=zh_TW", "momo_url": "https://m.momoshop.com.tw/search.momo?searchKeyword=Beyond+身體乳", "features": "溫和草本、高級白麝香、深層鎖水", "skin_type": "所有膚質、身體肌膚乾燥脫屑者", "reason": "LG 生活健康旗下的環保自然品牌。這款身體乳以療癒且高級的「白麝香」香氣聞名，質地乳爽不黏膩，保濕度極佳，能修護乾燥的肌膚屏障。", "tips": "每天洗澡後，在身體微濕時塗抹，保濕與持香效果最佳。"},
  {"id": "yunjac", "time": "05:27", "name": "Yunjac 然植亞保濕底霜 (Base Prep)", "en_name": "Yunjac Skin Perfecting Protective Base Prep", "category": "makeup", "category_zh": "彩妝與定妝", "img_url": "./images/oy/yunjac.jpg", "raw_img": "https://global.oliveyoung.com/search?query=Yunjac+Base+Prep&lang=zh_TW", "momo_url": "https://m.momoshop.com.tw/search.momo?searchKeyword=Yunjac+妝前", "features": "底妝膠水、防護隔離、透亮光澤", "skin_type": "乾性肌、混合偏乾、底妝容易浮粉起皮者", "reason": "高端草本護膚品牌推出的妝前精華。被譽為「乾皮親媽」與「化妝師的秘密武器」，質地如水般輕盈，能迅速覆平臉部角質，讓後續不論是粉底液還是氣墊粉餅都非常貼合，展現高級的水光感。", "tips": "在防曬後、底妝前，取 2-3 滴均勻塗抹於全臉，特別是易卡粉的鼻翼與兩頰，輕拍至微黏狀態再上底妝。", "badge": "美妝大賞第一"},
  {"id": "obge", "time": "06:13", "name": "OBgE 自然防曬棒", "en_name": "OBgE Natural Cover Sun Stick", "category": "skincare", "category_zh": "防曬護理", "img_url": "./images/oy/obge.jpg", "raw_img": "https://global.oliveyoung.com/search?query=OBgE+Sun+Stick&lang=zh_TW", "momo_url": "https://m.momoshop.com.tw/search.momo?searchKeyword=OBgE+防曬", "features": "不沾手、清爽控油、不泛白", "skin_type": "所有膚質、混合偏油、男士、喜愛戶外活動者", "reason": "韓國男士理容第一品牌推出的防曬棒，女生也非常愛用！具備 SPF50+/PA++++ 最高防曬規格。棒狀設計極為方便，完全不沾手，上臉後呈乾爽霧面，且完全不泛白、不黏膩，抗汗效果優秀。", "tips": "適合隨身攜帶，在戶外每 2-3 小時隨時塗抹補防曬。因其清爽度高，妝後輕拍補防曬也不易弄髒妝容。"},
  {"id": "the_saem", "time": "07:12", "name": "The Saem 得鮮完美遮瑕液", "en_name": "The Saem Cover Perfection Tip Concealer", "category": "makeup", "category_zh": "彩妝與定妝", "img_url": "./images/oy/the_saem.jpg", "raw_img": "https://global.oliveyoung.com/search?query=The+Saem+Concealer&lang=zh_TW", "momo_url": "https://m.momoshop.com.tw/search.momo?searchKeyword=The+Saem+遮瑕液", "features": "極高遮瑕力、平價戰神、多色號選擇", "skin_type": "有痘疤、黑眼圈、班點需要高度遮瑕者", "reason": "風靡亞洲的平價遮瑕天王。遮瑕力強、持妝度極佳，不論是多深的痘疤 or 黑眼圈，輕點一下就能完美遮蓋，CP 值高到不可思議。", "tips": "因遮瑕力極高，質地偏乾，建議局部「點」在瑕瑕處，等 10 秒微乾後，再使用濕海綿或粉撲邊緣輕輕拍開。"},
  {"id": "about_tone", "time": "08:40", "name": "About Tone 柔焦控油蜜粉餅", "en_name": "About Tone Blur Powder Pact", "category": "makeup", "category_zh": "彩妝與定妝", "img_url": "./images/oy/about_tone.jpg", "raw_img": "https://global.oliveyoung.com/search?query=About+Tone+Blur+Powder+Pact&lang=zh_TW", "momo_url": "https://m.momoshop.com.tw/search.momo?searchKeyword=About+Tone+蜜粉餅", "features": "一秒磨皮、粉質極細、強效控油", "skin_type": "油性肌、混合肌、毛孔粗大者", "reason": "前身為風靡韓國的 Eglips 蜜粉餅。這款粉餅主打「空氣柔焦」效果，粉質如輕煙般細緻，能瞬間吸附皮脂，讓毛孔隱形，打造如陶瓷娃娃般的乾淨霧面妝效。", "tips": "使用附帶的粉撲，在底妝後輕壓在容易出油的 T 字部位、鼻翼，或用於眼周打底防暈染。"},
  {"id": "so_natural", "time": "09:55", "name": "So Natural 經典定妝噴霧", "en_name": "So Natural All Day Tight Makeup Setting Fixer", "category": "makeup", "category_zh": "彩妝與定妝", "img_url": "./images/oy/so_natural.jpg", "raw_img": "https://global.oliveyoung.com/search?query=So+Natural+Fixer&lang=zh_TW", "momo_url": "https://m.momoshop.com.tw/search.momo?searchKeyword=So+Natural+定妝噴霧", "features": "細緻霧化、快速成膜、抗摩擦防脫妝", "skin_type": "所有膚質、混合偏油、需要長時間持妝者", "reason": "韓國定妝噴霧界的常勝冠軍，粉紅色瓶身非常具有代表性。其壓頭噴出的水霧極其細緻，不會在臉上結成水珠，能快速在底妝上形成保護膜，抗汗、抗油且防摩擦。", "tips": "化妝完成後，將噴霧距離臉部 20-30 公分，畫 'X' 和 'T' 字形噴灑全臉，靜待 1 分鐘自然風乾成膜，切勿用手拍打。"},
  {"id": "canmake", "time": "10:30", "name": "Canmake 腮紅霜", "en_name": "Canmake Cream Cheek", "category": "makeup", "category_zh": "彩妝與定妝", "img_url": "./images/oy/canmake.jpg", "raw_img": "https://global.oliveyoung.com/search?query=Canmake+Cream+Cheek&lang=zh_TW", "momo_url": "https://m.momoshop.com.tw/search.momo?searchKeyword=Canmake+腮紅霜", "features": "清透血色感、凝膠轉粉質、白裡透紅", "skin_type": "所有膚質，尤其是喜愛無粉感日韓系妝容者", "reason": "雖然是日系彩妝，但其極佳的自然融膚感在韓國 Olive Young 也擁有超高人氣。凝膠般的質地上臉推開後會化為乾爽的粉質，呈現如皮膚底層自然透出來 of 紅潤氣色。", "tips": "用手指沾取適量，輕點於蘋果肌處往外拍開，或是用氣墊粉撲上妝，效果更加均勻清透。"},
  {"id": "fillimilli", "time": "11:38", "name": "Fillimilli 胖胖氣墊粉撲", "en_name": "Fillimilli Cushion Pang Pang Puff", "category": "tools", "category_zh": "美妝工具", "img_url": "./images/oy/fillimilli.jpg", "raw_img": "https://global.oliveyoung.com/search?query=Fillimilli+Puff&lang=zh_TW", "momo_url": "https://m.momoshop.com.tw/search.momo?searchKeyword=Fillimilli+粉撲", "features": "厚實有彈性、上妝服貼、省時省粉底", "skin_type": "所有使用氣墊粉餅或粉底液的化妝者", "reason": "Olive Young 自有美妝配件品牌 Fillimilli 的明星產品。這款氣墊粉撲非常厚實，彈性極佳，能將粉底均勻且輕薄地拍入肌膚，大幅提升底妝的服貼度，是去 OY 必抓好幾個回台的貼心小物。", "tips": "可用於氣墊粉餅，也適合搭配普通粉底液使用。上妝時採用「快速拍打」的方式，能讓妝效更具光澤與遮瑕力。"},
  {"id": "too_cool", "time": "12:43", "name": "Too Cool for School 美術課修容/腮紅 #14", "en_name": "Too Cool for School Artclass Shading", "category": "makeup", "category_zh": "彩妝與定妝", "img_url": "./images/oy/too_cool.jpg", "raw_img": "https://global.oliveyoung.com/search?query=Too+Cool+for+School+Artclass+Shading&lang=zh_TW", "momo_url": "https://m.momoshop.com.tw/search.momo?searchKeyword=Too+Cool+for+School+修容", "features": "發色自然、柔滑粉質、不易失手", "skin_type": "彩妝新手、喜愛溫柔日常妝容者", "reason": "Too Cool for School 的經典美術課系列，以極佳的發色與粉質著稱。#14 號色提供了極為溫柔、自然且符合亞洲人膚色的冷暖平衡色調，不易結塊且能完美修飾臉部輪廓。", "tips": "用修容刷或腮紅刷沾取後，在手背上稍微拍掉多餘粉末，再輕刷於臉頰或下顎線，可少量多次疊加。"},
  {"id": "peripera", "time": "14:09", "name": "Peripera 水光唇釉 (Ink Mood Glowy)", "en_name": "Peripera Ink Mood Glowy Tint", "category": "makeup", "category_zh": "彩妝與定妝", "img_url": "./images/oy/peripera.jpg", "raw_img": "https://global.oliveyoung.com/search?query=Peripera+Ink+Mood+Glowy+Tint&lang=zh_TW", "momo_url": "https://m.momoshop.com.tw/search.momo?searchKeyword=Peripera+水光唇釉", "features": "玻璃水光感、滋潤修飾唇紋、持久顯色", "skin_type": "唇紋明顯、喜愛水光嘟嘟唇與純欲妝效者", "reason": "平價彩妝之王 Peripera 的明星水光唇釉。上嘴後會形成一層晶瑩剔透的水光膜，質地保濕不乾澀，且帶有輕微的染唇效果，不容易完全掉色，是打造網紅玻璃唇的首選。", "tips": "塗抹於雙唇後，**靜待 1-2 分鐘不要抿嘴**，等它自動成膜後，水光感和持久度會大幅提升。"},
  {"id": "banila_co", "time": "15:14", "name": "Banila Co 緻柔卸妝膏", "en_name": "Banila Co Clean It Zero Cleansing Balm", "category": "skincare", "category_zh": "臉部清潔", "img_url": "./images/oy/banila_co.jpg", "raw_img": "https://global.oliveyoung.com/search?query=Banila+Co+Clean+It+Zero&lang=zh_TW", "momo_url": "https://m.momoshop.com.tw/search.momo?searchKeyword=Banila+Co+卸妝膏", "features": "雪酪質地、秒乳化、溫和不緊繃", "skin_type": "所有膚質，包括敏感肌與日常化濃妝者", "reason": "風靡全球的「國民卸妝膏」。雪酪般的固體質地，接觸體溫後會瞬間融化並乳化，能溫和、徹底地卸除所有頑固的防水彩妝與毛孔髒污，且洗後完全不熏眼、不緊繃。", "tips": "保持雙手和臉部乾燥，取適量卸妝膏塗抹於臉部輕柔按摩打圈，再沾取少量清水使其完全「乳化」變白，最後用溫水徹底沖洗乾淨。"},
  {"id": "teazen", "time": "16:29", "name": "Teazen 康普茶 (Kombucha)", "en_name": "Teazen Kombucha", "category": "lifestyle", "category_zh": "健康飲品", "img_url": "./images/oy/teazen.jpg", "raw_img": "https://global.oliveyoung.com/search?query=Teazen+Kombucha&lang=zh_TW", "momo_url": "https://m.momoshop.com.tw/search.momo?searchKeyword=Teazen+康普茶", "features": "低卡無糖、富含益生菌、清爽氣泡感", "skin_type": "注重腸道健康、想戒含糖飲料的健康追求者", "reason": "因為 BTS 成員飲用而火遍全韓的健康機能飲品。採用凍乾技術保留乳酸菌與益生元，沖泡後帶有碳酸微氣泡感，口味酸甜清爽（如檸檬、水蜜桃等），一包熱量僅 15 卡，解膩無負擔。", "tips": "用 250ml - 500ml 的冷水或冰水沖泡，氣泡感會更加強烈，喝起來就像健康的汽水，非常適合作為大餐後的消食飲料。"}
];

// 景點寫真照片資料集 (100% 來自《波比看世界》busan-attractions 文章中，且在本次 6 天 5 夜行程內之真實寫實圖)
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

// 實用韓語與計程車中韓地址卡數據庫
const koreanLocations = [
  { zh: "金海國際機場 (PUS)", kr: "김해국제공항", addr: "부산 강서구 공항진입로 108", cat: "taxi", pinyin: "Gimhae Gukje Gonghang" },
  { zh: "東橫INN 釜山站1號店", kr: "토요코인 부산역1호점", addr: "부산 동구 중앙대로 192", cat: "hotel", pinyin: "Toyoko Inn Busan Yeok" },
  { zh: "松島海上纜車", kr: "송도해상케이블카", addr: "부산 서구 송도해변로 171", cat: "sight", pinyin: "Songdo Haesang Cable Car" },
  { zh: "釜山斜坡滑車 (Skyline Luge)", kr: "스카이라인루지 부산", addr: "부산 기장군 기장읍 기장해안로 205", cat: "sight", pinyin: "Skyline Luge Busan" },
  { zh: "SPA LAND 汗蒸幕 (新世界)", kr: "스파랜드 신세계백화점 센텀시티점", addr: "부산 해운대구 센텀남대로 35", cat: "sight", pinyin: "Spa Land Centum City" },
  { zh: "釜山 X the SKY 觀景台", kr: "부산 엑스더스카이", addr: "부산 해운대구 달맞이길 30", cat: "sight", pinyin: "Busan X the SKY" },
  { zh: "廣安里海水浴場 (海灘/餐酒館)", kr: "광안리해수욕장", addr: "부산 수영구 광안해변로 219", cat: "sight", pinyin: "Gwangalli Haesuyokjang" },
  { zh: "甘川文化村", kr: "감천문화마을", addr: "부산 사하구 감내2로 203", cat: "sight", pinyin: "Gamcheon Munhwa Maeul" },
  { zh: "南浦洞味贊王鹽烤肉", kr: "맛찬들왕소금구이 남포점", addr: "부산 중구 비프광장로 5", cat: "food", pinyin: "Matchandeul Nampo" },
  { zh: "札嘎其渡邊水產 (100/101號)", kr: "자갈치시장 와타나베수산 (100, 101호)", addr: "부산 중구 자갈치해안로 52", cat: "food", pinyin: "Watanabe Jagalchi 100" },
  { zh: "新東亞水產市場 (8號攤位/華僑老闆)", kr: "신동아수산시장 8호", addr: "부산 중구 자갈치로 42", cat: "food", pinyin: "Shindonga Market 8" },
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
  { zh: "請給我中文/英文菜單", kr: "메뉴판 좀 주세요", pron: "Menyupan jom juseyo", cat: "food" },
  { zh: "請給我冰水 (韓國餐廳預設)", kr: "찬물 좀 주세요", pron: "Chanmul jom juseyo", cat: "food" },
  { zh: "請不要做太辣 (微辣即可)", kr: "덜 매운 것으로 해주세요", pron: "Deol maeun geoseuro haejuseyo", cat: "food" },
  { zh: "請問這個總共多少錢？", kr: "얼마예요?", pron: "Eolmayeyo?", cat: "shop" },
  { zh: "請算便宜一點 (打折小技巧)", kr: "깍아주세요", pron: "Kkagajuseyo", cat: "shop" },
  { zh: "你好 / 謝謝 / 再見", kr: "안녕하세요 / 감사합니다 / 안녕히 계세요", pron: "Annyeonghaseyo / Kamsahamnida", cat: "common" }
];

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
  const container = document.getElementById("sub-nav-container");
  if (!container) return;
  
  let html = `
    <button class="sub-tab-btn active" data-day="1">
      <span>Day 1</span>
      <small>8/9（日）</small>
    </button>
  `;

  for (let i = 2; i <= 6; i++) {
    const d = itineraryData.find(item => item.day === i);
    if (d) {
      html += `
        <button class="sub-tab-btn" data-day="${d.day}">
          <span>Day ${d.day}</span>
          <small>${d.date}</small>
        </button>
      `;
    }
  }

  html += `
    <button class="sub-tab-btn show-all-btn" data-day="all" style="background: rgba(255, 183, 3, 0.15); border: 1px solid var(--accent-gold); color: var(--accent-gold); font-weight: 700;">
      <span>✨ 全部 6 天行程</span>
      <small>一次完整顯示</small>
    </button>
  `;

  container.innerHTML = html;
}

// 格式化描述（專門優化方案 A 與 方案 B 斷行與卡片展示）
function formatDescription(desc) {
  if (!desc) return '';
  if (desc.includes("方案 A") || desc.includes("方案 B")) {
    return desc
      .replace(/【供家人當天視體力彈性選擇！】<br>/g, '<div style="font-weight:700; color:var(--accent-gold); margin-bottom: 0.5rem;">【供家人當天視體力彈性選擇】</div>')
      .replace(/【供家人當天彈性選擇！】<br>/g, '<div style="font-weight:700; color:var(--accent-gold); margin-bottom: 0.5rem;">【供家人當天視體力彈性選擇】</div>')
      .replace(/•\s*<b>方案 A/g, '<div class="plan-option-container"><div class="plan-option-box plan-a"><b>🟢 方案 A')
      .replace(/•\s*<b>方案 B/g, '</div><div class="plan-option-box plan-b"><b>🔵 方案 B') + '</div></div>';
  }
  return desc;
}

// 渲染每日行程 Timeline
function renderDayTimeline(dayNum) {
  if (dayNum === 'all') {
    renderAllDaysTimeline();
    return;
  }

  const dayData = itineraryData.find(d => d.day === dayNum);
  if (!dayData) return;

  const dayTitleEl = document.getElementById("day-title");
  if (dayTitleEl) {
    dayTitleEl.innerText = `Day ${dayData.day}｜${dayData.date} - ${dayData.title}`;
  }

  const container = document.getElementById("timeline-container");
  if (!container) return;

  let html = `<div class="timeline">`;

  dayData.items.forEach(item => {
    let badgeClass = item.badgeType === "food" ? "badge-food" : "badge-sight";
    let badgesHtml = item.badges
      .map(b => `<span class="badge ${badgeClass}">${b}</span>`)
      .join("");

    let transportHtml = item.transport ? `
      <div class="transport-info-box">
        <i class="fa-solid fa-route"></i>
        <span>建議交通與預估車資：${item.transport}</span>
      </div>
    ` : "";

    html += `
      <div class="timeline-item">
        <div class="timeline-icon">${item.icon}</div>
        <div class="timeline-content">
          <div class="event-header-flex">
            <span class="timeline-time">${item.time}</span>
            <div class="timeline-badges">${badgesHtml}</div>
          </div>
          <h3 class="timeline-title">${item.title}</h3>
          <div class="timeline-desc">${formatDescription(item.desc)}</div>
          ${transportHtml}
          ${item.mapUrl ? `
            <a href="${item.mapUrl}" target="_blank" rel="noopener" class="map-link-btn">
              <i class="fa-solid fa-location-dot"></i> 開啟 Google 地圖 📍
            </a>
          ` : ""}
        </div>
      </div>
    `;
  });

  html += `</div>`;
  container.innerHTML = html;
}

// 一口氣渲染全部 6 天行程
function renderAllDaysTimeline() {
  const dayTitleEl = document.getElementById("day-title");
  if (dayTitleEl) {
    dayTitleEl.innerText = "📅 韓國釜山 6 天 5 夜完整行程總覽 (Day 1 ~ Day 6)";
  }

  const container = document.getElementById("timeline-container");
  if (!container) return;

  let html = "";
  itineraryData.forEach(dayData => {
    html += `
      <div class="day-section-block">
        <h2 class="day-section-title">
          📅 Day ${dayData.day}｜${dayData.date} - ${dayData.title}
        </h2>
        <div class="timeline">
    `;
    dayData.items.forEach(item => {
      let badgeClass = item.badgeType === "food" ? "badge-food" : "badge-sight";
      let badgesHtml = item.badges.map(b => `<span class="badge ${badgeClass}">${b}</span>`).join("");
      let transportHtml = item.transport ? `
        <div class="transport-info-box">
          <i class="fa-solid fa-route"></i>
          <span>建議交通與預估車資：${item.transport}</span>
        </div>
      ` : "";

      html += `
        <div class="timeline-item">
          <div class="timeline-icon">${item.icon}</div>
          <div class="timeline-content">
            <div class="event-header-flex">
              <span class="timeline-time">${item.time}</span>
              <div class="timeline-badges">${badgesHtml}</div>
            </div>
            <h3 class="timeline-title">${item.title}</h3>
            <div class="timeline-desc">${formatDescription(item.desc)}</div>
            ${transportHtml}
            ${item.mapUrl ? `
              <a href="${item.mapUrl}" target="_blank" rel="noopener" class="map-link-btn">
                <i class="fa-solid fa-location-dot"></i> 開啟 Google 地圖 📍
              </a>
            ` : ""}
          </div>
        </div>
      `;
    });
    html += `</div></div>`;
  });
  container.innerHTML = html;
}

// 渲染與分類過濾 Olive Young 20 款必買好物 (修復問題 1)
function renderOliveYoung(filterCategory = 'all') {
  const container = document.getElementById("oy-product-grid");
  if (!container) return;

  let html = "";
  let count = 0;
  oyProductsData.forEach(p => {
    if (filterCategory !== 'all' && p.category !== filterCategory) return;
    count++;
    let targetUrl = p.raw_img || `https://global.oliveyoung.com/search?query=${encodeURIComponent(p.name)}`;
    if (targetUrl.includes('oliveyoung.com') && !targetUrl.includes('lang=')) {
      targetUrl += targetUrl.includes('?') ? '&lang=zh_TW' : '?lang=zh_TW';
    }
    html += `
      <div class="product-card" style="background: var(--bg-card); border: 1px solid var(--border-light); border-radius: var(--radius-md); padding: 1.25rem; display: flex; flex-direction: column; gap: 0.75rem;">
        <div class="oy-thumb-container" style="position: relative; border-radius: 8px; overflow: hidden; height: 180px; background: #ffffff; display: flex; align-items: center; justify-content: center;">
          <img src="${p.img_url}" alt="${p.name}" loading="lazy" referrerpolicy="no-referrer" style="max-width: 100%; max-height: 100%; object-fit: contain; padding: 10px;" onerror="this.style.opacity='0.3'">
        </div>
        <div class="product-badge" style="background: rgba(14, 165, 233, 0.15); color: var(--primary-glow); padding: 0.2rem 0.6rem; border-radius: 4px; font-size: 0.75rem; font-weight: 700; width: fit-content;">${p.badge || p.category_zh}</div>
        <h3 class="product-title" style="font-size: 1.1rem; color: #fff; font-weight: 700; margin: 0;">${p.name}</h3>
        <p style="font-size: 0.8rem; color: var(--text-muted); margin: 0;">${p.en_name || ''}</p>
        <p class="product-features" style="font-size: 0.88rem; color: #e2e8f0; margin: 0;">💡 <b>特色：</b>${p.features}</p>
        <p class="product-skin" style="font-size: 0.85rem; color: var(--text-sub); margin: 0;">👤 <b>適用：</b>${p.skin_type}</p>
        <p class="product-reason" style="font-size: 0.88rem; color: #cbd5e1; line-height: 1.5; margin: 0;">${p.reason}</p>
        <div style="margin-top: auto; display: flex; flex-direction: column; gap: 0.5rem;">
          <a href="${p.momo_url || `https://m.momoshop.com.tw/search.momo?searchKeyword=${encodeURIComponent(p.name)}`}" target="_blank" rel="noopener" class="map-link-btn" style="text-align: center; justify-content: center; background: linear-gradient(135deg, #ff0055, #ff5e78); color: #fff;">
            <i class="fa-solid fa-cart-shopping"></i> 前往 MOMO 購物網搜尋 🛒
          </a>
          <a href="${targetUrl}" target="_blank" rel="noopener" class="map-link-btn" style="text-align: center; justify-content: center; background: rgba(255,255,255,0.08); border: 1px solid var(--border-light); color: var(--text-sub);">
            <i class="fa-solid fa-globe"></i> 前往 Olive Young 官網 🔗
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

// 全域掛載 Olive Young 分類過濾 (修復問題 1 點擊分類沒作用)
window.filterOyCategory = function(category, btn) {
  document.querySelectorAll('.oy-filter-btn').forEach(b => b.classList.remove('active'));
  if (btn) {
    btn.classList.add('active');
  } else if (window.event && window.event.target) {
    window.event.target.classList.add('active');
  }
  renderOliveYoung(category);
};

// 渲染藝廊寫真 (採用 100% 維基免費安全外連，並移除導致顯示日本圖的通用 fallback)
function renderGallery() {
  const container = document.getElementById("gallery-container") || document.getElementById("gallery-grid");
  if (!container) return;

  container.innerHTML = ""; // 防重清空
  let html = "";
  galleryPhotosData.forEach((p, idx) => {
    html += `
      <div class="gallery-card" style="background: rgba(15, 23, 42, 0.7); border: 1px solid var(--border-light); border-radius: var(--radius-md); overflow: hidden; transition: transform 0.3s ease; backdrop-filter: blur(10px); box-shadow: 0 10px 25px rgba(0,0,0,0.5);">
        <div style="height: 200px; overflow: hidden; background: #0f172a; position: relative;">
          <img src="${p.src}" alt="${p.title}" style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.4s ease;" onerror="this.style.opacity='0.5'">
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

// 交通試算方案按鈕點擊監聽
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
    }
    detailBox.innerHTML = plans[planKey];
  };

  if (btn1) btn1.addEventListener("click", () => updatePlan("venti", btn1));
  if (btn2) btn2.addEventListener("click", () => updatePlan("kakao", btn2));
  if (btn3) btn3.addEventListener("click", () => updatePlan("subway", btn3));
}

// 韓元實時計算器
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

// 渲染與美化韓語/地址卡 (大小 100% 完全一致 + 彈窗正中央置頂)
function renderKoreanCards(catFilter = 'all') {
  const container = document.getElementById("korean-cards-container");
  if (!container) return;

  container.innerHTML = ""; // 每次渲染先強制清空，防重複
  let html = "";
  
  // 地點指引卡片
  koreanLocations.forEach(loc => {
    if (catFilter !== 'all' && catFilter !== 'taxi' && catFilter !== loc.cat) return;
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

  // 實用對話卡片
  koreanPhrases.forEach(p => {
    if (catFilter !== 'all' && catFilter !== p.cat) return;
    html += `
      <div class="korean-card-box" style="background: rgba(15, 23, 42, 0.7); border: 1px solid var(--border-light); border-radius: var(--radius-md); padding: 1.25rem; display: flex; flex-direction: column; justify-content: space-between; height: 100%; min-height: 250px; backdrop-filter: blur(10px); box-shadow: 0 10px 25px rgba(0,0,0,0.5);">
        <div>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
            <span style="font-size: 0.75rem; background: rgba(255, 183, 3, 0.15); color: var(--accent-gold); border: 1px solid rgba(255, 183, 3, 0.3); padding: 0.15rem 0.5rem; border-radius: 4px; font-weight: 700;">🗣️ 實用對話</span>
          </div>
          <div style="font-size: 1.1rem; font-weight: 700; color: #fff; min-height: 2.8rem; display: flex; align-items: center;">${p.zh}</div>
          <div style="font-size: 1.2rem; font-weight: 800; color: #38bdf8; letter-spacing: 0.5px; min-height: 3.2rem; display: flex; align-items: center; word-break: break-all;">${p.kr}</div>
          <div style="font-size: 0.85rem; color: var(--text-muted); margin-top: 0.3rem;">🗣️ 發音：${p.pron}</div>
        </div>
        <div style="display: flex; gap: 0.5rem; margin-top: 1rem;">
          <button class="map-link-btn" onclick="copyText('${p.kr}')" style="flex: 1; padding: 0.45rem 0.6rem; font-size: 0.8rem; justify-content: center;">
            <i class="fa-solid fa-copy"></i> 複製韓文
          </button>
          <button class="map-link-btn" onclick="showBigCard('${p.kr}', '${p.zh}', '發音: ${p.pron}')" style="flex: 1.2; background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%) !important; color: #fff !important; padding: 0.45rem 0.6rem; font-size: 0.8rem; justify-content: center; font-weight: 700;">
            <i class="fa-solid fa-comment-dots"></i> 📱 滿版超大字
          </button>
        </div>
      </div>
    `;
  });

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

window.copyTaxiText = function(text) {
  window.copyText(text);
};

// 📱 秀給司機看：強制在螢幕正中央彈出全螢幕遮罩 Modal
window.showBigCard = function(kr, zh, addr) {
  // 防重：先刪除舊的遮罩
  document.querySelectorAll('.big-card-modal-overlay').forEach(el => el.remove());

  const modal = document.createElement("div");
  modal.className = "big-card-modal-overlay";
  modal.style.cssText = `
    position: fixed !important;
    top: 0 !important;
    left: 0 !important;
    width: 100vw !important;
    height: 100vh !important;
    background: rgba(0, 0, 0, 0.85) !important;
    backdrop-filter: blur(12px) !important;
    -webkit-backdrop-filter: blur(12px) !important;
    z-index: 999999 !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    padding: 1rem !important;
  `;

  modal.onclick = (e) => { if (e.target === modal) modal.remove(); };
  modal.innerHTML = `
    <div class="big-card-content" style="background: #0f172a; border: 2px solid var(--accent-gold); padding: 2.5rem 1.5rem; border-radius: 20px; max-width: 90%; width: 480px; text-align: center; box-shadow: 0 25px 60px rgba(0,0,0,0.9); position: relative; color: #fff;">
      <button style="position: absolute; top: 14px; right: 18px; background: transparent; border: none; color: #94a3b8; font-size: 1.6rem; cursor: pointer;" onclick="this.closest('.big-card-modal-overlay').remove()">✕</button>
      <div style="font-size: 1.15rem; color: var(--text-sub); margin-bottom: 0.8rem; font-weight: 500;">${zh}</div>
      <div style="font-size: 2.2rem; font-weight: 900; color: var(--accent-gold); margin-bottom: 1.25rem; word-break: break-all; line-height: 1.35; letter-spacing: 0.5px;">${kr}</div>
      <div style="font-size: 0.95rem; color: #fff; background: rgba(255,255,255,0.06); padding: 1rem; border-radius: 10px; margin-bottom: 1.75rem; border: 1px solid rgba(255,255,255,0.1); line-height: 1.5;">📍 ${addr}</div>
      <button style="background: linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%); color: #fff; font-weight: 800; border: none; padding: 0.8rem 2.5rem; border-radius: 30px; font-size: 1rem; cursor: pointer; box-shadow: 0 4px 15px rgba(14, 165, 233, 0.4);" onclick="this.closest('.big-card-modal-overlay').remove()">
        關閉 (Close)
      </button>
    </div>
  `;
  document.body.appendChild(modal);
};

// 🦀 專屬【渡邊水產 vs 新東亞 8號】完整對比與避坑指南 Modal 彈窗 (修復問題 3)
window.showCrabComparisonModal = function() {
  const modal = document.createElement("div");
  modal.className = "big-card-modal-overlay";
  modal.onclick = (e) => { if (e.target === modal) modal.remove(); };
  modal.innerHTML = `
    <div class="big-card-content" style="background: #0f172a; border: 2px solid #e11d48; padding: 2rem; border-radius: 16px; max-width: 95%; width: 850px; max-height: 85vh; overflow-y: auto; text-align: left; box-shadow: 0 25px 50px rgba(0,0,0,0.9); margin: 5vh auto; position: relative; color: #fff;">
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #e11d48; padding-bottom: 0.8rem; margin-bottom: 1.25rem;">
        <h2 style="font-size: 1.4rem; color: #f43f5e; margin: 0; display: flex; align-items: center; gap: 0.5rem;">
          🦀 札嘎其 100/101號 (渡邊水產) vs 新東亞 8號 8人帝王蟹完整對比指南
        </h2>
        <button style="background: transparent; border: none; color: #94a3b8; font-size: 1.5rem; cursor: pointer;" onclick="this.closest('.big-card-modal-overlay').remove()">✕</button>
      </div>

      <!-- 比對表格 -->
      <div style="overflow-x: auto; margin-bottom: 1.5rem;">
        <table style="width: 100%; border-collapse: collapse; font-size: 0.88rem; background: rgba(30, 41, 59, 0.6); border-radius: 8px; overflow: hidden;">
          <thead>
            <tr style="background: rgba(225, 29, 72, 0.2); color: #fda4af;">
              <th style="padding: 0.75rem; border: 1px solid rgba(255,255,255,0.1); text-align: left;">比較項目</th>
              <th style="padding: 0.75rem; border: 1px solid rgba(255,255,255,0.1); text-align: left;">🏆 札嘎其 100/101號 (渡邊水產)</th>
              <th style="padding: 0.75rem; border: 1px solid rgba(255,255,255,0.1); text-align: left;">🏆 新東亞水產市場 8號攤位</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="padding: 0.65rem; border: 1px solid rgba(255,255,255,0.1); font-weight:700;">所在位置</td>
              <td style="padding: 0.65rem; border: 1px solid rgba(255,255,255,0.1);">札嘎其市場大樓 1 樓（傳統大樓內）</td>
              <td style="padding: 0.65rem; border: 1px solid rgba(255,255,255,0.1);">新東亞水產市場 1 樓（緊鄰札嘎其大樓旁）</td>
            </tr>
            <tr style="background: rgba(255,255,255,0.02);">
              <td style="padding: 0.65rem; border: 1px solid rgba(255,255,255,0.1); font-weight:700;">用餐型態</td>
              <td style="padding: 0.65rem; border: 1px solid rgba(255,255,255,0.1);">1樓挑海鮮 ➔ 上 2樓餐廳用餐</td>
              <td style="padding: 0.65rem; border: 1px solid rgba(255,255,255,0.1);">1樓挑海鮮 ➔ 攤位旁現場設座用餐</td>
            </tr>
            <tr>
              <td style="padding: 0.65rem; border: 1px solid rgba(255,255,255,0.1); font-weight:700;">語言溝通</td>
              <td style="padding: 0.65rem; border: 1px solid rgba(255,255,255,0.1);">中文非常流利（店員/老闆娘會講中文）</td>
              <td style="padding: 0.65rem; border: 1px solid rgba(255,255,255,0.1);">華僑老闆主持，中文極度流利溝通零障礙</td>
            </tr>
            <tr style="background: rgba(255,255,255,0.02);">
              <td style="padding: 0.65rem; border: 1px solid rgba(255,255,255,0.1); font-weight:700;">額外料理費</td>
              <td style="padding: 0.65rem; border: 1px solid rgba(255,255,255,0.1); color:#f87171;">需另付 2 樓開桌費 + 蒸煮加工費 (約 ₩5,000+/人)</td>
              <td style="padding: 0.65rem; border: 1px solid rgba(255,255,255,0.1); color:#4ade80; font-weight:700;">免收額外料理費/開桌費 (包含在車拚總價內)</td>
            </tr>
            <tr>
              <td style="padding: 0.65rem; border: 1px solid rgba(255,255,255,0.1); font-weight:700;">免費招待配菜</td>
              <td style="padding: 0.65rem; border: 1px solid rgba(255,255,255,0.1);">生魚片、大扇貝、鮑魚、生章魚、海膽等豪邁海鮮</td>
              <td style="padding: 0.65rem; border: 1px solid rgba(255,255,255,0.1);">豐富韓式小菜、生章魚、烤/蒸扇貝、海帶湯、鮭魚壽司</td>
            </tr>
            <tr style="background: rgba(255,255,255,0.02);">
              <td style="padding: 0.65rem; border: 1px solid rgba(255,255,255,0.1); font-weight:700;">環境與座位</td>
              <td style="padding: 0.65rem; border: 1px solid rgba(255,255,255,0.1);">2樓為標準餐廳風格，座位多，視野可看港口</td>
              <td style="padding: 0.65rem; border: 1px solid rgba(255,255,255,0.1);">1樓攤位旁傳統鐵桌，很有在地市井接地氣氛圍</td>
            </tr>
            <tr>
              <td style="padding: 0.65rem; border: 1px solid rgba(255,255,255,0.1); font-weight:700;">蟹膏炒飯體驗</td>
              <td style="padding: 0.65rem; border: 1px solid rgba(255,255,255,0.1);">2樓餐廳代為處理，香氣足</td>
              <td style="padding: 0.65rem; border: 1px solid rgba(255,255,255,0.1);">一樓現場直接炒，加入大量芝麻香油與海苔</td>
            </tr>
            <tr style="background: rgba(255,255,255,0.02);">
              <td style="padding: 0.65rem; border: 1px solid rgba(255,255,255,0.1); font-weight:700;">8人桌位舒適度</td>
              <td style="padding: 0.65rem; border: 1px solid rgba(255,255,255,0.1); color:var(--accent-gold);">★★★★☆ (2樓可輕鬆安排 8 人連桌)</td>
              <td style="padding: 0.65rem; border: 1px solid rgba(255,255,255,0.1); color:var(--accent-gold);">★★★☆☆ (空間較緊湊，8 人需稍微併桌)</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- 8人家族選擇建議 -->
      <div style="background: rgba(245, 158, 11, 0.1); border: 1px solid rgba(245, 158, 11, 0.3); padding: 1.25rem; border-radius: 8px; margin-bottom: 1.25rem;">
        <strong style="color: var(--accent-gold); font-size: 1.05rem; display: block; margin-bottom: 0.5rem;">💡 8 人家族選擇總結與建議：</strong>
        <ul style="margin: 0; padding-left: 1.2rem; line-height: 1.6; font-size: 0.9rem; color: #cbd5e1;">
          <li><b>選擇「渡邊水產 (100/101號)」</b>：若全家希望上 2 樓冷氣餐廳坐得寬敞舒適、看港景，且想吃到極致豐富的海鮮拼盤（生魚片、鮑魚大方送）。</li>
          <li><b>選擇「新東亞 8號」</b>：若全家希望一樓一筆結清無隱藏開桌費、華僑老闆溝通親切無壓力、體驗傳統漁港接地氣美食氛圍。</li>
        </ul>
      </div>

      <!-- 防坑指南 -->
      <div style="background: rgba(14, 165, 233, 0.1); border: 1px solid rgba(14, 165, 233, 0.3); padding: 1.25rem; border-radius: 8px;">
        <strong style="color: var(--primary-glow); font-size: 1.05rem; display: block; margin-bottom: 0.5rem;">💡 帝王蟹點餐與防坑實戰指南：</strong>
        <ol style="margin: 0; padding-left: 1.2rem; line-height: 1.6; font-size: 0.9rem; color: #cbd5e1;">
          <li><b>認明紅帝王蟹 (鱈場蟹)</b>：背殼正中央有 <b>6 顆凸出尖刺</b>（肉質最肥美多汁）。不要買成只有 <b>4 顆尖刺的藍帝王蟹 (油蟹)</b>，口感差很多！</li>
          <li><b>秤重扣除籃重</b>：秤重時請確認老闆將電子秤歸零，或扣除塑膠籃本身重量，避免被多算斤兩。</li>
          <li><b>8人份量精算</b>：8 位成人建議挑選 2 隻大帝王蟹 (總重約 4.5～5.5 kg)，再加上店家招待的海鮮與「蟹膏炒飯」，份量就會非常充裕飽足！</li>
        </ol>
      </div>

      <div style="text-align: center; margin-top: 1.5rem;">
        <button style="background: linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%); color: #fff; font-weight: 700; border: none; padding: 0.75rem 2.5rem; border-radius: 30px; font-size: 0.95rem; cursor: pointer;" onclick="this.closest('.big-card-modal-overlay').remove()">
          了解並關閉視窗 (Close)
        </button>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
};

window.openModal = function(index) {
  const photo = galleryPhotosData[index];
  if (!photo) return;
  alert(`${photo.title}\n位置: ${photo.location}\n說明: ${photo.desc}`);
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
