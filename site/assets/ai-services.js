/* AI offers based on the author's brief. Copy pairs are [English, Russian]. */
const AI_OFFERS = [
  {
    id: "ai-reports",
    emoji: "📊",
    title: ["AI marketing reports", "ИИ-отчёты для маркетинга"],
    short: [
      "Turn advertising and analytics exports into a clear action plan",
      "Из выгрузок рекламы и аналитики — в понятный план действий",
    ],
    description: [
      "A repeatable reporting workflow for Google Ads, GA4 or Search Console. Calculations run in code; AI helps explain the observations, group search terms and prepare a draft for specialist review.",
      "Повторяемый процесс отчётности по Google Ads, GA4 или Search Console. Показатели рассчитываются кодом, а ИИ помогает объяснить наблюдения, сгруппировать запросы и подготовить черновик для проверки специалистом.",
    ],
    deliverables: [
      [
        ["Data preparation", "Подготовка данных"],
        [
          "One agreed CSV export, column mapping and checks for missing values or inconsistent periods.",
          "Одна согласованная CSV-выгрузка, сопоставление столбцов и проверка пропусков и периодов.",
        ],
      ],
      [
        ["Calculated indicators", "Расчёт показателей"],
        [
          "Spend, leads, CPL and period comparisons calculated from the source data. No invented causes for changes.",
          "Расходы, заявки, CPL и сравнение периодов по исходным данным. Наблюдения отделены от гипотез о причинах изменений.",
        ],
      ],
      [
        ["Readable report", "Понятный отчёт"],
        [
          "An agreed report template with charts, observations, questions and prioritized actions.",
          "Шаблон отчёта с графиками, наблюдениями, вопросами и приоритетными действиями.",
        ],
      ],
      [
        ["Repeatable workflow", "Повторный запуск"],
        [
          "Instructions for the next export, calculation checks and human approval before sharing.",
          "Инструкция для следующей выгрузки, проверка расчётов и согласование перед отправкой.",
        ],
      ],
    ],
    input: [
      "A sample export, metric definitions, comparison periods and an example of your current report.",
      "Пример выгрузки, определения метрик, периоды сравнения и образец текущего отчёта.",
    ],
    acceptance: [
      "Reconcile totals with the export and assess the report's accuracy and preparation time.",
      "Сверяем итоги с выгрузкой, оцениваем точность отчёта и время его подготовки.",
    ],
    related: ["tracking", "google-ads", "python"],
  },
  {
    id: "ai-content",
    emoji: "✍️",
    title: [
      "AI website & catalog content",
      "ИИ-контент для сайтов и каталогов",
    ],
    short: [
      "Product cards, service pages and FAQs with editorial review",
      "Карточки товаров, страницы услуг и FAQ с редакторской проверкой",
    ],
    description: [
      "Build a content workflow using your actual product facts and brand voice. Start with a limited batch, approve its quality, then scale a template that your team can maintain.",
      "Настраиваем подготовку контента на основе фактов о ваших товарах и услугах и стиля бренда. Начинаем с небольшой партии, согласовываем качество и масштабируем понятный команде шаблон.",
    ],
    deliverables: [
      [
        ["Source facts & style", "Факты и стиль"],
        [
          "Product specifications, approved claims, terminology and a tone-of-voice template.",
          "Характеристики, согласованные утверждения, терминология и шаблон стиля.",
        ],
      ],
      [
        ["Pilot batch", "Пилотная партия"],
        [
          "Agree on a bounded batch, for example 20 product cards or 5 service pages, before the estimate.",
          "До оценки фиксируем партию: например, 20 карточек товаров или 5 страниц услуг.",
        ],
      ],
      [
        ["Content & metadata", "Тексты и метаданные"],
        [
          "Structured copy, useful FAQs, title and description drafts without invented benefits.",
          "Структурированные тексты, полезные FAQ, черновики title и description без выдуманных преимуществ.",
        ],
      ],
      [
        ["CMS handover", "Передача в CMS"],
        [
          "An import table or CMS drafts; fact checking and editorial approval before publication.",
          "Таблица для импорта или черновики в CMS; фактчекинг и редакторское согласование перед публикацией.",
        ],
      ],
    ],
    input: [
      "Your product catalog or service brief, style examples and CMS requirements.",
      "Каталог или описание услуг, примеры нужного стиля и требования CMS.",
    ],
    acceptance: [
      "Check facts, completeness, duplicate copy and consistency on the agreed sample.",
      "Проверяем факты, полноту, повторы и единый стиль на согласованной выборке.",
    ],
    related: ["seo", "wordpress", "shopify"],
  },
  {
    id: "ai-assistants",
    emoji: "🤖",
    title: [
      "AI website & Telegram assistants",
      "ИИ-ассистенты для сайта и Telegram",
    ],
    short: [
      "Answer from your materials and hand qualified inquiries to a person",
      "Ответы по вашим материалам и передача заявок человеку",
    ],
    description: [
      "An assistant explains your services, clarifies the visitor's task and prepares a lead summary. The pilot is limited to one channel, one language and one approved knowledge base.",
      "Ассистент объясняет услуги, уточняет задачу посетителя и готовит краткую заявку. Пилот ограничен одним каналом, одним языком и одной согласованной базой знаний.",
    ],
    deliverables: [
      [
        ["Approved knowledge base", "Согласованная база знаний"],
        [
          "Prepare service descriptions, conditions and FAQs; define what the assistant must not guess.",
          "Готовим описания услуг, условия и FAQ; определяем вопросы, на которые ассистент не должен додумывать ответ.",
        ],
      ],
      [
        ["Conversation scenarios", "Сценарии диалога"],
        [
          "Service selection, clarifying questions, contact collection and handover to a manager.",
          "Выбор услуги, уточняющие вопросы, сбор контакта и передача менеджеру.",
        ],
      ],
      [
        ["Channel & lead delivery", "Канал и передача заявки"],
        [
          "A website widget or Telegram bot and one agreed destination for the lead summary.",
          "Виджет сайта или Telegram-бот и одно согласованное место для передачи заявки.",
        ],
      ],
      [
        ["Test questions", "Проверка на вопросах"],
        [
          "An agreed test set covering ordinary, ambiguous and unanswered questions, with a human fallback.",
          "Набор обычных, неоднозначных и неразрешимых вопросов с переходом к человеку при необходимости.",
        ],
      ],
    ],
    input: [
      "Current FAQs, service conditions, examples of inquiries and a manager handover process.",
      "Актуальные FAQ, условия услуг, примеры обращений и порядок передачи менеджеру.",
    ],
    acceptance: [
      "Test answer accuracy, safe refusal to guess and reliable lead delivery.",
      "Проверяем точность ответов, отказ от догадок и доставку заявок.",
    ],
    related: ["crm-integrations", "web-development", "python"],
  },
  {
    id: "ai-automation",
    emoji: "⚙️",
    title: [
      "AI integrations & lead processing",
      "ИИ-интеграции и обработка заявок",
    ],
    short: [
      "From unstructured messages to CRM fields, summaries and tasks",
      "Из свободного текста — в поля CRM, резюме и задачи",
    ],
    description: [
      "Connect a form, email or message workflow with your CRM or spreadsheet. Start with one input type, one AI operation and one destination, with validation and an error-handling path.",
      "Связываем формы, почту или сообщения с CRM или таблицей. Начинаем с одного типа входящих данных, одной ИИ-операции и одного получателя, с проверкой результата и обработкой ошибок.",
    ],
    deliverables: [
      [
        ["Workflow map", "Карта процесса"],
        [
          "Define the input, service and city fields, contact details and responsible team member.",
          "Определяем входящие данные, поля услуги и города, контакты и ответственного сотрудника.",
        ],
      ],
      [
        ["AI processing step", "ИИ-обработка"],
        [
          "Classification, a short summary or a draft response based on approved instructions.",
          "Классификация, краткое резюме или черновик ответа по согласованным правилам.",
        ],
      ],
      [
        ["Integration", "Интеграция"],
        [
          "Connect the destination using an API, n8n or a Python/JavaScript script as appropriate.",
          "Подключаем получателя через API, n8n или скрипт на Python/JavaScript под задачу.",
        ],
      ],
      [
        ["Operational checks", "Контроль работы"],
        [
          "Validate fields, avoid duplicate delivery, log errors and route exceptions to a person.",
          "Проверяем поля, исключаем повторную доставку, записываем ошибки и передаём исключения человеку.",
        ],
      ],
    ],
    input: [
      "Anonymized inquiry examples, CRM fields, available API access and handling rules.",
      "Обезличенные примеры заявок, поля CRM, доступные API и правила обработки.",
    ],
    acceptance: [
      "Check the agreed scenarios end to end, including missing fields and integration failures.",
      "Проверяем согласованные сценарии целиком, включая пропуски полей и сбои интеграций.",
    ],
    related: ["crm-integrations", "python", "tracking"],
  },
  {
    id: "ai-creatives",
    emoji: "🎨",
    title: ["AI advertising creatives", "ИИ-креативы для рекламы"],
    short: [
      "Visual concepts and ad copy ready for a controlled test",
      "Визуальные концепции и тексты для рекламного теста",
    ],
    description: [
      "Develop a limited set of creative hypotheses for a real product. AI helps explore visual and copy variations; selection and final checks remain part of the design process.",
      "Разрабатываем набор креативных гипотез для реального продукта. ИИ помогает исследовать визуальные и текстовые варианты, а отбор и финальная проверка остаются частью работы.",
    ],
    deliverables: [
      [
        ["Creative brief", "Креативный бриф"],
        [
          "One product, audience, offer, platform requirements and brand restrictions.",
          "Один продукт, аудитория, предложение, требования площадки и ограничения бренда.",
        ],
      ],
      [
        ["Concepts", "Концепции"],
        [
          "Agree on a batch, for example three concepts with two visual variations each.",
          "Согласуем партию: например, три концепции с двумя визуальными вариантами каждой.",
        ],
      ],
      [
        ["Production files", "Готовые материалы"],
        [
          "Approved formats, headline and copy options, checked against the real product.",
          "Согласованные форматы, варианты заголовков и текстов, проверенные на соответствие продукту.",
        ],
      ],
      [
        ["Test plan", "План теста"],
        [
          "Name variations consistently and compare CTR, leads and cost once a campaign has data.",
          "Маркируем варианты и сравниваем CTR, заявки и стоимость после накопления данных кампании.",
        ],
      ],
    ],
    input: [
      "Product photos, brand assets, a clear offer and permitted advertising claims.",
      "Фото продукта, материалы бренда, предложение и допустимые рекламные утверждения.",
    ],
    acceptance: [
      "Check product likeness, text readability, required sizes and brand consistency.",
      "Проверяем сходство с продуктом, читаемость текста, размеры и стиль бренда.",
    ],
    related: ["meta-ads", "google-ads", "youtube"],
  },
  {
    id: "ai-web-tools",
    emoji: "🧩",
    title: ["Small AI web tools", "Небольшие веб-инструменты с ИИ"],
    short: [
      "A product selector, brief helper or proposal draft for one task",
      "Подборщик, помощник для брифа или черновик КП под одну задачу",
    ],
    description: [
      "Build an interactive tool around your real catalog or business rules: select a training program, search documentation or prepare a proposal draft. Start with a single useful scenario.",
      "Создаём интерактивный инструмент на основе вашего каталога или бизнес-правил: подбор программы обучения, поиск по документации или черновик коммерческого предложения. Начинаем с одного полезного сценария.",
    ],
    deliverables: [
      [
        ["Scenario prototype", "Прототип сценария"],
        [
          "Map user questions, expected output and a human handover when data is insufficient.",
          "Проектируем вопросы, ожидаемый результат и переход к человеку, если данных недостаточно.",
        ],
      ],
      [
        ["Interface", "Интерфейс"],
        [
          "A responsive React or JavaScript interface integrated with the existing website.",
          "Адаптивный интерфейс на React или JavaScript с интеграцией в существующий сайт.",
        ],
      ],
      [
        ["Server integration", "Серверная часть"],
        [
          "Connect the approved data and model API with protected keys and usage limits.",
          "Подключаем согласованные данные и API модели с защищёнными ключами и лимитами использования.",
        ],
      ],
      [
        ["Handover", "Передача"],
        [
          "Test scenarios, configuration instructions and a documented update path.",
          "Тестовые сценарии, инструкции по настройке и порядок обновления данных.",
        ],
      ],
    ],
    input: [
      "Your catalog or price list, business rules and examples of a good result.",
      "Каталог или прайс, бизнес-правила и примеры хорошего результата.",
    ],
    acceptance: [
      "Check the selected items against the catalog and validate calculations in code.",
      "Сверяем выбранные позиции с каталогом и проверяем расчёты в коде.",
    ],
    related: ["react", "python", "web-development"],
  },
  {
    id: "ai-knowledge",
    emoji: "📚",
    title: ["Internal AI knowledge assistants", "ИИ-ассистент по базе знаний"],
    short: [
      "Find answers in company documents with source references",
      "Ответы по документам компании со ссылками на источники",
    ],
    description: [
      "A pilot for one team and one document collection. The assistant helps find approved information, points to its source and identifies when the material does not answer the question.",
      "Пилот для одной команды и одного набора документов. Ассистент помогает найти согласованную информацию, указывает источник и отмечает вопросы, на которые в материалах нет ответа.",
    ],
    deliverables: [
      [
        ["Document audit", "Аудит документов"],
        [
          "Inventory, format checks, owners and a list of outdated or conflicting materials.",
          "Перечень документов, форматы, ответственные и список устаревших или противоречивых материалов.",
        ],
      ],
      [
        ["Search & references", "Поиск и источники"],
        [
          "Answers grounded in the selected collection with references to the relevant documents.",
          "Ответы на основе выбранных материалов со ссылками на соответствующие документы.",
        ],
      ],
      [
        ["Access & updates", "Доступ и обновления"],
        [
          "Agree who can access each collection and how revised documents enter the system.",
          "Фиксируем, кому доступны материалы и как обновлённые документы попадают в систему.",
        ],
      ],
      [
        ["Evaluation set", "Набор для проверки"],
        [
          "Check ordinary questions, conflicting sources and questions with no supported answer.",
          "Проверяем обычные вопросы, противоречащие источники и вопросы без подтверждённого ответа.",
        ],
      ],
    ],
    input: [
      "An approved document set, access requirements and examples of employee questions.",
      "Согласованный набор документов, требования к доступу и вопросы сотрудников.",
    ],
    acceptance: [
      "Verify source citations, access boundaries and handling of missing information.",
      "Проверяем ссылки на источники, границы доступа и работу при нехватке информации.",
    ],
    related: ["ai-assistants", "crm-integrations", "python"],
  },
  {
    id: "ai-training",
    emoji: "🎓",
    title: ["Practical AI training", "Практическое обучение ИИ"],
    short: [
      "Individual, group and corporate sessions using your own tasks",
      "Индивидуально, в группе или для компании — на ваших задачах",
    ],
    description: [
      "Learn to apply AI to everyday marketing and business tasks: ad copy, content, reports, spreadsheets and team FAQs. The program starts from your materials and produces reusable workflows.",
      "Учимся применять ИИ в задачах маркетинга и бизнеса: рекламных текстах, контенте, отчётах, таблицах и FAQ команды. Программа строится на ваших материалах и даёт повторяемые рабочие сценарии.",
    ],
    deliverables: [
      [
        ["Task selection", "Выбор задач"],
        [
          "Collect three practical tasks in advance and agree the participants' starting level.",
          "Заранее собираем три практические задачи и определяем уровень участников.",
        ],
      ],
      [
        ["Live workshop", "Практическая сессия"],
        [
          "An agreed format, such as a 90–120 minute workshop with hands-on exercises.",
          "Согласованный формат, например воркшоп на 90–120 минут с практическими упражнениями.",
        ],
      ],
      [
        ["Reusable instructions", "Повторяемые инструкции"],
        [
          "Prompt templates, example inputs and step-by-step quality checks.",
          "Шаблоны запросов, примеры исходных данных и пошаговая проверка качества.",
        ],
      ],
      [
        ["Team workflow", "Работа команды"],
        [
          "Agree how to verify facts, handle sensitive data and share useful templates.",
          "Разбираем проверку фактов, обращение с чувствительными данными и обмен шаблонами.",
        ],
      ],
    ],
    input: [
      "Participant roles, current tools and examples of tasks that take the most time.",
      "Роли участников, текущие инструменты и примеры самых трудозатратных задач.",
    ],
    acceptance: [
      "Each participant completes an agreed task and receives a repeatable process.",
      "Участник выполняет согласованную задачу и получает инструкцию для повторения.",
    ],
    related: ["training", "ai-content", "ai-reports"],
  },
];

