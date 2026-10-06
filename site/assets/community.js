/* Reviews, biography and client artwork. Static data, no API keys or third-party widgets. */
function profileCopy(value) {
  return typeof value === "string"
    ? value
    : value?.[currentLanguage] || value?.ru || "";
}
function publicReviews() {
  return window.REVIEWS.filter((review) => review.published === true);
}
function filteredReviews(platform = "all", query = "") {
  const words = query.toLocaleLowerCase().trim().split(/\s+/).filter(Boolean);
  return publicReviews().filter((review) => {
    const text = [
      review.author,
      profileCopy(review.text),
      profileCopy(review.topic),
    ]
      .join(" ")
      .toLocaleLowerCase();
    return (
      (platform === "all" || review.platform === platform) &&
      words.every((word) => text.includes(word))
    );
  });
}
function ReviewPlatform({ platform }) {
  const source =
    window.REVIEW_PLATFORMS[platform] || window.REVIEW_PLATFORMS.other;
  return i("span", {
    className: "review-platform",
    children: [
      i("span", {
        className: "review-source-icon source-" + platform,
        style: { "--source-color": source.color },
        "aria-hidden": true,
        children: source.mark,
      }),
      i("span", { children: source.name }),
    ],
  });
}
function ReviewStars({ rating }) {
  if (!Number.isFinite(rating) || rating < 1 || rating > 5) return null;
  return i("span", {
    className: "review-stars",
    role: "img",
    "aria-label": rating + " / 5",
    children: [
      i("span", {
        className: "star-empty",
        "aria-hidden": true,
        children: "★★★★★",
      }),
      i("span", {
        className: "star-filled",
        "aria-hidden": true,
        style: { width: (rating / 5) * 100 + "%" },
        children: "★★★★★",
      }),
    ],
  });
}
function ReviewCard({ review, onOpen, duplicate = false }) {
  return i("button", {
    type: "button",
    className: "review-card",
    tabIndex: duplicate ? -1 : 0,
    "aria-haspopup": "dialog",
    "aria-label": translateText("Read review") + ": " + review.author,
    onClick: (event) => onOpen(review, event.currentTarget),
    children: [
      i("span", {
        className: "review-card-top",
        children: [
          i(ReviewPlatform, { platform: review.platform }),
          i(ReviewStars, { rating: review.rating }),
        ],
      }),
      i("span", {
        className: "review-topic",
        children: profileCopy(review.topic),
      }),
      i("span", {
        className: "review-preview",
        children: profileCopy(review.text),
      }),
      i("span", {
        className: "review-author",
        children: [
          i("span", {
            className: "review-avatar",
            "aria-hidden": true,
            children: review.author
              .replace(/^Ing\. /, "")
              .split(/\s+/)
              .slice(0, 2)
              .map((word) => word[0])
              .join(""),
          }),
          i("strong", { children: review.author }),
          i("span", { "aria-hidden": true, children: "↗" }),
        ],
      }),
      i("span", {
        className: "review-card-note",
        children:
          review.kind === "summary"
            ? "Summary · Read more"
            : "Read full review",
      }),
    ],
  });
}
function ReviewDialog({ review, trigger, onClose }) {
  const ref = le.useRef(null);
  const pressedOutside = le.useRef(false);
  le.useEffect(() => {
    const dialog = ref.current,
      overflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = "hidden";
    const close = () => onClose();
    window.addEventListener("hashchange", close);
    return () => {
      window.removeEventListener("hashchange", close);
      if (dialog.open) dialog.close();
      document.body.style.overflow = overflow;
      if (trigger?.isConnected) trigger.focus({ preventScroll: true });
    };
  }, [review.id]);
  const outside = (event) => {
    const r = event.currentTarget.getBoundingClientRect();
    return (
      event.clientX < r.left ||
      event.clientX > r.right ||
      event.clientY < r.top ||
      event.clientY > r.bottom
    );
  };
  return i("dialog", {
    ref,
    className: "client-dialog review-dialog",
    "aria-labelledby": "review-dialog-title",
    onCancel: (event) => {
      event.preventDefault();
      onClose();
    },
    onPointerDown: (event) => {
      pressedOutside.current =
        event.target === event.currentTarget && outside(event);
    },
    onClick: (event) => {
      if (
        pressedOutside.current &&
        event.target === event.currentTarget &&
        outside(event)
      )
        onClose();
    },
    children: [
      i("div", {
        className: "client-dialog-header",
        children: [
          i("div", {
            children: [
              i(ReviewPlatform, { platform: review.platform }),
              i("h2", { id: "review-dialog-title", children: review.author }),
            ],
          }),
          i("button", {
            type: "button",
            autoFocus: true,
            className: "client-dialog-close",
            "aria-label": translateText("Close review"),
            onClick: onClose,
            children: "×",
          }),
        ],
      }),
      i("div", {
        className: "client-dialog-body",
        children: [
          i("div", {
            className: "review-dialog-meta",
            children: [
              i(ReviewStars, { rating: review.rating }),
              i("span", { children: profileCopy(review.topic) }),
            ],
          }),
          review.kind === "summary"
            ? i("p", {
                className: "review-summary-label",
                children: "Review summary",
              })
            : null,
          i("p", {
            className: "review-full-text",
            children: profileCopy(review.text),
          }),
          i("a", {
            className: "action action-secondary",
            href: review.sourceUrl || window.REVIEW_GOOGLE.url,
            target: "_blank",
            "data-outbound": "review-" + review.id,
            children: "Original review at the source ↗",
          }),
        ],
      }),
    ],
  });
}
function GoogleReviewSummary() {
  const source = window.REVIEW_GOOGLE;
  return i("div", {
    className: "google-review-summary",
    children: [
      i(ReviewPlatform, { platform: "google" }),
      i("strong", {
        children: new Intl.NumberFormat(
          currentLanguage === "ru" ? "ru-RU" : "en-US",
          { minimumFractionDigits: 1 },
        ).format(source.rating),
      }),
      i(ReviewStars, { rating: source.rating }),
      i("a", {
        href: source.url,
        target: "_blank",
        "data-outbound": "google-reviews",
        children:
          source.count + " " + translateText("reviews on Google") + " ↗",
      }),
      i("small", {
        children:
          translateText("Checked") +
          " " +
          new Intl.DateTimeFormat(
            currentLanguage === "ru" ? "ru-RU" : "en-GB",
          ).format(new Date(source.checkedAt + "T12:00:00Z")),
      }),
    ],
  });
}
function ReviewsSection() {
  const [paused, setPaused] = le.useState(false);
  const [selected, setSelected] = le.useState(null);
  const scrollerRef = le.useRef(null);
  const reviews = publicReviews();
  le.useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller || paused || selected) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame,
      previous,
      visible = false;
    const observer = new IntersectionObserver((entries) => {
      visible = entries[0].isIntersecting;
    });
    observer.observe(scroller);
    const advance = (time) => {
      // Native scrolling keeps click positions and keyboard focus in sync with the cards.
      if (
        previous &&
        visible &&
        !document.hidden &&
        !preference.matches &&
        !scroller.matches(":hover") &&
        !scroller.contains(document.activeElement)
      ) {
        const groupWidth =
          scroller.firstElementChild.firstElementChild.getBoundingClientRect()
            .width;
        if (groupWidth > scroller.clientWidth) {
          const next =
            scroller.scrollLeft + Math.min(time - previous, 50) * 0.032;
          scroller.scrollLeft = next >= groupWidth ? next - groupWidth : next;
        }
      }
      previous = time;
      frame = requestAnimationFrame(advance);
    };
    frame = requestAnimationFrame(advance);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [paused, selected, reviews.length]);
  if (!reviews.length) return null;
  const open = (review, trigger) => setSelected({ review, trigger });
  return i("section", {
    id: "reviews",
    className: "reviews-section",
    children: [
      i("div", {
        className: "page-container",
        children: [
          i("div", {
            className: "section-heading",
            children: [
              i("div", {
                children: [
                  i("span", {
                    className: "section-eyebrow",
                    children: "CLIENT FEEDBACK",
                  }),
                  i("h2", { children: "Good work. In their words." }),
                ],
              }),
              i(Action, {
                href: pageLink("reviews.html"),
                secondary: true,
                children: "All reviews",
              }),
            ],
          }),
          i(GoogleReviewSummary, {}),
        ],
      }),
      i("div", {
        ref: scrollerRef,
        className: "reviews-marquee" + (paused || selected ? " is-paused" : ""),
        "aria-label": translateText("Client reviews"),
        onPointerDown: (event) => {
          if (event.pointerType === "touch") setPaused(true);
        },
        children: i("div", {
          className: "reviews-track",
          children: [false, true].map((duplicate) =>
            i(
              "div",
              {
                className: "reviews-track-group",
                "aria-hidden": duplicate ? true : undefined,
                children: reviews.map((review) =>
                  i(ReviewCard, { review, onOpen: open, duplicate }, review.id),
                ),
              },
              String(duplicate),
            ),
          ),
        }),
      }),
      i("div", {
        className: "page-container reviews-controls",
        children: [
          i("button", {
            type: "button",
            className: "review-pause",
            "aria-pressed": paused,
            onClick: () => setPaused(!paused),
            children: paused ? "▶ Resume motion" : "Ⅱ Pause motion",
          }),
          i("a", {
            href: window.REVIEW_GOOGLE.writeUrl,
            target: "_blank",
            "data-outbound": "write-google-review",
            children: "Leave a Google review ↗",
          }),
        ],
      }),
      selected
        ? i(ReviewDialog, { ...selected, onClose: () => setSelected(null) })
        : null,
    ],
  });
}
function ReviewsPage() {
  const [platform, setPlatform] = le.useState("all"),
    [query, setQuery] = le.useState(""),
    [selected, setSelected] = le.useState(null);
  const platforms = [
    ...new Set(publicReviews().map((review) => review.platform)),
  ];
  const reviews = filteredReviews(platform, query);
  return i("main", {
    className: "reviews-page page-container",
    id: "main-content",
    children: [
      i("a", {
        className: "back-link",
        href: pageLink("index.html"),
        children: "← Back to home",
      }),
      i("div", { className: "section-eyebrow", children: "CLIENT FEEDBACK" }),
      i("h1", { children: "Reviews" }),
      i("p", {
        className: "community-lead",
        children:
          "A selection of public feedback. Authors, ratings and links to the original sources.",
      }),
      i(GoogleReviewSummary, {}),
      i("div", {
        className: "review-filters",
        children: [
          i("div", {
            className: "review-filter-buttons",
            role: "group",
            "aria-label": translateText("Review source"),
            children: ["all", ...platforms].map((key) =>
              i(
                "button",
                {
                  type: "button",
                  "aria-pressed": key === platform,
                  onClick: () => setPlatform(key),
                  children:
                    key === "all"
                      ? "All sources"
                      : i(ReviewPlatform, { platform: key }),
                },
                key,
              ),
            ),
          }),
          i("input", {
            type: "search",
            value: query,
            onChange: (event) => setQuery(event.target.value),
            placeholder: translateText("Search reviews"),
            "aria-label": translateText("Search reviews"),
          }),
        ],
      }),
      i("p", {
        className: "review-found",
        role: "status",
        children: translateText("Shown") + ": " + reviews.length,
      }),
      reviews.length
        ? i("div", {
            className: "reviews-grid",
            children: reviews.map((review) =>
              i(
                ReviewCard,
                {
                  review,
                  onOpen: (review, trigger) => setSelected({ review, trigger }),
                },
                review.id,
              ),
            ),
          })
        : i("p", {
            className: "review-no-results",
            children: "No matching reviews. Try another search.",
          }),
      i("div", {
        className: "reviews-archive-footer",
        children: [
          i("p", {
            children: "Read more feedback or share your experience on Google.",
          }),
          i(Action, {
            href: window.REVIEW_GOOGLE.writeUrl,
            target: "_blank",
            "data-outbound": "write-google-review",
            children: "Leave a review",
          }),
        ],
      }),
      selected
        ? i(ReviewDialog, { ...selected, onClose: () => setSelected(null) })
        : null,
    ],
  });
}
function AboutSection() {
  const profile = window.ABOUT_PROFILE;
  return i("section", {
    className: "about-preview page-container",
    children: [
      i("div", {
        className: "about-preview-person",
        children: [
          i("img", {
            src: profile.photo,
            alt: profileCopy(profile.name),
            width: 160,
            height: 160,
            loading: "lazy",
          }),
          i("div", {
            children: [
              i("span", {
                className: "section-eyebrow",
                children: "THE PERSON BEHIND THE WORK",
              }),
              i("h2", { children: profileCopy(profile.name) }),
              i("p", { children: profileCopy(profile.role) }),
            ],
          }),
        ],
      }),
      i("div", {
        children: [
          i("p", {
            className: "about-preview-copy",
            children: profileCopy(profile.intro),
          }),
          i(Action, {
            href: pageLink("about.html"),
            secondary: true,
            children: "More about me",
          }),
        ],
      }),
    ],
  });
}
function AboutPage() {
  const profile = window.ABOUT_PROFILE;
  const principles = [
    [
      "01",
      "Start with the task",
      "First, understand the business, the audience and the result we need to measure.",
    ],
    [
      "02",
      "Connect the tools",
      "Advertising, website improvements and analytics should support the same goal.",
    ],
    [
      "03",
      "Make progress visible",
      "Agree on priorities, explain the changes and review the next steps together.",
    ],
  ];
  return i("main", {
    className: "about-page page-container",
    id: "main-content",
    children: [
      i("a", {
        className: "back-link",
        href: pageLink("index.html"),
        children: "← Back to home",
      }),
      i("section", {
        className: "about-hero",
        children: [
          i("div", {
            children: [
              i("span", {
                className: "section-eyebrow",
                children: "LET’S GET ACQUAINTED",
              }),
              i("h1", { children: profileCopy(profile.name) }),
              i("p", {
                className: "community-lead",
                children: profileCopy(profile.intro),
              }),
              i("div", {
                className: "detail-actions",
                children: [
                  i(Action, {
                    href: inquiryLink(),
                    children: "Discuss the task",
                  }),
                  i(Action, {
                    href: pageLink("cases.html"),
                    secondary: true,
                    children: "Case studies",
                  }),
                ],
              }),
            ],
          }),
          i("aside", {
            className: "about-identity",
            children: [
              i("img", {
                src: profile.photo,
                alt: profileCopy(profile.name),
                width: 200,
                height: 200,
              }),
              i("span", {
                className: "section-eyebrow",
                children: "ADS BY KANAPIYA",
              }),
              i("h2", { children: "Strategy meets code." }),
              i("p", { children: profileCopy(profile.role) }),
              i("span", {
                className: "about-location",
                children: "Astana · Kazakhstan",
              }),
            ],
          }),
        ],
      }),
      i("section", {
        className: "about-story",
        children: [
          i("h2", { children: "Marketing with a technical foundation." }),
          i("div", {
            children: profile.story.map((paragraph, index) =>
              i("p", { children: profileCopy(paragraph) }, index),
            ),
          }),
        ],
      }),
      i("section", {
        className: "about-tools",
        children: [
          i("span", { className: "section-eyebrow", children: "MY TOOLKIT" }),
          i("div", {
            className: "about-skills",
            children: profile.skills.map((skill) =>
              i("span", { children: skill }, skill),
            ),
          }),
        ],
      }),
      i("section", {
        className: "about-principles",
        children: principles.map(([number, title, description]) =>
          i(
            "article",
            {
              children: [
                i("span", { children: number }),
                i("h3", { children: title }),
                i("p", { children: description }),
              ],
            },
            number,
          ),
        ),
      }),
      i("section", {
        className: "about-reading",
        children: [
          i("h2", { children: "Beyond client projects" }),
          i("p", {
            children:
              "Notes about marketing, learning and technology. My blog and public educational materials.",
          }),
          i("div", {
            children: profile.sources.map((source) =>
              i(
                "a",
                {
                  href: source.url,
                  target: "_blank",
                  "data-outbound": "about-source",
                  children: source.label + " ↗",
                },
                source.url,
              ),
            ),
          }),
        ],
      }),
    ],
  });
}
function CaseArtwork({ record }) {
  const [broken, setBroken] = le.useState(false);
  const client = caseClient(record);
  const cover = record.image || window.CLIENT_COVERS[client?.id];
  const source = !broken && (cover || client?.logo);
  return i("div", {
    className:
      "case-artwork" +
      (cover && !broken ? " has-cover" : " logo-cover") +
      (client?.logoDark && !cover ? " dark-cover" : ""),
    style: { "--client-accent": client?.color || "#175c45" },
    "aria-hidden": true,
    children: [
      source
        ? i("img", {
            src: source,
            alt: "",
            loading: "lazy",
            decoding: "async",
            width: 640,
            height: 360,
            onError: () => setBroken(true),
          })
        : i("span", {
            className: "case-artwork-initials",
            children: (client?.name || record.title)
              .split(/[\s.-]+/)
              .slice(0, 2)
              .map((word) => word[0])
              .join(""),
          }),
      i("span", {
        className: "case-artwork-caption",
        children: client?.name || record.title,
      }),
      i("span", { className: "case-artwork-arrow", children: "↗" }),
    ],
  });
}
Object.assign(window.RU, {
  "Google Maps": "Google Карты",
  "← Back to home": "← На главную",
  Reviews: "Отзывы",
  "All reviews": "Все отзывы",
  "About me": "Обо мне",
  "More about me": "Подробнее обо мне",
  "CLIENT FEEDBACK": "ОБРАТНАЯ СВЯЗЬ",
  "Good work. In their words.": "О работе — словами клиентов.",
  "Client reviews": "Отзывы клиентов",
  "Read review": "Читать отзыв",
  "Close review": "Закрыть отзыв",
  "Review summary": "Краткий пересказ отзыва",
  "Summary · Read more": "Краткий пересказ · Подробнее",
  "Read full review": "Читать полный отзыв",
  "Original review at the source ↗": "Оригинал на площадке ↗",
  "reviews on Google": "отзыв в Google",
  Checked: "Проверено",
  "Ⅱ Pause motion": "Ⅱ Остановить",
  "▶ Resume motion": "▶ Продолжить",
  "Leave a Google review ↗": "Оставить отзыв в Google ↗",
  "Leave a review": "Оставить отзыв",
  "A selection of public feedback. Authors, ratings and links to the original sources.":
    "Подборка публичных отзывов: авторы, оценки и ссылки на первоисточники.",
  "Review source": "Источник отзыва",
  "All sources": "Все площадки",
  "Search reviews": "Поиск по отзывам",
  Shown: "Показано",
  "No matching reviews. Try another search.":
    "Ничего не найдено. Попробуйте другой запрос.",
  "Read more feedback or share your experience on Google.":
    "Больше отзывов и возможность поделиться своим опытом — в Google.",
  "THE PERSON BEHIND THE WORK": "ДАВАЙТЕ ПОЗНАКОМИМСЯ",
  "LET’S GET ACQUAINTED": "ОБО МНЕ",
  "Strategy meets code.": "Стратегия встречается с кодом.",
  "Astana · Kazakhstan": "Астана · Казахстан",
  "Marketing with a technical foundation.": "Маркетинг с технической основой.",
  "MY TOOLKIT": "ИНСТРУМЕНТЫ В МОЕЙ РАБОТЕ",
  "Start with the task": "Начинаю с задачи",
  "First, understand the business, the audience and the result we need to measure.":
    "Сначала разбираюсь в бизнесе, аудитории и результате, который важно измерить.",
  "Connect the tools": "Связываю инструменты",
  "Advertising, website improvements and analytics should support the same goal.":
    "Реклама, доработки сайта и аналитика должны работать на общую цель.",
  "Make progress visible": "Показываю ход работы",
  "Agree on priorities, explain the changes and review the next steps together.":
    "Согласовываем приоритеты, обсуждаем изменения и определяем следующие шаги.",
  "Beyond client projects": "За пределами клиентских проектов",
  "Notes about marketing, learning and technology. My blog and public educational materials.":
    "Пишу о маркетинге, обучении и технологиях. Мой блог и открытые образовательные материалы.",
  "Full cycle": "Полный цикл",
  "From audit to launch": "От аудита до запуска",
  "One specialist": "Один специалист",
});
