const chartCopy = (value) => value?.[currentLanguage] || value?.ru || value;
const chartText = (ru, en) => (currentLanguage === "ru" ? ru : en);
function validDatedSeries(recordId) {
  return (window.CASE_CHART_DATA?.[recordId] || []).filter((series) => {
    if (
      !series.id ||
      !chartCopy(series.name) ||
      !chartCopy(series.source) ||
      !Array.isArray(series.points) ||
      series.points.length < 2
    )
      return false;
    let last = -Infinity;
    for (const point of series.points) {
      if (!/^\d{4}-\d{2}-\d{2}$/.test(point.date || "")) return false;
      const date = Date.parse(point.date + "T00:00:00Z");
      if (
        !Number.isFinite(date) ||
        new Date(date).toISOString().slice(0, 10) !== point.date ||
        date <= last ||
        typeof point.value !== "number" ||
        !Number.isFinite(point.value) ||
        point.value < 0
      )
        return false;
      last = date;
    }
    return true;
  });
}
function chartNumber(value, unit = "") {
  const text = new Intl.NumberFormat(
    currentLanguage === "ru" ? "ru-RU" : "en-US",
    { maximumFractionDigits: 2 },
  ).format(value);
  return ["$", "€", "£"].includes(unit)
    ? unit + text
    : text + (unit ? " " + unit : "");
}
function caseChartContext(category) {
  const content = {
    seo: [
      ["Поисковая видимость", "Search visibility"],
      [
        "Сравнение органического трафика показывает масштаб изменений. Для оценки причин важны одинаковые периоды, источник данных и сезонность.",
        "Organic traffic comparison shows the scale of the change. Matched periods, data source and seasonality matter when assessing the causes.",
      ],
      [
        "Что смотреть вместе: запросы, целевые страницы, клики и заявки из поиска.",
        "Read alongside: queries, landing pages, clicks and organic inquiries.",
      ],
    ],
    ads: [
      ["Эффективность рекламы", "Advertising efficiency"],
      [
        "Стоимость заявки нужно оценивать вместе с её качеством. Сравнение CPL само по себе не описывает продажи и окупаемость.",
        "Lead cost needs to be assessed together with lead quality. CPL alone does not describe sales or profitability.",
      ],
      [
        "Что смотреть вместе: расход, конверсии, квалификация лидов и продажи в CRM.",
        "Read alongside: spend, conversions, lead qualification and CRM sales.",
      ],
    ],
    web: [
      ["Путь к конверсии", "The conversion journey"],
      [
        "Конверсия зависит и от сайта, и от состава трафика. Для сравнения важно одинаковое определение целевого действия.",
        "Conversion depends on both the website and traffic mix. A consistent conversion definition is essential for comparison.",
      ],
      [
        "Что смотреть вместе: источники, устройства, события формы и завершённые обращения.",
        "Read alongside: sources, devices, form events and completed inquiries.",
      ],
    ],
  };
  return (
    content[category] || [
      ["Показатели проекта", "Project indicators"],
      [
        "Сравнение по данным, указанным в кейсе.",
        "A comparison using the measurements provided in this case.",
      ],
      [
        "Сопоставляйте одинаковые определения метрик и периоды.",
        "Use matching metric definitions and reporting periods.",
      ],
    ]
  ).map(([ru, en]) => chartText(ru, en));
}
function RangeComparisonChart({ metric }) {
  const before = metricRange(metric.before),
    after = metricRange(metric.after);
  if (!before || !after || before.unit !== after.unit) return null;
  const max = Math.max(before.max, after.max, 1) * 1.12;
  const x = (value) => 92 + (value / max) * 510;
  const ticks = Array.from({ length: 5 }, (_, index) => (max * index) / 4);
  const title = translateText(metric.metric);
  return i("figure", {
    className: "range-chart",
    children: [
      i("figcaption", { children: title }),
      i("svg", {
        viewBox: "0 0 650 245",
        role: "img",
        "aria-label": `${title}. ${translateText("Before")}: ${metric.before}. ${translateText("After")}: ${metric.after}.`,
        children: [
          i("title", { children: title }),
          ...ticks.map((value, index) =>
            i(
              "g",
              {
                children: [
                  i("line", {
                    x1: x(value),
                    x2: x(value),
                    y1: 30,
                    y2: 195,
                    className: "chart-gridline",
                  }),
                  i("text", {
                    x: x(value),
                    y: 224,
                    textAnchor: "middle",
                    className: "chart-axis",
                    children: chartNumber(value),
                  }),
                ],
              },
              "tick" + index,
            ),
          ),
          ...[
            [before, "Before", metric.before, 70, "before"],
            [after, "After", metric.after, 158, "after"],
          ].map(([range, label, value, y, kind]) =>
            i(
              "g",
              {
                className: "range-series range-series-" + kind,
                children: [
                  i("text", {
                    x: 12,
                    y: y + 5,
                    className: "chart-period",
                    children: label,
                  }),
                  i("line", {
                    x1: x(0),
                    x2: x(range.max),
                    y1: y,
                    y2: y,
                    className: "chart-stem",
                  }),
                  i("line", {
                    x1: x(range.min),
                    x2: x(range.max),
                    y1: y,
                    y2: y,
                    className: "chart-range",
                  }),
                  ...[...new Set([range.min, range.max])].map((point, index) =>
                    i(
                      "circle",
                      {
                        cx: x(point),
                        cy: y,
                        r: 5,
                        children: i("title", {
                          children:
                            translateText(label) +
                            ": " +
                            chartNumber(point, range.unit),
                        }),
                      },
                      index,
                    ),
                  ),
                  i("text", {
                    x: x((range.min + range.max) / 2),
                    y: y - 20,
                    textAnchor: "middle",
                    className: "chart-value",
                    children: value,
                  }),
                ],
              },
              kind,
            ),
          ),
        ],
      }),
      i("p", {
        className: "chart-caption",
        children: chartText(
          "Общая шкала от нуля. Отрезки показывают исходные диапазоны; это сравнение двух состояний, а не помесячная динамика.",
          "A shared zero-based scale. Segments show the supplied ranges; this compares two states, not monthly performance.",
        ),
      }),
    ],
  });
}
function DatedCaseChart({ series }) {
  const [selected, setSelected] = le.useState(series.points.length - 1);
  const ref = le.useRef(null);
  const points = series.points,
    start = Date.parse(points[0].date),
    end = Date.parse(points.at(-1).date);
  const ceiling = Math.max(...points.map((point) => point.value), 1) * 1.12;
  const x = (point) =>
    60 + ((Date.parse(point.date) - start) / (end - start)) * 540;
  const y = (point) => 190 - (point.value / ceiling) * 155;
  const selectedPoint = points[selected] || points.at(-1);
  const dateText = (date) =>
    new Intl.DateTimeFormat(currentLanguage === "ru" ? "ru-RU" : "en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
      timeZone: "UTC",
    }).format(new Date(date + "T00:00:00Z"));
  const selectNearest = (event) => {
    const bounds = ref.current?.getBoundingClientRect();
    if (!bounds?.width) return;
    const coordinate = ((event.clientX - bounds.left) / bounds.width) * 650;
    setSelected(
      points.reduce(
        (best, point, index) =>
          Math.abs(x(point) - coordinate) <
          Math.abs(x(points[best]) - coordinate)
            ? index
            : best,
        0,
      ),
    );
  };
  return i("figure", {
    className: "dated-chart",
    children: [
      i("figcaption", { children: chartCopy(series.name) }),
      i("p", {
        className: "chart-point-readout",
        "aria-live": "polite",
        children:
          dateText(selectedPoint.date) +
          " · " +
          chartNumber(selectedPoint.value, series.unit || ""),
      }),
      i("svg", {
        ref,
        viewBox: "0 0 650 245",
        role: "img",
        "aria-label": chartCopy(series.name),
        onPointerMove: selectNearest,
        onClick: selectNearest,
        children: [
          i("title", { children: chartCopy(series.name) }),
          ...[0, 0.5, 1].map((fraction) =>
            i(
              "g",
              {
                children: [
                  i("line", {
                    x1: 60,
                    x2: 600,
                    y1: 190 - fraction * 155,
                    y2: 190 - fraction * 155,
                    className: "chart-gridline",
                  }),
                  i("text", {
                    x: 52,
                    y: 195 - fraction * 155,
                    textAnchor: "end",
                    className: "chart-axis",
                    children: chartNumber(ceiling * fraction),
                  }),
                ],
              },
              fraction,
            ),
          ),
          i("polyline", {
            points: points.map((point) => `${x(point)},${y(point)}`).join(" "),
            className: "chart-trend",
          }),
          ...points.map((point, index) =>
            i(
              "circle",
              {
                cx: x(point),
                cy: y(point),
                r: selected === index ? 6 : 3,
                className: "chart-trend-point",
                children: i("title", {
                  children: `${dateText(point.date)}: ${chartNumber(point.value, series.unit || "")}`,
                }),
              },
              point.date,
            ),
          ),
          i("text", {
            x: 60,
            y: 224,
            className: "chart-axis",
            children: dateText(points[0].date),
          }),
          i("text", {
            x: 600,
            y: 224,
            textAnchor: "end",
            className: "chart-axis",
            children: dateText(points.at(-1).date),
          }),
        ],
      }),
      i("label", {
        className: "chart-point-control",
        children: [
          chartText("Выбрать дату", "Select a date"),
          i("input", {
            type: "range",
            min: 0,
            max: points.length - 1,
            value: selected,
            onChange: (event) => setSelected(Number(event.target.value)),
            "aria-valuetext":
              dateText(selectedPoint.date) +
              ": " +
              chartNumber(selectedPoint.value, series.unit || ""),
          }),
        ],
      }),
      i("p", {
        className: "chart-caption",
        children:
          chartText("Источник: ", "Source: ") +
          chartCopy(series.source) +
          ". " +
          chartText(
            "Линия соединяет переданные точки; промежуточные значения не измерены.",
            "The line connects supplied measurements; intermediate values were not measured.",
          ),
      }),
      i("details", {
        className: "chart-data-details",
        children: [
          i("summary", { children: chartText("Данные графика", "Chart data") }),
          i("table", {
            className: "case-results-table",
            children: [
              i("caption", { children: chartCopy(series.name) }),
              i("thead", {
                children: i("tr", {
                  children: [
                    i("th", {
                      scope: "col",
                      children: chartText("Дата", "Date"),
                    }),
                    i("th", {
                      scope: "col",
                      children: chartText("Значение", "Value"),
                    }),
                  ],
                }),
              }),
              i("tbody", {
                children: points.map((point) =>
                  i(
                    "tr",
                    {
                      children: [
                        i("th", {
                          scope: "row",
                          children: dateText(point.date),
                        }),
                        i("td", {
                          children: chartNumber(point.value, series.unit || ""),
                        }),
                      ],
                    },
                    point.date,
                  ),
                ),
              }),
            ],
          }),
        ],
      }),
    ],
  });
}
function CaseChartPanel({ record }) {
  const metrics = record.metrics.filter((metric) => {
    const before = metricRange(metric.before),
      after = metricRange(metric.after);
    return before && after && before.unit === after.unit;
  });
  const dated = validDatedSeries(record.id);
  const [selected, setSelected] = le.useState("range-0");
  const options = [
    ...metrics.map((metric, index) => ({
      id: "range-" + index,
      name: translateText(metric.metric),
      metric,
    })),
    ...dated.map((series) => ({
      id: "dated-" + series.id,
      name: chartCopy(series.name) + " · " + chartText("по датам", "by date"),
      series,
    })),
  ];
  const active = options.find((option) => option.id === selected) || options[0];
  if (!active) return null;
  const [title, description, context] = caseChartContext(record.category);
  return i("div", {
    className: "case-chart-panel",
    children: [
      i("div", {
        className: "case-chart-main",
        children: [
          i("div", {
            className: "chart-heading",
            children: [
              i("span", {
                className: "section-eyebrow",
                children: chartText("ДАННЫЕ КЕЙСА", "CASE DATA"),
              }),
              options.length > 1
                ? i("label", {
                    className: "chart-select-label",
                    children: [
                      chartText("Показатель", "Metric"),
                      i("select", {
                        value: active.id,
                        onChange: (event) => setSelected(event.target.value),
                        children: options.map((option) =>
                          i(
                            "option",
                            { value: option.id, children: option.name },
                            option.id,
                          ),
                        ),
                      }),
                    ],
                  })
                : null,
            ],
          }),
          active.series
            ? i(DatedCaseChart, { series: active.series }, active.id)
            : i(RangeComparisonChart, { metric: active.metric }),
        ],
      }),
      i("aside", {
        className: "case-chart-reading",
        children: [
          i("span", {
            className: "section-eyebrow",
            children: chartText("КАК ЧИТАТЬ", "READING THE CHART"),
          }),
          i("h3", { children: title }),
          i("p", { children: description }),
          i("p", { className: "chart-context", children: context }),
          i("a", {
            href: detailLink("service", record.serviceIds?.[0] || "tracking"),
            children: chartText("Об услуге ↗", "About the service ↗"),
          }),
        ],
      }),
    ],
  });
}
