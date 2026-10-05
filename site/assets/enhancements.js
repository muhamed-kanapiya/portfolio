/* Progressive motion and direct messenger links. No external dependencies. */
function HomeMotion({ active }) {
  le.useEffect(() => {
    if (!active) return;
    const root = document.querySelector(".home-page");
    if (!root) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let observer;
    let nodes = [];
    const reset = () => {
      observer?.disconnect();
      root.classList.remove("motion-enabled");
      nodes.forEach((node) => {
        node.classList.remove(
          "reveal-pending",
          "reveal-visible",
          "reveal-item",
        );
        node.style.removeProperty("--reveal-delay");
      });
    };
    const setup = () => {
      reset();
      if (preference.matches || !("IntersectionObserver" in window)) return;
      root.classList.add("motion-enabled");
      nodes = [
        ...root.querySelectorAll(
          "#services .section-heading, #services .service-tile, #clients .clients-heading, #clients .client-card, #cases .section-heading, #cases .case-tile, #process > div, #pricing .section-heading, #pricing .pricing-card",
        ),
      ];
      observer = new IntersectionObserver(
        (entries) =>
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.remove("reveal-pending");
              entry.target.classList.add("reveal-visible");
              observer.unobserve(entry.target);
            }
          }),
        { threshold: 0.08, rootMargin: "0px 0px -18px 0px" },
      );
      nodes.forEach((node, index) => {
        node.classList.add("reveal-item");
        node.style.setProperty("--reveal-delay", `${(index % 3) * 60}ms`);
        if (node.getBoundingClientRect().top >= window.innerHeight) {
          node.classList.add("reveal-pending");
          observer.observe(node);
        }
      });
    };
    const revealFocus = (event) => {
      const target = event.target.closest(".reveal-pending");
      if (target) {
        target.classList.remove("reveal-pending");
        observer?.unobserve(target);
      }
    };
    setup();
    preference.addEventListener("change", setup);
    root.addEventListener("focusin", revealFocus);
    return () => {
      reset();
      preference.removeEventListener("change", setup);
      root.removeEventListener("focusin", revealFocus);
    };
  }, [active]);
  return null;
}
function MessengerIcon({ channel }) {
  return i("svg", {
    viewBox: "0 0 24 24",
    width: 25,
    height: 25,
    fill: "none",
    "aria-hidden": true,
    focusable: false,
    children:
      channel === "telegram"
        ? [
            i("path", {
              d: "m21 3-4 18-6-5-4 4 .9-7.2L3 11 21 3Z",
              fill: "currentColor",
              opacity: 0.2,
            }),
            i("path", {
              d: "m21 3-4 18-6-5-4 4 .9-7.2L3 11 21 3ZM7.9 12.8 21 3M11 16 21 3",
              stroke: "currentColor",
              strokeWidth: 1.6,
              strokeLinecap: "round",
              strokeLinejoin: "round",
            }),
          ]
        : [
            i("path", {
              d: "M20.8 11.6a8.8 8.8 0 0 1-13 7.8L3 21l1.6-4.7a8.8 8.8 0 1 1 16.2-4.7Z",
              stroke: "currentColor",
              strokeWidth: 1.6,
              strokeLinejoin: "round",
            }),
            i("path", {
              d: "M8.1 7.2c-.4 0-1.3 1-1.3 2.1 0 2.6 4 6.6 6.8 6.6 1.3 0 2.1-1 2.1-1.4l-2.3-1.2-.9 1c-1.4-.6-2.8-2-3.4-3.4l1-.9-1.2-2.8H8.1Z",
              fill: "currentColor",
            }),
          ],
  });
}
function FloatingContacts() {
  return i("aside", {
    className: "floating-contacts",
    "aria-label": translateText("Write directly"),
    children: [
      i("span", { className: "floating-caption", children: "Write directly" }),
      ...["whatsapp", "telegram"].map((channel) => {
        const label =
          channel === "whatsapp" ? "Write on WhatsApp" : "Write on Telegram";
        const href =
          channel === "whatsapp"
            ? "https://wa.me/" + window.PORTFOLIO.whatsapp.replace(/\D/g, "")
            : "https://t.me/" + window.PORTFOLIO.telegram.replace(/^@/, "");
        return i(
          "a",
          {
            className: "floating-chat floating-" + channel,
            href,
            target: "_blank",
            rel: "noopener noreferrer",
            "aria-label": translateText(label),
            "aria-describedby": "hint-" + channel,
            title: translateText(label),
            children: [
              i(MessengerIcon, { channel }),
              i("span", {
                className: "chat-tooltip",
                id: "hint-" + channel,
                role: "tooltip",
                children: label,
              }),
            ],
          },
          channel,
        );
      }),
    ],
  });
}
function CasesEmpty({ standalone = false }) {
  return i("section", {
    className:
      "cases-empty" + (standalone ? " page-container standalone-empty" : ""),
    children: [
      i("span", {
        className: "empty-case-symbol",
        "aria-hidden": true,
        children: "↗",
      }),
      i(standalone ? "h1" : "h2", {
        children: standalone
          ? "This case is not published."
          : "Real stories are on the way.",
      }),
      i("p", {
        children: "Explore the client list or tell me about your task.",
      }),
      i("div", {
        className: "detail-actions",
        children: [
          i(Action, {
            href: pageLink("clients.html"),
            children: "All clients",
          }),
          i(Action, {
            href: inquiryLink(),
            secondary: true,
            children: "Discuss the task",
          }),
        ],
      }),
    ],
  });
}
function HomeOverview() {
  const steps = [
    ["🎯", "Attract", "Advertising and search"],
    ["🌐", "Engage", "Website and landing pages"],
    ["📊", "Measure", "Events and conversions"],
    ["✨", "Improve", "Testing and optimization"],
  ];
  return i("div", {
    className: "home-overview hero-visual",
    children: [
      i("div", {
        className: "overview-top",
        children: [
          i("span", {
            className: "section-eyebrow",
            children: "One connected workflow",
          }),
          i("span", { className: "overview-status", "aria-hidden": true }),
        ],
      }),
      i("h2", { children: "From the first click to the inquiry." }),
      i("div", {
        className: "overview-flow",
        children: steps.map(([emoji, title, description], index) =>
          i(
            "div",
            {
              className: "overview-step",
              style: { "--step": index },
              children: [
                i("span", {
                  className: "overview-icon",
                  "aria-hidden": true,
                  children: emoji,
                }),
                i("div", {
                  children: [
                    i("h3", { children: title }),
                    i("p", { children: description }),
                  ],
                }),
                i("span", {
                  className: "overview-order",
                  "aria-hidden": true,
                  children: "0" + (index + 1),
                }),
              ],
            },
            title,
          ),
        ),
      }),
      i("div", {
        className: "overview-stack",
        children: [
          "Google Ads",
          "SEO",
          "GA4 / GTM",
          "WordPress",
          "React",
          "Python",
        ].map((text) => i("span", { children: text }, text)),
      }),
      i("div", {
        className: "overview-bottom",
        children: "Built around your business",
      }),
    ],
  });
}
