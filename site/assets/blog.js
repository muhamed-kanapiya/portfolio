/* Static editorial templates. Content is kept separate in blog-data.js. */
function blogCopy(value) {
  return value &&
    typeof value === "object" &&
    !Array.isArray(value) &&
    "ru" in value
    ? value[currentLanguage] || value.ru
    : value;
}
function publicBlogPosts() {
  return window.BLOG_POSTS.filter((post) => post.status === "published");
}
function blogCategory(slug) {
  return window.BLOG_CATEGORIES.find((category) => category.slug === slug);
}
function blogPostLink(slug) {
  return pageLink("blog-post.html") + "&post=" + encodeURIComponent(slug);
}
function blogCategoryLink(slug) {
  return (
    pageLink("blog-category.html") + "&category=" + encodeURIComponent(slug)
  );
}
function blogBlockText(block) {
  return [
    blogCopy(block.text),
    blogCopy(block.title),
    blogCopy(block.caption),
    ...(block.headers || []).map(blogCopy),
    ...(block.rows || []).flat().map(blogCopy),
    ...(block.items || []).flatMap((item) =>
      typeof item === "string" || item.ru
        ? [blogCopy(item)]
        : [
            blogCopy(item.title),
            blogCopy(item.text),
            ...(item.blocks || []).map(blogBlockText),
          ],
    ),
  ]
    .filter(Boolean)
    .join(" ");
}
function blogReadMinutes(post) {
  const text = post.sections
    .map(
      (section) =>
        blogCopy(section.title) +
        " " +
        section.blocks.map(blogBlockText).join(" "),
    )
    .join(" ");
  return Math.max(
    1,
    Math.ceil(
      (text.match(/[\p{L}\p{N}]+/gu) || []).length /
        (currentLanguage === "ru" ? 180 : 220),
    ),
  );
}
function blogReadLabel(post) {
  return (
    "≈ " +
    blogReadMinutes(post) +
    (currentLanguage === "ru" ? " мин чтения" : " min read")
  );
}
function filteredBlogPosts(category = "", query = "") {
  const words = query.trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
  return publicBlogPosts().filter(
    (post) =>
      (!category || post.category === category) &&
      words.every((word) =>
        [blogCopy(post.title), blogCopy(post.excerpt), ...post.tags]
          .join(" ")
          .toLocaleLowerCase()
          .includes(word),
      ),
  );
}
function relatedBlogPosts(post) {
  return publicBlogPosts()
    .filter((item) => item.slug !== post.slug)
    .sort(
      (a, b) =>
        Number(b.category === post.category) -
        Number(a.category === post.category),
    )
    .slice(0, 3);
}
function BlogArtwork({ post, large = false }) {
  const category = blogCategory(post.category);
  return i("div", {
    className: "blog-artwork" + (large ? " blog-artwork-large" : ""),
    style: { "--blog-accent": category.color },
    "aria-hidden": true,
    children: [
      i("span", { className: "blog-art-kicker", children: "KANAPIYA / NOTES" }),
      i("span", { className: "blog-art-icon", children: category.emoji }),
      i("strong", { children: blogCopy(post.cover) }),
      i("span", {
        className: "blog-art-bottom",
        children: [post.tags[0], i("span", { children: "↗" })],
      }),
    ],
  });
}
function BlogCard({ post, featured = false }) {
  const category = blogCategory(post.category);
  return i("article", {
    className: "blog-card" + (featured ? " blog-card-featured" : ""),
    children: [
      i("a", {
        href: blogPostLink(post.slug),
        tabIndex: -1,
        "aria-hidden": true,
        children: i(BlogArtwork, { post }),
      }),
      i("div", {
        className: "blog-card-copy",
        children: [
          i("div", {
            className: "blog-card-meta",
            children: [
              i("a", {
                href: blogCategoryLink(category.slug),
                children: blogCopy(category.name),
              }),
              i("span", { children: blogReadLabel(post) }),
            ],
          }),
          i("h2", {
            children: i("a", {
              href: blogPostLink(post.slug),
              children: blogCopy(post.title),
            }),
          }),
          i("p", { children: blogCopy(post.excerpt) }),
          i("a", {
            className: "blog-read-link",
            href: blogPostLink(post.slug),
            children: "Read article ↗",
          }),
        ],
      }),
    ],
  });
}
function BlogMissing() {
  return i("main", {
    className: "page-container blog-missing",
    id: "main-content",
    children: [
      i("h1", { children: "This page is not available." }),
      i("p", {
        children:
          "The article or category may have moved. Browse the available notes.",
      }),
      i(Action, { href: pageLink("blog.html"), children: "All articles" }),
    ],
  });
}
function BlogArchivePage({ categoryPage = false }) {
  const [query, setQuery] = le.useState("");
  const slug = new URLSearchParams(location.search).get("category");
  const category = categoryPage ? blogCategory(slug) : null;
  if (categoryPage && !category) return i(BlogMissing, {});
  const posts = filteredBlogPosts(category?.slug, query);
  return i("main", {
    className: "page-container blog-archive",
    id: "main-content",
    children: [
      i("nav", {
        className: "blog-breadcrumb",
        "aria-label": translateText("Breadcrumbs"),
        children: [
          i("a", { href: pageLink("index.html"), children: "Home" }),
          i("span", { children: "/", "aria-hidden": true }),
          category
            ? i("a", { href: pageLink("blog.html"), children: "Blog" })
            : i("span", { children: "Blog" }),
          category
            ? [
                i("span", { children: "/", "aria-hidden": true }),
                i("span", { children: blogCopy(category.name) }),
              ]
            : null,
        ],
      }),
      i("header", {
        className: "blog-archive-heading",
        children: [
          i("div", {
            children: [
              i("span", {
                className: "section-eyebrow",
                children: category
                  ? category.emoji + " " + translateText("CATEGORY")
                  : "NOTES & PRACTICE",
              }),
              i("h1", {
                children: category
                  ? blogCopy(category.name)
                  : "Ideas worth putting into practice.",
              }),
              i("p", {
                children: category
                  ? blogCopy(category.description)
                  : "Notes on advertising, analytics and websites. Checklists, examples and explanations you can use in your work.",
              }),
            ],
          }),
          i("span", {
            className: "blog-archive-signature",
            "aria-hidden": true,
            children: "by Kanapiya ↗",
          }),
        ],
      }),
      i("div", {
        className: "blog-toolbar",
        children: [
          i("nav", {
            className: "blog-category-links",
            "aria-label": translateText("Blog categories"),
            children: [
              i("a", {
                href: pageLink("blog.html"),
                "aria-current": !category ? "page" : undefined,
                children: "All articles",
              }),
              ...window.BLOG_CATEGORIES.map((item) =>
                i(
                  "a",
                  {
                    href: blogCategoryLink(item.slug),
                    "aria-current":
                      item.slug === category?.slug ? "page" : undefined,
                    children: [
                      i("span", { "aria-hidden": true, children: item.emoji }),
                      blogCopy(item.name),
                      i("small", {
                        children: publicBlogPosts().filter(
                          (post) => post.category === item.slug,
                        ).length,
                      }),
                    ],
                  },
                  item.slug,
                ),
              ),
            ],
          }),
          i("label", {
            className: "blog-search",
            children: [
              i("span", { children: "Search articles" }),
              i("input", {
                type: "search",
                value: query,
                onChange: (event) => setQuery(event.target.value),
                placeholder: translateText("Topic or keyword"),
                "aria-label": translateText("Search articles"),
              }),
            ],
          }),
        ],
      }),
      i("p", {
        className: "blog-result-count",
        role: "status",
        children: translateText("Articles found") + ": " + posts.length,
      }),
      posts.length
        ? i("div", {
            className: "blog-grid",
            children: posts.map((post, index) =>
              i(
                BlogCard,
                { post, featured: !category && !query && index === 0 },
                post.slug,
              ),
            ),
          })
        : i("div", {
            className: "blog-empty",
            children: [
              i("h2", { children: "No articles found." }),
              i("p", { children: "Try a different word or clear the search." }),
              i("button", {
                type: "button",
                className: "action action-secondary",
                onClick: () => setQuery(""),
                children: "Clear search",
              }),
            ],
          }),
    ],
  });
}
function BlogTabs({ block, blockId }) {
  const [active, setActive] = le.useState(0),
    refs = le.useRef([]);
  const select = (index) => {
    setActive(index);
    refs.current[index]?.focus();
  };
  return i("div", {
    className: "blog-tabs",
    children: [
      i("div", {
        role: "tablist",
        "aria-label": blogCopy(block.title),
        children: block.items.map((item, index) =>
          i(
            "button",
            {
              type: "button",
              role: "tab",
              id: blockId + "-tab-" + index,
              "aria-controls": blockId + "-panel-" + index,
              "aria-selected": active === index,
              tabIndex: active === index ? 0 : -1,
              ref: (element) => {
                refs.current[index] = element;
              },
              onClick: () => setActive(index),
              onKeyDown: (event) => {
                const key = event.key;
                if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(key))
                  return;
                event.preventDefault();
                select(
                  key === "Home"
                    ? 0
                    : key === "End"
                      ? block.items.length - 1
                      : (active +
                          (key === "ArrowRight" ? 1 : -1) +
                          block.items.length) %
                        block.items.length,
                );
              },
              children: blogCopy(item.title),
            },
            item.id,
          ),
        ),
      }),
      ...block.items.map((item, index) =>
        i(
          "div",
          {
            role: "tabpanel",
            id: blockId + "-panel-" + index,
            "aria-labelledby": blockId + "-tab-" + index,
            tabIndex: 0,
            hidden: active !== index,
            children: item.blocks.map((child, childIndex) =>
              i(
                BlogBlock,
                {
                  block: child,
                  blockId: blockId + "-" + index + "-" + childIndex,
                },
                childIndex,
              ),
            ),
          },
          item.id,
        ),
      ),
    ],
  });
}
function BlogBlock({ block, blockId }) {
  switch (block.type) {
    case "paragraph":
      return i("p", { children: blogCopy(block.text) });
    case "list":
      return i(block.ordered ? "ol" : "ul", {
        children: block.items.map((text, index) =>
          i("li", { children: blogCopy(text) }, index),
        ),
      });
    case "callout":
      return i("aside", {
        className: "blog-callout",
        children: [
          i("strong", { children: blogCopy(block.title) }),
          i("p", { children: blogCopy(block.text) }),
        ],
      });
    case "quote":
      return i("blockquote", {
        children: i("p", { children: blogCopy(block.text) }),
      });
    case "code":
      return i("figure", {
        className: "blog-code",
        children: [
          i("figcaption", { children: block.language }),
          i("pre", {
            tabIndex: 0,
            children: i("code", { children: block.text }),
          }),
        ],
      });
    case "table":
      return i("div", {
        className: "blog-table-scroll",
        role: "region",
        tabIndex: 0,
        "aria-label": blogCopy(block.caption),
        children: i("table", {
          children: [
            i("caption", { children: blogCopy(block.caption) }),
            i("thead", {
              children: i("tr", {
                children: block.headers.map((text, index) =>
                  i("th", { scope: "col", children: blogCopy(text) }, index),
                ),
              }),
            }),
            i("tbody", {
              children: block.rows.map((row, index) =>
                i(
                  "tr",
                  {
                    children: row.map((text, column) =>
                      i(
                        column === 0 ? "th" : "td",
                        {
                          scope: column === 0 ? "row" : undefined,
                          children: blogCopy(text),
                        },
                        column,
                      ),
                    ),
                  },
                  index,
                ),
              ),
            }),
          ],
        }),
      });
    case "tabs":
      return i(BlogTabs, { block, blockId });
    case "accordion":
      return i("div", {
        className: "blog-accordion",
        children: block.items.map((item, index) =>
          i(
            "details",
            {
              children: [
                i("summary", { children: blogCopy(item.title) }),
                i("p", { children: blogCopy(item.text) }),
              ],
            },
            index,
          ),
        ),
      });
    default:
      return null;
  }
}
function BlogAuthor() {
  const profile = window.ABOUT_PROFILE;
  return i("aside", {
    className: "blog-author",
    children: [
      i("img", {
        src: profile.photo,
        alt: profileCopy(profile.name),
        width: 88,
        height: 88,
        loading: "lazy",
      }),
      i("div", {
        children: [
          i("span", {
            className: "section-eyebrow",
            children: "ABOUT THE AUTHOR",
          }),
          i("h2", { children: profileCopy(profile.name) }),
          i("p", { children: profileCopy(profile.intro) }),
          i("a", {
            className: "blog-read-link",
            href: pageLink("about.html"),
            children: "More about me ↗",
          }),
        ],
      }),
    ],
  });
}
function BlogComments() {
  const [name, setName] = le.useState(""),
    [message, setMessage] = le.useState(""),
    [preview, setPreview] = le.useState(null),
    [error, setError] = le.useState("");
  return i("section", {
    className: "blog-comments",
    id: "comments",
    children: [
      i("span", { className: "section-eyebrow", children: "DISCUSSION" }),
      i("h2", { children: "Comments" }),
      i("p", { children: "No published comments yet." }),
      i("p", {
        className: "blog-comment-note",
        children:
          "This form is a preview: your comment stays on this page and is not sent or published.",
      }),
      i("form", {
        onSubmit: (event) => {
          event.preventDefault();
          if (name.trim().length < 2 || message.trim().length < 10) {
            setError(
              "Enter your name and a comment of at least 10 characters.",
            );
            return;
          }
          setError("");
          setPreview({ name: name.trim(), message: message.trim() });
        },
        children: [
          i("label", {
            children: [
              i("span", { children: "Your name" }),
              i("input", {
                name: "comment-name",
                value: name,
                onChange: (event) => {
                  setName(event.target.value);
                  setPreview(null);
                },
                required: true,
                minLength: 2,
                maxLength: 80,
                autoComplete: "name",
              }),
            ],
          }),
          i("label", {
            children: [
              i("span", { children: "Your comment" }),
              i("textarea", {
                name: "comment-text",
                value: message,
                onChange: (event) => {
                  setMessage(event.target.value);
                  setPreview(null);
                },
                required: true,
                minLength: 10,
                maxLength: 2000,
                rows: 4,
              }),
            ],
          }),
          i("button", {
            type: "submit",
            className: "action",
            children: "Preview comment",
          }),
          i("p", {
            role: "status",
            className: "blog-comment-error",
            children: error,
          }),
        ],
      }),
      preview
        ? i("div", {
            className: "blog-comment-preview",
            role: "status",
            children: [
              i("span", { children: "Preview · not published" }),
              i("strong", { children: preview.name }),
              i("p", { children: preview.message }),
            ],
          })
        : null,
    ],
  });
}
function BlogPostContent({ post }) {
  const category = blogCategory(post.category);
  const [activeSection, setActiveSection] = le.useState(post.sections[0].id),
    [progress, setProgress] = le.useState(0);
  le.useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const body = document.querySelector(".blog-article-body");
      if (!body) return;
      const rect = body.getBoundingClientRect();
      setProgress(
        Math.max(
          0,
          Math.min(
            100,
            ((160 - rect.top) /
              Math.max(1, rect.height - window.innerHeight + 220)) *
              100,
          ),
        ),
      );
      let id = post.sections[0].id;
      for (const section of post.sections) {
        if (
          document.getElementById(section.id)?.getBoundingClientRect().top <=
          180
        )
          id = section.id;
      }
      setActiveSection(id);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [post.slug, currentLanguage]);
  return i("main", {
    className: "page-container blog-post",
    id: "main-content",
    children: [
      i("div", {
        className: "blog-reading-progress",
        "aria-hidden": true,
        children: i("span", { style: { width: progress + "%" } }),
      }),
      i("nav", {
        className: "blog-breadcrumb",
        "aria-label": translateText("Breadcrumbs"),
        children: [
          i("a", { href: pageLink("blog.html"), children: "Blog" }),
          i("span", { "aria-hidden": true, children: "/" }),
          i("a", {
            href: blogCategoryLink(category.slug),
            children: blogCopy(category.name),
          }),
        ],
      }),
      i("article", {
        children: [
          i("header", {
            className: "blog-post-header",
            id: "blog-top",
            children: [
              i("span", {
                className: "section-eyebrow",
                children: category.emoji + " " + blogCopy(category.name),
              }),
              i("h1", { children: blogCopy(post.title) }),
              i("p", {
                className: "blog-post-lead",
                children: blogCopy(post.excerpt),
              }),
              i("div", {
                className: "blog-byline",
                children: [
                  i("img", {
                    src: window.ABOUT_PROFILE.photo,
                    alt: "",
                    width: 38,
                    height: 38,
                  }),
                  i("a", {
                    href: pageLink("about.html"),
                    children: profileCopy(window.ABOUT_PROFILE.name),
                  }),
                  i("time", {
                    dateTime: post.date,
                    children: new Intl.DateTimeFormat(
                      currentLanguage === "ru" ? "ru-RU" : "en-GB",
                      { day: "numeric", month: "long", year: "numeric" },
                    ).format(new Date(post.date + "T12:00:00")),
                  }),
                  i("span", { children: blogReadLabel(post) }),
                ],
              }),
              i(BlogArtwork, { post, large: true }),
            ],
          }),
          i("div", {
            className: "blog-reading-layout",
            children: [
              i("aside", {
                className: "blog-toc",
                children: i("details", {
                  open: true,
                  children: [
                    i("summary", { children: "On this page" }),
                    i("nav", {
                      "aria-label": translateText("Table of contents"),
                      children: post.sections.map((section, index) =>
                        i(
                          "a",
                          {
                            href: "#" + section.id,
                            "aria-current":
                              activeSection === section.id
                                ? "location"
                                : undefined,
                            children: [
                              i("span", {
                                children: String(index + 1).padStart(2, "0"),
                              }),
                              blogCopy(section.title),
                            ],
                          },
                          section.id,
                        ),
                      ),
                    }),
                    i("a", {
                      className: "blog-toc-comment",
                      href: "#comments",
                      children: "Discuss the article ↓",
                    }),
                  ],
                }),
              }),
              i("div", {
                className: "blog-main-column",
                children: [
                  i("div", {
                    className: "blog-article-body",
                    children: post.sections.map((section) =>
                      i(
                        "section",
                        {
                          className: "blog-article-section",
                          id: section.id,
                          children: [
                            i("h2", { children: blogCopy(section.title) }),
                            ...section.blocks.map((block, index) =>
                              i(
                                BlogBlock,
                                {
                                  block,
                                  blockId:
                                    post.slug + "-" + section.id + "-" + index,
                                },
                                index,
                              ),
                            ),
                          ],
                        },
                        section.id,
                      ),
                    ),
                  }),
                  post.sources.length
                    ? i("aside", {
                        className: "blog-sources",
                        children: [
                          i("h2", { children: "Further reading" }),
                          ...post.sources.map((source) =>
                            i(
                              "a",
                              {
                                href: source.url,
                                target: "_blank",
                                "data-outbound": "blog-source-" + post.slug,
                                children: source.label + " ↗",
                              },
                              source.url,
                            ),
                          ),
                        ],
                      })
                    : null,
                  i("div", {
                    className: "blog-tags",
                    children: post.tags.map((tag) =>
                      i("span", { children: tag }, tag),
                    ),
                  }),
                  i(BlogAuthor, {}),
                  i(BlogComments, {}),
                ],
              }),
            ],
          }),
        ],
      }),
      i("section", {
        className: "blog-related",
        children: [
          i("div", {
            className: "section-heading",
            children: [
              i("div", {
                children: [
                  i("span", {
                    className: "section-eyebrow",
                    children: "KEEP READING",
                  }),
                  i("h2", { children: "Related articles" }),
                ],
              }),
              i(Action, {
                href: pageLink("blog.html"),
                secondary: true,
                children: "All articles",
              }),
            ],
          }),
          i("div", {
            className: "blog-related-grid",
            children: relatedBlogPosts(post).map((item) =>
              i(BlogCard, { post: item }, item.slug),
            ),
          }),
        ],
      }),
    ],
  });
}
function BlogPostPage() {
  const slug = new URLSearchParams(location.search).get("post");
  const post = publicBlogPosts().find((item) => item.slug === slug);
  return post ? i(BlogPostContent, { post }, post.slug) : i(BlogMissing, {});
}
function blogMetadata(page) {
  const params = new URLSearchParams(location.search);
  const post = publicBlogPosts().find(
    (item) => item.slug === params.get("post"),
  );
  const category = blogCategory(params.get("category"));
  if (page === "blog-post")
    return {
      title: post
        ? blogCopy(post.title)
        : translateText("This page is not available."),
      description: post ? blogCopy(post.excerpt) : "",
    };
  if (page === "blog-category")
    return {
      title: category
        ? blogCopy(category.name)
        : translateText("This page is not available."),
      description: category ? blogCopy(category.description) : "",
    };
  return {
    title: translateText("Blog"),
    description: translateText(
      "Notes on advertising, analytics and websites. Checklists, examples and explanations you can use in your work.",
    ),
  };
}
Object.assign(window.RU, {
  Blog: "Блог",
  Breadcrumbs: "Навигационная цепочка",
  CATEGORY: "РУБРИКА",
  "NOTES & PRACTICE": "ЗАМЕТКИ И ПРАКТИКА",
  "Ideas worth putting into practice.":
    "Идеи, которые стоит попробовать в деле.",
  "Notes on advertising, analytics and websites. Checklists, examples and explanations you can use in your work.":
    "О рекламе, аналитике и сайтах. Чек-листы, примеры и объяснения, которые пригодятся в работе.",
  "Blog categories": "Рубрики блога",
  "All articles": "Все статьи",
  "Read article ↗": "Читать статью ↗",
  "Search articles": "Поиск по статьям",
  "Topic or keyword": "Тема или ключевое слово",
  "Articles found": "Найдено статей",
  "No articles found.": "Статей не найдено.",
  "Try a different word or clear the search.":
    "Попробуйте другое слово или очистите поиск.",
  "Clear search": "Очистить поиск",
  "This page is not available.": "Эта страница недоступна.",
  "The article or category may have moved. Browse the available notes.":
    "Возможно, статья или рубрика перемещена. Посмотрите доступные материалы.",
  "ABOUT THE AUTHOR": "ОБ АВТОРЕ",
  "More about me ↗": "Подробнее обо мне ↗",
  DISCUSSION: "ОБСУЖДЕНИЕ",
  Comments: "Комментарии",
  "No published comments yet.": "Опубликованных комментариев пока нет.",
  "This form is a preview: your comment stays on this page and is not sent or published.":
    "Это предпросмотр формы: комментарий остаётся на этой странице, не отправляется и не публикуется.",
  "Your comment": "Ваш комментарий",
  "Preview comment": "Предпросмотр комментария",
  "Preview · not published": "Предпросмотр · не опубликовано",
  "Enter your name and a comment of at least 10 characters.":
    "Укажите имя и комментарий не короче 10 символов.",
  "Table of contents": "Содержание статьи",
  "Discuss the article ↓": "Обсудить статью ↓",
  "Further reading": "Полезные источники",
  "KEEP READING": "ПРОДОЛЖИТЬ ЧТЕНИЕ",
  "Related articles": "Похожие статьи",
});
