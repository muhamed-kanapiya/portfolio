function simulatorLink(topic, level = "junior", courseId = "") {
  return (
    pageLink(topic + "-simulator.html") +
    "&level=" +
    level +
    (courseId ? "&course=" + encodeURIComponent(courseId) : "")
  );
}
function simNumber(value, digits = 0) {
  return new Intl.NumberFormat(currentLanguage === "ru" ? "ru-RU" : "en-US", {
    maximumFractionDigits: digits,
  }).format(value);
}
function CourseFee({ prices }) {
  return i("span", {
    children: [
      money(prices),
      currentCurrency !== "KZT" && !Number.isFinite(prices?.[currentCurrency])
        ? i("small", {
            className: "course-fee-base",
            children:
              learnSay("Базовая цена: ", "Base fee: ") + money(prices, "KZT"),
          })
        : null,
    ],
  });
}
function courseInquiryLink(course, format = "group") {
  const url = new URL(inquiryLink("training"), location.href);
  url.searchParams.set("course", course.id);
  url.searchParams.set("format", format);
  return "index.html" + url.search + url.hash;
}
const SIM_LABELS = {
  broadQuality: learnPair(
    "Качественные лиды широкого спроса",
    "Qualified broad-demand leads",
  ),
  spend: learnPair("Расход на рекламу, ₸", "Ad spend, KZT"),
  leads: learnPair("Заявки", "Leads"),
  quality: learnPair("Квалифицированные лиды", "Qualified leads"),
  qualified: learnPair("Цель: квалифицированный лид", "Goal: qualified lead"),
  cpql: learnPair("CPQL, ₸", "CPQL, KZT"),
  roas: learnPair("ROAS, %", "ROAS, %"),
  profit: learnPair("Вклад после рекламы, ₸", "Contribution after ads, KZT"),
  hours: learnPair("Затраты команды, ч", "Team effort, hours"),
  indexable: learnPair("Доступные для индексации страницы", "Indexable pages"),
  clicks: learnPair("Клики за неделю", "Weekly clicks"),
  ctr: learnPair("CTR, %", "CTR, %"),
  impressions: learnPair("Показы за неделю", "Weekly impressions"),
  migration: learnPair("Миграция проверена", "Migration validated"),
};
function SimulatorChart({ topic, result }) {
  const [point, setPoint] = le.useState(result.series.length - 1),
    [metric, setMetric] = le.useState("value");
  const series = result.series,
    chosen = series[Math.min(point, series.length - 1)];
  const max = Math.max(
    1,
    ...series.flatMap((row) => [
      row[metric],
      metric === "value" ? row.baseline : 0,
    ]),
  );
  const coords = (key) =>
    series
      .map(
        (row, index) =>
          `${48 + (index * 612) / (series.length - 1)},${194 - ((row[key] || 0) / max) * 150}`,
      )
      .join(" ");
  const label =
    topic === "google-ads"
      ? learnSay(
          "Качественные лиды, накопительно",
          "Qualified leads, cumulative",
        )
      : metric === "impressions"
        ? learnSay("Показы за неделю", "Weekly impressions")
        : learnSay("Клики за неделю", "Weekly clicks");
  return i("figure", {
    className: "sim-chart",
    children: [
      i("figcaption", {
        children: [
          i("strong", { children: label }),
          i("span", {
            children: learnSay(
              "Учебная модель · 8 недель для SEO / 4 для Ads",
              "Teaching model · 8 SEO weeks / 4 Ads weeks",
            ),
          }),
        ],
      }),
      topic === "seo"
        ? i("label", {
            className: "sim-select",
            children: [
              learnSay("Метрика графика", "Chart metric"),
              i("select", {
                value: metric,
                onChange: (event) => setMetric(event.target.value),
                children: [
                  i("option", {
                    value: "value",
                    children: learnSay("Клики", "Clicks"),
                  }),
                  i("option", {
                    value: "impressions",
                    children: learnSay("Показы", "Impressions"),
                  }),
                ],
              }),
            ],
          })
        : null,
      i("svg", {
        viewBox: "0 0 700 235",
        role: "img",
        "aria-label":
          label +
          ". " +
          learnSay(
            "Числа доступны в таблице ниже.",
            "Values are available in the table below.",
          ),
        children: [
          ...[0, 0.5, 1].flatMap((fraction) => [
            i(
              "line",
              {
                x1: 48,
                x2: 660,
                y1: 194 - fraction * 150,
                y2: 194 - fraction * 150,
                stroke: "#dfe5df",
              },
              "grid" + fraction,
            ),
            i(
              "text",
              {
                x: 42,
                y: 199 - fraction * 150,
                textAnchor: "end",
                fontSize: 11,
                fill: "#53615a",
                children: simNumber(max * fraction),
              },
              "tick" + fraction,
            ),
          ]),
          metric === "value"
            ? i("polyline", {
                points: coords("baseline"),
                fill: "none",
                stroke: "#95a398",
                strokeWidth: 2,
                strokeDasharray: "6 5",
              })
            : null,
          i("polyline", {
            points: coords(metric),
            fill: "none",
            stroke: "#236c4b",
            strokeWidth: 3,
            strokeLinejoin: "round",
          }),
          i("circle", {
            cx: 48 + (point * 612) / (series.length - 1),
            cy: 194 - (chosen[metric] / max) * 150,
            r: 5,
            fill: "#236c4b",
          }),
          ...series.map((row, index) =>
            i(
              "text",
              {
                x: 48 + (index * 612) / (series.length - 1),
                y: 220,
                textAnchor: "middle",
                fontSize: 12,
                fill: "#53615a",
                children: row.period,
              },
              "week" + index,
            ),
          ),
        ],
      }),
      i("div", {
        className: "sim-legend",
        children: [
          i("span", {
            children: learnSay("● Ваш сценарий", "● Your scenario"),
          }),
          metric === "value"
            ? i("span", {
                children:
                  topic === "google-ads"
                    ? learnSay("┄ База: 50/50", "┄ Baseline: 50/50")
                    : learnSay("┄ Без изменений", "┄ No changes"),
              })
            : null,
        ],
      }),
      i("label", {
        className: "sim-range",
        children: [
          i("span", {
            children:
              learnSay("Неделя ", "Week ") +
              chosen.period +
              " · " +
              simNumber(chosen[metric], 1),
          }),
          i("input", {
            type: "range",
            min: 0,
            max: series.length - 1,
            step: 1,
            value: point,
            onChange: (event) => setPoint(Number(event.target.value)),
            "aria-label": learnSay("Неделя на графике", "Chart week"),
          }),
        ],
      }),
      i("details", {
        children: [
          i("summary", {
            children: learnSay("Данные графика таблицей", "Chart data table"),
          }),
          i("div", {
            className: "sim-table-scroll",
            children: i("table", {
              children: [
                i("caption", { children: label }),
                i("thead", {
                  children: i("tr", {
                    children: [
                      i("th", {
                        scope: "col",
                        children: learnSay("Неделя", "Week"),
                      }),
                      i("th", {
                        scope: "col",
                        children: learnSay("Сценарий", "Scenario"),
                      }),
                      i("th", {
                        scope: "col",
                        children:
                          metric === "value"
                            ? topic === "google-ads"
                              ? learnSay("База: 50/50", "Baseline: 50/50")
                              : learnSay("Без изменений", "No changes")
                            : "CTR, %",
                      }),
                    ],
                  }),
                }),
                i("tbody", {
                  children: series.map((row) =>
                    i(
                      "tr",
                      {
                        children: [
                          i("th", { scope: "row", children: row.period }),
                          i("td", { children: simNumber(row[metric], 1) }),
                          i("td", {
                            children: simNumber(
                              metric === "value" ? row.baseline : row.ctr,
                              1,
                            ),
                          }),
                        ],
                      },
                      row.period,
                    ),
                  ),
                }),
              ],
            }),
          }),
        ],
      }),
    ],
  });
}
function SimulatorWorkbench({ topic, level = "junior", initialTask }) {
  const tasks = SIM_TASKS[topic].filter((task) => task.level === level);
  const first = tasks.find((task) => task.id === initialTask) || tasks[0];
  const [taskId, setTaskId] = le.useState(first.id),
    [input, setInput] = le.useState({
      ...SIM_DEFAULTS[topic],
      ...first.defaults,
    }),
    [review, setReview] = le.useState(false);
  const task = tasks.find((item) => item.id === taskId) || first;
  const result =
      topic === "seo" ? simulateSEO(input, task) : simulateAds(input),
    checks = simulatorChecks(topic, task, result),
    passed = checks.every((check) => check.passed);
  const change = (key, value) => {
    setInput((previous) => ({ ...previous, [key]: value }));
    setReview(false);
  };
  const reset = () => {
    setInput({ ...SIM_DEFAULTS[topic], ...task.defaults });
    setReview(false);
  };
  const switchTask = (id) => {
    const next = tasks.find((item) => item.id === id);
    setTaskId(id);
    setInput({ ...SIM_DEFAULTS[topic], ...next.defaults });
    setReview(false);
  };
  const checkbox = (id, label, text) =>
    i(
      "label",
      {
        className: "sim-check",
        children: [
          i("input", {
            type: "checkbox",
            checked: input[id] === true,
            onChange: (event) => change(id, event.target.checked),
          }),
          i("span", {
            children: [
              i("strong", { children: label }),
              text ? i("small", { children: text }) : null,
            ],
          }),
        ],
      },
      id,
    );
  const range = (id, label, min, max, step, suffix) =>
    i("label", {
      className: "sim-range",
      children: [
        i("span", {
          children: [
            label,
            i("strong", { children: simNumber(input[id]) + suffix }),
          ],
        }),
        i("input", {
          type: "range",
          min,
          max,
          step,
          value: input[id],
          onChange: (event) => change(id, Number(event.target.value)),
          "aria-label": label,
        }),
      ],
    });
  const metrics =
    topic === "seo"
      ? ["hours", "indexable", "clicks", "ctr"]
      : ["spend", "leads", "quality", "cpql", "roas", "profit"];
  return i("section", {
    className: "sim-workbench",
    children: [
      i("div", {
        className: "sim-task-bar",
        children: [
          i("label", {
            className: "sim-select",
            children: [
              learnSay("Задание", "Task"),
              i("select", {
                value: task.id,
                onChange: (event) => switchTask(event.target.value),
                children: tasks.map((item) =>
                  i(
                    "option",
                    { value: item.id, children: learnCopy(item.title) },
                    item.id,
                  ),
                ),
              }),
            ],
          }),
          i("span", {
            className: "sim-level",
            children: LEVEL_DETAILS[level].label,
          }),
        ],
      }),
      i("p", { className: "sim-brief", children: learnCopy(task.brief) }),
      i("div", {
        className: "sim-layout",
        children: [
          i("div", {
            className: "sim-controls",
            children: [
              i("h3", { children: learnSay("Ваши решения", "Your decisions") }),
              topic === "seo"
                ? SEO_ACTIONS.map((action) =>
                    checkbox(
                      action.id,
                      learnCopy(action.label) +
                        " · " +
                        action.hours +
                        learnSay(" ч", " h"),
                      learnCopy(action.text),
                    ),
                  )
                : [
                    range(
                      "budget",
                      learnSay("Бюджет на 4 недели", "Four-week budget"),
                      100000,
                      600000,
                      10000,
                      " ₸",
                    ),
                    range(
                      "allocation",
                      learnSay(
                        "Доля высокого интента",
                        "High-intent allocation",
                      ),
                      0,
                      100,
                      5,
                      "%",
                    ),
                    i("p", {
                      className: "hub-small",
                      children: learnSay(
                        "Остаток — широкий спрос. При насыщении спроса часть бюджета не расходуется.",
                        "The remainder goes to broad demand. Saturated demand leaves part of the budget unspent.",
                      ),
                    }),
                    checkbox(
                      "negatives",
                      learnSay(
                        "Исключить нецелевые запросы",
                        "Exclude irrelevant queries",
                      ),
                      learnSay(
                        "Меньше доступных кликов, выше качество широкого спроса.",
                        "Fewer available clicks; higher quality in broad demand.",
                      ),
                    ),
                    checkbox(
                      "landing",
                      learnSay(
                        "Улучшить посадочную",
                        "Improve the landing page",
                      ),
                      learnSay(
                        "Разовые расходы: 20 000 ₸; учтены во вкладе после рекламы.",
                        "One-time cost: KZT 20,000; included in contribution after ads.",
                      ),
                    ),
                    checkbox(
                      "qualified",
                      learnSay(
                        "Оценивать квалифицированные лиды",
                        "Evaluate qualified leads",
                      ),
                      learnSay(
                        "Меняет цель отчёта, само по себе не улучшает продажи.",
                        "Changes the reporting goal; does not improve sales by itself.",
                      ),
                    ),
                  ],
              i("div", {
                className: "hub-actions",
                children: [
                  i("button", {
                    type: "button",
                    className: "action",
                    onClick: () => setReview(true),
                    children: learnSay("Проверить решение", "Check solution"),
                  }),
                  i("button", {
                    type: "button",
                    className: "sim-reset",
                    onClick: reset,
                    children: learnSay("Сбросить", "Reset"),
                  }),
                ],
              }),
            ],
          }),
          i("div", {
            className: "sim-output",
            children: [
              i("div", {
                className: "sim-metrics",
                children: metrics.map((metric) =>
                  i(
                    "div",
                    {
                      children: [
                        i("span", { children: learnCopy(SIM_LABELS[metric]) }),
                        i("strong", {
                          children: simNumber(
                            result[metric],
                            metric === "ctr" ? 1 : 0,
                          ),
                        }),
                      ],
                    },
                    metric,
                  ),
                ),
              }),
              i(SimulatorChart, { topic, result }, task.id),
              topic === "google-ads"
                ? i("details", {
                    children: [
                      i("summary", {
                        children: learnSay(
                          "Расходы и воронка по сегментам",
                          "Segment spend and funnel",
                        ),
                      }),
                      i("div", {
                        className: "sim-table-scroll",
                        children: i("table", {
                          children: [
                            i("thead", {
                              children: i("tr", {
                                children: [
                                  "",
                                  learnSay("Расход, ₸", "Spend, KZT"),
                                  learnSay("Клики", "Clicks"),
                                  learnSay("Лиды", "Leads"),
                                  learnSay("Кач. лиды", "Qualified"),
                                ].map((title, index) =>
                                  i(
                                    "th",
                                    { scope: "col", children: title },
                                    index,
                                  ),
                                ),
                              }),
                            }),
                            i("tbody", {
                              children: result.rows.map((row) =>
                                i(
                                  "tr",
                                  {
                                    children: [
                                      i("th", {
                                        scope: "row",
                                        children: learnCopy(row.name),
                                      }),
                                      ...[
                                        "spend",
                                        "clicks",
                                        "leads",
                                        "qualifiedLeads",
                                      ].map((key) =>
                                        i(
                                          "td",
                                          { children: simNumber(row[key], 1) },
                                          key,
                                        ),
                                      ),
                                    ],
                                  },
                                  row.name.en,
                                ),
                              ),
                            }),
                          ],
                        }),
                      }),
                      i("p", {
                        className: "hub-small",
                        children:
                          learnSay("Ожидаемые продажи: ", "Expected sales: ") +
                          simNumber(result.sales, 1) +
                          " · ROAS: " +
                          simNumber(result.roas) +
                          "% · " +
                          learnSay("Цель отчёта: ", "Reporting goal: ") +
                          (input.qualified
                            ? learnSay(
                                "квалифицированные лиды",
                                "qualified leads",
                              )
                            : learnSay("все заявки", "all leads")),
                      }),
                    ],
                  })
                : null,
            ],
          }),
        ],
      }),
      i("div", {
        className:
          "sim-review" + (review ? (passed ? " is-pass" : " is-retry") : ""),
        "aria-live": "polite",
        children: [
          i("h3", {
            children: review
              ? passed
                ? learnSay("✓ Условия выполнены", "✓ Conditions met")
                : learnSay(
                    "Ещё не все условия выполнены",
                    "Some conditions are not yet met",
                  )
              : learnSay("Критерии задания", "Task criteria"),
          }),
          i("ul", {
            children: checks.map((check) =>
              i(
                "li",
                {
                  children: [
                    i("span", {
                      children:
                        learnCopy(SIM_LABELS[check.metric]) +
                        ": " +
                        (check.min !== undefined
                          ? "≥ " + simNumber(check.min)
                          : "") +
                        (check.min !== undefined && check.max !== undefined
                          ? " · "
                          : "") +
                        (check.max !== undefined
                          ? "≤ " + simNumber(check.max)
                          : ""),
                    }),
                    review
                      ? i("strong", {
                          children:
                            (check.passed ? "✓ " : "○ ") +
                            simNumber(check.actual, 1),
                        })
                      : null,
                  ],
                },
                check.metric,
              ),
            ),
          }),
          review
            ? i("p", {
                children: passed
                  ? learnSay(
                      "Сохраните в своей работе настройки, механизм эффекта и ограничения модели. Успешный сценарий здесь не гарантирует результат в реальном проекте.",
                      "Record settings, the mechanism of change and model limitations in your assignment. A successful scenario here does not guarantee real-world outcomes.",
                    )
                  : topic === "seo"
                    ? learnSay(
                        "Проверьте лимит часов. noindex, контент и CTR решают разные проблемы; при миграции сначала учтите риск потери показов.",
                        "Check the hour limit. noindex, content and CTR address different problems; in migration scenarios account for impression-loss risk first.",
                      )
                    : learnSay(
                        "Сравните качество сегментов и предел спроса. Рост бюджета не заменяет релевантность, а настройка цели не создаёт дополнительные продажи.",
                        "Compare segment quality and demand caps. More budget cannot replace relevance, and selecting a goal does not create additional sales.",
                      ),
              })
            : null,
        ],
      }),
      i("details", {
        className: "sim-assumptions",
        children: [
          i("summary", {
            children: learnSay(
              "Как устроена модель и что она не учитывает",
              "Model assumptions and limitations",
            ),
          }),
          i("p", {
            children:
              topic === "seo"
                ? learnSay(
                    "Старт: 12 000 показов в неделю и CTR 2%. Техническая правка добавляет до 6 000 показов, контент — до 10 000, ссылки — до 2 500. Эффект нарастает с задержкой 1–2 недели. Сниппеты добавляют до 0,8 п. п. CTR, контент — 0,3 п. п. Без защиты миграции показы снижаются на 35%. Это заданные учебные допущения, а не реальные коэффициенты ранжирования. Доступность страницы не гарантирует её индексацию.",
                    "Baseline: 12,000 weekly impressions and 2% CTR. Technical fixes add up to 6,000 impressions, content 10,000 and links 2,500. Effects ramp up after a 1–2 week delay. Snippets add up to 0.8 percentage points to CTR, content 0.3. Unprotected migration loses 35% of impressions. These are teaching assumptions, not actual ranking coefficients. Indexability does not guarantee indexing.",
                  )
                : learnSay(
                    "Высокий интент: CPC 500 ₸, максимум 480 кликов, конверсия 12%, качество 80%. Широкий спрос: CPC 200 ₸, максимум 900 кликов, конверсия 2,5%, качество 35%. Исключения: максимум 675 кликов, конверсия ×1,8, качество 60%. Посадочная: конверсия ×1,25 / ×1,45 и 20 000 ₸ расходов. В продажу переходят 35% качественных лидов; заказ 70 000 ₸, маржа 55%. CPQL = расход / качественные лиды. Вклад = выручка × маржа − реклама − посадочная. База сравнения: тот же бюджет с распределением 50/50 без улучшений. График равномерно накапливает ожидание за четыре недели; задержка продаж, налоги, аукцион и сезонность не моделируются.",
                    "High intent: KZT 500 CPC, 480-click cap, 12% conversion and 80% qualification. Broad demand: KZT 200 CPC, 900-click cap, 2.5% conversion and 35% qualification. Negatives: 675-click cap, conversion ×1.8, qualification 60%. Landing changes: conversion ×1.25 / ×1.45 and KZT 20,000 cost. Qualified leads close at 35%; orders average KZT 70,000 at 55% margin. CPQL = spend / qualified leads. Contribution = revenue × margin − ads − landing cost. Comparison baseline: the same budget split 50/50 without improvements. The chart accumulates expectations evenly over four weeks; sale delays, taxes, auctions and seasonality are not modeled.",
                  ),
          }),
          i("p", {
            className: "hub-small",
            children: learnSay(
              "Данные синтетические. Изменения пересчитываются сразу; дробные значения — математическое ожидание. Проверка использует числа до округления. Сценарий сбрасывается при перезагрузке.",
              "Data is synthetic. Changes recalculate instantly; fractions represent expected outcomes. Checks use unrounded values. Reloading resets the scenario.",
            ),
          }),
        ],
      }),
    ],
  });
}
function CourseSimulator({ course }) {
  if (!course.simulator) return null;
  return i("section", {
    className: "hub-section",
    id: "simulator",
    children: [
      i("div", {
        className: "hub-section-top",
        children: [
          i("h2", {
            children: learnSay("Лаборатория решений", "Decision lab"),
          }),
          i("a", {
            href: simulatorLink(course.simulator, course.level, course.id),
            children: learnSay(
              "Открыть на отдельной странице ↗",
              "Open dedicated page ↗",
            ),
          }),
        ],
      }),
      i("p", {
        className: "hub-small",
        children: learnSay(
          "Два задания этого уровня. Изменяйте решения, сравнивайте графики и проверяйте ограничения.",
          "Two tasks at this level. Adjust decisions, compare charts and check constraints.",
        ),
      }),
      i(
        SimulatorWorkbench,
        { topic: course.simulator, level: course.level },
        course.id,
      ),
    ],
  });
}
function SimulatorPage({ topic }) {
  const query = new URLSearchParams(location.search),
    requested = query.get("level"),
    [level, setLevel] = le.useState(
      LEVEL_DETAILS[requested] ? requested : "junior",
    );
  const course = COURSES.find((item) => item.id === topic + "-" + level);
  return i("main", {
    id: "main-content",
    className: "page-container hub-page simulator-page",
    children: [
      i(HubHeading, {
        eyebrow: learnSay("УЧЕБНАЯ ЛАБОРАТОРИЯ", "LEARNING LAB"),
        title:
          learnSay("Симулятор ", "Simulator: ") +
          (topic === "seo" ? "SEO" : "Google Ads"),
        text: learnSay(
          "Решения → данные → выводы. Шесть задач, три уровня, графики и проверка условий. Без рекламного бюджета и подключения аккаунтов.",
          "Decisions → data → insights. Six tasks, three levels, charts and criteria checks. No ad budget or account connection required.",
        ),
      }),
      i("div", {
        className: "sim-level-tabs",
        "aria-label": learnSay("Уровень сложности", "Difficulty level"),
        children: Object.keys(LEVEL_DETAILS).map((value) =>
          i(
            "button",
            {
              type: "button",
              "aria-pressed": value === level,
              onClick: () => {
                setLevel(value);
                const url = new URL(location.href);
                url.searchParams.set("level", value);
                url.searchParams.delete("task");
                url.searchParams.delete("course");
                history.replaceState(null, "", url);
              },
              children: LEVEL_DETAILS[value].label,
            },
            value,
          ),
        ),
      }),
      i(
        SimulatorWorkbench,
        { topic, level, initialTask: query.get("task") },
        topic + level,
      ),
      i("div", {
        className: "hub-actions",
        children: [
          hubButton(
            learnSay("К программе ", "View ") + learnCopy(course.title),
            courseLink(course),
          ),
          hubButton(
            learnSay("К урокам этого уровня", "Lessons at this level"),
            courseLink(course, true),
            true,
          ),
        ],
      }),
    ],
  });
}

