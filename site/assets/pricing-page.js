/* One table built from the same catalog and manually maintained prices. */
function priceCatalogRows() {
  return tu.flatMap((service) =>
    service.pricing.map((pkg) => ({
      id: service.id + ":" + pkg.pkg,
      service,
      pkg,
      prices: servicePrices(service.id, pkg.pkg),
    })),
  );
}
function filteredPriceRows({
  query = "",
  category = "all",
  priceType = "all",
  sort = "catalog",
} = {}) {
  const terms = query.toLocaleLowerCase().trim().split(/\s+/).filter(Boolean);
  const rows = priceCatalogRows().filter((row) => {
    if (category !== "all" && row.service.category !== category) return false;
    const fixed = Number.isFinite(row.prices?.[currentCurrency]);
    if ((priceType === "fixed" && !fixed) || (priceType === "request" && fixed))
      return false;
    const text = [
      row.service.title,
      row.service.id,
      row.pkg.pkg,
      row.pkg.bestFor,
    ]
      .flatMap((value) => [value, window.RU[value] || ""])
      .join(" ")
      .toLocaleLowerCase();
    return terms.every((term) => text.includes(term));
  });
  if (sort !== "catalog")
    rows.sort((a, b) => {
      const av = a.prices?.[currentCurrency],
        bv = b.prices?.[currentCurrency];
      const af = Number.isFinite(av),
        bf = Number.isFinite(bv);
      if (af !== bf) return af ? -1 : 1;
      if (!af) return 0;
      return sort === "ascending" ? av - bv : bv - av;
    });
  return rows;
}
function PricingPage() {
  const [filters, setFilters] = le.useState({
    query: "",
    category: "all",
    priceType: "all",
    sort: "catalog",
  });
  const [page, setPage] = le.useState(0);
  const rows = filteredPriceRows(filters),
    size = 12;
  const pages = Math.max(1, Math.ceil(rows.length / size)),
    currentPage = Math.min(page, pages - 1);
  const visible = rows.slice(currentPage * size, (currentPage + 1) * size);
  const goToPage = (next) => {
    setPage(next);
    requestAnimationFrame(() =>
      document
        .querySelector(".price-table-scroll")
        ?.scrollIntoView({
          block: "start",
          behavior: window.matchMedia("(prefers-reduced-motion: reduce)")
            .matches
            ? "instant"
            : "smooth",
        }),
    );
  };
  const change = (key, value) => {
    setFilters((previous) => ({ ...previous, [key]: value }));
    setPage(0);
  };
  const reset = () => {
    setFilters({
      query: "",
      category: "all",
      priceType: "all",
      sort: "catalog",
    });
    setPage(0);
  };
  const select = (label, key, options) =>
    i("label", {
      className: "price-filter",
      children: [
        i("span", { children: label }),
        i("select", {
          "aria-label": translateText(label),
          value: filters[key],
          onChange: (event) => change(key, event.target.value),
          children: options.map(([value, text]) =>
            i("option", { value, children: text }, value),
          ),
        }),
      ],
    });
  const countText =
    currentLanguage === "ru"
      ? `Найдено пакетов: ${rows.length}`
      : `Packages found: ${rows.length}`;
  return i("div", {
    className: "price-directory",
    children: [
      i("section", {
        className: "page-container price-directory-intro",
        children: [
          i("a", {
            className: "back-link",
            href: pageLink("index.html"),
            children: "Back to home",
          }),
          i("span", { className: "section-eyebrow", children: "PRICE LIST" }),
          i("div", {
            className: "price-directory-heading",
            children: [
              i("div", {
                children: [
                  i("h1", { children: "Service pricing" }),
                  i("p", {
                    children:
                      "Compare packages, timelines and prices. Find the right scope for your project.",
                  }),
                ],
              }),
              i(CurrencySelector, {}),
            ],
          }),
        ],
      }),
      i("section", {
        className: "page-container price-directory-body",
        "aria-label": translateText("Price list"),
        children: [
          i("div", {
            className: "price-filters",
            children: [
              i("label", {
                className: "price-filter price-search",
                children: [
                  i("span", { children: "Search services" }),
                  i("input", {
                    type: "search",
                    value: filters.query,
                    placeholder: translateText("SEO, WordPress, audit…"),
                    onChange: (event) => change("query", event.target.value),
                  }),
                ],
              }),
              select("Service category", "category", window.SERVICE_CATEGORIES),
              select("Price type", "priceType", [
                ["all", "Any price"],
                ["fixed", "Published price"],
                ["request", "By agreement"],
              ]),
              select("Sort by", "sort", [
                ["catalog", "Catalog order"],
                ["ascending", "Price: low to high"],
                ["descending", "Price: high to low"],
              ]),
            ],
          }),
          i("div", {
            className: "price-results-meta",
            children: [
              i("span", {
                role: "status",
                "aria-live": "polite",
                children: countText,
              }),
              i("button", {
                type: "button",
                onClick: reset,
                disabled:
                  !filters.query &&
                  filters.category === "all" &&
                  filters.priceType === "all" &&
                  filters.sort === "catalog",
                children: "Reset filters",
              }),
            ],
          }),
          rows.length
            ? i("div", {
                className: "price-table-scroll",
                tabIndex: 0,
                role: "region",
                "aria-label": translateText("Service packages and prices"),
                children: i("table", {
                  className: "price-directory-table",
                  children: [
                    i("caption", {
                      className: "visually-hidden",
                      children: "Service packages and prices",
                    }),
                    i("thead", {
                      children: i("tr", {
                        children: [
                          "Service",
                          "Package / scope",
                          "Timeline",
                          "Price",
                          "",
                        ].map((label, index) =>
                          i(
                            "th",
                            {
                              scope: "col",
                              children:
                                label ||
                                i("span", {
                                  className: "visually-hidden",
                                  children: "Service details",
                                }),
                            },
                            index,
                          ),
                        ),
                      }),
                    }),
                    i("tbody", {
                      children: visible.map((row) =>
                        i(
                          "tr",
                          {
                            children: [
                              i("th", {
                                scope: "row",
                                children: i("a", {
                                  className: "price-service-title",
                                  href: detailLink("service", row.service.id),
                                  children: [
                                    i("span", {
                                      "aria-hidden": true,
                                      children: row.service.emoji,
                                    }),
                                    translateText(row.service.title),
                                  ],
                                }),
                              }),
                              i("td", {
                                children: [
                                  i("strong", { children: row.pkg.pkg }),
                                  i("small", { children: row.pkg.bestFor }),
                                ],
                              }),
                              i("td", {
                                className: "price-timeline",
                                children: row.pkg.timeline,
                              }),
                              i("td", {
                                className:
                                  "price-amount" +
                                  (Number.isFinite(
                                    row.prices?.[currentCurrency],
                                  )
                                    ? ""
                                    : " price-on-request"),
                                children: priceText(row.prices),
                              }),
                              i("td", {
                                children: i("a", {
                                  className: "price-detail-link",
                                  href: detailLink("service", row.service.id),
                                  "aria-label":
                                    translateText("Service details") +
                                    ": " +
                                    translateText(row.service.title),
                                  children: "Details ↗",
                                }),
                              }),
                            ],
                          },
                          row.id,
                        ),
                      ),
                    }),
                  ],
                }),
              })
            : i("div", {
                className: "price-empty",
                children: [
                  i("h2", { children: "No matching packages" }),
                  i("p", {
                    children: "Try another search or reset the filters.",
                  }),
                  i("button", {
                    type: "button",
                    className: "action action-secondary",
                    onClick: reset,
                    children: "Reset filters",
                  }),
                ],
              }),
          rows.length
            ? i("nav", {
                className: "price-pagination",
                "aria-label": translateText("Price list pages"),
                children: [
                  i("button", {
                    type: "button",
                    disabled: currentPage === 0,
                    onClick: () => goToPage(currentPage - 1),
                    "aria-label": translateText("Previous page"),
                    children: "←",
                  }),
                  i("span", {
                    children:
                      currentLanguage === "ru"
                        ? `Страница ${currentPage + 1} из ${pages}`
                        : `Page ${currentPage + 1} of ${pages}`,
                  }),
                  i("button", {
                    type: "button",
                    disabled: currentPage === pages - 1,
                    onClick: () => goToPage(currentPage + 1),
                    "aria-label": translateText("Next page"),
                    children: "→",
                  }),
                ],
              })
            : null,
          i("div", {
            className: "price-directory-notes",
            children: [
              i("p", {
                children: "Prices are set separately for each currency.",
              }),
              i("p", {
                children:
                  "Advertising spend is separate. The final scope and price are agreed before work starts.",
              }),
              i("p", {
                children:
                  "Percentage fees shown next to a price are additional to the base fee. Packages with no fixed amount are quoted individually.",
              }),
            ],
          }),
          i("div", {
            className: "price-directory-contact",
            children: [
              i("p", { children: "Not sure which package to choose?" }),
              i(Action, { href: inquiryLink(), children: "Discuss the task" }),
            ],
          }),
        ],
      }),
    ],
  });
}
Object.assign(window.RU, {
  "By agreement": "По запросу",
  "PRICE LIST": "ПРАЙС-ЛИСТ",
  "Price list": "Прайс-лист",
  "Service pricing": "Цены на услуги",
  "Compare packages, timelines and prices. Find the right scope for your project.":
    "Сравните пакеты, сроки и стоимость. Выберите подходящий объём работ.",
  "Search services": "Поиск услуг",
  "SEO, WordPress, audit…": "SEO, WordPress, аудит…",
  "Service category": "Направление",
  "Price type": "Тип цены",
  "Any price": "Любая цена",
  "Published price": "С указанной ценой",
  "Sort by": "Сортировка",
  "Catalog order": "По порядку",
  "Price: low to high": "Сначала дешевле",
  "Price: high to low": "Сначала дороже",
  "Reset filters": "Сбросить фильтры",
  "Service packages and prices": "Пакеты услуг и стоимость",
  Service: "Услуга",
  "Package / scope": "Пакет / состав работ",
  Price: "Стоимость",
  "Service details": "Подробнее об услуге",
  "Details ↗": "Подробнее ↗",
  "No matching packages": "Подходящих пакетов не найдено",
  "Try another search or reset the filters.":
    "Измените запрос или сбросьте фильтры.",
  "Price list pages": "Страницы прайс-листа",
  "Previous page": "Предыдущая страница",
  "Next page": "Следующая страница",
  "Percentage fees shown next to a price are additional to the base fee. Packages with no fixed amount are quoted individually.":
    "Процент рядом с ценой добавляется к базовой стоимости. Пакеты без фиксированной суммы рассчитываются индивидуально.",
  "Not sure which package to choose?": "Не знаете, какой пакет выбрать?",
  "View the full price list ↗": "Все цены в таблице ↗",
});
