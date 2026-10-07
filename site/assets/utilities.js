/* Shared footer and informational pages. Content describes this static site. */
const utilityCopy = (value) => value?.[currentLanguage] || value?.ru || value;
const utilityText = (ru, en) => ({ ru, en });
const UTILITY_PAGES = {
  privacy: {
    emoji: "🔐",
    title: utilityText("Конфиденциальность", "Privacy"),
    lead: utilityText(
      "Что происходит с данными, которые вы вводите на этом сайте.",
      "What happens to the information you enter on this website.",
    ),
    sections: [
      [
        utilityText("Кому вы пишете", "Who you contact"),
        utilityText(
          "Сайт Ads by Kanapiya представляет Жаксылык Мухамед-Канапия. По вопросам заявки или ваших данных можно написать в Telegram @muhamed_kanapiya либо WhatsApp +7 707 340 68 88.",
          "Ads by Kanapiya is the portfolio of Zhaksylyk Muhamed-Kanapiya. For questions about an inquiry or your information, contact @muhamed_kanapiya on Telegram or +7 707 340 68 88 on WhatsApp.",
        ),
      ],
      [
        utilityText("Форма заявки", "The inquiry form"),
        utilityText(
          "Вы вводите имя, контакт, сайт проекта (необязательно) и описание задачи, выбираете услугу и при необходимости тариф или формат обучения. Форма составляет сообщение прямо в браузере. Адрес страницы заявки и исходная страница перехода к форме включаются в видимый черновик. Произвольные параметры адреса, например email или токены, не копируются.",
          "You enter a name, contact, optional project website and task description, and select a service and, where relevant, a plan or training format. The form prepares a message in your browser. The inquiry page and the page that linked to the form are included in the visible draft. Arbitrary URL parameters, such as email addresses or tokens, are not copied.",
        ),
      ],
      [
        utilityText(
          "Когда данные передаются",
          "When information is transferred",
        ),
        utilityText(
          "Пока вы заполняете форму, сайт не отправляет её содержимое на сервер заявок. Кнопка WhatsApp или Telegram передаёт черновик выбранному сервису в адресе ссылки и открывает мессенджер. Чтобы доставить сообщение мне, подтвердите отправку в мессенджере. Кнопка «Скопировать» записывает текст в буфер обмена вашего устройства.",
          "While you complete the form, this website does not send its contents to an inquiry server. The WhatsApp or Telegram button passes the draft to that service in the link address and opens the messenger. Confirm sending there to deliver the message to me. Copy writes the text to your device clipboard.",
        ),
      ],
      [
        utilityText("Хранение и назначение", "Storage and purpose"),
        utilityText(
          "Поля формы и предпросмотр комментария находятся в памяти открытой страницы; сайт не сохраняет их в localStorage. После отправки сообщения переписка хранится в выбранном мессенджере и используется для ответа и обсуждения проекта. Чтобы обсудить исправление или удаление присланных сведений, напишите в тот же чат. Хранение данных самим мессенджером регулируется правилами этого сервиса.",
          "Form fields and comment previews stay in the open page's memory; this website does not save them to localStorage. Once sent, the conversation is stored in your chosen messenger and used to reply and discuss the project. To discuss correcting or deleting information you sent, contact me in the same chat. The messenger's own data storage is governed by that service's policies.",
        ),
      ],
      [
        utilityText("Хостинг и внешние ссылки", "Hosting and external links"),
        utilityText(
          "Сайт размещён на GitHub Pages. Хостинг обрабатывает технические данные HTTP-запросов по своим правилам. На сайте нет подключённых счётчиков GA4, GTM или рекламных пикселей. Внешние ссылки содержат UTM-метки, обозначающие переход из портфолио; после перехода действуют правила сайта-получателя.",
          "This site is hosted on GitHub Pages. The hosting provider processes technical HTTP request information under its own policies. No GA4, GTM or advertising pixels are installed on this site. External links contain UTM tags identifying a visit from this portfolio; the destination site's policies apply after you follow a link.",
        ),
      ],
    ],
    links: [
      [
        "GitHub · Privacy",
        "https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement",
      ],
      ["Telegram · Privacy", "https://telegram.org/privacy"],
      ["WhatsApp · Privacy", "https://www.whatsapp.com/legal/privacy-policy"],
    ],
  },
  cookies: {
    emoji: "🍪",
    title: utilityText("Cookies и настройки", "Cookies & preferences"),
    lead: utilityText(
      "Две настройки для удобства. Без рекламных счётчиков.",
      "Two convenience settings. No advertising trackers.",
    ),
    sections: [
      [
        utilityText("Что сохраняет сайт", "What the site stores"),
        utilityText(
          "Собственный код сайта не устанавливает cookies. В локальном хранилище браузера (localStorage) сохраняются только выбранный язык и валюта. Они остаются на вашем устройстве, пока вы не сбросите настройки или не очистите данные сайта в браузере.",
          "The site's own code does not set cookies. Browser local storage (localStorage) holds only your selected language and currency. They remain on your device until you reset preferences or clear the site's browser data.",
        ),
      ],
      [
        utilityText("Что туда не попадает", "What is not saved there"),
        utilityText(
          "Имя, контакты, сообщение, адрес проекта и комментарии не записываются в localStorage. Для определения страницы заявки не создаётся история просмотров: используется текущий адрес и параметр перехода от кнопки «Обсудить задачу».",
          "Names, contacts, messages, project addresses and comments are not written to localStorage. Inquiry attribution does not create browsing history: it uses the current address and the source parameter from a Discuss the task link.",
        ),
      ],
      [
        utilityText("Внешние сервисы", "External services"),
        utilityText(
          "При переходе в GitHub, Google, соцсети или мессенджер настройки и cookies этих сервисов регулируются отдельно. Сброс ниже удаляет только две настройки портфолио и не изменяет данные других сайтов.",
          "When you visit GitHub, Google, a social network or a messenger, those services manage their own preferences and cookies. The reset below removes only this portfolio's two preferences and does not change other websites' data.",
        ),
      ],
    ],
  },
  terms: {
    emoji: "📄",
    title: utilityText("Информация об услугах", "Service information"),
    lead: utilityText(
      "Как читать цены, материалы и описания работ на сайте.",
      "How to use the prices, materials and service descriptions on this site.",
    ),
    sections: [
      [
        utilityText("Объём и стоимость", "Scope and pricing"),
        utilityText(
          "Страницы услуг описывают возможный состав работ. Конкретные задачи, сроки, доступы, результат и порядок оплаты согласуются до начала проекта. Суммы в USD, RUB и KZT задаются отдельно; переключатель валют не пересчитывает их по банковскому курсу. «По запросу» означает, что стоимость нужно обсудить.",
          "Service pages describe possible deliverables. Tasks, timing, access, deliverables and payment arrangements are agreed before the project starts. USD, RUB and KZT amounts are set independently; the currency selector does not convert them at a bank exchange rate. By agreement means the price needs to be discussed.",
        ),
      ],
      [
        utilityText(
          "Заявка — начало разговора",
          "An inquiry starts a conversation",
        ),
        utilityText(
          "Заполнение формы и открытие мессенджера не означают, что проект принят в работу или оплачен. Сообщение отправляете вы в выбранном чате. На этом сайте нет онлайн-оплаты и автоматического оформления заказа.",
          "Completing the form and opening a messenger does not mean a project has been accepted or paid for. You send the message in your chosen chat. This website has no online payment or automatic checkout.",
        ),
      ],
      [
        utilityText("Кейсы и материалы", "Case studies and materials"),
        utilityText(
          "Описания проектов помогают оценить подход к работе. Результат другой компании не является обещанием аналогичного результата для вашего проекта: условия, продукт, бюджет и рынок могут отличаться. Статьи содержат практические примеры, которые нужно адаптировать к своей задаче.",
          "Project descriptions help explain the approach. Another company's result is not a promise of the same result for your project: conditions, product, budget and market may differ. Articles contain practical examples that need to be adapted to your task.",
        ),
      ],
      [
        utilityText("Источники и обратная связь", "Sources and feedback"),
        utilityText(
          "Названия и логотипы клиентов используются для обозначения проектов. Отзывы и сертификаты сопровождаются ссылками на источники. Если заметили ошибку или хотите обсудить использование материала, напишите мне, указав адрес страницы и нужный фрагмент.",
          "Client names and logos identify projects. Reviews and certificates include source links. If you notice an error or would like to discuss the use of a material, contact me with the page address and the relevant passage.",
        ),
      ],
    ],
  },
};

