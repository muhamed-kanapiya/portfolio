// Bilingual catalog additions. Demonstration cases never represent named clients.
function catalogTranslation(en, ru) {
  window.RU[en] = ru;
  return en;
}
window.SERVICE_CATEGORIES = [
  ["all", catalogTranslation("All services", "Все услуги")],
  ["ads", "Google Ads"],
  ["seo", "SEO"],
  ["analytics", catalogTranslation("Analytics", "Аналитика")],
  ["web", catalogTranslation("Web development", "Веб-разработка")],
  ["automation", "Python"],
  ["research", catalogTranslation("AEO / GEO & AI", "AEO / GEO и ИИ")],
];
tu.forEach((item) => {
  item.category =
    item.id === "tracking" ? "analytics" : item.id === "cro" ? "web" : "ads";
});
window.RU["Tracking & Analytics"] = "Аналитика GA4 / GTM";

function extraService(
  id,
  category,
  emoji,
  title,
  short,
  description,
  deliverables,
  timeline,
  faq,
) {
  return {
    id,
    category,
    emoji,
    title,
    short,
    heroLine: short,
    long: description,
    extra: true,
    deliverables: deliverables.map(([title, desc]) => ({ title, desc })),
    pricing: [
      {
        pkg: catalogTranslation("Assessment", "Оценка задачи"),
        timeline: catalogTranslation("1–2 working days", "1–2 рабочих дня"),
        price: catalogTranslation("By agreement", "По запросу"),
        bestFor: catalogTranslation(
          "A clear scope and estimate",
          "Состав работ и оценка",
        ),
      },
      {
        pkg: catalogTranslation("Implementation", "Реализация"),
        timeline,
        price: catalogTranslation("By agreement", "По запросу"),
        bestFor: short,
      },
      {
        pkg: catalogTranslation("Ongoing support", "Поддержка"),
        timeline: catalogTranslation("As needed", "По необходимости"),
        price: catalogTranslation("By agreement", "По запросу"),
        bestFor: catalogTranslation(
          "Updates and improvements",
          "Развитие и улучшения",
        ),
      },
    ],
    process: [
      {
        t: catalogTranslation("Understand the task", "Разобраться в задаче"),
        d: catalogTranslation(
          "Review the product, access, existing setup and business priorities.",
          "Изучаем продукт, доступы, текущую систему и приоритеты бизнеса.",
        ),
      },
      {
        t: catalogTranslation("Agree on the scope", "Согласовать объём"),
        d: catalogTranslation(
          "Define deliverables, acceptance criteria, timeline and a fixed estimate before starting.",
          "До начала фиксируем результат, критерии приёмки, сроки и стоимость.",
        ),
      },
      {
        t: catalogTranslation("Build and validate", "Реализовать и проверить"),
        d: catalogTranslation(
          "Work in a test environment, verify key journeys and show the intermediate result.",
          "Работаем в тестовой среде, проверяем ключевые сценарии и показываем промежуточный результат.",
        ),
      },
      {
        t: catalogTranslation("Launch and hand over", "Запустить и передать"),
        d: catalogTranslation(
          "Publish the agreed changes, document the setup and explain how to maintain it.",
          "Публикуем согласованные изменения, документируем настройки и объясняем дальнейшую работу.",
        ),
      },
    ],
    faq: [
      ...faq,
      {
        q: catalogTranslation(
          "What determines the price?",
          "От чего зависит стоимость?",
        ),
        a: catalogTranslation(
          "The number of pages, integrations, current condition and agreed scope. You receive an estimate before work starts.",
          "От количества страниц, интеграций, состояния проекта и объёма работ. Оценку получите до начала.",
        ),
      },
      {
        q: catalogTranslation(
          "Who owns the result?",
          "Кому принадлежит результат?",
        ),
        a: catalogTranslation(
          "You retain your accounts, source files and access. Delivery includes a short handover guide.",
          "Аккаунты, исходники и доступы остаются у вас. Вместе с результатом передаю краткую инструкцию.",
        ),
      },
    ],
  };
}

