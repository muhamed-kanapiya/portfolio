// Editable bilingual blog content. Stable slugs and structured blocks can be migrated to WordPress.
// These pages are public by direct URL, but are not linked in the main navigation.
const blogText = (ru, en) => ({ ru, en });
window.BLOG_CATEGORIES = [
  {
    slug: "analytics",
    emoji: "📊",
    name: blogText("Аналитика", "Analytics"),
    description: blogText(
      "События, UTM и данные, на которые можно опереться при принятии решений.",
      "Events, UTM tags and data you can use to make decisions.",
    ),
    color: "#dcead6",
  },
  {
    slug: "advertising",
    emoji: "📣",
    name: blogText("Реклама", "Advertising"),
    description: blogText(
      "Подготовка кампаний, проверка гипотез и связь рекламы с задачами бизнеса.",
      "Campaign preparation, testing ideas and connecting advertising to business goals.",
    ),
    color: "#f4e3c9",
  },
  {
    slug: "web",
    emoji: "💻",
    name: blogText("Сайты и автоматизация", "Web & automation"),
    description: blogText(
      "Практика запуска сайтов, интеграции и процессы после получения заявки.",
      "Practical website launches, integrations and what happens after an inquiry.",
    ),
    color: "#e0e6f4",
  },
];
window.BLOG_POSTS = [
  {
    slug: "measurement-plan",
    status: "published",
    category: "analytics",
    date: "2026-10-06",
    featured: true,
    title: blogText(
      "Аналитика начинается с вопроса, а не со счётчика",
      "Analytics starts with a question, not a tracking tag",
    ),
    excerpt: blogText(
      "Как составить простой план измерения: от бизнес-задачи до события, проверки и решения. С таблицей и примерами для услуг и интернет-магазина.",
      "Build a simple measurement plan: from a business question to an event, a check and a decision. Includes a table and examples for services and online stores.",
    ),
    cover: blogText("Данные → решения", "Data → decisions"),
    tags: ["GA4", "GTM", "Measurement"],
    sections: [
      {
        id: "question",
        title: blogText(
          "Сначала — бизнес-вопрос",
          "Start with a business question",
        ),
        blocks: [
          {
            type: "paragraph",
            text: blogText(
              "Счётчик может собирать множество событий, но сам по себе не объясняет, что улучшать. Начните с решения, которое хотите принять: какой канал приносит подходящие обращения, где люди бросают оформление или какая страница помогает выбрать услугу. Один ясный вопрос полезнее длинного списка метрик без владельца.",
              "A tracking tag can collect many events without explaining what to improve. Start with the decision you need to make: which channel brings suitable inquiries, where checkout breaks down, or which page helps visitors choose a service. One clear question is more useful than a long list of metrics nobody owns.",
            ),
          },
          {
            type: "callout",
            title: blogText("Рабочая формулировка", "A useful starting point"),
            text: blogText(
              "«Хочу видеть источник подтверждённых заявок и понимать, какие из них отдел продаж считает целевыми».",
              "“I want to see where confirmed inquiries come from and which ones the sales team considers qualified.”",
            ),
          },
          {
            type: "list",
            ordered: true,
            items: [
              blogText(
                "Определите действие, важное для бизнеса.",
                "Define the action that matters to the business.",
              ),
              blogText(
                "Найдите место, где это действие можно подтвердить.",
                "Identify where that action can be confirmed.",
              ),
              blogText(
                "Решите, кто проверяет данные и что делает по результатам.",
                "Decide who checks the data and acts on it.",
              ),
            ],
          },
        ],
      },
      {
        id: "plan",
        title: blogText(
          "Минимальный план измерения",
          "A minimal measurement plan",
        ),
        blocks: [
          {
            type: "paragraph",
            text: blogText(
              "Зафиксируйте события в одной таблице до настройки тегов. Название должно описывать действие, условие — момент срабатывания, а проверка — способ убедиться, что событие действительно произошло. Так маркетолог, разработчик и владелец бизнеса будут обсуждать одно и то же.",
              "Document events in one table before setting up tags. The name describes the action, the trigger defines when it happens, and the check explains how to confirm it. This gives the marketer, developer and business owner a shared reference.",
            ),
          },
          {
            type: "table",
            caption: blogText(
              "Пример плана для сайта услуг",
              "Example plan for a service website",
            ),
            headers: [
              blogText("Вопрос", "Question"),
              blogText("Сигнал", "Signal"),
              blogText("Как проверить", "How to check"),
            ],
            rows: [
              [
                blogText(
                  "Откуда приходят заявки?",
                  "Where do inquiries come from?",
                ),
                blogText(
                  "Успешная отправка формы + источник",
                  "Successful form submission + source",
                ),
                blogText(
                  "Тестовая заявка и запись в CRM",
                  "Test submission and a CRM record",
                ),
              ],
              [
                blogText(
                  "Какая услуга интересует?",
                  "Which service is of interest?",
                ),
                blogText("Выбранная услуга в форме", "Selected form service"),
                blogText(
                  "Сравнить форму и полученную заявку",
                  "Compare the form with the received inquiry",
                ),
              ],
              [
                blogText("Где возникают ошибки?", "Where do errors occur?"),
                blogText(
                  "Ошибка отправки или валидации",
                  "Submission or validation failure",
                ),
                blogText(
                  "Проверить неуспешный сценарий",
                  "Test an unsuccessful scenario",
                ),
              ],
            ],
          },
        ],
      },
      {
        id: "scenarios",
        title: blogText(
          "Два сценария: услуги и магазин",
          "Two scenarios: services and a store",
        ),
        blocks: [
          {
            type: "tabs",
            title: blogText("Тип проекта", "Project type"),
            items: [
              {
                id: "services",
                title: blogText("Услуги", "Services"),
                blocks: [
                  {
                    type: "paragraph",
                    text: blogText(
                      "Свяжите подтверждённую отправку формы с выбранной услугой и источником. Нажатие на WhatsApp полезно как промежуточный сигнал, но оно ещё не подтверждает ни сообщение, ни продажу. Качество обращения оценивайте по обратной связи отдела продаж.",
                      "Connect a confirmed form submission to the chosen service and source. A WhatsApp click is a useful intermediate signal, but does not confirm a message or a sale. Use sales feedback to assess inquiry quality.",
                    ),
                  },
                ],
              },
              {
                id: "store",
                title: blogText("Интернет-магазин", "Online store"),
                blocks: [
                  {
                    type: "paragraph",
                    text: blogText(
                      "Разделите просмотр товара, добавление в корзину и завершённый заказ. Проверяйте идентификатор заказа и сумму по данным магазина. Возврат на страницу благодарности не должен создавать второй заказ в отчётности.",
                      "Separate product views, add-to-cart actions and completed orders. Check the order ID and value against the store. Revisiting a thank-you page should not create a second order in reporting.",
                    ),
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "verification",
        title: blogText("Проверка перед запуском", "Checks before launch"),
        blocks: [
          {
            type: "list",
            items: [
              blogText(
                "Отправьте форму с телефона и компьютера.",
                "Submit the form on mobile and desktop.",
              ),
              blogText(
                "Проверьте успешную отправку, ошибку и повторное нажатие.",
                "Check success, failure and a repeated click.",
              ),
              blogText(
                "Сопоставьте событие с записью в системе заявок.",
                "Match the event to a record in the inquiry system.",
              ),
              blogText(
                "Зафиксируйте дату теста, устройство и ожидаемый результат.",
                "Record the test date, device and expected result.",
              ),
            ],
          },
          {
            type: "quote",
            text: blogText(
              "Полезная метрика заканчивается решением: что оставить, что проверить и что изменить.",
              "A useful metric leads to a decision: what to keep, what to check and what to change.",
            ),
          },
          {
            type: "accordion",
            items: [
              {
                title: blogText(
                  "Каждое событие нужно считать ключевым?",
                  "Should every event be a key event?",
                ),
                text: blogText(
                  "Нет. Ключевыми стоит отмечать действия, значимые для целей проекта. Остальные события помогают разбирать путь пользователя. Терминологию и настройки сверяйте с документацией GA4.",
                  "No. Mark actions that matter to the project’s goals as key events. Other events help explain the user journey. Check GA4 documentation for terminology and settings.",
                ),
              },
              {
                title: blogText(
                  "Почему данные систем могут различаться?",
                  "Why can systems report different numbers?",
                ),
                text: blogText(
                  "Сначала сравните определения метрик, период, часовой пояс и момент фиксации события. Отдельно проверьте дубли и ограничения сбора. Разницу полезнее разбирать по конкретным тестовым действиям, чем по одному общему числу.",
                  "First compare metric definitions, reporting period, time zone and event timing. Check duplicates and collection limitations separately. Specific test actions are more useful for diagnosis than a single total.",
                ),
              },
            ],
          },
        ],
      },
    ],
    sources: [
      {
        label: "Google Analytics · Key events",
        url: "https://support.google.com/analytics/answer/9267568",
      },
    ],
  },
  {
    slug: "utm-guide",
    status: "published",
    category: "analytics",
    date: "2026-10-06",
    title: blogText(
      "UTM-метки: договориться о названиях один раз",
      "UTM tags: agree on a naming system once",
    ),
    excerpt: blogText(
      "Небольшой словарь меток, пример ссылки и проверка перед публикацией — чтобы источники не превращались в десятки похожих строк.",
      "A small naming dictionary, a sample URL and a pre-publication check to keep campaign sources consistent.",
    ),
    cover: blogText("У каждой ссылки есть источник", "Every link has a source"),
    tags: ["UTM", "GA4", "Analytics"],
    sections: [
      {
        id: "naming",
        title: blogText("Договоритесь о словаре", "Agree on a dictionary"),
        blocks: [
          {
            type: "paragraph",
            text: blogText(
              "Разметка начинает помогать, когда вся команда использует одинаковые названия. Заранее определите написание источников, каналов и кампаний. Если один человек пишет newsletter, а другой — email_news, сравнивать результаты становится сложнее. Храните правила рядом с таблицей рекламных материалов.",
              "Campaign tagging becomes useful when the team uses consistent names. Agree on sources, mediums and campaigns in advance. If one person uses newsletter and another uses email_news, comparison becomes harder. Keep the rules next to your campaign asset sheet.",
            ),
          },
          {
            type: "table",
            caption: blogText("Пример словаря UTM", "Example UTM dictionary"),
            headers: [
              blogText("Параметр", "Parameter"),
              blogText("За что отвечает", "Purpose"),
              blogText("Пример", "Example"),
            ],
            rows: [
              [
                "utm_source",
                blogText("Источник перехода", "Traffic source"),
                "partner_blog",
              ],
              [
                "utm_medium",
                blogText("Тип канала", "Channel type"),
                "referral",
              ],
              [
                "utm_campaign",
                blogText("Кампания", "Campaign"),
                "autumn_launch",
              ],
              [
                "utm_content",
                blogText("Вариант размещения", "Placement variant"),
                "article_footer",
              ],
            ],
          },
        ],
      },
      {
        id: "example",
        title: blogText("Как выглядит ссылка", "What a tagged URL looks like"),
        blocks: [
          {
            type: "code",
            language: "URL",
            text: "https://example.com/service?utm_source=partner_blog&utm_medium=referral&utm_campaign=autumn_launch&utm_content=article_footer",
          },
          {
            type: "paragraph",
            text: blogText(
              "Это учебный адрес. В рабочей ссылке сначала укажите страницу назначения, затем добавьте параметры. Если в адресе уже есть вопросительный знак, новые параметры добавляются через амперсанд. Генератор ссылок уменьшает риск случайно потерять существующие параметры или якорь.",
              "This is a sample URL. For a real link, start with the destination and add parameters. If the URL already has a question mark, additional parameters use an ampersand. A URL builder helps preserve existing parameters and fragments.",
            ),
          },
          {
            type: "callout",
            title: blogText("Метки — часть адреса", "Tags are part of the URL"),
            text: blogText(
              "Не включайте в UTM телефон, email или имя клиента. Для сравнения размещений достаточно условных названий кампании и креатива.",
              "Do not put phone numbers, email addresses or customer names in UTM tags. Campaign and creative labels are enough to compare placements.",
            ),
          },
        ],
      },
      {
        id: "check",
        title: blogText(
          "Проверка перед размещением",
          "Check before publishing",
        ),
        blocks: [
          {
            type: "list",
            ordered: true,
            items: [
              blogText(
                "Откройте готовую ссылку и проверьте страницу назначения.",
                "Open the finished link and check the destination.",
              ),
              blogText(
                "Убедитесь, что редирект сохраняет нужные параметры.",
                "Confirm that redirects preserve the required parameters.",
              ),
              blogText(
                "Проверьте выбранные названия по словарю команды.",
                "Check the names against the team dictionary.",
              ),
              blogText(
                "После тестового перехода проверьте сбор данных.",
                "After a test visit, check data collection.",
              ),
            ],
          },
          {
            type: "paragraph",
            text: blogText(
              "Для регулярных кампаний удобно хранить исходную страницу, все значения UTM, готовую ссылку и место размещения в одной таблице. Тогда ссылку можно проверить до запуска, а после — понять, какое объявление или письмо использовало конкретную разметку. Названия не стоит менять посреди теста без записи причины.",
              "For recurring campaigns, keep the destination, UTM values, final URL and placement together in one sheet. This supports pre-launch checks and helps identify which ad or email used each tag. Avoid changing names during a test without recording why.",
            ),
          },
          {
            type: "accordion",
            items: [
              {
                title: blogText(
                  "UTM сами создают отчёт?",
                  "Do UTM tags create a report by themselves?",
                ),
                text: blogText(
                  "Нет. Метки передают информацию в адресе. На принимающем сайте должна работать аналитика, а условия сбора и отчётности нужно проверить отдельно.",
                  "No. Tags carry information in the URL. The destination needs working analytics, and collection and reporting should be checked separately.",
                ),
              },
            ],
          },
        ],
      },
    ],
    sources: [
      {
        label: "Google Analytics · Campaign URL builders",
        url: "https://support.google.com/analytics/answer/10917952",
      },
    ],
  },
  {
    slug: "advertising-brief",
    status: "published",
    category: "advertising",
    date: "2026-10-06",
    title: blogText(
      "Что подготовить до запуска рекламы",
      "What to prepare before launching advertising",
    ),
    excerpt: blogText(
      "Короткий бриф, который связывает продукт, аудиторию, посадочную страницу и обработку заявок.",
      "A short brief connecting your product, audience, landing page and lead handling.",
    ),
    cover: blogText(
      "Сначала задача. Потом запуск.",
      "The goal comes before launch.",
    ),
    tags: ["Google Ads", "Meta Ads", "Brief"],
    sections: [
      {
        id: "offer",
        title: blogText("Опишите предложение", "Describe the offer"),
        blocks: [
          {
            type: "paragraph",
            text: blogText(
              "До подбора форматов рекламы сформулируйте, что именно человек получает и почему ему стоит обратиться сейчас. Нужны конкретная услуга или товар, регион, условия покупки и ограничения. Фраза «хотим больше продаж» описывает желание, но не помогает собрать кампанию.",
              "Before choosing ad formats, explain what the customer receives and why they should inquire now. Specify the service or product, region, purchase conditions and limitations. “We want more sales” expresses an ambition, but is not enough to build a campaign.",
            ),
          },
          {
            type: "list",
            items: [
              blogText(
                "Что продаём и для кого это подходит?",
                "What are we selling and who is it for?",
              ),
              blogText(
                "Чем предложение отличается от альтернатив?",
                "How does the offer differ from alternatives?",
              ),
              blogText(
                "Какие вопросы мешают человеку оставить заявку?",
                "Which questions prevent a visitor from inquiring?",
              ),
              blogText(
                "Какие материалы подтверждают обещания?",
                "Which materials support the claims?",
              ),
            ],
          },
        ],
      },
      {
        id: "readiness",
        title: blogText(
          "Проверьте готовность к трафику",
          "Check readiness for traffic",
        ),
        blocks: [
          {
            type: "table",
            caption: blogText("Бриф перед стартом", "Pre-launch brief"),
            headers: [
              blogText("Блок", "Area"),
              blogText("Что подготовить", "What to prepare"),
            ],
            rows: [
              [
                blogText("Продукт", "Product"),
                blogText(
                  "Цена, условия, география, приоритетные позиции",
                  "Price, terms, geography and priority products",
                ),
              ],
              [
                blogText("Сайт", "Website"),
                blogText(
                  "Рабочая форма, понятный оффер, мобильная версия",
                  "Working form, clear offer and mobile layout",
                ),
              ],
              [
                blogText("Аналитика", "Analytics"),
                blogText(
                  "Подтверждение заявки и источник перехода",
                  "Confirmed inquiry and traffic source",
                ),
              ],
              [
                blogText("Продажи", "Sales"),
                blogText(
                  "Ответственный, время ответа и статусы лидов",
                  "Owner, response process and lead statuses",
                ),
              ],
            ],
          },
          {
            type: "paragraph",
            text: blogText(
              "Сделайте пробную заявку до запуска. Посмотрите, куда она попала, кто получил уведомление и может ли менеджер понять, какая услуга интересует клиента. Даже удачное объявление не исправит форму, которая молча теряет данные, или процесс, в котором никто не отвечает на обращения.",
              "Submit a test inquiry before launch. Check where it arrives, who receives a notification and whether the manager can identify the requested service. A strong ad cannot repair a form that silently loses data or a process where nobody responds.",
            ),
          },
        ],
      },
      {
        id: "testing",
        title: blogText(
          "Согласуйте логику первых тестов",
          "Agree on the first tests",
        ),
        blocks: [
          {
            type: "tabs",
            title: blogText("Проверяемая гипотеза", "Hypothesis to test"),
            items: [
              {
                id: "offer",
                title: blogText("Предложение", "Offer"),
                blocks: [
                  {
                    type: "paragraph",
                    text: blogText(
                      "Сравните два понятных предложения для одной задачи аудитории. Заранее запишите, чем они различаются и какой результат поможет выбрать следующее действие.",
                      "Compare two clear offers addressing the same customer need. Record how they differ and what evidence will guide the next action.",
                    ),
                  },
                ],
              },
              {
                id: "page",
                title: blogText("Страница", "Page"),
                blocks: [
                  {
                    type: "paragraph",
                    text: blogText(
                      "Проверьте, совпадает ли обещание объявления с первым экраном сайта. Оцените понятность следующего шага и вопросы, которые остаются до отправки формы.",
                      "Check whether the landing page matches the ad’s promise. Review the clarity of the next step and the questions that remain before submission.",
                    ),
                  },
                ],
              },
            ],
          },
          {
            type: "callout",
            title: blogText("Смотрите дальше клика", "Look beyond the click"),
            text: blogText(
              "Согласуйте, что считается целевым обращением. Низкая стоимость заявки без обратной связи отдела продаж ещё не говорит о полезном результате.",
              "Agree on what qualifies as a suitable inquiry. A low cost per lead without sales feedback does not establish a useful outcome.",
            ),
          },
        ],
      },
    ],
    sources: [],
  },
  {
    slug: "website-launch-checklist",
    status: "published",
    category: "web",
    date: "2026-10-06",
    title: blogText(
      "Чек-лист сайта перед публикацией",
      "A website checklist before publishing",
    ),
    excerpt: blogText(
      "Что проверить помимо внешнего вида: формы, навигацию, мобильные экраны, контент и основные настройки поиска.",
      "What to check beyond appearance: forms, navigation, mobile layouts, content and basic search settings.",
    ),
    cover: blogText("Готово — значит проверено", "Ready means checked"),
    tags: ["Web", "SEO", "Checklist"],
    sections: [
      {
        id: "journeys",
        title: blogText(
          "Пройдите путь посетителя",
          "Walk through the visitor journey",
        ),
        blocks: [
          {
            type: "paragraph",
            text: blogText(
              "Начните с задачи человека, который впервые открыл сайт. Может ли он понять предложение, найти нужную услугу и связаться с вами? Проверяйте целый сценарий, а не только отдельные экраны. Ссылка, которая выглядит правильно, всё ещё может вести на пустую страницу.",
              "Start with a first-time visitor’s goal. Can they understand the offer, find the right service and contact you? Test complete journeys rather than isolated screens. A link that looks correct can still lead to an empty page.",
            ),
          },
          {
            type: "list",
            ordered: true,
            items: [
              blogText(
                "Откройте главную и найдите нужную услугу.",
                "Open the home page and find a service.",
              ),
              blogText(
                "Перейдите в кейс, затем вернитесь к каталогу.",
                "Open a case study and return to the catalog.",
              ),
              blogText(
                "Заполните форму и проверьте получателя.",
                "Complete the form and verify the recipient.",
              ),
              blogText(
                "Повторите сценарий на телефоне и с клавиатуры.",
                "Repeat the journey on mobile and using a keyboard.",
              ),
            ],
          },
        ],
      },
      {
        id: "content",
        title: blogText("Контент и доступность", "Content and accessibility"),
        blocks: [
          {
            type: "paragraph",
            text: blogText(
              "Проверьте заголовки, актуальность контактов, единицы измерения и названия кнопок. Уберите тестовые тексты. Изображения должны быть уместны и читаемы; для содержательных иллюстраций добавьте понятное описание. Попап должен закрываться предсказуемо, а фокус клавиатуры — оставаться видимым.",
              "Check headings, contact details, units and button labels. Remove test copy. Images should be relevant and readable; meaningful illustrations need useful descriptions. Dialogs should close predictably and keyboard focus should remain visible.",
            ),
          },
          {
            type: "table",
            caption: blogText("Проверка по устройствам", "Device checks"),
            headers: [
              blogText("Проверка", "Check"),
              blogText("Телефон", "Mobile"),
              blogText("Компьютер", "Desktop"),
            ],
            rows: [
              [
                blogText("Меню", "Menu"),
                blogText(
                  "Открывается касанием, помещается на экране",
                  "Opens by touch and fits the screen",
                ),
                blogText("Доступно с клавиатуры", "Works with a keyboard"),
              ],
              [
                blogText("Таблицы", "Tables"),
                blogText(
                  "Прокрутка внутри блока",
                  "Scroll within their container",
                ),
                blogText(
                  "Читаемые заголовки и значения",
                  "Readable headings and values",
                ),
              ],
              [
                blogText("Формы", "Forms"),
                blogText("Понятные поля и ошибки", "Clear fields and errors"),
                blogText("Логичный порядок перехода Tab", "Logical Tab order"),
              ],
            ],
          },
        ],
      },
      {
        id: "search",
        title: blogText("Базовые настройки поиска", "Basic search settings"),
        blocks: [
          {
            type: "paragraph",
            text: blogText(
              "Проверьте названия страниц, описания и доступность важных адресов. Если переносите существующий сайт, составьте карту старых и новых URL до запуска. После публикации отдельно проверьте, какие страницы доступны поисковым системам и нет ли случайных ограничений индексации.",
              "Check page titles, descriptions and the availability of important URLs. If replacing an existing site, map old URLs to new ones before launch. After publication, check which pages search engines can access and whether any indexing restrictions were left unintentionally.",
            ),
          },
          {
            type: "accordion",
            items: [
              {
                title: blogText(
                  "Достаточно проверки главной страницы?",
                  "Is checking the home page enough?",
                ),
                text: blogText(
                  "Нет. Проверьте хотя бы один экземпляр каждого шаблона: услугу, категорию, статью, форму и страницу с таблицей. Ошибки часто зависят от длины конкретного текста.",
                  "No. Check at least one of every template: service, category, article, form and table page. Problems often depend on the length of specific content.",
                ),
              },
              {
                title: blogText(
                  "Что записать после тестирования?",
                  "What should a test record include?",
                ),
                text: blogText(
                  "Адрес страницы, устройство, действие, ожидаемый и фактический результат. Такой список быстрее превращается в исправления, чем общее замечание «сайт работает странно».",
                  "Record the URL, device, action, expected result and actual result. This is easier to turn into fixes than a general statement that the site behaves strangely.",
                ),
              },
            ],
          },
        ],
      },
    ],
    sources: [
      {
        label: "Google Search Central · SEO Starter Guide",
        url: "https://developers.google.com/search/docs/fundamentals/seo-starter-guide",
      },
    ],
  },
  {
    slug: "crm-lead-handoff",
    status: "published",
    category: "web",
    date: "2026-10-06",
    title: blogText(
      "Заявка пришла. Что происходит дальше?",
      "An inquiry arrived. What happens next?",
    ),
    excerpt: blogText(
      "Как спроектировать передачу заявок из формы в CRM: поля, статусы, уведомления и обработка дублей.",
      "Design the handoff from a website form to a CRM: fields, statuses, notifications and duplicate handling.",
    ),
    cover: blogText("Форма → CRM → действие", "Form → CRM → action"),
    tags: ["CRM", "API", "Automation"],
    sections: [
      {
        id: "handoff",
        title: blogText("Начните с процесса", "Start with the workflow"),
        blocks: [
          {
            type: "paragraph",
            text: blogText(
              "Интеграция полезна, когда понятно, что команда делает с полученными данными. Перед подключением формы определите ответственного, обязательные поля и первый шаг после получения заявки. Если эти решения не приняты, автоматизация просто быстрее перенесёт неопределённость из одного окна в другое.",
              "An integration is useful when the team knows what to do with the data. Before connecting a form, define the owner, required fields and first action after receiving an inquiry. Otherwise, automation merely moves uncertainty from one screen to another more quickly.",
            ),
          },
          {
            type: "list",
            items: [
              blogText(
                "Кто получает новую заявку и подменяет ответственного?",
                "Who receives new inquiries and covers for the owner?",
              ),
              blogText(
                "Каких данных достаточно для первого контакта?",
                "What information is enough for the first contact?",
              ),
              blogText(
                "По каким статусам понятно, что работа продвигается?",
                "Which statuses show that work is progressing?",
              ),
            ],
          },
        ],
      },
      {
        id: "fields",
        title: blogText(
          "Согласуйте поля и статусы",
          "Agree on fields and statuses",
        ),
        blocks: [
          {
            type: "table",
            caption: blogText("Карта передачи данных", "Data handoff map"),
            headers: [
              blogText("Из формы", "From the form"),
              blogText("В CRM", "In the CRM"),
              blogText("Проверка", "Check"),
            ],
            rows: [
              [
                blogText("Имя и контакт", "Name and contact"),
                blogText("Контакт", "Contact"),
                blogText(
                  "Данные не теряются при передаче",
                  "Values survive the transfer",
                ),
              ],
              [
                blogText("Услуга", "Service"),
                blogText("Тип обращения", "Inquiry type"),
                blogText(
                  "Название совпадает со справочником",
                  "Name matches the agreed dictionary",
                ),
              ],
              [
                "UTM",
                blogText("Источник", "Source"),
                blogText(
                  "Сохраняются исходные значения",
                  "Original values are preserved",
                ),
              ],
            ],
          },
          {
            type: "paragraph",
            text: blogText(
              "Начните с небольшого набора полей и объясните назначение каждого. Чем меньше полей команда заполняет без понимания причины, тем проще поддерживать качество данных. Отдельно договоритесь, что считать дублем: повторный запрос одного клиента может быть новой задачей, а не ошибкой.",
              "Start with a small set of fields and explain the purpose of each. Fewer fields filled without a clear reason make data quality easier to maintain. Define duplicates separately: a repeat inquiry from one customer may be a new task rather than an error.",
            ),
          },
        ],
      },
      {
        id: "failure",
        title: blogText(
          "Проверьте неудачные сценарии",
          "Test unsuccessful scenarios",
        ),
        blocks: [
          {
            type: "tabs",
            title: blogText("Сценарий передачи", "Handoff scenario"),
            items: [
              {
                id: "success",
                title: blogText("Успех", "Success"),
                blocks: [
                  {
                    type: "paragraph",
                    text: blogText(
                      "Отправьте тестовую форму и найдите запись в CRM. Сверьте поля, ответственного, уведомление и источник. Зафиксируйте результат проверки.",
                      "Submit a test form and locate the CRM record. Check the fields, owner, notification and source, then record the result.",
                    ),
                  },
                ],
              },
              {
                id: "retry",
                title: blogText("Ошибка", "Failure"),
                blocks: [
                  {
                    type: "paragraph",
                    text: blogText(
                      "Определите, где сохраняется ошибка и кто узнаёт о недоставленной заявке. Продумайте повторную отправку так, чтобы она не создавала неконтролируемые дубли. Конкретная реализация зависит от API и выбранной платформы.",
                      "Define where a failure is recorded and who learns about an undelivered inquiry. Plan retries so they do not create uncontrolled duplicates. The implementation depends on the API and platform.",
                    ),
                  },
                ],
              },
            ],
          },
          {
            type: "callout",
            title: blogText(
              "Передайте инструкцию команде",
              "Hand over a team guide",
            ),
            text: blogText(
              "В ней должны быть схема обмена, названия полей, место проверки ошибок и порядок действий при сбое. Это часть результата интеграции.",
              "Include the data flow, field names, where to check errors and the response procedure. This is part of the integration deliverable.",
            ),
          },
        ],
      },
    ],
    sources: [],
  },
];
