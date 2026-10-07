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
function AuthorIcon({ name }) {
  const paths = {
    instagram:
      "M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm10 5h.01M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z",
    threads:
      "M19 7c-1-4-8-6-12-2-4 4-3 14 3 16 5 2 11-2 10-7-1-5-11-6-12-1-1 4 6 4 7 0 2-6-1-8-4-7",
    youtube: "M3 5h18v14H3Z m7 3 6 4-6 4Z",
    github:
      "M9 19c-4 1-4-2-6-2m12 5v-4a3.5 3.5 0 0 0-1-2.7c3.3-.4 6.8-1.6 6.8-7.3a5.7 5.7 0 0 0-1.5-4c.2-1.2.2-2.4-.5-3.5 0 0-1.3-.4-4.2 1.5a14.5 14.5 0 0 0-7.6 0C4.1.1 2.8.5 2.8.5c-.7 1.1-.7 2.3-.5 3.5A5.7 5.7 0 0 0 .8 8c0 5.7 3.5 6.9 6.8 7.3A3.5 3.5 0 0 0 6.6 18v4",
    telegram: "m21 3-4 18-6-5-4 3 1-7 10-6-12 8-5-2Z",
    x: "m4 3 16 18h-5L0 3h5ZM20 3 4 21",
    code: "m8 6-6 6 6 6m8-12 6 6-6 6M14 3l-4 18",
    globe:
      "M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM3 12h18M12 3c5 5 5 13 0 18-5-5-5-13 0-18Z",
    whatsapp:
      "M20 11a8 8 0 0 1-12 7l-5 2 1-5a8 8 0 1 1 16-4ZM8 7c0 5 3 8 7 8l1-2-3-1-1 1-2-3 1-1-1-2Z",
  };
  return i("svg", {
    viewBox: "-1 -1 26 26",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
    children: i("path", { d: paths[name] || paths.globe }),
  });
}
function AuthorSectionHeading({ eyebrow, title, text }) {
  return i("div", {
    className: "author-section-heading",
    children: [
      i("span", { className: "section-eyebrow", children: eyebrow }),
      i("h2", { children: title }),
      text ? i("p", { children: text }) : null,
    ],
  });
}
function CertificateDialog({ certificate, trigger, onClose }) {
  const ref = le.useRef(null),
    pressedOutside = le.useRef(false);
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
  }, [certificate.id]);
  const outside = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    return (
      event.clientX < rect.left ||
      event.clientX > rect.right ||
      event.clientY < rect.top ||
      event.clientY > rect.bottom
    );
  };
  return i("dialog", {
    ref,
    className: "client-dialog certificate-dialog",
    "aria-labelledby": "certificate-title",
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
              i("span", {
                className: "section-eyebrow",
                children: certificate.issuer + " · " + certificate.year,
              }),
              i("h2", {
                id: "certificate-title",
                children: profileCopy(certificate.title),
              }),
            ],
          }),
          i("button", {
            type: "button",
            autoFocus: true,
            className: "client-dialog-close",
            "aria-label": translateText("Close certificate"),
            onClick: onClose,
            children: "×",
          }),
        ],
      }),
      i("div", {
        className: "client-dialog-body",
        children: [
          i("img", {
            className: "certificate-full-image",
            src: certificate.image,
            alt:
              profileCopy(certificate.title) +
              " · " +
              profileCopy(certificate.type),
            width: 1280,
            height: 905,
          }),
          i("p", {
            className: "certificate-caption",
            children: profileCopy(certificate.description),
          }),
          i("div", {
            className: "detail-actions",
            children: [
              i(Action, {
                href: certificate.image,
                target: "_blank",
                secondary: true,
                children: "Open full-size image ↗",
              }),
              i("a", {
                className: "author-text-link",
                href: certificate.sourceUrl,
                target: "_blank",
                "data-outbound": "certificate-" + certificate.id,
                children: "Source on GitHub ↗",
              }),
            ],
          }),
        ],
      }),
    ],
  });
}
function AboutTimeline({ profile, onCertificate }) {
  return i("section", {
    className: "author-section author-timeline-section",
    id: "journey",
    children: [
      i(AuthorSectionHeading, {
        eyebrow: "MY JOURNEY",
        title: "From first projects to data and AI.",
        text: "Projects, learning and community — the milestones that shaped my work.",
      }),
      i("ol", {
        className: "author-timeline",
        children: profile.timeline.map((item, index) =>
          i(
            "li",
            {
              children: [
                i("span", { className: "timeline-year", children: item.year }),
                i("div", {
                  className: "timeline-entry",
                  children: [
                    i("span", {
                      className: "timeline-tag",
                      children: profileCopy(item.tag),
                    }),
                    i("h3", { children: profileCopy(item.title) }),
                    i("p", { children: profileCopy(item.text) }),
                    item.certificateId
                      ? i("button", {
                          type: "button",
                          className: "author-text-link",
                          "aria-haspopup": "dialog",
                          onClick: (event) =>
                            onCertificate(
                              profile.certificates.find(
                                (cert) => cert.id === item.certificateId,
                              ),
                              event.currentTarget,
                            ),
                          children: "View certificate ↗",
                        })
                      : i("a", {
                          className: "author-text-link",
                          href: item.url,
                          target: "_blank",
                          "data-outbound": "author-timeline-" + index,
                          children: "Read more ↗",
                        }),
                  ],
                }),
              ],
            },
            item.year + "-" + index,
          ),
        ),
      }),
    ],
  });
}
function AboutCertificates({ profile, onCertificate }) {
  return i("section", {
    className: "author-section",
    id: "certificates",
    children: [
      i(AuthorSectionHeading, {
        eyebrow: "LEARNING & COMMUNITY",
        title: "Certificates and participation.",
        text: "Course completion, a conference talk and a team competition. Open a card to see the original document.",
      }),
      i("div", {
        className: "certificate-grid",
        children: profile.certificates.map((cert) =>
          i(
            "button",
            {
              type: "button",
              className: "certificate-card",
              "aria-haspopup": "dialog",
              "aria-label":
                translateText("View certificate") +
                ": " +
                profileCopy(cert.title),
              onClick: (event) => onCertificate(cert, event.currentTarget),
              children: [
                i("span", {
                  className: "certificate-image",
                  children: [
                    i("img", {
                      src: cert.image,
                      alt: "",
                      width: 1280,
                      height: 905,
                      loading: "lazy",
                    }),
                    i("span", {
                      className: "certificate-expand",
                      "aria-hidden": true,
                      children: "↗",
                    }),
                  ],
                }),
                i("span", {
                  className: "certificate-details",
                  children: [
                    i("span", {
                      className: "certificate-meta",
                      children: [
                        i("span", { children: profileCopy(cert.type) }),
                        i("span", { children: cert.year }),
                      ],
                    }),
                    i("strong", { children: profileCopy(cert.title) }),
                    i("span", {
                      className: "certificate-issuer",
                      children: cert.issuer,
                    }),
                  ],
                }),
              ],
            },
            cert.id,
          ),
        ),
      }),
      i("div", {
        className: "author-education",
        children: [
          i("div", {
            children: [
              i("h3", { children: "Additional courses" }),
              i("a", {
                className: "author-text-link",
                href: profile.github.url,
                target: "_blank",
                "data-outbound": "author-learning",
                children: "Learning notes on GitHub ↗",
              }),
            ],
          }),
          i("ul", {
            children: profile.education.map((course) =>
              i(
                "li",
                {
                  children: [
                    i("span", { children: course.provider }),
                    i("div", {
                      children: [
                        i("strong", { children: course.title }),
                        i("p", { children: profileCopy(course.text) }),
                      ],
                    }),
                  ],
                },
                course.provider,
              ),
            ),
          }),
        ],
      }),
    ],
  });
}
function AboutGithub({ profile }) {
  return i("section", {
    className: "author-section author-github",
    id: "github",
    children: [
      i("div", {
        className: "author-github-intro",
        children: [
          i("span", {
            className: "author-github-symbol",
            children: i(AuthorIcon, { name: "github" }),
          }),
          i(AuthorSectionHeading, {
            eyebrow: "CODE & EXPERIMENTS",
            title: "See how I build.",
            text: "Public repositories, small tools and frontend experiments. Source code you can explore.",
          }),
          i(Action, {
            href: profile.github.url,
            target: "_blank",
            "data-outbound": "author-github",
            children: "Open GitHub ↗",
          }),
        ],
      }),
      i("div", {
        className: "author-repos",
        children: profile.github.projects.map((project) =>
          i(
            "a",
            {
              href: project.url,
              target: "_blank",
              className: "author-repo",
              "data-outbound": "author-repo-" + project.name,
              children: [
                i("span", {
                  className: "author-repo-name",
                  children: [
                    i("strong", { children: project.name }),
                    i("span", { "aria-hidden": true, children: "↗" }),
                  ],
                }),
                i("p", { children: profileCopy(project.description) }),
                i("span", {
                  className: "author-repo-stack",
                  children: project.stack,
                }),
              ],
            },
            project.name,
          ),
        ),
      }),
    ],
  });
}
function AboutSocials({ profile }) {
  const cfg = window.PORTFOLIO;
  const direct = [
    cfg.telegram && {
      id: "telegram",
      icon: "telegram",
      name: "Telegram",
      handle: "@" + cfg.telegram,
      url: "https://t.me/" + cfg.telegram,
      description: { ru: "Написать лично", en: "Message me directly" },
    },
    cfg.whatsapp && {
      id: "whatsapp",
      icon: "whatsapp",
      name: "WhatsApp",
      handle: "+" + cfg.whatsapp,
      url: "https://wa.me/" + cfg.whatsapp,
      description: { ru: "Обсудить вашу задачу", en: "Discuss your project" },
    },
  ].filter(Boolean);
  return i("section", {
    className: "author-section",
    id: "socials",
    children: [
      i(AuthorSectionHeading, {
        eyebrow: "LET’S CONNECT",
        title: "Find me online.",
        text: "Write to me about a project, follow my channel or read my notes.",
      }),
      i("div", {
        className: "author-social-grid",
        children: [...direct, ...profile.socialLinks].map((link) =>
          i(
            "a",
            {
              href: link.url,
              target: "_blank",
              className: "author-social",
              "data-outbound": "author-social-" + link.id,
              children: [
                i("span", {
                  className: "author-social-icon",
                  children: i(AuthorIcon, { name: link.icon }),
                }),
                i("span", {
                  className: "author-social-copy",
                  children: [
                    i("strong", { children: link.name }),
                    i("span", { children: link.handle }),
                    i("small", { children: profileCopy(link.description) }),
                  ],
                }),
                i("span", {
                  className: "author-social-arrow",
                  "aria-hidden": true,
                  children: "↗",
                }),
              ],
            },
            link.id,
          ),
        ),
      }),
    ],
  });
}
function AboutPage() {
  const profile = window.ABOUT_PROFILE;
  const [selectedCertificate, setSelectedCertificate] = le.useState(null);
  const openCertificate = (certificate, trigger) =>
    setSelectedCertificate({ certificate, trigger });
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
      i("nav", {
        className: "author-jump-links",
        "aria-label": translateText("On this page"),
        children: [
          ["journey", "My journey"],
          ["certificates", "Certificates"],
          ["github", "GitHub"],
          ["socials", "Social profiles"],
        ].map(([id, label]) =>
          i(
            "a",
            {
              href: "#" + id,
              children: [
                label,
                i("span", { "aria-hidden": true, children: "↓" }),
              ],
            },
            id,
          ),
        ),
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
      i(AboutTimeline, { profile, onCertificate: openCertificate }),
      i(AboutCertificates, { profile, onCertificate: openCertificate }),
      i(AboutGithub, { profile }),
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
      i(AboutSocials, { profile }),
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
      selectedCertificate
        ? i(CertificateDialog, {
            ...selectedCertificate,
            onClose: () => setSelectedCertificate(null),
          })
        : null,
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
  "MY JOURNEY": "ПРОФЕССИОНАЛЬНЫЙ ПУТЬ",
  "My journey": "Мой путь",
  "From first projects to data and AI.": "От первых проектов к данным и ИИ.",
  "Projects, learning and community — the milestones that shaped my work.":
    "Проекты, обучение и профессиональное сообщество — события, которые сформировали мой подход к работе.",
  "LEARNING & COMMUNITY": "ОБУЧЕНИЕ И УЧАСТИЕ",
  "Certificates and participation.": "Сертификаты и достижения.",
  "Course completion, a conference talk and a team competition. Open a card to see the original document.":
    "Обучение, выступление на конференции и командное соревнование. Нажмите на карточку, чтобы рассмотреть документ.",
  Certificates: "Сертификаты",
  "View certificate": "Открыть сертификат",
  "View certificate ↗": "Смотреть сертификат ↗",
  "Close certificate": "Закрыть сертификат",
  "Read more ↗": "Подробнее ↗",
  "Open full-size image ↗": "Изображение целиком ↗",
  "Source on GitHub ↗": "Источник на GitHub ↗",
  "Additional courses": "Дополнительные курсы",
  "Learning notes on GitHub ↗": "Об обучении на GitHub ↗",
  "CODE & EXPERIMENTS": "КОД И ЭКСПЕРИМЕНТЫ",
  "See how I build.": "Мои проекты изнутри.",
  "Open GitHub ↗": "Открыть GitHub ↗",
  "Public repositories, small tools and frontend experiments. Source code you can explore.":
    "Открытые репозитории, небольшие инструменты и эксперименты с фронтендом. Можно заглянуть в исходный код.",
  "LET’S CONNECT": "НА СВЯЗИ",
  "Find me online.": "Где меня найти.",
  "Write to me about a project, follow my channel or read my notes.":
    "Напишите о проекте, подпишитесь на канал или почитайте заметки в блоге.",
  "Social profiles": "Соцсети",
  "On this page": "На этой странице",
});