tu.push(
  extraService(
    "google-ads",
    "ads",
    "G",
    catalogTranslation("Google Ads — end to end", "Google Ads — под ключ"),
    catalogTranslation(
      "One strategy from the first click to the sale",
      "Одна стратегия от клика до продажи",
    ),
    catalogTranslation(
      "An integrated advertising setup: choose the right campaign types, connect conversion tracking and build a measurable optimization process.",
      "Комплексная настройка рекламы: выбираем форматы кампаний, подключаем конверсии и выстраиваем измеримую оптимизацию.",
    ),
    [
      [
        catalogTranslation("Media strategy", "Медиастратегия"),
        catalogTranslation(
          "Goals, market, audience, unit economics and channel allocation.",
          "Цели, рынок, аудитория, экономика продукта и распределение бюджета.",
        ),
      ],
      [
        catalogTranslation("Campaign launch", "Запуск кампаний"),
        catalogTranslation(
          "Search, Shopping, Performance Max and remarketing selected for your task.",
          "Поиск, Shopping, Performance Max и ремаркетинг под вашу задачу.",
        ),
      ],
      [
        catalogTranslation("Measurement plan", "План измерения"),
        catalogTranslation(
          "GA4 / GTM, qualified leads, purchases and CRM signals.",
          "GA4 / GTM, качественные заявки, покупки и сигналы CRM.",
        ),
      ],
      [
        catalogTranslation(
          "Optimization and reporting",
          "Оптимизация и отчётность",
        ),
        catalogTranslation(
          "Search queries, budget, creative testing and a clear performance report.",
          "Запросы, бюджет, тестирование креативов и понятный отчёт о результатах.",
        ),
      ],
    ],
    catalogTranslation("3–7 working days", "3–7 рабочих дней"),
    [
      {
        q: catalogTranslation(
          "Is the ad budget included?",
          "Рекламный бюджет включён?",
        ),
        a: catalogTranslation(
          "No. Advertising spend is paid directly to Google and agreed separately.",
          "Нет. Расходы на рекламу оплачиваются напрямую Google и согласовываются отдельно.",
        ),
      },
    ],
  ),
  extraService(
    "seo",
    "seo",
    "S",
    "SEO",
    catalogTranslation(
      "A website search engines and people understand",
      "Сайт, понятный поисковикам и людям",
    ),
    catalogTranslation(
      "Technical SEO, search intent and useful landing pages. Build an organic acquisition system with clear priorities and measurement.",
      "Техническое SEO, поисковое намерение и полезные посадочные страницы. Выстраиваем органическое привлечение с понятными приоритетами и измерением.",
    ),
    [
      [
        catalogTranslation("Technical SEO audit", "Технический SEO-аудит"),
        catalogTranslation(
          "Indexation, redirects, canonicals, robots.txt, sitemap and page performance.",
          "Индексация, редиректы, canonical, robots.txt, sitemap и скорость страниц.",
        ),
      ],
      [
        catalogTranslation("Search intent mapping", "Карта поискового спроса"),
        catalogTranslation(
          "Group queries by intent and connect them to pages without cannibalization.",
          "Группируем запросы по намерению и распределяем по страницам без конкуренции между ними.",
        ),
      ],
      [
        catalogTranslation("On-page optimization", "Оптимизация страниц"),
        catalogTranslation(
          "Titles, descriptions, headings, internal links and structured data.",
          "Title, description, заголовки, внутренняя перелинковка и структурированные данные.",
        ),
      ],
      [
        catalogTranslation(
          "Organic growth reporting",
          "Аналитика органического роста",
        ),
        catalogTranslation(
          "Search Console and GA4: visibility, relevant visits and conversions.",
          "Search Console и GA4: видимость, целевые посещения и конверсии.",
        ),
      ],
    ],
    catalogTranslation("Audit: 5–7 days", "Аудит: 5–7 дней"),
    [
      {
        q: catalogTranslation(
          "Do you guarantee a first position?",
          "Гарантируете первое место?",
        ),
        a: catalogTranslation(
          "No. We agree on the work and track progress; rankings depend on competition, the site and search systems.",
          "Нет. Фиксируем работы и отслеживаем динамику; позиции зависят от конкуренции, сайта и поисковых систем.",
        ),
      },
    ],
  ),
  extraService(
    "web-development",
    "web",
    "W",
    catalogTranslation("Web development", "Веб-разработка"),
    catalogTranslation(
      "A website built around your business task",
      "Сайт под задачу вашего бизнеса",
    ),
    catalogTranslation(
      "Landing pages, company websites and interactive interfaces, from structure and content to a production-ready release.",
      "Лендинги, сайты компаний и интерактивные интерфейсы: от структуры и контента до готового запуска.",
    ),
    [
      [
        catalogTranslation(
          "Structure and user journey",
          "Структура и путь пользователя",
        ),
        catalogTranslation(
          "Page architecture, key actions and content hierarchy.",
          "Архитектура страниц, ключевые действия и иерархия контента.",
        ),
      ],
      [
        catalogTranslation(
          "Responsive implementation",
          "Адаптивная реализация",
        ),
        catalogTranslation(
          "Layouts that work on mobile, tablet and desktop.",
          "Вёрстка для телефонов, планшетов и компьютеров.",
        ),
      ],
      [
        catalogTranslation("Forms and integrations", "Формы и интеграции"),
        catalogTranslation(
          "Requests, messengers, CRM connections and event tracking.",
          "Заявки, мессенджеры, подключение CRM и отслеживание событий.",
        ),
      ],
      [
        catalogTranslation("Deployment and handover", "Публикация и передача"),
        catalogTranslation(
          "Domain, hosting, basic SEO and instructions for updates.",
          "Домен, хостинг, базовое SEO и инструкция для обновлений.",
        ),
      ],
    ],
    catalogTranslation("From 7 working days", "От 7 рабочих дней"),
    [
      {
        q: catalogTranslation(
          "Which platform will you use?",
          "На какой платформе будет сайт?",
        ),
        a: catalogTranslation(
          "We choose WordPress, Tilda or custom code based on editing needs, integrations and budget.",
          "Выбираем WordPress, Tilda или собственный код по требованиям к редактированию, интеграциям и бюджету.",
        ),
      },
    ],
  ),
  extraService(
    "website-repair",
    "web",
    "↻",
    catalogTranslation(
      "Website fixes and improvement",
      "Исправление и доработка сайтов",
    ),
    catalogTranslation(
      "Remove the friction that loses requests",
      "Устраняем то, что мешает заявкам",
    ),
    catalogTranslation(
      "Repair broken layouts, forms, slow pages and integration issues while preserving the parts of the website that already work.",
      "Исправляем вёрстку, формы, медленные страницы и интеграции, сохраняя работающие части сайта.",
    ),
    [
      [
        catalogTranslation("Problem diagnosis", "Диагностика проблем"),
        catalogTranslation(
          "Reproduce errors and identify their actual causes.",
          "Воспроизводим ошибки и находим их причины.",
        ),
      ],
      [
        catalogTranslation(
          "Layout and mobile fixes",
          "Вёрстка и мобильная версия",
        ),
        catalogTranslation(
          "Overflow, alignment, button states and responsive behavior.",
          "Переполнения, выравнивание, состояния кнопок и адаптивность.",
        ),
      ],
      [
        catalogTranslation("Forms and scripts", "Формы и скрипты"),
        catalogTranslation(
          "Validation, delivery, third-party widgets and JavaScript errors.",
          "Валидация, доставка заявок, сторонние виджеты и ошибки JavaScript.",
        ),
      ],
      [
        catalogTranslation("Regression checks", "Проверка после изменений"),
        catalogTranslation(
          "Check the main pages and journeys before publication.",
          "Проверяем основные страницы и сценарии перед публикацией.",
        ),
      ],
    ],
    catalogTranslation("From 1 working day", "От 1 рабочего дня"),
    [
      {
        q: catalogTranslation(
          "Can you work with an existing website?",
          "Работаете с существующим сайтом?",
        ),
        a: catalogTranslation(
          "Yes. First I review the code or platform access and estimate the specific changes.",
          "Да. Сначала изучаю код или доступы к платформе и оцениваю конкретные изменения.",
        ),
      },
    ],
  ),
  extraService(
    "wordpress",
    "web",
    "WP",
    "WordPress",
    catalogTranslation(
      "A manageable website without unnecessary plugins",
      "Управляемый сайт без лишних плагинов",
    ),
    catalogTranslation(
      "WordPress setup, page development and maintenance with attention to speed, editing convenience and compatibility.",
      "Настройка, разработка страниц и сопровождение WordPress с вниманием к скорости, удобству редактирования и совместимости.",
    ),
    [
      [
        catalogTranslation("Theme and page setup", "Тема и страницы"),
        catalogTranslation(
          "Adapt the theme, blocks and templates to the content.",
          "Адаптируем тему, блоки и шаблоны под контент.",
        ),
      ],
      [
        catalogTranslation("Plugin review", "Проверка плагинов"),
        catalogTranslation(
          "Check conflicts, remove duplicated functions and configure essential tools.",
          "Проверяем конфликты, убираем дубли функций и настраиваем необходимые инструменты.",
        ),
      ],
      [
        catalogTranslation("Speed and SEO basics", "Скорость и базовое SEO"),
        catalogTranslation(
          "Caching, media optimization, metadata and indexing settings.",
          "Кеширование, оптимизация медиа, метаданные и настройки индексации.",
        ),
      ],
      [
        catalogTranslation("Safe updates", "Обновления с проверкой"),
        catalogTranslation(
          "Backups, a staging copy and a maintenance checklist.",
          "Резервные копии, тестовая версия и чек-лист сопровождения.",
        ),
      ],
    ],
    catalogTranslation("From 3 working days", "От 3 рабочих дней"),
    [
      {
        q: catalogTranslation(
          "Can you improve an existing theme?",
          "Можно доработать текущую тему?",
        ),
        a: catalogTranslation(
          "Yes, after checking compatibility and the scope of customization.",
          "Да, после проверки совместимости и объёма изменений.",
        ),
      },
    ],
  ),
  extraService(
    "tilda",
    "web",
    "T",
    "Tilda",
    catalogTranslation(
      "A clear landing page that is easy to update",
      "Понятный лендинг, который легко обновлять",
    ),
    catalogTranslation(
      "Tilda websites and Zero Block sections with responsive layouts, forms, analytics and a clear content structure.",
      "Сайты на Tilda и блоки Zero Block: адаптивная вёрстка, формы, аналитика и понятная структура контента.",
    ),
    [
      [
        catalogTranslation("Page structure", "Структура страницы"),
        catalogTranslation(
          "Offer, benefits, proof, answers and an actionable contact section.",
          "Предложение, преимущества, доказательства, ответы и удобная связь.",
        ),
      ],
      [
        catalogTranslation("Zero Block layouts", "Вёрстка Zero Block"),
        catalogTranslation(
          "Adapt custom sections for key screen sizes.",
          "Адаптируем нестандартные блоки для основных размеров экранов.",
        ),
      ],
      [
        catalogTranslation("Lead collection", "Сбор заявок"),
        catalogTranslation(
          "Forms, messenger links and agreed CRM integrations.",
          "Формы, ссылки на мессенджеры и согласованные CRM-интеграции.",
        ),
      ],
      [
        catalogTranslation("Launch checklist", "Подготовка к запуску"),
        catalogTranslation(
          "Domain, metadata, GA4 / GTM, events and mobile checks.",
          "Домен, метаданные, GA4 / GTM, события и мобильные проверки.",
        ),
      ],
    ],
    catalogTranslation("From 5 working days", "От 5 рабочих дней"),
    [
      {
        q: catalogTranslation(
          "Can I edit the content myself?",
          "Смогу сам менять контент?",
        ),
        a: catalogTranslation(
          "Yes. The website stays in your Tilda account, with a handover guide.",
          "Да. Сайт остаётся в вашем аккаунте Tilda, с инструкцией по редактированию.",
        ),
      },
    ],
  ),
  extraService(
    "react",
    "web",
    "R",
    "React",
    catalogTranslation(
      "Interactive interfaces with predictable behavior",
      "Интерактивные интерфейсы с понятным поведением",
    ),
    catalogTranslation(
      "React components, application screens and frontend improvements with attention to state, accessibility and performance.",
      "Компоненты React, экраны приложений и доработка фронтенда с вниманием к состояниям, доступности и производительности.",
    ),
    [
      [
        catalogTranslation("Component architecture", "Архитектура компонентов"),
        catalogTranslation(
          "Reusable components, shared styles and clear data flow.",
          "Переиспользуемые компоненты, общие стили и понятная передача данных.",
        ),
      ],
      [
        catalogTranslation("Interactive journeys", "Интерактивные сценарии"),
        catalogTranslation(
          "Forms, filters, dialogs and loading, error and empty states.",
          "Формы, фильтры, диалоги и состояния загрузки, ошибки и пустых данных.",
        ),
      ],
      [
        catalogTranslation("API integration", "Подключение API"),
        catalogTranslation(
          "Requests, validation and reliable response handling.",
          "Запросы, валидация и корректная обработка ответов.",
        ),
      ],
      [
        catalogTranslation("Build and checks", "Сборка и проверка"),
        catalogTranslation(
          "Check core behavior, responsive layouts and the production build.",
          "Проверяем ключевое поведение, адаптивность и итоговую сборку.",
        ),
      ],
    ],
    catalogTranslation("Scope-based estimate", "По объёму задачи"),
    [
      {
        q: catalogTranslation(
          "Can you join an existing project?",
          "Можете подключиться к текущему проекту?",
        ),
        a: catalogTranslation(
          "Yes. I work within its existing structure and document the changes.",
          "Да. Сохраняю структуру проекта и документирую изменения.",
        ),
      },
    ],
  ),
  extraService(
    "html-css-js",
    "web",
    "</>",
    "HTML / CSS / JavaScript",
    catalogTranslation(
      "Lightweight pages and precise frontend fixes",
      "Лёгкие страницы и точные правки фронтенда",
    ),
    catalogTranslation(
      "Static websites, responsive layouts and browser interactions without adding a framework where one is not needed.",
      "Статические сайты, адаптивная вёрстка и браузерные взаимодействия без лишних зависимостей.",
    ),
    [
      [
        catalogTranslation("Semantic HTML", "Семантический HTML"),
        catalogTranslation(
          "Clear structure, meaningful headings and accessible controls.",
          "Понятная структура, осмысленные заголовки и доступные элементы управления.",
        ),
      ],
      [
        catalogTranslation("Responsive CSS", "Адаптивный CSS"),
        catalogTranslation(
          "Grid, Flexbox, typography and stable layouts.",
          "Grid, Flexbox, типографика и стабильная вёрстка.",
        ),
      ],
      [
        catalogTranslation("Browser interactions", "Браузерные взаимодействия"),
        catalogTranslation(
          "Forms, menus, calculators and lightweight animations.",
          "Формы, меню, калькуляторы и лёгкая анимация.",
        ),
      ],
      [
        catalogTranslation("Static hosting", "Статический хостинг"),
        catalogTranslation(
          "Preparation for GitHub Pages or your existing hosting.",
          "Подготовка для GitHub Pages или вашего текущего хостинга.",
        ),
      ],
    ],
    catalogTranslation("From 2 working days", "От 2 рабочих дней"),
    [
      {
        q: catalogTranslation(
          "Will it work on GitHub Pages?",
          "Будет работать на GitHub Pages?",
        ),
        a: catalogTranslation(
          "Yes, for static features. Server-side features require a separate backend or service.",
          "Да, для статических функций. Серверные возможности требуют отдельного бэкенда или сервиса.",
        ),
      },
    ],
  ),
  extraService(
    "python",
    "automation",
    "Py",
    "Python",
    catalogTranslation(
      "Automate repetitive work with data",
      "Автоматизируем повторяющуюся работу с данными",
    ),
    catalogTranslation(
      "Scripts for reports, data processing and API connections with clear inputs, logs and handover instructions.",
      "Скрипты для отчётов, обработки данных и подключения API с понятными входными данными, журналами и инструкцией.",
    ),
    [
      [
        catalogTranslation("Data processing", "Обработка данных"),
        catalogTranslation(
          "Clean, validate and combine CSV, Excel and structured exports.",
          "Очищаем, проверяем и объединяем CSV, Excel и структурированные выгрузки.",
        ),
      ],
      [
        catalogTranslation("API workflows", "Работа с API"),
        catalogTranslation(
          "Connect authorized services and handle limits and errors.",
          "Подключаем разрешённые сервисы и обрабатываем лимиты и ошибки.",
        ),
      ],
      [
        catalogTranslation("Report automation", "Автоматизация отчётов"),
        catalogTranslation(
          "Repeatable calculations and scheduled exports in your environment.",
          "Повторяемые расчёты и выгрузки по расписанию в вашей среде.",
        ),
      ],
      [
        catalogTranslation(
          "Documentation and delivery",
          "Документация и передача",
        ),
        catalogTranslation(
          "Configuration examples, logging and a reproducible launch process.",
          "Примеры конфигурации, журналирование и воспроизводимый запуск.",
        ),
      ],
    ],
    catalogTranslation("Scope-based estimate", "По объёму задачи"),
    [
      {
        q: catalogTranslation(
          "Where will the script run?",
          "Где будет работать скрипт?",
        ),
        a: catalogTranslation(
          "On your computer or server. Hosting and scheduling are agreed before implementation.",
          "На вашем компьютере или сервере. Размещение и расписание согласовываем до реализации.",
        ),
      },
    ],
  ),
  extraService(
    "aeo-geo-ai",
    "research",
    "AI",
    catalogTranslation("AEO / GEO & AI pilots", "AEO / GEO и пилоты с ИИ"),
    catalogTranslation(
      "Explore new search and useful AI workflows",
      "Изучаем новый поиск и полезные сценарии ИИ",
    ),
    catalogTranslation(
      "An exploratory direction: audit how content answers questions, test visibility in AI search and prototype practical AI-assisted workflows.",
      "Исследовательское направление: анализ ответов в контенте, тестирование видимости в ИИ-поиске и прототипы полезных процессов с ИИ.",
    ),
    [
      [
        catalogTranslation(
          "Answer-focused content",
          "Контент с ясными ответами",
        ),
        catalogTranslation(
          "Find gaps in questions, entities, evidence and source attribution.",
          "Ищем пробелы в ответах, сущностях, доказательствах и указании источников.",
        ),
      ],
      [
        catalogTranslation("Visibility baseline", "Исходная видимость"),
        catalogTranslation(
          "Record a defined set of queries, dates and AI search observations.",
          "Фиксируем набор запросов, даты и наблюдения в ИИ-поиске.",
        ),
      ],
      [
        catalogTranslation("AI workflow prototype", "Прототип процесса с ИИ"),
        catalogTranslation(
          "Test a bounded task with human review and clear quality criteria.",
          "Тестируем ограниченную задачу с проверкой человеком и критериями качества.",
        ),
      ],
      [
        catalogTranslation("Pilot report", "Отчёт о пилоте"),
        catalogTranslation(
          "Document findings, limitations and the decision on further work.",
          "Документируем наблюдения, ограничения и решение о продолжении.",
        ),
      ],
    ],
    catalogTranslation("Pilot: 1–2 weeks", "Пилот: 1–2 недели"),
    [
      {
        q: catalogTranslation(
          "Do you guarantee AI recommendations?",
          "Гарантируете рекомендации ИИ?",
        ),
        a: catalogTranslation(
          "No. This is research and testing. AI answers vary, and a pilot does not guarantee mentions or traffic.",
          "Нет. Это исследование и тестирование. Ответы ИИ меняются; пилот не гарантирует упоминания или трафик.",
        ),
      },
    ],
  ),
);

