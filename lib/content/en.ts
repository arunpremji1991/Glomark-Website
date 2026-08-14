import type { Dictionary } from "../i18n";

const en: Dictionary = {
  locale: "en",
  dir: "ltr",
  nav: {
    home: "Home",
    services: "Services",
    work: "Work",
    blog: "Blog",
    about: "About",
    contact: "Contact",
    startProject: "Start a project",
    menu: "Menu",
    close: "Close",
    switchTo: "Switch to Arabic",
    switchLabel: "عربي",
  },
  common: {
    getInTouch: "Get in touch",
    viewAllServices: "View all services",
    exploreService: "Explore service",
    backToServices: "All services",
    backToBlog: "All articles",
    readArticle: "Read article",
    call: "Call",
    email: "Email",
    location: "Location",
    scroll: "Scroll",
    whatsapp: "Chat with us on WhatsApp",
  },
  home: {
    metaTitle: "Glomark — Marketing, Media & Branding Agency in Oman",
    metaDescription:
      "Glomark is a marketing and media production agency in Oman. We turn ideas into impact through media production, branding, digital marketing, events and more.",
    heroEyebrow: "Marketing · Media · Branding — Oman",
    heroTitleLead: "We turn ideas into",
    heroTitleAccent: "impact",
    heroSub:
      "Glomark is a marketing and media production studio. We build brand stories that move — from the first spark of an idea to the screen it lights up.",
    heroCtaPrimary: "Build your brand story",
    heroCtaSecondary: "See what we do",
    servicesEyebrow: "What we do",
    servicesTitle: "One studio, the whole brand journey",
    servicesSub:
      "Strategy, story and screen — handled by one team so nothing gets lost between the idea and the audience.",
    statementEyebrow: "Our belief",
    statement: "A brand is not a logo. It is the impact it leaves behind.",
    statementBody:
      "We pair sharp marketing thinking with cinematic craft, so every touchpoint — a broadcast, a campaign, a storefront, an app — feels unmistakably yours and unmistakably premium.",
    workEyebrow: "Selected work",
    workTitle: "Stories we helped tell",
    workSub:
      "A look at the kind of work we produce for brands across Oman and the Gulf.",
    blogEyebrow: "From the studio",
    blogTitle: "Ideas worth stealing",
    blogSub: "Notes on media, marketing and brand-building from the Glomark team.",
    ctaTitle: "Let's build your brand story together.",
    ctaBody:
      "Tell us where you want to go. We'll bring the strategy, the crew and the craft to get you there.",
  },
  servicesPage: {
    metaTitle: "Services — Media, Marketing & Branding | Glomark",
    metaDescription:
      "Explore Glomark's eight services: media production, events, live broadcasting, digital marketing, branding, web and app development, and social media management.",
    eyebrow: "Capabilities",
    title: "Everything your brand needs to be seen",
    intro:
      "Eight disciplines, one team. Whether you need a single film or a full-year campaign, we plug in where you need us — and we speak both English and Arabic natively.",
  },
  services: [
    {
      slug: "media-production",
      title: "Media Production",
      tagline: "Film, photography and motion that stop the scroll.",
      summary:
        "End-to-end video and photo production — concept, crew, shoot and post — built for brands that want to look cinematic.",
      description: [
        "From brand films and TV commercials to product photography and social cut-downs, our production team handles the whole pipeline: concept, script, storyboard, casting, location, crew, and a full post-production suite for edit, colour, sound and motion graphics.",
        "We travel across Oman and the Gulf for every shoot. Every frame is planned around where it will live — a 60-second hero film and its 9:16 social versions come out of the same shoot day, so your budget works harder.",
      ],
      deliverables: [
        "Brand films & TV commercials",
        "Product & lifestyle photography",
        "Aerial / drone cinematography",
        "Editing, colour grading & sound design",
        "Motion graphics & 2D/3D animation",
        "Social-ready cut-downs (9:16, 1:1, 16:9)",
      ],
      keyword: "video production company Oman",
      metaTitle: "Media Production in Oman | Glomark",
      metaDescription:
        "Cinematic video and photography production in Oman — brand films, commercials, drone, editing and motion graphics. End-to-end media production by Glomark.",
    },
    {
      slug: "events-planning",
      title: "Events Planning",
      tagline: "Launches, conferences and experiences, produced end to end.",
      summary:
        "Concept, logistics, staging and content capture for events that feel like a moment — not just a meeting.",
      description: [
        "We plan and produce corporate launches, conferences, exhibitions and cultural events — handling concept, venue, staging, AV, branding, run-of-show and on-site management so the day runs without a seam.",
        "Because we are a media house first, every event is designed to be captured. Photography, video, live coverage and same-day recap reels are built into the plan, so your event keeps working long after the lights come down.",
      ],
      deliverables: [
        "Event concept & creative direction",
        "Venue, staging & AV production",
        "On-site branding & signage",
        "Run-of-show & vendor management",
        "Photo, video & live coverage",
        "Same-day recap & highlight reels",
      ],
      keyword: "event management company Oman",
      metaTitle: "Events Planning & Production in Oman | Glomark",
      metaDescription:
        "Full-service event planning and production in Oman — launches, conferences and exhibitions with staging, branding and built-in media coverage by Glomark.",
    },
    {
      slug: "live-broadcasting",
      title: "Live Broadcasting",
      tagline: "Multi-camera live streams that look broadcast-grade.",
      summary:
        "Reliable multi-camera live production and streaming for events, launches and broadcasts — to any screen, any platform.",
      description: [
        "We deliver professional live broadcasts: multi-camera switching, live graphics, replay, lower-thirds and simultaneous streaming to YouTube, social platforms and private channels — with bilingual captioning where you need it.",
        "Our crews handle everything from a single-camera webinar to a stadium-scale production, with redundant encoders and connectivity so the stream stays up when it matters most.",
      ],
      deliverables: [
        "Multi-camera live switching",
        "Live streaming to any platform",
        "On-screen graphics & lower-thirds",
        "Instant replay & highlights",
        "Bilingual live captioning",
        "Redundant encoding & connectivity",
      ],
      keyword: "live streaming production Oman",
      metaTitle: "Live Broadcasting & Streaming in Oman | Glomark",
      metaDescription:
        "Broadcast-grade multi-camera live streaming in Oman — events, launches and conferences streamed to any platform with live graphics and bilingual captions by Glomark.",
    },
    {
      slug: "digital-marketing",
      title: "Digital Marketing",
      tagline: "Campaigns engineered to reach the right people and convert.",
      summary:
        "Paid media, SEO and performance campaigns that turn attention into measurable results.",
      description: [
        "We plan and run performance campaigns across Meta, Google, TikTok and YouTube — from audience strategy and creative to daily optimisation and transparent reporting. Every dirham is tracked against the outcome that matters to you.",
        "Paired with SEO, content and marketing automation, our digital work compounds: a campaign that performs today while building the search visibility and audience that pay off for months.",
      ],
      deliverables: [
        "Paid social & search campaigns",
        "SEO & content strategy",
        "Landing pages & conversion tracking",
        "Email & marketing automation",
        "Analytics dashboards & reporting",
        "A/B testing & optimisation",
      ],
      keyword: "digital marketing agency Oman",
      metaTitle: "Digital Marketing Agency in Oman | Glomark",
      metaDescription:
        "Performance digital marketing in Oman — paid social, Google Ads, SEO and analytics that turn attention into measurable results. Data-led campaigns by Glomark.",
    },
    {
      slug: "branding",
      title: "Branding",
      tagline: "Identities with a point of view — built to last.",
      summary:
        "Naming, logo, visual identity and brand guidelines that make you recognisable and hard to copy.",
      description: [
        "We build brands from the strategy up: positioning, naming, tone of voice, logo, colour, typography and a complete visual system — documented in guidelines your whole team can use.",
        "Bilingual by design, every identity we create is crafted to work beautifully in both Arabic and English, so your brand feels native to audiences across Oman and the wider region.",
      ],
      deliverables: [
        "Brand strategy & positioning",
        "Naming & tone of voice",
        "Logo & visual identity system",
        "Bilingual (AR/EN) typography",
        "Brand guidelines & asset kits",
        "Collateral & packaging design",
      ],
      keyword: "branding agency Oman",
      metaTitle: "Branding & Identity Design in Oman | Glomark",
      metaDescription:
        "Strategic branding in Oman — positioning, naming, logo and bilingual Arabic/English identity systems that make brands recognisable and premium. Brand design by Glomark.",
    },
    {
      slug: "website-development",
      title: "Website Development",
      tagline: "Fast, bilingual websites that rank and convert.",
      summary:
        "Design and build of high-performance, SEO-ready websites in Arabic and English.",
      description: [
        "We design and develop websites that are fast, accessible and built to be found — with clean semantic markup, structured data and Core Web Vitals in mind from the first line of code.",
        "Every site ships fully bilingual with proper right-to-left Arabic layouts, a content structure your team can manage, and the analytics and tracking your marketing needs to prove results.",
      ],
      deliverables: [
        "UX & UI design",
        "Bilingual (AR/EN, RTL) builds",
        "SEO-ready, semantic markup",
        "Core Web Vitals performance",
        "CMS & content structure",
        "Analytics & tracking setup",
      ],
      keyword: "website development company Oman",
      metaTitle: "Website Development in Oman | Glomark",
      metaDescription:
        "Fast, bilingual, SEO-ready website design and development in Oman. Accessible Arabic/English sites built for Core Web Vitals and conversion by Glomark.",
    },
    {
      slug: "social-media-management",
      title: "Social Media Management",
      tagline: "Always-on channels that build an audience, not just posts.",
      summary:
        "Strategy, content, community and reporting to keep your brand consistently present and growing.",
      description: [
        "We run your social channels end to end: monthly content strategy, bilingual copy, design and video, scheduling, community management and reporting — all in your brand voice.",
        "Backed by our production studio, your feed gets a steady supply of scroll-stopping photo and video, not stock and filler. We plan campaigns and always-on content together so growth is deliberate, not accidental.",
      ],
      deliverables: [
        "Monthly content strategy & calendar",
        "Bilingual copywriting",
        "In-house photo & video content",
        "Publishing & scheduling",
        "Community management",
        "Monthly performance reporting",
      ],
      keyword: "social media management Oman",
      metaTitle: "Social Media Management in Oman | Glomark",
      metaDescription:
        "Bilingual social media management in Oman — strategy, content, community and reporting that grow your audience. Scroll-stopping content from Glomark's studio.",
    },
    {
      slug: "application-development",
      title: "Application Development",
      tagline: "Mobile and web apps that feel effortless to use.",
      summary:
        "Product design and development of iOS, Android and web apps — from prototype to launch.",
      description: [
        "We design and build mobile and web applications — from discovery and UX to development, testing and launch — with clean, maintainable code and interfaces that feel effortless in both Arabic and English.",
        "Whether it's a customer app, an internal tool or a bilingual platform, we ship reliable products and stay on for the iterations, analytics and support that keep them growing.",
      ],
      deliverables: [
        "Product discovery & UX",
        "iOS & Android apps",
        "Progressive web apps",
        "Bilingual (AR/EN, RTL) interfaces",
        "QA, testing & app-store launch",
        "Analytics, support & iteration",
      ],
      keyword: "mobile app development Oman",
      metaTitle: "App Development in Oman | Glomark",
      metaDescription:
        "Mobile and web app development in Oman — iOS, Android and progressive web apps with bilingual Arabic/English interfaces, built from prototype to launch by Glomark.",
    },
  ],
  work: {
    metaTitle: "Work & Case Studies | Glomark",
    metaDescription:
      "A selection of marketing, media and branding work by Glomark — brand films, campaigns, events and identities produced for brands across Oman.",
    eyebrow: "Selected work",
    title: "Work that turned ideas into impact",
    intro:
      "A look at the range of work we produce across media, marketing and branding. Full client case studies are on the way.",
    placeholderNote:
      "These are representative examples of our capabilities. Detailed client case studies are being added as we roll out the new site.",
    items: [
      {
        client: "Dhofar Tourism",
        title: "Khareef season brand film",
        category: "Media Production",
        result: "Cinematic hero film + 12 social cut-downs",
      },
      {
        client: "Al Noor Retail Group",
        title: "Ramadan campaign",
        category: "Digital Marketing",
        result: "Multi-channel campaign across Meta & Google",
      },
      {
        client: "Port Services Co.",
        title: "Annual conference",
        category: "Events & Live Broadcasting",
        result: "500-guest event with live multi-camera stream",
      },
      {
        client: "Frankincense Co.",
        title: "Brand identity system",
        category: "Branding",
        result: "Bilingual identity, packaging & guidelines",
      },
      {
        client: "Coastal Eats",
        title: "Ordering app & website",
        category: "App & Web Development",
        result: "Bilingual app + site with online ordering",
      },
      {
        client: "Dhofar Cultural Festival",
        title: "Always-on social",
        category: "Social Media Management",
        result: "Full-season content & community management",
      },
    ],
  },
  blog: {
    metaTitle: "Blog — Media, Marketing & Branding Notes | Glomark",
    metaDescription:
      "Field notes on media production, branding, live broadcasting and social from the Glomark team.",
    eyebrow: "From the studio",
    title: "Ideas worth stealing",
    intro:
      "Notes on media, marketing and brand-building — the things we learn on set, in campaigns and in client conversations.",
    posts: [
      {
        slug: "bilingual-branding-in-oman",
        title: "Why Bilingual Branding Wins in Oman",
        excerpt:
          "A logo that only works in one language is only half a brand. Here's how to design identity systems that hold up in Arabic and English at once.",
        category: "Branding",
        date: "2026-07-22",
        readTime: "5 min read",
        body: [
          "Most brand guidelines are written for one language and translated as an afterthought. That gap shows up fast: a wordmark that looks confident in Latin type and cramped in Arabic, a tagline that loses its rhythm in translation, a colour system that was never tested against right-to-left layouts.",
          "Bilingual-first design means building both language systems from the same brief, not translating one into the other. That starts with type: pairing a Latin display face and an Arabic face that share a similar weight, contrast and personality, so neither language feels like the \"real\" brand and the other a compromise.",
          "It extends to layout — a logo lockup that mirrors correctly, a grid that holds up whether it reads left-to-right or right-to-left, imagery that doesn't rely on directional cues (an arrow, a gaze, a reading order) that break when flipped.",
          "The payoff is real: audiences read effortlessly native identities as more credible, more established and more theirs. When a single customer can see your brand in Arabic on a billboard and in English on Instagram in the same afternoon, that consistency isn't a nicety — it's the brand.",
        ],
        metaTitle: "Why Bilingual Branding Wins in Oman | Glomark",
        metaDescription:
          "How to design brand identity systems that work natively in both Arabic and English — from typography pairing to RTL-safe layout.",
      },
      {
        slug: "anatomy-of-a-live-broadcast",
        title: "Inside a Broadcast-Grade Live Stream: What Actually Goes Into It",
        excerpt:
          "Multi-camera switching, redundant encoders, live graphics — a look at what separates a broadcast-grade stream from someone's phone on a tripod.",
        category: "Live Broadcasting",
        date: "2026-06-30",
        readTime: "6 min read",
        body: [
          "A single camera pointed at a stage and a phone hotspot will technically \"go live.\" Whether it holds up for two hours, looks intentional, and survives a dropped connection is a different question — and it's the one that actually matters for a launch, a conference or a broadcast partner who's paying attention.",
          "The difference starts before the event: a multi-camera plan mapped to the run-of-show, so a switch from a wide shot to a speaker close-up to a slide happens on a beat, not a scramble. Redundant encoders and a backup connection matter more than any single camera — most stream failures are connectivity failures, not creative ones.",
          "Live graphics — lower-thirds, sponsor cues, live captions — need to be prepared and cued in advance, not improvised mid-broadcast. Simultaneous delivery to multiple platforms has to be planned for from the encoder setup, not bolted on after.",
          "Done right, none of this is visible to the audience — which is exactly the point. A broadcast-grade stream feels effortless because the effort happened days before anyone pressed \"go live.\"",
        ],
        metaTitle: "Inside a Broadcast-Grade Live Stream | Glomark",
        metaDescription:
          "What actually separates a broadcast-grade live stream from a phone on a tripod — multi-camera planning, redundant encoding and live graphics.",
      },
      {
        slug: "eight-shots-every-brand-film-needs",
        title: "8 Shots Every Brand Film Needs (And Why)",
        excerpt:
          "A shot list isn't a formality — it's what keeps a one-day shoot from turning into three days of reshoots. Here's the list we start with.",
        category: "Media Production",
        date: "2026-05-14",
        readTime: "4 min read",
        body: [
          "Every brand film is different, but the shots that make it feel finished are surprisingly consistent. Before we ever call \"action,\" we plan for eight: the establishing shot, the hero shot, the detail insert, the human reaction, the process shot, the wide scale shot, the transition, and a closing shot that mirrors the opening.",
          "The establishing shot earns its place first because it tells the audience where they are in under two seconds — a skyline, a storefront, a workspace. Skip it and every following shot has to work harder to orient the viewer.",
          "The detail insert — a hand, a texture, a mechanism — is the one crews cut for time most often, and the one that's missed most in the edit. It's what makes a film feel crafted rather than assembled from leftovers.",
          "None of this replaces a strong concept. But a concept without this coverage leaves an editor with gaps they can't shoot their way out of after the crew has gone home — which is why the list gets locked before the call sheet does.",
        ],
        metaTitle: "8 Shots Every Brand Film Needs | Glomark",
        metaDescription:
          "The shot list Glomark's production team plans before every brand film shoot, and why skipping any one of these eight shows up in the edit.",
      },
      {
        slug: "social-content-that-earns-attention",
        title: "Social Content That Earns Attention, Not Just Reach",
        excerpt:
          "Reach is easy to buy and easy to waste. Here's what actually keeps someone watching past the first second.",
        category: "Social Media Management",
        date: "2026-03-28",
        readTime: "4 min read",
        body: [
          "Reach tells you how many people saw something for a fraction of a second. It doesn't tell you whether anyone cared. Chasing reach alone produces content that's technically seen and immediately forgotten — a worse outcome than being seen by fewer people who actually stop.",
          "Attention is won or lost in the first second, often before sound even matters. That means the opening frame has to work as a still image: a face mid-reaction, an unexpected object, a question posed visually rather than in a caption no one has read yet.",
          "After that, the content has to reward the stop. A hook with nothing behind it trains an audience to keep scrolling past your account specifically — the algorithm notices, and so do people. Consistency of voice matters more than volume of posts.",
          "The accounts that grow steadily aren't the ones that go viral once. They're the ones that show up in a recognisable, deliberate voice often enough that being tagged in your comments starts to feel inevitable.",
        ],
        metaTitle: "Social Content That Earns Attention, Not Just Reach | Glomark",
        metaDescription:
          "Why reach alone is a hollow metric, and what actually keeps someone watching past the first second of a social video.",
      },
    ],
  },
  about: {
    metaTitle: "About Glomark — Marketing & Media Studio in Oman",
    metaDescription:
      "Glomark is a bilingual marketing and media production agency in Oman, turning ideas into impact across media, branding and digital.",
    eyebrow: "Who we are",
    title: "A studio built to turn ideas into impact",
    lead: "Glomark is a marketing and media production agency for ambitious brands across Oman and the Gulf — helping them look sharper, sound clearer and reach further.",
    story: [
      "We started with a simple frustration: great brands were being let down by scattered, forgettable media. Marketing lived in one place, film in another, the website somewhere else — and the story got lost in the gaps.",
      "So we built one studio that does it all. Strategy, media production, branding, broadcasting, web, apps and social — under one roof, in two languages, with one standard of craft. From the first spark of an idea to the screen it lights up, one team stays accountable for the impact.",
      "This is our home ground. We know the audience, the market and the rhythm of this region — and we bring that fluency to every brand we build.",
    ],
    valuesTitle: "What we stand for",
    values: [
      {
        title: "Impact over noise",
        body: "We measure work by what it changes — attention, perception, results — not by how loud it is.",
      },
      {
        title: "Cinematic craft",
        body: "Every frame, layout and line is held to a premium standard. Details are the difference.",
      },
      {
        title: "Bilingual by default",
        body: "Arabic and English, treated as equals — so your brand feels native to every audience.",
      },
      {
        title: "One accountable team",
        body: "Strategy to delivery under one roof. No hand-off gaps, no lost stories.",
      },
    ],
  },
  contact: {
    metaTitle: "Contact Glomark — Salalah, Oman",
    metaDescription:
      "Get in touch with Glomark in Salalah, Oman. Call +968 9101 8000, email hello@glomark.om, or send us your project brief.",
    eyebrow: "Let's talk",
    title: "Let's build your brand story together",
    intro:
      "Tell us about your brand and what you want to achieve. We'll get back to you within one business day.",
    formName: "Your name",
    formEmail: "Email address",
    formCompany: "Company (optional)",
    formService: "What do you need?",
    formServiceDefault: "Select a service",
    formMessage: "Tell us about your project",
    formSubmit: "Send your brief",
    formNote:
      "This opens your email app with the details ready to send. Prefer to call? Use the number on the right.",
    directTitle: "Reach us directly",
    hoursTitle: "Working hours",
    hours: "Sunday – Thursday, 9:00 – 18:00 (GST)",
  },
  footer: {
    tagline: "We turn ideas into impact. Marketing, media and branding, under one roof.",
    servicesTitle: "Services",
    companyTitle: "Company",
    connectTitle: "Connect",
    rights: "All rights reserved.",
    madeIn: "Every brand, one standard of craft.",
  },
};

export default en;
