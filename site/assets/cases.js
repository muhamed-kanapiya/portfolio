// Реальные кейсы добавляются здесь. Демо управляются showDemoCases в config.js.
// Шаблон записи и поля для заполнения: examples/real-case.template.json.
// published: false сохраняет черновик без вывода на сайт.
window.REAL_CASES = [];

function caseCopy(value) {
  if (typeof value === "string") return value;
  if (!value) return "";
  const en = value.en || value.ru || "";
  if (value.ru && en) window.RU[en] = value.ru;
  return en;
}
function normalizeRealCase(item) {
  return {
    ...item,
    demo: false,
    title: caseCopy(item.title),
    headline: caseCopy(item.headline),
    tag: caseCopy(item.tag),
    metrics: (item.metrics || []).map((metric) => ({
      metric: caseCopy(metric.metric),
      before: caseCopy(metric.before),
      after: caseCopy(metric.after),
      delta: caseCopy(metric.delta),
    })),
    wrong: (item.wrong || []).map(caseCopy),
    did: (item.did || []).map(caseCopy),
    timeline: (item.timeline || []).map(caseCopy),
  };
}
function publishedCases() {
  const real = window.REAL_CASES.filter((item) => item.published === true).map(
    normalizeRealCase,
  );
  return [...real, ...(window.PORTFOLIO.showDemoCases ? Nn : [])];
}
function visibleCase(id) {
  return publishedCases().find((item) => item.id === id);
}