// Original reference cases are also examples, not evidence of work for named clients.
Nn.forEach((item) => {
  item.demo = true;
  item.category = "ads";
});
function demoCase(
  id,
  category,
  emoji,
  title,
  headline,
  tag,
  metrics,
  wrong,
  did,
  timeline,
) {
  return {
    id,
    category,
    emoji,
    title,
    headline,
    tag,
    metrics,
    demo: true,
    wrong,
    did,
    timeline,
    overview: {
      type: catalogTranslation(
        "Demonstration scenario",
        "Демонстрационный сценарий",
      ),
      period: catalogTranslation("Illustrative period", "Условный период"),
    },
  };
}
Nn.push(
  demoCase(
    "seo-catalog",
    "seo",
    "S",
    catalogTranslation(
      "SEO: growing a product catalog",
      "SEO: рост товарного каталога",
    ),
    catalogTranslation(
      "A model of technical cleanup and landing-page expansion over three months.",
      "Модель технической оптимизации и развития посадочных за три месяца.",
    ),
    catalogTranslation("Ecommerce • SEO", "Интернет-магазин • SEO"),
    [
      {
        metric: catalogTranslation("Organic visits / mo", "Органика / мес."),
        before: "4 200",
        after: "12 600",
        delta: "+200%",
      },
      {
        metric: catalogTranslation("Organic leads / mo", "Заявки из органики"),
        before: "83",
        after: "214",
        delta: "+158%",
      },
    ],
    [
      catalogTranslation(
        "Duplicate category pages and missing indexation rules",
        "Дубли категорий и ошибки индексации",
      ),
      catalogTranslation(
        "Product pages did not cover purchase intent",
        "Карточки не отвечали на коммерческие запросы",
      ),
    ],
    [
      catalogTranslation(
        "Consolidate duplicate pages and fix canonicals",
        "Объединить дубли и исправить canonical",
      ),
      catalogTranslation(
        "Create category pages from a search-intent map",
        "Создать категории по карте поискового спроса",
      ),
      catalogTranslation(
        "Improve internal links and product metadata",
        "Улучшить перелинковку и метаданные",
      ),
    ],
    [
      catalogTranslation(
        "Month 1: audit and technical fixes",
        "Месяц 1: аудит и технические исправления",
      ),
      catalogTranslation(
        "Month 2: content and category pages",
        "Месяц 2: контент и категории",
      ),
      catalogTranslation(
        "Month 3: measure and refine",
        "Месяц 3: измерение и улучшения",
      ),
    ],
  ),
  demoCase(
    "wordpress-performance",
    "web",
    "WP",
    catalogTranslation(
      "WordPress: a faster path to a request",
      "WordPress: быстрее к заявке",
    ),
    catalogTranslation(
      "A demonstration of performance improvements and a simpler mobile form.",
      "Пример ускорения страниц и упрощения мобильной формы.",
    ),
    catalogTranslation(
      "Company website • WordPress",
      "Сайт компании • WordPress",
    ),
    [
      { metric: "LCP", before: "4.8 s", after: "1.7 s", delta: "−65%" },
      {
        metric: catalogTranslation("Form conversion", "Конверсия формы"),
        before: "1.6%",
        after: "2.8%",
        delta: "+75%",
      },
    ],
    [
      catalogTranslation(
        "Oversized images and duplicated plugin scripts",
        "Тяжёлые изображения и дубли скриптов плагинов",
      ),
      catalogTranslation(
        "A long mobile form with unclear validation",
        "Длинная форма с непонятной валидацией",
      ),
    ],
    [
      catalogTranslation(
        "Optimize images and remove duplicate scripts",
        "Оптимизировать изображения и убрать дубли скриптов",
      ),
      catalogTranslation(
        "Configure caching and defer non-critical resources",
        "Настроить кеш и отложить некритичные ресурсы",
      ),
      catalogTranslation(
        "Simplify the form and show field-level errors",
        "Упростить форму и показывать ошибки у полей",
      ),
    ],
    [
      catalogTranslation("Days 1–2: diagnosis", "Дни 1–2: диагностика"),
      catalogTranslation(
        "Days 3–5: changes on staging",
        "Дни 3–5: изменения на тестовой копии",
      ),
      catalogTranslation(
        "Week 2: release and checks",
        "Неделя 2: выпуск и проверка",
      ),
    ],
  ),
  demoCase(
    "tilda-leadgen",
    "web",
    "T",
    catalogTranslation(
      "Tilda: one clear offer",
      "Tilda: одно понятное предложение",
    ),
    catalogTranslation(
      "A sample landing-page experiment with a shorter request journey.",
      "Пример эксперимента с лендингом и коротким путём к заявке.",
    ),
    catalogTranslation("Landing page • Tilda", "Лендинг • Tilda"),
    [
      {
        metric: catalogTranslation("Conversion rate", "Конверсия"),
        before: "2.4%",
        after: "4.1%",
        delta: "+71%",
      },
      { metric: "CPL", before: "920 ₽", after: "540 ₽", delta: "−41%" },
    ],
    [
      catalogTranslation(
        "Multiple competing calls to action",
        "Несколько конкурирующих призывов к действию",
      ),
      catalogTranslation(
        "Important answers were below the contact form",
        "Важные ответы находились ниже формы",
      ),
    ],
    [
      catalogTranslation(
        "Rewrite the first screen around one offer",
        "Перестроить первый экран вокруг одного предложения",
      ),
      catalogTranslation(
        "Move key answers and proof before the form",
        "Перенести ответы и доказательства выше формы",
      ),
      catalogTranslation(
        "Connect GA4 form steps and validate mobile layouts",
        "Подключить шаги формы в GA4 и проверить адаптивность",
      ),
    ],
    [
      catalogTranslation(
        "Week 1: structure and layout",
        "Неделя 1: структура и вёрстка",
      ),
      catalogTranslation(
        "Week 2: launch the experiment",
        "Неделя 2: запуск эксперимента",
      ),
      catalogTranslation(
        "Weeks 3–4: compare results",
        "Недели 3–4: сравнение результатов",
      ),
    ],
  ),
  demoCase(
    "react-form",
    "web",
    "R",
    catalogTranslation(
      "React: removing form friction",
      "React: меньше препятствий в форме",
    ),
    catalogTranslation(
      "A model of clearer validation, loading states and a shorter application flow.",
      "Модель понятной валидации, состояний загрузки и короткого сценария заявки.",
    ),
    catalogTranslation("Frontend • React", "Фронтенд • React"),
    [
      {
        metric: catalogTranslation("Form completion", "Заполнение формы"),
        before: "38%",
        after: "61%",
        delta: "+61%",
      },
      {
        metric: catalogTranslation("Submission errors", "Ошибки отправки"),
        before: "9.6%",
        after: "1.2%",
        delta: "−88%",
      },
    ],
    [
      catalogTranslation(
        "Errors only appeared after final submission",
        "Ошибки появлялись только после отправки",
      ),
      catalogTranslation(
        "Repeated clicks created duplicate requests",
        "Повторные клики создавали дубли заявок",
      ),
    ],
    [
      catalogTranslation(
        "Add field-level validation and helpful hints",
        "Добавить валидацию полей и подсказки",
      ),
      catalogTranslation(
        "Make pending and error states explicit",
        "Сделать состояния ожидания и ошибки понятными",
      ),
      catalogTranslation(
        "Prevent duplicate submissions and track completion",
        "Исключить дубли отправки и измерять завершение",
      ),
    ],
    [
      catalogTranslation(
        "Days 1–2: reproduce problems",
        "Дни 1–2: воспроизведение проблем",
      ),
      catalogTranslation("Days 3–6: implement changes", "Дни 3–6: реализация"),
      catalogTranslation(
        "Week 2: checks and release",
        "Неделя 2: проверка и выпуск",
      ),
    ],
  ),
  demoCase(
    "ga4-measurement",
    "analytics",
    "GA",
    catalogTranslation(
      "GA4 / GTM: trustworthy events",
      "GA4 / GTM: события без дублей",
    ),
    catalogTranslation(
      "An illustrative tracking repair, with reconciliation against a source of truth.",
      "Пример исправления аналитики со сверкой с источником данных.",
    ),
    catalogTranslation("Measurement • GA4 / GTM", "Измерение • GA4 / GTM"),
    [
      {
        metric: catalogTranslation("Event coverage", "Полнота событий"),
        before: "62%",
        after: "96%",
        delta: catalogTranslation("+34 pp", "+34 п.п."),
      },
      {
        metric: catalogTranslation("Duplicate events", "Дубли событий"),
        before: "18%",
        after: "0%",
        delta: catalogTranslation("−18 pp", "−18 п.п."),
      },
    ],
    [
      catalogTranslation(
        "Two tags recorded the same purchase",
        "Два тега учитывали одну покупку",
      ),
      catalogTranslation(
        "Some successful requests had no event",
        "Для части успешных заявок не было события",
      ),
    ],
    [
      catalogTranslation(
        "Create an event map with clear ownership",
        "Создать карту событий и источников",
      ),
      catalogTranslation(
        "Remove duplicate tags and add stable event IDs",
        "Убрать дубли тегов и добавить идентификаторы событий",
      ),
      catalogTranslation(
        "Validate test orders and reconcile daily totals",
        "Проверить тестовые заказы и сверить ежедневные итоги",
      ),
    ],
    [
      catalogTranslation("Day 1: event audit", "День 1: аудит событий"),
      catalogTranslation(
        "Days 2–3: GTM and GA4 changes",
        "Дни 2–3: настройка GTM и GA4",
      ),
      catalogTranslation("Week 2: reconciliation", "Неделя 2: сверка данных"),
    ],
  ),
  demoCase(
    "python-reporting",
    "automation",
    "Py",
    catalogTranslation(
      "Python: reports without routine",
      "Python: отчёты без рутины",
    ),
    catalogTranslation(
      "A demonstration of a repeatable reporting pipeline from several exports.",
      "Пример повторяемого процесса подготовки отчёта из нескольких выгрузок.",
    ),
    catalogTranslation("Automation • Python", "Автоматизация • Python"),
    [
      {
        metric: catalogTranslation("Hours per report", "Часов на отчёт"),
        before: "6",
        after: "0.5",
        delta: "−92%",
      },
      {
        metric: catalogTranslation("Manual steps", "Ручных операций"),
        before: "14",
        after: "3",
        delta: "−79%",
      },
    ],
    [
      catalogTranslation(
        "Files were merged and checked manually",
        "Файлы объединялись и проверялись вручную",
      ),
      catalogTranslation(
        "Different naming rules broke comparisons",
        "Разные названия мешали сравнивать данные",
      ),
    ],
    [
      catalogTranslation(
        "Normalize schemas and validate input files",
        "Нормализовать схемы и проверить входные файлы",
      ),
      catalogTranslation(
        "Automate joins, calculations and exports",
        "Автоматизировать объединение, расчёты и выгрузку",
      ),
      catalogTranslation(
        "Add logs and a repeatable launch command",
        "Добавить журнал и воспроизводимую команду запуска",
      ),
    ],
    [
      catalogTranslation(
        "Days 1–2: sample data and rules",
        "Дни 1–2: образцы данных и правила",
      ),
      catalogTranslation(
        "Days 3–5: script and checks",
        "Дни 3–5: скрипт и проверки",
      ),
      catalogTranslation("Week 2: handover", "Неделя 2: передача"),
    ],
  ),
  demoCase(
    "aeo-content-pilot",
    "research",
    "AI",
    catalogTranslation(
      "AEO / GEO: a content pilot",
      "AEO / GEO: контентный пилот",
    ),
    catalogTranslation(
      "An example of observing AI-search mentions across a fixed test set, without ranking guarantees.",
      "Пример наблюдения за упоминаниями в ИИ-поиске по фиксированному набору запросов, без гарантий позиций.",
    ),
    catalogTranslation("Research • AEO / GEO", "Исследование • AEO / GEO"),
    [
      {
        metric: catalogTranslation(
          "Mentions in 30 queries",
          "Упоминания в 30 запросах",
        ),
        before: "3",
        after: "12",
        delta: "+9",
      },
      {
        metric: catalogTranslation(
          "Pages with sourced answers",
          "Страниц с ответами",
        ),
        before: "4",
        after: "18",
        delta: "+14",
      },
    ],
    [
      catalogTranslation(
        "Key product questions had no direct answers",
        "На главные вопросы о продукте не было прямых ответов",
      ),
      catalogTranslation(
        "Facts and sources were difficult to identify",
        "Факты и источники было сложно найти",
      ),
    ],
    [
      catalogTranslation(
        "Define a repeatable query set and observation method",
        "Определить набор запросов и метод наблюдения",
      ),
      catalogTranslation(
        "Write concise, sourced answers on relevant pages",
        "Добавить краткие ответы с источниками на нужные страницы",
      ),
      catalogTranslation(
        "Repeat observations and document limitations",
        "Повторить наблюдения и описать ограничения",
      ),
    ],
    [
      catalogTranslation(
        "Week 1: baseline and query set",
        "Неделя 1: исходные данные и запросы",
      ),
      catalogTranslation("Week 2: content pilot", "Неделя 2: контентный пилот"),
      catalogTranslation(
        "Week 4: observation and report",
        "Неделя 4: наблюдение и отчёт",
      ),
    ],
  ),
  demoCase(
    "local-service-search",
    "ads",
    "G",
    catalogTranslation(
      "Local services: more relevant calls",
      "Локальные услуги: целевые звонки",
    ),
    catalogTranslation(
      "A model of geographic focus, intent-based search campaigns and call measurement.",
      "Модель географического фокуса, поисковых кампаний по намерению и измерения звонков.",
    ),
    catalogTranslation(
      "Local business • Search Ads",
      "Локальный бизнес • Google Ads",
    ),
    [
      {
        metric: catalogTranslation(
          "Qualified calls / mo",
          "Целевые звонки / мес.",
        ),
        before: "24",
        after: "67",
        delta: "+179%",
      },
      { metric: "CPL", before: "$56", after: "$29", delta: "−48%" },
    ],
    [
      catalogTranslation(
        "Ads reached areas the business did not serve",
        "Реклама показывалась за пределами зоны обслуживания",
      ),
      catalogTranslation(
        "Calls were counted without qualification",
        "Звонки учитывались без оценки качества",
      ),
    ],
    [
      catalogTranslation(
        "Match geography and schedule to service availability",
        "Согласовать географию и расписание с работой бизнеса",
      ),
      catalogTranslation(
        "Separate urgent and informational queries",
        "Разделить срочные и информационные запросы",
      ),
      catalogTranslation(
        "Import qualified call outcomes into Ads",
        "Передавать результаты целевых звонков в Ads",
      ),
    ],
    [
      catalogTranslation(
        "Week 1: campaign rebuild",
        "Неделя 1: пересборка кампаний",
      ),
      catalogTranslation(
        "Week 2: call measurement",
        "Неделя 2: измерение звонков",
      ),
      catalogTranslation(
        "Weeks 3–4: optimize by lead quality",
        "Недели 3–4: оптимизация по качеству",
      ),
    ],
  ),
);

