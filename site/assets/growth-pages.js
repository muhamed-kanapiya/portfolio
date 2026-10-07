/* City-specific briefs describe offered scenarios, not office locations or client geography. */
const growthText = (ru, en) => ({ ru, en });
const growthCopy = (value) => value?.[currentLanguage] || value?.ru || value;
const CITY_PAGES = [
  {
    id: "astana",
    name: growthText("Астана", "Astana"),
    local: growthText("в Астане", "in Astana"),
    emoji: "🏙️",
    focus: growthText("Образование, услуги и B2B", "Education, services & B2B"),
    intro: growthText(
      "Помогаю бизнесу в Астане связать рекламу, сайт и обработку обращений. Можно начать с одной услуги или выстроить путь от поискового запроса до квалифицированной заявки.",
      "I help businesses in Astana connect advertising, websites and inquiry handling. Start with one service or build a path from search intent to a qualified lead.",
    ),
    scenarios: [
      [
        growthText("Набор на обучение", "Course enrollment"),
        growthText(
          "Разделяем кампании по программам, возрасту и формату занятий. На сайте показываем условия и собираем запрос на консультацию; в CRM отмечаем нужный курс.",
          "Separate campaigns by program, age group and study format. Explain enrollment conditions on the website and pass the requested course to the CRM.",
        ),
      ],
      [
        growthText("Услуги по районам", "Location-based services"),
        growthText(
          "Согласуем районы выезда, адреса обслуживания и часы работы. В рекламе учитываем территорию, а в форме уточняем место и задачу клиента.",
          "Agree service areas, locations and working hours. Match targeting to the coverage area and ask for the location and task in the inquiry.",
        ),
      ],
      [
        growthText("Длинный цикл B2B", "Longer B2B sales cycles"),
        growthText(
          "Готовим страницы под конкретные задачи и фиксируем этапы от первичного обращения до коммерческого предложения. В отчёте отдельно смотрим качество заявок.",
          "Build pages around specific needs and track stages from first inquiry to proposal. Report on lead quality separately.",
        ),
      ],
    ],
    serviceIds: [
      "google-ads",
      "seo",
      "web-development",
      "tracking",
      "crm-integrations",
      "ai-assistants",
    ],
    caseIds: ["kilc-ads", "probilim-seo", "mssp-ads"],
    brief: growthText(
      "Укажите программы или услуги, районы обслуживания, сезон набора и то, что считается качественной заявкой.",
      "Share your programs or services, coverage areas, enrollment season and definition of a qualified lead.",
    ),
  },
  {
    id: "almaty",
    name: growthText("Алматы", "Almaty"),
    local: growthText("в Алматы", "in Almaty"),
    emoji: "⛰️",
    focus: growthText(
      "Интернет-магазины и сервисный бизнес",
      "Ecommerce & service businesses",
    ),
    intro: growthText(
      "Для компаний в Алматы объединяю продвижение каталога, рекламные кампании и удобную покупку на сайте. Отдельно разбираем доставку, наличие и обработку заказов — то, что влияет на результат после клика.",
      "For businesses in Almaty, I connect catalog promotion, advertising and a useful buying experience. Delivery, stock and order handling get their own review because they affect what happens after the click.",
    ),
    scenarios: [
      [
        growthText(
          "Каталог и товарная реклама",
          "Catalog & product advertising",
        ),
        growthText(
          "Проверяем категории, характеристики, фид и наличие. Рекламу и SEO выстраиваем вокруг реального ассортимента, с понятной доставкой по городу и за его пределы.",
          "Check categories, specifications, feeds and availability. Build advertising and SEO around the actual inventory and clearly stated delivery coverage.",
        ),
      ],
      [
        growthText("Запись на услугу", "Service bookings"),
        growthText(
          "Показываем адреса и условия записи, разделяем предложения и отслеживаем формы, звонки и переходы в мессенджеры. Подключаем CRM при необходимости.",
          "Explain locations and booking conditions, separate offers and measure forms, calls and messenger clicks. Add CRM integration where useful.",
        ),
      ],
      [
        growthText("Контент большого каталога", "Larger catalog content"),
        growthText(
          "Создаём шаблон карточек и FAQ на основе фактических характеристик. ИИ ускоряет черновики, редакторская проверка сохраняет точность перед публикацией.",
          "Create product and FAQ templates from factual specifications. AI assists drafting while editorial checks preserve accuracy before publication.",
        ),
      ],
    ],
    serviceIds: [
      "shopping-pmax",
      "seo",
      "shopify",
      "insales",
      "meta-ads",
      "ai-content",
    ],
    caseIds: ["mir-sporta-ads", "panama-seo", "computerr-web"],
    brief: growthText(
      "Пришлите каталог или ссылку на магазин, географию доставки, категории с приоритетом и доступные данные о заказах.",
      "Share your catalog or store URL, delivery coverage, priority categories and available order data.",
    ),
  },
  {
    id: "shymkent",
    name: growthText("Шымкент", "Shymkent"),
    local: growthText("в Шымкенте", "in Shymkent"),
    emoji: "☀️",
    focus: growthText(
      "Локальные услуги и заявки",
      "Local services & inquiries",
    ),
    intro: growthText(
      "Для бизнеса в Шымкенте помогаю собрать понятное предложение, запустить рекламу и наладить путь заявки до менеджера. Начать можно с одной посадочной страницы и одного измеримого рекламного сценария.",
      "For businesses in Shymkent, I help define a clear offer, launch advertising and connect inquiries to a manager. Start with one landing page and one measurable acquisition scenario.",
    ),
    scenarios: [
      [
        growthText("Первый рекламный запуск", "First advertising launch"),
        growthText(
          "Выбираем одну услугу, целевое действие и территорию. Готовим объявления и страницу с условиями, подключаем измерение обращений до старта рекламы.",
          "Choose one service, conversion goal and coverage area. Prepare ads and a page with clear conditions, then set up inquiry tracking before launch.",
        ),
      ],
      [
        growthText("Лендинг для мобильных", "Mobile landing page"),
        growthText(
          "Сокращаем путь до записи: понятное предложение, стоимость или условия расчёта, быстрые контакты и форма без лишних полей.",
          "Shorten the path to booking: a clear offer, pricing or estimate conditions, quick contacts and a focused form.",
        ),
      ],
      [
        growthText("Заявки без потерь", "Reliable lead handoff"),
        growthText(
          "Передаём заявку в CRM или таблицу с источником, услугой и контактом. Фиксируем ответственного и проверяем сбои доставки и повторные обращения.",
          "Send inquiries to a CRM or spreadsheet with source, service and contact details. Assign ownership and check failed delivery and duplicates.",
        ),
      ],
    ],
    serviceIds: [
      "google-ads",
      "meta-ads",
      "tilda",
      "tracking",
      "crm-integrations",
      "ai-automation",
    ],
    caseIds: ["probilim-ads", "hilaser-ads", "slanet-web"],
    brief: growthText(
      "Опишите основную услугу, районы работы, текущие каналы заявок и человека, который отвечает клиентам.",
      "Describe your main service, coverage areas, current lead channels and who responds to customers.",
    ),
  },
  {
    id: "karaganda",
    name: growthText("Караганда", "Karaganda"),
    local: growthText("в Караганде", "in Karaganda"),
    emoji: "🏗️",
    focus: growthText(
      "Сложные продукты и технические услуги",
      "Complex products & technical services",
    ),
    intro: growthText(
      "Для компаний в Караганде предлагаю продвижение сложных услуг и каталогов: от структуры сайта и технического SEO до рекламных кампаний и квалификации B2B-заявок.",
      "For companies in Karaganda, I offer promotion for complex services and catalogs, from website structure and technical SEO to advertising and B2B lead qualification.",
    ),
    scenarios: [
      [
        growthText("Технический каталог", "Technical catalog"),
        growthText(
          "Структурируем решения по применению, характеристикам и совместимости. Помогаем посетителю выбрать нужный раздел и отправить предметный запрос.",
          "Organize solutions by application, specification and compatibility. Help visitors find the relevant section and send a specific inquiry.",
        ),
      ],
      [
        growthText("Поиск с намерением заказать", "Purchase-intent search"),
        growthText(
          "Разделяем информационные запросы и запросы на поставку или услугу. Для рекламных групп готовим релевантные страницы и понятное действие.",
          "Separate informational searches from supply and service inquiries. Match ad groups to relevant pages and a clear next step.",
        ),
      ],
      [
        growthText("Документы и база знаний", "Documents & knowledge base"),
        growthText(
          "Можно проверить пилот ассистента по согласованной документации: ответы со ссылками на источник, контроль доступа и передача сложного вопроса специалисту.",
          "Pilot an assistant over approved documentation: source-linked answers, access control and handoff of complex questions to a specialist.",
        ),
      ],
    ],
    serviceIds: [
      "seo",
      "google-ads",
      "wordpress",
      "python-scraping",
      "crm-integrations",
      "ai-knowledge",
    ],
    caseIds: ["ltc-seo", "cloudtek-ads", "cyberguard-ads"],
    brief: growthText(
      "Нужны основные продукты и услуги, примеры технических материалов, регионы поставки и типичный цикл согласования заказа.",
      "Share core products and services, sample technical materials, supply regions and the typical order approval cycle.",
    ),
  },
  {
    id: "atyrau",
    name: growthText("Атырау", "Atyrau"),
    local: growthText("в Атырау", "in Atyrau"),
    emoji: "🌊",
    focus: growthText(
      "B2B-сервисы и корпоративные заявки",
      "B2B services & corporate inquiries",
    ),
    intro: growthText(
      "Помогаю компаниям в Атырау представить услуги для корпоративных заказчиков, привлекать целевые обращения и видеть их дальнейшую судьбу в CRM. Формат и объём подбираем под ваш процесс продаж.",
      "I help companies in Atyrau present services to corporate buyers, attract relevant inquiries and follow their progress in the CRM. Scope and format are tailored to the sales process.",
    ),
    scenarios: [
      [
        growthText("Страница для закупщика", "A page for the buyer"),
        growthText(
          "Выносим состав работ, условия, документы и порядок запроса предложения. Подбираем структуру, которая помогает оценить исполнителя до звонка.",
          "Present scope, conditions, documentation and the proposal request process so buyers can assess the provider before calling.",
        ),
      ],
      [
        growthText("Качество обращения", "Inquiry quality"),
        growthText(
          "В форме и CRM выделяем тип задачи, компанию, географию и сроки. Рекламный отчёт связываем с квалификацией обращений, когда эти данные доступны.",
          "Capture task type, company, location and timing in forms and CRM. Connect ad reporting to lead qualification when those data are available.",
        ),
      ],
      [
        growthText("Регулярная отчётность", "Recurring reporting"),
        growthText(
          "Объединяем согласованные выгрузки рекламы и аналитики. Расчёты выполняются кодом, ИИ помогает подготовить объяснения и вопросы для разбора командой.",
          "Use agreed advertising and analytics exports. Code calculates the metrics; AI helps prepare explanations and questions for team review.",
        ),
      ],
    ],
    serviceIds: [
      "google-ads",
      "seo",
      "web-development",
      "crm-integrations",
      "ai-reports",
      "ai-training",
    ],
    caseIds: ["mssp-ads", "qlt-ads", "bizhelppro-web"],
    brief: growthText(
      "Пришлите перечень корпоративных услуг, требования к запросу предложения, регионы работы и этапы воронки продаж.",
      "Share your corporate services, proposal request requirements, service regions and sales pipeline stages.",
    ),
  },
];
function currentCity() {
  const id = location.pathname
    .split("/")
    .pop()
    ?.replace(/\.html$/, "");
  return CITY_PAGES.find((city) => city.id === id);
}
function growthMetadata(page) {
  if (page === "city" && currentCity()) {
    const city = currentCity();
    return {
      title: growthCopy(
        growthText(
          "Реклама, SEO и сайты " + city.local.ru,
          "Advertising, SEO & websites " + city.local.en,
        ),
      ),
      description: growthCopy(city.intro),
    };
  }
  if (page === "cities")
    return {
      title: growthCopy(
        growthText(
          "Услуги для бизнеса в Казахстане",
          "Services for businesses in Kazakhstan",
        ),
      ),
      description: growthCopy(
        growthText(
          "Астана, Алматы, Шымкент, Караганда и Атырау: реклама, SEO, сайты и ИИ. Удалённая работа с понятным планом и отчётностью.",
          "Astana, Almaty, Shymkent, Karaganda and Atyrau: advertising, SEO, websites and AI. Remote collaboration with clear scope and reporting.",
        ),
      ),
    };
  if (page === "ai")
    return {
      title: growthCopy(growthText("ИИ для бизнеса", "AI for business")),
      description: growthCopy(
        growthText(
          "ИИ-отчёты, контент, ассистенты, интеграции, креативы, веб-инструменты, базы знаний и обучение. От ограниченного пилота до внедрения.",
          "AI reporting, content, assistants, integrations, creatives, web tools, knowledge bases and training. From a bounded pilot to implementation.",
        ),
      ),
    };
  return null;
}
function GrowthIntro({ eyebrow, title, lead, children }) {
  return i("header", {
    className: "growth-hero",
    children: [
      i("a", {
        className: "back-link",
        href: pageLink("index.html"),
        children: "Back to home",
      }),
      i("span", { className: "section-eyebrow", children: eyebrow }),
      i("h1", { children: title }),
      i("p", { className: "growth-lead", children: lead }),
      children,
    ],
  });
}
function CityLinks({ active }) {
  return i("div", {
    className: "city-links",
    children: CITY_PAGES.map((city) =>
      i(
        "a",
        {
          href: pageLink(city.id + ".html"),
          "aria-current": city.id === active ? "page" : undefined,
          children: [
            i("span", { "aria-hidden": true, children: city.emoji }),
            growthCopy(city.name),
            " ↗",
          ],
        },
        city.id,
      ),
    ),
  });
}
function CitiesPage() {
  const meta = growthMetadata("cities");
  return i("main", {
    id: "main-content",
    className: "page-container growth-page",
    children: [
      i(GrowthIntro, {
        eyebrow: "KAZAKHSTAN · ONLINE",
        title: meta.title,
        lead: meta.description,
      }),
      i("div", {
        className: "city-directory",
        children: CITY_PAGES.map((city, index) =>
          i(
            "a",
            {
              href: pageLink(city.id + ".html"),
              children: [
                i("span", {
                  className: "city-directory-index",
                  children: "0" + (index + 1),
                }),
                i("div", {
                  children: [
                    i("h2", {
                      children: [city.emoji, " ", growthCopy(city.name)],
                    }),
                    i("p", { children: growthCopy(city.focus) }),
                  ],
                }),
                i("span", { "aria-hidden": true, children: "↗" }),
              ],
            },
            city.id,
          ),
        ),
      }),
      i("div", {
        className: "growth-note",
        children: growthCopy(
          growthText(
            "Работаю удалённо. На страницах городов — возможные задачи, подходящие услуги и примеры из общего портфолио. Для другой географии также можно обсудить проект.",
            "I work remotely. Each city page contains possible tasks, relevant services and examples from the general portfolio. Projects for other locations are welcome too.",
          ),
        ),
      }),
      i(Action, { href: inquiryLink(), children: "Discuss the task" }),
    ],
  });
}
function CityPage() {
  const city = currentCity();
  if (!city) return i(NotFoundPage, {});
  const meta = growthMetadata("city");
  return i("main", {
    id: "main-content",
    className: "growth-city",
    children: [
      i("div", {
        className: "page-container growth-page",
        children: [
          i(GrowthIntro, {
            eyebrow: growthCopy(city.focus),
            title: meta.title,
            lead: meta.description,
            children: i("div", {
              className: "growth-actions",
              children: [
                i(Action, {
                  href: inquiryLink(),
                  children: "Discuss the task",
                }),
                i("a", {
                  href: "#city-services",
                  className: "action action-secondary",
                  children: growthCopy(
                    growthText("Выбрать услугу ↓", "Choose a service ↓"),
                  ),
                }),
                i("small", {
                  children: growthCopy(
                    growthText(
                      "Онлайн · созвоны, общий план и отчёты",
                      "Online · calls, a shared plan and reports",
                    ),
                  ),
                }),
              ],
            }),
          }),
          i("section", {
            className: "growth-section",
            children: [
              i("h2", {
                children: growthCopy(
                  growthText("С чего можно начать", "Where we can start"),
                ),
              }),
              i("div", {
                className: "growth-scenarios",
                children: city.scenarios.map(([title, description], index) =>
                  i(
                    "article",
                    {
                      children: [
                        i("span", {
                          className: "growth-number",
                          children: "0" + (index + 1),
                        }),
                        i("h3", { children: growthCopy(title) }),
                        i("p", { children: growthCopy(description) }),
                      ],
                    },
                    index,
                  ),
                ),
              }),
            ],
          }),
          i("section", {
            className: "growth-section",
            id: "city-services",
            children: [
              i("div", {
                className: "growth-section-heading",
                children: [
                  i("h2", { children: "Services" }),
                  i("a", {
                    href: pageLink("pricing.html"),
                    children: growthCopy(
                      growthText("Стоимость услуг ↗", "Service pricing ↗"),
                    ),
                  }),
                ],
              }),
              i("div", {
                className: "service-grid",
                children: city.serviceIds.map((id) =>
                  i(
                    ServiceCard,
                    { service: tu.find((service) => service.id === id) },
                    id,
                  ),
                ),
              }),
            ],
          }),
          i("section", {
            className: "growth-section",
            children: [
              i("h2", {
                children: growthCopy(
                  growthText(
                    "Примеры под похожие задачи",
                    "Examples of similar tasks",
                  ),
                ),
              }),
              i("p", {
                className: "growth-section-lead",
                children: growthCopy(
                  growthText(
                    "Кейсы из общего портфолио, подобранные по задачам. География каждого проекта указана на его странице.",
                    "Cases selected by task from the general portfolio. Each project page states its own location.",
                  ),
                ),
              }),
              i("div", {
                className: "case-grid",
                children: city.caseIds
                  .map((id) => visibleCase(id))
                  .filter(Boolean)
                  .map((record) => i(CaseCard, { record }, record.id)),
              }),
            ],
          }),
          i("section", {
            className: "city-brief",
            children: [
              i("div", {
                children: [
                  i("span", {
                    className: "section-eyebrow",
                    children: "LET’S START",
                  }),
                  i("h2", {
                    children: growthCopy(
                      growthText(
                        "Что прислать для оценки",
                        "What to share for an estimate",
                      ),
                    ),
                  }),
                  i("p", { children: growthCopy(city.brief) }),
                ],
              }),
              i("div", {
                children: [
                  i("ol", {
                    children: [
                      growthText(
                        "Разберём задачу и текущие данные.",
                        "Review the task and current data.",
                      ),
                      growthText(
                        "Согласуем объём, сроки и стоимость.",
                        "Agree scope, timing and price.",
                      ),
                      growthText(
                        "Запустим работу с понятными контрольными точками.",
                        "Start with clear review checkpoints.",
                      ),
                    ].map((text, index) =>
                      i("li", { children: growthCopy(text) }, index),
                    ),
                  }),
                  i(Action, {
                    href: inquiryLink(),
                    children: "Discuss the task",
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
      i(ReviewsSection, {}),
      i("nav", {
        className: "page-container city-other",
        "aria-label": growthCopy(growthText("Другие города", "Other cities")),
        children: [
          i("h2", {
            children: growthCopy(
              growthText(
                "Работаю с бизнесом из разных городов",
                "Working with businesses across cities",
              ),
            ),
          }),
          i(CityLinks, { active: city.id }),
          i("a", {
            href: pageLink("cities.html"),
            children: growthCopy(growthText("Все города ↗", "All cities ↗")),
          }),
        ],
      }),
    ],
  });
}
function AIPage() {
  const meta = growthMetadata("ai");
  return i("main", {
    id: "main-content",
    className: "page-container growth-page",
    children: [
      i(GrowthIntro, {
        eyebrow: "AI · DATA · AUTOMATION",
        title: growthCopy(
          growthText("ИИ под рабочую задачу", "AI for a practical task"),
        ),
        lead: meta.description,
        children: i("div", {
          className: "growth-actions",
          children: [
            i(Action, {
              href: inquiryLink("ai-automation"),
              children: "Discuss the task",
            }),
            i("a", {
              href: "#ai-services",
              className: "action action-secondary",
              children: growthCopy(
                growthText("Выбрать сценарий ↓", "Choose a scenario ↓"),
              ),
            }),
          ],
        }),
      }),
      i("div", {
        className: "ai-workflow",
        children: [
          growthText("Задача и данные", "Task & data"),
          growthText("Пилот", "Pilot"),
          growthText("Проверка качества", "Quality review"),
          growthText("Внедрение", "Implementation"),
        ].map((title, index) =>
          i(
            "div",
            {
              children: [
                i("span", { children: "0" + (index + 1) }),
                i("strong", { children: growthCopy(title) }),
              ],
            },
            index,
          ),
        ),
      }),
      i("section", {
        className: "growth-section",
        id: "ai-services",
        children: [
          i("h2", {
            children: growthCopy(
              growthText("Что можно делегировать ИИ", "Where AI can help"),
            ),
          }),
          i("div", {
            className: "service-grid",
            children: AI_OFFERS.map((offer) =>
              i(
                ServiceCard,
                { service: tu.find((service) => service.id === offer.id) },
                offer.id,
              ),
            ),
          }),
        ],
      }),
      i("section", {
        className: "city-brief",
        children: [
          i("div", {
            children: [
              i("span", {
                className: "section-eyebrow",
                children: "AEO / GEO",
              }),
              i("h2", {
                children: growthCopy(
                  growthText(
                    "А если задача — видимость в ИИ-поиске?",
                    "Looking for visibility in AI search?",
                  ),
                ),
              }),
              i("p", {
                children: growthCopy(
                  growthText(
                    "Для этого есть отдельный аудит: техническая доступность, ответы на вопросы, источники и повторяемые наблюдения по выборке запросов.",
                    "There is a dedicated audit for technical access, useful answers, references and repeatable observations across an agreed query sample.",
                  ),
                ),
              }),
            ],
          }),
          i(Action, {
            href: detailLink("service", "aeo-geo-ai"),
            children: growthCopy(
              growthText("Подробнее об AEO / GEO ↗", "Explore AEO / GEO ↗"),
            ),
          }),
        ],
      }),
      i("p", {
        className: "growth-note",
        children: growthCopy(
          growthText(
            "Стоимость оцениваю после определения задачи. API, подписки, хостинг и сопровождение согласуются отдельно; пилот помогает проверить подход до расширения.",
            "Pricing follows the agreed scope. API usage, subscriptions, hosting and support are estimated separately; a pilot validates the approach before expansion.",
          ),
        ),
      }),
    ],
  });
}
