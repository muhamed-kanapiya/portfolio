/* Catalogs, pricing, case layouts and the messenger inquiry form. */
let currentCurrency = window.PORTFOLIO.currency || "USD";
try {
  const saved = localStorage.getItem("portfolio-currency");
  if (["USD", "RUB", "KZT"].includes(saved)) currentCurrency = saved;
} catch {}

function setCurrency(currency) {
  if (!["USD", "RUB", "KZT"].includes(currency)) return;
  currentCurrency = currency;
  try {
    localStorage.setItem("portfolio-currency", currency);
  } catch {}
  window.dispatchEvent(new Event("currencychange"));
}
function money(prices, currency = currentCurrency, language = currentLanguage) {
  const value = prices?.[currency];
  if (typeof value !== "number" || !Number.isFinite(value))
    return language === "ru" ? "По запросу" : "By agreement";
  const number = new Intl.NumberFormat(language === "ru" ? "ru-RU" : "en-US", {
    maximumFractionDigits: 2,
  }).format(value);
  return currency === "USD"
    ? "$" + number
    : number + (currency === "RUB" ? " ₽" : " ₸");
}
function servicePrices(serviceId, packageName) {
  return window.PRICES.services[serviceId]?.[packageName];
}
function priceText(prices) {
  const amount = money(prices);
  return typeof prices?.[currentCurrency] === "number" && prices.suffix
    ? amount + " " + prices.suffix
    : amount;
}
function planPeriod(plan, language = currentLanguage) {
  if (!plan.monthly) return language === "ru" ? "Разово" : "One-time";
  const percent = window.PRICES.plans[plan.id]?.adSpendPercent;
  return (
    (language === "ru" ? "В месяц" : "Per month") +
    (percent
      ? " + " +
        percent +
        "% " +
        (language === "ru" ? "от рекламного бюджета" : "of ad spend")
      : "")
  );
}
function inquiryLink(service = "", plan = "") {
  const params = new URLSearchParams({ lang: currentLanguage });
  if (service) params.set("service", service);
  if (plan) params.set("plan", plan);
  return "index.html?" + params.toString() + "#contact";
}
function detailLink(kind, id) {
  return (
    pageLink(kind === "service" ? "services.html" : "cases.html") +
    "#/" +
    (kind === "service" ? "services" : "cases") +
    "/" +
    encodeURIComponent(id)
  );
}
function catalogSummary() {
  const count = publishedCases().length;
  return currentLanguage === "ru"
    ? `${tu.length} УСЛУГ • ${window.CLIENTS.length} КЛИЕНТОВ${count ? " • " + count + " КЕЙСОВ" : ""}`
    : `${tu.length} SERVICES • ${window.CLIENTS.length} CLIENTS${count ? " • " + count + " CASES" : ""}`;
}
function Action({ href, children, secondary = false, ...props }) {
  return i("a", {
    ...props,
    href,
    className: "action" + (secondary ? " action-secondary" : ""),
    children,
  });
}
function CurrencySelector() {
  return i("div", {
    className: "currency-switch",
    role: "group",
    "aria-label": translateText("Choose your currency"),
    children: ["USD", "RUB", "KZT"].map((code) =>
      i(
        "button",
        {
          type: "button",
          "aria-pressed": currentCurrency === code,
          onClick: () => setCurrency(code),
          children: code,
        },
        code,
      ),
    ),
  });
}

