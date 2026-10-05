/* Connections and case visualizations. Charts use supplied endpoints, never invented history. */
function casesForClient(clientId) {
  return publishedCases().filter((record) => record.clientId === clientId);
}
function caseClient(record) {
  return window.CLIENTS.find((client) => client.id === record.clientId);
}
function caseServices(record) {
  return (record.serviceIds || [])
    .map((id) => tu.find((service) => service.id === id))
    .filter(Boolean);
}
function caseCategoryLabel(record) {
  return translateText(
    window.SERVICE_CATEGORIES.find(([id]) => id === record.category)?.[1] ||
      "Case studies",
  );
}
function metricRange(value) {
  if (typeof value !== "string") return null;
  const cleaned = value
    .trim()
    .replace(/[\s\u00a0]/g, "")
    .replace(/,/g, ".");
  const match = cleaned.match(
    /^([$€£₽₸]?)(\d+(?:\.\d+)?)(?:[-–—](\d+(?:\.\d+)?))?(%|x|×|USD|RUB|KZT|₽|₸)?$/i,
  );
  if (!match) return null;
  const min = Number(match[2]),
    max = Number(match[3] || match[2]);
  if (!Number.isFinite(min) || !Number.isFinite(max) || min > max) return null;
  return {
    min,
    max,
    unit: (match[1] + (match[4] || "")).toUpperCase().replace("×", "X"),
  };
}
function caseWorkItems(items) {
  return items.flatMap((text) =>
    translateText(text)
      .split(/,\s+(?!\d)|;\s*/)
      .map((item) => item.trim())
      .filter(Boolean),
  );
}
function caseTimelineParts(text) {
  const value = translateText(text);
  const separator = value.lastIndexOf(" — ");
  return separator < 0
    ? { title: value, duration: "" }
    : {
        title: value.slice(0, separator),
        duration: value.slice(separator + 3),
      };
}
function MetricComparison({ metric }) {
  const before = metricRange(metric.before),
    after = metricRange(metric.after);
  if (!before || !after || before.unit !== after.unit) return null;
  const max = Math.max(before.max, after.max, 1);
  const hasRange = before.min !== before.max || after.min !== after.max;
  return i("figure", {
    className: "metric-comparison",
    children: [
      i("figcaption", { children: metric.metric }),
      ...[
        ["Before", metric.before, before, "before"],
        ["After", metric.after, after, "after"],
      ].map(([label, text, range, kind]) =>
        i(
          "div",
          {
            className: "comparison-row comparison-" + kind,
            children: [
              i("div", {
                className: "comparison-label",
                children: [
                  i("span", { children: label }),
                  i("strong", { children: text }),
                ],
              }),
              i("div", {
                className: "comparison-track",
                "aria-hidden": true,
                children: [
                  i("span", {
                    className: "comparison-fill",
                    style: { width: (range.max / max) * 100 + "%" },
                  }),
                  range.min !== range.max
                    ? i("span", {
                        className: "comparison-range",
                        style: {
                          left: (range.min / max) * 100 + "%",
                          width: ((range.max - range.min) / max) * 100 + "%",
                        },
                      })
                    : null,
                ],
              }),
            ],
          },
          kind,
        ),
      ),
      i("div", {
        className: "comparison-scale",
        "aria-hidden": true,
        children: [
          i("span", { children: "0" }),
          i("span", {
            children:
              new Intl.NumberFormat(
                currentLanguage === "ru" ? "ru-RU" : "en-US",
              ).format(max) + before.unit,
          }),
        ],
      }),
      i("p", {
        className: "comparison-note",
        children: hasRange
          ? "Darker segments show the supplied ranges. Both bars share a zero-based scale."
          : "Both bars use the same scale, starting at zero.",
      }),
    ],
  });
}
function CaseResults({ record }) {
  if (!record.metrics.length) return null;
  return i("section", {
    className: "case-results",
    id: "case-results",
    "aria-labelledby": "case-results-title",
    children: [
      i("div", {
        className: "case-section-title",
        children: [
          i("div", {
            children: [
              i("span", {
                className: "section-eyebrow",
                children: "THE OUTCOME",
              }),
              i("h2", { id: "case-results-title", children: "Before & after" }),
            ],
          }),
          i("p", {
            children: "Compare the starting point with the reported outcome.",
          }),
        ],
      }),
      i("div", {
        className: "comparison-grid",
        children: record.metrics.map((metric, index) =>
          i(MetricComparison, { metric }, index),
        ),
      }),
      i("div", {
        className: "case-table-wrap",
        tabIndex: 0,
        role: "region",
        "aria-label": translateText("Project indicators"),
        children: i("table", {
          className: "case-results-table",
          children: [
            i("caption", { children: "Project indicators" }),
            i("thead", {
              children: i("tr", {
                children: ["Metric", "Before", "After", "Reported change"].map(
                  (label) => i("th", { scope: "col", children: label }, label),
                ),
              }),
            }),
            i("tbody", {
              children: record.metrics.map((metric, index) =>
                i(
                  "tr",
                  {
                    children: [
                      i("th", { scope: "row", children: metric.metric }),
                      i("td", { children: metric.before || "—" }),
                      i("td", { children: metric.after || "—" }),
                      i("td", { children: metric.delta || "—" }),
                    ],
                  },
                  index,
                ),
              ),
            }),
          ],
        }),
      }),
    ],
  });
}
function CaseProject({ record }) {
  const client = caseClient(record),
    services = caseServices(record);
  const facts = translateText(record.tag)
    .split("·")
    .map((text) => text.trim());
  return i("aside", {
    className: "case-project",
    "aria-label": translateText("Project at a glance"),
    children: [
      i("span", {
        className: "section-eyebrow",
        children: "PROJECT AT A GLANCE",
      }),
      client
        ? i("a", {
            className: "case-client-link",
            href: pageLink("clients.html") + "#client-" + client.id,
            children: [
              i("span", {
                className: "case-client-monogram",
                "aria-hidden": true,
                style: { background: client.color },
                children: client.name.slice(0, 2).toUpperCase(),
              }),
              i("span", {
                children: [
                  i("small", { children: "Client" }),
                  i("strong", { children: client.name + " ↗" }),
                ],
              }),
            ],
          })
        : null,
      i("dl", {
        className: "case-facts",
        children: [
          ["Industry", facts[0]],
          ["Location", facts[1]],
          ["Period", facts.slice(2).join(" · ")],
        ]
          .filter(([, value]) => value)
          .map(([label, value]) =>
            i(
              "div",
              {
                children: [
                  i("dt", { children: label }),
                  i("dd", { children: value }),
                ],
              },
              label,
            ),
          ),
      }),
      services.length
        ? i("div", {
            className: "case-service-links",
            children: [
              i("small", { children: "Services in this project" }),
              ...services.map((service) =>
                i(
                  "a",
                  {
                    href: detailLink("service", service.id),
                    children: [
                      service.emoji,
                      " ",
                      translateText(service.title),
                      " ↗",
                    ],
                  },
                  service.id,
                ),
              ),
            ],
          })
        : null,
      client && validClientUrl(client.url)
        ? i("a", {
            className: "case-website",
            href: validClientUrl(client.url),
            target: "_blank",
            "data-outbound": "case-" + record.id,
            children: "Visit client website ↗",
          })
        : null,
    ],
  });
}
function CaseStudyPage({ record }) {
  const related = publishedCases().filter((item) => item.id !== record.id);
  const sameClient = record.clientId
    ? related.filter((item) => item.clientId === record.clientId)
    : [];
  const recommendations = sameClient.length
    ? sameClient
    : related.filter((item) => item.category === record.category).slice(0, 3);
  const work = [
    ["01", "Starting point", caseWorkItems(record.wrong), "case-problems"],
    ["02", "What was changed", caseWorkItems(record.did), "case-solutions"],
  ];
  return i("article", {
    className: "case-detail case-study",
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
            i("div", {
              className: "case-hero-grid",
              children: [
                i("div", {
                  className: "case-hero-copy",
                  children: [
                    i("div", {
                      className: "section-eyebrow",
                      children: caseCategoryLabel(record),
                    }),
                    i("h1", { children: record.title }),
                    i("p", {
                      className: "detail-lead",
                      children: record.headline,
                    }),
                    record.demo
                      ? i("p", {
                          className: "demo-notice",
                          children:
                            "These numbers illustrate a scenario. They are not verified results for a named client.",
                        })
                      : null,
                    i("div", {
                      className: "case-jump-links",
                      children: [
                        record.metrics.length
                          ? i("button", {
                              type: "button",
                              onClick: () => {
                                document
                                  .getElementById("case-results")
                                  ?.scrollIntoView({
                                    behavior: window.matchMedia(
                                      "(prefers-reduced-motion: reduce)",
                                    ).matches
                                      ? "instant"
                                      : "smooth",
                                  });
                              },
                              children: "View the results ↓",
                            })
                          : null,
                        i(Action, {
                          href: inquiryLink(record.serviceIds?.[0]),
                          children: "Discuss a similar project",
                        }),
                      ],
                    }),
                  ],
                }),
                i(CaseProject, { record }),
              ],
            }),
          ],
        }),
      }),
      i("div", {
        className: "page-container case-detail-body",
        children: [
          i(CaseResults, { record }),
          i("div", {
            className: "case-work-grid",
            children: work
              .filter(([, , items]) => items.length)
              .map(([number, title, items, style]) =>
                i(
                  "section",
                  {
                    className: "detail-panel " + style,
                    children: [
                      i("span", {
                        className: "case-panel-number",
                        "aria-hidden": true,
                        children: number,
                      }),
                      i("h2", { children: title }),
                      i("ul", {
                        className: "case-task-list",
                        children: items.map((text, index) =>
                          i(
                            "li",
                            {
                              children: [
                                i("span", {
                                  "aria-hidden": true,
                                  children:
                                    style === "case-solutions" ? "✓" : "—",
                                }),
                                text,
                              ],
                            },
                            index,
                          ),
                        ),
                      }),
                    ],
                  },
                  number,
                ),
              ),
          }),
          record.timeline.length
            ? i("section", {
                className: "detail-panel case-stages",
                children: [
                  i("span", {
                    className: "section-eyebrow",
                    children: "FROM AUDIT TO LAUNCH",
                  }),
                  i("h2", { children: "Project roadmap" }),
                  i("ol", {
                    className: "case-timeline",
                    children: record.timeline.map((text, index) => {
                      const parts = caseTimelineParts(text);
                      return i(
                        "li",
                        {
                          children: [
                            i("span", {
                              className: "step-number",
                              children: String(index + 1).padStart(2, "0"),
                            }),
                            parts.duration
                              ? i("span", {
                                  className: "stage-duration",
                                  children: parts.duration,
                                })
                              : null,
                            i("p", { children: parts.title }),
                          ],
                        },
                        index,
                      );
                    }),
                  }),
                ],
              })
            : null,
          i("section", {
            className: "case-next-step",
            children: [
              i("div", {
                children: [
                  i("h2", { children: "A similar challenge?" }),
                  i("p", {
                    children:
                      "Tell me about your project. We’ll define the scope and the metrics that matter.",
                  }),
                ],
              }),
              i(Action, {
                href: inquiryLink(record.serviceIds?.[0]),
                children: "Discuss the task",
              }),
            ],
          }),
          recommendations.length
            ? i("section", {
                className: "case-related",
                children: [
                  i("div", {
                    className: "section-heading related-heading",
                    children: [
                      i("h2", {
                        children: sameClient.length
                          ? "More work for this client"
                          : "Related projects",
                      }),
                      i(Action, {
                        href: pageLink("cases.html"),
                        secondary: true,
                        children: "All case studies",
                      }),
                    ],
                  }),
                  i("div", {
                    className: "case-grid",
                    children: recommendations.map((item) =>
                      i(CaseCard, { record: item }, item.id),
                    ),
                  }),
                ],
              })
            : null,
        ],
      }),
    ],
  });
}
Object.assign(window.RU, {
  "Cases & services": "Кейсы и услуги",
  "Client website": "Сайт клиента",
  "Website ↗": "Сайт ↗",
  "Explore the work": "Смотреть кейсы по услугам",
  "THE OUTCOME": "РЕЗУЛЬТАТ ПРОЕКТА",
  "Before & after": "До и после",
  After: "После",
  Metric: "Показатель",
  "Reported change": "Изменение в кейсе",
  "Project indicators": "Показатели проекта",
  "Compare the starting point with the reported outcome.":
    "Сравнение исходных показателей и результата работы.",
  "Darker segments show the supplied ranges. Both bars share a zero-based scale.":
    "Тёмные участки показывают диапазоны значений. У обеих полос общая шкала от нуля.",
  "Both bars use the same scale, starting at zero.":
    "У обеих полос общая шкала от нуля.",
  "Project at a glance": "О проекте",
  "PROJECT AT A GLANCE": "О ПРОЕКТЕ",
  Client: "Клиент",
  Industry: "Ниша",
  Location: "География",
  Period: "Период",
  "Services in this project": "Услуги в проекте",
  "Visit client website ↗": "На сайт клиента ↗",
  "View the results ↓": "К результатам ↓",
  "Discuss a similar project": "Хочу похожий проект",
  "FROM AUDIT TO LAUNCH": "ПОСЛЕДОВАТЕЛЬНОСТЬ РАБОТ",
  "Project roadmap": "Этапы и сроки",
  "A similar challenge?": "У вас похожая задача?",
  "Tell me about your project. We’ll define the scope and the metrics that matter.":
    "Расскажите о проекте — определим объём работ и показатели, по которым оценим результат.",
  "More work for this client": "Другие работы для этого клиента",
  "Related projects": "Кейсы по этому направлению",
});