function CoursePricePlans({ course }) {
  if (!COURSE_FORMAT_PRICES[course.id]) return null;
  return i("section", {
    className: "hub-section",
    id: "course-prices",
    children: [
      i("div", {
        className: "hub-section-top",
        children: [
          i("h2", {
            children: learnSay(
              "Выберите формат обучения",
              "Choose your learning format",
            ),
          }),
          i(CurrencySelector, {}),
        ],
      }),
      i("p", {
        className: "hub-small",
        children: learnSay(
          "Стоимость всей программы за одного участника. Даты, число встреч и условия сопровождения согласуем до оплаты. Демо на сайте открыто бесплатно.",
          "Full-program fee per participant. Dates, session counts and support terms are agreed before payment. The website demo is freely accessible.",
        ),
      }),
      i("div", {
        className: "hub-grid three",
        children: COURSE_FORMATS.map((format) =>
          i(
            "article",
            {
              className: "course-price-plan",
              children: [
                i("h3", { children: learnCopy(format.title) }),
                i("strong", {
                  className: "course-price-value",
                  children: i(CourseFee, {
                    prices: COURSE_FORMAT_PRICES[course.id][format.id],
                  }),
                }),
                i("p", { children: learnCopy(format.description) }),
                hubButton(
                  learnSay("Обсудить формат →", "Discuss this format →"),
                  courseInquiryLink(course, format.id),
                  true,
                ),
              ],
            },
            format.id,
          ),
        ),
      }),
    ],
  });
}
function CoursePricingTable() {
  const [topic, setTopic] = le.useState("all"),
    [format, setFormat] = le.useState("all");
  const courses = COURSES.filter(
    (course) => course.level && (topic === "all" || course.topic === topic),
  );
  const formats = COURSE_FORMATS.filter(
    (item) => format === "all" || item.id === format,
  );
  return i("section", {
    className: "page-container hub-section course-price-directory",
    id: "training",
    children: [
      i("div", {
        className: "hub-section-top",
        children: [
          i("h2", {
            children: learnSay(
              "Обучение: программы и цены",
              "Training: programs and fees",
            ),
          }),
          i(CurrencySelector, {}),
        ],
      }),
      i("p", {
        children: learnSay(
          "За всю программу, за одного участника. Тенге — фиксированные суммы; стоимость в других валютах согласуем отдельно.",
          "Full-program fees per participant. KZT fees are fixed; quotes in other currencies are agreed separately.",
        ),
      }),
      i("div", {
        className: "hub-actions",
        children: [
          i("label", {
            className: "sim-select",
            children: [
              learnSay("Направление обучения", "Learning track"),
              i("select", {
                value: topic,
                onChange: (event) => setTopic(event.target.value),
                children: [
                  ["all", learnSay("Все направления", "All tracks")],
                  ["seo", "SEO"],
                  ["google-ads", "Google Ads"],
                ].map(([value, label]) =>
                  i("option", { value, children: label }, value),
                ),
              }),
            ],
          }),
          i("label", {
            className: "sim-select",
            children: [
              learnSay("Формат обучения", "Learning format"),
              i("select", {
                value: format,
                onChange: (event) => setFormat(event.target.value),
                children: [
                  i("option", {
                    value: "all",
                    children: learnSay("Все форматы", "All formats"),
                  }),
                  ...COURSE_FORMATS.map((item) =>
                    i(
                      "option",
                      { value: item.id, children: learnCopy(item.title) },
                      item.id,
                    ),
                  ),
                ],
              }),
            ],
          }),
        ],
      }),
      i("div", {
        className: "sim-table-scroll",
        children: i("table", {
          children: [
            i("caption", {
              children: learnSay(
                "Шесть курсов · три формата",
                "Six courses · three formats",
              ),
            }),
            i("thead", {
              children: i("tr", {
                children: [
                  i("th", {
                    scope: "col",
                    children: learnSay("Программа", "Program"),
                  }),
                  ...formats.map((item) =>
                    i(
                      "th",
                      { scope: "col", children: learnCopy(item.title) },
                      item.id,
                    ),
                  ),
                ],
              }),
            }),
            i("tbody", {
              children: courses.map((course) =>
                i(
                  "tr",
                  {
                    children: [
                      i("th", {
                        scope: "row",
                        children: i("a", {
                          href: courseLink(course) + "#course-prices",
                          children: learnCopy(course.title),
                        }),
                      }),
                      ...formats.map((item) =>
                        i(
                          "td",
                          {
                            children: i(CourseFee, {
                              prices: COURSE_FORMAT_PRICES[course.id][item.id],
                            }),
                          },
                          item.id,
                        ),
                      ),
                    ],
                  },
                  course.id,
                ),
              ),
            }),
          ],
        }),
      }),
    ],
  });
}
