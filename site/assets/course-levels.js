/* Manual fees per participant for the complete program. No exchange-rate calculations.
   Group fees supplied by the owner; one-to-one and mentor fees are editable proposals. */
const COURSE_FORMATS = [
  {
    id: "group",
    title: learnPair("В группе", "Small group"),
    description: learnPair(
      "Общая программа, занятия и обсуждение заданий с группой.",
      "A shared curriculum, classes and group discussion of assignments.",
    ),
  },
  {
    id: "individual",
    title: learnPair("Индивидуально", "One to one"),
    description: learnPair(
      "Личные занятия, ваш темп и практика на вашем проекте.",
      "Private sessions, your pace and exercises based on your project.",
    ),
  },
  {
    id: "mentor",
    title: learnPair("С наставником", "With a mentor"),
    description: learnPair(
      "Самостоятельное изучение, персональный план и подробный разбор проекта между контрольными встречами.",
      "Independent study, a personal plan and detailed project feedback between milestone meetings.",
    ),
  },
];
const COURSE_FORMAT_PRICES = {
  "seo-junior": {
    group: { KZT: 50000, RUB: null, USD: null },
    individual: { KZT: 75000, RUB: null, USD: null },
    mentor: { KZT: 100000, RUB: null, USD: null },
  },
  "seo-middle": {
    group: { KZT: 150000, RUB: null, USD: null },
    individual: { KZT: 225000, RUB: null, USD: null },
    mentor: { KZT: 300000, RUB: null, USD: null },
  },
  "seo-senior": {
    group: { KZT: 250000, RUB: null, USD: null },
    individual: { KZT: 375000, RUB: null, USD: null },
    mentor: { KZT: 500000, RUB: null, USD: null },
  },
  "google-ads-junior": {
    group: { KZT: 80000, RUB: null, USD: null },
    individual: { KZT: 120000, RUB: null, USD: null },
    mentor: { KZT: 160000, RUB: null, USD: null },
  },
  "google-ads-middle": {
    group: { KZT: 170000, RUB: null, USD: null },
    individual: { KZT: 255000, RUB: null, USD: null },
    mentor: { KZT: 340000, RUB: null, USD: null },
  },
  "google-ads-senior": {
    group: { KZT: 300000, RUB: null, USD: null },
    individual: { KZT: 450000, RUB: null, USD: null },
    mentor: { KZT: 600000, RUB: null, USD: null },
  },
};