function SiteHeader() {
  const [open, setOpen] = le.useState(false);
  le.useEffect(() => {
    const close = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);
  const route = readRoute().page;
  const links = [
    ["Services", "services.html", ["service", "services-index"]],
    ...(publishedCases().length
      ? [["Case studies", "cases.html", ["case", "cases-index"]]]
      : []),
    ["Clients", "clients.html", ["clients"]],
    ["Process", "index.html#process", []],
    ["Pricing", "index.html#pricing", []],
  ];
  const hrefFor = (file) => {
    const [page, anchor] = file.split("#");
    return pageLink(page) + (anchor ? "#" + anchor : "");
  };
  const nav = () =>
    links.map(([label, file, pages]) =>
      i(
        "a",
        {
          href: hrefFor(file),
          "aria-current": pages.includes(route) ? "page" : undefined,
          onClick: () => setOpen(false),
          children: label,
        },
        file,
      ),
    );
  return i("header", {
    className: "site-header",
    children: [
      i("div", {
        className: "header-inner",
        children: [
          i("a", {
            href: pageLink("index.html"),
            className: "brand",
            "aria-label": "Ads by Kanapiya — " + translateText("Home"),
            children: [
              i("span", { className: "brand-mark", children: "AK" }),
              i("span", { children: "Ads by Kanapiya" }),
            ],
          }),
          i("nav", {
            className: "desktop-nav",
            "aria-label": translateText("Menu"),
            children: nav(),
          }),
          i("div", {
            className: "header-controls",
            children: [
              i(Action, {
                href: inquiryLink(),
                children: translateText("Contact"),
              }),
              i(LanguageSwitch, {}),
              i("button", {
                type: "button",
                className: "menu-toggle",
                "aria-expanded": open,
                "aria-controls": "mobile-navigation",
                "aria-label": translateText(open ? "Close menu" : "Open menu"),
                onClick: () => setOpen(!open),
                children: open ? "×" : "☰",
              }),
            ],
          }),
        ],
      }),
      open
        ? i("nav", {
            id: "mobile-navigation",
            className: "mobile-navigation",
            "aria-label": translateText("Menu"),
            children: nav(),
          })
        : null,
    ],
  });
}
function ServiceCard({ service }) {
  const fee = servicePrices(service.id, service.pricing?.[1]?.pkg);
  return i(
    "a",
    {
      className: "service-tile",
      href: detailLink("service", service.id),
      children: [
        i("div", {
          className: "tile-top",
          children: [
            i("span", {
              className: "service-mark",
              "aria-hidden": true,
              children: service.emoji,
            }),
            i("span", {
              className: "tile-kicker",
              children:
                service.category === "research"
                  ? "AEO / GEO · AI"
                  : translateText(
                      window.SERVICE_CATEGORIES.find(
                        ([id]) => id === service.category,
                      )?.[1] || "Services",
                    ),
            }),
          ],
        }),
        i("h3", { children: service.title }),
        i("p", { children: service.short }),
        i("ul", {
          className: "tile-list",
          children: service.deliverables
            .slice(0, 2)
            .map((item) => i("li", { children: item.title }, item.title)),
        }),
        i("div", {
          className: "tile-bottom",
          children: [
            i("span", { className: "tile-price", children: priceText(fee) }),
            i("span", { className: "tile-link", children: "Service details" }),
          ],
        }),
      ],
    },
    service.id,
  );
}
function ServicesSection() {
  const featured = [
    "google-ads",
    "seo",
    "tracking",
    "web-development",
    "wordpress",
    "tilda",
    "react",
    "python",
    "aeo-geo-ai",
  ].map((id) => tu.find((item) => item.id === id));
  return i("section", {
    id: "services",
    className: "catalog-section services-home",
    children: i("div", {
      className: "page-container",
      children: [
        i("div", {
          className: "section-heading",
          children: [
            i("div", {
              children: [
                i("div", {
                  className: "section-eyebrow",
                  children: "Advertising, analytics and development.",
                }),
                i("h2", {
                  children: "One place for the tools your business needs.",
                }),
              ],
            }),
            i(Action, {
              href: pageLink("services.html"),
              secondary: true,
              children: translateText("View all services") + " · " + tu.length,
            }),
          ],
        }),
        i("div", {
          className: "service-grid",
          children: featured.map((service) =>
            i(ServiceCard, { service }, service.id),
          ),
        }),
      ],
    }),
  });
}
function CaseCard({ record }) {
  const main = record.metrics[0] || {};
  return i(
    "a",
    {
      className: "case-tile",
      href: detailLink("case", record.id),
      children: [
        i("div", {
          className: "case-card-top",
          children: [
            i("span", { className: "case-tag", children: record.tag }),
            main.delta
              ? i("span", { className: "case-result", children: main.delta })
              : null,
          ],
        }),
        record.demo
          ? i("span", {
              className: "demo-label",
              children: "Demonstration case",
            })
          : null,
        i("h3", { children: record.title }),
        i("p", { children: record.headline }),
        i("div", {
          className: "case-metrics",
          children: record.metrics.slice(0, 2).map((metric) =>
            i(
              "div",
              {
                className: "case-metric",
                children: [
                  i("span", { children: metric.metric }),
                  i("strong", { children: metric.after }),
                  i("small", {
                    children:
                      translateText("Before") +
                      ": " +
                      translateText(metric.before),
                  }),
                ],
              },
              metric.metric,
            ),
          ),
        }),
        i("span", { className: "tile-link", children: "Open detailed case" }),
      ],
    },
    record.id,
  );
}
function CasesSection() {
  const records = publishedCases();
  if (!records.length) return null;
  const selected = [
    ...records.filter((item) => item.featured),
    ...records.filter((item) => !item.featured),
  ].slice(0, 6);
  return i("section", {
    id: "cases",
    className: "catalog-section cases-home",
    children: i("div", {
      className: "page-container",
      children: [
        i("div", {
          className: "section-heading",
          children: [
            i("div", {
              children: [
                i("div", {
                  className: "section-eyebrow",
                  children: "Selected cases",
                }),
                i("h2", {
                  children: "Approaches, changes and measurable outcomes.",
                }),
              ],
            }),
            i(Action, {
              href: pageLink("cases.html"),
              secondary: true,
              children:
                translateText("All case studies") +
                " · " +
                publishedCases().length,
            }),
          ],
        }),
        records.some((item) => item.demo)
          ? i("p", {
              className: "section-note",
              children:
                "These numbers illustrate a scenario. They are not verified results for a named client.",
            })
          : null,
        i("div", {
          className: "case-grid",
          children: selected.map((record) =>
            i(CaseCard, { record }, record.id),
          ),
        }),
      ],
    }),
  });
}
function ArchivePage({ kind }) {
  const [filter, setFilter] = le.useState("all");
  const services = kind === "services";
  const records = services ? tu : publishedCases();
  const categories = window.SERVICE_CATEGORIES.filter(
    ([key]) => key === "all" || records.some((item) => item.category === key),
  );
  const filtered = records.filter(
    (item) => filter === "all" || item.category === filter,
  );
  return i("div", {
    className: "archive-page",
    children: [
      i("section", {
        className: "page-container archive-intro",
        children: [
          i("a", {
            className: "back-link",
            href: pageLink("index.html"),
            children: "Back to home",
          }),
          i("div", {
            className: "section-eyebrow",
            children: services ? "Service catalog" : "Case study archive",
          }),
          i("h1", {
            children: [
              translateText(services ? "All services" : "All case studies"),
              i("sup", { children: String(records.length) }),
            ],
          }),
          i("p", {
            children: services
              ? "Choose the right solution for your task."
              : records.some((item) => item.demo)
                ? "These numbers illustrate a scenario. They are not verified results for a named client."
                : "Project goals, completed work and results.",
          }),
          i("div", {
            className: "archive-toolbar",
            children: [
              i("div", {
                className: "category-filters",
                role: "group",
                "aria-label": translateText("All directions"),
                children: categories.map(([key, label]) =>
                  i(
                    "button",
                    {
                      type: "button",
                      "aria-pressed": filter === key,
                      onClick: () => setFilter(key),
                      children:
                        key === "all" ? translateText("All directions") : label,
                    },
                    key,
                  ),
                ),
              }),
              services ? i(CurrencySelector, {}) : null,
            ],
          }),
        ],
      }),
      i("section", {
        className: "page-container archive-content",
        "aria-label": translateText(
          services ? "Service catalog" : "Case study archive",
        ),
        children:
          !services && !records.length
            ? i(CasesEmpty, {})
            : i("div", {
                className: services ? "service-grid" : "case-grid",
                children: filtered.map((item) =>
                  i(
                    services ? ServiceCard : CaseCard,
                    services ? { service: item } : { record: item },
                    item.id,
                  ),
                ),
              }),
      }),
    ],
  });
}
function ServiceDetail({ service }) {
  return i("article", {
    className: "service-detail",
    children: [
      i("section", {
        className: "detail-hero page-container",
        children: [
          i("a", {
            className: "back-link",
            href: pageLink("services.html"),
            children: "Back to services",
          }),
          i("div", {
            className: "section-eyebrow",
            children: translateText("Service details") + " · " + service.emoji,
          }),
          i("h1", { children: service.title }),
          i("p", { className: "detail-lead", children: service.heroLine }),
          i("p", { className: "detail-description", children: service.long }),
          i("div", {
            className: "detail-actions",
            children: [
              i(Action, {
                href: inquiryLink(service.id),
                children: "Discuss the task",
              }),
              i(CurrencySelector, {}),
            ],
          }),
        ],
      }),
      i("div", {
        className: "page-container detail-layout",
        children: [
          i("div", {
            className: "detail-main",
            children: [
              i("section", {
                className: "detail-panel",
                children: [
                  i("h2", { children: "Delivery scope" }),
                  i("div", {
                    className: "deliverables",
                    children: service.deliverables.map((item, index) =>
                      i(
                        "div",
                        {
                          children: [
                            i("span", {
                              className: "step-number",
                              children: String(index + 1).padStart(2, "0"),
                            }),
                            i("div", {
                              children: [
                                i("h3", { children: item.title }),
                                i("p", { children: item.desc }),
                              ],
                            }),
                          ],
                        },
                        item.title,
                      ),
                    ),
                  }),
                ],
              }),
              i("section", {
                className: "detail-panel",
                children: [
                  i("div", {
                    className: "panel-heading",
                    children: [
                      i("h2", { children: "Pricing options" }),
                      i(CurrencySelector, {}),
                    ],
                  }),
                  i("div", {
                    className: "table-scroll",
                    tabIndex: 0,
                    "aria-label": translateText("Pricing options"),
                    children: i("table", {
                      className: "price-table",
                      children: [
                        i("thead", {
                          children: i("tr", {
                            children: [
                              "Package",
                              "Timeline",
                              "Price",
                              "Best For",
                            ].map((text) =>
                              i("th", { scope: "col", children: text }, text),
                            ),
                          }),
                        }),
                        i("tbody", {
                          children: service.pricing.map((item) =>
                            i(
                              "tr",
                              {
                                children: [
                                  i("th", { scope: "row", children: item.pkg }),
                                  i("td", { children: item.timeline }),
                                  i("td", {
                                    className: "fee-cell",
                                    children: priceText(
                                      servicePrices(service.id, item.pkg),
                                    ),
                                  }),
                                  i("td", { children: item.bestFor }),
                                ],
                              },
                              item.pkg,
                            ),
                          ),
                        }),
                      ],
                    }),
                  }),
                  i("p", {
                    className: "small-note",
                    children:
                      "Advertising spend is separate. The final scope and price are agreed before work starts.",
                  }),
                ],
              }),
              service.kpis && window.PORTFOLIO.showDemoCases
                ? i("section", {
                    className: "detail-panel",
                    children: [
                      i("h2", { children: "Illustrative metrics" }),
                      i("p", {
                        className: "small-note",
                        children:
                          "These numbers illustrate a scenario. They are not verified results for a named client.",
                      }),
                      i("div", {
                        className: "detail-metrics",
                        children: service.kpis.map((metric) =>
                          i(
                            "div",
                            {
                              children: [
                                i("span", { children: metric.metric }),
                                i("strong", { children: metric.after }),
                                i("small", {
                                  children:
                                    translateText("Before") +
                                    ": " +
                                    translateText(metric.before),
                                }),
                              ],
                            },
                            metric.metric,
                          ),
                        ),
                      }),
                    ],
                  })
                : null,
              i("section", {
                className: "detail-panel",
                children: [
                  i("h2", { children: "Work plan" }),
                  i("div", {
                    className: "work-steps",
                    children: service.process.map((step, index) =>
                      i(
                        "div",
                        {
                          children: [
                            i("span", {
                              className: "step-number",
                              children: String(index + 1).padStart(2, "0"),
                            }),
                            i("h3", { children: step.t }),
                            i("p", { children: step.d }),
                          ],
                        },
                        step.t,
                      ),
                    ),
                  }),
                ],
              }),
              i("section", {
                className: "detail-panel",
                children: [
                  i("h2", { children: "Questions and answers" }),
                  i("div", {
                    className: "faq-list",
                    children: service.faq.map((item) =>
                      i(
                        "details",
                        {
                          children: [
                            i("summary", { children: item.q }),
                            i("p", { children: item.a }),
                          ],
                        },
                        item.q,
                      ),
                    ),
                  }),
                ],
              }),
            ],
          }),
          i("aside", {
            className: "detail-sidebar",
            children: [
              i("h2", { children: "Explore services" }),
              ...tu
                .filter((item) => item.category === service.category)
                .map((item) =>
                  i(
                    "a",
                    {
                      href: detailLink("service", item.id),
                      "aria-current":
                        service.id === item.id ? "page" : undefined,
                      children: item.title,
                    },
                    item.id,
                  ),
                ),
              i(Action, {
                href: pageLink("services.html"),
                secondary: true,
                children: "View all services",
              }),
            ],
          }),
        ],
      }),
    ],
  });
}
function CaseDetail({ record }) {
  if (!record) return i(CasesEmpty, { standalone: true });
  return i("article", {
    className: "case-detail",
    children: [
      i("section", {
        className: "case-detail-hero",
        children: i("div", {
          className: "page-container",
          children: [
            i("a", {
              className: "back-link",
              href: pageLink("cases.html"),
              children: "Back to cases",
            }),
            i("div", { className: "section-eyebrow", children: record.tag }),
            i("h1", { children: record.title }),
            i("p", { className: "detail-lead", children: record.headline }),
            record.demo
              ? i("div", {
                  className: "demo-notice",
                  children: [
                    i("strong", { children: "Demonstration case" }),
                    i("p", {
                      children:
                        "These numbers illustrate a scenario. They are not verified results for a named client.",
                    }),
                  ],
                })
              : null,
            i(Action, { href: inquiryLink(), children: "Discuss the task" }),
          ],
        }),
      }),
      i("div", {
        className: "page-container case-detail-body",
        children: [
          i("section", {
            className: "detail-metrics case-detail-metrics",
            "aria-label": translateText(
              record.demo ? "Illustrative metrics" : "Results",
            ),
            children: record.metrics.map((metric) =>
              i(
                "div",
                {
                  children: [
                    i("span", { children: metric.metric }),
                    i("strong", { children: metric.after }),
                    i("small", {
                      children:
                        translateText("Before") +
                        ": " +
                        translateText(metric.before),
                    }),
                    i("b", { children: metric.delta }),
                  ],
                },
                metric.metric,
              ),
            ),
          }),
          i("div", {
            className: "case-work-grid",
            children: [
              i("section", {
                className: "detail-panel",
                children: [
                  i("h2", { children: "Starting point" }),
                  i("ul", {
                    className: "body-list",
                    children: record.wrong.map((text) =>
                      i("li", { children: text }, text),
                    ),
                  }),
                ],
              }),
              i("section", {
                className: "detail-panel",
                children: [
                  i("h2", { children: "What was changed" }),
                  i("ol", {
                    className: "body-list numbered",
                    children: record.did.map((text) =>
                      i("li", { children: text }, text),
                    ),
                  }),
                ],
              }),
            ],
          }),
          i("section", {
            className: "detail-panel",
            children: [
              i("h2", { children: "Timeline" }),
              i("ol", {
                className: "case-timeline",
                children: record.timeline.map((text, index) =>
                  i(
                    "li",
                    {
                      children: [
                        i("span", {
                          className: "step-number",
                          children: String(index + 1).padStart(2, "0"),
                        }),
                        i("p", { children: text }),
                      ],
                    },
                    text,
                  ),
                ),
              }),
            ],
          }),
          i("div", {
            className: "section-heading related-heading",
            children: [
              i("h2", { children: "Browse other cases" }),
              i(Action, {
                href: pageLink("cases.html"),
                secondary: true,
                children: "All case studies",
              }),
            ],
          }),
          i("div", {
            className: "case-grid",
            children: publishedCases()
              .filter((item) => item.id !== record.id)
              .slice(0, 3)
              .map((item) => i(CaseCard, { record: item }, item.id)),
          }),
        ],
      }),
    ],
  });
}

const PLAN_DEFINITIONS = [
  {
    id: "audit",
    name: "Audit",
    service: "audit",
    intro: "Find the main growth opportunities",
    features: [
      "Account and tracking review",
      "Prioritized action plan",
      "Video walkthrough",
    ],
    cta: "Choose audit",
  },
  {
    id: "launch",
    name: "Launch",
    service: "google-ads",
    intro: "Build a measurable advertising setup",
    features: [
      "Conversion tracking",
      "Campaign structure and launch",
      "Seven days of launch support",
    ],
    cta: "Choose launch",
    popular: true,
  },
  {
    id: "management",
    name: "Management",
    service: "google-ads",
    intro: "Improve campaigns on an ongoing basis",
    features: [
      "Regular optimization",
      "Budget and query review",
      "Weekly progress update",
    ],
    cta: "Choose management",
    monthly: true,
  },
];
function PricingSection() {
  return i("section", {
    id: "pricing",
    className: "catalog-section pricing-section",
    children: i("div", {
      className: "page-container",
      children: [
        i("div", {
          className: "section-heading",
          children: [
            i("div", {
              children: [
                i("div", { className: "section-eyebrow", children: "Pricing" }),
                i("h2", { children: "A clear scope. A clear price." }),
              ],
            }),
            i(CurrencySelector, {}),
          ],
        }),
        i("div", {
          className: "pricing-grid",
          children: PLAN_DEFINITIONS.map((plan) =>
            i(
              "article",
              {
                className: "pricing-card" + (plan.popular ? " popular" : ""),
                children: [
                  i("div", {
                    className: "plan-top",
                    children: [
                      i("h3", { children: plan.name }),
                      plan.popular
                        ? i("span", {
                            className: "popular-label",
                            children: "Most popular",
                          })
                        : null,
                    ],
                  }),
                  i("p", { className: "plan-intro", children: plan.intro }),
                  i("div", {
                    className: "plan-price",
                    children: money(window.PRICES.plans[plan.id]),
                  }),
                  i("p", {
                    className: "plan-period",
                    children: planPeriod(plan),
                  }),
                  i("ul", {
                    className: "plan-features",
                    children: plan.features.map((text) =>
                      i("li", { children: text }, text),
                    ),
                  }),
                  i(Action, {
                    href: inquiryLink(plan.service, plan.id),
                    secondary: !plan.popular,
                    children: plan.cta,
                  }),
                ],
              },
              plan.id,
            ),
          ),
        }),
        i("div", {
          className: "custom-price",
          children: [
            i("div", {
              children: [
                i("h3", { children: "Web development and custom tasks" }),
                i("p", {
                  children:
                    "An estimate based on your brief, platform and integrations.",
                }),
              ],
            }),
            i(Action, {
              href: inquiryLink("web-development"),
              secondary: true,
              children: "Request an estimate",
            }),
          ],
        }),
        i("p", {
          className: "small-note",
          children:
            "Advertising spend is separate. The final scope and price are agreed before work starts.",
        }),
        i("p", {
          className: "small-note currency-note",
          children: "Prices are set separately for each currency.",
        }),
      ],
    }),
  });
}

function composeInquiry(
  values,
  language = currentLanguage,
  currency = currentCurrency,
) {
  const ru = language === "ru";
  const translate = (value) => (ru ? window.RU[value?.trim()] || value : value);
  const service = tu.find((item) => item.id === values.service);
  const plan = PLAN_DEFINITIONS.find((item) => item.id === values.plan);
  const lines = [
    ru ? "Новая заявка — Ads by Kanapiya" : "New inquiry — Ads by Kanapiya",
    `${ru ? "Имя" : "Name"}: ${values.name.trim()}`,
    `${ru ? "Контакт" : "Contact"}: ${values.contact.trim()}`,
    `${ru ? "Услуга" : "Service"}: ${service ? translate(service.title) : ru ? "Пока не определился" : "Not sure yet"}`,
  ];
  if (values.website.trim())
    lines.push(`${ru ? "Сайт" : "Website"}: ${values.website.trim()}`);
  if (plan)
    lines.push(
      `${ru ? "Тариф" : "Plan"}: ${translate(plan.name)} · ${money(window.PRICES.plans[plan.id], currency, language)} · ${planPeriod(plan, language)}`,
    );
  lines.push(
    `${ru ? "Валюта" : "Currency"}: ${currency}`,
    "",
    ru ? "Задача:" : "Message:",
    values.message.trim(),
  );
  return lines.join("\n");
}
function messengerLink(channel, message) {
  if (channel === "whatsapp")
    return (
      "https://wa.me/" +
      window.PORTFOLIO.whatsapp.replace(/\D/g, "") +
      "?text=" +
      encodeURIComponent(message)
    );
  if (channel === "telegram")
    return (
      "https://t.me/" +
      window.PORTFOLIO.telegram.replace(/^@/, "") +
      "?text=" +
      encodeURIComponent(message)
    );
  throw new Error("Unknown messenger");
}
function InquiryForm() {
  const params = new URLSearchParams(location.search);
  const [values, setValues] = le.useState({
    service: tu.some((item) => item.id === params.get("service"))
      ? params.get("service")
      : "",
    plan: params.get("plan") || "",
    name: "",
    contact: "",
    website: "",
    message: "",
  });
  const [status, setStatus] = le.useState("");
  const formRef = le.useRef(null);
  const valid =
    values.name.trim().length >= 2 &&
    values.contact.trim().length >= 4 &&
    values.message.trim().length >= 10;
  const draft = composeInquiry(values);
  const update = (event) => {
    const { name, value } = event.target;
    setValues((previous) => ({
      ...previous,
      [name]: value,
      ...(name === "service" ? { plan: "" } : {}),
    }));
    setStatus("");
  };
  function submit(event) {
    event.preventDefault();
    if (!formRef.current.reportValidity() || !valid) {
      setStatus("Check the highlighted fields.");
      return;
    }
    const channel = event.nativeEvent.submitter?.value;
    if (!["whatsapp", "telegram"].includes(channel)) return;
    window.open(messengerLink(channel, draft), "_blank", "noopener,noreferrer");
    setStatus("The draft is ready. Confirm sending in the messenger.");
  }
  async function copy() {
    if (!formRef.current.reportValidity() || !valid) {
      setStatus("Check the highlighted fields.");
      return;
    }
    try {
      await navigator.clipboard.writeText(draft);
      setStatus("Message copied");
    } catch {
      setStatus("Select and copy the text below.");
    }
  }
  const field = (label, name, props = {}) =>
    i(
      "label",
      {
        className: "form-field",
        children: [
          i("span", { children: label }),
          i("input", { name, value: values[name], onChange: update, ...props }),
        ],
      },
      name,
    );
  return i("form", {
    className: "inquiry-form",
    ref: formRef,
    onSubmit: submit,
    children: [
      i("div", {
        className: "form-fields",
        children: [
          i("label", {
            className: "form-field form-wide",
            children: [
              i("span", { children: "Select a service" }),
              i("select", {
                name: "service",
                "aria-label": translateText("Select a service"),
                value: values.service,
                onChange: update,
                children: [
                  i("option", { value: "", children: "Not sure yet" }),
                  ...tu.map((item) =>
                    i(
                      "option",
                      { value: item.id, children: item.title },
                      item.id,
                    ),
                  ),
                ],
              }),
            ],
          }),
          field("Your name", "name", {
            required: true,
            minLength: 2,
            maxLength: 80,
            autoComplete: "name",
          }),
          field("Your contact", "contact", {
            required: true,
            minLength: 4,
            maxLength: 160,
            autoComplete: "email",
            placeholder: translateText("Email, phone or Telegram"),
          }),
          field("Project website (optional)", "website", {
            type: "url",
            maxLength: 250,
            placeholder: "https://example.com",
            className: "website-input",
          }),
          i("label", {
            className: "form-field form-wide",
            children: [
              i("span", { children: "Tell me about the task" }),
              i("textarea", {
                name: "message",
                "aria-label": translateText("Tell me about the task"),
                value: values.message,
                onChange: update,
                required: true,
                minLength: 10,
                maxLength: 1500,
                rows: 4,
                placeholder: translateText("What would you like to improve?"),
              }),
            ],
          }),
        ],
      }),
      i("div", {
        className: "message-preview",
        children: [
          i("div", {
            className: "preview-heading",
            children: [
              i("span", { children: "Your message" }),
              i("span", { children: currentCurrency }),
            ],
          }),
          i("pre", {
            "aria-live": "polite",
            children: valid
              ? draft
              : translateText("Complete the form to prepare your message."),
          }),
        ],
      }),
      i("div", {
        className: "form-actions",
        children: [
          i("button", {
            type: "submit",
            name: "channel",
            value: "whatsapp",
            className: "action whatsapp-action",
            children: "Send via WhatsApp",
          }),
          i("button", {
            type: "submit",
            name: "channel",
            value: "telegram",
            className: "action telegram-action",
            children: "Send via Telegram",
          }),
          i("button", {
            type: "button",
            onClick: copy,
            className: "copy-action",
            children: "Copy message",
          }),
        ],
      }),
      i("p", {
        className: "form-help",
        children:
          "The messenger opens a draft. Review it and press Send there.",
      }),
      i("p", { className: "form-status", role: "status", children: status }),
    ],
  });
}
function SiteFooter() {
  return i("footer", {
    className: "site-footer",
    children: [
      i("section", {
        id: "contact",
        className: "page-container contact-layout",
        children: [
          i("div", {
            className: "contact-intro",
            children: [
              i("div", { className: "section-eyebrow", children: "Contact" }),
              i("h2", { children: "Let’s discuss your project." }),
              i("p", {
                children:
                  "Choose a service, leave a contact and describe the task.",
              }),
              i("div", {
                className: "direct-contacts",
                children: [
                  i("a", {
                    href: "https://wa.me/" + window.PORTFOLIO.whatsapp,
                    target: "_blank",
                    rel: "noopener noreferrer",
                    children: [
                      "WhatsApp",
                      i("strong", { children: "+7 707 340 68 88" }),
                    ],
                  }),
                  i("a", {
                    href: "https://t.me/" + window.PORTFOLIO.telegram,
                    target: "_blank",
                    rel: "noopener noreferrer",
                    children: [
                      "Telegram",
                      i("strong", {
                        children: "@" + window.PORTFOLIO.telegram,
                      }),
                    ],
                  }),
                ],
              }),
              i("p", {
                className: "contact-location",
                children:
                  currentLanguage === "ru"
                    ? "Казахстан · GMT+5 · Работаю онлайн"
                    : "Kazakhstan · GMT+5 · Working remotely",
              }),
            ],
          }),
          i(InquiryForm, {}),
        ],
      }),
      i("div", {
        className: "page-container footer-bottom",
        children: [
          i("span", {
            children: "© " + new Date().getFullYear() + " Ads by Kanapiya",
          }),
          i("nav", {
            "aria-label": translateText("Menu"),
            children: [
              i("a", { href: pageLink("services.html"), children: "Services" }),
              publishedCases().length
                ? i("a", {
                    href: pageLink("cases.html"),
                    children: "Case studies",
                  })
                : null,
              i("a", { href: pageLink("clients.html"), children: "Clients" }),
            ],
          }),
          i("span", { children: "Google Ads · SEO · Web · Analytics" }),
        ],
      }),
    ],
  });
}
