var tu = [
    {
      id: "search-ads",
      emoji: "\uD83C\uDFAF",
      title: "Search Ads",
      short: "High-intent keywords that buy",
      heroLine: "Stop paying for tire-kickers. Search that actually converts.",
      long: "Exact match, SKAG rebuilds, negatives factory. For B2B, SaaS, local, ecom branded.",
      deliverables: [
        {
          title: "Keyword Architecture",
          desc: "STAG/SKAG, intent buckets: transactional vs informational. 200-400 negatives v1.",
        },
        {
          title: "Ad Copy Matrix",
          desc: "15 headlines x 4 descriptions per RSAs, USPs, proof, objection handling.",
        },
        {
          title: "Bidding & Budget",
          desc: "tCPA/tROAS, portfolio strategies, brand defense, competitor isolation.",
        },
        {
          title: "Landing & Extensions",
          desc: "Sitelinks, callouts, structured snippets, price, image, location sync.",
        },
      ],
      pricing: [
        { pkg: "Audit", timeline: "24h", bestFor: "Quick leaks" },
        {
          pkg: "Setup",
          timeline: "3 days",
          bestFor: "Rebuild from scratch",
        },
        {
          pkg: "Management",
          timeline: "Monthly",
          bestFor: "Scale profit",
        },
      ],
      kpis: [
        { metric: "CTR", before: "2.1%", after: "6.8%", note: "+224%" },
        { metric: "CPA", before: "$42", after: "$14.2", note: "-66%" },
        { metric: "Conv. Rate", before: "1.4%", after: "4.9%" },
      ],
      process: [
        {
          t: "Search Term Mining",
          d: "Pull last 90 days search terms, n-gram analysis, waste cutoff.",
        },
        {
          t: "Rebuild Structure",
          d: "Intent isolation, match type strategy, RSAs with pinning.",
        },
        {
          t: "Tracking Validation",
          d: "Enhanced conversions + offline import check.",
        },
        {
          t: "Scale & Kill",
          d: "Daily cull losers, push winners, weekly Loom.",
        },
      ],
      faq: [
        {
          q: "Broad match or exact?",
          a: "Both, but isolated. Brand = exact. Non-brand = broad + smart bidding + heavy negatives + audience signals.",
        },
        {
          q: "How many keywords?",
          a: "Not about quantity. 30-80 tight keywords beat 500 loose ones.",
        },
        {
          q: "Do you use Performance Max for search?",
          a: "No cannibalization. Search gets brand defense budget separate.",
        },
        {
          q: "Timeline to profit?",
          a: "7-14 days for stabilization, 21 days for tROAS learning.",
        },
        {
          q: "Do you write ad copy?",
          a: "Yes. 3 angles: outcome, mechanism, social proof.",
        },
      ],
    },
    {
      id: "pmax",
      emoji: "⚡",
      title: "Performance Max",
      short: "Full Google inventory, one goal",
      heroLine:
        "PMax done right: no black box, just margin-based asset groups.",
      long: "For accounts stuck at 1.x ROAS. I split by margin, bestsellers, LTV, new customer value.",
      deliverables: [
        {
          title: "Asset Group Split",
          desc: "By product margin, category, bestseller, new customer acquisition goal.",
        },
        {
          title: "Audience Signals",
          desc: "Custom segments, first-party lists, competitor URLs, search themes.",
        },
        {
          title: "Feed + Brand Control",
          desc: "Brand exclusions, URL expansion off, feed-only vs full asset.",
        },
        {
          title: "Creative Pack",
          desc: "20 images, 5 videos 10-15s, 5 long headlines, search theme governance.",
        },
      ],
      pricing: [
        {
          pkg: "Fix Existing",
          timeline: "2 days",
          bestFor: "Stuck PMax",
        },
        {
          pkg: "Full Setup",
          timeline: "4 days",
          bestFor: "Ecom $10k+/mo",
        },
        {
          pkg: "Scale",
          timeline: "Monthly",
          bestFor: "Multi-geo",
        },
      ],
      kpis: [
        { metric: "ROAS", before: "1.8x", after: "4.2x" },
        { metric: "New Customer %", before: "22%", after: "58%" },
        { metric: "Wasted Spend", before: "34%", after: "8%" },
      ],
      process: [
        {
          t: "PMax Audit",
          d: "Check insights, listing groups, search terms via insights script.",
        },
        {
          t: "Structure Rebuild",
          d: "Margin split, campaign priority, brand negatives.",
        },
        { t: "Creative & Feed", d: "Feed titles, image pack, video hooks." },
        {
          t: "Bid & Learn",
          d: "tROAS by asset group, new customer value mode.",
        },
      ],
      faq: [
        {
          q: "PMax is black box?",
          a: "Not with scripts + listing insights + search themes. We force transparency.",
        },
        {
          q: "Should I run Search + PMax?",
          a: "Yes, but isolate brand. PMax brand spend <10% after fix.",
        },
        {
          q: "How many asset groups?",
          a: "3-7. More = thin learning. Fewer = mixed margins.",
        },
        {
          q: "Do you need video?",
          a: "Yes. 9:16 + 16:9 UGC. +40% reach vs image-only.",
        },
        {
          q: "When to use Standard Shopping instead?",
          a: "For control, or GMC issues. I often run both: Standard low priority + PMax high.",
        },
      ],
    },
    {
      id: "shopping-pmax",
      emoji: "\uD83D\uDED2",
      title: "Shopping & PMax Ecom",
      short: "Shopify + Feed + ROAS",
      heroLine: "Your best sellers should get 70% spend. Not 10%.",
      long: "Shopping fix for Shopify/Woo. Feed titles, supplemental feeds, custom labels for profit.",
      deliverables: [
        {
          title: "Feed Title Rewrite",
          desc: "Brand + gender + category + attributes + size, 150 chars, A/B test.",
        },
        {
          title: "Custom Labels 0-4",
          desc: "0: margin, 1: bestseller, 2: AOV, 3: stock, 4: seasonality.",
        },
        {
          title: "Supplemental Feeds",
          desc: "Free shipping, promo, local inventory, review ratings.",
        },
        {
          title: "Campaign Priority",
          desc: "Standard low, PMax high, brand defense Search.",
        },
      ],
      pricing: [
        {
          pkg: "Feed Fix",
          timeline: "2 days",
          bestFor: "GMC warnings",
        },
        {
          pkg: "Shopping Rebuild",
          timeline: "3 days",
          bestFor: "ROAS <2x",
        },
        {
          pkg: "Full Ecom",
          timeline: "5 days",
          bestFor: "$15k+/mo",
        },
      ],
      kpis: [
        { metric: "ROAS", before: "1.6x", after: "4.5x" },
        { metric: "Impr. Share", before: "23%", after: "67%" },
        { metric: "Feed Disapproval", before: "18%", after: "0.3%" },
      ],
      process: [
        {
          t: "Feed Diagnostics",
          d: "GMC attributes: gtin, mpn, condition, shipping, tax.",
        },
        {
          t: "Supplemental & Rules",
          d: "Feed rules, title optimization, custom labels.",
        },
        { t: "PMax Split", d: "By margin + bestseller + new customer." },
        { t: "Scale", d: "tROAS ramp, geo expansion, audience layering." },
      ],
      faq: [
        {
          q: "Shopify feed app?",
          a: "Use Content API + supplemental. No 3rd party bloat.",
        },
        {
          q: "Title formula?",
          a: "[Brand] [Product] [Material] [Size] [Color] [Pack].",
        },
        {
          q: "How to handle variants?",
          a: "Item group id + custom labels, not separate products.",
        },
        {
          q: "ROAS target?",
          a: "Start max clicks, then tROAS = break-even *0.8, ramp.",
        },
        {
          q: "International feed?",
          a: "Separate feed per country, currency, language.",
        },
      ],
    },
    {
      id: "merchant-center",
      emoji: "\uD83C\uDFEA",
      title: "Merchant Center Setup & Unban",
      short: "Fix GMC suspension fast",
      heroLine: "GMC suspended? I unban accounts other agencies killed.",
      long: "Circumvention, counterfeit, misrep. I do policy pre-check, site compliance, return policy, contact page.",
      deliverables: [
        {
          title: "Policy Audit",
          desc: "Website: contact, return, shipping, privacy, TOS, business info.",
        },
        {
          title: "GMC Fix",
          desc: "Business info verification, shipping settings, tax, returns, feed issues.",
        },
        {
          title: "Unban Appeal",
          desc: "Root cause doc + fixes screenshot + Loom for Google support.",
        },
        {
          title: "Prevention Layer",
          desc: "Monitoring script, feed health alerts, policy blocker.",
        },
      ],
      pricing: [
        {
          pkg: "Audit + Checklist",
          timeline: "24h",
          bestFor: "Warning",
        },
        {
          pkg: "Unban Package",
          timeline: "3-7 days",
          bestFor: "Suspended",
        },
        {
          pkg: "Full GMC Build",
          timeline: "4 days",
          bestFor: "New store",
        },
      ],
      kpis: [
        {
          metric: "Approval Time",
          before: "14+ days (fail)",
          after: "2-5 days",
        },
        { metric: "Disapproval Rate", before: "40%", after: "<2%" },
        { metric: "Unban Rate", before: "0%", after: "87% (last 15)" },
      ],
      process: [
        {
          t: "Site Compliance",
          d: "Footer contact, returns >30 days, shipping transparency.",
        },
        { t: "Feed & GMC", d: "Fix gtin, shipping mismatch, tax, returns." },
        { t: "Appeal", d: "Evidence pack + fix video + support ticket." },
        { t: "Monitor", d: "Weekly GMC health check + auto alerts." },
      ],
      faq: [
        {
          q: "Can you unban misrepresentation?",
          a: "Yes, if root cause fixed. 87% success last 15 cases.",
        },
        {
          q: "Do you need admin?",
          a: "Read-only GMC + site admin for footer fixes.",
        },
        { q: "How long?", a: "Fixes 1 day, Google review 2-5 days." },
        {
          q: "Shopify dropship?",
          a: "Harder. Need branded site, not Ali generic.",
        },
        {
          q: "After unban, same store?",
          a: "Yes, but new feed + verified business + clean domain rep.",
        },
      ],
    },
    {
      id: "feed-management",
      emoji: "\uD83E\uDDEC",
      title: "Feed Management",
      short: "Product feed that sells",
      heroLine: "Your titles are costing you 60% impressions. I fix it.",
      long: "Feed rules, supplemental, custom labels, A/B testing at scale. 5k SKU capable.",
      deliverables: [
        {
          title: "Title Optimization",
          desc: "Keyword injection, attributes, 140-150 char, CTR focus.",
        },
        {
          title: "Feed Rules",
          desc: "Supplemental feeds, price, availability, sale price, custom attributes.",
        },
        {
          title: "Custom Labels",
          desc: "Margin buckets, ROAS buckets, stock velocity, LTV.",
        },
        {
          title: "Quality Score",
          desc: "Image size, background, GTIN coverage, rating sync.",
        },
      ],
      pricing: [
        {
          pkg: "Title Rewrite (500 SKU)",
          timeline: "3 days",
          bestFor: "CTR boost",
        },
        {
          pkg: "Full Feed System",
          timeline: "5 days",
          bestFor: "1k-5k SKU",
        },
        {
          pkg: "Feed + PMax",
          timeline: "7 days",
          bestFor: "Scale",
        },
      ],
      kpis: [
        { metric: "CTR", before: "0.42%", after: "0.91%" },
        { metric: "Impr. Share", before: "19%", after: "61%" },
        { metric: "ROAS", before: "2.1x", after: "4.0x" },
      ],
      process: [
        {
          t: "Feed Dump",
          d: "Export primary + supplemental, analyze missing attributes.",
        },
        { t: "Title Factory", d: "Template + AI + manual QC for top 20% SKU." },
        { t: "Labels & Rules", d: "Margin + bestseller tagging via Sheets." },
        { t: "Push & Monitor", d: "Content API push, disapproval watch." },
      ],
      faq: [
        {
          q: "How many titles?",
          a: "All, but top 20% SKU gets manual, rest templated.",
        },
        {
          q: "GTIN needed?",
          a: "Yes for brand products. 80%+ coverage target.",
        },
        {
          q: "Supplemental feed?",
          a: "Yes: shipping, returns, promos, local.",
        },
        {
          q: "Custom label example?",
          a: "label0: margin 0-4, label1: bestseller rank.",
        },
        {
          q: "Can you automate?",
          a: "Sheets + Content API + rules. No brittle apps.",
        },
      ],
    },
    {
      id: "display",
      emoji: "\uD83D\uDDBC️",
      title: "Display & Remarketing",
      short: "Bring back window shoppers",
      heroLine: "95% don't buy day one. I bring them back for 8c.",
      long: "Dynamic remarketing, RLSA, custom intent, Gmail, cost cap.",
      deliverables: [
        {
          title: "Audience Buckets",
          desc: "ViewContent 7d, ATC 14d, Purch 30-180d exclusion, video viewers.",
        },
        {
          title: "Responsive Display",
          desc: "10+ images, 5 headlines, dynamic feed for ecom.",
        },
        {
          title: "Exclusion & Brand Safety",
          desc: "App category exclusion, placement exclusion, frequency cap.",
        },
        {
          title: "Bidding",
          desc: "tCPA for remarketing, viewable CPM for prospecting, custom intent.",
        },
      ],
      pricing: [
        {
          pkg: "Remarketing Setup",
          timeline: "2 days",
          bestFor: "Abandoned cart",
        },
        {
          pkg: "Full Display",
          timeline: "3 days",
          bestFor: "Scale",
        },
        {
          pkg: "Prospecting + Retarget",
          timeline: "5 days",
          bestFor: "Ecom + SaaS",
        },
      ],
      kpis: [
        { metric: "Remarketing CPA", before: "$28", after: "$8.3" },
        { metric: "CTR", before: "0.3%", after: "1.2%" },
        { metric: "ROAS (dynamic)", before: "3x", after: "8.4x" },
      ],
      process: [
        { t: "Tag & List Check", d: "GA4 audiences, Ads tag, duration fix." },
        { t: "Creative Pack", d: "UGC + product + offer angles." },
        {
          t: "Structure",
          d: "Prospecting vs remarketing separated, freq cap 3/day.",
        },
        {
          t: "Placement Guard",
          d: "Exclusion list 1000+ apps + managed placements.",
        },
      ],
      faq: [
        {
          q: "Display still works?",
          a: "For remarketing, yes. ROAS 6-10x for ecom ATC.",
        },
        { q: "Dynamic?", a: "Yes for Shopify: feed + dynamic creative." },
        { q: "Frequency?", a: "Cap 3/day, 10/week to avoid fatigue." },
        {
          q: "Gmail ads?",
          a: "Discovery/Demand Gen now. Better than old Gmail.",
        },
        {
          q: "App placements waste?",
          a: "Exclude gmobs + sensitive categories + add placement report.",
        },
      ],
    },
    {
      id: "youtube",
      emoji: "\uD83D\uDCFA",
      title: "YouTube Ads",
      short: "Video that converts, not vanity",
      heroLine: "Skippable that sells. Not brand fluff.",
      long: "In-stream, Shorts, Demand Gen video. Hooks, UGC, VSL, retargeting.",
      deliverables: [
        {
          title: "Hook Library",
          desc: "20 hooks, 3 sec pattern interrupt, problem-agitate-solve.",
        },
        {
          title: "Campaign Types",
          desc: "In-stream skippable, Shorts, in-feed, Demand Gen.",
        },
        {
          title: "Targeting",
          desc: "Custom intent (search), affinity + in-market, placement whitelists.",
        },
        {
          title: "Measurement",
          desc: "Brand lift, view-through conv, GA4 + EC.",
        },
      ],
      pricing: [
        {
          pkg: "Creative Audit",
          timeline: "24h",
          bestFor: "Low CTR",
        },
        {
          pkg: "YouTube Setup",
          timeline: "4 days",
          bestFor: "Lead + App",
        },
        {
          pkg: "YT + Remarketing",
          timeline: "7 days",
          bestFor: "Scale",
        },
      ],
      kpis: [
        { metric: "CPV", before: "$0.18", after: "$0.04" },
        { metric: "View Rate", before: "22%", after: "48%" },
        { metric: "CPA (YT)", before: "$34", after: "$11.5" },
      ],
      process: [
        { t: "Angle Mining", d: "Top ads library, reviews, Reddit pains." },
        {
          t: "Script & Edit",
          d: "Brief for editor: 6s, 15s, 30s cuts, subtitles.",
        },
        { t: "Campaign Launch", d: "tCPV → Max Conv, custom intent seeding." },
        { t: "Cut & Scale", d: "Kill <25% view rate, scale hook winners." },
      ],
      faq: [
        {
          q: "Need big production?",
          a: "No. UGC iPhone 9:16 wins over studio.",
        },
        {
          q: "Shorts vs In-stream?",
          a: "Shorts for reach cheap, in-stream for intent. Run both.",
        },
        { q: "Length?", a: "6s bumper for remarketing, 15-30s for cold." },
        { q: "Targeting?", a: "Custom intent keywords + competitor channels." },
        {
          q: "Link to site?",
          a: "Demand Gen + Video views campaign + retarget via Display/PMax.",
        },
      ],
    },
    {
      id: "demand-gen",
      emoji: "\uD83D\uDCA1",
      title: "Demand Gen / Discovery",
      short: "Feed ads that create demand",
      heroLine: "Before they search, they see you on YouTube, Discover, Gmail.",
      long: "Replaced Discovery. Best for ecom + app + lead with visual product. Lookalikes + first-party.",
      deliverables: [
        {
          title: "Creative Pack",
          desc: "Lifestyle images 1:1, 4:5, 1.91:1, 10+ assets, product feed link.",
        },
        {
          title: "Audience",
          desc: "Lookalike seed: converters, value-based, optimized targeting on.",
        },
        {
          title: "Structure",
          desc: "Prospect vs remarketing, product feed toggle, budget split.",
        },
        {
          title: "Tracking",
          desc: "EC for offline + data-driven attribution.",
        },
      ],
      pricing: [
        {
          pkg: "Setup",
          timeline: "2 days",
          bestFor: "Ecom visual",
        },
        {
          pkg: "Setup + Creative",
          timeline: "5 days",
          bestFor: "Need assets",
        },
        {
          pkg: "Scale Pack",
          timeline: "Monthly",
          bestFor: "App + Ecom",
        },
      ],
      kpis: [
        { metric: "CTR", before: "0.4%", after: "1.8%" },
        { metric: "CPA", before: "$18", after: "$7.2" },
        { metric: "Reach", before: "50k", after: "420k /mo" },
      ],
      process: [
        { t: "Asset Harvest", d: "Top images, UGC, product feed." },
        { t: "Audience Seed", d: "Converters + ATC + email list lookalike." },
        { t: "Launch", d: "Max conversions, then max conv value." },
        { t: "Iterate", d: "Weekly creative swap, fatigue guard." },
      ],
      faq: [
        {
          q: "Difference vs PMax?",
          a: "Demand Gen is feed-first, social-like, better prospecting.",
        },
        { q: "Need video?", a: "Yes, video + image mix. Video 30% of spend." },
        { q: "Budget min?", a: "$30/day to exit learning." },
        {
          q: "For B2B?",
          a: "Works if visual + offer strong. Lead form asset.",
        },
        { q: "Feed needed?", a: "Optional but boosts ecom ROAS 40%." },
      ],
    },
    {
      id: "app-campaigns",
      emoji: "\uD83D\uDCF1",
      title: "App Campaigns (UAC)",
      short: "Installs that don't churn",
      heroLine: "From CPI $8.5 → $2.1. Not bot installs.",
      long: "tCPA, tROAS, Firebase, SKAdNetwork, anti-fraud. iOS + Android.",
      deliverables: [
        {
          title: "Firebase + GA4 Link",
          desc: "in_app_purchase, first_open, custom events, audience import.",
        },
        {
          title: "Asset Pack",
          desc: "20 texts, 20 images, 10 videos 10-30s, HTML5 optional.",
        },
        {
          title: "Campaign Split",
          desc: "Install vs Engagement vs Pre-reg, geo + language.",
        },
        {
          title: "Fraud Guard",
          desc: "Negative placements, IP exclusion, category block, MMP optional.",
        },
      ],
      pricing: [
        {
          pkg: "Install Setup",
          timeline: "3 days",
          bestFor: "New app",
        },
        {
          pkg: "tROAS Scale",
          timeline: "7 days",
          bestFor: "IAP / Subs",
        },
        {
          pkg: "iOS + Android",
          timeline: "10 days",
          bestFor: "Both stores",
        },
      ],
      kpis: [
        { metric: "CPI", before: "$8.5", after: "$2.1" },
        { metric: "Retention D7", before: "8%", after: "22%" },
        { metric: "IAP ROAS", before: "0.6x", after: "2.4x" },
      ],
      process: [
        { t: "SDK & Events", d: "Firebase events mapping + GA4 + SKAN." },
        { t: "Asset Production", d: "UGC gameplay, feature cuts, captions." },
        { t: "UAC Structure", d: "tCPI → tCPA → tROAS ladder." },
        { t: "Fraud & Scale", d: "Placement scrub, geo expansion." },
      ],
      faq: [
        {
          q: "iOS tracking?",
          a: "SKAN + ATT consent + Firebase conversion modeling.",
        },
        { q: "Budget?", a: "$50/day min for tCPA learning." },
        { q: "Video needed?", a: "Mandatory. 70% spend goes video." },
        { q: "Pre-registration?", a: "Yes, for launch. Cheap installs." },
        {
          q: "Bot installs?",
          a: "We exclude Search partners + Display fraud + monitor IP.",
        },
      ],
    },
    {
      id: "local",
      emoji: "\uD83D\uDCCD",
      title: "Local & Maps Ads (LSA)",
      short: "Calls from 5km radius",
      heroLine: "For dentists, gyms, schools: 48 leads/mo from $340.",
      long: "GBP sync, local pack, radius bidding, call tracking, offline import.",
      deliverables: [
        {
          title: "GBP Optimization",
          desc: "Categories, services, hours, photos, Q&A, posts.",
        },
        {
          title: "Local Campaigns",
          desc: "Radius 3-10km, location assets, promotion assets.",
        },
        {
          title: "Call Tracking",
          desc: "CallRail / WhatConverts, keyword-level, offline import.",
        },
        {
          title: "LSA Setup",
          desc: "Google Guaranteed, background check, budget + disputes.",
        },
      ],
      pricing: [
        {
          pkg: "Local Starter",
          timeline: "2 days",
          bestFor: "Single location",
        },
        {
          pkg: "LSA + Local",
          timeline: "4 days",
          bestFor: "Service biz",
        },
        {
          pkg: "Multi-location",
          timeline: "7 days",
          bestFor: "3+ spots",
        },
      ],
      kpis: [
        { metric: "Leads/mo", before: "12", after: "48" },
        { metric: "CPL", before: "$28", after: "$7.2" },
        { metric: "Show Rate", before: "22%", after: "61%" },
      ],
      process: [
        { t: "GBP Audit", d: "NAP, hours, services, photos, reviews reply." },
        { t: "Campaign Build", d: "Local campaign + Search local + LSA." },
        { t: "Call Track", d: "Number insertion + offline conv import." },
        { t: "Schedule Bid", d: "Peak hours + radius bid adj + ad schedule." },
      ],
      faq: [
        {
          q: "LSA vs Local Campaigns?",
          a: "LSA = pay per lead, top. Local = map pack. Run both.",
        },
        { q: "Radius?", a: "3km urban, 10km suburban. Bid adj by distance." },
        { q: "Budget?", a: "$15/day min per location." },
        { q: "Reviews matter?", a: "Yes. 4.5+ and 20+ reviews = 2x CTR." },
        {
          q: "Multiple locations?",
          a: "Separate campaigns + asset groups per location.",
        },
      ],
    },
    {
      id: "call-only",
      emoji: "\uD83D\uDCDE",
      title: "Call-Only & Call Tracking",
      short: "Calls, not forms",
      heroLine:
        "For urgent services: locksmith, clinic, lawyer — calls convert 3x forms.",
      long: "Call-only ads, call extensions, call bidding, IVR, call scoring.",
      deliverables: [
        {
          title: "Call-Only Campaigns",
          desc: "Business name, verified calls, call length filter.",
        },
        {
          title: "Call Extensions",
          desc: "On all campaigns, schedule, call reporting.",
        },
        {
          title: "Call Tracking Stack",
          desc: "GTM + GA4 + CallRail + offline import + value.",
        },
        {
          title: "Call Scoring",
          desc: "Qualified vs spam, keyword-level attribution.",
        },
      ],
      pricing: [
        {
          pkg: "Call Setup",
          timeline: "1 day",
          bestFor: "Urgent leads",
        },
        {
          pkg: "Tracking + Calls",
          timeline: "3 days",
          bestFor: "Full stack",
        },
        {
          pkg: "Scale",
          timeline: "Monthly",
          bestFor: "High volume",
        },
      ],
      kpis: [
        { metric: "Call Rate", before: "1.2%", after: "4.8%" },
        { metric: "CPA (qualified)", before: "$42", after: "$14" },
        { metric: "Spam %", before: "38%", after: "8%" },
      ],
      process: [
        { t: "Call Audit", d: "Check call reporting + length + missed." },
        { t: "Campaign Build", d: "Call-only + Search with call asset." },
        { t: "Tracking", d: "DNI + GA4 + offline import." },
        {
          t: "Qualify",
          d: "Call scoring + negative keywords for job seekers.",
        },
      ],
      faq: [
        {
          q: "Call-only still exists?",
          a: "Yes, but limited. Use Search with call asset + bid for calls.",
        },
        { q: "Best verticals?", a: "Medical, legal, home services, edu." },
        { q: "Min call length?", a: "Set 30-60 sec as conversion." },
        {
          q: "After hours?",
          a: "Schedule + voicemail handling + lead form fallback.",
        },
        { q: "Spam calls?", a: "Negative: job, free, hiring + IP exclusion." },
      ],
    },
    {
      id: "audit",
      emoji: "\uD83D\uDD75️",
      title: "Audit & Account Rescue",
      short: "Find $5k waste in 24h",
      heroLine: "I find where 30-50% budget burns. Loom audit $49.",
      long: "For accounts already spending $3k+/mo but stuck. 45-point checklist.",
      deliverables: [
        {
          title: "Waste Map",
          desc: "Search term waste, PMax brand bleed, placement waste, geo waste.",
        },
        {
          title: "Tracking Check",
          desc: "GA4, GTM, EC, offline, duplicate conv, attribution.",
        },
        {
          title: "Structure Grade",
          desc: "Campaign bloat, match type, negatives, bidding, feed.",
        },
        {
          title: "Fix Roadmap",
          desc: "P0/P1/P2 fixes, expected ROAS lift, timeline.",
        },
      ],
      pricing: [
        {
          pkg: "Loom Audit",
          timeline: "24h",
          bestFor: "Quick wins",
        },
        {
          pkg: "Deep Audit + Sheet",
          timeline: "2 days",
          bestFor: "Rescue plan",
        },
        {
          pkg: "Audit + Fix",
          timeline: "5 days",
          bestFor: "Full rescue",
        },
      ],
      kpis: [
        { metric: "Waste Cut", before: "0%", after: "-42% avg" },
        { metric: "ROAS Lift", before: "1.9x", after: "3.8x" },
        { metric: "Time to Fix", before: "—", after: "3.2 days avg" },
      ],
      process: [
        { t: "Read-Only Access", d: "Ads + GA4 + GMC + GTM viewer." },
        { t: "45-Point Scan", d: "Script run + manual + Loom." },
        { t: "Roadmap", d: "P0 fixes first, expected impact $." },
        { t: "Fix", d: "Rebuild + tracking + feed, handover Sheet." },
      ],
      faq: [
        {
          q: "What if account is fine?",
          a: "Refund $49 if <15% improvement found.",
        },
        {
          q: "Do you need admin?",
          a: "Read-only enough for audit. Admin for fix.",
        },
        {
          q: "Tools?",
          a: "My scripts + n-gram + PMax insights + change history.",
        },
        { q: "How long Loom?", a: "15-22 min, timestamped, actionable." },
        { q: "After audit discount?", a: "Audit $49 credited to Setup $350." },
      ],
    },
    {
      id: "tracking",
      emoji: "\uD83D\uDEE0️",
      title: "Tracking & Analytics",
      short: "GTM / GA4 / Enhanced Conversions",
      heroLine:
        "Without server-side, you're optimizing on 60% data. I fix it in 24h.",
      long: "Server-side GTM, GA4, Enhanced Conversions, offline import, consent mode v2.",
      deliverables: [
        {
          title: "GTM Server-Side",
          desc: "Stape / GCP, first-party domain, GA4 + Ads tags sGTM.",
        },
        {
          title: "GA4 + EC",
          desc: "Purchase, lead, Enhanced Conversions for Web + Leads, hashing.",
        },
        {
          title: "Offline Import",
          desc: "GCLID + call + store sales import via API/Sheet.",
        },
        {
          title: "Consent Mode v2",
          desc: "CMP, advanced consent, beacon recovery.",
        },
      ],
      pricing: [
        {
          pkg: "GA4 + GTM Fix",
          timeline: "1 day",
          bestFor: "Broken tracking",
        },
        {
          pkg: "Server-Side + EC",
          timeline: "2 days",
          bestFor: "iOS loss",
        },
        {
          pkg: "Full Stack",
          timeline: "3 days",
          bestFor: "Offline sales",
        },
      ],
      kpis: [
        { metric: "Conv. Accuracy", before: "58%", after: "94%" },
        { metric: "Match Rate EC", before: "—", after: "72%" },
        { metric: "tROAS Learning", before: "14 days", after: "5 days" },
      ],
      process: [
        { t: "Audit", d: "GTM preview + GA4 debug + Ads diagnostics." },
        { t: "sGTM Deploy", d: "Stape setup, custom domain, tags migration." },
        { t: "EC + Offline", d: "Hashing, GCLID capture, Sheet/API import." },
        { t: "Validation", d: "7-day match rate + conversion lag check." },
      ],
      faq: [
        {
          q: "Server-side needed?",
          a: "Yes if >30% Safari/iOS or ad blockers. +25% signal.",
        },
        {
          q: "Enhanced Conversions?",
          a: "Hashed email/phone for better bidding, +20% match.",
        },
        {
          q: "Consent mode v2?",
          a: "Required for EEA. Advanced mode recovers 30% data.",
        },
        { q: "Stape cost?", a: "$20-100/mo. I include setup, you pay host." },
        { q: "Offline import?", a: "Yes for CRM: HubSpot, Pipedrive, Sheets." },
      ],
    },
    {
      id: "cro",
      emoji: "\uD83E\uDDEA",
      title: "CRO & Landing Audit",
      short: "Fix LP, double conv rate",
      heroLine: "Ads are 50%. Landing is 50%. Your LP leaks 70%.",
      long: "Loom teardown, wireframe, A/B test plan, offer stack, speed.",
      deliverables: [
        {
          title: "Loom Teardown",
          desc: "15 min video: above fold, offer, proof, friction.",
        },
        {
          title: "Wireframe",
          desc: "Figma wire: hero, benefits, social proof, FAQ, CTA.",
        },
        {
          title: "A/B Plan",
          desc: "3 tests: headline, offer, form length. Priori.",
        },
        {
          title: "Speed & Tracking",
          desc: "LCP, CLS, form events, GA4 scroll + click.",
        },
      ],
      pricing: [
        {
          pkg: "LP Audit",
          timeline: "24h",
          bestFor: "Quick wins",
        },
        {
          pkg: "Audit + Wireframe",
          timeline: "3 days",
          bestFor: "Redesign brief",
        },
        {
          pkg: "CRO Sprint",
          timeline: "14 days",
          bestFor: "A/B testing",
        },
      ],
      kpis: [
        { metric: "Conv. Rate", before: "1.8%", after: "4.2%" },
        { metric: "Bounce Rate", before: "72%", after: "38%" },
        { metric: "LCP", before: "4.2s", after: "1.8s" },
      ],
      process: [
        {
          t: "Heuristic Audit",
          d: "CXL checklist, clarity, friction, anxiety.",
        },
        {
          t: "Session Replay",
          d: "Hotjar / Clarity, rage clicks, dead clicks.",
        },
        { t: "Wireframe", d: "Above fold 5 sec test, offer stack." },
        { t: "Test", d: "GTM A/B via VWO/ABTasty or native." },
      ],
      faq: [
        {
          q: "Do you design?",
          a: "Wireframe + copy. Designer builds in your builder.",
        },
        { q: "Shopify LP?", a: "Yes: product page CRO, ATC boost." },
        { q: "Tool?", a: "Figma + Loom + GA4." },
        {
          q: "How many tests?",
          a: "3 parallel max. 2 weeks per test min 300 conv.",
        },
        { q: "Offer help?", a: "Yes: bonus, guarantee, scarcity stack." },
      ],
    },
    {
      id: "competitor",
      emoji: "⚔️",
      title: "Competitor Strategy",
      short: "Steal share, not just defend",
      heroLine: "Competitor conquest without war: $11 CPA vs $42.",
      long: "Auction insights, keyword conquest, brand defense, YouTube placement steal.",
      deliverables: [
        {
          title: "Auction Intel",
          desc: "Overlap, outrank, top of page, absolute top, share loss.",
        },
        {
          title: "Conquest Campaign",
          desc: "Competitor keywords + RLSA + custom intent + YouTube placements.",
        },
        {
          title: "Brand Defense",
          desc: "Brand Search + PMax brand exclusion + trademark complaint if needed.",
        },
        {
          title: "Creative Counter",
          desc: "Comparison landing, vs pages, alternative ads.",
        },
      ],
      pricing: [
        {
          pkg: "Intel Report",
          timeline: "1 day",
          bestFor: "Who beats you",
        },
        {
          pkg: "Conquest Setup",
          timeline: "3 days",
          bestFor: "Steal share",
        },
        {
          pkg: "Defense + Offense",
          timeline: "5 days",
          bestFor: "Both sides",
        },
      ],
      kpis: [
        { metric: "Impr. Share (non-brand)", before: "28%", after: "62%" },
        { metric: "CPA Conquest", before: "$52", after: "$19" },
        { metric: "Brand CPC", before: "$2.8", after: "$0.9" },
      ],
      process: [
        {
          t: "Intel Pull",
          d: "Auction insights, search terms with competitor names.",
        },
        {
          t: "Landing vs Page",
          d: "Build comparison page: us vs them, feature table.",
        },
        {
          t: "Conquest Launch",
          d: "Search conquest + YouTube competitor placements.",
        },
        { t: "Defense", d: "Brand Search max + PMax brand exclusion." },
      ],
      faq: [
        {
          q: "Is bidding on competitor allowed?",
          a: "Yes for Search keywords, not trademark in ad copy (EEA/US).",
        },
        {
          q: "Quality Score low?",
          a: "Use vs landing, high relevance, expect 3-5/10 but CPA still wins.",
        },
        {
          q: "YouTube steal?",
          a: "Place ads on competitor channel videos, custom intent.",
        },
        { q: "Budget %?", a: "10-20% of total for conquest, not more." },
        { q: "Defense?", a: "Always. Brand Search tIS 95%+." },
      ],
    },
  ],
  Nn = [
    {
      id: "ecom-us",
      emoji: "\uD83D\uDED2",
      tag: "Ecom US • Shopify • $18k/mo",
      title: "Ecom US Store: CPA $42 → $11.3",
      headline: "ROAS 1.8 → 4.2x in 21 days. Merchant Center rescued.",
      overview: {
        client: "Shopify Fashion US",
        niche: "Women Apparel",
        budget: "$18k/mo",
        geo: "US",
        goal: "ROAS 3.5x+",
      },
      metrics: [
        { metric: "ROAS", before: "1.8x", after: "4.2x", delta: "+133%" },
        { metric: "CPA", before: "$42", after: "$11.3", delta: "-73%" },
        {
          metric: "CTR (Shopping)",
          before: "0.31%",
          after: "0.88%",
          delta: "+184%",
        },
        {
          metric: "Feed Disapproval",
          before: "22%",
          after: "0.4%",
          delta: "-98%",
        },
      ],
      wrong: [
        "PMax single asset group mixing low margin + high margin",
        "Feed titles = supplier names, no attributes",
        "Search brand cannibalized by PMax (brand 40% of PMax spend)",
        "GMC shipping mismatch + return policy missing",
        "No new customer value, all conv equal",
      ],
      did: [
        "Split PMax by margin: 4 asset groups (margin 60%+, 40-60%, bestsellers, clearance)",
        "Rewrite 842 titles: [Brand] + [Style] + [Material] + [Color] + [Size]",
        "Custom labels: 0=margin, 1=bestseller rank, 2=stock",
        "Isolate brand Search + PMax brand exclusion + negative brand list",
        "Fix GMC: shipping settings, return policy page, contact footer, verification",
        "Add New Customer Acquisition goal with +30% value",
        "Supplemental feed: free shipping + sale prices + rating",
      ],
      timeline: [
        "Day 1: GMC fix + feed rules",
        "Day 2: Title rewrite top 200 SKU",
        "Day 3: PMax rebuild + brand Search",
        "Day 7: tROAS 350% → 420%",
        "Day 21: 4.2x stable",
      ],
      testimonial: {
        name: "Jason D.",
        role: "Founder, Shopify US",
        text: "Arman rebuilt our PMax stuck at 1.8 ROAS. Now 4.2x in 3 weeks. Fixed Merchant mislabel and killed brand cannibalization. Loom + Sheet only, no calls needed.",
      },
    },
    {
      id: "crypto-wallet",
      emoji: "\uD83D\uDD10",
      tag: "Crypto Wallet • High-risk • Global",
      title: "Crypto Wallet: Approved after 3 bans",
      headline: "1200 installs at $3.8 CPA after 3 bans. No ban 4 months.",
      overview: {
        client: "Crypto Wallet App",
        niche: "Self-custody Wallet",
        budget: "$2.1k + setup",
        geo: "Global ex US",
        goal: "Approved + installs",
      },
      metrics: [
        {
          metric: "Account Status",
          before: "Banned x3",
          after: "Approved",
          delta: "100%",
        },
        { metric: "Installs", before: "0", after: "1200", delta: "∞" },
        { metric: "CPI", before: "—", after: "$3.8", delta: "—" },
        {
          metric: "Policy Flags",
          before: "3 (circumvention)",
          after: "0",
          delta: "-100%",
        },
      ],
      wrong: [
        "Circumvention policy: cloaking, mismatched domain, risky claims 'earn 100%'",
        "No financial risk disclosure, no contact",
        "Video ad: promises, no disclaimer",
        "Landing = app store direct, no intermediate compliance page",
        "Same domain blacklisted",
      ],
      did: [
        "New domain with policy-compliant copy: risks, no guarantees, educational angle",
        "Added disclosure page: not financial advice, risks, contact + company",
        "Rewrite video: 'Learn to self-custody' not 'Get rich'",
        "Build intermediate landing: features + security + reviews + disclaimer",
        "App Campaigns tCPA with new asset pack, no trigger words",
        "GMC-style policy pre-check: 40-point checklist before spend",
        "Appeal pack with Loom showing fixes",
      ],
      timeline: [
        "Day 1: Policy audit + new domain copy",
        "Day 2-3: Landing + video rewrite",
        "Day 4: New account warm-up + $50 test",
        "Day 5-11: Scale to $200/day, 1200 installs",
        "Month 4: Still live, no flags",
      ],
      testimonial: {
        name: "Alex K.",
        role: "Founder, Crypto App",
        text: "3 agencies banned us. Arman got us approved in 11 days. He knows policy better than Google support. Now 1200 installs, $3.8 CPA.",
      },
    },
    {
      id: "english-school",
      emoji: "\uD83C\uDF93",
      tag: "Education • Astana • $340/mo",
      title: "English School: 12 → 48 leads / mo",
      headline: "Local lead gen 4x with call tracking + offline import.",
      overview: {
        client: "English School Astana",
        niche: "IELTS & General",
        budget: "$340/mo",
        geo: "Astana 5km",
        goal: "Qualified leads",
      },
      metrics: [
        { metric: "Leads / mo", before: "12", after: "48", delta: "+300%" },
        { metric: "CPL", before: "$28", after: "$7.2", delta: "-74%" },
        { metric: "Show-up Rate", before: "31%", after: "68%", delta: "+119%" },
        { metric: "Enrollments", before: "2", after: "9", delta: "+350%" },
      ],
      wrong: [
        "Broad match 'english' eating budget on jobs",
        "No call tracking, forms only, 60% calls missed",
        "No GBP, no location assets, wrong radius",
        "Landing generic, no quiz, no price",
        "No offline conversion import, optimizing on form only",
      ],
      did: [
        "Build Local campaign: radius 5km + location assets + call asset + promo 'Free trial'",
        "Search: [english school astana], IELTS, exact + phrase + negatives: job, free, salary",
        "Call tracking: CallRail DNI + GA4 + 60 sec conversion + offline import for enrollments",
        "Landing quiz: Level test + price calc + calendar embed, 3 steps",
        "Schedule bidding: 10am-9pm, bid +30% peak 6-9pm",
        "GBP optimization: photos, services, posts weekly",
        "LSA launched: Google Guaranteed, background check",
      ],
      timeline: [
        "Day 1: GBP + call tracking",
        "Day 2: Campaigns + negatives 200",
        "Day 3: Quiz LP",
        "Week 2: LSA approval",
        "Day 30: 48 leads, 9 enrollments",
      ],
      testimonial: {
        name: "Aisha L.",
        role: "Owner, Edu Center",
        text: "12 to 48 leads. CPL $7. We finally know which keyword brings enrollments, not just clicks. Telegram reply in 2 hours.",
      },
    },
    {
      id: "saas-b2b",
      emoji: "\uD83D\uDCBC",
      tag: "SaaS B2B • $12k/mo • US/UK",
      title: "SaaS B2B: Demo CPA $210 → $48",
      headline: "B2B demo pipeline 3x with search + competitor conquest.",
      overview: {
        client: "SaaS Project Mgmt",
        niche: "B2B SaaS",
        budget: "$12k/mo",
        geo: "US/UK",
        goal: "Demo bookings",
      },
      metrics: [
        { metric: "Demo CPA", before: "$210", after: "$48", delta: "-77%" },
        { metric: "Demos / mo", before: "18", after: "73", delta: "+305%" },
        { metric: "SQL %", before: "12%", after: "34%", delta: "+183%" },
        { metric: "Brand CPC", before: "$3.2", after: "$0.88", delta: "-72%" },
      ],
      wrong: [
        "Single Search campaign mixing brand + non-brand + competitor, no isolation",
        "No offline import, optimizing on form not SQL",
        "No competitor defense, competitor stealing brand 22% impr share",
        "Landing no social proof, no calendar",
        "Broad match without negatives, job seeker waste 28%",
      ],
      did: [
        "Isolate: Brand Search (tIS 95%), Non-brand Search STAG, Competitor Conquest",
        "Offline import: HubSpot → Google Ads GCLID for SQL + Closed Won value",
        "Build vs pages: 'Alternative to [Competitor]' + comparison table",
        "Landing: G2 badges, calendar embed, demo video, ROI calculator",
        "Negative list 400: job, internship, free, resume",
        "RLSA: site visitors + LinkedIn matched + customer list",
        "YouTube: competitor placement + custom intent",
      ],
      timeline: [
        "Week 1: Structure + vs pages",
        "Week 2: Offline import + HubSpot sync",
        "Week 3: Conquest launch",
        "Week 4-6: tCPA $48 stable, SQL up",
      ],
      testimonial: {
        name: "Samir P.",
        role: "Head of Growth",
        text: "From $210 to $48 demo. And SQL quality 3x. Offline import was game changer. Finally bidding on revenue, not leads.",
      },
    },
    {
      id: "dental-clinic",
      emoji: "\uD83E\uDDB7",
      tag: "Local Dental • $800/mo • Dubai",
      title: "Local Dental Clinic: 8 → 41 booked calls",
      headline: "LSA + Local Pack domination in competitive Dubai.",
      overview: {
        client: "Dental Clinic Dubai",
        niche: "Implants & Veneers",
        budget: "$800/mo",
        geo: "Dubai Marina 7km",
        goal: "Booked appointments",
      },
      metrics: [
        { metric: "Booked Calls", before: "8", after: "41", delta: "+412%" },
        { metric: "CPL", before: "$62", after: "$18.5", delta: "-70%" },
        { metric: "No-Show", before: "42%", after: "18%", delta: "-57%" },
        { metric: "LSA Leads", before: "0", after: "23", delta: "New" },
      ],
      wrong: [
        "Only Search generic 'dentist', no LSA, no Local campaign",
        "No call tracking, reception missed 40% calls",
        "GBP 3.8 rating, 2 photos, no services",
        "Landing slow, no price range, no before/after",
        "No schedule bidding, ads 24/7 wasting nights",
      ],
      did: [
        "LSA setup: implants, veneers categories, background check, budget $30/day",
        "Local campaign: radius 7km + location assets + call + price assets",
        "GBP: 4.8 target, 20 new photos, services, Q&A, posts 2x week",
        "Call tracking: DNI + call recording + reception script + SMS reminder",
        "Landing: price ranges, before/after, Google reviews embed, WhatsApp CTA",
        "Schedule: 9am-9pm +30% 5-9pm, -100% 11pm-7am",
        "Offline: booked → import as conversion with value $180",
      ],
      timeline: [
        "Day 1-2: GBP + LSA docs",
        "Day 3-4: Campaigns + tracking",
        "Day 7: LSA live",
        "Day 14: 41 calls booked",
        "Month 2: 4.8 rating, no-show 18%",
      ],
      testimonial: {
        name: "Dr. Lina",
        role: "Clinic Owner",
        text: "Dubai is brutal competition. Arman got us LSA top 3 + Maps. 41 bookings vs 8 before. And SMS reminders cut no-shows.",
      },
    },
    {
      id: "mobile-app-ios",
      emoji: "\uD83D\uDCF2",
      tag: "Mobile App iOS • $6.8k/mo",
      title: "iOS Finance App: CPI $8.5 → $2.1",
      headline: "3.2k installs/mo with tROAS + SKAN fix.",
      overview: {
        client: "Finance Tracker iOS",
        niche: "Personal Finance",
        budget: "$6.8k/mo",
        geo: "US/UK/CA",
        goal: "Paid subs",
      },
      metrics: [
        { metric: "CPI", before: "$8.5", after: "$2.1", delta: "-75%" },
        {
          metric: "Installs / mo",
          before: "420",
          after: "3.2k",
          delta: "+661%",
        },
        { metric: "Trial Start %", before: "6%", after: "21%", delta: "+250%" },
        { metric: "Sub ROAS", before: "0.7x", after: "2.6x", delta: "+271%" },
      ],
      wrong: [
        "No Firebase events, optimizing on install only not trial",
        "iOS ATT no SKAN, 60% data loss",
        "Single UAC campaign, no tROAS, no engagement",
        "Video assets 1 horizontal only, no 9:16",
        "Placement fraud: 34% fake installs from display partners",
      ],
      did: [
        "Firebase + SKAN + GA4 linked: first_open, trial_start, subscription, conversion value",
        "UAC split: Install tCPA, Action tCPA (trial), Action tROAS (sub value)",
        "Asset pack: 10 UGC vertical 9:16, 5 gameplay 16:9, 20 texts with social proof",
        "Fraud guard: exclude Search partners, app category exclusion, IP blacklist, MMP Adjust",
        "Custom store listing: A/B test screenshots + video for 'budget' keywords",
        "YouTube + Search custom intent: 'best budget app' keywords",
      ],
      timeline: [
        "Week 1: Firebase + SKAN + assets",
        "Week 2: UAC tCPA launch",
        "Week 3: tROAS for subs",
        "Week 4: 3.2k installs, $2.1 CPI, 2.6x ROAS",
      ],
      testimonial: {
        name: "Mikhail R.",
        role: "Product Lead",
        text: "iOS was disaster: $8.5 CPI, no subs. Now $2.1 and ROAS 2.6x. SKAN + tROAS setup was key. Fraud down 60%.",
      },
    },
  ],
  ys = [
    {
      key: "ecom",
      emoji: "\uD83D\uDED2",
      label: "ECOMMERCE",
      items: ["shopping-pmax", "merchant-center", "feed-management", "pmax"],
    },
    {
      key: "lead",
      emoji: "\uD83C\uDFAF",
      label: "LEAD GEN",
      items: ["search-ads", "local", "call-only", "competitor"],
    },
    {
      key: "scale",
      emoji: "\uD83D\uDCC8",
      label: "SCALE",
      items: ["youtube", "display", "demand-gen"],
    },
    {
      key: "foundation",
      emoji: "\uD83D\uDEE0️",
      label: "FOUNDATION",
      items: ["app-campaigns", "tracking", "audit", "cro"],
    },
  ];
