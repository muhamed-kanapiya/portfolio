function labButton(label, onClick, secondary = false) {
  return i("button", {
    type: "button",
    className: "lab-button" + (secondary ? " secondary" : ""),
    onClick,
    children: label,
  });
}
function LabField({
  label,
  value,
  onChange,
  options,
  type = "text",
  min,
  max,
  step = 1,
  help,
}) {
  const id = le.useId();
  const [draft, setDraft] = le.useState(String(value));
  le.useEffect(() => setDraft(String(value)), [value]);
  return i("div", {
    className: "lab-field",
    children: [
      i("label", { htmlFor: id, children: label }),
      options
        ? i("select", {
            id,
            value,
            onChange: (e) => onChange(e.target.value),
            children: options.map(([v, text]) =>
              i("option", { value: v, children: text }, v),
            ),
          })
        : i(type === "textarea" ? "textarea" : "input", {
            id,
            type: type === "textarea" ? undefined : type,
            value: type === "number" ? draft : value,
            min,
            max,
            step,
            rows: type === "textarea" ? 6 : undefined,
            onChange: (e) => {
              if (type !== "number")
                return onChange(
                  type === "range" ? Number(e.target.value) : e.target.value,
                );
              const text = e.target.value,
                num = Number(text);
              setDraft(text);
              if (
                text !== "" &&
                Number.isFinite(num) &&
                num >= min &&
                num <= max
              )
                onChange(num);
            },
            onBlur:
              type === "number"
                ? () => {
                    const num = Number(draft),
                      next =
                        draft !== "" && Number.isFinite(num)
                          ? Math.max(min, Math.min(max, Math.round(num)))
                          : value;
                    setDraft(String(next));
                    onChange(next);
                  }
                : undefined,
            spellCheck: false,
          }),
      type === "range"
        ? i("output", { htmlFor: id, children: simNumber(value) })
        : null,
      help ? i("small", { children: help }) : null,
    ],
  });
}
function labToggle(label, checked, onChange) {
  return i("label", {
    className: "lab-toggle",
    children: [
      i("input", {
        type: "checkbox",
        checked,
        onChange: (e) => onChange(e.target.checked),
      }),
      i("span", { children: label }),
    ],
  });
}
function LabWorkspace({ topic, level, initialTask }) {
  const [projectId, setProjectId] = le.useState("repair"),
    project = LAB_PROJECTS.find((p) => p.id === projectId);
  return i("div", {
    className: "lab-workspace",
    children: [
      i("div", {
        className: "lab-project-picker",
        children: [
          i("div", {
            children: [
              i("span", {
                className: "hub-kicker",
                children: "PROJECT LAB / " + LEVEL_DETAILS[level].label,
              }),
              i("h3", {
                children: learnSay(
                  "Один бизнес. Связанные решения.",
                  "One business. Connected decisions.",
                ),
              }),
            ],
          }),
          i(LabField, {
            label: learnSay("Учебный проект", "Training project"),
            value: projectId,
            onChange: setProjectId,
            options: LAB_PROJECTS.map((p) => [p.id, learnCopy(p.name)]),
          }),
        ],
      }),
      i(
        LabProject,
        { topic, level, project, initialTask },
        topic + projectId + level,
      ),
    ],
  });
}
function LabProject({ topic, level, project, initialTask }) {
  const tasks = LAB_TASKS[topic].filter((t) => t.level === level),
    storageKey = LAB_STORAGE_KEY + ":" + topic + ":" + project.id;
  const [saved] = le.useState(() => {
    try {
      return JSON.parse(localStorage.getItem(storageKey) || "{}");
    } catch {
      return {};
    }
  });
  const [input, setInput] = le.useState(() => labClean(saved?.input, project));
  const [tools, setTools] = le.useState({}),
    [done, setDone] = le.useState(() =>
      Array.isArray(saved?.done)
        ? saved.done.filter((id) => LAB_TASKS[topic].some((t) => t.id === id))
        : [],
    );
  const [taskId, setTaskId] = le.useState(
      tasks.some((t) => t.id === initialTask) ? initialTask : tasks[0].id,
    ),
    task = tasks.find((t) => t.id === taskId) || tasks[0];
  const [panel, setPanel] = le.useState("brief"),
    [checked, setChecked] = le.useState(false),
    [notice, setNotice] = le.useState(""),
    [token, setToken] = le.useState(""),
    [query, setQuery] = le.useState(""),
    [onlySelected, setOnlySelected] = le.useState(false),
    [storageError, setStorageError] = le.useState(false),
    [reset, setReset] = le.useState(false);
  le.useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify({ input, done }));
      setStorageError(false);
    } catch {
      setStorageError(true);
    }
  }, [input, done, storageKey]);
  const update = (key, value) => {
    setInput((current) => labClean({ ...current, [key]: value }, project));
    setNotice("");
  };
  const result = labSimulate(topic, input, project, tools),
    checks = labChecks(topic, task, input, project, tools),
    passed = checks.every((c) => c.passed),
    s = result.sem;
  const action = (name) => {
    const next = labTool(name, input, project, tools, topic, token);
    setTools(next);
    setNotice(
      {
        crawl: learnSay(
          "Обход завершён. Смотрите отчёт robots.txt ниже.",
          "Crawl complete. See the robots.txt report below.",
        ),
        build: next.xml?.valid
          ? learnSay(
              "XML собран: 6 подходящих URL.",
              "XML built: 6 eligible URLs.",
            )
          : learnSay(
              "XML собран, но состав URL неверный: нужны 6 публичных страниц со статусом 200.",
              "XML built, but the URL set is incorrect: include the 6 public pages returning 200.",
            ),
        verify: next.verified
          ? learnSay("Учебный домен подтверждён.", "Training domain verified.")
          : learnSay(
              "Токен не совпадает с брифом.",
              "Token does not match the brief.",
            ),
        submit: next.submitted
          ? learnSay(
              "Принято учебной консолью в очередь обхода. Это не гарантия индексации.",
              "Accepted into the training crawl queue. This does not guarantee indexing.",
            )
          : learnSay(
              "Сначала подтвердите домен и соберите корректную текущую XML-карту.",
              "Verify the domain and build a valid, current XML sitemap first.",
            ),
        inspect: learnSay(
          "Учебная проверка URL завершена.",
          "Training URL inspection complete.",
        ),
        publish: learnSay(
          "Конфигурация опубликована внутри симулятора. Теперь протестируйте события.",
          "Configuration published inside the simulator. Now test events.",
        ),
        form: learnSay(
          "Форма отправлена в учебный DebugView.",
          "Form submitted to training DebugView.",
        ),
        click: learnSay(
          "Обычный клик проверен в учебном DebugView.",
          "Normal click tested in training DebugView.",
        ),
        page: learnSay("Просмотр страницы проверен.", "Page view tested."),
        crm: learnSay(
          "Один CRM ID отправлен дважды. Проверьте число принятых конверсий.",
          "The same CRM ID was sent twice. Check the accepted conversion count.",
        ),
        run: learnSay(
          "Учебная кампания рассчитана с текущими настройками.",
          "Training campaign calculated with current settings.",
        ),
      }[name],
    );
  };
  const field = (key, ru, en, options, help) =>
    i(LabField, {
      label: learnSay(ru, en),
      value: input[key],
      onChange: (v) =>
        update(key, typeof input[key] === "number" ? Number(v) : v),
      options: options?.map(([v, r, e]) => [v, learnSay(r, e || r)]),
      help,
    });
  const number = (key, ru, en) =>
    i(LabField, {
      label: learnSay(ru, en),
      type: "number",
      value: input[key],
      min: LAB_RANGES[key][0],
      max: LAB_RANGES[key][1],
      onChange: (v) => update(key, v),
    });
  const toggle = (key, ru, en) =>
    labToggle(learnSay(ru, en), input[key], (v) => update(key, v));
  const metric = (label, value) =>
    i(
      "div",
      {
        className: "lab-metric",
        children: [
          i("small", { children: label }),
          i("strong", { children: value }),
        ],
      },
      label,
    );
  const goTask = (id) => {
    setTaskId(id);
    setPanel(tasks.find((t) => t.id === id).panel);
    setChecked(false);
    setNotice("");
  };
  const bank = s.bank.filter(
    (k) =>
      (!onlySelected || input.selected.includes(k.id)) &&
      learnCopy(k.text).toLowerCase().includes(query.toLowerCase()),
  );
  const feedback = checked
    ? i("div", {
        className: "lab-feedback",
        role: "status",
        children: [
          i("strong", {
            children: passed
              ? learnSay("✓ Условия выполнены", "✓ Criteria met")
              : learnSay("Ещё есть что исправить", "There is more to fix"),
          }),
          i("ul", {
            children: checks.map((c) =>
              i(
                "li",
                {
                  className: c.passed ? "passed" : "pending",
                  children: (c.passed ? "✓ " : "○ ") + learnCopy(c.label),
                },
                c.id,
              ),
            ),
          }),
        ],
      })
    : null;
  const currentCrawl = tools.crawl === labSiteSignature(input),
    currentInspect = tools.inspect?.signature === labSiteSignature(input);
  let content;
  if (panel === "brief")
    content = i("div", {
      className: "lab-brief",
      children: [
        i("h3", { children: learnCopy(project.name) }),
        i("p", { children: learnCopy(project.goal) }),
        i("dl", {
          className: "lab-brief-facts",
          children: [
            i("dt", {
              children: learnSay("Сайт / география", "Site / geography"),
            }),
            i("dd", {
              children: project.domain + " · " + learnCopy(project.city),
            }),
            i("dt", {
              children: learnSay(
                "Средний чек / маржа / лид → продажа",
                "Order / margin / lead → sale",
              ),
            }),
            i("dd", {
              children:
                simNumber(project.order) +
                " ₸ / " +
                project.margin +
                "% / " +
                project.close * 100 +
                "%",
            }),
            i("dt", { children: "GA4 measurement ID" }),
            i("dd", {
              children: i("code", { children: "G-DEMO" + project.idSuffix }),
            }),
            i("dt", {
              children: learnSay(
                "Токен учебной Search Console",
                "Training Search Console token",
              ),
            }),
            i("dd", {
              children: i("code", { children: "demo-" + project.idSuffix }),
            }),
            i("dt", { children: learnSay("Карта сайта", "Sitemap") }),
            i("dd", { children: project.domain + "/sitemap.xml" }),
          ],
        }),
        i("p", {
          className: "hub-small",
          children: learnSay(
            "Сайты вымышлены. Частотность, CPC, конверсии и графики синтетические. Это не прогноз и не настоящий аккаунт Google. Не вводите реальные ID и персональные данные.",
            "Sites are fictional. Demand, CPC, conversions and charts are synthetic, not forecasts or a real Google account. Do not enter real IDs or personal data.",
          ),
        }),
        labButton(learnSay("К текущему заданию →", "Open current task →"), () =>
          setPanel(task.panel),
        ),
      ],
    });
  if (panel === "keywords")
    content = i("div", {
      children: [
        i("h3", {
          children: learnSay(
            "Соберите семантику под бриф",
            "Build a keyword set for the brief",
          ),
        }),
        i("p", {
          className: "hub-small",
          children: learnSay(
            "Выбирайте подходящие запросы, учитывая продукт, город и намерение. Частотность — учебные запросы в месяц, CPC — ₸. Данные не меняются при переключении языка.",
            "Choose queries by product, geography and intent. Volume is simulated monthly searches; CPC is in KZT. Switching language does not change the dataset.",
          ),
        }),
        i("div", {
          className: "lab-grid",
          children: [
            i(LabField, {
              label: learnSay("Поиск в банке запросов", "Search query bank"),
              value: query,
              onChange: setQuery,
            }),
            labToggle(
              learnSay("Только выбранные", "Selected only"),
              onlySelected,
              setOnlySelected,
            ),
          ],
        }),
        i("div", {
          className: "lab-metrics",
          children: [
            metric(
              learnSay("Выбрано", "Selected"),
              input.selected.length + " / " + s.bank.length,
            ),
            metric(
              learnSay("Точность выбора", "Selection precision"),
              checked ? simNumber(s.precision * 100) + "%" : "—",
            ),
            metric(
              learnSay("Охват нужных запросов", "Relevant coverage"),
              checked ? simNumber(s.recall * 100) + "%" : "—",
            ),
          ],
        }),
        i("div", {
          className: "lab-table-wrap",
          tabIndex: 0,
          role: "region",
          "aria-label": learnSay("Банк ключевых слов", "Keyword bank"),
          children: i("table", {
            className: "lab-table",
            children: [
              i("thead", {
                children: i("tr", {
                  children: [
                    learnSay("Запрос", "Query"),
                    learnSay("Частотность", "Volume"),
                    "CPC, ₸",
                    learnSay("Конкуренция / 100", "Competition / 100"),
                    ...(topic === "seo"
                      ? [learnSay("Целевая страница", "Target page")]
                      : []),
                  ].map((t) => i("th", { scope: "col", children: t }, t)),
                }),
              }),
              i("tbody", {
                children: bank.map((k) =>
                  i(
                    "tr",
                    {
                      children: [
                        i("td", {
                          children: labToggle(
                            learnCopy(k.text),
                            input.selected.includes(k.id),
                            (v) =>
                              update(
                                "selected",
                                v
                                  ? [...input.selected, k.id]
                                  : input.selected.filter((id) => id !== k.id),
                              ),
                          ),
                        }),
                        i("td", { children: simNumber(k.volume) }),
                        i("td", { children: simNumber(k.cpc) }),
                        i("td", { children: k.difficulty }),
                        topic === "seo"
                          ? i("td", {
                              children: i("select", {
                                "aria-label":
                                  learnSay("Страница для ", "Page for ") +
                                  learnCopy(k.text),
                                value: input.mapping[k.id] || "",
                                disabled: !input.selected.includes(k.id),
                                onChange: (e) =>
                                  update("mapping", {
                                    ...input.mapping,
                                    [k.id]: e.target.value,
                                  }),
                                children: [
                                  i("option", { value: "", children: "—" }),
                                  i("option", {
                                    value: "service",
                                    children: learnSay(
                                      "Услуга / каталог",
                                      "Service / catalog",
                                    ),
                                  }),
                                  i("option", {
                                    value: "guide",
                                    children: learnSay(
                                      "Статья / гайд",
                                      "Article / guide",
                                    ),
                                  }),
                                ],
                              }),
                            })
                          : null,
                      ],
                    },
                    k.id,
                  ),
                ),
              }),
            ],
          }),
        }),
        bank.length
          ? null
          : i("p", {
              children: learnSay(
                "По этому фильтру запросов нет.",
                "No queries match this filter.",
              ),
            }),
        topic === "google-ads"
          ? i(LabField, {
              label: learnSay(
                "Минус-слова — по одному в строке",
                "Negative keywords — one per line",
              ),
              type: "textarea",
              value: input.negatives,
              onChange: (v) => update("negatives", v),
              help: learnSay(
                "Буквальные фразы в RU или EN. Начните с вакансий, бесплатного обучения, шаблонов и зарплаты. Не блокируйте полезный спрос.",
                "Literal phrases in RU or EN. Start with jobs, free training, templates and salaries. Preserve relevant demand.",
              ),
            })
          : null,
      ],
    });
  if (panel === "files")
    content = i("div", {
      children: [
        i("h3", { children: "robots.txt & sitemap.xml" }),
        i("p", {
          className: "hub-small",
          children: learnSay(
            "Поддерживаются User-agent (* / Googlebot), Allow, Disallow, Sitemap, * и $. Disallow ограничивает обход, но не защищает личные данные и не гарантирует удаление из поиска.",
            "Supports User-agent (* / Googlebot), Allow, Disallow, Sitemap, * and $. Disallow controls crawling; it does not protect private data or guarantee removal from search.",
          ),
        }),
        i(LabField, {
          label: "robots.txt",
          type: "textarea",
          value: input.robots,
          onChange: (v) => update("robots", v),
        }),
        labButton(
          learnSay("🤖 Запустить учебный обход", "🤖 Run training crawl"),
          () => action("crawl"),
        ),
        tools.crawl
          ? i("div", {
              children: [
                i("p", {
                  children: currentCrawl
                    ? learnSay("Отчёт актуален", "Report is current")
                    : learnSay(
                        "Настройки изменены: повторите обход",
                        "Settings changed: rerun crawl",
                      ),
                }),
                ...labPages(project).map((p) => {
                  const r = labRobots(tools.crawlInput.robots, p.path);
                  return i(
                    "p",
                    {
                      className: "lab-report-row",
                      children: [
                        i("code", { children: p.path }),
                        i("span", {
                          children:
                            (r.allowed ? "✓ " : "⛔ ") +
                            learnSay(
                              r.allowed ? "Обход разрешён" : "Обход запрещён",
                              r.allowed ? "Crawl allowed" : "Crawl blocked",
                            ),
                        }),
                      ],
                    },
                    p.path,
                  );
                }),
                labRobots(input.robots, "/").warnings.length
                  ? i("p", {
                      className: "hub-warning",
                      children:
                        learnSay(
                          "Проверьте неподдерживаемые строки: ",
                          "Check unsupported lines: ",
                        ) + labRobots(input.robots, "/").warnings.join("; "),
                    })
                  : null,
              ],
            })
          : null,
        i("h4", {
          children: learnSay(
            "Какие URL включить в sitemap?",
            "Which URLs belong in the sitemap?",
          ),
        }),
        i("div", {
          className: "lab-url-list",
          children: labPages(project).map((p) =>
            i(
              "div",
              {
                children: labToggle(
                  p.path + " · " + p.code + " · " + learnCopy(p.title),
                  input.sitemap.includes(p.path),
                  (v) =>
                    update(
                      "sitemap",
                      v
                        ? [...input.sitemap, p.path]
                        : input.sitemap.filter((path) => path !== p.path),
                    ),
                ),
              },
              p.path,
            ),
          ),
        }),
        labButton(
          learnSay("📄 Собрать и проверить XML", "📄 Build and validate XML"),
          () => action("build"),
        ),
        tools.xml
          ? i("details", {
              children: [
                i("summary", {
                  children:
                    learnSay("Посмотреть XML ", "View XML ") +
                    (tools.xml.signature !== labMapSignature(input)
                      ? learnSay("(устарел)", "(outdated)")
                      : tools.xml.valid
                        ? "✓"
                        : "⚠"),
                }),
                i("pre", {
                  className: "lab-code",
                  children: i("code", { children: tools.xml.xml }),
                }),
              ],
            })
          : null,
      ],
    });
  if (panel === "website")
    content = i("div", {
      children: [
        i("h3", {
          children: learnSay("Редактор учебного сайта", "Training site editor"),
        }),
        i("div", {
          className: "lab-grid",
          children: [
            field("siteStatus", "HTTP сайта", "Site HTTP status", [
              [200, "200 OK"],
              [503, "503 Unavailable"],
            ]),
            field("canonical", "Canonical", "Canonical", [
              ["home", "Все на главную", "All to homepage"],
              ["self", "Каждая на себя", "Self-referencing"],
              ["external", "На другой домен", "Another domain"],
            ]),
            toggle(
              "noindex",
              "Запрет индексации (noindex)",
              "Prevent indexing (noindex)",
            ),
            toggle(
              "mobile",
              "Адаптивная мобильная версия",
              "Responsive mobile layout",
            ),
            number("imageKB", "Изображения, КБ", "Images, KB"),
            number("serverMS", "Ответ сервера, мс", "Server response, ms"),
            number("jsKB", "JavaScript, КБ", "JavaScript, KB"),
            number("depth", "Глубина важных страниц", "Important-page depth"),
            toggle(
              "linked",
              "Добавить внутренние ссылки на все страницы",
              "Link to every page internally",
            ),
            number(
              "coverage",
              "Покрытие нужных тем, %",
              "Relevant topic coverage, %",
            ),
            field("title", "Title посадочной", "Landing-page title"),
            field("description", "Meta description", "Meta description"),
            field(
              "redirect",
              "Редирект старой страницы",
              "Retired-page redirect",
              [
                [301, "301"],
                [302, "302"],
              ],
            ),
            field(
              "redirectTarget",
              "Куда ведёт редирект",
              "Redirect destination",
              [
                ["/", "Главная", "Home"],
                ["/services/main/", "Новая услуга", "New service"],
                ["/missing/", "Несуществующая страница", "Missing page"],
              ],
            ),
            topic === "google-ads"
              ? field("headline", "Заголовок объявления", "Ad headline")
              : null,
            topic === "google-ads"
              ? field("landing", "Посадочная в рекламе", "Ad landing page", [
                  ["/", "Главная", "Home"],
                  [
                    "/services/main/",
                    "Основная посадочная",
                    "Main landing page",
                  ],
                  ["/missing/", "Несуществующая", "Missing page"],
                ])
              : null,
          ],
        }),
        i("p", {
          className: "hub-small",
          children: learnSay(
            "Диапазоны длины title/description — критерии упражнения, не ограничения Google. LCP вычисляется упрощённо из веса ресурсов и ответа сервера.",
            "Title/description lengths are exercise criteria, not Google limits. LCP is simplified from resource weight and server response.",
          ),
        }),
        labButton(
          learnSay("🧪 Проверить URL / DevTools", "🧪 Inspect URL / DevTools"),
          () => action("inspect"),
        ),
      ],
    });
  if (panel === "analytics")
    content = i("div", {
      children: [
        i("h3", {
          children: learnSay(
            "Установка и отладка аналитики",
            "Analytics installation and debugging",
          ),
        }),
        i("p", {
          className: "hub-small",
          children:
            learnSay("ID из брифа: ", "Brief ID: ") +
            "G-DEMO" +
            project.idSuffix +
            learnSay(
              ". Публикация работает только внутри лаборатории, данные никуда не отправляются.",
              ". Publishing is local to this lab; no data is sent anywhere.",
            ),
        }),
        i("div", {
          className: "lab-grid",
          children: [
            field("tag", "Способ установки", "Installation", [
              ["none", "Не установлен", "Not installed"],
              ["gtm", "GTM + Google tag"],
              ["gtag", "Google tag напрямую", "Direct Google tag"],
            ]),
            field("tagId", "GA4 measurement ID", "GA4 measurement ID"),
            field("event", "Имя события", "Event name"),
            field("trigger", "Триггер", "Trigger", [
              ["click", "Любой клик", "Any click"],
              ["form", "Успешная форма", "Successful form"],
              ["page", "Просмотр страницы", "Page view"],
            ]),
            toggle(
              "duplicate",
              "Дополнительный дублирующий тег",
              "Additional duplicate tag",
            ),
            field(
              "consent",
              "Согласие учебного посетителя",
              "Simulated visitor consent",
              [
                ["granted", "Дано", "Granted"],
                ["denied", "Не дано", "Denied"],
              ],
            ),
            field(
              "primary",
              "Основная конверсия Ads",
              "Primary Ads conversion",
              [
                ["page_view", "page_view"],
                ["generate_lead", "generate_lead"],
                ["qualified_lead", "qualified_lead"],
              ],
            ),
            toggle(
              "crm",
              "Импортировать qualified_lead из CRM",
              "Import qualified_lead from CRM",
            ),
            toggle(
              "dedup",
              "Убирать повторы по CRM ID",
              "Deduplicate by CRM ID",
            ),
          ],
        }),
        i("div", {
          className: "lab-actions",
          children: [
            labButton(
              learnSay("Опубликовать учебный тег", "Publish training tag"),
              () => action("publish"),
            ),
            labButton(
              learnSay("Тест: успешная форма", "Test: successful form"),
              () => action("form"),
              true,
            ),
            labButton(
              learnSay("Тест: обычный клик", "Test: normal click"),
              () => action("click"),
              true,
            ),
            labButton(
              learnSay("Тест: просмотр страницы", "Test: page view"),
              () => action("page"),
              true,
            ),
            labButton(
              learnSay("Тест: повторный CRM ID", "Test: repeated CRM ID"),
              () => action("crm"),
              true,
            ),
          ],
        }),
        i("p", {
          className: "hub-small",
          children:
            tools.publishedSignature === labAnalyticsSignature(input)
              ? learnSay(
                  "Текущая конфигурация опубликована.",
                  "Current configuration published.",
                )
              : learnSay(
                  "Есть неопубликованные изменения. Тестируется последняя опубликованная конфигурация.",
                  "There are unpublished changes. Tests use the last published configuration.",
                ),
        }),
        i("h4", { children: "Training DebugView / Network" }),
        ...["form", "click", "page"]
          .filter((kind) => tools[kind])
          .map((kind) =>
            i(
              "div",
              {
                className: "lab-debug",
                children: [
                  i("strong", {
                    children:
                      {
                        form: learnSay("Успешная форма", "Successful form"),
                        click: learnSay("Обычный клик", "Normal click"),
                        page: learnSay("Просмотр страницы", "Page view"),
                      }[kind] +
                      " · " +
                      tools[kind].events.length +
                      learnSay(" событий", " events"),
                  }),
                  i("p", {
                    children:
                      tools[kind].signature === labAnalyticsSignature(input) &&
                      tools[kind].consent === input.consent
                        ? learnSay("Текущие настройки", "Current settings")
                        : learnSay(
                            "Устарело — повторите тест",
                            "Outdated — repeat test",
                          ),
                  }),
                  ...tools[kind].events.map((event, n) =>
                    i(
                      "code",
                      {
                        children:
                          event.name +
                          " → " +
                          event.endpoint +
                          " · " +
                          event.status,
                      },
                      n,
                    ),
                  ),
                  tools[kind].events.length
                    ? null
                    : i("p", {
                        children: learnSay(
                          "Запросов нет. Для обычного клика это ожидаемо; для формы проверьте ID, триггер, публикацию и согласие.",
                          "No requests. This is expected for a normal click; for a form, check ID, trigger, publishing and consent.",
                        ),
                      }),
                ],
              },
              kind,
            ),
          ),
        tools.offline
          ? i("p", {
              className: "lab-debug",
              children:
                "CRM ID demo-42 × 2 → " +
                tools.offline.events +
                " qualified_lead",
            })
          : null,
      ],
    });
  if (panel === "campaign")
    content = i("div", {
      children: [
        i("h3", {
          children: learnSay(
            "Настройки поисковой кампании",
            "Search campaign settings",
          ),
        }),
        i("div", {
          className: "lab-grid",
          children: [
            field("geo", "География", "Geography", [
              ["world", "Весь мир", "Worldwide"],
              ["project", learnCopy(project.city)],
              ["other", "Другой регион", "Another region"],
            ]),
            toggle(
              "presence",
              "Только присутствующие в регионе",
              "People present in the region",
            ),
            field("network", "Сеть", "Network", [
              ["search", "Поиск", "Search"],
              ["display", "Поиск + медийная сеть", "Search + Display"],
            ]),
            field("landing", "Посадочная", "Landing page", [
              ["/", "Главная", "Home"],
              ["/services/main/", "Основная посадочная", "Main landing page"],
              ["/missing/", "Несуществующая", "Missing page"],
            ]),
            field("headline", "Заголовок объявления", "Ad headline"),
            field("match", "Соответствие ключей", "Keyword match", [
              ["broad", "Широкое", "Broad"],
              ["phrase", "Фразовое", "Phrase"],
              ["exact", "Точное", "Exact"],
            ]),
            number(
              "daily",
              "Дневной лимит, ₸ (модель: ×30)",
              "Daily cap, KZT (model: ×30)",
            ),
            number("maxCPC", "Максимальный CPC, ₸", "Maximum CPC, KZT"),
            field("strategy", "Стратегия ставок", "Bidding strategy", [
              ["clicks", "Максимум кликов", "Maximize clicks"],
              ["conversions", "Максимум конверсий", "Maximize conversions"],
              ["tcpa", "Целевая CPA", "Target CPA"],
            ]),
            number("targetCPA", "Целевая CPA, ₸", "Target CPA, KZT"),
            number(
              "days",
              "Период наблюдения, дней",
              "Observation period, days",
            ),
            number(
              "lag",
              "Учитываемый лаг конверсий, дней",
              "Conversion lag allowance, days",
            ),
            field("schedule", "Расписание", "Schedule", [
              ["all", "Круглосуточно", "All day"],
              ["working", "Рабочие часы", "Business hours"],
            ]),
            field("device", "Устройства", "Devices", [
              ["all", "Все", "All"],
              ["mobile", "Мобильные", "Mobile"],
              ["desktop", "Компьютеры", "Desktop"],
            ]),
            number("order", "Средний чек, ₸", "Average order, KZT"),
            number("margin", "Маржа, %", "Margin, %"),
          ],
        }),
        labButton(
          learnSay("▶ Запустить учебную кампанию", "▶ Run training campaign"),
          () => action("run"),
        ),
        i("p", {
          className: "hub-small",
          children: learnSay(
            "График показывает модель на 30 дней; период наблюдения и лаг меняют полноту отчётных конверсий. Ограничение ×30 учебное, реальный биллинг Google Ads отличается.",
            "The chart models 30 days; observation and lag affect reported conversion maturity. The ×30 cap is educational; real Google Ads billing differs.",
          ),
        }),
      ],
    });
  if (panel === "tools")
    content = i("div", {
      children: [
        i("h3", {
          children: learnSay(
            "Учебные инструменты разработчика",
            "Training developer tools",
          ),
        }),
        i(LabField, {
          label:
            learnSay("Токен из брифа для ", "Brief token for ") +
            project.domain,
          value: token,
          onChange: setToken,
        }),
        i("div", {
          className: "lab-actions",
          children: [
            labButton(learnSay("Подтвердить домен", "Verify domain"), () =>
              action("verify"),
            ),
            labButton(
              learnSay(
                "Отправить sitemap в учебную Search Console",
                "Submit sitemap to training Search Console",
              ),
              () => action("submit"),
              true,
            ),
            labButton(
              learnSay("Проверить URL / DevTools", "Inspect URL / DevTools"),
              () => action("inspect"),
              true,
            ),
            topic === "google-ads"
              ? labButton(
                  learnSay(
                    "Запустить учебную кампанию",
                    "Run training campaign",
                  ),
                  () => action("run"),
                )
              : null,
          ],
        }),
        i("p", {
          children:
            learnSay("Домен: ", "Domain: ") +
            (tools.verified ? "✓" : "—") +
            " · sitemap: " +
            (tools.submitted === labMapSignature(input)
              ? learnSay("в очереди", "queued")
              : "—"),
        }),
        i("p", {
          className: "hub-small",
          children: learnSay(
            "Это имитация проверки и очереди, без обращения к Google. Принятие sitemap не означает индексацию.",
            "This simulates validation and a queue without contacting Google. Sitemap acceptance does not imply indexing.",
          ),
        }),
      ],
    });
  return i("div", {
    className: "lab-layout",
    children: [
      i("aside", {
        className: "lab-tasks",
        children: [
          i("h4", { children: learnSay("Задания уровня", "Level tasks") }),
          i("p", {
            className: "hub-small",
            children:
              done.filter((id) => tasks.some((t) => t.id === id)).length +
              " / " +
              tasks.length +
              learnSay(" пройдено", " completed"),
          }),
          ...tasks.map((t) =>
            i(
              "button",
              {
                type: "button",
                "aria-current": task.id === t.id ? "step" : undefined,
                onClick: () => goTask(t.id),
                children: [
                  i("span", { children: learnCopy(t.title) }),
                  done.includes(t.id)
                    ? i("small", {
                        children: "✓",
                        "aria-label": learnSay(
                          "Пройдено ранее",
                          "Previously completed",
                        ),
                      })
                    : null,
                ],
              },
              t.id,
            ),
          ),
        ],
      }),
      i("div", {
        className: "lab-main",
        children: [
          i("header", {
            className: "lab-task-brief",
            children: [
              i("span", {
                className: "hub-kicker",
                children: learnCopy(project.name),
              }),
              i("h3", { children: learnCopy(task.title) }),
              i("p", { children: learnCopy(task.brief) }),
            ],
          }),
          i("div", {
            className: "lab-panel-tabs",
            "aria-label": learnSay("Разделы проекта", "Project sections"),
            children: LAB_PANELS.filter(
              (p) =>
                !(topic === "seo" && p.id === "campaign") &&
                !(topic === "google-ads" && p.id === "files"),
            ).map((p) =>
              i(
                "button",
                {
                  type: "button",
                  "aria-pressed": panel === p.id,
                  onClick: () => {
                    setPanel(p.id);
                    setNotice("");
                  },
                  children: learnCopy(p.label),
                },
                p.id,
              ),
            ),
          }),
          i("section", { className: "lab-panel", children: content }),
          notice
            ? i("p", {
                className: "lab-notice",
                role: "status",
                children: notice,
              })
            : null,
          tools.inspect
            ? i("details", {
                className: "lab-inspection",
                open: panel === "tools",
                children: [
                  i("summary", {
                    children:
                      "DevTools · /services/main/ · " +
                      (currentInspect
                        ? learnSay("актуально", "current")
                        : learnSay("повторите проверку", "recheck required")),
                  }),
                  i("div", {
                    className: "lab-metrics",
                    children: [
                      metric("HTTP", tools.inspect.input.siteStatus),
                      metric(
                        "robots",
                        labRobots(tools.inspect.input.robots, "/services/main/")
                          .allowed
                          ? "Allow"
                          : "Disallow",
                      ),
                      metric("noindex", String(tools.inspect.input.noindex)),
                      metric("canonical", tools.inspect.input.canonical),
                      metric(
                        "LCP",
                        simNumber(labLCP(tools.inspect.input), 2) + " s",
                      ),
                      metric(
                        learnSay("Мобильный", "Mobile"),
                        tools.inspect.input.mobile ? "✓" : "—",
                      ),
                    ],
                  }),
                ],
              })
            : null,
          i("div", {
            className: "lab-check-bar",
            children: [
              labButton(learnSay("Проверить задание", "Check task"), () => {
                setChecked(true);
                if (passed && !done.includes(task.id))
                  setDone([...done, task.id]);
              }),
              i("span", {
                children: learnSay(
                  "Проверяется текущий проект",
                  "Checks the current project",
                ),
              }),
              checked && passed && tasks.indexOf(task) < tasks.length - 1
                ? labButton(
                    learnSay("Следующее задание →", "Next task →"),
                    () => goTask(tasks[tasks.indexOf(task) + 1].id),
                    true,
                  )
                : null,
            ],
          }),
          feedback,
          i("details", {
            className: "lab-results",
            open: panel === "campaign" || panel === "tools",
            children: [
              i("summary", {
                children: learnSay(
                  "📈 Модель результата и динамика",
                  "📈 Outcome model and trend",
                ),
              }),
              i("div", {
                className: "lab-metrics",
                children:
                  topic === "seo"
                    ? [
                        metric(
                          learnSay("Доступно для индексации", "Indexable"),
                          result.indexable + " / 6",
                        ),
                        metric(
                          learnSay("Часы команды", "Team hours"),
                          simNumber(result.hours, 1),
                        ),
                        metric(
                          learnSay("Клики / нед. 12", "Clicks / week 12"),
                          simNumber(result.clicks),
                        ),
                        metric("CTR", simNumber(result.ctr, 1) + "%"),
                      ]
                    : [
                        metric(
                          learnSay("Расход, ₸", "Spend, KZT"),
                          simNumber(result.spend),
                        ),
                        metric(
                          learnSay("Качественные лиды", "Qualified leads"),
                          simNumber(result.quality, 1),
                        ),
                        metric(
                          "CPQL, ₸",
                          Number.isFinite(result.cpql)
                            ? simNumber(result.cpql)
                            : "—",
                        ),
                        metric(
                          learnSay(
                            "Вклад после рекламы, ₸",
                            "Contribution after ads, KZT",
                          ),
                          simNumber(result.profit),
                        ),
                        metric(
                          learnSay(
                            "Заявки: ожидаемые / измеренные",
                            "Leads: expected / measured",
                          ),
                          simNumber(result.leads, 1) +
                            " / " +
                            simNumber(result.measured, 1),
                        ),
                      ],
              }),
              i(SimulatorChart, { topic, result }),
              topic === "google-ads"
                ? i("p", {
                    className: "hub-small",
                    children:
                      tools.run === labSignature(input) &&
                      tools.runAnalytics ===
                        labAnalyticsOK(input, tools, project)
                        ? learnSay(
                            "Кампания запущена с текущей конфигурацией.",
                            "Campaign run matches current settings.",
                          )
                        : learnSay(
                            "Это предварительный расчёт. Для проверки задания нажмите «Запустить учебную кампанию».",
                            "This is a preview. Run the training campaign to validate the task.",
                          ),
                  })
                : null,
            ],
          }),
          i("footer", {
            className: "lab-footer",
            children: [
              i("p", {
                className: "hub-small",
                children: learnSay(
                  "Настройки и отметки заданий сохраняются в этом браузере отдельно для каждого проекта. После перезагрузки отчёты инструментов нужно получить заново. Прохождение заданий не заменяет экзамен курса.",
                  "Settings and task history are saved in this browser per project. Rerun tool reports after a reload. Lab tasks do not replace the course exam.",
                ),
              }),
              storageError
                ? i("p", {
                    role: "alert",
                    children: learnSay(
                      "Браузер не разрешает сохранять лабораторию.",
                      "Your browser cannot save the lab.",
                    ),
                  })
                : null,
              reset
                ? i("div", {
                    className: "lab-actions",
                    children: [
                      labButton(
                        learnSay("Сбросить этот проект", "Reset this project"),
                        () => {
                          setInput(labDefaults(project));
                          setTools({});
                          setDone([]);
                          setChecked(false);
                          setReset(false);
                          setNotice("");
                        },
                      ),
                      labButton(
                        learnSay("Отмена", "Cancel"),
                        () => setReset(false),
                        true,
                      ),
                    ],
                  })
                : labButton(
                    learnSay("Начать проект заново", "Start project over"),
                    () => setReset(true),
                    true,
                  ),
              i("details", {
                children: [
                  i("summary", {
                    children: learnSay(
                      "Документация и ограничения модели",
                      "Documentation and model limits",
                    ),
                  }),
                  i("p", {
                    children: learnSay(
                      "Формулы показывают причинно-следственные связи, а не воспроизводят алгоритмы Google. Широкое и фразовое соответствие в реальной системе учитывают смысл. Дробные результаты — математическое ожидание. Согласие здесь лишь учебный переключатель, не готовая CMP.",
                      "Formulas illustrate relationships rather than reproduce Google algorithms. Real broad and phrase matching consider meaning. Fractions are expected values. Consent is an exercise switch, not a production CMP.",
                    ),
                  }),
                  i("ul", {
                    children: [
                      [
                        "robots.txt",
                        "https://developers.google.com/search/docs/crawling-indexing/robots/intro",
                      ],
                      [
                        "Sitemaps",
                        "https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap",
                      ],
                      [
                        "GA4 DebugView",
                        "https://support.google.com/analytics/answer/7201382",
                      ],
                      [
                        "Google Ads match types",
                        "https://support.google.com/google-ads/answer/7478529",
                      ],
                    ].map(([label, href]) =>
                      i(
                        "li",
                        {
                          children: i("a", {
                            href,
                            target: "_blank",
                            rel: "noopener noreferrer",
                            children: label + " ↗",
                          }),
                        },
                        label,
                      ),
                    ),
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
    ],
  });
}