function utilityMetadata(kind) {
  if (UTILITY_PAGES[kind])
    return {
      title: utilityCopy(UTILITY_PAGES[kind].title),
      description: utilityCopy(UTILITY_PAGES[kind].lead),
    };
  if (kind === "site-map")
    return {
      title: translateText("All pages"),
      description: translateText(
        "A shortcut to every corner of the portfolio.",
      ),
    };
  if (kind === "not-found")
    return {
      title: translateText("Page not found"),
      description: translateText(
        "This link reached a dead end. Let's find the right page.",
      ),
    };
  return null;
}
function UtilityHeading({ emoji, title, lead }) {
  return i("header", {
    className: "utility-heading",
    children: [
      i("a", {
        className: "utility-back",
        href: pageLink("index.html"),
        children: "← Home",
      }),
      i("span", {
        className: "utility-icon",
        "aria-hidden": true,
        children: emoji,
      }),
      i("h1", { children: title }),
      i("p", { children: lead }),
    ],
  });
}
function StoragePreferences() {
  const [status, setStatus] = le.useState("");
  const reset = () => {
    try {
      localStorage.removeItem("portfolio-language");
      localStorage.removeItem("portfolio-currency");
      currentLanguage = "ru";
      currentCurrency = window.PORTFOLIO.currency || "USD";
      const url = new URL(location.href);
      url.searchParams.set("lang", "ru");
      history.replaceState(null, "", url);
      window.dispatchEvent(new Event("languagechange"));
      window.dispatchEvent(new Event("currencychange"));
      setStatus(
        "Preferences reset. Russian and the default currency are now selected.",
      );
    } catch {
      setStatus(
        "Storage is unavailable. You can clear site data in your browser settings.",
      );
    }
  };
  return i("section", {
    className: "storage-preferences",
    children: [
      i("h2", { children: "Saved preferences" }),
      i("dl", {
        children: [
          i("div", {
            children: [
              i("dt", { children: "portfolio-language" }),
              i("dd", { children: "Site language: RU / EN" }),
            ],
          }),
          i("div", {
            children: [
              i("dt", { children: "portfolio-currency" }),
              i("dd", { children: "Currency: USD / RUB / KZT" }),
            ],
          }),
        ],
      }),
      i("button", {
        type: "button",
        className: "action action-secondary",
        onClick: reset,
        children: "Reset site preferences",
      }),
      i("p", { role: "status", children: status }),
    ],
  });
}
function UtilityPage({ kind }) {
  const page = UTILITY_PAGES[kind];
  return i("main", {
    id: "main-content",
    className: "page-container utility-page",
    children: [
      i(UtilityHeading, {
        emoji: page.emoji,
        title: utilityCopy(page.title),
        lead: utilityCopy(page.lead),
      }),
      i("div", {
        className: "utility-reading",
        children: [
          i("p", {
            className: "utility-updated",
            children:
              currentLanguage === "ru"
                ? "Обновлено 6 октября 2026"
                : "Updated 6 October 2026",
          }),
          ...page.sections.map(([title, text], index) =>
            i(
              "section",
              {
                children: [
                  i("span", {
                    className: "utility-section-number",
                    "aria-hidden": true,
                    children: String(index + 1).padStart(2, "0"),
                  }),
                  i("h2", { children: utilityCopy(title) }),
                  i("p", { children: utilityCopy(text) }),
                ],
              },
              index,
            ),
          ),
          kind === "cookies" ? i(StoragePreferences, {}) : null,
          page.links
            ? i("nav", {
                className: "utility-references",
                "aria-label": translateText(
                  "Privacy policies of external services",
                ),
                children: page.links.map(([label, href]) =>
                  i(
                    "a",
                    { href, target: "_blank", children: label + " ↗" },
                    label,
                  ),
                ),
              })
            : null,
          i("div", {
            className: "utility-end-links",
            children: [
              i("a", {
                href: "https://t.me/" + window.PORTFOLIO.telegram,
                target: "_blank",
                children: "Ask a question ↗",
              }),
              i("a", {
                href: pageLink("site-map.html"),
                children: "All pages ↗",
              }),
            ],
          }),
        ],
      }),
    ],
  });
}
function siteMapGroups() {
  const page = (label, file) => ({
    label: translateText(label),
    href: pageLink(file),
  });
  return [
    {
      id: "main",
      emoji: "🏠",
      title: translateText("Portfolio"),
      links: [
        page("Home", "index.html"),
        page("All services", "services.html"),
        page("All case studies", "cases.html"),
        page("Clients", "clients.html"),
        page("Pricing", "pricing.html"),
        page("Reviews", "reviews.html"),
        page("About me", "about.html"),
      ],
    },
    {
      id: "growth",
      emoji: "🌍",
      title: catalogTranslation("AI & cities", "ИИ и города"),
      links: [
        page("AI for business", "ai.html"),
        page(catalogTranslation("All cities", "Все города"), "cities.html"),
        ...CITY_PAGES.map((city) =>
          page(growthCopy(city.name), city.id + ".html"),
        ),
      ],
    },
    {
      id: "services",
      emoji: "🧩",
      title: translateText("Services"),
      links: tu.map((service) => ({
        label: translateText(service.title),
        href: detailLink("service", service.id),
      })),
    },
    {
      id: "cases",
      emoji: "📁",
      title: translateText("Case studies"),
      links: publishedCases().map((record) => ({
        label: translateText(record.title),
        detail: translateText(record.headline || ""),
        href: detailLink("case", record.id),
      })),
    },
    {
      id: "clients",
      emoji: "🤝",
      title: translateText("Client cards"),
      links: window.CLIENTS.map((client) => ({
        label: client.name,
        href: pageLink("clients.html") + "#client-" + client.id,
      })),
    },
    {
      id: "blog",
      emoji: "📝",
      title: translateText("Blog previews"),
      links: [
        page("All articles", "blog.html"),
        ...(window.BLOG_CATEGORIES || []).map((category) => ({
          label: utilityCopy(category.name),
          href:
            pageLink("blog-category.html") +
            "&category=" +
            encodeURIComponent(category.slug),
        })),
        ...(window.BLOG_POSTS || [])
          .filter((post) => post.status === "published")
          .map((post) => ({
            label: utilityCopy(post.title),
            href:
              pageLink("blog-post.html") +
              "&post=" +
              encodeURIComponent(post.slug),
          })),
      ],
    },
    {
      id: "info",
      emoji: "🧭",
      title: translateText("Information"),
      links: [
        ...Object.entries(UTILITY_PAGES).map(([kind, item]) =>
          page(utilityCopy(item.title), kind + ".html"),
        ),
        page("All pages", "site-map.html"),
        page("404 page", "404.html"),
      ],
    },
  ];
}
function filterSiteMap(query) {
  const words = query.trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
  return siteMapGroups()
    .map((group) => ({
      ...group,
      links: group.links.filter((link) =>
        words.every((word) =>
          [group.title, link.label, link.detail || ""]
            .join(" ")
            .toLocaleLowerCase()
            .includes(word),
        ),
      ),
    }))
    .filter((group) => group.links.length);
}
function SiteMapPage() {
  const [query, setQuery] = le.useState("");
  const groups = filterSiteMap(query);
  return i("main", {
    id: "main-content",
    className: "page-container utility-page sitemap-page",
    children: [
      i(UtilityHeading, {
        emoji: "🗺️",
        title: "All pages",
        lead: "A shortcut to every corner of the portfolio.",
      }),
      i("div", {
        className: "sitemap-toolbar",
        children: [
          i("label", {
            children: [
              i("span", { children: "Find a page" }),
              i("input", {
                type: "search",
                value: query,
                onChange: (event) => setQuery(event.target.value),
                placeholder: translateText("Service, client or article"),
              }),
            ],
          }),
          i("p", {
            role: "status",
            children:
              translateText("Links found") +
              ": " +
              groups.reduce((sum, group) => sum + group.links.length, 0),
          }),
        ],
      }),
      groups.length
        ? i("div", {
            className: "sitemap-groups",
            children: groups.map((group) =>
              i(
                "section",
                {
                  id: "map-" + group.id,
                  children: [
                    i("h2", {
                      children: [
                        i("span", {
                          "aria-hidden": true,
                          children: group.emoji,
                        }),
                        group.title,
                        i("small", { children: group.links.length }),
                      ],
                    }),
                    group.id === "blog"
                      ? i("p", {
                          className: "sitemap-note",
                          children:
                            "Blog pages are available here and by direct link; they are not in the main menu.",
                        })
                      : null,
                    i("ul", {
                      children: group.links.map((link) =>
                        i(
                          "li",
                          {
                            children: i("a", {
                              href: link.href,
                              children: [
                                i("span", { children: link.label }),
                                link.detail
                                  ? i("small", { children: link.detail })
                                  : null,
                                i("span", {
                                  className: "sitemap-arrow",
                                  "aria-hidden": true,
                                  children: "↗",
                                }),
                              ],
                            }),
                          },
                          link.href,
                        ),
                      ),
                    }),
                  ],
                },
                group.id,
              ),
            ),
          })
        : i("div", {
            className: "sitemap-empty",
            children: [
              i("h2", { children: "No pages found." }),
              i("button", {
                type: "button",
                className: "action action-secondary",
                onClick: () => setQuery(""),
                children: "Clear search",
              }),
            ],
          }),
    ],
  });
}
function NotFoundPage() {
  return i("main", {
    id: "main-content",
    className: "page-container utility-page not-found-page",
    children: [
      i("div", {
        className: "lost-code",
        "aria-hidden": true,
        children: ["4", i("span", { children: "🧭" }), "4"],
      }),
      i("p", { className: "section-eyebrow", children: "A small detour" }),
      i("h1", { children: "Page not found" }),
      i("p", {
        children: "This link reached a dead end. Let's find the right page.",
      }),
      i("div", {
        className: "detail-actions",
        children: [
          i(Action, { href: pageLink("index.html"), children: "Home" }),
          i(Action, {
            href: pageLink("site-map.html"),
            secondary: true,
            children: "All pages",
          }),
        ],
      }),
    ],
  });
}

