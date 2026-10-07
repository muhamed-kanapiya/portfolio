function VideoThumbnail({ video }) {
  const [failed, setFailed] = le.useState(false);
  return i("div", {
    className: "video-thumbnail",
    children: [
      !failed &&
        i("img", {
          src: "https://i.ytimg.com/vi/" + video.id + "/hqdefault.jpg",
          alt: "",
          loading: "lazy",
          width: 480,
          height: 360,
          onError: () => setFailed(true),
        }),
      i("span", {
        className: "video-play-mark",
        "aria-hidden": true,
        children: "▶",
      }),
      i("span", {
        className: "video-duration",
        children: "≈ " + video.duration,
      }),
    ],
  });
}
function VideoCard({ video }) {
  return i("article", {
    className: "video-card",
    children: [
      i("a", {
        href: hubLink("video.html", "video", video.id),
        "aria-label": learnCopy(video.title),
        children: i(VideoThumbnail, { video }),
      }),
      i("div", {
        className: "video-card-body",
        children: [
          i("span", {
            className: "hub-kicker",
            children: learnCopy(TRAVEL_COUNTRIES[video.country]),
          }),
          i("h2", {
            children: i("a", {
              href: hubLink("video.html", "video", video.id),
              children: learnCopy(video.title),
            }),
          }),
          i("p", { children: learnCopy(video.description) }),
        ],
      }),
    ],
  });
}
function TravelPage() {
  const [country, setCountry] = le.useState("all");
  const videos = TRAVEL_VIDEOS.filter(
    (video) => country === "all" || video.country === country,
  );
  return i("main", {
    id: "main-content",
    className: "page-container hub-page",
    children: [
      i(HubHeading, {
        eyebrow: "NOMAD WALKS KAZAKHSTAN",
        title: learnSay(
          "Иногда лучший маршрут — пешком.",
          "Sometimes the best route is on foot.",
        ),
        text: learnSay(
          "Мой канал о прогулках, дорогах и поездках. Казахстан и мир без студийных декораций: улицы, транспорт и впечатления по пути.",
          "My channel about walks, roads and journeys. Kazakhstan and the world beyond a studio: streets, transport and impressions along the way.",
        ),
        actions: [
          hubButton(
            learnSay("Канал на YouTube ↗", "YouTube channel ↗"),
            TRAVEL_CHANNEL,
          ),
        ],
      }),
      i("div", {
        className: "hub-filters",
        "aria-label": learnSay("Страна", "Country"),
        children: [
          ["all", learnSay("Все поездки", "All trips")],
          ...Object.entries(TRAVEL_COUNTRIES).map(([id, title]) => [
            id,
            learnCopy(title),
          ]),
        ].map(([id, title]) =>
          i(
            "button",
            {
              type: "button",
              "aria-pressed": country === id,
              onClick: () => setCountry(id),
              children: title,
            },
            id,
          ),
        ),
      }),
      i("p", {
        role: "status",
        className: "hub-small",
        children:
          learnSay("Видео в подборке: ", "Videos in this selection: ") +
          videos.length,
      }),
      i("div", {
        className: "hub-grid three",
        children: videos.map((video) => i(VideoCard, { video }, video.id)),
      }),
      i("p", {
        className: "hub-small travel-disclosure",
        children: learnSay(
          "Подборка обновляется вручную. Длительность некоторых роликов округлена; оригинальное название и точное время — на YouTube. Превью загружаются с YouTube, проигрыватель — только по нажатию.",
          "This selection is curated manually. Some durations are rounded; original titles and exact running times are on YouTube. Thumbnails load from YouTube; the player loads only when selected.",
        ),
      }),
    ],
  });
}
function VideoPage() {
  const video = TRAVEL_VIDEOS.find(
    (item) => item.id === new URLSearchParams(location.search).get("video"),
  );
  const [loaded, setLoaded] = le.useState(false);
  if (!video)
    return i(HubMissing, {
      title: learnSay("Все видео", "All videos"),
      file: "travel.html",
    });
  const related = TRAVEL_VIDEOS.filter(
    (item) => item.country === video.country && item.id !== video.id,
  ).slice(0, 3);
  return i("main", {
    id: "main-content",
    className: "page-container hub-page",
    children: [
      i("a", {
        href: pageLink("travel.html"),
        className: "back-link",
        children: learnSay("← Все путешествия", "← All journeys"),
      }),
      i(HubHeading, {
        eyebrow:
          learnCopy(TRAVEL_COUNTRIES[video.country]) +
          " / NOMAD WALKS KAZAKHSTAN",
        title: learnCopy(video.title),
        text: learnCopy(video.description),
      }),
      i("div", {
        className: "travel-player",
        children: loaded
          ? i("iframe", {
              src:
                "https://www.youtube-nocookie.com/embed/" + video.id + "?rel=0",
              title: learnCopy(video.title),
              allow:
                "accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen",
              allowFullScreen: true,
              referrerPolicy: "strict-origin-when-cross-origin",
            })
          : i("button", {
              type: "button",
              onClick: () => setLoaded(true),
              "aria-label": learnSay(
                "Загрузить проигрыватель YouTube",
                "Load YouTube player",
              ),
              children: [
                i(VideoThumbnail, { video }),
                i("span", {
                  className: "player-load-label",
                  children: learnSay(
                    "Загрузить проигрыватель YouTube",
                    "Load YouTube player",
                  ),
                }),
              ],
            }),
      }),
      i("p", {
        className: "hub-small",
        children: learnSay(
          "При загрузке проигрывателя браузер соединяется с YouTube. Если видео не воспроизводится здесь, откройте оригинал.",
          "Loading the player connects your browser to YouTube. If playback is unavailable here, open the original video.",
        ),
      }),
      i("div", {
        className: "hub-actions",
        children: [
          hubButton(
            learnSay("Смотреть на YouTube ↗", "Watch on YouTube ↗"),
            "https://www.youtube.com/watch?v=" + video.id,
          ),
          hubButton(
            learnSay("Подписаться на канал ↗", "Subscribe to the channel ↗"),
            TRAVEL_CHANNEL,
            true,
          ),
        ],
      }),
      i("section", {
        className: "hub-section",
        children: [
          i("h2", {
            children: learnSay(
              "Продолжить путешествие",
              "Continue the journey",
            ),
          }),
          i("div", {
            className: "hub-grid three",
            children: related.map((item) =>
              i(VideoCard, { video: item }, item.id),
            ),
          }),
        ],
      }),
    ],
  });
}
