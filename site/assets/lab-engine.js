/* Deterministic teaching models, not forecasts or calls to Google's services. */
function labDefaults(project) {
  return {
    selected: [],
    mapping: {},
    negatives: "",
    robots: "User-agent: *\nDisallow: /\n",
    sitemap: [],
    siteStatus: 200,
    noindex: true,
    canonical: "home",
    mobile: false,
    imageKB: 1800,
    serverMS: 1200,
    jsKB: 800,
    depth: 5,
    linked: false,
    coverage: 25,
    title: "Главная / Home",
    description: "Наш сайт / Our website",
    redirect: 302,
    redirectTarget: "/",
    tag: "none",
    tagId: "",
    event: "page_view",
    trigger: "click",
    duplicate: true,
    consent: "granted",
    primary: "page_view",
    crm: false,
    dedup: false,
    geo: "world",
    presence: false,
    network: "display",
    landing: "/",
    headline: "Welcome",
    match: "broad",
    daily: 10000,
    maxCPC: project.cpc,
    strategy: "clicks",
    targetCPA: 1000,
    days: 7,
    lag: 0,
    order: project.order,
    margin: project.margin,
    schedule: "all",
    device: "all",
  };
}
const LAB_ENUMS = {
  canonical: ["self", "home", "external"],
  tag: ["none", "gtm", "gtag"],
  trigger: ["form", "click", "page"],
  consent: ["granted", "denied"],
  primary: ["page_view", "generate_lead", "qualified_lead"],
  geo: ["project", "world", "other"],
  network: ["search", "display"],
  landing: ["/", "/services/main/", "/missing/"],
  match: ["broad", "phrase", "exact"],
  strategy: ["clicks", "conversions", "tcpa"],
  schedule: ["all", "working"],
  device: ["all", "mobile", "desktop"],
  redirectTarget: ["/", "/services/main/", "/missing/"],
};
const LAB_RANGES = {
  siteStatus: [200, 503],
  imageKB: [100, 3000],
  serverMS: [100, 2000],
  jsKB: [50, 1200],
  depth: [1, 8],
  coverage: [0, 100],
  redirect: [301, 302],
  daily: [2000, 20000],
  maxCPC: [200, 3000],
  targetCPA: [500, 20000],
  days: [7, 56],
  lag: [0, 14],
  order: [10000, 500000],
  margin: [5, 95],
};
function labClean(raw, project) {
  const result = labDefaults(project),
    keys = new Set(labKeywords(project).map((k) => k.id)),
    paths = new Set(labPages(project).map((p) => p.path));
  if (!raw || typeof raw !== "object") return result;
  for (const key of Object.keys(result)) {
    const value = raw[key];
    if (key === "selected")
      result.selected = Array.isArray(value)
        ? [...new Set(value.filter((k) => keys.has(k)))]
        : [];
    else if (key === "sitemap")
      result.sitemap = Array.isArray(value)
        ? [...new Set(value.filter((k) => paths.has(k)))]
        : [];
    else if (key === "mapping") {
      if (value && typeof value === "object")
        for (const id of keys)
          if (["service", "guide"].includes(value[id]))
            result.mapping[id] = value[id];
    } else if (LAB_ENUMS[key]) {
      if (LAB_ENUMS[key].includes(value)) result[key] = value;
    } else if (typeof result[key] === "boolean") {
      if (typeof value === "boolean") result[key] = value;
    } else if (typeof result[key] === "number") {
      if (Number.isFinite(value)) {
        const [min, max] = LAB_RANGES[key];
        result[key] = Math.max(min, Math.min(max, Math.round(value)));
      }
    } else if (typeof value === "string")
      result[key] = value.slice(
        0,
        key === "robots" ? 6000 : key === "negatives" ? 2000 : 500,
      );
  }
  return result;
}
function labSignature(input) {
  return JSON.stringify(input);
}
function labAnalyticsSignature(input) {
  return JSON.stringify([
    input.tag,
    input.tagId,
    input.event,
    input.trigger,
    input.duplicate,
  ]);
}
function labSiteSignature(input) {
  return JSON.stringify([
    input.robots,
    input.siteStatus,
    input.noindex,
    input.canonical,
    input.mobile,
    input.imageKB,
    input.serverMS,
    input.jsKB,
    input.redirect,
    input.redirectTarget,
  ]);
}
function labMapSignature(input) {
  return JSON.stringify([...input.sitemap].sort());
}
function labNormal(text) {
  return String(text)
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .trim();
}
function labBlocked(text, negatives) {
  const query = " " + labNormal(text) + " ";
  return negatives
    .split(/\n|,/)
    .map(labNormal)
    .filter(Boolean)
    .some((phrase) => query.includes(" " + phrase + " "));
}
function labSemantic(topic, input, project) {
  const bank = labKeywords(project),
    suitable = bank.filter(
      (k) => k.fit && (topic === "seo" || k.intent === "commercial"),
    ),
    selected = bank.filter((k) => input.selected.includes(k.id)),
    good = selected.filter((k) => suitable.includes(k));
  const mapped = good.filter(
    (k) =>
      input.mapping[k.id] ===
      (k.intent === "information" ? "guide" : "service"),
  );
  const blocked = good.filter(
    (k) =>
      labBlocked(k.text.ru, input.negatives) ||
      labBlocked(k.text.en, input.negatives),
  );
  const noise = bank.filter((k) =>
      [20, 21, 22, 23].some((n) => k.id === project.id + "-k" + n),
    ),
    excluded = noise.filter(
      (k) =>
        labBlocked(k.text.ru, input.negatives) ||
        labBlocked(k.text.en, input.negatives),
    );
  return {
    bank,
    selected,
    good,
    precision: good.length / Math.max(1, selected.length),
    recall: good.length / suitable.length,
    mapping: mapped.length / Math.max(1, good.length),
    info: mapped.filter((k) => k.intent === "information").length,
    blocked: blocked.length,
    excluded: excluded.length,
    volume: good.reduce((s, k) => s + k.volume, 0),
  };
}
/* Robots subset: Googlebot/* groups, longest match, wildcards, end anchor and allow ties. */
function labRobots(text, path) {
  const groups = [];
  let group = null,
    hasRules = false;
  const warnings = [];
  const sitemaps = [];
  for (const raw of text.split(/\r?\n/)) {
    const line = raw.split("#")[0].trim();
    if (!line) continue;
    const colon = line.indexOf(":");
    if (colon < 0) {
      warnings.push(line);
      continue;
    }
    const key = line.slice(0, colon).trim().toLowerCase(),
      value = line.slice(colon + 1).trim();
    if (key === "user-agent") {
      if (!group || hasRules) {
        group = { agents: [], rules: [] };
        groups.push(group);
        hasRules = false;
      }
      group.agents.push(value.toLowerCase());
    } else if (key === "sitemap") sitemaps.push(value);
    else if (["allow", "disallow"].includes(key)) {
      hasRules = true;
      if (group && value.startsWith("/"))
        group.rules.push({ allow: key === "allow", value });
      else if (value) warnings.push(line);
    } else warnings.push(line);
  }
  const explicit = groups.filter((g) => g.agents.includes("googlebot")),
    chosen = explicit.length
      ? explicit
      : groups.filter((g) => g.agents.includes("*"));
  let best = null;
  for (const rule of chosen.flatMap((g) => g.rules)) {
    const end = rule.value.endsWith("$"),
      pattern = rule.value
        .slice(0, end ? -1 : undefined)
        .split("*")
        .map((s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
        .join(".*");
    const length = rule.value.replace(/[*$]/g, "").length;
    if (
      new RegExp("^" + pattern + (end ? "$" : "")).test(path) &&
      (!best || length > best.length || (length === best.length && rule.allow))
    )
      best = { ...rule, length };
  }
  return {
    allowed: !best || best.allow,
    rule: best?.value || "—",
    warnings,
    sitemaps,
  };
}
function labSitemap(input, project) {
  const expected = labPages(project)
    .filter((p) => ["money", "guide"].includes(p.kind))
    .map((p) => p.path);
  const valid =
    expected.every((p) => input.sitemap.includes(p)) &&
    input.sitemap.length === expected.length;
  const xml =
    '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    input.sitemap
      .map((p) => "  <url><loc>" + project.domain + p + "</loc></url>")
      .join("\n") +
    "\n</urlset>";
  return { valid, xml };
}
function labLCP(input) {
  return (
    0.25 + input.serverMS / 1000 + input.imageKB / 1800 + input.jsKB / 1400
  );
}
function labMeta(input, project) {
  const related = (value) =>
    [project.core.ru, project.core.en].some((core) =>
      labNormal(value).includes(core),
    );
  return (
    related(input.title) &&
    input.title.length >= 25 &&
    input.title.length <= 70 &&
    input.description.length >= 70 &&
    input.description.length <= 180
  );
}
function labEvent(input, tools, project, kind) {
  const live = tools.published,
    valid =
      live && live.tag !== "none" && live.tagId === "G-DEMO" + project.idSuffix;
  const fired =
    valid &&
    input.consent === "granted" &&
    (live.trigger === "click" ||
      (live.trigger === "form" && kind === "form") ||
      (live.trigger === "page" && kind === "page"));
  return {
    signature: labAnalyticsSignature(input),
    consent: input.consent,
    kind,
    events: fired
      ? Array.from({ length: live.duplicate ? 2 : 1 }, () => ({
          name: live.event,
          status: 204,
          endpoint: "/training/collect",
        }))
      : [],
  };
}
function labAnalyticsOK(input, tools, project) {
  const report = tools.form;
  return (
    input.tag !== "none" &&
    input.tagId === "G-DEMO" + project.idSuffix &&
    input.trigger === "form" &&
    input.event === "generate_lead" &&
    !input.duplicate &&
    input.consent === "granted" &&
    tools.publishedSignature === labAnalyticsSignature(input) &&
    report?.signature === labAnalyticsSignature(input) &&
    report.consent === input.consent &&
    report.events.length === 1 &&
    report.events[0].name === "generate_lead"
  );
}
function labSimulate(topic, input, project, tools = {}) {
  const sem = labSemantic(topic, input, project),
    lcp = labLCP(input),
    speed = Math.max(0.45, Math.min(1, 2.5 / lcp)),
    publicPages = labPages(project).filter((p) =>
      ["money", "guide"].includes(p.kind),
    );
  const indexable = publicPages.filter(
    (p) =>
      input.siteStatus === 200 &&
      !input.noindex &&
      input.canonical === "self" &&
      labRobots(input.robots, p.path).allowed &&
      labRobots(input.robots, "/assets/app.js").allowed,
  ).length;
  const hours =
    4 +
    (input.linked ? 6 : 0) +
    (input.depth <= 3 ? 3 : 0) +
    input.coverage * 0.18 +
    (lcp <= 2.5 ? 6 : 0) +
    (labMeta(input, project) ? 2 : 0) +
    (input.redirect === 301 ? 3 : 0) +
    sem.selected.length * 0.25;
  if (topic === "seo") {
    const discovery = tools.submitted === labMapSignature(input) ? 1 : 0.65;
    const health =
      (indexable / 6) *
      (input.mobile ? 1 : 0.65) *
      speed *
      (input.linked && input.depth <= 3 ? 1 : 0.55);
    const coverage =
      sem.recall *
      sem.precision *
      (0.3 + 0.7 * sem.mapping) *
      (input.coverage / 100);
    const ctr = labMeta(input, project) ? 4.8 : 2.2;
    const target = sem.volume * 1.3 * health * coverage * discovery;
    const series = Array.from({ length: 12 }, (_, j) => {
      const ramp = 0.12 + 0.88 * (1 - Math.exp(-j / 4));
      const impressions = target * ramp;
      return {
        period: j + 1,
        value: (impressions * ctr) / 100,
        impressions,
        ctr,
        baseline: 35,
      };
    });
    return {
      series,
      indexable,
      hours,
      lcp,
      clicks: series.at(-1).value,
      impressions: series.at(-1).impressions,
      ctr,
      sem,
    };
  }
  const relevant = Math.max(
    0.02,
    sem.precision * (1 - sem.blocked / Math.max(1, sem.good.length)),
  );
  const targeting =
    (input.geo === "project" ? 1 : input.geo === "world" ? 0.35 : 0.1) *
    (input.presence ? 1 : 0.7) *
    (input.network === "search" ? 1 : 0.55);
  const match = { exact: 0.8, phrase: 1, broad: 1.5 }[input.match],
    matchQuality = { exact: 1, phrase: 0.95, broad: 0.7 }[input.match];
  const cpc =
    project.cpc *
    (input.match === "exact" ? 1.08 : input.match === "broad" ? 0.85 : 1);
  const auction = Math.min(1, input.maxCPC / cpc),
    deviceReach =
      input.device === "all" ? 1 : input.device === "mobile" ? 0.72 : 0.28;
  const demand =
    sem.selected.reduce((sum, k) => sum + k.volume, 0) *
    0.08 *
    match *
    deviceReach *
    (input.schedule === "working" ? 0.8 : 1);
  const available = demand * auction,
    clicks = Math.min((input.daily * 30) / cpc, available),
    spend = clicks * cpc;
  const landing =
    input.landing === "/services/main/" && input.siteStatus === 200
      ? 1
      : input.landing === "/missing/"
        ? 0
        : 0.4;
  const ad = [project.core.ru, project.core.en].some((c) =>
    labNormal(input.headline).includes(c),
  )
    ? 1
    : 0.6;
  const bid =
    input.strategy === "clicks"
      ? 0.85
      : input.strategy === "tcpa"
        ? Math.min(1, input.targetCPA / (project.cpc / 0.045))
        : 1;
  const leads =
    clicks *
    0.085 *
    landing *
    speed *
    (input.mobile || input.device === "desktop" ? 1 : 0.65) *
    ad *
    bid;
  const quality =
    leads *
    relevant *
    targeting *
    matchQuality *
    (0.72 + (0.2 * sem.excluded) / 4);
  const sales = quality * project.close,
    revenue = sales * input.order,
    profit = (revenue * input.margin) / 100 - spend;
  const maturity = Math.min(1, Math.max(0.15, (input.days - input.lag) / 28));
  const measured = labAnalyticsOK(input, tools, project) ? leads * maturity : 0;
  const series = Array.from({ length: 4 }, (_, j) => ({
    period: j + 1,
    value: (quality * (j + 1)) / 4,
    baseline: 4 * (j + 1),
    impressions: (clicks * (j + 1)) / 0.05 / 4,
    ctr: 5,
  }));
  return {
    series,
    indexable,
    hours,
    lcp,
    sem,
    spend,
    clicks,
    leads,
    quality,
    cpql: quality ? spend / quality : Infinity,
    cpa: leads ? spend / leads : Infinity,
    sales,
    revenue,
    profit,
    roas: spend ? (revenue / spend) * 100 : 0,
    measured,
  };
}
function labTool(action, input, project, tools, topic, token = "") {
  const next = { ...tools };
  if (action === "crawl") {
    next.crawl = labSiteSignature(input);
    next.crawlInput = { ...input };
  }
  if (action === "build")
    next.xml = {
      signature: labMapSignature(input),
      ...labSitemap(input, project),
    };
  if (action === "verify")
    next.verified = token.trim() === "demo-" + project.idSuffix;
  if (action === "submit")
    next.submitted =
      next.verified &&
      next.xml?.valid &&
      next.xml.signature === labMapSignature(input) &&
      labSitemap(input, project).valid
        ? labMapSignature(input)
        : null;
  if (action === "inspect")
    next.inspect = {
      signature: labSiteSignature(input),
      path: "/services/main/",
      input: { ...input },
    };
  if (action === "publish") {
    next.published = {
      tag: input.tag,
      tagId: input.tagId,
      event: input.event,
      trigger: input.trigger,
      duplicate: input.duplicate,
    };
    next.publishedSignature = labAnalyticsSignature(input);
  }
  if (["form", "click", "page"].includes(action))
    next[action] = labEvent(input, tools, project, action);
  if (action === "crm")
    next.offline = {
      signature: JSON.stringify([input.crm, input.dedup, input.primary]),
      events: input.crm ? (input.dedup ? 1 : 2) : 0,
    };
  if (action === "run") {
    next.run = labSignature(input);
    next.runAnalytics = labAnalyticsOK(input, tools, project);
    next.runResult = labSimulate(topic, input, project, tools);
  }
  return next;
}
function labChecks(topic, task, input, project, tools) {
  const result = labSimulate(topic, input, project, tools),
    s = result.sem,
    robots = labRobots(input.robots, "/"),
    map = labSitemap(input, project);
  const robotOK =
    ["/", "/services/main/", "/assets/app.js"].every(
      (p) => labRobots(input.robots, p).allowed,
    ) &&
    ["/account/", "/search/"].every(
      (p) => !labRobots(input.robots, p).allowed,
    ) &&
    robots.sitemaps.includes(project.domain + "/sitemap.xml") &&
    !robots.warnings.length;
  const checks = {
    robots: [
      robotOK,
      "robots.txt: доступ, исключения и Sitemap",
      "robots.txt: access, exclusions and Sitemap",
    ],
    crawl: [
      tools.crawl === labSiteSignature(input),
      "Свежий обход учебным роботом",
      "Fresh training-crawler report",
    ],
    sitemap: [
      map.valid &&
        tools.xml?.signature === labMapSignature(input) &&
        tools.xml.valid,
      "XML собран: 6 публичных URL, без лишних",
      "XML built: 6 public URLs, no extras",
    ],
    verified: [
      tools.verified === true,
      "Владение учебным доменом подтверждено",
      "Training domain ownership verified",
    ],
    submitted: [
      tools.verified && map.valid && tools.submitted === labMapSignature(input),
      "Текущая карта принята учебной консолью",
      "Current sitemap accepted by training console",
    ],
    analytics: [
      labAnalyticsOK(input, tools, project),
      "Опубликованный тег: одна заявка generate_lead",
      "Published tag: exactly one generate_lead",
    ],
    keywords: [
      s.good.length >= (topic === "seo" ? 10 : 8) &&
        s.precision >= 0.85 &&
        s.recall >= 0.6,
      "Семантика: точность ≥85%, охват ≥60%",
      "Keywords: precision ≥85%, coverage ≥60%",
    ],
    mapping: [
      s.mapping >= 0.85 && s.info >= 2,
      "Интент: ≥85% распределено, 2+ статьи",
      "Intent: ≥85% mapped, 2+ guide queries",
    ],
    metadata: [
      labMeta(input, project),
      "Тематический title 25–70, description 70–180 знаков",
      "Relevant title 25–70, description 70–180 characters",
    ],
    indexable: [
      result.indexable === 6,
      "Все 6 страниц доступны для индексации",
      "All 6 pages eligible for indexing",
    ],
    inspect: [
      tools.inspect?.signature === labSiteSignature(input),
      "Свежая проверка основной посадочной",
      "Fresh main landing-page inspection",
    ],
    links: [
      input.linked && input.depth <= 3,
      "Нет сирот, глубина ≤3",
      "No orphans, depth ≤3",
    ],
    performance: [
      input.mobile && result.lcp <= 2.5,
      "Мобильная версия и модельный LCP ≤2,5 с",
      "Mobile layout and modeled LCP ≤2.5s",
    ],
    content: [input.coverage >= 75, "Покрытие тем ≥75%", "Topic coverage ≥75%"],
    migration: [
      input.redirect === 301 && input.redirectTarget === "/services/main/",
      "Прямой 301 на подходящую новую страницу",
      "Direct 301 to relevant replacement",
    ],
    hours: [
      result.hours <= 48,
      "План укладывается в 48 часов",
      "Plan fits within 48 hours",
    ],
    seoGrowth: [
      result.clicks >= 350,
      "На 12-й неделе ≥350 кликов",
      "Week twelve: ≥350 clicks",
    ],
    targeting: [
      input.geo === "project" && input.presence && input.network === "search",
      "Целевая география, присутствие, Search",
      "Project geography, presence, Search",
    ],
    landing: [
      input.landing === "/services/main/" && input.siteStatus === 200,
      "Основная посадочная отвечает HTTP 200",
      "Main landing page returns HTTP 200",
    ],
    negatives: [
      s.excluded === 4 && s.blocked === 0,
      "4 группы мусорных запросов исключены без потерь",
      "4 irrelevant query groups excluded without losses",
    ],
    match: [
      input.match !== "broad",
      "Первый запуск: phrase или exact",
      "First launch: phrase or exact",
    ],
    ad: [
      [project.core.ru, project.core.en].some((c) =>
        labNormal(input.headline).includes(c),
      ) && input.headline.length >= 10,
      "Заголовок по теме бизнеса, от 10 знаков",
      "Relevant headline, at least 10 characters",
    ],
    clickDebug: [
      tools.click?.signature === labAnalyticsSignature(input) &&
        tools.click.consent === input.consent &&
        tools.click.events.length === 0,
      "Обычный клик проверен: 0 заявок",
      "Normal click tested: 0 leads",
    ],
    conversion: [
      ["generate_lead", "qualified_lead"].includes(input.primary),
      "Основная конверсия — заявка, не page_view",
      "Primary conversion is a lead, not page_view",
    ],
    run: [
      tools.run === labSignature(input) &&
        tools.runAnalytics === labAnalyticsOK(input, tools, project),
      "Запуск кампании с текущими настройками",
      "Campaign run with current settings",
    ],
    budget: [
      input.daily * 30 <= 300000 && result.spend <= 300000,
      "Месячный лимит и расход ≤300 000 ₸",
      "Monthly limit and spend ≤300,000 KZT",
    ],
    quality: [
      result.quality >= 10 && result.cpql <= 12000,
      "≥10 качественных лидов, CPQL ≤12 000 ₸",
      "≥10 qualified leads, CPQL ≤12,000 KZT",
    ],
    bidding: [
      input.strategy !== "clicks" &&
        (input.strategy !== "tcpa" || input.targetCPA >= result.cpa * 0.5),
      "Стратегия конверсий с достижимым tCPA",
      "Conversion strategy with feasible tCPA",
    ],
    qualityRate: [
      result.quality / Math.max(1, result.leads) >= 0.65,
      "Доля качественных лидов ≥65%",
      "Qualified share ≥65%",
    ],
    maturity: [
      input.days >= 28 && input.lag >= 7,
      "Наблюдение ≥28 дней, лаг ≥7 дней",
      "Observation ≥28 days, lag ≥7 days",
    ],
    economics: [
      input.order === project.order && input.margin === project.margin,
      "Чек и маржа соответствуют брифу",
      "Order value and margin match the brief",
    ],
    profit: [
      result.profit >= 20000,
      "Вклад после рекламы ≥20 000 ₸",
      "Contribution after ads ≥20,000 KZT",
    ],
    capacity: [
      result.quality <= 60,
      "Не более 60 качественных лидов",
      "No more than 60 qualified leads",
    ],
    offline: [
      input.crm &&
        input.dedup &&
        input.primary === "qualified_lead" &&
        tools.offline?.events === 1 &&
        tools.offline.signature ===
          JSON.stringify([input.crm, input.dedup, input.primary]),
      "Повторный CRM ID: одна qualified_lead",
      "Repeated CRM ID: one qualified_lead",
    ],
  };
  return task.checks.map((id) => ({
    id,
    passed: !!checks[id][0],
    label: learnPair(checks[id][1], checks[id][2]),
  }));
}