// Each row: title, explanation, worked example, exercise, knowledge check, answer options.
const ADVANCED_COURSE_UNITS = {
  "seo-middle": [
    [
      ["Диагностика индексации", "Indexing diagnosis"],
      [
        "Разделите обнаружение URL, обход, индексацию и показ в поиске. Проверяйте ответ сервера, доступность для робота, noindex и выбранный canonical отдельно. Sitemap помогает обнаружению, но не гарантирует индексацию. Перед массовой правкой проверьте репрезентативную выборку шаблонов.",
        "Separate URL discovery, crawling, indexing and search visibility. Check server responses, crawler access, noindex and the selected canonical independently. A sitemap aids discovery but cannot guarantee indexing. Inspect a representative sample of templates before applying a site-wide change.",
      ],
      [
        "Из 1 000 страниц каталога 200 исключены тегом noindex после релиза. Сначала подтверждаем намерение и исправляем шаблон, затем проверяем повторный обход.",
        "A release left 200 of 1,000 catalog pages with noindex. Confirm the intended behavior, fix the template and then monitor recrawling.",
      ],
      [
        "Составьте таблицу из 10 URL: HTTP-статус, robots, meta robots, canonical и ожидаемое действие. Выберите приоритет по потенциальному ущербу.",
        "Create a ten-URL table with HTTP status, robots, meta robots, canonical and the intended action. Prioritize by potential damage.",
      ],
      [
        "Что сначала проверить при выпадении шаблона из индекса?",
        "What should you check first when a template disappears from the index?",
      ],
      [
        [
          "Технические ограничения и историю релиза",
          "Technical restrictions and release history",
        ],
        ["Цвет кнопок", "Button colors"],
        ["Количество постов в соцсетях", "The number of social posts"],
      ],
    ],
    [
      [
        "Карта интентов и конкурирующие URL",
        "Intent mapping and competing URLs",
      ],
      [
        "Несколько URL по запросу не всегда означают проблему. Сопоставьте намерение пользователя, тип страницы и динамику показов каждого URL. Объединение оправдано, если страницы решают одну задачу и мешают выбрать устойчивую посадочную. Сохраните уникальную пользу и настройте перенаправление только при реальном удалении URL.",
        "Several URLs appearing for one query do not automatically indicate a problem. Compare user intent, page type and impressions for each URL. Consolidate when pages serve the same purpose and prevent a stable landing page from emerging. Preserve unique value and redirect only when a URL is actually retired.",
      ],
      [
        "Статья «как выбрать CRM» и страница услуги внедрения отвечают разным интентам. Их стоит связать, а не автоматически склеивать.",
        "An article on choosing a CRM and an implementation service page serve different intents. Link them instead of automatically merging them.",
      ],
      [
        "Разметьте 20 запросов по интентам. Для каждой группы укажите основной URL, полезную связку и критерий необходимости объединения.",
        "Group twenty queries by intent. Assign a primary URL, a useful internal link and a criterion for deciding whether consolidation is needed.",
      ],
      [
        "Когда объединение двух страниц обосновано?",
        "When is merging two pages justified?",
      ],
      [
        [
          "Когда они дублируют одну задачу пользователя",
          "When they duplicate the same user task",
        ],
        ["Всегда при одинаковом слове в title", "Whenever titles share a word"],
        ["Если у одной страницы меньше текста", "If one page has less text"],
      ],
    ],
    [
      ["Приоритеты контентного обновления", "Content refresh priorities"],
      [
        "Оценивайте не только объём трафика, но и актуальность, полезность и связь с коммерческой задачей. Найдите запросы с показами и страницы, где посетитель не получает ответа. Обновление должно исправлять конкретный пробел: условия, сравнение, доказательства или следующий шаг. Дата обновления сама по себе не создаёт ценность.",
        "Consider relevance, usefulness and the business objective alongside traffic volume. Find queries with impressions and pages that leave visitors without an answer. A refresh should fix a specific gap: terms, comparisons, evidence or the next step. Changing a publication date alone does not add value.",
      ],
      [
        "Страница получает 12 000 показов, но не объясняет сроки и ограничения услуги. Добавляем эти ответы, а затем сравниваем одинаковые периоды.",
        "A page receives 12,000 impressions but omits delivery times and service limits. Add those answers, then compare equivalent time periods.",
      ],
      [
        "Подготовьте бриф обновления: интент, недостающие ответы, источник фактов, CTA и две метрики. Укажите дату повторной оценки.",
        "Prepare a refresh brief covering intent, missing answers, evidence sources, CTA and two metrics. Set a review date.",
      ],
      [
        "Что делает обновление содержательным?",
        "What makes a content refresh meaningful?",
      ],
      [
        [
          "Закрытие подтверждённого пробела в ответе",
          "Addressing a demonstrated information gap",
        ],
        ["Только новая дата", "Only a new date"],
        ["Повтор ключа десять раз", "Repeating a keyword ten times"],
      ],
    ],
    [
      ["Внутренние ссылки и архитектура", "Internal links and architecture"],
      [
        "Стройте связи по смыслу и пользовательскому пути. Важная страница должна быть доступна по обычной HTML-ссылке с понятным анкором. Найдите изолированные URL, проверьте глубину и навигацию. Массовое добавление одинаковых ссылок в футер не заменяет полезные переходы внутри подходящих материалов.",
        "Build links around meaning and the visitor journey. Important pages should be reachable through ordinary HTML links with descriptive anchors. Find orphan URLs and check depth and navigation. Mass-producing identical footer links cannot replace useful contextual connections from relevant content.",
      ],
      [
        "Новая услуга есть в sitemap, но не связана с каталогом и статьями. Добавляем переход из категории и двух тематических материалов.",
        "A new service is in the sitemap but absent from the catalog and articles. Add links from its category and two relevant guides.",
      ],
      [
        "Нарисуйте карту из восьми страниц. Найдите изолированные узлы и предложите три ссылки с обоснованными анкорами и местом размещения.",
        "Map eight pages, locate isolated nodes and propose three links with justified anchor text and placement.",
      ],
      [
        "Как помочь обнаружить изолированную важную страницу?",
        "How can an important orphan page become easier to discover?",
      ],
      [
        [
          "Добавить уместные внутренние HTML-ссылки",
          "Add relevant internal HTML links",
        ],
        ["Увеличить размер логотипа", "Enlarge the logo"],
        ["Убрать страницу из sitemap", "Remove the page from the sitemap"],
      ],
    ],
    [
      [
        "Сравнение периодов в Search Console",
        "Comparing Search Console periods",
      ],
      [
        "Разделяйте клики, показы, CTR и среднюю позицию. Изменение смеси запросов способно сдвинуть средние значения без ухудшения отдельных страниц. Сравнивайте сопоставимые периоды, устройства, страны и типы запросов. Отдельно отмечайте сезонность, брендовый спрос и изменения измерения.",
        "Separate clicks, impressions, CTR and average position. A changing query mix can move averages even when individual pages are stable. Compare equivalent periods, devices, countries and query types. Record seasonality, branded demand and measurement changes separately before drawing conclusions.",
      ],
      [
        "Показы выросли с 10 000 до 20 000, CTR упал с 4% до 3%. Клики выросли с 400 до 600 — одного падения CTR недостаточно для вывода об ухудшении.",
        "Impressions grow from 10,000 to 20,000 while CTR falls from 4% to 3%. Clicks increase from 400 to 600, so CTR alone cannot prove deterioration.",
      ],
      [
        "Соберите отчёт по двум периодам и трём сегментам. Рассчитайте клики из показов и CTR; подпишите наблюдение отдельно от гипотезы.",
        "Build a two-period report for three segments. Calculate clicks from impressions and CTR; label observations separately from hypotheses.",
      ],
      [
        "20 000 показов при CTR 3% — сколько кликов?",
        "How many clicks come from 20,000 impressions at 3% CTR?",
      ],
      [
        ["600", "600"],
        ["60", "60"],
        ["6 000", "6,000"],
      ],
    ],
    [
      ["Бэклог SEO и контроль релиза", "SEO backlog and release checks"],
      [
        "Каждая задача должна содержать проблему, доказательство, критерий готовности и проверку после релиза. Учитывайте влияние, уверенность и трудоёмкость; высокий потенциальный эффект при слабых доказательствах требует проверки. Договоритесь о владельце и откате для изменений шаблонов и перенаправлений.",
        "Every task needs a problem statement, evidence, acceptance criteria and a post-release check. Consider impact, confidence and effort; a large potential effect with weak evidence calls for validation. Assign an owner and a rollback plan for template and redirect changes before implementation.",
      ],
      [
        "Правка noindex занимает 4 часа, а новый раздел — 40. При подтверждённой блокировке нужных страниц устранение ошибки получает первый приоритет.",
        "Fixing noindex takes four hours while a new section takes forty. A confirmed block on valuable pages makes the technical repair the first priority.",
      ],
      [
        "Распределите 20 часов между пятью задачами. Для каждой зафиксируйте стоимость, ожидаемый механизм эффекта и критерий приёмки.",
        "Allocate twenty hours across five tasks. Record cost, the expected mechanism of impact and acceptance criteria for each.",
      ],
      [
        "Что обязательно для задачи на разработку?",
        "What must a development ticket include?",
      ],
      [
        ["Проверяемый критерий готовности", "Verifiable acceptance criteria"],
        ["Обещание первой позиции", "A promise of first position"],
        ["Только название метрики", "Only a metric name"],
      ],
    ],
  ],
  "seo-senior": [
    [
      [
        "SEO-стратегия и бизнес-ограничения",
        "SEO strategy and business constraints",
      ],
      [
        "Начните стратегию с сегментов спроса, маржи и доступной мощности команды. Свяжите возможности поиска с продуктом и путём к заявке. Не суммируйте максимальные прогнозы разных инициатив без поправки на пересечение. Постройте базовый и осторожный сценарии, опишите ограничения и условия пересмотра плана.",
        "Start strategy with demand segments, margin and team capacity. Connect search opportunities to the product and the conversion journey. Do not add the maximum forecasts of overlapping initiatives. Build baseline and cautious scenarios, document constraints and specify when the plan should be revisited.",
      ],
      [
        "Два раздела претендуют на одни запросы. Сложение их прогнозов завысит спрос; объединяем аудиторию и отдельно оцениваем вклад каждого раздела.",
        "Two sections target the same queries. Adding their forecasts overstates demand; deduplicate the audience and estimate each section's contribution separately.",
      ],
      [
        "Создайте стратегию на квартал: три инициативы, ограничения ресурсов, допущения и критерии прекращения неэффективной работы.",
        "Create a quarterly strategy with three initiatives, resource constraints, assumptions and criteria for stopping ineffective work.",
      ],
      [
        "Что уменьшает завышение прогноза?",
        "What reduces forecast overstatement?",
      ],
      [
        ["Учёт пересечения спроса", "Accounting for overlapping demand"],
        ["Сложение всех максимумов", "Adding every maximum"],
        ["Игнорирование сезонности", "Ignoring seasonality"],
      ],
    ],
    [
      ["Миграция и план отката", "Migration and rollback planning"],
      [
        "До миграции сохраните список значимых URL, статусы, канонические адреса, внутренние ссылки и базовые показатели. Подготовьте прямые перенаправления на смысловые аналоги, обновите sitemap и проверьте шаблоны на тестовом окружении. Назначьте ответственных за мониторинг и критерии отката; не меняйте всё одновременно без необходимости.",
        "Before migration, inventory valuable URLs, statuses, canonicals, internal links and baseline metrics. Map direct redirects to relevant equivalents, update the sitemap and test templates in staging. Assign monitoring owners and rollback criteria; avoid combining unrelated major changes when possible.",
      ],
      [
        "Из 300 ценных URL у 40 нет аналога. Вместо редиректа всех на главную команда решает, какие материалы сохранить или заменить по смыслу.",
        "Forty of 300 valuable URLs lack an equivalent. Instead of redirecting all to the homepage, decide which content to preserve or replace with a relevant page.",
      ],
      [
        "Составьте карту перенаправлений для 15 URL и чек-лист запуска. Добавьте пять проверок после релиза и условие остановки миграции.",
        "Map redirects for fifteen URLs and draft a launch checklist. Add five post-release checks and a condition for stopping the migration.",
      ],
      [
        "Куда направлять старый ценный URL?",
        "Where should an old valuable URL redirect?",
      ],
      [
        ["На релевантный смысловой аналог", "To a relevant equivalent"],
        ["Всегда на главную", "Always to the homepage"],
        ["На случайную категорию", "To a random category"],
      ],
    ],
    [
      ["Логи и обход большого сайта", "Logs and large-site crawling"],
      [
        "Проблемы обхода исследуйте на данных сервера и отчётах инструментов. Проверяйте подлинность робота, статусы, частоту обхода и долю бесполезных URL. Crawl budget особенно актуален для крупных и часто обновляемых сайтов. Для небольшого проекта сначала исключите обычные ошибки доступности, качества и индексации.",
        "Investigate crawling through server data and diagnostic reports. Verify crawler identity, response codes, crawl frequency and unnecessary URL patterns. Crawl budget is particularly relevant to large or frequently updated sites. On smaller sites, first rule out ordinary accessibility, quality and indexing issues.",
      ],
      [
        "Робот часто посещает комбинации фильтров без уникальной ценности. Проверяем назначение URL и управление фасетами, а не закрываем весь каталог.",
        "A crawler repeatedly visits filter combinations with no unique value. Review URL purpose and facet handling instead of blocking the whole catalog.",
      ],
      [
        "Опишите пять полей для отчёта по логам и правило группировки URL. Укажите, какие выводы нельзя сделать только из частоты обхода.",
        "Define five fields for a log report and a URL grouping rule. Explain which conclusions crawl frequency alone cannot support.",
      ],
      [
        "Низкая частота обхода сама по себе доказывает плохое ранжирование?",
        "Does low crawl frequency alone prove poor ranking?",
      ],
      [
        [
          "Нет, нужны контекст и другие данные",
          "No, context and other data are required",
        ],
        ["Да, всегда", "Yes, always"],
        ["Да, если страниц больше 100", "Yes, above 100 pages"],
      ],
    ],
    [
      ["Проверка SEO-гипотез", "Testing SEO hypotheses"],
      [
        "Сравнение до и после не доказывает причинность. По возможности используйте сопоставимую контрольную группу страниц, одинаковые периоды и заранее выбранную метрику. Контролируйте сезонность и изменения шаблонов. Зафиксируйте размер группы, ограничения эксперимента и альтернативные объяснения результата.",
        "A before-and-after comparison does not establish causality. Where feasible, use a comparable control group of pages, aligned periods and a preselected metric. Control for seasonality and template changes. Record group size, experimental limitations and alternative explanations for the observed result.",
      ],
      [
        "Тестовая группа выросла на 20%, контрольная — на 15%. Для оценки гипотезы важна разница изменений, а не весь рост тестовой группы.",
        "The test group grows by 20% and the control by 15%. The difference in changes matters for evaluation, not the entire increase in the test group.",
      ],
      [
        "Спроектируйте тест заголовков для двух групп страниц: критерий включения, метрика, период и возможные источники смещения.",
        "Design a title test for two page groups: inclusion criteria, metric, observation period and possible sources of bias.",
      ],
      [
        "Что улучшает интерпретацию эффекта?",
        "What improves interpretation of the effect?",
      ],
      [
        ["Сопоставимая контрольная группа", "A comparable control group"],
        ["Только один удачный день", "One favorable day alone"],
        ["Смена всех шаблонов сразу", "Changing every template simultaneously"],
      ],
    ],
    [
      ["AEO/GEO и качество ответов", "AEO/GEO and answer quality"],
      [
        "Для поисковых и ИИ-ответов полезны ясная структура, проверяемые факты и доступные страницы. Отделяйте собственные наблюдения от обещаний цитирования: включение в ответы не гарантируется. Проверяйте упоминания на повторяемой выборке вопросов и фиксируйте дату, источник, формулировку и качество ответа.",
        "Clear structure, verifiable facts and accessible pages help users and answer systems. Separate observations from promises of citation: inclusion in AI answers is not guaranteed. Monitor mentions using a repeatable question sample and record date, source, wording and answer quality rather than treating one response as proof.",
      ],
      [
        "Бренд появился в одном ответе из десяти проверок. Это наблюдение в конкретной выборке, а не постоянная доля видимости рынка.",
        "A brand appears in one of ten sampled answers. This is a sample observation, not a stable measure of market-wide visibility.",
      ],
      [
        "Составьте 12 вопросов по продукту и журнал наблюдений. Выберите три страницы для улучшения доказательств и понятности ответа.",
        "Draft twelve product questions and an observation log. Select three pages where evidence and answer clarity can be improved.",
      ],
      [
        "Что корректно обещать в плане AEO/GEO?",
        "What is a defensible AEO/GEO commitment?",
      ],
      [
        [
          "Улучшения и измеримый процесс наблюдения",
          "Improvements and a measurable monitoring process",
        ],
        ["Гарантированное цитирование", "Guaranteed citations"],
        [
          "Постоянное первое место в каждом ответе",
          "Permanent first position in every answer",
        ],
      ],
    ],
    [
      [
        "Управление командой и SEO-экономика",
        "Team management and SEO economics",
      ],
      [
        "Оценивайте инициативы с учётом затрат разработки, контента и сопровождения. Трафик не равен выручке, а выручка не равна марже. Опишите ответственность команды, зависимости и критерии приёмки. В отчёте руководителю свяжите выполненное с наблюдаемым результатом и явно отделите оценку вклада от доказанного факта.",
        "Evaluate initiatives including engineering, content and maintenance costs. Traffic is not revenue, and revenue is not margin. Define ownership, dependencies and acceptance criteria. In executive reporting, connect completed work to observed outcomes and explicitly distinguish estimated contribution from established facts.",
      ],
      [
        "Рост заявок на 30 сопровождается снижением качества. До расширения бюджета команда сверяет CRM, продажи и стоимость обработки обращений.",
        "Thirty additional leads arrive with lower quality. Before expanding investment, reconcile CRM data, sales and the cost of handling inquiries.",
      ],
      [
        "Сделайте одностраничный отчёт: результат, затраты, ограничения, решение на следующий месяц и ответственный за каждую инициативу.",
        "Create a one-page report with outcomes, costs, limitations, next month's decisions and an owner for every initiative.",
      ],
      [
        "Какой показатель ближе к бизнес-эффекту?",
        "Which measure is closer to business impact?",
      ],
      [
        [
          "Маржинальная прибыль с учётом затрат",
          "Contribution after relevant costs",
        ],
        ["Число опубликованных слов", "Number of words published"],
        ["Число строк в отчёте", "Number of report rows"],
      ],
    ],
  ],
  "google-ads-middle": [
    [
      [
        "Поисковые запросы и качество спроса",
        "Search terms and demand quality",
      ],
      [
        "Сопоставляйте фактические запросы с услугой, географией и стадией выбора. Минус-слова добавляйте после проверки контекста: слишком широкое исключение может убрать полезный спрос. Оценивайте не только CPL, но и качество лидов из CRM. Решения по малому объёму данных отмечайте как предварительные.",
        "Compare actual search terms with the service, location and buying stage. Check context before adding negative keywords: broad exclusions can remove valuable demand. Evaluate CRM lead quality alongside CPL. Mark decisions based on small samples as provisional and review them after more conversions mature.",
      ],
      [
        "Запросы «вакансии» дают клики для услуги ремонта, но не заявки. Исключение этого интента освобождает бюджет; слово «ремонт» исключать нельзя.",
        "Job searches generate repair-service clicks without leads. Excluding that intent frees budget; excluding the word repair would remove relevant demand.",
      ],
      [
        "Разметьте 25 запросов: оставить, исследовать или исключить. Для каждого исключения укажите тип соответствия и риск потери спроса.",
        "Classify twenty-five terms as keep, investigate or exclude. For each exclusion specify match type and the risk of losing relevant demand.",
      ],
      [
        "Что проверить перед добавлением минус-слова?",
        "What should you check before adding a negative keyword?",
      ],
      [
        [
          "Контекст и риск исключения полезных запросов",
          "Context and risk of excluding useful terms",
        ],
        ["Только длину запроса", "Only query length"],
        ["Только позицию объявления", "Only ad position"],
      ],
    ],
    [
      ["Посадочные и конверсия", "Landing pages and conversion"],
      [
        "Оцените соответствие обещания в объявлении содержанию страницы. Проверьте мобильную форму, скорость, условия и подтверждение отправки. Изолируйте существенные изменения в тесте и учитывайте качество обращений. Увеличение числа отправок формы не полезно, если рост вызван дублями или спамом.",
        "Check whether the landing page delivers the ad's promise. Test mobile forms, speed, terms and submission confirmation. Isolate substantial changes in an experiment and account for lead quality. More form submissions are not valuable if the increase comes from duplicates or spam rather than qualified demand.",
      ],
      [
        "После сокращения формы заявки выросли с 40 до 60, но квалифицированных осталось 20. CPQL не улучшился при том же расходе.",
        "After shortening a form, leads rise from forty to sixty but qualified leads stay at twenty. With unchanged spend, CPQL has not improved.",
      ],
      [
        "Подготовьте тест одной посадочной: гипотеза, изменение, основная метрика, защитная метрика качества и условие завершения наблюдения.",
        "Plan a landing-page test with a hypothesis, one change, a primary metric, a lead-quality guardrail and an observation stop rule.",
      ],
      [
        "Что подтвердит пользу новой формы для продаж?",
        "What supports a claim that a new form helps sales?",
      ],
      [
        [
          "Рост квалифицированных лидов при приемлемой цене",
          "More qualified leads at an acceptable cost",
        ],
        ["Только больше отправок", "More submissions alone"],
        ["Только новый дизайн", "A new design alone"],
      ],
    ],
    [
      ["Конверсии и связь с CRM", "Conversions and CRM reconciliation"],
      [
        "Разделите первичные и вспомогательные действия. Проверьте дублирование событий, окно атрибуции и задержку до продажи. Обратная связь из CRM должна иметь устойчивый идентификатор, понятный статус и допустимый порядок обработки данных. Оптимизация по неверной конверсии усиливает ошибку измерения.",
        "Separate primary outcomes from supporting actions. Check duplicate events, attribution windows and the delay to a sale. CRM feedback needs a stable identifier, clear status definitions and an appropriate data-handling process. Optimizing toward the wrong conversion amplifies measurement errors rather than improving the business.",
      ],
      [
        "Заявка учитывается и событием GA4, и отдельным тегом как основная конверсия. Одна отправка выглядит как две; сверяем определения и исключаем дубль.",
        "A lead is counted by both a GA4 event and a separate primary conversion tag. One submission appears as two; reconcile definitions and remove duplication.",
      ],
      [
        "Составьте карту событий до продажи. Укажите источник, идентификатор, момент отправки, правило дедупликации и владельца проверки.",
        "Map events through to a sale. Specify source, identifier, submission time, deduplication rule and the person responsible for validation.",
      ],
      [
        "Что делать при двух учтённых конверсиях на одну заявку?",
        "What should you do when one lead is counted twice?",
      ],
      [
        [
          "Проверить источники и дедупликацию",
          "Check sources and deduplication",
        ],
        ["Удвоить бюджет", "Double the budget"],
        ["Объявить рост эффективности", "Declare an efficiency improvement"],
      ],
    ],
    [
      ["Ставки и зрелость данных", "Bidding and data maturity"],
      [
        "Выбирайте цель ставок под проверенное измерение и задачу бизнеса. При оценке учитывайте задержку конверсий: свежие дни могут выглядеть хуже до поступления результатов. Слишком жёсткое ограничение цели может сократить объём. Меняйте параметры с обоснованием и оставляйте время для наблюдения.",
        "Choose a bidding objective that matches validated measurement and the business goal. Account for conversion lag: recent days can appear worse before outcomes arrive. An overly restrictive target may reduce volume. Make justified changes and leave enough observation time instead of reacting to every daily fluctuation.",
      ],
      [
        "Продажи поступают через семь дней. Сравнение вчерашнего CPA с полностью дозревшим прошлым месяцем систематически искажает вывод.",
        "Sales arrive seven days later. Comparing yesterday's CPA with a fully matured previous month systematically distorts the conclusion.",
      ],
      [
        "Опишите правило оценки кампании с задержкой семь дней: периоды сравнения, минимально полезные данные и условия изменения цели.",
        "Define a review rule for a seven-day conversion lag: comparison windows, useful data requirements and conditions for changing the target.",
      ],
      [
        "Почему свежий CPA может быть завышен?",
        "Why might a recent CPA appear inflated?",
      ],
      [
        [
          "Часть конверсий ещё не поступила",
          "Some conversions have not arrived yet",
        ],
        ["Все кампании всегда ухудшаются", "All campaigns always deteriorate"],
        ["CTR обязательно равен нулю", "CTR must be zero"],
      ],
    ],
    [
      ["Бюджет и предельная эффективность", "Budget and marginal efficiency"],
      [
        "Средняя эффективность прошлого бюджета не гарантирует такую же эффективность следующей суммы. Спрос ограничен, а дополнительные клики могут быть дороже. Перераспределяйте бюджет с учётом насыщения, качества и доступного объёма. Проверьте ограничения на уровне кампании и не делайте вывод только по цене клика.",
        "Historical average efficiency does not guarantee the same return on the next unit of spend. Demand is finite and additional clicks may cost more. Reallocate budget with saturation, quality and available volume in mind. Check campaign constraints and avoid deciding solely on cost per click.",
      ],
      [
        "Кампания А даёт дешёвые лиды, но её спрос почти выбран. Удвоение бюджета не удваивает продажи; тестируем небольшой прирост и сравниваем добавочный результат.",
        "Campaign A produces cheap leads but is near demand capacity. Doubling its budget does not double sales; test a smaller increase and compare incremental outcomes.",
      ],
      [
        "Распределите 300 000 ₸ между тремя кампаниями. Укажите ограничения спроса и условия следующего изменения на основе квалифицированных лидов.",
        "Allocate KZT 300,000 across three campaigns. State demand limits and conditions for the next change based on qualified leads.",
      ],
      [
        "Что оценивать при увеличении бюджета?",
        "What should you evaluate when increasing budget?",
      ],
      [
        [
          "Добавочный результат и насыщение спроса",
          "Incremental outcomes and demand saturation",
        ],
        ["Только прошлый средний CPC", "Only historical average CPC"],
        ["Только число объявлений", "Only the number of ads"],
      ],
    ],
    [
      ["Эксперименты и журнал решений", "Experiments and decision logs"],
      [
        "Сформулируйте одну гипотезу и основную метрику до запуска теста. Согласуйте ограничения расходов, качество лидов и длительность наблюдения. Одновременная смена оффера, ставки и посадочной мешает объяснить результат. Сохраняйте журнал решений с датой, причиной и ожидаемым механизмом изменения.",
        "Define one hypothesis and a primary metric before launching a test. Agree on spend limits, lead-quality guardrails and an observation period. Changing the offer, bid and landing page together makes results hard to explain. Keep a dated decision log with the reason and expected mechanism behind each change.",
      ],
      [
        "Две версии оффера сравниваются при одинаковых условиях. Рост CTR оценивается вместе с CPQL, чтобы кликабельность не маскировала слабое качество.",
        "Two offers are compared under aligned conditions. Evaluate CTR together with CPQL so attractive ads do not conceal poor lead quality.",
      ],
      [
        "Напишите карточку эксперимента: гипотеза, сегмент, основная метрика, защитные метрики, бюджет и критерий решения после теста.",
        "Write an experiment card: hypothesis, segment, primary metric, guardrails, budget and the decision rule after the test.",
      ],
      [
        "Почему не стоит менять всё одновременно?",
        "Why avoid changing everything simultaneously?",
      ],
      [
        [
          "Трудно выделить причину результата",
          "It becomes hard to isolate the cause",
        ],
        ["Это запрещает любая реклама", "All advertising forbids it"],
        ["Потому что CTR нельзя измерить", "Because CTR cannot be measured"],
      ],
    ],
  ],
  "google-ads-senior": [
    [
      ["Прибыль вместо красивого ROAS", "Profit beyond attractive ROAS"],
      [
        "ROAS сравнивает ценность конверсий с рекламными расходами, но не вычитает себестоимость и операционные затраты. Разделяйте выручку, маржу и прибыль. Проверьте возвраты, скидки и повторные продажи. Цель кампании должна опираться на согласованную с бизнесом экономику, а не на максимальный процент в интерфейсе.",
        "ROAS compares conversion value with ad spend but does not subtract product or operating costs. Separate revenue, margin and profit. Account for refunds, discounts and repeat sales. Campaign goals should reflect economics agreed with the business rather than the largest percentage displayed in the interface.",
      ],
      [
        "Выручка 900 000 ₸ при расходе 300 000 ₸ даёт ROAS 300%. При марже 25% остаётся 225 000 ₸ до рекламы, то есть −75 000 ₸ после неё.",
        "Revenue of KZT 900,000 on KZT 300,000 spend gives 300% ROAS. At 25% margin, KZT 225,000 remains before ads and minus KZT 75,000 after ads.",
      ],
      [
        "Посчитайте безубыточный ROAS для трёх маржинальностей. Отдельно перечислите расходы и возвраты, которых нет в исходной модели.",
        "Calculate break-even ROAS for three margins. Separately list costs and refunds excluded from the initial model.",
      ],
      [
        "ROAS 300% при марже 25% покрывает рекламу?",
        "Does 300% ROAS at a 25% margin cover ad spend?",
      ],
      [
        [
          "Нет, вклад до рекламы ниже расходов на неё",
          "No, pre-ad contribution is below ad cost",
        ],
        [
          "Да, любой ROAS выше 100% прибыльный",
          "Yes, any ROAS over 100% is profitable",
        ],
        ["Маржа не влияет", "Margin has no effect"],
      ],
    ],
    [
      [
        "Ценность конверсий и качество сигналов",
        "Conversion value and signal quality",
      ],
      [
        "Ценность должна отражать полезность результата, а не условное одинаковое число для любого события. Согласуйте источник стоимости, правила обновления и обработку отмен. Для лидогенерации проверьте связь промежуточного статуса с продажами. Некорректные значения могут направить автоматизацию к дорогим, но бесполезным действиям.",
        "Conversion value should represent outcome utility rather than the same arbitrary number for every event. Agree on its source, update rules and cancellations. In lead generation, validate the relationship between intermediate stages and sales. Incorrect values can steer automation toward costly actions with little business value.",
      ],
      [
        "Две услуги дают одинаковое число лидов, но разную маржу и долю продаж. Единая ценность заявки скрывает это различие от оценки эффективности.",
        "Two services generate equal lead counts but different margins and close rates. A single lead value hides that difference when evaluating performance.",
      ],
      [
        "Создайте словарь ценностей для четырёх статусов CRM. Подпишите основание, источник и правило пересмотра каждого значения.",
        "Create a value dictionary for four CRM stages. Record the rationale, source and revision rule for each value.",
      ],
      [
        "На чём основывать ценность лида?",
        "What should lead value be based on?",
      ],
      [
        [
          "На проверенной связи с бизнес-результатом",
          "A validated relationship to business outcomes",
        ],
        ["На случайном большом числе", "A random large number"],
        ["На числе символов в форме", "The number of form characters"],
      ],
    ],
    [
      [
        "Атрибуция и дополнительный эффект",
        "Attribution and incremental impact",
      ],
      [
        "Атрибуция распределяет заслугу между наблюдаемыми касаниями, а инкрементальность оценивает результат, который появился благодаря воздействию. Эти вопросы различаются. Высокий ROAS брендовой рекламы не доказывает, что все продажи исчезнут без неё. Для проверки планируйте контролируемый тест и учитывайте риски для бизнеса.",
        "Attribution allocates credit among observed interactions, while incrementality asks what happened because of the intervention. These are different questions. High branded-search ROAS does not prove all sales would disappear without those ads. Plan a controlled test and account for business risk when examining incremental impact.",
      ],
      [
        "Брендовая кампания получила 80 продаж по атрибуции. Часть покупателей могла прийти органически; отчёт канала не измеряет этот контрфактический сценарий.",
        "Attribution credits a branded campaign with eighty sales. Some buyers might have arrived organically; a channel report does not measure that counterfactual.",
      ],
      [
        "Опишите безопасный дизайн теста дополнительного эффекта: контроль, период, критерии сопоставимости и ограничения интерпретации.",
        "Outline a safe incrementality test: control, duration, comparability criteria and interpretation limits.",
      ],
      [
        "Равны ли атрибутированные продажи дополнительным?",
        "Are attributed sales the same as incremental sales?",
      ],
      [
        ["Нет, это разные величины", "No, they are different quantities"],
        ["Да, всегда", "Yes, always"],
        ["Да, если ROAS высокий", "Yes, when ROAS is high"],
      ],
    ],
    [
      ["Масштабирование портфеля кампаний", "Scaling a campaign portfolio"],
      [
        "План масштабирования должен учитывать доступный спрос, насыщение каналов и производственную мощность бизнеса. Сопоставьте добавочную маржу с добавочным расходом. Не переносите конверсию узкого тёплого сегмента на всю аудиторию. Для каждого шага определите предел потерь, окно оценки и действие при ухудшении.",
        "A scaling plan must account for available demand, channel saturation and business capacity. Compare incremental contribution with incremental spend. Do not generalize the conversion rate of a narrow warm audience to the entire market. Define a loss limit, evaluation window and response to deterioration for each step.",
      ],
      [
        "Сервис может обработать 40 заказов, а план обещает 70. Рост рекламы без расширения мощности создаст задержки и ухудшит качество продаж.",
        "A service can handle forty orders while the plan projects seventy. More advertising without added capacity creates delays and harms sales quality.",
      ],
      [
        "Постройте три шага увеличения бюджета с ограничениями мощности, оценкой предельной отдачи и правилом отката каждого шага.",
        "Design three budget increases with capacity constraints, marginal-return estimates and a rollback rule for each step.",
      ],
      [
        "Что ограничивает полезное масштабирование?",
        "What constrains useful scaling?",
      ],
      [
        [
          "Спрос, предельная отдача и мощность бизнеса",
          "Demand, marginal returns and business capacity",
        ],
        ["Только число ключей", "Only the number of keywords"],
        ["Только размер логотипа", "Only logo size"],
      ],
    ],
    [
      ["Прогнозирование и неопределённость", "Forecasting and uncertainty"],
      [
        "Прогноз — набор допущений, а не обещание. Покажите чувствительность результата к CPC, конверсии, качеству и марже. Используйте диапазоны, проверяйте единицы и не считайте дробную ожидаемую продажу фактически состоявшейся. Обновляйте модель после получения зрелых данных и фиксируйте причину пересмотра.",
        "A forecast is a set of assumptions rather than a promise. Show sensitivity to CPC, conversion, quality and margin. Use ranges, check units and do not treat a fractional expected sale as a completed transaction. Update the model after mature data arrives and record the reason behind each revision.",
      ],
      [
        "При расходе 100 000 ₸ и CPC 500 ₸ ожидаем 200 кликов. Конверсия 2–4% даёт диапазон 4–8 лидов, а не гарантированные восемь.",
        "At KZT 100,000 spend and KZT 500 CPC, expect 200 clicks. A 2–4% conversion range implies four to eight leads, not a guaranteed eight.",
      ],
      [
        "Создайте таблицу чувствительности по CPC и конверсии. Укажите источник допущений и какие параметры нужно проверить первыми.",
        "Build a CPC-by-conversion sensitivity table. State assumption sources and which parameters require validation first.",
      ],
      [
        "Как корректно представить расчётный результат?",
        "How should a modeled outcome be presented?",
      ],
      [
        [
          "Как сценарий с явными допущениями",
          "As a scenario with explicit assumptions",
        ],
        ["Как гарантию продаж", "As a sales guarantee"],
        ["Как уже полученные продажи", "As sales already completed"],
      ],
    ],
    [
      [
        "Аудит аккаунта и управление рисками",
        "Account audit and risk management",
      ],
      [
        "Старший специалист управляет не только настройками, но и качеством решений команды. Проверьте доступы, измерение, экономику и журнал изменений. Разделите критические ошибки и гипотезы улучшения. Для крупных изменений задайте ответственного, лимит расходов, проверку результата и способ быстрого отката.",
        "A senior specialist manages decision quality as well as settings. Audit access, measurement, economics and the change log. Separate critical errors from improvement hypotheses. For major changes assign an owner, spend limit, outcome check and a practical rollback path before the change goes live.",
      ],
      [
        "При передаче аккаунта неясно, кто меняет основные конверсии. Вводим владельца, журнал и проверку, чтобы автоматизация не обучалась на случайных изменениях.",
        "During an account handover, ownership of primary conversions is unclear. Assign an owner, log and validation process to prevent optimization on accidental changes.",
      ],
      [
        "Подготовьте аудит из десяти пунктов и план на 30 дней: критичность, доказательство, владелец, срок и критерий принятия результата.",
        "Prepare a ten-point audit and a thirty-day plan: severity, evidence, owner, deadline and acceptance criteria.",
      ],
      [
        "Что первым сделать при подтверждённой ошибке измерения?",
        "What comes first after a measurement error is confirmed?",
      ],
      [
        [
          "Ограничить последствия и исправить источник данных",
          "Contain the impact and repair the data source",
        ],
        ["Немедленно масштабировать бюджет", "Immediately scale budget"],
        ["Скрыть ошибку в отчёте", "Hide the error in the report"],
      ],
    ],
  ],
};

