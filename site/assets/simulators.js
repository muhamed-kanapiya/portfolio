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
              "Учебная модель · 12 недель для SEO / 4 для Ads",
              "Teaching model · 12 SEO weeks / 4 Ads weeks",
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
                    ? learnSay("┄ Учебная база", "┄ Teaching baseline")
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
                              ? learnSay("Учебная база", "Teaching baseline")
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
function CourseSimulator({ course }) {
  const { state } = useLearningProgress();
  if (!course.simulator) return null;
  if (!courseAccess(course, state).unlocked)
    return i(CourseLock, { course, state });
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
          "Четыре учебных бизнеса, банк запросов и связанные задания. Настройте проект, запустите проверки и объясните результат.",
          "Four training businesses, a keyword bank and connected tasks. Configure a project, run checks and explain the result.",
        ),
      }),
      i(
        LabWorkspace,
        { topic: course.simulator, level: course.level },
        course.id,
      ),
    ],
  });
}
function SimulatorPage({ topic }) {
  const { state } = useLearningProgress();
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
          "Решения → данные → выводы. 16 заданий, 4 проекта, 32 запроса для каждого проекта. Без рекламного бюджета и подключения аккаунтов.",
          "Decisions → data → insights. 16 tasks, 4 projects, 32 queries per project. No ad budget or account connection required.",
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
              disabled: !courseAccess(
                COURSES.find((c) => c.id === topic + "-" + value),
                state,
              ).unlocked,
              title: courseAccess(
                COURSES.find((c) => c.id === topic + "-" + value),
                state,
              ).unlocked
                ? ""
                : learnSay(
                    "Сначала пройдите предыдущие уровни",
                    "Complete previous levels first",
                  ),
              onClick: () => {
                setLevel(value);
                const url = new URL(location.href);
                url.searchParams.set("level", value);
                url.searchParams.delete("task");
                url.searchParams.delete("course");
                history.replaceState(null, "", url);
              },
              children:
                (courseAccess(
                  COURSES.find((c) => c.id === topic + "-" + value),
                  state,
                ).unlocked
                  ? ""
                  : "🔒 ") + LEVEL_DETAILS[value].label,
            },
            value,
          ),
        ),
      }),
      courseAccess(course, state).unlocked
        ? i(
            LabWorkspace,
            { topic, level, initialTask: query.get("task") },
            topic + level,
          )
        : i(CourseLock, { course, state }),
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
