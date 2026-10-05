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
  "index.html",
  "clients.html",
  "services.html",
  "cases.html",
]) {
  const html = await readFile(path.join(site, page), "utf8");
  assert(
    html.includes('lang="ru"'),
    "Russian must be the default HTML language",
  );
  for (const [, url] of html.matchAll(/(?:src|href)="([^"#]+)"/g)) {
    if (!/^(?:https?:|data:|mailto:)/.test(url))
      await access(path.join(site, url));
  }
}
const context = vm.createContext({ window: {} });
for (const file of [
  "config.js",
  "prices.js",
  "clients.js",
  "translations.js",
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
  "Checked JavaScript, four HTML pages, local assets, client data and translations.",
);

// Verify the new behavior without adding demo clients to the actual website.
const state = {
  window: {
    PORTFOLIO: context.window.PORTFOLIO,
    RU: context.window.RU,
    CLIENTS: [],
    PRICES: context.window.PRICES,
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
vm.runInContext(
  await readFile(path.join(site, "assets/cases.js"), "utf8"),
  behavior,
);
vm.runInContext(
  await readFile(path.join(site, "assets/extensions.js"), "utf8"),
  behavior,
);

assert.equal(vm.runInContext("tu.length", behavior), 25);
assert.equal(vm.runInContext("Nn.length", behavior), 14);
assert.equal(
  vm.runInContext("new Set(tu.map(item=>item.id)).size", behavior),
  25,
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
  "Checked 25 services, 14 demo cases, 28 clients, archive routes, independent USD/RUB/KZT prices and both messenger drafts in RU/EN.",
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
  [...directLinks],
  ["https://wa.me/77073406888", "https://t.me/muhamed_kanapiya"],
);
console.log(
  "Checked independent manual prices, emoji, hidden demo routes, real cases and drafts, and direct messenger links.",
);
