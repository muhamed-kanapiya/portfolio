/* File names correspond to real, versioned files in site/downloads. */
const COMMUNITY_LINKS = [
  {
    id: "telegram",
    label: "Telegram",
    handle: "@qazaqbiz",
    icon: "↗",
    url: "https://t.me/qazaqbiz",
  },
  {
    id: "instagram",
    label: "Instagram",
    handle: "@qazaq.biz",
    icon: "◎",
    url: "https://www.instagram.com/qazaq.biz/",
  },
  {
    id: "threads",
    label: "Threads",
    handle: "@qazaq.biz",
    icon: "@",
    url: "https://www.threads.com/@qazaq.biz",
  },
];
const RESOURCES = [
  {
    id: "ads-checklist",
    icon: "↗",
    format: "PDF",
    type: "checklist",
    title: learnPair(
      "Чек-лист запуска Google Ads",
      "Google Ads launch checklist",
    ),
    description: learnPair(
      "Экономика, настройки, измерение и проверка пути заявки перед первым расходом.",
      "Economics, settings, measurement and the inquiry flow before the first spend.",
    ),
    contents: [
      learnPair(
        "Цель, бюджет и критерии заявки",
        "Goal, budget and lead definition",
      ),
      learnPair(
        "Запросы, объявления и посадочные страницы",
        "Keywords, ads and landing pages",
      ),
      learnPair(
        "Конверсии, мобильная проверка и план контроля",
        "Conversions, mobile testing and review plan",
      ),
    ],
    use: learnPair(
      "Отмечайте пункты после проверки. Запишите блокирующие ошибки и ответственных; возвращайтесь к документу перед существенными изменениями кампании.",
      "Check items only after verification. Record blocking issues and owners; revisit the document before substantial campaign changes.",
    ),
    courseId: "google-ads",
    pages: 2,
  },
  {
    id: "seo-checklist",
    icon: "◎",
    format: "PDF",
    type: "checklist",
    title: learnPair("Чек-лист SEO-аудита", "SEO audit checklist"),
    description: learnPair(
      "Проверьте доступность, структуру, содержание и измерение поискового трафика.",
      "Check availability, structure, content and organic traffic measurement.",
    ),
    contents: [
      learnPair(
        "Обход, индексация и canonical",
        "Crawling, indexing and canonicals",
      ),
      learnPair(
        "Намерение, контент и внутренние ссылки",
        "Intent, content and internal links",
      ),
      learnPair(
        "Мобильный путь, приоритеты и измерение",
        "Mobile journey, priorities and measurement",
      ),
    ],
    use: learnPair(
      "Возьмите несколько типовых URL, зафиксируйте доказательства проблем и распределите задачи по влиянию и трудоёмкости.",
      "Select representative URLs, record evidence and prioritise tasks by impact and effort.",
    ),
    courseId: "seo",
    pages: 2,
  },
  {
    id: "advertising-brief",
    icon: "✎",
    format: "DOCX",
    type: "brief",
    title: learnPair("Бриф на рекламу", "Advertising brief"),
    description: learnPair(
      "Продукт, аудитория, экономика, доступы и критерии результата в одном документе.",
      "Product, audience, economics, access and success criteria in one document.",
    ),
    contents: [
      learnPair(
        "Продукт и ограничения предложения",
        "Product and offer limitations",
      ),
      learnPair("Аудитория, регион и бюджет", "Audience, locations and budget"),
      learnPair(
        "Обработка лидов, измерение и согласование",
        "Lead handling, measurement and approval",
      ),
    ],
    use: learnPair(
      "Откройте в Word или импортируйте в Google Docs. Заполните поля; неизвестное отмечайте «нужно уточнить». Пароли в бриф не вставляйте.",
      "Open in Word or import into Google Docs. Complete the fields and mark unknowns for clarification. Do not include passwords.",
    ),
    courseId: "google-ads",
    pages: 2,
  },
  {
    id: "website-brief",
    icon: "⌘",
    format: "DOCX",
    type: "brief",
    title: learnPair(
      "Бриф на сайт и интеграции",
      "Website and integrations brief",
    ),
    description: learnPair(
      "Согласуйте структуру, контент, формы, интеграции и критерии приёмки.",
      "Agree structure, content, forms, integrations and acceptance criteria.",
    ),
    contents: [
      learnPair(
        "Задача сайта и пути пользователя",
        "Site goals and user journeys",
      ),
      learnPair(
        "Страницы, контент и технические связи",
        "Pages, content and technical connections",
      ),
      learnPair(
        "Доступность, запуск и сопровождение",
        "Accessibility, launch and maintenance",
      ),
    ],
    use: learnPair(
      "Заполняйте вместе с ответственным за продукт и контент. Для интеграций укажите системы и действия, а секреты передавайте через согласованный защищённый канал.",
      "Complete with the product and content owners. Identify integration systems and actions; exchange secrets only through an agreed secure channel.",
    ),
    courseId: "analytics",
    pages: 2,
  },
  {
    id: "monthly-report",
    icon: "▥",
    format: "DOCX",
    type: "report",
    title: learnPair(
      "Месячный отчёт по маркетингу",
      "Monthly marketing report",
    ),
    description: learnPair(
      "Метрики, сравнение периодов, выводы и следующий план действий.",
      "Metrics, period comparisons, findings and the next action plan.",
    ),
    contents: [
      learnPair(
        "Паспорт отчёта и определения метрик",
        "Report context and metric definitions",
      ),
      learnPair(
        "Таблица результатов без выдуманных цифр",
        "Results table without fabricated numbers",
      ),
      learnPair(
        "Гипотезы, ограничения данных и задачи",
        "Hypotheses, data limitations and actions",
      ),
    ],
    use: learnPair(
      "Сначала задайте период, валюту и источники. Замените пустые значения реальными данными. Изменение в процентах считайте только при ненулевой базе; при нулевой показывайте абсолютную разницу.",
      "Set period, currency and sources first. Replace blank values with real data. Calculate percentage change only for a non-zero baseline; otherwise show absolute change.",
    ),
    courseId: "analytics",
    pages: 2,
  },
];
function resourceFile(resource, language = currentLanguage) {
  return (
    "downloads/" +
    resource.id +
    "-" +
    (language === "en" ? "en" : "ru") +
    "." +
    resource.format.toLowerCase()
  );
}
