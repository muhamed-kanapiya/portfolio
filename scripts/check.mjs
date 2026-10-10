import { readFile, readdir, access } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import vm from "node:vm";
import assert from "node:assert/strict";
const site = fileURLToPath(new URL("../site/", import.meta.url));
for (const filename of await readdir(path.join(site, "assets"))) {
  if (filename.endsWith(".js"))
    new vm.Script(await readFile(path.join(site, "assets", filename), "utf8"), {
      filename,
    });
}
for (const page of [
  "seo-simulator.html",
  "google-ads-simulator.html",
  "courses.html",
  "course.html",
  "academy.html",
  "classroom.html",
  "exam.html",
  "materials.html",
  "material.html",
  "travel.html",
  "video.html",
  "index.html",
  "clients.html",
  "services.html",
  "cases.html",
  "pricing.html",
  "reviews.html",
  "about.html",
  "blog.html",
  "blog-category.html",
  "blog-post.html",
  "privacy.html",
  "cookies.html",
  "terms.html",
  "site-map.html",
  "404.html",
  "ai.html",
  "cities.html",
  "astana.html",
  "almaty.html",
  "shymkent.html",
  "karaganda.html",
  "atyrau.html",
]) {
  const html = await readFile(path.join(site, page), "utf8");
  assert(
    html.includes('lang="ru"'),
    "Russian must be the default HTML language",
  );
  for (const [, url] of html.matchAll(/(?:src|href)="([^"#]+)"/g)) {
    if (!/^(?:https?:|data:|mailto:|\/)/.test(url))
      await access(
        path.join(
          site,
          decodeURIComponent(
            new URL(url, "https://local.test/").pathname,
          ).slice(1),
        ),
      );
  }
}
const context = vm.createContext({ window: {} });
for (const file of [
  "config.js",
  "prices.js",
  "clients.js",
  "translations.js",
  "profile-data.js",
]) {
  vm.runInContext(
    await readFile(path.join(site, "assets", file), "utf8"),
    context,
  );
}
assert(Array.isArray(context.window.CLIENTS));
const ids = new Set();
for (const client of context.window.CLIENTS) {
  assert(client.name && client.id, "Each client needs a name and id");
  assert(!ids.has(client.id), `Duplicate client id: ${client.id}`);
  ids.add(client.id);
  if (client.logo && !client.logo.startsWith("https://"))
    await access(path.join(site, client.logo));
}
assert(
  Object.keys(context.window.RU).length > 900,
  "Detailed translations are missing",
);
console.log(
  "Checked JavaScript, thirty-three HTML pages, local assets, client data and translations.",
);

// Verify the new behavior without adding demo clients to the actual website.
const state = {
  window: {
    PORTFOLIO: context.window.PORTFOLIO,
    RU: context.window.RU,
    CLIENTS: [],
    PRICES: context.window.PRICES,
    ABOUT_PROFILE: context.window.ABOUT_PROFILE,
    CLIENT_COVERS: context.window.CLIENT_COVERS,
    REVIEWS: context.window.REVIEWS,
    REVIEW_PLATFORMS: context.window.REVIEW_PLATFORMS,
    REVIEW_GOOGLE: context.window.REVIEW_GOOGLE,
  },
  location: { search: "", pathname: "/portfolio/index.html", hash: "" },
  localStorage: { getItem: () => null },
  URL,
  URLSearchParams,
  hs: (type, props, key) => ({ type, props, key }),
};
const behavior = vm.createContext(state);
vm.runInContext(
  await readFile(path.join(site, "assets/portfolio.js"), "utf8"),
  behavior,
);
assert.equal(vm.runInContext("currentLanguage", behavior), "ru");
assert.equal(
  vm.runInContext('pageLink("clients.html")', behavior),
  "clients.html?lang=ru",
);
state.location.hash = "#/services/search-ads";
assert.equal(vm.runInContext("readRoute().page", behavior), "service");
state.location.hash = "#/cases/ecom-us";
assert.equal(vm.runInContext("readRoute().caseId", behavior), "ecom-us");
state.location.hash = "";
state.location.pathname = "/portfolio/clients.html";
assert.equal(vm.runInContext("readRoute().page", behavior), "clients");
state.window.CLIENTS = Array.from({ length: 12 }, (_, index) => ({
  id: "test-" + index,
  name: "Test " + index,
  featured: index < 11,
  description: { ru: "Тест", en: "Test" },
}));
const featured = vm
  .runInContext("ClientsSection()", behavior)
  .props.children[2].props.children.filter(Boolean);
assert.equal(
  featured.length,
  10,
  "Nine featured clients plus the project invitation",
);
const all = vm.runInContext("ClientsPage()", behavior).props.children[1].props
  .children[0].props.children;
assert.equal(
  all.length,
  13,
  "The full list must contain all twelve test clients",
);
assert.equal(
  vm.runInContext('translateText("All clients")', behavior),
  "Все клиенты",
);
vm.runInContext('currentLanguage = "en"', behavior);
assert.equal(
  vm.runInContext('translateText("All clients")', behavior),
  "All clients",
);
assert.equal(
  vm.runInContext('pageLink("clients.html")', behavior),
  "clients.html?lang=en",
);
console.log(
  "Checked Russian default, both languages, subpath routes, featured limit and full client list.",
);

// Catalog navigation, independently entered prices and messenger drafts.
Object.assign(state, { Intl });
state.window.CLIENTS = context.window.CLIENTS;
vm.runInContext(
  await readFile(path.join(site, "assets/reference-app.js"), "utf8"),
  behavior,
);
vm.runInContext(
  await readFile(path.join(site, "assets/catalog.js"), "utf8"),
  behavior,
);
for (const filename of [
  "ai-services.js",
  "case-chart-data.js",
  "case-charts.js",
  "growth-pages.js",
]) {
  vm.runInContext(
    await readFile(path.join(site, "assets", filename), "utf8"),
    behavior,
  );
}
vm.runInContext(
  await readFile(path.join(site, "assets/cases.js"), "utf8"),
  behavior,
);
vm.runInContext(
  await readFile(path.join(site, "assets/case-studies.js"), "utf8"),
  behavior,
);
vm.runInContext(
  await readFile(path.join(site, "assets/extensions.js"), "utf8"),
  behavior,
);
vm.runInContext(
  await readFile(path.join(site, "assets/community.js"), "utf8"),
  behavior,
);

assert.equal(vm.runInContext("tu.length", behavior), 39);
assert.equal(vm.runInContext("Nn.length", behavior), 14);
assert.equal(
  vm.runInContext("new Set(tu.map(item=>item.id)).size", behavior),
  39,
);
assert.equal(
  vm.runInContext("new Set(Nn.map(item=>item.id)).size", behavior),
  14,
);
assert(
  vm.runInContext(
    "Nn.every(item=>item.demo && item.metrics.length>=2 && item.did.length && item.timeline.length)",
    behavior,
  ),
);
assert(
  vm.runInContext(
    "tu.every(item=>item.deliverables.length && item.pricing.length && item.process.length && item.faq.length)",
    behavior,
  ),
);
for (const [filename, expected] of [
  ["services.html", "services-index"],
  ["cases.html", "cases-index"],
  ["clients.html", "clients"],
  ["index.html", "home"],
  ["pricing.html", "pricing"],
  ["reviews.html", "reviews"],
  ["about.html", "about"],
]) {
  state.location.pathname = "/portfolio/" + filename;
  state.location.hash = "";
  assert.equal(vm.runInContext("readRoute().page", behavior), expected);
}
for (const language of ["ru", "en"]) {
  vm.runInContext(`currentLanguage='${language}'`, behavior);
  for (const currency of ["USD", "RUB", "KZT"]) {
    vm.runInContext(`currentCurrency='${currency}'`, behavior);
    const number = vm.runInContext(
      "money(window.PRICES.plans.launch)",
      behavior,
    );
    assert(
      number.includes(
        currency === "USD" ? "$" : currency === "RUB" ? "₽" : "₸",
      ),
    );
    assert.equal(
      Number(number.replace(/[^0-9]/g, "")),
      state.window.PRICES.plans.launch[currency],
    );
    assert(
      vm
        .runInContext(
          'priceText(servicePrices("search-ads", "Management"))',
          behavior,
        )
        .endsWith("+10%"),
    );
    state.formValues = {
      name: " Тест & Example ",
      contact: " +7 700 000 00 00 ",
      website: "https://example.com/?a=1&b=2",
      service: "seo",
      plan: "launch",
      message: " Проверить SEO, формы и аналитику.\nНовая строка: + & # ? ",
    };
    const draft = vm.runInContext("composeInquiry(formValues)", behavior);
    assert(
      draft.includes("Тест & Example") &&
        draft.includes("SEO") &&
        draft.includes(currency),
    );
    assert(draft.includes(language === "ru" ? "Задача:" : "Message:"));
    assert(draft.includes("https://example.com/?a=1&b=2"));
    for (const channel of ["whatsapp", "telegram"]) {
      state.message = draft;
      const url = new URL(
        vm.runInContext(`messengerLink('${channel}',message)`, behavior),
      );
      assert.equal(url.hostname, channel === "whatsapp" ? "wa.me" : "t.me");
      assert.equal(
        url.pathname,
        channel === "whatsapp" ? "/77073406888" : "/muhamed_kanapiya",
      );
      assert.equal(
        url.searchParams.get("text"),
        draft,
        "The messenger must receive the complete Unicode draft",
      );
    }
    const inquiry = new URL(
      vm.runInContext('inquiryLink("wordpress","launch")', behavior),
      "https://example.com/repository/",
    );
    assert.equal(inquiry.pathname, "/repository/index.html");
    assert.equal(inquiry.searchParams.get("service"), "wordpress");
    assert.equal(inquiry.searchParams.get("plan"), "launch");
    assert.equal(inquiry.hash, "#contact");
  }
}
console.log(
  "Checked 39 services, 14 demo cases, 28 clients, archive routes, independent USD/RUB/KZT prices and both messenger drafts in RU/EN.",
);

// Exercise the actual submit handler without opening or sending anything externally.
state.formValues = {
  name: "Тест формы",
  contact: "test@example.com",
  service: "seo",
  plan: "",
  website: "",
  message: "Нужен SEO-аудит сайта и аналитики.",
};
let opened = [];
let status = "";
let hook = 0;
let formValid = true;
state.le = {
  useState: () =>
    ++hook === 1
      ? [state.formValues, () => {}]
      : [
          "",
          (value) => {
            status = value;
          },
        ],
  useRef: () => ({ current: { reportValidity: () => formValid } }),
};
state.window.open = (...args) => opened.push(args);
vm.runInContext('currentLanguage="ru"; currentCurrency="KZT"', behavior);
const form = vm.runInContext("InquiryForm()", behavior);
for (const channel of ["whatsapp", "telegram"]) {
  let prevented = false;
  form.props.onSubmit({
    preventDefault: () => {
      prevented = true;
    },
    nativeEvent: { submitter: { value: channel } },
  });
  assert(prevented);
  assert.equal(
    new URL(opened.at(-1)[0]).hostname,
    channel === "whatsapp" ? "wa.me" : "t.me",
  );
  assert(
    new URL(opened.at(-1)[0]).searchParams.get("text").includes("Тест формы"),
  );
  assert.equal(opened.at(-1)[2], "noopener,noreferrer");
  assert(status.includes("Confirm sending"));
}
formValid = false;
form.props.onSubmit({
  preventDefault() {},
  nativeEvent: { submitter: { value: "whatsapp" } },
});
assert.equal(opened.length, 2, "Invalid forms must not open a messenger");
const portfolioSource = await readFile(
  path.join(site, "assets/portfolio.js"),
  "utf8",
);
assert(
  !/function tr\s*\(/.test(portfolioSource),
  "Do not overwrite the vendor React event registry named tr",
);
console.log(
  "Checked actual form submit handlers, correct recipients, validation and vendor namespace isolation.",
);

// Manual prices must not depend on another currency or an exchange-rate field.
for (const service of vm.runInContext("tu", behavior)) {
  for (const row of service.pricing) {
    const prices = state.window.PRICES.services[service.id]?.[row.pkg];
    assert(prices, `Missing price entry: ${service.id} / ${row.pkg}`);
    for (const currency of ["USD", "RUB", "KZT"]) {
      assert(
        prices[currency] === null ||
          (Number.isFinite(prices[currency]) && prices[currency] >= 0),
        `Invalid manual price: ${service.id} / ${row.pkg} / ${currency}`,
      );
    }
  }
}
const launchPrices = state.window.PRICES.plans.launch;
const previousUSD = launchPrices.USD;
const expectedRUB = vm.runInContext(
  'money(window.PRICES.plans.launch,"RUB")',
  behavior,
);
launchPrices.USD = 9999;
assert.equal(
  vm.runInContext('money(window.PRICES.plans.launch,"RUB")', behavior),
  expectedRUB,
);
launchPrices.USD = previousUSD;
assert.equal(
  vm.runInContext('money({USD:123,RUB:null,KZT:0},"RUB","ru")', behavior),
  "По запросу",
);
assert.equal(
  vm.runInContext('money({USD:123,RUB:null,KZT:0},"KZT","ru")', behavior),
  "0 ₸",
);
assert.equal(
  vm.runInContext('money(undefined,"USD","en")', behavior),
  "By agreement",
);
assert(
  vm.runInContext(
    "tu.filter(item=>item.extra).every(item=>/\\p{Extended_Pictographic}/u.test(item.emoji))",
    behavior,
  ),
);

vm.runInContext(
  await readFile(path.join(site, "assets/enhancements.js"), "utf8"),
  behavior,
);
const originalRealCases = state.window.REAL_CASES;
const originalDemoVisibility = state.window.PORTFOLIO.showDemoCases;
state.window.REAL_CASES = [
  {
    id: "test-real-case",
    published: true,
    category: "seo",
    title: { ru: "Реальный тестовый кейс", en: "Real test case" },
    metrics: [{ metric: "Leads", before: "1", after: "2", delta: "+1" }],
  },
  {
    id: "test-draft",
    published: false,
    title: { ru: "Черновик", en: "Draft" },
  },
];
state.window.PORTFOLIO.showDemoCases = false;
assert.equal(vm.runInContext("publishedCases().length", behavior), 1);
assert.equal(vm.runInContext('visibleCase("ecom-us")', behavior), undefined);
assert.equal(vm.runInContext('visibleCase("test-draft")', behavior), undefined);
assert.equal(
  vm.runInContext('visibleCase("test-real-case").demo', behavior),
  false,
);
assert.equal(
  vm.runInContext(
    'translateText(visibleCase("test-real-case").title)',
    behavior,
  ),
  "Реальный тестовый кейс",
);
assert.equal(
  vm.runInContext(
    'CaseDetail({record:visibleCase("ecom-us")}).type.name',
    behavior,
  ),
  "CasesEmpty",
);
const realCard = vm.runInContext(
  'CaseCard({record:visibleCase("test-real-case")})',
  behavior,
);
assert(
  !realCard.props.children.some(
    (item) => item?.props?.className === "demo-label",
  ),
);
state.window.PORTFOLIO.showDemoCases = true;
assert.equal(vm.runInContext("publishedCases().length", behavior), 15);
state.window.REAL_CASES = originalRealCases;
state.window.PORTFOLIO.showDemoCases = originalDemoVisibility;
const floating = vm.runInContext("FloatingContacts()", behavior);
const directLinks = floating.props.children
  .filter((item) => item.type === "a")
  .map((item) => item.props.href);
assert.deepEqual(
  [...directLinks].map((value) => {
    const url = new URL(value);
    return url.origin + url.pathname;
  }),
  ["https://wa.me/77073406888", "https://t.me/muhamed_kanapiya"],
);
console.log(
  "Checked independent manual prices, emoji, hidden demo routes, real cases and drafts, and direct messenger links.",
);

// Every published client case must resolve to the correct client and services.
const realCaseIds = new Set();
for (const record of state.window.REAL_CASES) {
  assert(!realCaseIds.has(record.id), `Duplicate real case id: ${record.id}`);
  realCaseIds.add(record.id);
  if (!record.published) continue;
  assert(
    ids.has(record.clientId),
    `Unknown client in case ${record.id}: ${record.clientId}`,
  );
  assert(record.serviceIds?.length, `No linked services in ${record.id}`);
  state.caseUnderTest = record;
  assert.equal(
    vm.runInContext("caseServices(caseUnderTest).length", behavior),
    record.serviceIds.length,
  );
  assert(
    vm.runInContext(
      "casesForClient(caseUnderTest.clientId).some(item => item.id === caseUnderTest.id)",
      behavior,
    ),
  );
  assert.equal(
    vm.runInContext("visibleCase(caseUnderTest.id).clientId", behavior),
    record.clientId,
  );
}
assert.equal(
  vm.runInContext('casesForClient("missing-client").length', behavior),
  0,
);
assert.equal(vm.runInContext('metricRange("$12-18").min', behavior), 12);
assert.equal(vm.runInContext('metricRange("$12-18").max', behavior), 18);
assert.equal(vm.runInContext('metricRange("0,8–1,5%").max', behavior), 1.5);
assert.equal(vm.runInContext('metricRange("0").max', behavior), 0);
for (const value of ["No data", "12-3", "-6", "2023-2024 project", "1.2.3"]) {
  state.badMetric = value;
  assert.equal(vm.runInContext("metricRange(badMetric)", behavior), null);
}
assert.equal(
  vm.runInContext(
    'MetricComparison({metric:{before:"$1",after:"2%"}})',
    behavior,
  ),
  null,
);
assert.equal(vm.runInContext("portfolioCount(38)", behavior), "35+");
assert.equal(vm.runInContext("portfolioCount(28)", behavior), "25+");
assert.equal(vm.runInContext("portfolioCount(25)", behavior), "25+");
state.location.origin = "https://muhamed-kanapiya.github.io";
for (const value of [
  "clients.html?lang=ru#client-kilc",
  "#contact",
  "mailto:owner@example.com",
  "tel:+77000000000",
  "https://muhamed-kanapiya.github.io/portfolio/clients.html",
]) {
  state.linkUnderTest = value;
  assert.equal(vm.runInContext("outboundUrl(linkUnderTest)", behavior), value);
}
const attributed = new URL(
  vm.runInContext(
    'outboundUrl("https://example.com/path?ref=partner#details", "case-kilc-seo")',
    behavior,
  ),
);
assert.equal(attributed.searchParams.get("utm_source"), "ads_by_kanapiya");
assert.equal(attributed.searchParams.get("utm_content"), "case-kilc-seo");
assert.equal(attributed.searchParams.get("ref"), "partner");
assert.equal(attributed.hash, "#details");
state.attributedLink = attributed.href;
assert.equal(
  vm.runInContext("outboundUrl(attributedLink)", behavior),
  attributed.href,
);
for (const href of directLinks) {
  const url = new URL(href);
  assert.equal(url.searchParams.get("utm_campaign"), "portfolio");
  assert(url.searchParams.get("utm_content").startsWith("floating-"));
}
for (const channel of ["whatsapp", "telegram"]) {
  state.testChannel = channel;
  const url = new URL(
    vm.runInContext('messengerLink(testChannel, "Тест + & # ?")', behavior),
  );
  assert.equal(url.searchParams.get("text"), "Тест + & # ?");
  assert.equal(url.searchParams.get("utm_content"), "contact-form-" + channel);
}
console.log(
  "Checked client/case/service relationships, numeric ranges, rounded counts and outbound UTM attribution.",
);

vm.runInContext(
  await readFile(path.join(site, "assets/pricing-page.js"), "utf8"),
  behavior,
);
vm.runInContext('currentLanguage="ru"; currentCurrency="USD"', behavior);
// New directions must resolve through the same catalog, translated price search and inquiry flow.
const addedServiceIds = [
  "meta-ads",
  "shopify",
  "insales",
  "training",
  "crm-integrations",
  "python-scraping",
];
for (const serviceId of addedServiceIds) {
  const service = vm.runInContext(
    `tu.find(item=>item.id==="${serviceId}")`,
    behavior,
  );
  assert(
    service &&
      state.window.SERVICE_CATEGORIES.some(([id]) => id === service.category),
  );
  for (const text of [
    service.title,
    service.short,
    service.long,
    ...service.deliverables.flatMap((item) => [item.title, item.desc]),
    ...service.faq.flatMap((item) => [item.q, item.a]),
  ]) {
    assert(
      state.window.RU[text],
      `Missing Russian copy for ${serviceId}: ${text}`,
    );
  }
}
for (const query of ["корпоративное обучение", "corporate training"]) {
  const rows = vm.runInContext(
    `filteredPriceRows({query:${JSON.stringify(query)},category:"training"})`,
    behavior,
  );
  assert.equal(rows.length, 1);
  assert.equal(rows[0].pkg.pkg, "Corporate training");
}
for (const language of ["ru", "en"]) {
  vm.runInContext(`currentLanguage="${language}"`, behavior);
  for (const format of [
    "Individual training",
    "Group training",
    "Corporate training",
  ]) {
    state.trainingInquiry = {
      name: "Example",
      contact: "test@example.com",
      service: "training",
      package: format,
      plan: "",
      website: "",
      message: "Training for the team",
    };
    const text = vm.runInContext("composeInquiry(trainingInquiry)", behavior);
    assert(
      text.includes(
        language === "ru"
          ? "Формат: " + state.window.RU[format]
          : "Format: " + format,
      ),
    );
    const link = new URL(
      vm.runInContext(
        `inquiryLink("training","",${JSON.stringify(format)})`,
        behavior,
      ),
      "https://example.com/portfolio/",
    );
    assert.equal(link.searchParams.get("package"), format);
    state.trainingInquiry.service = "seo";
    assert(
      !vm
        .runInContext("composeInquiry(trainingInquiry)", behavior)
        .includes(language === "ru" ? "Формат:" : "Format:"),
    );
  }
}
vm.runInContext('currentLanguage="ru"', behavior);
assert.equal(
  vm.runInContext("priceCatalogRows().length", behavior),
  vm.runInContext("tu.reduce((sum,item)=>sum+item.pricing.length,0)", behavior),
);
assert.equal(
  vm.runInContext('filteredPriceRows({query:"WordPress"}).length', behavior),
  3,
);
assert.equal(
  vm.runInContext(
    'filteredPriceRows({query:"несуществующаяуслуга"}).length',
    behavior,
  ),
  0,
);
assert(
  vm.runInContext(
    'filteredPriceRows({category:"web"}).every(row=>row.service.category==="web")',
    behavior,
  ),
);
assert(
  vm.runInContext(
    'filteredPriceRows({query:"поисковая аудит"}).some(row=>row.service.id==="search-ads" && row.pkg.pkg==="Audit")',
    behavior,
  ),
);
for (const currency of ["USD", "RUB", "KZT"]) {
  vm.runInContext(`currentCurrency="${currency}"`, behavior);
  assert(
    vm.runInContext(
      'filteredPriceRows({priceType:"fixed"}).every(row=>Number.isFinite(row.prices[currentCurrency]))',
      behavior,
    ),
  );
  assert(
    vm.runInContext(
      'filteredPriceRows({priceType:"request"}).every(row=>!Number.isFinite(row.prices[currentCurrency]))',
      behavior,
    ),
  );
  const ascending = vm.runInContext(
    'filteredPriceRows({priceType:"fixed",sort:"ascending"}).map(row=>row.prices[currentCurrency])',
    behavior,
  );
  assert(
    [...ascending].every(
      (value, index, list) => !index || value >= list[index - 1],
    ),
  );
  const descending = vm.runInContext(
    'filteredPriceRows({priceType:"fixed",sort:"descending"}).map(row=>row.prices[currentCurrency])',
    behavior,
  );
  assert(
    [...descending].every(
      (value, index, list) => !index || value <= list[index - 1],
    ),
  );
}
// Client descriptions remain visible; related cases open only after activation.
let modalOpen = false,
  cardHook = 0;
state.Pi = Symbol.for("react.fragment");
state.le.useRef = (initial) => ({ current: initial });
state.le.useEffect = () => {};
state.le.useState = () =>
  ++cardHook === 1
    ? [false, () => {}]
    : [
        modalOpen,
        (next) => {
          modalOpen = next;
        },
      ];
const clientCard = vm.runInContext(
  'ClientCard({client:window.CLIENTS.find(item=>item.id==="kilc")})',
  behavior,
);
const clientArticle = clientCard.props.children[0];
assert.equal(clientArticle.props.onMouseEnter, undefined);
assert.equal(clientArticle.props.onFocus, undefined);
assert.equal(clientCard.props.children[1], null);
assert.equal(
  clientArticle.props.children.find((item) => item?.type === "p").props
    .children,
  state.window.CLIENTS.find((item) => item.id === "kilc").description.ru,
);
clientArticle.props.children
  .find((item) => item?.type === "button")
  .props.onClick();
assert.equal(modalOpen, true);
cardHook = 0;
const popup = vm.runInContext(
  'ClientCard({client:window.CLIENTS.find(item=>item.id==="kilc")})',
  behavior,
).props.children[1];
const dialog = popup.type(popup.props);
const dialogBody = dialog.props.children[1];
const relatedCases = dialogBody.props.children[1].props.children;
assert.equal(relatedCases.length, 3);
assert(
  relatedCases.every((item) =>
    item.props.href.startsWith("cases.html?lang=ru#/cases/kilc-"),
  ),
);
const clientWebsite = dialogBody.props.children[2].props.children[0].props.href;
assert.equal(
  new URL(clientWebsite).searchParams.get("utm_content"),
  "client-kilc",
);
let cancelPrevented = false;
dialog.props.onCancel({
  preventDefault: () => {
    cancelPrevented = true;
  },
});
assert(cancelPrevented);
assert.equal(modalOpen, false);
console.log(
  "Checked searchable price tables, currency-aware filters and sorting, and client descriptions with related case dialogs.",
);

// New content must stay portable, sourced, and respect drafts in both languages.
await access(path.join(site, state.window.ABOUT_PROFILE.photo));
const author = state.window.ABOUT_PROFILE;
const certificateIds = new Set();
for (const certificate of author.certificates) {
  assert(!certificateIds.has(certificate.id), "Certificate IDs must be unique");
  certificateIds.add(certificate.id);
  assert(certificate.title.ru && certificate.title.en && certificate.issuer);
  assert(new URL(certificate.sourceUrl).protocol === "https:");
  await access(path.join(site, certificate.image));
}
for (const milestone of author.timeline) {
  assert(
    milestone.title.ru &&
      milestone.title.en &&
      milestone.text.ru &&
      milestone.text.en,
  );
  if (milestone.certificateId)
    assert(
      certificateIds.has(milestone.certificateId),
      "Timeline must reference an existing certificate",
    );
  else assert(new URL(milestone.url).protocol === "https:");
}
for (const link of [...author.socialLinks, ...author.github.projects]) {
  assert(new URL(link.url).protocol === "https:");
  assert(
    !/YOUR_|your-portfolio|example\.com/.test(link.url),
    "Do not publish placeholder profiles",
  );
}
for (const [clientId, cover] of Object.entries(state.window.CLIENT_COVERS)) {
  assert(state.window.CLIENTS.some((client) => client.id === clientId));
  await access(path.join(site, cover));
}
const reviewIds = new Set();
for (const review of state.window.REVIEWS) {
  assert(!reviewIds.has(review.id));
  reviewIds.add(review.id);
  assert(state.window.REVIEW_PLATFORMS[review.platform]);
  assert(review.rating === null || (review.rating >= 1 && review.rating <= 5));
  assert(review.text.ru && review.text.en && review.author);
  assert(
    new URL(review.sourceUrl || state.window.REVIEW_GOOGLE.url).protocol ===
      "https:",
  );
}
assert.equal(vm.runInContext("ReviewStars({rating:null})", behavior), null);
const reviewCount = vm.runInContext("publicReviews().length", behavior);
state.window.REVIEWS.push({
  id: "test-draft",
  published: false,
  platform: "google",
});
assert.equal(vm.runInContext("publicReviews().length", behavior), reviewCount);
state.window.REVIEWS.pop();
for (const language of ["ru", "en"]) {
  vm.runInContext(`currentLanguage="${language}"`, behavior);
  assert.equal(
    vm.runInContext('filteredReviews("google", "BIS").length', behavior),
    1,
  );
  assert.equal(
    vm.runInContext('filteredReviews("website", "BIS").length', behavior),
    0,
  );
  assert.equal(
    vm.runInContext(
      'filteredReviews("all", "not-present-review").length',
      behavior,
    ),
    0,
  );
  assert(
    vm.runInContext(
      "profileCopy(window.ABOUT_PROFILE.intro).length",
      behavior,
    ) > 20,
  );
  assert(!/25|35|RU \/ EN/.test(vm.runInContext("catalogSummary()", behavior)));
}
console.log(
  "Checked review drafts, source attribution, bilingual search and local case/profile images.",
);

// Editorial content must remain navigable on GitHub Pages and safe to draft.
for (const file of ["navigation.js", "blog-data.js", "blog.js"]) {
  vm.runInContext(
    await readFile(path.join(site, "assets", file), "utf8"),
    behavior,
  );
}
assert(
  vm.runInContext(
    "MEGA_GROUPS.every(group => group.ids.every(id => tu.some(service => service.id === id && service.emoji)))",
    behavior,
  ),
);
const categorySlugs = new Set(
  state.window.BLOG_CATEGORIES.map((item) => item.slug),
);
assert.equal(categorySlugs.size, state.window.BLOG_CATEGORIES.length);
const postSlugs = new Set();
const blockTypes = new Set([
  "paragraph",
  "list",
  "table",
  "tabs",
  "accordion",
  "callout",
  "quote",
  "code",
]);
function checkBlogBlocks(blocks) {
  for (const block of blocks) {
    assert(blockTypes.has(block.type), `Unsupported blog block: ${block.type}`);
    if (block.type === "table")
      assert(block.rows.every((row) => row.length === block.headers.length));
    if (block.type === "tabs") {
      assert.equal(
        new Set(block.items.map((item) => item.id)).size,
        block.items.length,
      );
      block.items.forEach((item) => checkBlogBlocks(item.blocks));
    }
  }
}
for (const post of state.window.BLOG_POSTS) {
  assert(!postSlugs.has(post.slug));
  postSlugs.add(post.slug);
  assert(categorySlugs.has(post.category));
  assert(post.title.ru && post.title.en && post.excerpt.ru && post.excerpt.en);
  assert.equal(
    new Set(post.sections.map((section) => section.id)).size,
    post.sections.length,
  );
  for (const section of post.sections) {
    assert(section.title.ru && section.title.en && section.blocks.length);
    assert(!["comments", "main-content", "blog-top"].includes(section.id));
    checkBlogBlocks(section.blocks);
  }
}
const articleCount = vm.runInContext("publicBlogPosts().length", behavior);
state.window.BLOG_POSTS.push({ slug: "draft-check", status: "draft" });
assert.equal(
  vm.runInContext("publicBlogPosts().length", behavior),
  articleCount,
);
state.location.search = "?lang=ru&post=draft-check";
assert.equal(
  vm.runInContext('blogMetadata("blog-post").description', behavior),
  "",
);
state.window.BLOG_POSTS.pop();
for (const language of ["ru", "en"]) {
  vm.runInContext(`currentLanguage="${language}"`, behavior);
  state.location.search = `?lang=${language}&post=measurement-plan`;
  for (const page of ["blog", "blog-category", "blog-post"]) {
    state.location.pathname = `/portfolio/${page}.html`;
    state.location.hash = "#plan";
    assert.equal(vm.runInContext("readRoute().page", behavior), page);
  }
  assert.equal(
    vm.runInContext('blogPostLink("measurement-plan")', behavior),
    `blog-post.html?lang=${language}&post=measurement-plan`,
  );
  assert.equal(
    vm.runInContext('blogCategoryLink("analytics")', behavior),
    `blog-category.html?lang=${language}&category=analytics`,
  );
  assert.equal(
    vm.runInContext('filteredBlogPosts("analytics", "UTM").length', behavior),
    1,
  );
  assert.equal(
    vm.runInContext('filteredBlogPosts("advertising", "UTM").length', behavior),
    0,
  );
  assert.equal(
    vm.runInContext(
      'filteredBlogPosts("", "not-present-topic").length',
      behavior,
    ),
    0,
  );
  assert.equal(
    vm.runInContext('blogMetadata("blog-post").title', behavior),
    state.window.BLOG_POSTS[0].title[language],
  );
  const related = vm.runInContext(
    "relatedBlogPosts(window.BLOG_POSTS[0])",
    behavior,
  );
  assert(related.every((item) => item.slug !== "measurement-plan"));
  assert.equal(related[0].category, "analytics");
}
vm.runInContext('currentLanguage="ru"', behavior);
assert.equal(
  vm.runInContext(
    'blogReadMinutes({sections:[{title:{ru:"Тест",en:"Test"},blocks:[{type:"paragraph",text:{ru:"слово ".repeat(360),en:"word"}}]}]})',
    behavior,
  ),
  3,
);
console.log(
  "Checked menu service links, blog block structure, drafts, bilingual search, reading time and direct subpath URLs.",
);

for (const hubFile of [
  "learning-data.js",
  "course-levels.js",
  "simulator-models.js",
  "resources-data.js",
  "travel-data.js",
  "learning.js",
  "simulators.js",
  "resources.js",
  "travel.js",
  "announcements.js",
])
  vm.runInContext(
    await readFile(path.join(site, "assets", hubFile), "utf8"),
    behavior,
  );

vm.runInContext(
  await readFile(path.join(site, "assets/utilities.js"), "utf8"),
  behavior,
);
for (const [file, page] of [
  ["privacy.html", "privacy"],
  ["cookies.html", "cookies"],
  ["terms.html", "terms"],
  ["site-map.html", "site-map"],
  ["404.html", "not-found"],
]) {
  state.location.pathname = "/portfolio/" + file;
  state.location.hash = "";
  assert.equal(vm.runInContext("readRoute().page", behavior), page);
}
state.window.PORTFOLIO_NOT_FOUND = true;
state.location.pathname = "/portfolio/missing/nested/page";
assert.equal(vm.runInContext("readRoute().page", behavior), "not-found");
state.window.PORTFOLIO_NOT_FOUND = false;
for (const language of ["ru", "en"]) {
  vm.runInContext(`currentLanguage="${language}"`, behavior);
  const groups = vm.runInContext("siteMapGroups()", behavior);
  assert.equal(
    groups.find((group) => group.id === "services").links.length,
    39,
  );
  assert.equal(
    groups.find((group) => group.id === "cases").links.length,
    vm.runInContext("publishedCases().length", behavior),
  );
  assert.equal(groups.find((group) => group.id === "blog").links.length, 9);
  for (const group of groups) {
    for (const link of group.links) {
      assert.equal(typeof link.label, "string");
      const url = new URL(link.href, "https://example.com/portfolio/");
      assert.equal(url.searchParams.get("lang"), language);
      assert.equal(url.origin, "https://example.com");
      assert(url.pathname.startsWith("/portfolio/"));
      await access(path.join(site, url.pathname.split("/").pop()));
    }
  }
  assert(
    vm.runInContext(
      'filterSiteMap("KILC").some(group=>group.id==="cases")',
      behavior,
    ),
  );
  assert.equal(
    vm.runInContext('filterSiteMap("not-a-present-page").length', behavior),
    0,
  );
  Object.assign(state.location, {
    href: `https://example.com/portfolio/services.html?lang=${language}&email=private%40example.com&token=secret#/services/seo`,
    search: `?lang=${language}&email=private%40example.com&token=secret`,
    pathname: "/portfolio/services.html",
    hash: "#/services/seo",
  });
  assert.equal(
    vm.runInContext("cleanInquiryPage()", behavior),
    `https://example.com/portfolio/services.html?lang=${language}#/services/seo`,
  );
  const href = vm.runInContext('inquiryLink("seo")', behavior);
  const formUrl = new URL(href, "https://example.com/portfolio/");
  assert.equal(
    formUrl.searchParams.get("from"),
    `services.html?lang=${language}#/services/seo`,
  );
  Object.assign(state.location, {
    href: formUrl.href,
    search: formUrl.search,
    pathname: formUrl.pathname,
    hash: formUrl.hash,
  });
  const draft = vm.runInContext("composeInquiry(formValues)", behavior);
  assert(
    draft.includes(`https://example.com/portfolio/index.html?lang=${language}`),
  );
  assert(
    draft.includes(
      `https://example.com/portfolio/services.html?lang=${language}#/services/seo`,
    ),
  );
  assert(!draft.includes("secret") && !draft.includes("private@"));
  state.testDraft = draft;
  for (const channel of ["whatsapp", "telegram"]) {
    assert.equal(
      new URL(
        vm.runInContext(`messengerLink("${channel}", testDraft)`, behavior),
      ).searchParams.get("text"),
      draft,
    );
  }
}
for (const value of [
  "https://outside.example/portfolio/services.html",
  "javascript:alert(1)",
  "../private.html",
  "https://user:password@example.com/portfolio/index.html",
  "https://example.com/other/index.html",
]) {
  state.sourceCandidate = value;
  assert.equal(
    vm.runInContext("cleanInquiryPage(sourceCandidate)", behavior),
    "",
  );
}
state.location.search = "?from=";
assert.equal(vm.runInContext("inquiryPageContext().from", behavior), "");
state.location.href =
  "https://example.com/portfolio/blog-post.html?lang=ru&post=measurement-plan&phone=123#plan";
assert.equal(
  vm.runInContext("cleanInquiryPage()", behavior),
  "https://example.com/portfolio/blog-post.html?lang=ru&post=measurement-plan",
);
const known404 = await readFile(path.join(site, "404.html"), "utf8");
assert(
  known404.includes('base href="/portfolio/"') &&
    known404.includes("PORTFOLIO_NOT_FOUND = true"),
);
console.log(
  "Checked utility pages, complete site directory and sanitized inquiry attribution in both messengers and languages.",
);

// New catalog offers must work through prices, lead context and both language versions.
for (const language of ["ru", "en"]) {
  vm.runInContext(`currentLanguage="${language}"`, behavior);
  for (const offer of vm.runInContext("AI_OFFERS", behavior)) {
    const service = vm.runInContext(
      `tu.find(item=>item.id==="${offer.id}")`,
      behavior,
    );
    assert.equal(service.category, "ai");
    assert.equal(service.deliverables.length, 4);
    assert.equal(service.process.length, 4);
    assert.equal(service.faq.length, 4);
    assert(
      vm
        .runInContext(
          `translateText(tu.find(item=>item.id==="${offer.id}").title)`,
          behavior,
        )
        .includes(language === "ru" ? "ИИ" : "AI"),
    );
    for (const pack of service.pricing) {
      assert.deepEqual(
        Object.keys(state.window.PRICES.services[offer.id][pack.pkg]),
        ["USD", "RUB", "KZT"],
      );
    }
    assert(
      service.relatedIds.every((id) =>
        vm.runInContext(`tu.some(item=>item.id==="${id}")`, behavior),
      ),
    );
  }
  for (const city of vm.runInContext("CITY_PAGES", behavior)) {
    const cityUrl = `https://example.com/portfolio/${city.id}.html?lang=${language}`;
    Object.assign(state.location, {
      pathname: `/portfolio/${city.id}.html`,
      href: cityUrl,
      search: `?lang=${language}`,
      hash: "",
    });
    assert.equal(vm.runInContext("readRoute().page", behavior), "city");
    assert(
      vm
        .runInContext('growthMetadata("city").title', behavior)
        .includes(city.local[language]),
    );
    assert.equal(vm.runInContext("cleanInquiryPage()", behavior), cityUrl);
    for (const id of city.serviceIds)
      assert(vm.runInContext(`tu.some(item=>item.id==="${id}")`, behavior));
    for (const id of city.caseIds)
      assert(vm.runInContext(`visibleCase("${id}")`, behavior));
    const link = new URL(vm.runInContext("inquiryLink()", behavior), cityUrl);
    assert.equal(
      link.searchParams.get("from"),
      `${city.id}.html?lang=${language}`,
    );
  }
  assert.equal(
    vm.runInContext(
      'siteMapGroups().find(group=>group.id==="growth").links.length',
      behavior,
    ),
    7,
  );
}
assert.equal(
  vm.runInContext(
    "new Set(CITY_PAGES.map(city=>city.intro.ru)).size",
    behavior,
  ),
  5,
);
assert.equal(
  vm.runInContext("Object.keys(window.CASE_CHART_DATA).length", behavior),
  0,
  "Do not publish synthetic time series",
);
const seriesFixture = {
  id: "traffic",
  name: { ru: "Трафик", en: "Traffic" },
  source: { ru: "Тестовая выгрузка", en: "Test export" },
  unit: "",
  points: [
    { date: "2026-01-01", value: 0 },
    { date: "2026-02-01", value: 180 },
    { date: "2026-04-01", value: 120 },
  ],
};
state.window.CASE_CHART_DATA.fixture = [seriesFixture];
assert.equal(
  vm.runInContext('validDatedSeries("fixture").length', behavior),
  1,
);
for (const invalid of [
  { ...seriesFixture, source: "" },
  {
    ...seriesFixture,
    points: [
      { date: "2026-02-30", value: 0 },
      { date: "2026-03-01", value: 1 },
    ],
  },
  {
    ...seriesFixture,
    points: [
      { date: "2026-01-01", value: 0 },
      { date: "2026-01-01", value: 1 },
    ],
  },
  {
    ...seriesFixture,
    points: [
      { date: "2026-02-01", value: 1 },
      { date: "2026-01-01", value: 2 },
    ],
  },
  {
    ...seriesFixture,
    points: [
      { date: "2026-01-01", value: null },
      { date: "2026-02-01", value: 1 },
    ],
  },
  {
    ...seriesFixture,
    points: [
      { date: "2026-01-01", value: Infinity },
      { date: "2026-02-01", value: 1 },
    ],
  },
  {
    ...seriesFixture,
    points: [
      { date: "2026-01-01", value: -1 },
      { date: "2026-02-01", value: 1 },
    ],
  },
]) {
  state.window.CASE_CHART_DATA.fixture = [invalid];
  assert.equal(
    vm.runInContext('validDatedSeries("fixture").length', behavior),
    0,
  );
}
delete state.window.CASE_CHART_DATA.fixture;
assert.equal(
  vm.runInContext(
    'RangeComparisonChart({metric:{metric:"Test",before:"$1",after:"2%"}})',
    behavior,
  ),
  null,
);
const chart = vm.runInContext(
  'RangeComparisonChart({metric:{metric:"Test",before:"0-300",after:"1500-4000"}})',
  behavior,
);
assert.equal(chart.type, "figure");
assert(!/NaN|Infinity/.test(JSON.stringify(chart)));
const previousHooks = state.le;
let changedPoint;
state.le = {
  useState: (value) => [
    value,
    (next) => {
      changedPoint = next;
    },
  ],
  useRef: () => ({ current: null }),
};
state.datedFixture = seriesFixture;
const datedFigure = vm.runInContext(
  "DatedCaseChart({series:datedFixture})",
  behavior,
);
const flattenChart = (node) =>
  node && typeof node === "object"
    ? [node, ...[node.props?.children].flat().flatMap(flattenChart)]
    : [];
const datedNodes = flattenChart(datedFigure);
const line = datedNodes.find((node) => node.type === "polyline");
const coordinates = line.props.points
  .split(" ")
  .map((pair) => pair.split(",").map(Number));
assert(coordinates.flat().every(Number.isFinite));
assert.equal(coordinates[0][0], 60);
assert.equal(coordinates.at(-1)[0], 600);
assert(
  coordinates[1][0] < 330,
  "Horizontal distance must follow dates, not equal point spacing",
);
const slider = datedNodes.find((node) => node.type === "input");
assert.equal(slider.props.max, 2);
slider.props.onChange({ target: { value: "1" } });
assert.equal(changedPoint, 1);
state.le = previousHooks;
console.log(
  "Checked 8 AI offers, 5 city pages, bilingual source attribution and honest range/dated-chart validation.",
);

// Learning is deliberately a public demo. Validate progression inputs, scoring and content links.
const allCourses = vm.runInContext("COURSES", behavior);
const allResources = vm.runInContext("RESOURCES", behavior);
const allVideos = vm.runInContext("TRAVEL_VIDEOS", behavior);
assert.equal(vm.runInContext("LEARNING_MODE", behavior), "demo");
assert.equal(
  new Set(allCourses.map((item) => item.id)).size,
  allCourses.length,
);
for (const course of allCourses) {
  assert.equal(course.lessons.length, 6);
  assert.equal(new Set(course.lessons.map((item) => item.id)).size, 6);
  assert(
    vm
      .runInContext("tu", behavior)
      .some((service) => service.id === course.serviceId),
  );
  const exam = vm.runInContext(
    "COURSE_EXAMS[" + JSON.stringify(course.id) + "]",
    behavior,
  );
  assert.equal(exam.length, 6);
  for (const question of [
    ...course.lessons.map((lesson) => lesson.quiz),
    ...exam,
  ]) {
    assert(question.question.ru && question.question.en);
    assert.equal(question.options.length, 3);
    assert(
      Number.isInteger(question.answer) &&
        question.answer >= 0 &&
        question.answer < 3,
    );
    assert(question.explanation.ru && question.explanation.en);
    question.options.forEach((option) => assert(option.ru && option.en));
  }
  for (const lesson of course.lessons)
    for (const language of ["ru", "en"]) {
      assert(lesson.body[language].length > 180);
      assert(lesson.example[language].length > 50);
      assert(lesson.practice[language].length > 50);
    }
  const correct = exam.map((question) => question.answer);
  const score = (answers) =>
    vm.runInContext(
      "scoreCourseExam(" +
        JSON.stringify(course.id) +
        "," +
        JSON.stringify(answers) +
        ")",
      behavior,
    );
  assert.equal(score(correct).percent, 100);
  assert.equal(score(correct).passed, true);
  assert.equal(score(correct.slice(0, 5)), null);
  assert.equal(score(correct.map(() => -1)), null);
  assert.equal(score(correct.map(String)), null);
  const five = [...correct];
  five[0] = (five[0] + 1) % 3;
  assert.equal(score(five).passed, true);
  const four = [...five];
  four[1] = (four[1] + 1) % 3;
  assert.equal(score(four).passed, false);
  course.resourceIds.forEach((id) =>
    assert(allResources.some((resource) => resource.id === id)),
  );
}
const cleanedProgress = vm.runInContext(
  'cleanLearningState({"google-ads":{enrolled:true,completed:["economics","economics","fake"],best:999,attempts:-2},unknown:{enrolled:true}})',
  behavior,
);
assert.equal(Object.keys(cleanedProgress).length, 1);
assert.equal(cleanedProgress["google-ads"].completed.join(","), "economics");
assert.equal(cleanedProgress["google-ads"].best, null);
assert.equal(cleanedProgress["google-ads"].attempts, 0);
assert.equal(
  Object.keys(vm.runInContext("cleanLearningState(null)", behavior)).length,
  0,
);
assert.equal(
  Object.keys(vm.runInContext("cleanLearningState([])", behavior)).length,
  0,
);
for (const resource of allResources)
  for (const language of ["ru", "en"]) {
    const filename = vm.runInContext(
      "resourceFile(RESOURCES.find(item=>item.id===" +
        JSON.stringify(resource.id) +
        ")," +
        JSON.stringify(language) +
        ")",
      behavior,
    );
    const file = await readFile(path.join(site, filename));
    assert(file.length > 1000);
    assert.equal(
      file.subarray(0, resource.format === "PDF" ? 4 : 2).toString(),
      resource.format === "PDF" ? "%PDF" : "PK",
    );
    assert(allCourses.some((course) => course.id === resource.courseId));
  }
assert.equal(
  new Set(allVideos.map((video) => video.id)).size,
  allVideos.length,
);
allVideos.forEach((video) => {
  assert(/^[A-Za-z0-9_-]{11}$/.test(video.id));
  assert(video.title.ru && video.title.en);
});
for (const language of ["ru", "en"]) {
  vm.runInContext("currentLanguage=" + JSON.stringify(language), behavior);
  for (const [file, page, key, id] of [
    ["courses.html", "courses"],
    ["seo-simulator.html", "seo-simulator", "level", "senior"],
    ["google-ads-simulator.html", "google-ads-simulator", "level", "middle"],
    ["course.html", "course", "course", "google-ads"],
    ["academy.html", "academy"],
    ["classroom.html", "classroom", "course", "seo"],
    ["exam.html", "exam", "course", "analytics"],
    ["materials.html", "materials"],
    ["material.html", "material", "resource", "ads-checklist"],
    ["travel.html", "travel"],
    ["video.html", "video", "video", "N-d9C90eDuM"],
  ]) {
    const search = "?lang=" + language + (key ? "&" + key + "=" + id : "");
    Object.assign(state.location, {
      origin: "https://example.com",
      pathname: "/portfolio/" + file,
      search,
      hash: "",
      href:
        "https://example.com/portfolio/" +
        file +
        search +
        "&token=secret&email=private",
    });
    assert.equal(vm.runInContext("readRoute().page", behavior), page);
    const source = new URL(vm.runInContext("cleanInquiryPage()", behavior));
    assert(
      !source.searchParams.has("token") && !source.searchParams.has("email"),
    );
    if (key) assert.equal(source.searchParams.get(key), id);
    assert(
      vm.runInContext(
        "hubMetadata(" + JSON.stringify(page) + ").title",
        behavior,
      ),
    );
    assert.equal(source.searchParams.get("lang"), language);
  }
}
for (const filename of ["academy.html", "classroom.html", "exam.html"])
  assert(
    (await readFile(path.join(site, filename), "utf8")).includes(
      "noindex, follow",
    ),
  );
console.log(
  "Checked 10 bilingual courses, 60 lesson entries, exam thresholds and malformed progress, 10 real downloads, 14 videos and sanitized course/resource/video links.",
);
// Exercise every scenario against the actual model, including budgets and failure paths.
const simData = vm.runInContext(
  "({SIM_TASKS,SEO_ACTIONS,COURSE_FORMAT_PRICES})",
  behavior,
);
assert.equal(allCourses.filter((course) => course.level).length, 6);
const expectedGroupFees = [50000, 150000, 250000, 80000, 170000, 300000];
Object.values(simData.COURSE_FORMAT_PRICES).forEach((formats, index) => {
  assert.equal(formats.group.KZT, expectedGroupFees[index]);
  assert(formats.individual.KZT > formats.group.KZT);
  assert(formats.mentor.KZT > formats.individual.KZT);
  for (const prices of Object.values(formats)) {
    assert.equal(prices.USD, null);
    assert.equal(prices.RUB, null);
  }
});
const model = (topic, input, task) => {
  state.simInput = input;
  state.simTaskFixture = task;
  return vm.runInContext(
    topic === "seo"
      ? "simulateSEO(simInput,simTaskFixture)"
      : "simulateAds(simInput)",
    behavior,
  );
};
const passes = (topic, task, result) => {
  state.simResult = result;
  state.simTaskFixture = task;
  return vm.runInContext(
    `simulatorChecks(${JSON.stringify(topic)},simTaskFixture,simResult).every(check=>check.passed)`,
    behavior,
  );
};
for (const [topic, tasks] of Object.entries(simData.SIM_TASKS)) {
  assert.equal(tasks.length, 6);
  for (const level of ["junior", "middle", "senior"])
    assert.equal(tasks.filter((task) => task.level === level).length, 2);
  for (const task of tasks) {
    const initial = vm.runInContext(
      `({...SIM_DEFAULTS[${JSON.stringify(topic)}]})`,
      behavior,
    );
    Object.assign(initial, task.defaults);
    assert(
      !passes(topic, task, model(topic, initial, task)),
      `${topic}/${task.id} should require a decision`,
    );
    let solution;
    if (topic === "seo") {
      for (let mask = 0; mask < 32; mask++) {
        const input = Object.fromEntries(
          simData.SEO_ACTIONS.map((action, index) => [
            action.id,
            Boolean(mask & (1 << index)),
          ]),
        );
        const result = model(topic, input, task);
        assert(
          result.series.every((row) =>
            Object.values(row).every(Number.isFinite),
          ),
        );
        if (passes(topic, task, result)) solution = input;
      }
    } else {
      for (let budget = 100000; budget <= 400000; budget += 50000)
        for (let allocation = 0; allocation <= 100; allocation += 10) {
          const input = {
            budget,
            allocation,
            negatives: true,
            landing: true,
            qualified: true,
          };
          const result = model(topic, input, task);
          assert(result.spend <= budget + 1e-8);
          assert(
            Math.abs(
              result.profit -
                (result.revenue * 0.55 - result.spend - result.setup),
            ) < 1e-8,
          );
          assert(
            result.series.every((row) =>
              Object.values(row).every(Number.isFinite),
            ),
          );
          if (passes(topic, task, result)) solution = input;
        }
    }
    assert(
      solution,
      `${topic}/${task.id} must be achievable with UI control values`,
    );
  }
}
const rawAds = model("google-ads", { budget: 300000, allocation: 50 });
const reportOnly = model("google-ads", {
  budget: 300000,
  allocation: 50,
  qualified: true,
});
assert.equal(
  rawAds.quality,
  reportOnly.quality,
  "Changing the reporting goal cannot create leads",
);
assert.equal(rawAds.profit, reportOnly.profit);
assert.equal(rawAds.spend, 300000);
const clampedAds = model("google-ads", { budget: Infinity, allocation: NaN });
assert.equal(clampedAds.budget, 300000);
assert(!/NaN|Infinity/.test(JSON.stringify(clampedAds)));
const migrationTask = simData.SIM_TASKS.seo.find(
  (task) => task.id === "migration",
);
const unprotected = model("seo", {}, migrationTask),
  protectedMigration = model("seo", { migration: true }, migrationTask);
assert.equal(unprotected.series[0].value, protectedMigration.series[0].value);
assert.equal(unprotected.clicks, protectedMigration.clicks * 0.65);
const delayed = model("seo", { content: true }, simData.SIM_TASKS.seo[0]);
assert.equal(delayed.series[2].value, 240);
assert(delayed.series[8].value > delayed.series[3].value);
console.log(
  "Checked 18 manual course fees, 12 solvable simulator tasks, failing starting scenarios, demand caps, delayed SEO effects and profit formulas.",
);
for (const language of ["ru", "en"]) {
  state.courseInquiryFixture = {
    name: "QA",
    contact: "example@example.com",
    website: "",
    message: "Training inquiry fixture",
    service: "training",
    course: "seo-middle",
    courseFormat: "mentor",
    package: "",
    plan: "",
  };
  const message = vm.runInContext(
    `composeInquiry(courseInquiryFixture,${JSON.stringify(language)},"KZT")`,
    behavior,
  );
  assert(message.includes("SEO Middle"));
  assert(/300[\s,]*000/.test(message));
  assert(
    message.includes(language === "ru" ? "С наставником" : "With a mentor"),
  );
  state.courseInquiryFixture.course = "unknown-course";
  assert(
    !vm
      .runInContext(
        `composeInquiry(courseInquiryFixture,${JSON.stringify(language)},"KZT")`,
        behavior,
      )
      .includes("unknown-course"),
  );
}
console.log(
  "Checked course/format/fee attribution in both messenger draft languages and invalid-course rejection.",
);
