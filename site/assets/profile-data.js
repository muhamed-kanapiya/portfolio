// Edit the biography here. Public sources are listed below; service focus comes from the owner.
window.ABOUT_PROFILE = {
  name: { ru: "Жаксылык Мухамед-Канапия", en: "Zhaksylyk Muhamed-Kanapiya" },
  photo: "assets/media/muhamed-kanapiya.jpg",
  role: {
    ru: "SEO, Google Ads и веб-разработка",
    en: "SEO, Google Ads & web development",
  },
  intro: {
    ru: "Помогаю бизнесу связать рекламу, сайт и аналитику — от первого перехода до понятной заявки.",
    en: "I connect advertising, websites and analytics — from the first visit to a measurable inquiry.",
  },
  story: [
    {
      ru: "Я Мухамед-Канапия, специалист по интернет-маркетингу и разработке из Астаны. Работаю с SEO и Google Ads, создаю и дорабатываю сайты, настраиваю аналитику GA4 и GTM.",
      en: "I’m Muhamed-Kanapiya, a digital marketing and web development specialist based in Astana. I work with SEO and Google Ads, build and improve websites, and set up GA4 and GTM analytics.",
    },
    {
      ru: "В моём опыте — работа в студии Panama.kz и проекты в образовании, услугах и электронной коммерции. Мне интересно разбираться не только в источнике трафика, но и в том, что происходит после клика: насколько удобен сайт, понятен оффер и измерим результат.",
      en: "My experience includes working at Panama.kz and projects in education, services and e-commerce. I look beyond traffic acquisition: how usable the website is, how clear the offer is, and whether the outcome can be measured.",
    },
    {
      ru: "Делюсь знаниями в личном блоге и материалах по digital-маркетингу. Сейчас также изучаю AEO/GEO и применение ИИ в поиске, контенте и автоматизации рабочих задач.",
      en: "I share knowledge through my personal blog and digital marketing materials. I’m also exploring AEO/GEO and AI applications in search, content and workflow automation.",
    },
  ],
  skills: [
    "Google Ads",
    "SEO",
    "GA4 / GTM",
    "WordPress",
    "Tilda",
    "React",
    "HTML / CSS / JS",
    "Python",
    "AEO / GEO",
    "AI",
  ],
  sources: [
    { label: "Kanapiya.ru", url: "https://kanapiya.ru/about-me/" },
    {
      label: "Digital marketing · SlideShare",
      url: "https://www.slideshare.net/slideshow/digital-1-250569254/250569254",
    },
    {
      label: "HackDay · XXIGASYR",
      url: "https://history.hackday.ru/almaty2015/projects",
    },
  ],
};

// Images from client websites. Any case can override these using its own `image` field.
window.CLIENT_COVERS = {
  passimpay: "assets/media/passimpay.png",
  kilc: "assets/media/kilc.webp",
  "maze-rooms": "assets/media/maze-rooms.jpg",
  "topanga-pet-resort": "assets/media/topanga.webp",
  panama: "assets/media/panama.png",
};

window.REVIEW_PLATFORMS = {
  google: { name: "Google Maps", mark: "G", color: "#4285f4" },
  yandex: { name: "Яндекс", mark: "Я", color: "#fc3f1d" },
  "2gis": { name: "2ГИС", mark: "2", color: "#28a838" },
  zoon: { name: "Zoon", mark: "Z", color: "#8455cf" },
  website: { name: "Kanapiya.kz", mark: "↗", color: "#175c45" },
  other: { name: "Other source", mark: "↗", color: "#566773" },
};
window.REVIEW_GOOGLE = {
  url: "https://share.google/jdNFAmuYRN9wqoenw",
  // Provided by the owner; links to the write-review dialog.
  writeUrl: "https://g.page/r/CahhKOISykYqEAE/review",
  shareUrl: "https://share.google/jdNFAmuYRN9wqoenw",
  rating: 5,
  count: 41,
  checkedAt: "2026-10-06",
};

