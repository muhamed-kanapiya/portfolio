/* Project-specific additions to the original React layout. */
let currentLanguage = "ru";
try {
  const requested = new URLSearchParams(location.search).get("lang");
  const saved = localStorage.getItem("portfolio-language");
  currentLanguage = ["ru", "en"].includes(requested)
    ? requested
    : saved === "en"
      ? "en"
      : "ru";
} catch {
  /* Storage may be disabled. Russian remains the default. */
}

function translateText(text) {
  if (typeof text !== "string") return text;
  const trimmed = text.trim();
  const translated =
    currentLanguage === "ru"
      ? (window.RU?.[text] ?? window.RU?.[trimmed])
      : undefined;
  return (translated !== undefined ? text.replace(trimmed, translated) : text)
    .replace(/\bArman\b/g, "Kanapiya")
    .replace(/Арман/g, "Канапия");
}

function translateChildren(children) {
  if (typeof children === "string") return translateText(children);
  if (Array.isArray(children)) return children.map(translateChildren);
  return children;
}

function pageLink(file) {
  return file + (currentLanguage === "en" ? "?lang=en" : "?lang=ru");
}

function isClientsPage() {
  return location.pathname.endsWith("/clients.html");
}

function readRoute() {
  const segments = location.hash.slice(1).split("/").filter(Boolean);
  const file = location.pathname.split("/").pop();
  return {
    page:
      segments[0] === "services"
        ? segments[1]
          ? "service"
          : "services-index"
        : segments[0] === "cases"
          ? segments[1]
            ? "case"
            : "cases-index"
          : isClientsPage()
            ? "clients"
            : file === "services.html"
              ? "services-index"
              : file === "cases.html"
                ? "cases-index"
                : file === "pricing.html"
                  ? "pricing"
                  : "home",
    service:
      segments[0] === "services" ? segments[1] || "search-ads" : "search-ads",
    caseId: segments[0] === "cases" ? segments[1] || "ecom-us" : "ecom-us",
  };
}

function contactLink(subject = "") {
  return pageLink("index.html") + "#contact";
}

