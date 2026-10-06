/* Shared navigation. Blog previews deliberately have no links in this menu. */
const MEGA_GROUPS = [
  {
    title: "Advertising",
    emoji: "📣",
    ids: [
      "google-ads",
      "meta-ads",
      "search-ads",
      "pmax",
      "shopping-pmax",
      "youtube",
    ],
  },
  {
    title: "Search & measurement",
    emoji: "🔎",
    ids: ["seo", "tracking", "cro", "aeo-geo-ai"],
  },
  {
    title: "Web development",
    emoji: "💻",
    ids: [
      "web-development",
      "wordpress",
      "tilda",
      "shopify",
      "insales",
      "react",
      "html-css-js",
      "website-repair",
    ],
  },
  {
    title: "Automation & learning",
    emoji: "⚙️",
    ids: ["crm-integrations", "python", "python-scraping", "training"],
  },
];
function MegaServiceGroup({ group, mobile, onNavigate }) {
  const heading = [
    i("span", { "aria-hidden": true, children: group.emoji }),
    group.title,
  ];
  const items = group.ids
    .map((id) => tu.find((item) => item.id === id))
    .filter(Boolean);
  return i(mobile ? "details" : "section", {
    className: "mega-group",
    children: [
      i(mobile ? "summary" : "h3", { children: heading }),
      i("ul", {
        children: items.map((service) =>
          i(
            "li",
            {
              children: i("a", {
                href: detailLink("service", service.id),
                onClick: onNavigate,
                children: [
                  i("span", {
                    className: "mega-emoji",
                    "aria-hidden": true,
                    children: service.emoji,
                  }),
                  i("span", { children: service.title }),
                ],
              }),
            },
            service.id,
          ),
        ),
      }),
    ],
  });
}
function MegaHeader() {
  const [open, setOpen] = le.useState("");
  const root = le.useRef(null),
    serviceTrigger = le.useRef(null),
    mobileTrigger = le.useRef(null);
  const close = () => setOpen("");
  le.useEffect(() => {
    if (!open) return;
    const onKey = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        (open === "mobile" ? mobileTrigger : serviceTrigger).current?.focus();
        close();
      }
    };
    const outside = (event) => {
      if (!root.current?.contains(event.target)) close();
    };
    const media = window.matchMedia("(max-width: 1100px)");
    const resize = () => close();
    const overflow = document.body.style.overflow;
    if (open === "mobile") document.body.style.overflow = "hidden";
    document.addEventListener("pointerdown", outside);
    window.addEventListener("keydown", onKey);
    window.addEventListener("hashchange", close);
    media.addEventListener("change", resize);
    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener("pointerdown", outside);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("hashchange", close);
      media.removeEventListener("change", resize);
    };
  }, [open]);
  const route = readRoute().page;
  const links = [
    ...(publishedCases().length
      ? [["📁", "Case studies", "cases.html", ["case", "cases-index"]]]
      : []),
    ["🤝", "Clients", "clients.html", ["clients"]],
    ["💳", "Pricing", "pricing.html", ["pricing"]],
    ["⭐", "Reviews", "reviews.html", ["reviews"]],
    ["👋", "About me", "about.html", ["about"]],
  ];
  const navLinks = () =>
    links.map(([emoji, title, file, pages]) =>
      i(
        "a",
        {
          href: pageLink(file),
          onClick: close,
          "aria-current": pages.includes(route) ? "page" : undefined,
          children: [
            i("span", { "aria-hidden": true, children: emoji }),
            title,
          ],
        },
        file,
      ),
    );
  return i("header", {
    className: "site-header mega-header",
    ref: root,
    onBlur: (event) => {
      if (
        event.relatedTarget &&
        !event.currentTarget.contains(event.relatedTarget)
      )
        close();
    },
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
            children: [
              i("button", {
                type: "button",
                ref: serviceTrigger,
                className: "mega-trigger",
                "aria-expanded": open === "services",
                "aria-controls": "mega-services",
                onClick: () => setOpen(open === "services" ? "" : "services"),
                children: [
                  i("span", { "aria-hidden": true, children: "🧩" }),
                  "Services",
                  i("span", {
                    className: "mega-chevron",
                    "aria-hidden": true,
                    children: "⌄",
                  }),
                ],
              }),
              ...navLinks(),
            ],
          }),
          i("div", {
            className: "header-controls",
            children: [
              i(Action, { href: inquiryLink(), children: "Contact" }),
              i(LanguageSwitch, {}),
              i("button", {
                type: "button",
                ref: mobileTrigger,
                className: "menu-toggle",
                "aria-expanded": open === "mobile",
                "aria-controls": "mega-mobile",
                "aria-label": translateText(
                  open === "mobile" ? "Close menu" : "Open menu",
                ),
                onClick: () => setOpen(open === "mobile" ? "" : "mobile"),
                children: open === "mobile" ? "×" : "☰",
              }),
            ],
          }),
        ],
      }),
      open === "services"
        ? i("div", {
            className: "mega-desktop-panel",
            id: "mega-services",
            children: [
              i("div", {
                className: "mega-panel-top",
                children: [
                  i("div", {
                    children: [
                      i("strong", { children: "Find the right expertise." }),
                      i("p", {
                        children:
                          "Advertising, websites, analytics and practical training.",
                      }),
                    ],
                  }),
                  i(Action, {
                    href: pageLink("services.html"),
                    secondary: true,
                    onClick: close,
                    children: "All services ↗",
                  }),
                ],
              }),
              i("div", {
                className: "mega-columns",
                children: MEGA_GROUPS.map((group) =>
                  i(
                    MegaServiceGroup,
                    { group, onNavigate: close },
                    group.title,
                  ),
                ),
              }),
              i("div", {
                className: "mega-panel-bottom",
                children: [
                  i("span", { children: "Not sure where to start?" }),
                  i("a", {
                    href: inquiryLink(),
                    onClick: close,
                    children: "Describe your task ↗",
                  }),
                  i("a", {
                    href: pageLink("pricing.html"),
                    onClick: close,
                    children: "View the full price list ↗",
                  }),
                ],
              }),
            ],
          })
        : null,
      open === "mobile"
        ? i("nav", {
            className: "mega-mobile-panel",
            id: "mega-mobile",
            "aria-label": translateText("Menu"),
            children: [
              i("a", {
                className: "mega-all-mobile",
                href: pageLink("services.html"),
                onClick: close,
                children: "🧩 " + translateText("All services") + " ↗",
              }),
              ...MEGA_GROUPS.map((group) =>
                i(
                  MegaServiceGroup,
                  { group, mobile: true, onNavigate: close },
                  group.title,
                ),
              ),
              i("div", {
                className: "mega-mobile-links",
                children: navLinks(),
              }),
            ],
          })
        : null,
    ],
  });
}
function FooterSocials() {
  const profile = window.ABOUT_PROFILE;
  const links = [
    { id: "github", icon: "github", name: "GitHub", url: profile.github.url },
    ...profile.socialLinks,
  ];
  return i("div", {
    className: "footer-socials",
    children: [
      i("p", { children: "More ways to connect" }),
      i("nav", {
        "aria-label": translateText("Social profiles"),
        children: links.map((link) =>
          i(
            "a",
            {
              href: link.url,
              target: "_blank",
              "data-outbound": "footer-social-" + link.id,
              "aria-label":
                link.name + (link.handle ? " · " + link.handle : ""),
              children: [
                i(AuthorIcon, { name: link.icon }),
                i("span", { children: link.name }),
                i("span", { "aria-hidden": true, children: "↗" }),
              ],
            },
            link.id,
          ),
        ),
      }),
    ],
  });
}
Object.assign(window.RU, {
  "Search & measurement": "Поиск и аналитика",
  "Automation & learning": "Автоматизация и обучение",
  "Find the right expertise.": "Подберём решение под вашу задачу.",
  "Advertising, websites, analytics and practical training.":
    "Реклама, сайты, аналитика и практическое обучение.",
  "All services ↗": "Все услуги ↗",
  "Not sure where to start?": "Не знаете, с чего начать?",
  "Describe your task ↗": "Опишите задачу ↗",
  "More ways to connect": "Соцсети и открытые проекты",
});