// Real public feedback, checked 2026-10-06. No invented ratings, dates or platforms.
// `kind: summary` explicitly labels paraphrases. For supplied full texts use `kind: original`.
// `published: false` keeps a draft off both the homepage and archive.
// Ratings may be null if the source has no numeric rating. Add new platforms above if needed.
window.REVIEWS = [
  {
    id: "google-bis",
    author: "BIS",
    platform: "google",
    rating: 5,
    published: true,
    kind: "summary",
    topic: { ru: "Сайты, SEO и Google Ads", en: "Web, SEO & Google Ads" },
    text: {
      ru: "Клиент сотрудничает с Мухамедом несколько лет: заказывает создание сайтов, SEO и рекламу в Google Ads. Отдельно отмечает обучение, которое проходили специалисты команды.",
      en: "The client describes several years of working together on websites, SEO and Google Ads, and also mentions training sessions for their team.",
    },
  },
  {
    id: "google-dorn",
    author: "DORN _ ART STUDIO",
    platform: "google",
    rating: 5,
    published: true,
    kind: "summary",
    topic: { ru: "Обучение Google Ads", en: "Google Ads training" },
    text: {
      ru: "Обучение подошло клиентке без опыта в Google Ads. Она отмечает доступные объяснения и практическую пользу занятий. За несколько недель разобралась в создании разных видов рекламы, анализе и подготовке отчётности. Особенно выделяет прикладные советы, основанные на опыте специалиста.",
      en: "The training suited a client with no prior Google Ads experience. She highlights clear explanations and practical lessons. Within a few weeks she learned to create different campaign types, analyse results and prepare reports, and particularly valued advice drawn from hands-on experience.",
    },
  },
  {
    id: "google-diana",
    author: "Diana Azhiken",
    platform: "google",
    rating: 5,
    published: true,
    kind: "summary",
    topic: { ru: "Локальное SEO", en: "Local SEO" },
    text: {
      ru: "Обратилась за локальным SEO по рекомендации знакомых. В отзыве отмечает, что ей объяснили подход, показали, как всё устроено, и приступили к работе.",
      en: "The client came for local SEO following a recommendation. She notes that the approach was explained clearly and the team then started the work.",
    },
  },
  {
    id: "google-xbet",
    author: "xBET GG",
    platform: "google",
    rating: 5,
    published: true,
    kind: "summary",
    topic: { ru: "SEO-аудит", en: "SEO audit" },
    text: {
      ru: "Команда долго искала SEO-специалиста. В отзыве отмечает подробный разбор проблем сайта и понятные рекомендации по изменениям. Клиент рекомендует специалиста и благодарит за анализ проекта.",
      en: "After a long search for an SEO specialist, the team valued the detailed website analysis and clear recommendations for changes. The client recommends working together.",
    },
  },
  {
    id: "google-mansura",
    author: "Мансура и Алия Hik",
    platform: "google",
    rating: 5,
    published: true,
    kind: "summary",
    topic: { ru: "SEO-продвижение", en: "SEO promotion" },
    text: {
      ru: "Клиентка искала SEO-специалиста с подходящим соотношением цены и качества. Благодарит за выполненную работу и отмечает, что ей было интересно наблюдать за результатами, даже без технических знаний.",
      en: "The client was looking for SEO help with a suitable balance of price and quality. She thanks the specialist and describes following the results despite having no technical background.",
    },
  },
  {
    id: "website-erik",
    author: "Ing. Erik Telepovský",
    platform: "website",
    rating: null,
    published: true,
    kind: "summary",
    sourceUrl: "https://kanapiya.kz/",
    topic: { ru: "Локализация", en: "Localization" },
    text: {
      ru: "Эрик отмечает оперативный и качественный перевод без необходимости исправлений, профессиональный подход и готовность помочь после завершения работы. Рекомендует сотрудничество.",
      en: "Erik highlights a fast, accurate translation that needed no corrections, a professional approach and the offer of continued support. He recommends working together.",
    },
  },
];