function Ni() {
  let [e, t] = le.useState(readRoute().page),
    [n, r] = le.useState(readRoute().service),
    [l, u] = le.useState(readRoute().caseId),
    [o, a] = le.useState(!1),
    [f, d] = le.useState(!1),
    [y, g] = le.useState(!1),
    [v, k] = le.useState(!1),
    [E, C] = le.useState(!1),
    [V, p] = le.useState(!1),
    [s, m] = le.useState(0);
  le.useEffect(() => {
    const closeMenus = (event) => {
      if (event.key === "Escape") {
        d(false);
        g(false);
        k(false);
      }
    };
    window.addEventListener("keydown", closeMenus);
    return () => window.removeEventListener("keydown", closeMenus);
  }, []);
  le.useEffect(() => {
    const sync = () => {
      const route = readRoute();
      t(route.page);
      r(route.service);
      u(route.caseId);
      d(false);
      g(false);
      k(false);
    };
    window.addEventListener("hashchange", sync);
    window.addEventListener("popstate", sync);
    return () => {
      window.removeEventListener("hashchange", sync);
      window.removeEventListener("popstate", sync);
    };
  }, []);
  (le.useEffect(() => {
    let h = () => a(window.scrollY > 12);
    return (
      window.addEventListener("scroll", h),
      () => window.removeEventListener("scroll", h)
    );
  }, []),
    le.useEffect(() => {
      (requestAnimationFrame(() => {
        const anchor = window.location.hash.slice(1);
        const target =
          anchor && !anchor.startsWith("/")
            ? document.getElementById(anchor)
            : null;
        if (target) target.scrollIntoView();
        else window.scrollTo({ top: 0, behavior: "instant" });
      }),
        m(0));
    }, [e, n, l]));
  let w = (h) => tu.find((F) => F.id === h) || tu[0],
    P = (h) => visibleCase(h),
    N = (h) => {
      window.location.hash = "/services/" + h;
      r(h);
      t("service");
      d(false);
      k(false);
    },
    z = (h) => {
      window.location.hash = "/cases/" + h;
      u(h);
      t("case");
      g(false);
      k(false);
    },
    T = () => {
      if (isClientsPage()) {
        window.location.href = pageLink("index.html");
        return;
      }
      window.location.hash = "top";
      t("home");
      d(false);
      g(false);
      k(false);
    },
    O = (h) => {
      if (isClientsPage()) {
        window.location.href = pageLink("index.html") + "#" + h;
        return;
      }
      window.location.hash = h;
      if (e !== "home")
        (t("home"),
          setTimeout(
            () =>
              document
                .getElementById(h)
                ?.scrollIntoView({ behavior: "smooth" }),
            100,
          ));
      else document.getElementById(h)?.scrollIntoView({ behavior: "smooth" });
      k(!1);
    };
  return c("div", {
    className:
      "min-h-screen bg-white text-zinc-900 antialiased selection:bg-zinc-900 selection:text-white" +
      (e === "home" ? " home-page" : ""),
    children: [
      i("style", {
        children: `
        
        * { font-family: 'Inter', system-ui, -apple-system, sans-serif; }
        .serif { font-family: 'Times New Roman', Georgia, serif; }
        html { scroll-behavior: smooth; }
      `,
      }),
      i(HomeMotion, { active: e === "home" }),
      i(SiteHeader, {}),
      e === "home" &&
        c(Pi, {
          children: [
            c("section", {
              className: "relative overflow-hidden home-hero",
              children: [
                c("div", {
                  className: "pointer-events-none absolute inset-0",
                  children: [
                    i("div", {
                      className:
                        "absolute inset-0 bg-[linear-gradient(to_right,#f1f1f1_1px,transparent_1px),linear-gradient(to_bottom,#f1f1f1_1px,transparent_1px)] bg-[size:48px_48px]",
                    }),
                    i("div", {
                      className:
                        "absolute inset-0 bg-gradient-to-b from-white via-white/80 to-white",
                    }),
                  ],
                }),
                i("div", {
                  className:
                    "relative mx-auto max-w-[1280px] px-6 pt-12 pb-12 md:pt-24 md:pb-20",
                  children: c("div", {
                    className:
                      "grid md:grid-cols-[1.15fr_0.85fr] gap-10 items-start",
                    children: [
                      c("div", {
                        children: [
                          c("div", {
                            className:
                              "inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3 py-1 text-[11px] font-medium tracking-wide shadow-sm",
                            children: [
                              i("span", {
                                className:
                                  "h-2 w-2 rounded-full bg-emerald-500 animate-pulse",
                              }),
                              catalogSummary(),
                            ],
                          }),
                          c("h1", {
                            className:
                              "mt-6 text-[40px] md:text-[64px] leading-[0.9] tracking-[-0.04em] font-[800]",
                            children: [
                              "Google Ads That",
                              i("br", {}),
                              i("span", {
                                className:
                                  "serif font-normal italic tracking-[-0.02em]",
                                children: "Actually Profits.",
                              }),
                              i("br", {}),
                              "Not Just Clicks.",
                            ],
                          }),
                          c("p", {
                            className:
                              "mt-6 max-w-[560px] text-[16px] md:text-[17px] leading-[1.5] text-zinc-600",
                            children: [
                              "Advertising, search and websites — ",
                              i("span", {
                                className: "font-semibold text-zinc-900",
                                children: "a complete digital setup",
                              }),
                              ". Google Ads, SEO, GA4 / GTM and development. From the first audit to launch and improvement.",
                            ],
                          }),
                          c("div", {
                            className: "mt-8 flex flex-wrap gap-3",
                            children: [
                              c("button", {
                                onClick: () => O("services"),
                                className:
                                  "h-[48px] px-6 rounded-full bg-zinc-900 text-white text-[15px] font-medium inline-flex items-center gap-2 hover:bg-black transition",
                                children: [
                                  i(Be, { className: "w-4 h-4" }),
                                  "Explore services",
                                ],
                              }),
                              c("button", {
                                onClick: () =>
                                  O(
                                    publishedCases().length
                                      ? "cases"
                                      : "clients",
                                  ),
                                className:
                                  "h-[48px] px-6 rounded-full border border-zinc-200 bg-white text-[15px] font-medium inline-flex items-center gap-2 hover:bg-zinc-50 transition",
                                children: [
                                  i(Nr, { className: "w-4 h-4" }),
                                  publishedCases().length
                                    ? "Browse cases"
                                    : "Clients",
                                ],
                              }),
                            ],
                          }),
                          c("div", {
                            className: "mt-8 flex flex-wrap items-center gap-2",
                            children: [
                              [
                                { icon: Ct, label: "Google Ads + SEO" },
                                { icon: nt, label: "GA4 / GTM" },
                                { icon: Cn, label: "Web development" },
                              ].map((h) =>
                                c(
                                  "div",
                                  {
                                    className:
                                      "inline-flex items-center gap-2 rounded-full bg-zinc-900 text-white px-3.5 py-2 text-[12px] font-medium",
                                    children: [
                                      i(h.icon, { className: "w-4 h-4" }),
                                      h.label,
                                    ],
                                  },
                                  h.label,
                                ),
                              ),
                              i("div", {
                                className: "text-[12px] text-zinc-500",
                                children:
                                  "Click any service to open detailed page with tables",
                              }),
                            ],
                          }),
                          i("div", {
                            className:
                              "mt-8 grid grid-cols-3 max-w-[440px] border border-zinc-200 rounded-2xl overflow-hidden bg-white text-[12px]",
                            children: [
                              { k: "Search + PMax", v: "Shopping fix" },
                              { k: "App + Web", v: "GA4 / sGTM" },
                              { k: "SEO + Web", v: "WordPress / React" },
                            ].map((h) =>
                              c(
                                "div",
                                {
                                  className:
                                    "px-4 py-3 border-r last:border-r-0 border-zinc-100",
                                  children: [
                                    i("div", {
                                      className:
                                        "text-[10px] uppercase tracking-widest text-zinc-400 font-semibold",
                                      children: h.k,
                                    }),
                                    i("div", {
                                      className: "mt-1 text-[12px] font-medium",
                                      children: h.v,
                                    }),
                                  ],
                                },
                                h.k,
                              ),
                            ),
                          }),
                        ],
                      }),
                      window.PORTFOLIO.showDemoCases
                        ? c("div", {
                            className:
                              "relative md:sticky md:top-[92px] hero-visual",
                            children: [
                              c("div", {
                                className:
                                  "rounded-[28px] border border-zinc-200 bg-white shadow-[0_20px_80px_-20px_rgba(0,0,0,0.25)] overflow-hidden",
                                children: [
                                  c("div", {
                                    className: "p-7",
                                    children: [
                                      c("div", {
                                        className:
                                          "flex items-center justify-between",
                                        children: [
                                          i("div", {
                                            className:
                                              "text-[11px] tracking-widest uppercase font-semibold text-zinc-400",
                                            children:
                                              "Example dashboard · Demo data",
                                          }),
                                          c("div", {
                                            className:
                                              "h-6 px-2.5 rounded-full bg-emerald-50 border border-emerald-200 text-[11px] font-medium text-emerald-700 inline-flex items-center gap-1",
                                            children: [
                                              i("span", {
                                                className:
                                                  "h-1.5 w-1.5 rounded-full bg-emerald-500",
                                              }),
                                              " Demo",
                                            ],
                                          }),
                                        ],
                                      }),
                                      c("div", {
                                        className:
                                          "mt-6 grid grid-cols-2 gap-4",
                                        children: [
                                          c("div", {
                                            className:
                                              "rounded-2xl bg-zinc-900 text-white p-4",
                                            children: [
                                              i("div", {
                                                className:
                                                  "text-[11px] uppercase tracking-widest text-zinc-400",
                                                children: "ROAS",
                                              }),
                                              i("div", {
                                                className:
                                                  "mt-2 text-[28px] font-bold tracking-tight",
                                                children: "4.2x",
                                              }),
                                              i("div", {
                                                className:
                                                  "mt-1 text-[12px] text-zinc-300",
                                                children: "was 1.8x → +133%",
                                              }),
                                            ],
                                          }),
                                          c("div", {
                                            className:
                                              "rounded-2xl bg-zinc-50 border border-zinc-200 p-4",
                                            children: [
                                              i("div", {
                                                className:
                                                  "text-[11px] uppercase tracking-widest text-zinc-400",
                                                children: "CPA",
                                              }),
                                              i("div", {
                                                className:
                                                  "mt-2 text-[28px] font-bold tracking-tight",
                                                children: "$11.3",
                                              }),
                                              i("div", {
                                                className:
                                                  "mt-1 text-[12px] text-emerald-600",
                                                children: "was $42 → -73%",
                                              }),
                                            ],
                                          }),
                                        ],
                                      }),
                                      c("div", {
                                        className:
                                          "mt-4 rounded-2xl border border-zinc-200 p-4",
                                        children: [
                                          c("div", {
                                            className:
                                              "flex items-center justify-between",
                                            children: [
                                              i("div", {
                                                className:
                                                  "text-[13px] font-medium",
                                                children: "Ecom US — Shopify",
                                              }),
                                              i("div", {
                                                className:
                                                  "text-[11px] text-zinc-500",
                                                children: "Search + PMax",
                                              }),
                                            ],
                                          }),
                                          i("div", {
                                            className:
                                              "mt-3 h-[56px] flex items-end gap-[3px]",
                                            children: [
                                              12, 18, 10, 22, 16, 28, 20, 34,
                                              26, 40, 32, 48,
                                            ].map((h, F) =>
                                              i(
                                                "div",
                                                {
                                                  className:
                                                    "flex-1 rounded-full bg-zinc-900",
                                                  style: {
                                                    height: `${h}px`,
                                                    opacity: 0.15 + F * 0.07,
                                                  },
                                                },
                                                F,
                                              ),
                                            ),
                                          }),
                                          c("div", {
                                            className:
                                              "mt-3 flex gap-2 text-[11px]",
                                            children: [
                                              i("span", {
                                                className:
                                                  "px-2 py-1 rounded-full bg-zinc-900 text-white",
                                                children:
                                                  "Merchant Center fixed",
                                              }),
                                              i("span", {
                                                className:
                                                  "px-2 py-1 rounded-full border",
                                                children:
                                                  "Feed + PMax structure",
                                              }),
                                            ],
                                          }),
                                        ],
                                      }),
                                      c("div", {
                                        className:
                                          "mt-4 grid grid-cols-2 gap-3 text-[12px]",
                                        children: [
                                          c("div", {
                                            className:
                                              "flex items-center gap-2",
                                            children: [
                                              i(Me, { className: "w-4 h-4" }),
                                              " Enhanced Conversions",
                                            ],
                                          }),
                                          c("div", {
                                            className:
                                              "flex items-center gap-2",
                                            children: [
                                              i(Me, { className: "w-4 h-4" }),
                                              " GA4 + GTM in 1 day",
                                            ],
                                          }),
                                        ],
                                      }),
                                    ],
                                  }),
                                  c("div", {
                                    className:
                                      "h-[56px] bg-zinc-50 border-t border-zinc-200 flex items-center justify-between px-7",
                                    children: [
                                      i("div", {
                                        className: "text-[12px] text-zinc-500",
                                        children:
                                          "Kazakhstan · GMT+5 · Working remotely",
                                      }),
                                      i("div", {
                                        className:
                                          "h-6 w-6 rounded-full bg-white border grid place-items-center",
                                        children: i(me, {
                                          className: "w-3.5 h-3.5",
                                        }),
                                      }),
                                    ],
                                  }),
                                ],
                              }),
                              c("div", {
                                className:
                                  "mt-4 rounded-2xl border border-dashed border-zinc-300 bg-zinc-50/60 p-4 flex items-center gap-3",
                                children: [
                                  i("div", {
                                    className:
                                      "h-9 w-9 rounded-full bg-white border grid place-items-center",
                                    children: i(_n, { className: "w-4 h-4" }),
                                  }),
                                  c("div", {
                                    className: "text-[13px]",
                                    children: [
                                      i("span", {
                                        className: "font-semibold",
                                        children: "Demonstration case",
                                      }),
                                      " — Click any case for full breakdown.",
                                    ],
                                  }),
                                ],
                              }),
                            ],
                          })
                        : i(HomeOverview, {}),
                    ],
                  }),
                }),
              ],
            }),
            i("section", {
              className: "bg-zinc-900 text-white border-y border-zinc-800",
              children: i("div", {
                className:
                  "mx-auto max-w-[1280px] px-6 py-6 md:py-7 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 divide-zinc-800 md:divide-x",
                children: [
                  {
                    k: portfolioCount(tu.length),
                    v: "Services with pages",
                    sub: "Tables + FAQ + KPIs",
                  },
                  {
                    k: portfolioCount(window.CLIENTS.length),
                    v: "Clients",
                    sub: "Projects & partnerships",
                  },
                  {
                    k: publishedCases().length
                      ? portfolioCount(publishedCases().length)
                      : "SEO + Ads",
                    v: publishedCases().length ? "Case studies" : "Attract",
                    sub: publishedCases().length
                      ? "Projects and outcomes"
                      : "Search and advertising",
                  },
                  { k: "RU / EN", v: "Two languages", sub: "Working remotely" },
                ].map((h) =>
                  c(
                    "div",
                    {
                      className: "md:px-8",
                      children: [
                        i("div", {
                          className:
                            "text-[28px] md:text-[32px] font-bold tracking-tight",
                          children: h.k,
                        }),
                        i("div", {
                          className:
                            "text-[13px] font-medium text-zinc-100 mt-1",
                          children: h.v,
                        }),
                        i("div", {
                          className: "text-[11px] text-zinc-400 mt-1",
                          children: h.sub,
                        }),
                      ],
                    },
                    h.v,
                  ),
                ),
              }),
            }),
            i(ServicesSection, {}),
            i(ClientsSection, {}),
            i(CasesSection, {}),
            i("section", {
              id: "process",
              className: "mx-auto max-w-[1280px] px-6 py-16 md:py-24",
              children: c("div", {
                className: "grid md:grid-cols-[0.9fr_1.1fr] gap-10",
                children: [
                  c("div", {
                    children: [
                      i("div", {
                        className:
                          "text-[11px] tracking-widest uppercase font-semibold text-zinc-400",
                        children: "Process — No calls needed",
                      }),
                      c("h2", {
                        className:
                          "mt-3 text-[34px] md:text-[44px] leading-[0.95] tracking-[-0.03em] font-bold",
                        children: [
                          "3 steps to ",
                          i("span", {
                            className: "serif italic font-normal",
                            children: "profit.",
                          }),
                        ],
                      }),
                      c("div", {
                        className:
                          "mt-6 inline-flex items-center gap-2 rounded-full border border-zinc-200 px-3 py-1.5 text-[12px]",
                        children: [
                          i(Fr, { className: "w-4 h-4" }),
                          " Average setup 3 days, not 3 weeks.",
                        ],
                      }),
                    ],
                  }),
                  c("div", {
                    className: "relative",
                    children: [
                      i("div", {
                        className:
                          "absolute left-[20px] top-6 bottom-6 w-px bg-zinc-200 hidden md:block",
                      }),
                      i("div", {
                        className: "space-y-5",
                        children: [
                          {
                            n: "01",
                            t: "Account review and priorities",
                            d: "You share read-only access. I record Loom same day: what’s burning budget, what to fix first, expected ROAS.",
                            meta: "No meeting • Same day",
                            icon: Tr,
                          },
                          {
                            n: "02",
                            t: "Setup in 3 days (GTM/GA4/Enhanced Conversions)",
                            d: "GTM, GA4, Enhanced Conversions, offline import, GMC feed fix, campaign rebuild. You get Sheet + Loom walkthrough.",
                            meta: "Docs + Video • No lock-in",
                            icon: nt,
                          },
                          {
                            n: "03",
                            t: "Optimize to profit",
                            d: "Daily checks first 7 days, then 3x/week. Kill losers, scale winners, weekly Loom. No monthly report fluff.",
                            meta: "Slack / Telegram • Weekly ROAS",
                            icon: He,
                          },
                        ].map((h) =>
                          c(
                            "div",
                            {
                              className:
                                "relative rounded-[20px] border border-zinc-200 bg-white p-6 md:pl-[56px] hover:shadow-[0_12px_30px_-18px_rgba(0,0,0,0.2)] transition",
                              children: [
                                i("div", {
                                  className:
                                    "hidden md:grid absolute left-0 top-6 h-10 w-10 place-items-center rounded-full bg-zinc-900 text-white text-[12px] font-bold",
                                  children: h.n,
                                }),
                                i("div", {
                                  className:
                                    "md:hidden text-[11px] font-bold tracking-widest",
                                  children: h.n,
                                }),
                                c("div", {
                                  className:
                                    "mt-2 md:mt-0 flex items-start justify-between gap-4",
                                  children: [
                                    c("div", {
                                      children: [
                                        c("div", {
                                          className:
                                            "text-[17px] font-semibold tracking-tight flex items-center gap-2",
                                          children: [
                                            i(h.icon, { className: "w-4 h-4" }),
                                            " ",
                                            h.t,
                                          ],
                                        }),
                                        i("div", {
                                          className:
                                            "mt-2 text-[14px] leading-[1.5] text-zinc-600 max-w-[560px]",
                                          children: h.d,
                                        }),
                                      ],
                                    }),
                                    i("div", {
                                      className:
                                        "shrink-0 px-2.5 py-1 rounded-full bg-zinc-50 border border-zinc-200 text-[11px] font-medium",
                                      children: h.meta,
                                    }),
                                  ],
                                }),
                              ],
                            },
                            h.n,
                          ),
                        ),
                      }),
                    ],
                  }),
                ],
              }),
            }),
            i(PricingSection, {}),
            null,
            null,
          ],
        }),
      e === "clients" && i(ClientsPage, {}),
      e === "pricing" && i(PricingPage, {}),
      e === "services-index" && i(ArchivePage, { kind: "services" }),
      e === "cases-index" && i(ArchivePage, { kind: "cases" }),
      e === "service" && i(ServiceDetail, { service: w(n) }),
      e === "case" && i(CaseDetail, { record: P(l) }),
      i(SiteFooter, {}),
      i(FloatingContacts, {}),
    ],
  });
}
