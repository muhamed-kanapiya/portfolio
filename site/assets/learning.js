/* Public static classroom. Answers and content are public; progress is local, never authentication. */
function hubLink(file, key, id) {
  return pageLink(file) + (key ? "&" + key + "=" + encodeURIComponent(id) : "");
}
function selectedCourse() {
  return COURSES.find(
    (course) =>
      course.id === new URLSearchParams(location.search).get("course"),
  );
}
function courseLink(course, classroom = false) {
  return hubLink(
    classroom ? "classroom.html" : "course.html",
    "course",
    course.id,
  );
}
function hubButton(label, href, secondary = false) {
  return i(Action, { href, secondary, children: label });
}
function hubList(items) {
  return i("ul", {
    className: "hub-list",
    children: items.map((text, index) =>
      i("li", { children: learnCopy(text) }, index),
    ),
  });
}
function HubHeading({ eyebrow, title, text, actions }) {
  return i("div", {
    className: "hub-heading",
    children: [
      i("p", { className: "section-eyebrow", children: eyebrow }),
      i("h1", { children: title }),
      i("p", { className: "hub-lead", children: text }),
      actions && i("div", { className: "hub-actions", children: actions }),
    ],
  });
}
function HubMissing({ title, file }) {
  return i("main", {
    id: "main-content",
    className: "page-container hub-page",
    children: [
      i(HubHeading, {
        eyebrow: "404",
        title: learnSay("Материал не найден", "Content not found"),
        text: learnSay(
          "Проверьте ссылку или выберите материал из каталога.",
          "Check the link or select an item in the catalog.",
        ),
      }),
      hubButton(title, pageLink(file)),
    ],
  });
}
function DemoNotice() {
  return i("aside", {
    className: "demo-notice",
    children: [
      i("strong", {
        children: learnSay("Открытый демо-кабинет", "Open demo classroom"),
      }),
      i("p", {
        children: learnSay(
          "Это учебный прототип без регистрации и защиты доступа. Уроки и ответы публичны. Прогресс хранится только в этом браузере и не синхронизируется; персональные данные вводить не нужно.",
          "This learning prototype has no registration or access protection. Lessons and answers are public. Progress stays in this browser and is not synced; no personal information is needed.",
        ),
      }),
    ],
  });
}
function cleanLearningState(raw) {
  const result = {};
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return result;
  for (const course of COURSES) {
    const saved = raw[course.id];
    if (!saved || typeof saved !== "object") continue;
    const completed = Array.isArray(saved.completed)
      ? [
          ...new Set(
            saved.completed.filter((id) =>
              course.lessons.some((lesson) => lesson.id === id),
            ),
          ),
        ]
      : [];
    result[course.id] = {
      enrolled: saved.enrolled === true,
      completed,
      best:
        Number.isInteger(saved.best) && saved.best >= 0 && saved.best <= 100
          ? saved.best
          : null,
      attempts:
        Number.isInteger(saved.attempts) && saved.attempts >= 0
          ? Math.min(saved.attempts, 100000)
          : 0,
    };
  }
  return result;
}
let learningMemory = {};
function readLearningState() {
  try {
    learningMemory = cleanLearningState(
      JSON.parse(localStorage.getItem(LEARNING_STORAGE_KEY) || "{}"),
    );
  } catch {}
  return learningMemory;
}
function useLearningProgress() {
  const [state, setState] = le.useState(readLearningState);
  const [error, setError] = le.useState(false);
  le.useEffect(() => {
    const sync = () => setState(readLearningState());
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);
  const save = (courseId, update) => {
    const latest = readLearningState();
    const current = latest[courseId] || {
      enrolled: false,
      completed: [],
      best: null,
      attempts: 0,
    };
    learningMemory = cleanLearningState({
      ...latest,
      [courseId]: { ...current, ...update(current) },
    });
    try {
      localStorage.setItem(
        LEARNING_STORAGE_KEY,
        JSON.stringify(learningMemory),
      );
      setError(false);
    } catch {
      setError(true);
    }
    setState(learningMemory);
  };
  return { state, save, error };
}
function ProgressError({ error }) {
  return error
    ? i("p", {
        role: "alert",
        className: "hub-warning",
        children: learnSay(
          "Браузер не разрешил сохранить прогресс. Он доступен до закрытия этой страницы; после перехода может потеряться.",
          "Your browser did not allow progress to be saved. It remains available on this page but may be lost after navigation.",
        ),
      })
    : null;
}
function CourseCard({ course, progress }) {
  const done = progress?.completed.length || 0;
  const next = course.lessons.find(
    (lesson) => !progress?.completed.includes(lesson.id),
  );
  const resume = next
    ? courseLink(course, true) + "&lesson=" + next.id
    : hubLink("exam.html", "course", course.id);
  return i("article", {
    className: "course-card tone-" + course.accent,
    children: [
      i("div", {
        className: "course-card-art",
        "aria-hidden": true,
        children: [
          i("span", { className: "course-art-icon", children: course.icon }),
          i("span", {
            className: "course-art-line",
            children:
              (course.topic || course.id) === "google-ads"
                ? "intent → lead → sale"
                : (course.topic || course.id) === "seo"
                  ? "discover. answer. grow."
                  : course.id === "analytics"
                    ? "event → insight → action"
                    : "brief → draft → review",
          }),
        ],
      }),
      i("div", {
        className: "course-card-body",
        children: [
          i("span", {
            className: "hub-kicker",
            children: course.level
              ? LEVEL_DETAILS[course.level].label +
                learnSay(" · 6 УРОКОВ · СИМУЛЯТОР", " · 6 LESSONS · SIMULATOR")
              : learnSay("ПРАКТИКУМ · 6 УРОКОВ", "WORKSHOP · 6 LESSONS"),
          }),
          i("h2", {
            children: i("a", {
              href: courseLink(course),
              children: learnCopy(course.title),
            }),
          }),
          i("p", { children: learnCopy(course.short) }),
          course.level
            ? i("p", {
                className: "course-card-fee",
                children:
                  learnSay("В группе · ", "Group · ") +
                  money(COURSE_PRICES[course.id], "KZT"),
              })
            : null,
          progress
            ? i("div", {
                className: "course-progress",
                children: [
                  i("progress", {
                    max: course.lessons.length,
                    value: done,
                    "aria-label": learnSay(
                      "Пройдено уроков",
                      "Completed lessons",
                    ),
                  }),
                  i("span", {
                    children:
                      `${done} / ${course.lessons.length} · ` +
                      (progress.best !== null
                        ? learnSay("Экзамен: ", "Exam: ") + progress.best + "%"
                        : learnSay("Экзамен впереди", "Exam ahead")),
                  }),
                ],
              })
            : i("p", {
                className: "hub-small",
                children: learnSay(
                  "Текстовые уроки · практика · тесты",
                  "Written lessons · practice · quizzes",
                ),
              }),
          hubButton(
            progress
              ? learnSay("Продолжить →", "Continue →")
              : learnSay("Программа курса ↗", "Explore the course ↗"),
            progress ? resume : courseLink(course),
            true,
          ),
        ],
      }),
    ],
  });
}
function CoursesPage() {
  return i("main", {
    id: "main-content",
    className: "page-container hub-page",
    children: [
      i(HubHeading, {
        eyebrow: learnSay(
          "ОБУЧЕНИЕ / ADS BY KANAPIYA",
          "LEARNING / ADS BY KANAPIYA",
        ),
        title: learnSay(
          "Разобраться. Попробовать. Сделать самому.",
          "Understand it. Try it. Do it yourself.",
        ),
        text: learnSay(
          "Практикумы по рекламе, поиску, аналитике и ИИ. От первого решения до своего рабочего проекта — с объяснениями, заданиями и проверкой понимания.",
          "Practical learning in advertising, search, analytics and AI. From the first decision to your own working project, with explanations, exercises and knowledge checks.",
        ),
        actions: [
          hubButton(
            learnSay("Мой демо-кабинет →", "My demo classroom →"),
            pageLink("academy.html"),
          ),
          hubButton(
            learnSay("Обсудить обучение", "Discuss training"),
            inquiryLink("training"),
            true,
          ),
        ],
      }),
      ...["seo", "google-ads"].map((topic) =>
        i(
          "section",
          {
            className: "hub-section course-track",
            children: [
              i("div", {
                className: "hub-section-top",
                children: [
                  i("h2", { children: topic === "seo" ? "SEO" : "Google Ads" }),
                  i("a", {
                    href: simulatorLink(topic),
                    children: learnSay(
                      "Попробовать симулятор ↗",
                      "Try the simulator ↗",
                    ),
                  }),
                ],
              }),
              i("div", {
                className: "hub-grid three",
                children: COURSES.filter(
                  (course) => course.topic === topic,
                ).map((course) => i(CourseCard, { course }, course.id)),
              }),
            ],
          },
          topic,
        ),
      ),
      i(CoursePricingTable, {}),
      i("section", {
        className: "hub-section",
        children: [
          i("h2", {
            children: learnSay(
              "Вводные и дополнительные практикумы",
              "Introductory and additional workshops",
            ),
          }),
          i("p", {
            className: "hub-small",
            children: learnSay(
              "Вводные практикумы SEO и Google Ads входят в основу программ Junior. Аналитика и ИИ дополняют любой уровень.",
              "The introductory SEO and Google Ads workshops form the foundation of Junior programs. Analytics and AI complement every level.",
            ),
          }),
          i("div", {
            className: "hub-grid courses-grid",
            children: COURSES.filter((course) => !course.level).map((course) =>
              i(CourseCard, { course }, course.id),
            ),
          }),
        ],
      }),
      i("section", {
        className: "hub-section",
        children: [
          i("h2", {
            children: learnSay(
              "Один подход. Три формата.",
              "One approach. Three formats.",
            ),
          }),
          i("div", {
            className: "hub-grid three",
            children: [
              [
                "01",
                learnSay("Индивидуально", "One to one"),
                learnSay(
                  "Разбираем вашу задачу, темп и пробелы. Практика строится вокруг конкретного проекта.",
                  "Focus on your task, pace and knowledge gaps. Exercises use a specific project.",
                ),
              ],
              [
                "02",
                learnSay("В группе", "Small group"),
                learnSay(
                  "Общая программа, обсуждение решений и разбор типовых ошибок. Даты согласуем до записи.",
                  "A shared program, discussion and common mistakes. Dates are agreed before enrollment.",
                ),
              ],
              [
                "03",
                learnSay("С наставником", "With a mentor"),
                learnSay(
                  "Самостоятельная работа по персональному плану и подробный разбор проекта на контрольных встречах.",
                  "Independent work following a personal plan, with detailed project feedback at milestone meetings.",
                ),
              ],
            ].map(([number, title, text]) =>
              i(
                "article",
                {
                  className: "hub-panel",
                  children: [
                    i("span", { className: "hub-kicker", children: number }),
                    i("h3", { children: title }),
                    i("p", { children: text }),
                  ],
                },
                number,
              ),
            ),
          }),
        ],
      }),
      i(DemoNotice, {}),
    ],
  });
}
function CoursePage() {
  const course = selectedCourse();
  if (!course)
    return i(HubMissing, {
      title: learnSay("Все курсы", "All courses"),
      file: "courses.html",
    });
  return i("main", {
    id: "main-content",
    className: "page-container hub-page",
    children: [
      i("a", {
        className: "back-link",
        href: pageLink("courses.html"),
        children: learnSay("← Все курсы", "← All courses"),
      }),
      i("section", {
        className: "course-hero",
        children: [
          i(HubHeading, {
            eyebrow: course.level
              ? learnSay("КУРС · ", "COURSE · ") +
                LEVEL_DETAILS[course.level].label
              : learnSay(
                  "ПРАКТИКУМ · БАЗОВЫЙ УРОВЕНЬ",
                  "WORKSHOP · FOUNDATION LEVEL",
                ),
            title: learnCopy(course.title),
            text: learnCopy(course.short),
            actions: [
              hubButton(
                learnSay("Обсудить обучение ↗", "Discuss training ↗"),
                course.level
                  ? courseInquiryLink(course)
                  : inquiryLink("training"),
              ),
              hubButton(
                learnSay("Открыть демоуроки", "Open demo lessons"),
                courseLink(course, true),
                true,
              ),
            ],
          }),
          i("aside", {
            className: "course-summary tone-" + course.accent,
            children: [
              i("span", {
                className: "course-art-icon",
                "aria-hidden": true,
                children: course.icon,
              }),
              i("h2", {
                children: learnSay(
                  "Что будет на выходе",
                  "What you will produce",
                ),
              }),
              i("p", { children: learnCopy(course.result) }),
              i("dl", {
                className: "hub-facts",
                children: [
                  [
                    learnSay("Программа", "Curriculum"),
                    learnSay("6 уроков + экзамен", "6 lessons + final exam"),
                  ],
                  [
                    learnSay(
                      "Ориентир для самостоятельной работы",
                      "Self-study estimate",
                    ),
                    course.effort
                      ? learnCopy(course.effort)
                      : learnSay(
                          "4–6 часов с практикой",
                          "4–6 hours including practice",
                        ),
                  ],
                  [
                    learnSay("В группе, вся программа", "Group, full program"),
                    course.level
                      ? money(COURSE_PRICES[course.id], "KZT")
                      : money(COURSE_PRICES[course.id]),
                  ],
                ].map(([label, value]) =>
                  i(
                    "div",
                    {
                      children: [
                        i("dt", { children: label }),
                        i("dd", { children: value }),
                      ],
                    },
                    label,
                  ),
                ),
              }),
              course.level
                ? i("a", {
                    href: "#course-prices",
                    children: learnSay(
                      "Все форматы и цены ↓",
                      "All formats and fees ↓",
                    ),
                  })
                : i(CurrencySelector, {}),
            ],
          }),
        ],
      }),
      i(CoursePricePlans, { course }),
      i("section", {
        className: "hub-grid two hub-section",
        children: [
          i("div", {
            children: [
              i("h2", { children: learnSay("Кому подойдёт", "Who it is for") }),
              i("p", { children: learnCopy(course.audience) }),
            ],
          }),
          i("div", {
            children: [
              i("h2", {
                children: learnSay("Что понадобится", "What you need"),
              }),
              i("p", { children: learnCopy(course.prerequisites) }),
            ],
          }),
        ],
      }),
      i("section", {
        className: "hub-section",
        children: [
          i("div", {
            className: "hub-section-top",
            children: [
              i("h2", {
                children: learnSay(
                  "Программа без воды",
                  "A practical curriculum",
                ),
              }),
              i("span", {
                className: "hub-small",
                children: learnSay(
                  "От основы к самостоятельному решению",
                  "From foundations to independent decisions",
                ),
              }),
            ],
          }),
          i("div", {
            className: "course-curriculum",
            children: course.lessons.map((lesson, index) =>
              i(
                "details",
                {
                  open: index === 0,
                  children: [
                    i("summary", {
                      children: [
                        i("span", {
                          className: "curriculum-number",
                          children: String(index + 1).padStart(2, "0"),
                        }),
                        i("strong", { children: learnCopy(lesson.title) }),
                        i("span", { children: "+" }),
                      ],
                    }),
                    i("div", {
                      className: "curriculum-copy",
                      children: [
                        i("p", { children: learnCopy(lesson.body) }),
                        i("p", {
                          children: [
                            i("strong", {
                              children: learnSay("Практика: ", "Practice: "),
                            }),
                            learnCopy(lesson.practice),
                          ],
                        }),
                        i("a", {
                          href:
                            courseLink(course, true) + "&lesson=" + lesson.id,
                          children: learnSay(
                            "Посмотреть демоурок →",
                            "View demo lesson →",
                          ),
                        }),
                      ],
                    }),
                  ],
                },
                lesson.id,
              ),
            ),
          }),
        ],
      }),
      i("section", {
        className: "hub-feature",
        children: [
          i("span", {
            className: "section-eyebrow",
            children: learnSay("ИТОГОВЫЙ ПРОЕКТ", "FINAL PROJECT"),
          }),
          i("h2", {
            children: learnSay(
              "Знания превращаются в рабочий документ.",
              "Turn what you learn into a working document.",
            ),
          }),
          i("p", { children: learnCopy(course.project) }),
          i("p", {
            className: "hub-small",
            children: learnSay(
              "В демо практика отмечается самостоятельно. Проверка проекта преподавателем и расписание входят в отдельно согласуемый формат обучения. Автотест не является профессиональной сертификацией.",
              "Practice is self-reported in the demo. Instructor review and scheduling are agreed separately for guided training. The automated test is not professional certification.",
            ),
          }),
        ],
      }),
      i(CourseSimulator, { course }),
      i("section", {
        className: "hub-section",
        children: [
          i("h2", {
            children: learnSay("Материалы для практики", "Practice resources"),
          }),
          i("div", {
            className: "hub-grid three",
            children: course.resourceIds
              .map((id) => RESOURCES.find((item) => item.id === id))
              .filter(Boolean)
              .map((resource) => i(ResourceCard, { resource }, resource.id)),
          }),
        ],
      }),
      i("section", {
        className: "hub-author",
        children: [
          i("img", {
            src: "assets/media/muhamed-kanapiya.jpg",
            alt: learnSay(
              "Жаксылык Мухамед-Канапия",
              "Zhaksylyk Muhamed-Kanapiya",
            ),
            width: 96,
            height: 96,
            loading: "lazy",
          }),
          i("div", {
            children: [
              i("span", {
                className: "hub-kicker",
                children: learnSay(
                  "АВТОР И ПРЕПОДАВАТЕЛЬ",
                  "AUTHOR & INSTRUCTOR",
                ),
              }),
              i("h2", {
                children: learnSay("Мухамед-Канапия", "Muhamed-Kanapiya"),
              }),
              i("p", {
                children: learnSay(
                  "Реклама, SEO, аналитика и разработка — в единой практике работы с бизнесом.",
                  "Advertising, SEO, analytics and development within one business-focused practice.",
                ),
              }),
              i("a", {
                href: pageLink("about.html"),
                children: learnSay(
                  "Опыт, проекты и сертификаты ↗",
                  "Experience, projects and certificates ↗",
                ),
              }),
            ],
          }),
        ],
      }),
      i("section", {
        className: "hub-section",
        children: [
          i("h2", { children: learnSay("Перед началом", "Before you begin") }),
          ...[
            [
              learnSay("Это видеокурс?", "Is this a video course?"),
              learnSay(
                "Сейчас доступны текстовые демоуроки, практические задания и тесты. Персональные встречи, групповые занятия и записи согласуются отдельно; несуществующие записи не включены в программу.",
                "The current demo provides written lessons, practical exercises and quizzes. Individual meetings, group sessions and recordings are agreed separately; no unavailable recordings are promised.",
              ),
            ],
            [
              learnSay(
                "Когда старт и сколько стоит?",
                "When does it start and what does it cost?",
              ),
              learnSay(
                "Напишите, какой курс и формат нужен. Согласуем исходный уровень, задачи, расписание, обратную связь и стоимость до начала. Онлайн-оплаты здесь нет.",
                "Tell me the course and format you need. We will agree your starting level, goals, schedule, feedback and fee before beginning. There is no online checkout here.",
              ),
            ],
            [
              learnSay("Как пройти экзамен?", "How do I take the exam?"),
              learnSay(
                "Отметьте практику и правильно ответьте на вопрос каждого урока. Затем откроется экзамен из шести вопросов. Проходной порог — 80%, повторные попытки доступны.",
                "Complete the practice and answer each lesson question correctly. This opens a six-question exam. The passing threshold is 80%; retries are available.",
              ),
            ],
          ].map(([title, body]) =>
            i(
              "details",
              {
                className: "hub-faq",
                children: [
                  i("summary", { children: title }),
                  i("p", { children: body }),
                ],
              },
              title,
            ),
          ),
        ],
      }),
      i(DemoNotice, {}),
      i("p", {
        className: "hub-small",
        children: i("a", {
          href: course.source,
          target: "_blank",
          children: learnSay(
            "Официальный источник для дополнительного чтения ↗",
            "Official source for further reading ↗",
          ),
        }),
      }),
    ],
  });
}
function AcademyPage() {
  const { state, save, error } = useLearningProgress();
  const [resetId, setResetId] = le.useState("");
  const [message, setMessage] = le.useState("");
  const enrolled = COURSES.filter((course) => state[course.id]?.enrolled);
  return i("main", {
    id: "main-content",
    className: "page-container hub-page",
    children: [
      i(HubHeading, {
        eyebrow: learnSay("УЧЕБНЫЙ КАБИНЕТ", "CLASSROOM"),
        title: learnSay("Ваш следующий шаг.", "Your next step."),
        text: learnSay(
          "Выберите практикум, вернитесь к урокам и проверьте, что получилось усвоить.",
          "Choose a workshop, return to lessons and check what you have learned.",
        ),
      }),
      i(DemoNotice, {}),
      i(ProgressError, { error }),
      i("p", { role: "status", children: message }),
      enrolled.length
        ? i("section", {
            className: "hub-section",
            children: [
              i("h2", { children: learnSay("Мои практикумы", "My workshops") }),
              i("div", {
                className: "hub-grid two",
                children: enrolled.map((course) =>
                  i(
                    "div",
                    {
                      children: [
                        i(CourseCard, { course, progress: state[course.id] }),
                        resetId === course.id
                          ? i("div", {
                              className: "reset-row",
                              children: [
                                i("span", {
                                  children: learnSay(
                                    "Стереть прогресс этого курса?",
                                    "Erase progress for this course?",
                                  ),
                                }),
                                i("button", {
                                  type: "button",
                                  onClick: () => {
                                    save(course.id, () => ({
                                      enrolled: false,
                                      completed: [],
                                      best: null,
                                      attempts: 0,
                                    }));
                                    setResetId("");
                                    setMessage(
                                      learnSay(
                                        "Прогресс курса сброшен.",
                                        "Course progress reset.",
                                      ),
                                    );
                                  },
                                  children: learnSay("Стереть", "Erase"),
                                }),
                                i("button", {
                                  type: "button",
                                  onClick: () => setResetId(""),
                                  children: learnSay("Отмена", "Cancel"),
                                }),
                              ],
                            })
                          : i("button", {
                              className: "hub-text-button",
                              type: "button",
                              onClick: () => setResetId(course.id),
                              children: learnSay(
                                "Сбросить этот курс",
                                "Reset this course",
                              ),
                            }),
                      ],
                    },
                    course.id,
                  ),
                ),
              }),
            ],
          })
        : i("section", {
            className: "hub-empty",
            children: [
              i("h2", {
                children: learnSay(
                  "Пока нет начатых курсов",
                  "No courses started yet",
                ),
              }),
              i("p", {
                children: learnSay(
                  "Откройте демоурок любого курса и нажмите «Начать практикум».",
                  "Open any demo lesson and select ‘Start workshop’.",
                ),
              }),
            ],
          }),
      i("section", {
        className: "hub-section",
        children: [
          i("h2", {
            children: learnSay("Выбрать направление", "Choose a direction"),
          }),
          i("div", {
            className: "hub-grid two",
            children: COURSES.filter(
              (course) => !state[course.id]?.enrolled,
            ).map((course) => i(CourseCard, { course }, course.id)),
          }),
        ],
      }),
    ],
  });
}
function LessonQuiz({ quiz, onCorrect }) {
  const [answer, setAnswer] = le.useState(null);
  const [submitted, setSubmitted] = le.useState(false);
  const correct = submitted && answer === quiz.answer;
  return i("form", {
    className: "lesson-quiz",
    onSubmit: (event) => {
      event.preventDefault();
      setSubmitted(true);
      onCorrect(answer === quiz.answer);
    },
    children: [
      i("fieldset", {
        children: [
          i("legend", { children: learnCopy(quiz.question) }),
          ...quiz.options.map((option, index) =>
            i(
              "label",
              {
                className: "quiz-option",
                children: [
                  i("input", {
                    type: "radio",
                    name: "lesson-answer",
                    required: true,
                    checked: answer === index,
                    onChange: () => {
                      setAnswer(index);
                      setSubmitted(false);
                      onCorrect(false);
                    },
                  }),
                  learnCopy(option),
                ],
              },
              index,
            ),
          ),
        ],
      }),
      i("button", {
        className: "action action-secondary",
        type: "submit",
        children: learnSay("Проверить ответ", "Check answer"),
      }),
      submitted &&
        i("div", {
          role: "status",
          className: "quiz-feedback" + (correct ? " correct" : ""),
          children: [
            i("strong", {
              children: correct
                ? learnSay("Верно. ", "Correct. ")
                : learnSay("Попробуйте ещё раз. ", "Try again. "),
            }),
            learnCopy(quiz.explanation),
          ],
        }),
    ],
  });
}
function ClassroomPage() {
  const course = selectedCourse();
  if (!course)
    return i(HubMissing, {
      title: learnSay("Все курсы", "All courses"),
      file: "courses.html",
    });
  const requested = new URLSearchParams(location.search).get("lesson");
  const lesson = requested
    ? course.lessons.find((item) => item.id === requested)
    : course.lessons[0];
  if (!lesson)
    return i(HubMissing, {
      title: learnSay("Все курсы", "All courses"),
      file: "courses.html",
    });
  return i(ClassroomLesson, { course, lesson }, course.id + "/" + lesson.id);
}
function ClassroomLesson({ course, lesson }) {
  const { state, save, error } = useLearningProgress();
  const progress = state[course.id] || { completed: [] };
  const [quizPassed, setQuizPassed] = le.useState(false);
  const [practice, setPractice] = le.useState(false);
  const [message, setMessage] = le.useState("");
  const index = course.lessons.indexOf(lesson);
  const completed = progress.completed.includes(lesson.id);
  const nextLesson = course.lessons[index + 1];
  return i("main", {
    id: "main-content",
    className: "page-container hub-page classroom-page",
    children: [
      i("a", {
        className: "back-link",
        href: pageLink("academy.html"),
        children: learnSay("← Мой кабинет", "← My classroom"),
      }),
      i(DemoNotice, {}),
      i(ProgressError, { error }),
      i("div", {
        className: "classroom-layout",
        children: [
          i("aside", {
            className: "lesson-sidebar",
            children: [
              i("h2", { children: learnCopy(course.title) }),
              i("p", {
                children:
                  progress.completed.length +
                  " / 6 " +
                  learnSay("уроков пройдено", "lessons complete"),
              }),
              i("progress", {
                max: 6,
                value: progress.completed.length,
                "aria-label": learnSay("Прогресс курса", "Course progress"),
              }),
              i("nav", {
                "aria-label": learnSay("Уроки курса", "Course lessons"),
                children: course.lessons.map((item, number) =>
                  i(
                    "a",
                    {
                      href: courseLink(course, true) + "&lesson=" + item.id,
                      "aria-current":
                        item.id === lesson.id ? "page" : undefined,
                      children: [
                        i("span", {
                          children: progress.completed.includes(item.id)
                            ? "✓"
                            : String(number + 1).padStart(2, "0"),
                        }),
                        learnCopy(item.title),
                      ],
                    },
                    item.id,
                  ),
                ),
              }),
              i("a", {
                className: "lesson-exam-link",
                href: hubLink("exam.html", "course", course.id),
                children: learnSay("Итоговый экзамен →", "Final exam →"),
              }),
              i("a", {
                href: courseLink(course),
                children: learnSay("Программа и формат", "Program and format"),
              }),
            ],
          }),
          i("article", {
            className: "lesson-content",
            children: [
              i("span", {
                className: "section-eyebrow",
                children:
                  learnSay("УРОК ", "LESSON ") +
                  (index + 1) +
                  " / 6 · " +
                  learnSay("≈20 МИН + ПРАКТИКА", "≈20 MIN + PRACTICE"),
              }),
              i("h1", { children: learnCopy(lesson.title) }),
              !progress.enrolled &&
                i("div", {
                  className: "lesson-enroll",
                  children: [
                    i("p", {
                      children: learnSay(
                        "Добавьте практикум в кабинет, чтобы отмечать уроки и открыть экзамен.",
                        "Add this workshop to your classroom to track lessons and unlock the exam.",
                      ),
                    }),
                    i("button", {
                      type: "button",
                      className: "action",
                      onClick: () =>
                        save(course.id, () => ({ enrolled: true })),
                      children: learnSay("Начать практикум", "Start workshop"),
                    }),
                  ],
                }),
              i("h2", { children: learnSay("Разбор", "Explanation") }),
              i("p", { children: learnCopy(lesson.body) }),
              i("div", {
                className: "lesson-example",
                children: [
                  i("h2", {
                    children: learnSay("На примере", "Worked example"),
                  }),
                  i("p", { children: learnCopy(lesson.example) }),
                ],
              }),
              i("h2", { children: learnSay("Ваша практика", "Your exercise") }),
              i("p", { children: learnCopy(lesson.practice) }),
              course.simulator
                ? i("aside", {
                    className: "lesson-simulator-link",
                    children: [
                      i("strong", {
                        children: learnSay(
                          "Практика в симуляторе",
                          "Simulator practice",
                        ),
                      }),
                      i("p", {
                        children: learnSay(
                          "Проверьте решения на учебных данных, затем вернитесь к уроку. Результат тренажёра не заменяет тест и самостоятельную работу.",
                          "Test decisions on teaching data, then return to the lesson. Simulator results do not replace the quiz or your independent work.",
                        ),
                      }),
                      i("a", {
                        href: simulatorLink(
                          course.simulator,
                          course.level,
                          course.id,
                        ),
                        children:
                          learnSay(
                            "Открыть задания уровня ",
                            "Open tasks for ",
                          ) +
                          LEVEL_DETAILS[course.level].label +
                          " →",
                      }),
                    ],
                  })
                : null,
              i("p", {
                className: "hub-small",
                children: learnSay(
                  "Выполните задание в своём документе. В демо нет загрузки работ и проверки преподавателем.",
                  "Complete the exercise in your own document. The demo has no assignment uploads or instructor review.",
                ),
              }),
              i("h2", {
                children: learnSay(
                  "Проверьте понимание",
                  "Check your understanding",
                ),
              }),
              i(LessonQuiz, { quiz: lesson.quiz, onCorrect: setQuizPassed }),
              i("div", {
                className: "lesson-completion",
                children: [
                  i("label", {
                    children: [
                      i("input", {
                        type: "checkbox",
                        checked: practice,
                        onChange: (event) => setPractice(event.target.checked),
                      }),
                      learnSay(
                        "Практическое задание выполнено самостоятельно",
                        "I have completed the practical exercise",
                      ),
                    ],
                  }),
                  i("button", {
                    className: "action",
                    type: "button",
                    disabled:
                      completed ||
                      !progress.enrolled ||
                      !quizPassed ||
                      !practice,
                    onClick: () => {
                      save(course.id, (current) => ({
                        completed: [
                          ...new Set([...current.completed, lesson.id]),
                        ],
                      }));
                      setMessage(
                        learnSay(
                          "Урок отмечен как пройденный.",
                          "Lesson marked complete.",
                        ),
                      );
                    },
                    children: completed
                      ? learnSay("✓ Урок пройден", "✓ Lesson complete")
                      : learnSay("Завершить урок", "Complete lesson"),
                  }),
                  !completed &&
                    i("p", {
                      className: "hub-small",
                      children: learnSay(
                        "Для завершения начните практикум, ответьте верно и отметьте практику.",
                        "To complete: start the workshop, answer correctly and confirm your practice.",
                      ),
                    }),
                  i("p", { role: "status", children: message }),
                ],
              }),
              i("div", {
                className: "hub-actions",
                children: [
                  hubButton(
                    nextLesson
                      ? learnSay("Следующий урок →", "Next lesson →")
                      : learnSay("К экзамену →", "Go to exam →"),
                    nextLesson
                      ? courseLink(course, true) + "&lesson=" + nextLesson.id
                      : hubLink("exam.html", "course", course.id),
                    true,
                  ),
                  i("a", {
                    href: course.source,
                    target: "_blank",
                    children: learnSay(
                      "Дополнительное чтение ↗",
                      "Further reading ↗",
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
function scoreCourseExam(courseId, answers) {
  const questions = COURSE_EXAMS[courseId] || [];
  if (
    !questions.length ||
    !questions.every(
      (question, index) =>
        Number.isInteger(answers[index]) &&
        answers[index] >= 0 &&
        answers[index] < question.options.length,
    )
  )
    return null;
  const correct = questions.filter(
    (question, index) => question.answer === answers[index],
  ).length;
  return {
    correct,
    total: questions.length,
    percent: Math.round((correct / questions.length) * 100),
    passed: correct / questions.length >= 0.8,
  };
}
function ExamPage() {
  const course = selectedCourse();
  if (!course)
    return i(HubMissing, {
      title: learnSay("Все курсы", "All courses"),
      file: "courses.html",
    });
  return i(CourseExam, { course }, course.id);
}
function CourseExam({ course }) {
  const { state, save, error } = useLearningProgress();
  const progress = state[course.id] || { completed: [] };
  const [answers, setAnswers] = le.useState({});
  const [result, setResult] = le.useState(null);
  const resultRef = le.useRef(null);
  le.useEffect(() => {
    if (result) resultRef.current?.focus();
  }, [result]);
  const questions = COURSE_EXAMS[course.id];
  const unlocked =
    progress.enrolled && progress.completed.length === course.lessons.length;
  return i("main", {
    id: "main-content",
    className: "page-container hub-page exam-page",
    children: [
      i("a", {
        className: "back-link",
        href: courseLink(course, true),
        children: learnSay("← К урокам", "← Lessons"),
      }),
      i(HubHeading, {
        eyebrow: learnSay("ИТОГОВАЯ ПРОВЕРКА", "FINAL ASSESSMENT"),
        title: learnCopy(course.title),
        text: learnSay(
          "6 ситуаций из практики. Порог — 80% (не менее 5 верных ответов). Без ограничения времени; можно повторить.",
          "Six practical scenarios. Passing threshold: 80% (at least five correct answers). No time limit; retries are available.",
        ),
      }),
      i(DemoNotice, {}),
      i(ProgressError, { error }),
      !unlocked
        ? i("section", {
            className: "hub-empty",
            children: [
              i("h2", {
                children: learnSay(
                  "Сначала пройдите уроки",
                  "Complete the lessons first",
                ),
              }),
              i("p", {
                children:
                  learnSay("Готово уроков: ", "Lessons completed: ") +
                  progress.completed.length +
                  "/6. " +
                  learnSay(
                    "Это порядок прохождения в демо, а не защита платного контента.",
                    "This is demo progression, not protection for paid content.",
                  ),
              }),
              hubButton(
                learnSay("Вернуться к практике", "Return to practice"),
                courseLink(course, true),
              ),
            ],
          })
        : i("form", {
            className: "exam-form",
            onSubmit: (event) => {
              event.preventDefault();
              if (result) return;
              const scored = scoreCourseExam(course.id, answers);
              if (!scored) return;
              setResult(scored);
              save(course.id, (current) => ({
                best: Math.max(current.best || 0, scored.percent),
                attempts: current.attempts + 1,
              }));
            },
            children: [
              ...questions.map((question, index) =>
                i(
                  "fieldset",
                  {
                    disabled: !!result,
                    className: "exam-question",
                    children: [
                      i("legend", {
                        children:
                          index + 1 + ". " + learnCopy(question.question),
                      }),
                      ...question.options.map((option, number) =>
                        i(
                          "label",
                          {
                            className: "quiz-option",
                            children: [
                              i("input", {
                                type: "radio",
                                name: "question-" + index,
                                required: true,
                                checked: answers[index] === number,
                                onChange: () =>
                                  setAnswers({ ...answers, [index]: number }),
                              }),
                              learnCopy(option),
                            ],
                          },
                          number,
                        ),
                      ),
                      result &&
                        i("p", {
                          className:
                            "quiz-feedback" +
                            (answers[index] === question.answer
                              ? " correct"
                              : ""),
                          children: [
                            i("strong", {
                              children:
                                answers[index] === question.answer
                                  ? learnSay("Верно. ", "Correct. ")
                                  : learnSay(
                                      "Верный ответ: ",
                                      "Correct answer: ",
                                    ) +
                                    learnCopy(
                                      question.options[question.answer],
                                    ) +
                                    ". ",
                            }),
                            learnCopy(question.explanation),
                          ],
                        }),
                    ],
                  },
                  index,
                ),
              ),
              !result &&
                i("button", {
                  className: "action",
                  type: "submit",
                  children: learnSay("Завершить экзамен", "Submit exam"),
                }),
              result &&
                i("section", {
                  tabIndex: -1,
                  ref: resultRef,
                  className: "exam-result",
                  "aria-label": learnSay("Результат экзамена", "Exam result"),
                  children: [
                    i("span", {
                      className: "exam-score",
                      children: result.percent + "%",
                    }),
                    i("h2", {
                      children: result.passed
                        ? learnSay("Проверка пройдена", "Assessment passed")
                        : learnSay(
                            "Есть что повторить",
                            "Some topics need another look",
                          ),
                    }),
                    i("p", {
                      children:
                        result.correct +
                        " / " +
                        result.total +
                        ". " +
                        learnSay(
                          "Это результат самопроверки, не официальный сертификат.",
                          "This is a self-assessment result, not an official certificate.",
                        ),
                    }),
                    i("div", {
                      className: "hub-actions",
                      children: [
                        i("button", {
                          className: "action action-secondary",
                          type: "button",
                          onClick: () => {
                            setResult(null);
                            setAnswers({});
                            window.scrollTo({ top: 0, behavior: "instant" });
                          },
                          children: learnSay("Повторить попытку", "Try again"),
                        }),
                        hubButton(
                          learnSay("Мой кабинет →", "My classroom →"),
                          pageLink("academy.html"),
                        ),
                      ],
                    }),
                  ],
                }),
            ],
          }),
    ],
  });
}