function FooterDirectory() {
  const nav = (title, links) =>
    i(
      "nav",
      {
        className: "footer-link-column",
        "aria-label": translateText(title),
        children: [
          i("h3", { children: title }),
          ...links.map(([label, href]) =>
            i("a", { href, children: label }, href),
          ),
        ],
      },
      title,
    );
  return i("div", {
    className: "page-container footer-directory",
    children: [
      i("div", {
        className: "footer-brand-column",
        children: [
          i("a", {
            className: "brand",
            href: pageLink("index.html"),
            children: [
              i("span", { className: "brand-mark", children: "AK" }),
              i("span", { children: "Ads by Kanapiya" }),
            ],
          }),
          i("p", {
            children: "Advertising, websites and analytics that work together.",
          }),
          i("span", {
            className: "footer-availability",
            children: "Kazakhstan · working worldwide",
          }),
        ],
      }),
      nav(
        "Expertise",
        [
          "google-ads",
          "meta-ads",
          "seo",
          "web-development",
          "crm-integrations",
          "training",
        ].map((id) => {
          const service = tu.find((item) => item.id === id);
          return [service.title, detailLink("service", id)];
        }),
      ),
      nav("Portfolio", [
        ["Case studies", pageLink("cases.html")],
        ["Clients", pageLink("clients.html")],
        ["Pricing", pageLink("pricing.html")],
        ["Reviews", pageLink("reviews.html")],
        ["About me", pageLink("about.html")],
        ["All services", pageLink("services.html")],
      ]),
      i(FooterSocials, {}),
      nav("Information", [
        [
          catalogTranslation("AI for business", "ИИ для бизнеса"),
          pageLink("ai.html"),
        ],
        [catalogTranslation("Cities", "Города"), pageLink("cities.html")],
        ["Privacy", pageLink("privacy.html")],
        ["Cookies & preferences", pageLink("cookies.html")],
        ["Service information", pageLink("terms.html")],
        ["All pages", pageLink("site-map.html")],
      ]),
    ],
  });
}
const FOOTER_THOUGHTS = [
  utilityText(
    "Хороший сайт заканчивается футером. Хорошая работа — результатом.",
    "A good website ends with a footer. Good work ends with a result.",
  ),
  utilityText(
    "Сначала понятная задача. Потом красивые кнопки.",
    "First, a clear task. Then, beautiful buttons.",
  ),
  utilityText(
    "Самый полезный график — тот, после которого понятно, что делать.",
    "The most useful chart is the one that tells you what to do next.",
  ),
  utilityText(
    "Автоматизация удалась, если у вас появилось время на чай.",
    "Automation worked if you now have time for tea.",
  ),
  utilityText(
    "Иногда лучшая оптимизация — убрать лишнее.",
    "Sometimes the best optimisation is removing what you don't need.",
  ),
  utilityText(
    "Вы дошли до конца страницы. А ваш следующий проект только начинается.",
    "You've reached the end of the page. Your next project is just beginning.",
  ),
];
function nextFooterThought(current) {
  return (
    (current + 1 + Math.floor(Math.random() * (FOOTER_THOUGHTS.length - 1))) %
    FOOTER_THOUGHTS.length
  );
}
function FooterSurprise() {
  const [index, setIndex] = le.useState(() =>
    Math.floor(Math.random() * FOOTER_THOUGHTS.length),
  );
  return i("section", {
    className: "page-container footer-surprise",
    children: [
      i("div", {
        className: "footer-finish",
        children: [
          i("span", {
            className: "finish-star",
            "aria-hidden": true,
            children: "✦",
          }),
          i("div", {
            children: [
              i("h2", { children: "Oh, you made it to the end." }),
              i("p", {
                children:
                  "Thanks for your time. Here's a thought to take with you.",
              }),
            ],
          }),
        ],
      }),
      i("div", {
        className: "footer-thought",
        children: [
          i("blockquote", {
            role: "status",
            "aria-live": "polite",
            children: utilityCopy(FOOTER_THOUGHTS[index]),
          }),
          i("span", { children: "Small thoughts about work" }),
        ],
      }),
      i("button", {
        type: "button",
        className: "thought-button",
        onClick: () => setIndex(nextFooterThought),
        children: [
          i("span", { "aria-hidden": true, children: "⤨" }),
          "One more thought",
        ],
      }),
    ],
  });
}
function BackToTop() {
  const [visible, setVisible] = le.useState(false);
  le.useEffect(() => {
    const update = () => setVisible(window.scrollY > 600);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  return visible
    ? i("button", {
        type: "button",
        className: "back-to-top",
        "aria-label": translateText("Back to top"),
        title: translateText("Back to top"),
        onClick: () => {
          document
            .querySelector(".site-header .brand")
            ?.focus({ preventScroll: true });
          window.scrollTo({
            top: 0,
            behavior: window.matchMedia("(prefers-reduced-motion: reduce)")
              .matches
              ? "instant"
              : "smooth",
          });
        },
        children: [
          i("span", { "aria-hidden": true, children: "↑" }),
          i("span", { children: "Top" }),
        ],
      })
    : null;
}
Object.assign(window.RU, {
  "← Home": "← Главная",
  "All pages": "Все страницы",
  "All pages ↗": "Все страницы ↗",
  Privacy: "Конфиденциальность",
  "Cookies & preferences": "Cookies и настройки",
  "Service information": "Информация об услугах",
  Information: "Информация",
  Portfolio: "Портфолио",
  Expertise: "Направления",
  "Advertising, websites and analytics that work together.":
    "Реклама, сайты и аналитика, которые работают вместе.",
  "Kazakhstan · working worldwide": "Казахстан · проекты по всему миру",
  "Oh, you made it to the end.": "О, вы дошли до конца.",
  "Thanks for your time. Here's a thought to take with you.":
    "Спасибо за ваше время. Вот небольшая мысль напоследок.",
  "Small thoughts about work": "Маленькие мысли о работе",
  "One more thought": "Ещё мысль",
  "Back to top": "Наверх",
  Top: "Наверх",
  "A shortcut to every corner of the portfolio.":
    "Короткий путь в любой раздел портфолио.",
  "Find a page": "Найти страницу",
  "Service, client or article": "Услуга, клиент или статья",
  "Links found": "Найдено ссылок",
  "Client cards": "Карточки клиентов",
  "Blog previews": "Страницы блога",
  "404 page": "Страница 404",
  "No pages found.": "Страниц не найдено.",
  "Clear search": "Очистить поиск",
  "Blog pages are available here and by direct link; they are not in the main menu.":
    "Блог доступен отсюда и по прямым ссылкам; в основном меню его нет.",
  "Page not found": "Страница не найдена",
  "A small detour": "Небольшой поворот не туда",
  "This link reached a dead end. Let's find the right page.":
    "Эта ссылка привела в тупик. Давайте найдём нужную страницу.",
  "Ask a question ↗": "Задать вопрос ↗",
  "Privacy policies of external services": "Политики внешних сервисов",
  "Saved preferences": "Сохранённые настройки",
  "Site language: RU / EN": "Язык сайта: RU / EN",
  "Currency: USD / RUB / KZT": "Валюта: USD / RUB / KZT",
  "Reset site preferences": "Сбросить настройки сайта",
  "Preferences reset. Russian and the default currency are now selected.":
    "Настройки сброшены. Выбраны русский язык и валюта по умолчанию.",
  "Storage is unavailable. You can clear site data in your browser settings.":
    "Хранилище недоступно. Можно очистить данные сайта в настройках браузера.",
  "The message includes the page address. ":
    "В сообщение включён адрес страницы. ",
  "How your data is used ↗": "Как используются данные ↗",
});