// Keep the destination, existing query values and hash; only add attribution.
function outboundUrl(value, content) {
  if (typeof value !== "string" || !/^https?:\/\//i.test(value)) return value;
  try {
    const url = new URL(value);
    if (url.origin === location.origin) return value;
    const utm = window.PORTFOLIO.outboundUtm || {};
    url.searchParams.set("utm_source", utm.source || "ads_by_kanapiya");
    url.searchParams.set("utm_medium", utm.medium || "referral");
    url.searchParams.set("utm_campaign", utm.campaign || "portfolio");
    if (content || !url.searchParams.has("utm_content"))
      url.searchParams.set("utm_content", content || "website-link");
    return url.href;
  } catch {
    return value;
  }
}

function localizedElement(type, props, key) {
  const next = { ...props };
  if (type !== "style" && type !== "script")
    next.children = translateChildren(next.children);
  for (const name of ["title", "aria-label", "placeholder", "alt"])
    if (next[name]) next[name] = translateText(next[name]);
  if (typeof next.href === "string") {
    if (next.href.startsWith("mailto:")) {
      const subject =
        new URLSearchParams(next.href.split("?")[1]).get("subject") || "";
      next.href = contactLink(translateText(subject));
    } else if (next.href.includes("t.me/yourhandle")) {
      next.href = window.PORTFOLIO.telegram
        ? "https://t.me/" + window.PORTFOLIO.telegram.replace(/^@/, "")
        : null;
    } else if (next.href.includes("wa.me/77000000000")) {
      next.href = window.PORTFOLIO.whatsapp
        ? "https://wa.me/" + window.PORTFOLIO.whatsapp.replace(/\D/g, "")
        : null;
    } else if (
      /^https:\/\/(www\.)?(linkedin\.com|contra\.com|upwork\.com)\/?$/.test(
        next.href,
      )
    ) {
      const platform = next.href.includes("linkedin")
        ? "linkedin"
        : next.href.includes("contra")
          ? "contra"
          : "upwork";
      next.href = window.PORTFOLIO[platform] || null;
    }
    if (!next.href) {
      type = "span";
      delete next.target;
      next.className = (next.className || "") + " unavailable-contact";
    } else if (/^https?:\/\//i.test(next.href)) {
      next.href = outboundUrl(next.href, next["data-outbound"]);
      next.rel = "noopener noreferrer";
    }
  }
  return hs(type, next, key);
}
i = localizedElement;
c = localizedElement;

function setLanguage(language) {
  currentLanguage = language;
  try {
    localStorage.setItem("portfolio-language", language);
  } catch {
    /* Optional preference. */
  }
  const url = new URL(location.href);
  url.searchParams.set("lang", language);
  history.replaceState(null, "", url);
  window.dispatchEvent(new Event("languagechange"));
}

function LanguageSwitch() {
  return i("div", {
    className: "language-switch",
    role: "group",
    "aria-label": translateText("Site language"),
    children: ["ru", "en"].map((language) =>
      i(
        "button",
        {
          type: "button",
          lang: language,
          "aria-label": language === "ru" ? "Русский" : "English",
          "aria-pressed": currentLanguage === language,
          onClick: () => setLanguage(language),
          children: language.toUpperCase(),
        },
        language,
      ),
    ),
  });
}

function validClientUrl(value) {
  try {
    const url = new URL(value);
    return ["https:", "http:"].includes(url.protocol) ? url.href : null;
  } catch {
    return null;
  }
}

function clientHoverMode() {
  return window.matchMedia(
    "(hover: hover) and (pointer: fine) and (min-width: 769px)",
  ).matches;
}
function ClientCard({ client }) {
  const [broken, setBroken] = le.useState(false);
  const [expanded, setExpanded] = le.useState(false);
  const records = casesForClient(client.id);
  const panelId = "client-cases-" + client.id;
  const href = validClientUrl(client.url);
  const initials = client.name
    .split(/[\s.-]+/)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
  return i(
    "article",
    {
      id: "client-" + client.id,
      tabIndex: records.length ? 0 : undefined,
      "aria-label": client.name,
      className:
        "client-card linked-client" + (expanded ? " client-expanded" : ""),
      onMouseEnter: () => {
        if (clientHoverMode()) setExpanded(true);
      },
      onMouseLeave: (event) => {
        if (!(
          event.currentTarget.contains(document.activeElement) &&
          document.activeElement?.matches(":focus-visible")
        ))
          setExpanded(false);
      },
      onFocus: (event) => {
        if (clientHoverMode() && event.target.matches(":focus-visible"))
          setExpanded(true);
      },
      onKeyDown: (event) => {
        if (event.key === "Escape") {
          event.currentTarget.focus();
          setExpanded(false);
        }
      },
      onBlur: (event) => {
        if (!event.currentTarget.contains(event.relatedTarget))
          setExpanded(false);
      },
      children: [
        i("div", {
          className:
            "client-logo" +
            (client.logoDark && !broken ? " client-logo-dark" : ""),
          children:
            client.logo && !broken
              ? i("img", {
                  src: client.logo,
                  alt: client.name,
                  loading: "lazy",
                  width: 180,
                  height: 72,
                  onError: () => setBroken(true),
                })
              : i("span", {
                  className: "client-monogram",
                  style: { background: client.color },
                  "aria-hidden": true,
                  children: initials,
                }),
        }),
        i("h3", { children: client.name }),
        i("div", {
          className: "client-card-actions",
          children: [
            records.length
              ? i("span", {
                  className: "client-hover-label",
                  "aria-hidden": true,
                  children: [translateText("Cases"), " · ", records.length],
                })
              : null,
            records.length
              ? i("button", {
                  type: "button",
                  className: "client-cases-toggle",
                  "aria-expanded": expanded,
                  "aria-controls": panelId,
                  onClick: () => {
                    if (!clientHoverMode()) setExpanded((value) => !value);
                  },
                  children: [
                    i("span", { children: "Cases" }),
                    i("span", {
                      "aria-hidden": true,
                      children: expanded ? "−" : "+",
                    }),
                  ],
                })
              : null,
            href
              ? i("a", {
                  href,
                  target: "_blank",
                  className: "client-site-link",
                  "data-outbound": "client-" + client.id,
                  "aria-label":
                    translateText("Client website") + ": " + client.name,
                  children: "Website ↗",
                })
              : null,
          ],
        }),
        records.length
          ? i("div", {
              id: panelId,
              className: "client-case-panel",
              hidden: !expanded,
              children: [
                i("div", {
                  className: "client-case-tags",
                  children: records.map((record) =>
                    i(
                      "a",
                      {
                        href: detailLink("case", record.id),
                        "aria-label":
                          caseCategoryLabel(record) +
                          " — " +
                          translateText(record.title),
                        children: [caseCategoryLabel(record), " ↗"],
                      },
                      record.id,
                    ),
                  ),
                }),
              ],
            })
          : null,
      ],
    },
    client.id || client.name,
  );
}

function ProjectCard() {
  return i("a", {
    className: "client-card project-card",
    href: contactLink(translateText("New project")),
    children: [
      i("div", {
        className: "project-logo",
        "aria-hidden": true,
        children: "+",
      }),
      i("h3", { children: "Your project" }),
      i("span", { className: "project-invite", children: "Discuss the task" }),
    ],
  });
}

function ClientsSection() {
  const clients = window.CLIENTS.filter((client) => client.featured).slice(
    0,
    window.PORTFOLIO.featuredClientsLimit || 9,
  );
  return i("section", {
    id: "clients",
    className: "clients-section",
    children: [
      i("div", { className: "section-eyebrow", children: "SELECTED PROJECTS" }),
      i("div", {
        className: "clients-heading",
        children: [
          i("h2", { children: "Projects and clients" }),
          i("a", {
            className: "clients-link",
            href: pageLink("clients.html"),
            children: "All clients",
          }),
        ],
      }),
      i("div", {
        className: "clients-grid",
        children: [
          i(ProjectCard, {}),
          ...clients.map((client) =>
            i(ClientCard, { client }, client.id || client.name),
          ),
          clients.length
            ? null
            : i("div", {
                className: "clients-empty-inline",
                children: [
                  i("p", {
                    className: "serif",
                    children: "Every project starts with a conversation.",
                  }),
                  i("span", {
                    children: "The client list will be published soon.",
                  }),
                ],
              }),
        ],
      }),
    ],
  });
}

function ClientsPage() {
  return i("div", {
    id: "main-content",
    tabIndex: -1,
    className: "clients-page",
    children: [
      i("section", {
        className: "clients-page-intro",
        children: [
          i("a", {
            className: "back-link",
            href: pageLink("index.html"),
            children: "Back to home",
          }),
          i("div", {
            className: "section-eyebrow",
            children: "PROJECTS & PARTNERSHIPS",
          }),
          i("h1", {
            children: [
              "All ",
              i("span", { className: "serif", children: "clients." }),
            ],
          }),
          i("p", { children: "Businesses and teams I work with." }),
        ],
      }),
      i("section", {
        className: "clients-section clients-page-list",
        "aria-label": translateText("Client list"),
        children: [
          i("div", {
            className: "clients-grid",
            children: [
              i(ProjectCard, {}),
              ...window.CLIENTS.map((client) =>
                i(ClientCard, { client }, client.id || client.name),
              ),
            ],
          }),
          window.CLIENTS.length
            ? null
            : i("div", {
                className: "clients-empty",
                children: [
                  i("h2", {
                    children: "The client list will be published soon.",
                  }),
                  i("p", {
                    children:
                      "In the meantime, explore the services and case studies.",
                  }),
                  i("a", {
                    className: "clients-link",
                    href: pageLink("index.html") + "#services",
                    children: "View services",
                  }),
                ],
              }),
        ],
      }),
    ],
  });
}

function PortfolioRoot() {
  const [language, updateLanguage] = le.useState(currentLanguage);
  const [currency, updateCurrency] = le.useState(currentCurrency);
  le.useEffect(() => {
    const sync = () => updateLanguage(currentLanguage);
    const syncCurrency = () => updateCurrency(currentCurrency);
    const syncHistory = () => {
      const language = new URLSearchParams(location.search).get("lang");
      if (language === "ru" || language === "en") {
        currentLanguage = language;
        updateLanguage(language);
      }
    };
    window.addEventListener("languagechange", sync);
    window.addEventListener("currencychange", syncCurrency);
    window.addEventListener("popstate", syncHistory);
    return () => {
      window.removeEventListener("languagechange", sync);
      window.removeEventListener("currencychange", syncCurrency);
      window.removeEventListener("popstate", syncHistory);
    };
  }, []);
  le.useEffect(() => {
    document.documentElement.lang = language;
    const updateMetadata = () => {
      const route = readRoute();
      let title = translateText("Google Ads, SEO and web development");
      if (route.page === "clients") title = translateText("All clients");
      if (route.page === "services-index")
        title = translateText("All services");
      if (route.page === "cases-index")
        title = translateText("All case studies");
      if (route.page === "pricing") title = translateText("Service pricing");
      if (route.page === "service")
        title = translateText(
          tu.find((item) => item.id === route.service)?.title || "Services",
        );
      if (route.page === "case")
        title = translateText(visibleCase(route.caseId)?.title || "Cases");
      document.title = title + " — " + window.PORTFOLIO.name;
      document.querySelector('meta[name="description"]').content =
        translateText(
          "Google Ads, SEO, GA4 / GTM and web development. Services, case studies and clients.",
        );
    };
    updateMetadata();
    window.addEventListener("hashchange", updateMetadata);
    return () => window.removeEventListener("hashchange", updateMetadata);
  }, [language]);
  return i(Ni, { language, currency });
}

function ContactAction() {
  const available =
    window.PORTFOLIO.email ||
    window.PORTFOLIO.telegram ||
    window.PORTFOLIO.calendly;
  return i(available ? "a" : "p", {
    className: available ? "contact-action" : "contact-pending",
    ...(available
      ? {
          href:
            window.PORTFOLIO.calendly ||
            contactLink(translateText("New project")),
        }
      : {}),
    children: available
      ? "Discuss your project"
      : "Contact details coming soon",
  });
}