// Interface copy added with this update.
Object.assign(window.RU, {
  "Explore the full catalog": "Полный каталог услуг",
  "Service catalog": "Каталог услуг",
  "Choose the right solution for your task.":
    "Выберите решение под вашу задачу.",
  "All case studies": "Все кейсы",
  "Case study archive": "Архив кейсов",
  "Approaches, changes and measurable outcomes.":
    "Подходы, изменения и измеримые результаты.",
  "Demonstration case": "Демонстрационный кейс",
  "Illustrative metrics": "Модельные показатели",
  "These numbers illustrate a scenario. They are not verified results for a named client.":
    "Цифры иллюстрируют сценарий и не являются подтверждёнными результатами реального клиента.",
  "Case studies": "Кейсы",
  "Service details": "Об услуге",
  "Discuss the task": "Обсудить задачу",
  "Explore services": "Смотреть услуги",
  "Browse cases": "Смотреть кейсы",
  "Advertising, analytics and development.": "Реклама, аналитика и разработка.",
  "One place for the tools your business needs.":
    "Инструменты роста в одном месте.",
  "Selected cases": "Избранные кейсы",
  "View all services": "Все услуги",
  Website: "Сайт",
  Services: "Услуги",
  Process: "Процесс",
  Contact: "Контакты",
  "Select a service": "Выберите услугу",
  "Your name": "Ваше имя",
  "Your contact": "Ваш контакт",
  "Email, phone or Telegram": "Email, телефон или Telegram",
  "Project website (optional)": "Сайт проекта (необязательно)",
  "Tell me about the task": "Расскажите о задаче",
  "What would you like to improve?": "Что хотите улучшить?",
  "Your message": "Ваша заявка",
  "Send via WhatsApp": "В WhatsApp",
  "Send via Telegram": "В Telegram",
  "Copy message": "Скопировать",
  "Message copied": "Сообщение скопировано",
  "Complete the form to prepare your message.":
    "Заполните форму — здесь появится готовая заявка.",
  "Check the highlighted fields.": "Проверьте отмеченные поля.",
  "The messenger opens a draft. Review it and press Send there.":
    "Откроется черновик в мессенджере. Проверьте его и нажмите «Отправить».",
  "The draft is ready. Confirm sending in the messenger.":
    "Черновик готов. Подтвердите отправку в мессенджере.",
  "Select and copy the text below.": "Выделите и скопируйте текст ниже.",
  "Let’s discuss your project.": "Обсудим ваш проект.",
  "Choose a service, leave a contact and describe the task.":
    "Выберите услугу, оставьте контакт и опишите задачу.",
  "A clear scope. A clear price.": "Понятный объём. Понятная цена.",
  "Choose your currency": "Выберите валюту",
  "One-time": "Разово",
  "Per month": "В месяц",
  "Advertising spend is separate. The final scope and price are agreed before work starts.":
    "Рекламный бюджет оплачивается отдельно. Итоговый объём и стоимость согласуем до начала работы.",
  Audit: "Аудит",
  Launch: "Запуск",
  Management: "Ведение",
  "Most popular": "Популярный выбор",
  "Find the main growth opportunities": "Найти основные точки роста",
  "Build a measurable advertising setup": "Настроить рекламу и измерение",
  "Improve campaigns on an ongoing basis": "Регулярно улучшать кампании",
  "Account and tracking review": "Проверка аккаунта и аналитики",
  "Prioritized action plan": "План действий по приоритетам",
  "Video walkthrough": "Видеоразбор",
  "Conversion tracking": "Отслеживание конверсий",
  "Campaign structure and launch": "Структура и запуск кампаний",
  "Seven days of launch support": "7 дней поддержки запуска",
  "Regular optimization": "Регулярная оптимизация",
  "Budget and query review": "Проверка бюджета и запросов",
  "Weekly progress update": "Еженедельный отчёт",
  "Choose audit": "Выбрать аудит",
  "Choose launch": "Выбрать запуск",
  "Choose management": "Выбрать ведение",
  "Web development and custom tasks": "Разработка и нестандартные задачи",
  "An estimate based on your brief, platform and integrations.":
    "Оценка по задаче, платформе и интеграциям.",
  "Request an estimate": "Получить оценку",
  "Prices in RUB and KZT are indicative, based on the saved NBK rate dated":
    "Цены в RUB и KZT ориентировочные, пересчёт по сохранённому курсу НБК на",
  Currency: "Валюта",
  Home: "Главная",
  "New inquiry — Ads by Kanapiya": "Новая заявка — Ads by Kanapiya",
  Name: "Имя",
  "Contact details": "Контакт",
  Service: "Услуга",
  Message: "Задача",
  "Selected plan": "Выбранный тариф",
  "Not sure yet": "Пока не определился",
  "No results in this category.": "В этой категории пока нет записей.",
  "Client projects": "Клиентские проекты",
  "Back to cases": "К списку кейсов",
  "Back to services": "К списку услуг",
  "What was changed": "Что изменили",
  "Starting point": "Исходная ситуация",
  "Work plan": "План работ",
  "Browse other cases": "Другие кейсы",
  "All directions": "Все направления",
  "Service price": "Стоимость услуги",
  "Delivery scope": "Состав работ",
  "Questions and answers": "Вопросы и ответы",
  "Pricing options": "Варианты работы",
  Menu: "Меню",
  "Close menu": "Закрыть меню",
  "Open menu": "Открыть меню",
});
Object.assign(window.RU, {
  "Advertising, search and websites —": "Реклама, поиск и сайты —",
  "a complete digital setup": "единая цифровая система",
  ". Google Ads, SEO, GA4 / GTM and development. From the first audit to launch and improvement.":
    ". Google Ads, SEO, GA4 / GTM и разработка. От первого аудита до запуска и развития.",
  "Example dashboard · Demo data": "Пример отчёта · Демо-данные",
  Demo: "Демо",
  "Kazakhstan · GMT+5 · Working remotely": "Казахстан · GMT+5 · Работаю онлайн",
  "Projects & partnerships": "Проекты и сотрудничество",
  "Demonstration scenarios": "Демонстрационные сценарии",
  "Two languages": "Два языка",
  "Working remotely": "Работаю онлайн",
  "Google Ads, SEO and web development": "Google Ads, SEO и веб-разработка",
  "Google Ads, SEO, GA4 / GTM and web development. Services, case studies and clients.":
    "Google Ads, SEO, GA4 / GTM и веб-разработка. Услуги, кейсы и клиенты.",
  Timeline: "Сроки",
  Package: "Пакет",
  Price: "Стоимость",
  "Best For": "Для каких задач",
});

window.RU["Account review and priorities"] = "Аудит и приоритеты";
