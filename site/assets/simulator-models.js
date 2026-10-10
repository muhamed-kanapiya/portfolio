/* Deterministic teaching models. These are not Google forecasts or client results. */
const SIM_DEFAULTS = {
  "google-ads": {
    budget: 300000,
    allocation: 50,
    negatives: false,
    landing: false,
    qualified: false,
  },
  seo: {
    technical: false,
    content: false,
    links: false,
    snippets: false,
    migration: false,
  },
};
const SEO_ACTIONS = [
  {
    id: "technical",
    hours: 8,
    label: learnPair("Исправить noindex в шаблоне", "Fix template noindex"),
    text: learnPair(
      "Возвращает 160 доступных для индексации страниц; эффект после повторного обхода.",
      "Restores 160 indexable pages; effect follows recrawling.",
    ),
  },
  {
    id: "content",
    hours: 16,
    label: learnPair("Обновить 20 посадочных", "Refresh 20 landing pages"),
    text: learnPair(
      "Закрывает пробелы в ответах и расширяет релевантные показы.",
      "Fills answer gaps and expands relevant impressions.",
    ),
  },
  {
    id: "links",
    hours: 6,
    label: learnPair("Связать изолированные страницы", "Link orphan pages"),
    text: learnPair(
      "Делает доступными ещё 40 страниц и усиливает тематические связи.",
      "Makes 40 additional pages accessible and adds relevant connections.",
    ),
  },
  {
    id: "snippets",
    hours: 4,
    label: learnPair(
      "Уточнить title и описания",
      "Clarify titles and descriptions",
    ),
    text: learnPair(
      "В модели повышает CTR; фактический сниппет выбирает поисковая система.",
      "Improves modeled CTR; the search engine chooses the actual snippet.",
    ),
  },
  {
    id: "migration",
    hours: 12,
    label: learnPair("Проверить карту редиректов", "Validate the redirect map"),
    text: learnPair(
      "В сценарии миграции предотвращает потерю показов со второй недели.",
      "In migration scenarios, prevents impression loss from week two.",
    ),
  },
];
const simTask = (
  id,
  level,
  title,
  brief,
  targets,
  limits = {},
  defaults = {},
) => ({
  id,
  level,
  title: learnPair(...title),
  brief: learnPair(...brief),
  targets,
  limits,
  defaults,
});
const SIM_TASKS = {
  "google-ads": [
    simTask(
      "first-leads",
      "junior",
      ["01 / Первые заявки", "01 / First leads"],
      [
        "У сервиса есть 200 000 ₸. Направьте спрос на услугу и получите не меньше 45 заявок. Посадочная и минус-слова — отдельные решения.",
        "A service has KZT 200,000. Route demand to the service and generate at least 45 leads. Landing-page work and negatives are separate decisions.",
      ],
      [{ metric: "leads", min: 45 }],
      { spend: 200000 },
      { budget: 200000, allocation: 30 },
    ),
    simTask(
      "useful-clicks",
      "junior",
      ["02 / Полезный бюджет", "02 / Useful budget"],
      [
        "Заявок много, но часть не подходит. Получите 20 квалифицированных лидов при расходе не выше 250 000 ₸ и оценивайте именно их.",
        "There are leads, but some do not qualify. Generate 20 qualified leads with spend at or below KZT 250,000 and select qualified leads as your reporting goal.",
      ],
      [
        { metric: "quality", min: 20 },
        { metric: "qualified", min: 1 },
      ],
      { spend: 250000 },
      { budget: 250000 },
    ),
    simTask(
      "quality",
      "middle",
      ["03 / Качество вместо объёма", "03 / Quality over volume"],
      [
        "Отдел продаж просит 40 квалифицированных обращений. Удержите CPQL до 7 500 ₸, настройте цель и объясните, откуда пришло улучшение.",
        "Sales needs 40 qualified leads. Keep CPQL at or below KZT 7,500, select the right goal and explain the improvement.",
      ],
      [
        { metric: "quality", min: 40 },
        { metric: "cpql", max: 7500 },
        { metric: "qualified", min: 1 },
      ],
      { spend: 350000 },
    ),
    simTask(
      "saturation",
      "middle",
      ["04 / Спрос не бесконечен", "04 / Demand is finite"],
      [
        "Бюджет вырос, но спрос в точном сегменте ограничен. Получите 40 квалифицированных лидов, не потратив больше 350 000 ₸; минимум 10 — из широкого спроса. Сравните лимит бюджета с фактическим расходом.",
        "Budget increased, but high-intent demand is capped. Generate 40 qualified leads while spending at most KZT 350,000; at least 10 must come from broad demand. Compare the budget cap with actual spend.",
      ],
      [
        { metric: "quality", min: 40 },
        { metric: "broadQuality", min: 10 },
        { metric: "qualified", min: 1 },
      ],
      { spend: 350000 },
      { budget: 600000, allocation: 100 },
    ),
    simTask(
      "profit",
      "senior",
      ["05 / Маржа после рекламы", "05 / Contribution after ads"],
      [
        "Учитывайте маржу 55%, средний заказ 70 000 ₸ и расходы на посадочную. Нужен вклад после рекламы от 400 000 ₸ и ROAS не ниже 400%.",
        "Use a 55% margin, KZT 70,000 order value and landing-page costs. Achieve at least KZT 400,000 contribution after ads and at least 400% ROAS.",
      ],
      [
        { metric: "profit", min: 400000 },
        { metric: "roas", min: 400 },
        { metric: "qualified", min: 1 },
      ],
      { spend: 400000 },
    ),
    simTask(
      "scale",
      "senior",
      ["06 / Масштабировать с ограничениями", "06 / Scale within constraints"],
      [
        "Команда обработает не более 60 качественных лидов. Найдите план с 40–60 такими лидами (от 12 из широкого спроса) и вкладом после рекламы от 350 000 ₸.",
        "The team can handle at most 60 qualified leads. Find a plan generating 40–60 of them (at least 12 from broad demand) and at least KZT 350,000 contribution after ads.",
      ],
      [
        { metric: "quality", min: 40, max: 60 },
        { metric: "broadQuality", min: 12 },
        { metric: "profit", min: 350000 },
        { metric: "qualified", min: 1 },
      ],
      { spend: 400000 },
      { budget: 500000, allocation: 40 },
    ),
  ],
  seo: [
    simTask(
      "indexing",
      "junior",
      ["01 / Страницы исчезли", "01 / Missing pages"],
      [
        "В каталоге 500 страниц, но только 300 технически доступны для индексации. За 8 часов восстановите доступность хотя бы 450 страниц. Sitemap не снимает noindex.",
        "A catalog has 500 pages, but only 300 are technically indexable. Restore at least 450 within eight hours. A sitemap does not override noindex.",
      ],
      [{ metric: "indexable", min: 450 }],
      { hours: 8 },
    ),
    simTask(
      "clicks",
      "junior",
      ["02 / Показов достаточно", "02 / Impressions need clicks"],
      [
        "Используйте 10 часов. К восьмой неделе нужно 400 кликов в неделю и CTR не ниже 2,8%. Посмотрите, как отличаются показы и клики.",
        "Use ten hours. Reach 400 weekly clicks and at least 2.8% CTR by week eight. Observe the difference between impressions and clicks.",
      ],
      [
        { metric: "clicks", min: 400 },
        { metric: "ctr", min: 2.8 },
      ],
      { hours: 10 },
    ),
    simTask(
      "backlog",
      "middle",
      ["03 / План на спринт", "03 / Sprint backlog"],
      [
        "Доступно 30 часов команды. Нужно 680 кликов в неделю и минимум 450 доступных страниц. Подберите совместимые задачи и проверьте задержку эффекта.",
        "The team has thirty hours. Reach 680 weekly clicks and at least 450 indexable pages. Select compatible tasks and inspect the delayed effect.",
      ],
      [
        { metric: "clicks", min: 680 },
        { metric: "indexable", min: 450 },
      ],
      { hours: 30 },
    ),
    simTask(
      "efficiency",
      "middle",
      ["04 / Ограниченный ресурс", "04 / Limited resources"],
      [
        "Получите 540 кликов в неделю и CTR от 2,8% при лимите 18 часов. Не выбирайте все задачи: найдите подходящее сочетание.",
        "Reach 540 weekly clicks and at least 2.8% CTR within eighteen hours. Do not select every task: find the right combination.",
      ],
      [
        { metric: "clicks", min: 540 },
        { metric: "ctr", min: 2.8 },
      ],
      { hours: 18 },
    ),
    simTask(
      "migration",
      "senior",
      ["05 / Переезд каталога", "05 / Catalog migration"],
      [
        "После миграции со второй недели теряется 35% показов без проверки редиректов. За 30 часов сохраните не менее 500 доступных страниц и получите 500 кликов к восьмой неделе.",
        "Without redirect validation, a migration loses 35% of impressions from week two. Within thirty hours, preserve at least 500 indexable pages and reach 500 clicks by week eight.",
      ],
      [
        { metric: "indexable", min: 500 },
        { metric: "clicks", min: 500 },
        { metric: "migration", min: 1 },
      ],
      { hours: 30, migration: true },
    ),
    simTask(
      "portfolio",
      "senior",
      ["06 / Защитить план роста", "06 / Defend a growth plan"],
      [
        "Совместите переезд и развитие контента. Лимит — 46 часов, цель — 800 кликов в неделю. Учтите стоимость защиты миграции; не выдавайте сценарий за прогноз Google.",
        "Combine migration and content development. The limit is forty-six hours and the goal is 800 weekly clicks. Account for migration protection and do not present the scenario as a Google forecast.",
      ],
      [
        { metric: "clicks", min: 800 },
        { metric: "migration", min: 1 },
      ],
      { hours: 46, migration: true },
    ),
  ],
};
const simClamp = (value, min, max, fallback) =>
  Number.isFinite(Number(value))
    ? Math.max(min, Math.min(max, Number(value)))
    : fallback;
