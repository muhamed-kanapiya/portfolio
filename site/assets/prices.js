// Редактируйте цены здесь: USD, RUB и KZT независимы друг от друга.
// Число — фиксированная цена; null — «По запросу». Никакого пересчёта по курсу.
// plans — тарифы на главной; services — цены пакетов на страницах услуг.
// Текущие суммы перенесены из предыдущей версии и теперь зафиксированы.
window.PRICES = {
  plans: {
    audit: {
      USD: 49,
      RUB: 4101,
      KZT: 21939,
    },
    launch: {
      USD: 350,
      RUB: 29291,
      KZT: 156706,
    },
    management: {
      USD: 250,
      RUB: 20922,
      KZT: 111933,
      adSpendPercent: 10,
    },
  },
  services: {
    "search-ads": {
      Audit: {
        USD: 49,
        RUB: 4101,
        KZT: 21939,
      },
      Setup: {
        USD: 350,
        RUB: 29291,
        KZT: 156706,
      },
      Management: {
        USD: 250,
        RUB: 20922,
        KZT: 111933,
        suffix: "+10%",
      },
    },
    pmax: {
      "Fix Existing": {
        USD: 250,
        RUB: 20922,
        KZT: 111933,
      },
      "Full Setup": {
        USD: 400,
        RUB: 33475,
        KZT: 179092,
      },
      Scale: {
        USD: 300,
        RUB: 25106,
        KZT: 134319,
        suffix: "+10%",
      },
    },
    "shopping-pmax": {
      "Feed Fix": {
        USD: 200,
        RUB: 16738,
        KZT: 89546,
      },
      "Shopping Rebuild": {
        USD: 350,
        RUB: 29291,
        KZT: 156706,
      },
      "Full Ecom": {
        USD: 550,
        RUB: 46028,
        KZT: 246252,
      },
    },
    "merchant-center": {
      "Audit + Checklist": {
        USD: 99,
        RUB: 8285,
        KZT: 44325,
      },
      "Unban Package": {
        USD: 400,
        RUB: 33475,
        KZT: 179092,
      },
      "Full GMC Build": {
        USD: 350,
        RUB: 29291,
        KZT: 156706,
      },
    },
    "feed-management": {
      "Title Rewrite (500 SKU)": {
        USD: 180,
        RUB: 15064,
        KZT: 80591,
      },
      "Full Feed System": {
        USD: 400,
        RUB: 33475,
        KZT: 179092,
      },
      "Feed + PMax": {
        USD: 600,
        RUB: 50213,
        KZT: 268638,
      },
    },
    display: {
      "Remarketing Setup": {
        USD: 180,
        RUB: 15064,
        KZT: 80591,
      },
      "Full Display": {
        USD: 300,
        RUB: 25106,
        KZT: 134319,
      },
      "Prospecting + Retarget": {
        USD: 450,
        RUB: 37660,
        KZT: 201479,
      },
    },
    youtube: {
      "Creative Audit": {
        USD: 99,
        RUB: 8285,
        KZT: 44325,
      },
      "YouTube Setup": {
        USD: 400,
        RUB: 33475,
        KZT: 179092,
      },
      "YT + Remarketing": {
        USD: 650,
        RUB: 54397,
        KZT: 291025,
      },
    },
    "demand-gen": {
      Setup: {
        USD: 250,
        RUB: 20922,
        KZT: 111933,
      },
      "Setup + Creative": {
        USD: 500,
        RUB: 41844,
        KZT: 223865,
      },
      "Scale Pack": {
        USD: 300,
        RUB: 25106,
        KZT: 134319,
        suffix: "+10%",
      },
    },
    "app-campaigns": {
      "Install Setup": {
        USD: 350,
        RUB: 29291,
        KZT: 156706,
      },
      "tROAS Scale": {
        USD: 550,
        RUB: 46028,
        KZT: 246252,
      },
      "iOS + Android": {
        USD: 750,
        RUB: 62766,
        KZT: 335798,
      },
    },
    local: {
      "Local Starter": {
        USD: 200,
        RUB: 16738,
        KZT: 89546,
      },
      "LSA + Local": {
        USD: 350,
        RUB: 29291,
        KZT: 156706,
      },
      "Multi-location": {
        USD: 600,
        RUB: 50213,
        KZT: 268638,
      },
    },
    "call-only": {
      "Call Setup": {
        USD: 150,
        RUB: 12553,
        KZT: 67160,
      },
      "Tracking + Calls": {
        USD: 300,
        RUB: 25106,
        KZT: 134319,
      },
      Scale: {
        USD: 250,
        RUB: 20922,
        KZT: 111933,
        suffix: "+10%",
      },
    },
    audit: {
      "Loom Audit": {
        USD: 49,
        RUB: 4101,
        KZT: 21939,
      },
      "Deep Audit + Sheet": {
        USD: 180,
        RUB: 15064,
        KZT: 80591,
      },
      "Audit + Fix": {
        USD: 450,
        RUB: 37660,
        KZT: 201479,
      },
    },
    tracking: {
      "GA4 + GTM Fix": {
        USD: 180,
        RUB: 15064,
        KZT: 80591,
      },
      "Server-Side + EC": {
        USD: 350,
        RUB: 29291,
        KZT: 156706,
      },
      "Full Stack": {
        USD: 550,
        RUB: 46028,
        KZT: 246252,
      },
    },
    cro: {
      "LP Audit": {
        USD: 79,
        RUB: 6611,
        KZT: 35371,
      },
      "Audit + Wireframe": {
        USD: 250,
        RUB: 20922,
        KZT: 111933,
      },
      "CRO Sprint": {
        USD: 600,
        RUB: 50213,
        KZT: 268638,
      },
    },
    competitor: {
      "Intel Report": {
        USD: 99,
        RUB: 8285,
        KZT: 44325,
      },
      "Conquest Setup": {
        USD: 350,
        RUB: 29291,
        KZT: 156706,
      },
      "Defense + Offense": {
        USD: 550,
        RUB: 46028,
        KZT: 246252,
      },
    },
    "google-ads": {
      Assessment: {
        USD: null,
        RUB: null,
        KZT: null,
      },
      Implementation: {
        USD: null,
        RUB: null,
        KZT: null,
      },
      "Ongoing support": {
        USD: null,
        RUB: null,
        KZT: null,
      },
    },
    seo: {
      Assessment: {
        USD: null,
        RUB: null,
        KZT: null,
      },
      Implementation: {
        USD: null,
        RUB: null,
        KZT: null,
      },
      "Ongoing support": {
        USD: null,
        RUB: null,
        KZT: null,
      },
    },
    "web-development": {
      Assessment: {
        USD: null,
        RUB: null,
        KZT: null,
      },
      Implementation: {
        USD: null,
        RUB: null,
        KZT: null,
      },
      "Ongoing support": {
        USD: null,
        RUB: null,
        KZT: null,
      },
    },
    "website-repair": {
      Assessment: {
        USD: null,
        RUB: null,
        KZT: null,
      },
      Implementation: {
        USD: null,
        RUB: null,
        KZT: null,
      },
      "Ongoing support": {
        USD: null,
        RUB: null,
        KZT: null,
      },
    },
    wordpress: {
      Assessment: {
        USD: null,
        RUB: null,
        KZT: null,
      },
      Implementation: {
        USD: null,
        RUB: null,
        KZT: null,
      },
      "Ongoing support": {
        USD: null,
        RUB: null,
        KZT: null,
      },
    },
    tilda: {
      Assessment: {
        USD: null,
        RUB: null,
        KZT: null,
      },
      Implementation: {
        USD: null,
        RUB: null,
        KZT: null,
      },
      "Ongoing support": {
        USD: null,
        RUB: null,
        KZT: null,
      },
    },
    react: {
      Assessment: {
        USD: null,
        RUB: null,
        KZT: null,
      },
      Implementation: {
        USD: null,
        RUB: null,
        KZT: null,
      },
      "Ongoing support": {
        USD: null,
        RUB: null,
        KZT: null,
      },
    },
    "html-css-js": {
      Assessment: {
        USD: null,
        RUB: null,
        KZT: null,
      },
      Implementation: {
        USD: null,
        RUB: null,
        KZT: null,
      },
      "Ongoing support": {
        USD: null,
        RUB: null,
        KZT: null,
      },
    },
    python: {
      Assessment: {
        USD: null,
        RUB: null,
        KZT: null,
      },
      Implementation: {
        USD: null,
        RUB: null,
        KZT: null,
      },
      "Ongoing support": {
        USD: null,
        RUB: null,
        KZT: null,
      },
    },
    "aeo-geo-ai": {
      Assessment: {
        USD: null,
        RUB: null,
        KZT: null,
      },
      Implementation: {
        USD: null,
        RUB: null,
        KZT: null,
      },
      "Ongoing support": {
        USD: null,
        RUB: null,
        KZT: null,
      },
    },
  },
};