const LEVEL_DETAILS = {
  junior: {
    label: "Junior",
    time: learnPair(
      "6–8 часов самостоятельной практики",
      "6–8 hours of independent practice",
    ),
    audience: learnPair(
      "Для старта в профессии и предпринимателей без системного опыта. Разбираем термины, базовую настройку и первый проект.",
      "For beginners and business owners without systematic experience. Learn terminology, foundational setup and a first project.",
    ),
    prerequisites: learnPair(
      "Достаточно компьютера, таблицы и примера бизнеса. Реальный рекламный бюджет для симулятора не нужен.",
      "Bring a computer, a spreadsheet and a business example. The simulator requires no real advertising budget.",
    ),
  },
  middle: {
    label: "Middle",
    time: learnPair(
      "10–14 часов самостоятельной практики",
      "10–14 hours of independent practice",
    ),
    audience: learnPair(
      "Для специалистов, которые уже запускали проекты и хотят уверенно находить причины проблем и проверять решения.",
      "For specialists who have launched projects and want to diagnose problems and evaluate decisions confidently.",
    ),
    prerequisites: learnPair(
      "База уровня Junior, понимание ключевых метрик и опыт работы хотя бы с одним проектом. Для разбора можно использовать обезличенные данные.",
      "Junior-level fundamentals, metric literacy and experience with at least one project. Anonymized data can be used for reviews.",
    ),
  },
  senior: {
    label: "Senior",
    time: learnPair(
      "14–18 часов самостоятельной практики",
      "14–18 hours of independent practice",
    ),
    audience: learnPair(
      "Для опытных специалистов и руководителей, которые отвечают за стратегию, бюджет, эксперименты и качество работы команды.",
      "For experienced specialists and leads responsible for strategy, budgets, experiments and team quality.",
    ),
    prerequisites: learnPair(
      "Навыки Middle, самостоятельное ведение проектов и готовность защищать решения на основе данных и ограничений бизнеса.",
      "Middle-level skills, independent project ownership and readiness to defend decisions using data and business constraints.",
    ),
  },
};
const LEVEL_OUTCOMES = {
  "seo-junior": [
    "Первый SEO-аудит, карта запросов и план исправлений.",
    "Your first SEO audit, query map and improvement plan.",
  ],
  "seo-middle": [
    "Диагностика индексации, контентный бэклог и отчёт по сегментам.",
    "Indexing diagnosis, a content backlog and a segmented report.",
  ],
  "seo-senior": [
    "Квартальная стратегия, дизайн SEO-теста и план безопасной миграции.",
    "A quarterly strategy, an SEO test design and a safe migration plan.",
  ],
  "google-ads-junior": [
    "Медиаплан, структура кампании и корректное измерение заявок.",
    "A media plan, campaign structure and validated lead measurement.",
  ],
  "google-ads-middle": [
    "План оптимизации по качеству лидов, бюджет и карта экспериментов.",
    "A lead-quality optimization plan, budget and experiment roadmap.",
  ],
  "google-ads-senior": [
    "Модель прибыли, стратегия масштабирования и система контроля рисков.",
    "A profit model, scaling strategy and risk-control framework.",
  ],
};
for (const topic of ["seo", "google-ads"])
  for (const level of ["junior", "middle", "senior"]) {
    const base = COURSES.find((course) => course.id === topic),
      id = topic + "-" + level,
      detail = LEVEL_DETAILS[level];
    const units = ADVANCED_COURSE_UNITS[id];
    const lessons = units
      ? units.map((row, index) => {
          const [title, body, example, practice, question, answers] = row;
          const correct = index % 3,
            options = [...answers];
          [options[0], options[correct]] = [options[correct], options[0]];
          return {
            ...lessonEntry(
              "module-" + (index + 1),
              title,
              body,
              example,
              practice,
              question,
              options,
              correct,
              body,
            ),
            minutes: level === "senior" ? 45 : 30,
          };
        })
      : base.lessons.map((lesson) => ({ ...lesson }));
    COURSES.push({
      ...base,
      id,
      topic,
      level,
      title: learnPair(
        (topic === "seo" ? "SEO" : "Google Ads") + " " + detail.label,
        (topic === "seo" ? "SEO" : "Google Ads") + " " + detail.label,
      ),
      short: learnPair(...LEVEL_OUTCOMES[id]),
      audience: detail.audience,
      prerequisites: detail.prerequisites,
      result: learnPair(...LEVEL_OUTCOMES[id]),
      project: learnPair(
        "Соберите итоговый проект: " +
          LEVEL_OUTCOMES[id][0] +
          " Приложите исходные допущения, результаты двух заданий симулятора и объяснение ограничений выбранного решения.",
        "Build a final project: " +
          LEVEL_OUTCOMES[id][1] +
          " Include assumptions, results from both simulator tasks and an explanation of your decision's limitations.",
      ),
      effort: detail.time,
      accent:
        level === "junior" ? "lime" : level === "middle" ? "blue" : "lavender",
      lessons,
      simulator: topic,
    });
    COURSE_PRICES[id] = COURSE_FORMAT_PRICES[id].group;
    // Junior uses the existing foundation checks. Advanced exams revisit concepts with changed choices.
    COURSE_EXAMS[id] = units
      ? lessons.map((lesson, index) => ({
          question: learnPair(
            "Итоговая проверка: " + lesson.quiz.question.ru,
            "Final check: " + lesson.quiz.question.en,
          ),
          options: [
            lesson.quiz.options[2],
            lesson.quiz.options[0],
            lesson.quiz.options[1],
          ],
          answer: (lesson.quiz.answer + 1) % 3,
          explanation: lesson.quiz.explanation,
        }))
      : COURSE_EXAMS[topic].map((question) => ({ ...question }));
  }
