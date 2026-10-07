function SocialSubscribe() {
  return i("section", {
    className: "social-subscribe",
    children: [
      i("div", {
        children: [
          i("span", {
            className: "section-eyebrow",
            children: learnSay("ПРОДОЛЖИМ ОБЩЕНИЕ", "STAY IN TOUCH"),
          }),
          i("h2", {
            children: learnSay(
              "Полезное можно забрать. За новым — в соцсети.",
              "Take the resources. Follow along for more.",
            ),
          }),
          i("p", {
            children: learnSay(
              "Материалы скачиваются бесплатно, без регистрации. Подписывайтесь, если хотите следить за моими публикациями — это добровольно.",
              "Downloads are free, with no registration. Follow my profiles if you would like to keep up with my posts; it is optional.",
            ),
          }),
        ],
      }),
      i("div", {
        className: "subscribe-links",
        children: COMMUNITY_LINKS.map((link) =>
          i(
            "a",
            {
              href: link.url,
              target: "_blank",
              "data-outbound": "resource-subscribe-" + link.id,
              children: [
                i("span", { "aria-hidden": true, children: link.icon }),
                i("span", {
                  children: [
                    i("strong", { children: link.label }),
                    i("small", { children: link.handle }),
                  ],
                }),
                "↗",
              ],
            },
            link.id,
          ),
        ),
      }),
    ],
  });
}
function ResourceCard({ resource }) {
  return i("article", {
    className: "resource-card",
    children: [
      i("div", {
        className: "resource-card-top",
        children: [
          i("span", {
            className: "resource-icon",
            "aria-hidden": true,
            children: resource.icon,
          }),
          i("span", {
            className: "hub-kicker",
            children: resource.format + " · RU / EN",
          }),
        ],
      }),
      i("h3", {
        children: i("a", {
          href: hubLink("material.html", "resource", resource.id),
          children: learnCopy(resource.title),
        }),
      }),
      i("p", { children: learnCopy(resource.description) }),
      i("a", {
        className: "hub-inline-link",
        href: hubLink("material.html", "resource", resource.id),
        children: learnSay("Что внутри и скачать →", "Preview & download →"),
      }),
    ],
  });
}
function MaterialsPage() {
  const [type, setType] = le.useState("all");
  const [query, setQuery] = le.useState("");
  const resources = RESOURCES.filter(
    (resource) =>
      (type === "all" || type === resource.type) &&
      (learnCopy(resource.title) + " " + learnCopy(resource.description))
        .toLocaleLowerCase()
        .includes(query.toLocaleLowerCase().trim()),
  );
  return i("main", {
    id: "main-content",
    className: "page-container hub-page",
    children: [
      i(HubHeading, {
        eyebrow: learnSay(
          "БИБЛИОТЕКА / БЕРИТЕ В РАБОТУ",
          "LIBRARY / READY TO USE",
        ),
        title: learnSay(
          "Меньше чистого листа. Больше ясности.",
          "Less blank-page time. More clarity.",
        ),
        text: learnSay(
          "Чек-листы для проверки и редактируемые шаблоны для работы с клиентами. Скачивайте, заполняйте и адаптируйте под свой проект.",
          "Checklists for reviews and editable templates for client work. Download, fill in and adapt to your project.",
        ),
      }),
      i("div", {
        className: "hub-toolbar",
        children: [
          i("div", {
            className: "hub-filters",
            "aria-label": learnSay("Тип материала", "Resource type"),
            children: [
              ["all", learnSay("Все", "All")],
              ["checklist", learnSay("Чек-листы", "Checklists")],
              ["brief", learnSay("Брифы", "Briefs")],
              ["report", learnSay("Отчёты", "Reports")],
            ].map(([value, label]) =>
              i(
                "button",
                {
                  type: "button",
                  "aria-pressed": type === value,
                  onClick: () => setType(value),
                  children: label,
                },
                value,
              ),
            ),
          }),
          i("label", {
            className: "hub-search",
            children: [
              i("span", {
                children: learnSay("Поиск материалов", "Search resources"),
              }),
              i("input", {
                type: "search",
                value: query,
                placeholder: learnSay("Например, SEO", "For example, SEO"),
                onChange: (event) => setQuery(event.target.value),
              }),
            ],
          }),
        ],
      }),
      i("p", {
        className: "hub-small",
        role: "status",
        children: learnSay("Найдено: ", "Found: ") + resources.length,
      }),
      resources.length
        ? i("div", {
            className: "hub-grid three",
            children: resources.map((resource) =>
              i(ResourceCard, { resource }, resource.id),
            ),
          })
        : i("p", {
            className: "hub-empty",
            children: learnSay(
              "Материалов по этому запросу нет. Измените поиск или фильтр.",
              "No resources match. Try another search or filter.",
            ),
          }),
      i(SocialSubscribe, {}),
    ],
  });
}
function MaterialPage() {
  const resource = RESOURCES.find(
    (item) => item.id === new URLSearchParams(location.search).get("resource"),
  );
  if (!resource)
    return i(HubMissing, {
      title: learnSay("Библиотека материалов", "Resource library"),
      file: "materials.html",
    });
  const course = COURSES.find((item) => item.id === resource.courseId);
  return i("main", {
    id: "main-content",
    className: "page-container hub-page",
    children: [
      i("a", {
        className: "back-link",
        href: pageLink("materials.html"),
        children: learnSay("← Все материалы", "← All resources"),
      }),
      i("div", {
        className: "material-layout",
        children: [
          i("div", {
            children: [
              i(HubHeading, {
                eyebrow:
                  resource.format +
                  " / " +
                  learnSay("БЕСПЛАТНЫЙ МАТЕРИАЛ", "FREE RESOURCE"),
                title: learnCopy(resource.title),
                text: learnCopy(resource.description),
              }),
              i("h2", {
                children: learnSay("Внутри документа", "Inside the document"),
              }),
              hubList(resource.contents),
              i("h2", {
                children: learnSay("Как использовать", "How to use it"),
              }),
              i("p", { children: learnCopy(resource.use) }),
              i("p", {
                className: "hub-small",
                children: learnSay(
                  "Версия 1.0 · октябрь 2026. Шаблон — отправная точка, а не готовый аудит или обещание результата. Можно использовать и адаптировать в своих проектах.",
                  "Version 1.0 · October 2026. This is a starting point, not a completed audit or a performance promise. You may use and adapt it for your own projects.",
                ),
              }),
            ],
          }),
          i("aside", {
            className: "resource-download",
            children: [
              i("div", {
                className: "document-preview",
                "aria-hidden": true,
                children: [
                  i("span", { children: "ADS BY KANAPIYA" }),
                  i("strong", { children: learnCopy(resource.title) }),
                  ...[1, 2, 3, 4].map((number) =>
                    i(
                      "div",
                      { className: "document-preview-line", children: "□" },
                      number,
                    ),
                  ),
                  i("small", { children: resource.format }),
                ],
              }),
              i("h2", {
                children: learnSay("Забрать документ", "Download the document"),
              }),
              i("p", {
                children:
                  resource.pages +
                  " " +
                  learnSay(
                    "стр. · Русский и English",
                    "pages · Russian and English",
                  ),
              }),
              ...[currentLanguage, currentLanguage === "ru" ? "en" : "ru"].map(
                (language, index) =>
                  i(
                    "a",
                    {
                      className: "action" + (index ? " action-secondary" : ""),
                      href: resourceFile(resource, language),
                      download: "",
                      children:
                        learnSay("Скачать ", "Download ") +
                        resource.format +
                        " · " +
                        language.toUpperCase() +
                        " ↓",
                    },
                    language,
                  ),
              ),
              i("small", {
                children:
                  resource.format === "PDF"
                    ? learnSay(
                        "Для печати и проверки по пунктам",
                        "For printing and checklist reviews",
                      )
                    : learnSay(
                        "Редактируется в Word и Google Docs",
                        "Editable in Word and Google Docs",
                      ),
              }),
            ],
          }),
        ],
      }),
      course &&
        i("section", {
          className: "hub-feature",
          children: [
            i("h2", { children: learnSay("Разобраться глубже", "Go deeper") }),
            i("p", { children: learnCopy(course.short) }),
            hubButton(learnCopy(course.title) + " →", courseLink(course), true),
          ],
        }),
      i(SocialSubscribe, {}),
    ],
  });
}