window.SERVICE_CATEGORIES.push([
  "ai",
  catalogTranslation("AI for business", "ИИ для бизнеса"),
]);
AI_OFFERS.forEach((offer) => {
  const service = extendedCatalogService({
    ...offer,
    category: "ai",
    timeline: ["Agreed after scoping", "После оценки задачи"],
    process: [
      [
        ["Define the task", "Разбор задачи"],
        [
          "Select one workflow, its source data and measurable acceptance criteria.",
          "Выбираем один процесс, исходные данные и измеримые критерии приёмки.",
        ],
      ],
      [
        ["Bounded pilot", "Ограниченный пилот"],
        [
          "Test the approach on an agreed sample before scaling or connecting live systems.",
          "Проверяем подход на согласованной выборке до масштабирования и подключения рабочих систем.",
        ],
      ],
      [
        ["Implementation", "Внедрение"],
        [
          "Integrate the approved workflow and check normal cases, errors and human handover.",
          "Внедряем согласованный процесс, проверяем обычные сценарии, ошибки и передачу человеку.",
        ],
      ],
      [
        ["Handover & support", "Передача и поддержка"],
        [
          "Deliver instructions and agree monitoring, updates and ongoing costs.",
          "Передаём инструкции, согласуем мониторинг, обновления и текущие расходы.",
        ],
      ],
    ],
    faq: [
      [["What do you need to start?", "Что нужно для начала?"], offer.input],
      [
        ["How do we assess quality?", "Как проверим качество?"],
        offer.acceptance,
      ],
      [
        [
          "Are API and hosting costs included?",
          "API и хостинг включены в стоимость?",
        ],
        [
          "Model API usage, subscriptions, hosting and ongoing support are estimated separately. We agree usage limits before launch.",
          "API моделей, подписки, хостинг и сопровождение оцениваются отдельно. Лимиты использования согласуем до запуска.",
        ],
      ],
      [
        ["Can we start small?", "Можно начать с небольшой задачи?"],
        [
          "Yes. We first agree the pilot scope, sample, deliverables and acceptance criteria. Expansion follows the review.",
          "Да. Сначала фиксируем объём пилота, выборку, результат и критерии приёмки. Расширяем после проверки.",
        ],
      ],
    ],
  });
  service.relatedIds = offer.related;
  tu.push(service);
});
const aiSearchService = tu.find((service) => service.id === "aeo-geo-ai");
Object.assign(aiSearchService, {
  title: catalogTranslation(
    "AEO / GEO — AI search visibility",
    "AEO / GEO — видимость в ИИ-поиске",
  ),
  short: catalogTranslation(
    "Clear answers, useful sources and a measured search baseline",
    "Ясные ответы, полезные источники и измеримая поисковая видимость",
  ),
  heroLine: catalogTranslation(
    "Help people and search systems understand your expertise",
    "Помогаем людям и поисковым системам понять вашу экспертизу",
  ),
  long: catalogTranslation(
    "Audit technical access, answer quality, business information and source references. Record a defined query sample with dates and conditions, then prepare a prioritized content and SEO plan. AI recommendations and traffic cannot be guaranteed.",
    "Проверяем техническую доступность, качество ответов, информацию о бизнесе и источники. Фиксируем выборку запросов с датами и условиями проверки, затем готовим план улучшений контента и SEO. Рекомендации ИИ и трафик не гарантируются.",
  ),
  deliverables: [
    {
      title: catalogTranslation("Search readiness", "Готовность к поиску"),
      desc: catalogTranslation(
        "Crawlability, indexation and consistent business information.",
        "Сканирование, индексирование и согласованная информация о бизнесе.",
      ),
    },
    {
      title: catalogTranslation("Content gaps", "Пробелы в контенте"),
      desc: catalogTranslation(
        "Questions, comparisons, conditions, expert evidence and references.",
        "Вопросы, сравнения, условия, подтверждения экспертизы и источники.",
      ),
    },
    {
      title: catalogTranslation("Observation baseline", "Исходные наблюдения"),
      desc: catalogTranslation(
        "An agreed query sample, dates and conditions; answers may vary between checks.",
        "Согласованная выборка запросов, даты и условия; ответы могут отличаться между проверками.",
      ),
    },
    {
      title: catalogTranslation("Prioritized action plan", "План улучшений"),
      desc: catalogTranslation(
        "Technical and editorial actions with a repeat-check plan. No special AI schema is required by Google Search.",
        "Технические и редакторские задачи с планом повторной проверки. Google Поиск не требует специальной ИИ-разметки.",
      ),
    },
  ],
});