function simulateAds(input = {}) {
  const budget = simClamp(input.budget, 100000, 600000, 300000),
    share = simClamp(input.allocation, 0, 100, 50) / 100;
  const neg = input.negatives === true,
    landing = input.landing === true;
  const rows = [
    {
      name: learnPair("Высокий интент", "High intent"),
      clicks: Math.min((budget * share) / 500, 480),
      cpc: 500,
      cr: 0.12 * (landing ? 1.25 : 1),
      quality: 0.8,
    },
    {
      name: learnPair("Широкий спрос", "Broad demand"),
      clicks: Math.min((budget * (1 - share)) / 200, neg ? 675 : 900),
      cpc: 200,
      cr: 0.025 * (neg ? 1.8 : 1) * (landing ? 1.45 : 1),
      quality: neg ? 0.6 : 0.35,
    },
  ].map((row) => ({
    ...row,
    spend: row.clicks * row.cpc,
    leads: row.clicks * row.cr,
    qualifiedLeads: row.clicks * row.cr * row.quality,
  }));
  const sum = (key) => rows.reduce((total, row) => total + row[key], 0),
    spend = sum("spend"),
    leads = sum("leads"),
    quality = sum("qualifiedLeads"),
    sales = quality * 0.35,
    revenue = sales * 70000,
    setup = landing ? 20000 : 0;
  return {
    broadQuality: rows[1].qualifiedLeads,
    budget,
    spend,
    clicks: sum("clicks"),
    leads,
    quality,
    sales,
    revenue,
    setup,
    cpql: quality ? spend / quality : 0,
    roas: spend ? (revenue / spend) * 100 : 0,
    profit: revenue * 0.55 - spend - setup,
    qualified: input.qualified === true ? 1 : 0,
    rows,
    series: [1, 2, 3, 4].map((week) => ({
      period: week,
      value: (quality * week) / 4,
      baseline: (simulateAdsBaseline(budget) * week) / 4,
    })),
  };
}
function simulateAdsBaseline(budget) {
  return (
    Math.min((budget * 0.5) / 500, 480) * 0.12 * 0.8 +
    Math.min((budget * 0.5) / 200, 900) * 0.025 * 0.35
  );
}
function simulateSEO(input = {}, task = { limits: {} }) {
  const on = (id) => input[id] === true,
    hours = SEO_ACTIONS.reduce(
      (total, action) => total + (on(action.id) ? action.hours : 0),
      0,
    ),
    indexable = 300 + (on("technical") ? 160 : 0) + (on("links") ? 40 : 0);
  const series = Array.from({ length: 9 }, (_, week) => {
    const ramp = (delay, duration) =>
      Math.min(1, Math.max(0, (week - delay) / duration));
    const migrationLoss =
      task.limits?.migration && !on("migration") && week >= 2 ? 0.65 : 1;
    const impressions =
      (12000 +
        (on("technical") ? 6000 * ramp(1, 4) : 0) +
        (on("content") ? 10000 * ramp(2, 6) : 0) +
        (on("links") ? 2500 * ramp(1, 4) : 0)) *
      migrationLoss;
    const ctr =
      2 +
      (on("snippets") ? 0.8 * ramp(0, 3) : 0) +
      (on("content") ? 0.3 * ramp(2, 6) : 0);
    return {
      period: week,
      value: (impressions * ctr) / 100,
      baseline: 12000 * 0.02 * (task.limits?.migration && week >= 2 ? 0.65 : 1),
      impressions,
      ctr,
    };
  });
  const final = series.at(-1);
  return {
    hours,
    indexable,
    clicks: final.value,
    impressions: final.impressions,
    ctr: final.ctr,
    migration: on("migration") ? 1 : 0,
    series,
  };
}
function simulatorChecks(topic, task, result) {
  const limits =
    topic === "seo"
      ? [{ metric: "hours", max: task.limits.hours }]
      : [{ metric: "spend", max: task.limits.spend }];
  return [...task.targets, ...limits].map((target) => ({
    ...target,
    actual: result[target.metric],
    passed:
      Number.isFinite(result[target.metric]) &&
      (target.min === undefined ||
        result[target.metric] >= target.min - 1e-8) &&
      (target.max === undefined || result[target.metric] <= target.max + 1e-8),
  }));
}
