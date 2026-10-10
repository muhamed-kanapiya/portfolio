/* Change an id when publishing a genuinely new announcement. Closed ids stay dismissed. */
const SITE_ANNOUNCEMENTS = {
  banner: {
    enabled: true,
    id: "learning-levels-2026-10",
    text: learnPair(
      "SEO и Google Ads: Junior → Middle → Senior. Попробуйте симуляторы.",
      "SEO and Google Ads: Junior → Middle → Senior. Try the simulators.",
    ),
    label: learnPair("Открыть курсы →", "Explore courses →"),
    file: "courses.html",
  },
  slide: {
    enabled: true,
    id: "resource-library-2026-10",
    delayMs: 18000,
    title: learnPair(
      "Перед запуском — короткая проверка.",
      "A quick check before you launch.",
    ),
    text: learnPair(
      "Заберите чек-листы, брифы и шаблон отчёта. Бесплатно и без регистрации.",
      "Get checklists, briefs and a report template. Free, no registration needed.",
    ),
    label: learnPair("Выбрать материал →", "Choose a resource →"),
    file: "materials.html",
  },
};
const ANNOUNCEMENT_PREFIX = "portfolio-notice-";
function useAnnouncement(kind) {
  const config = SITE_ANNOUNCEMENTS[kind];
  const key = ANNOUNCEMENT_PREFIX + kind + "-" + config.id;
  const [closed, setClosed] = le.useState(() => {
    try {
      return localStorage.getItem(key) === "dismissed";
    } catch {
      return false;
    }
  });
  const dismiss = () => {
    setClosed(true);
    try {
      localStorage.setItem(key, "dismissed");
    } catch {}
  };
  return { config, closed, dismiss };
}
function AnnouncementBanner() {
  const { config, closed, dismiss } = useAnnouncement("banner");
  if (
    !config.enabled ||
    closed ||
    ["classroom", "exam"].includes(readRoute().page)
  )
    return null;
  return i("aside", {
    className: "announcement-banner",
    "aria-label": learnSay("Объявление", "Announcement"),
    children: [
      i("div", {
        children: [
          i("span", { "aria-hidden": true, children: "✦" }),
          i("span", { children: learnCopy(config.text) }),
          i("a", {
            href: pageLink(config.file),
            children: learnCopy(config.label),
          }),
        ],
      }),
      i("button", {
        type: "button",
        onClick: dismiss,
        "aria-label": learnSay("Закрыть объявление", "Dismiss announcement"),
        children: "×",
      }),
    ],
  });
}
function ResourceSlideIn() {
  const { config, closed, dismiss } = useAnnouncement("slide");
  const [ready, setReady] = le.useState(false);
  const [scrolled, setScrolled] = le.useState(false);
  le.useEffect(() => {
    const checkScroll = () => setScrolled(window.scrollY > 500);
    checkScroll();
    window.addEventListener("scroll", checkScroll, { passive: true });
    return () => window.removeEventListener("scroll", checkScroll);
  }, []);
  le.useEffect(() => {
    if (closed || !config.enabled) return;
    const timer = setTimeout(() => setReady(true), config.delayMs);
    return () => clearTimeout(timer);
  }, [closed, config.enabled]);
  const excluded = [
    "seo-simulator",
    "google-ads-simulator",
    "academy",
    "classroom",
    "exam",
    "materials",
    "material",
    "video",
  ];
  if (
    !config.enabled ||
    closed ||
    !ready ||
    !scrolled ||
    excluded.includes(readRoute().page)
  )
    return null;
  return i("aside", {
    className: "resource-slide-in",
    "aria-label": learnSay("Полезные материалы", "Useful resources"),
    children: [
      i("button", {
        className: "slide-close",
        type: "button",
        onClick: dismiss,
        "aria-label": learnSay(
          "Закрыть предложение материалов",
          "Dismiss resource suggestion",
        ),
        children: "×",
      }),
      i("span", {
        className: "section-eyebrow",
        children: learnSay("БЕРИТЕ В РАБОТУ", "READY TO USE"),
      }),
      i("h2", { children: learnCopy(config.title) }),
      i("p", { children: learnCopy(config.text) }),
      i("a", {
        href: pageLink(config.file),
        onClick: dismiss,
        children: learnCopy(config.label),
      }),
    ],
  });
}
function LearningNavLinks({ onNavigate }) {
  return i("div", {
    className: "learning-nav-links",
    children: [
      [
        "🧪",
        "seo-simulator.html",
        learnSay("Симулятор SEO", "SEO simulator"),
        learnSay(
          "Индексация, контент и динамика",
          "Indexing, content and trends",
        ),
      ],
      [
        "🎛️",
        "google-ads-simulator.html",
        learnSay("Симулятор Google Ads", "Google Ads simulator"),
        learnSay("Бюджет, лиды и экономика", "Budget, leads and economics"),
      ],
      [
        "🎓",
        "courses.html",
        learnSay("Курсы", "Courses"),
        learnSay("Реклама, SEO, аналитика и ИИ", "Ads, SEO, analytics and AI"),
      ],
      [
        "📂",
        "materials.html",
        learnSay("Материалы", "Resources"),
        learnSay("Чек-листы, отчёты и брифы", "Checklists, reports and briefs"),
      ],
      [
        "🌏",
        "travel.html",
        learnSay("Путешествия", "Travel"),
        "Nomad Walks Kazakhstan",
      ],
      [
        "📖",
        "academy.html",
        learnSay("Учебный кабинет", "Classroom"),
        learnSay("Открытая демоверсия", "Open demo"),
      ],
    ].map(([icon, file, title, text]) =>
      i(
        "a",
        {
          href: pageLink(file),
          onClick: onNavigate,
          children: [
            i("span", { "aria-hidden": true, children: icon }),
            i("span", {
              children: [
                i("strong", { children: title }),
                i("small", { children: text }),
              ],
            }),
          ],
        },
        file,
      ),
    ),
  });
}
function hubMetadata(page) {
  const entries = {
    "seo-simulator": [
      learnSay("Симулятор SEO", "SEO simulator"),
      learnSay(
        "16 заданий и 4 проекта: индексация, контент, CTR и миграция. Графики и проверка решений.",
        "16 tasks and 4 projects: indexing, content, CTR and migration. Charts and decision checks.",
      ),
    ],
    "google-ads-simulator": [
      learnSay("Симулятор Google Ads", "Google Ads simulator"),
      learnSay(
        "16 заданий и 4 проекта: бюджет, качество лидов и прибыль. Учебная модель с графиками.",
        "16 tasks and 4 projects: budget, lead quality and profit. A teaching model with charts.",
      ),
    ],
    courses: [
      learnSay("Курсы и практикумы", "Courses and workshops"),
      learnSay(
        "Google Ads, SEO, GA4/GTM и ИИ: программы, практика и демоуроки.",
        "Google Ads, SEO, GA4/GTM and AI: curricula, practice and demo lessons.",
      ),
    ],
    academy: [
      learnSay("Учебный демо-кабинет", "Demo classroom"),
      learnSay(
        "Уроки, практика, тесты и локальный прогресс обучения.",
        "Lessons, practice, quizzes and local learning progress.",
      ),
    ],
    materials: [
      learnSay("Библиотека материалов", "Resource library"),
      learnSay(
        "Бесплатные чек-листы PDF и редактируемые брифы и отчёты DOCX на русском и английском.",
        "Free PDF checklists and editable DOCX briefs and reports in Russian and English.",
      ),
    ],
    travel: [
      "Nomad Walks Kazakhstan",
      learnSay(
        "Мои видео о путешествиях, прогулках и транспорте в Казахстане, Индии и Китае.",
        "My videos about travel, walks and transport in Kazakhstan, India and China.",
      ),
    ],
  };
  if (["course", "classroom", "exam"].includes(page)) {
    const course = selectedCourse();
    const lesson = course?.lessons.find(
      (item) => item.id === new URLSearchParams(location.search).get("lesson"),
    );
    entries[page] = course
      ? [
          page === "classroom" && lesson
            ? learnCopy(lesson.title)
            : (page === "exam" ? learnSay("Экзамен · ", "Exam · ") : "") +
              learnCopy(course.title),
          learnCopy(course.short),
        ]
      : [learnSay("Курс не найден", "Course not found"), ""];
  }
  if (page === "material") {
    const resource = RESOURCES.find(
      (item) =>
        item.id === new URLSearchParams(location.search).get("resource"),
    );
    entries[page] = resource
      ? [learnCopy(resource.title), learnCopy(resource.description)]
      : [learnSay("Материал не найден", "Resource not found"), ""];
  }
  if (page === "video") {
    const video = TRAVEL_VIDEOS.find(
      (item) => item.id === new URLSearchParams(location.search).get("video"),
    );
    entries[page] = video
      ? [learnCopy(video.title), learnCopy(video.description)]
      : [learnSay("Видео не найдено", "Video not found"), ""];
  }
  return entries[page]
    ? { title: entries[page][0], description: entries[page][1] }
    : null;
}
