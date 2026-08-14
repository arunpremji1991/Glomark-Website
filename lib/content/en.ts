import type { Dictionary } from "../i18n";

const en: Dictionary = {
  locale: "en",
  dir: "ltr",
  nav: {
    home: "Home",
    services: "Services",
    work: "Work",
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
    call: "Call",
    email: "Email",
    location: "Location",
    scroll: "Scroll",
  },
  home: {
    metaTitle: "Glomark — Marketing, Media & Branding Agency in Salalah, Oman",
    metaDescription:
      "Glomark is a marketing and media production agency in Salalah, Oman. We turn ideas into impact through media production, branding, digital marketing, events and more.",
    heroEyebrow: "Marketing · Media · Branding — Salalah, Oman",
    heroTitleLead: "We turn ideas into",
    heroTitleAccent: "impact",
    heroSub:
      "Glomark is a marketing and media production studio in Salalah. We build brand stories that move — from the first spark of an idea to the screen it lights up.",
    heroCtaPrimary: "Build your brand story",
    heroCtaSecondary: "See what we do",
    statsEyebrow: "Why Glomark",
    stats: [
      { value: "8", label: "Services under one roof" },
      { value: "EN / AR", label: "Bilingual by default" },
      { value: "Dhofar", label: "Rooted in Salalah" },
      { value: "Idea → Air", label: "End-to-end delivery" },
    ],
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
    ctaTitle: "Let's build your brand story together.",
    ctaBody:
      "Tell us where you want to go. We'll bring the strategy, the crew and the craft to get you there.",
  },
  servicesPage: {
    metaTitle: "Services — Media, Marketing & Branding | Glomark Salalah",
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
        "We shoot in and around Salalah and travel across Oman and the Gulf. Every frame is planned around where it will live — a 60-second hero film and its 9:16 social versions come out of the same shoot day, so your budget works harder.",
      ],
      deliverables: [
        "Brand films & TV commercials",
        "Product & lifestyle photography",
        "Aerial / drone cinematography",
        "Editing, colour grading & sound design",
        "Motion graphics & 2D/3D animation",
        "Social-ready cut-downs (9:16, 1:1, 16:9)",
      ],
      keyword: "video production Salalah Oman",
      metaTitle: "Media Production in Salalah, Oman | Glomark",
      metaDescription:
        "Cinematic video and photography production in Salalah, Oman — brand films, commercials, drone, editing and motion graphics. End-to-end media production by Glomark.",
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
      keyword: "event management company Salalah",
      metaTitle: "Events Planning & Production in Salalah | Glomark",
      metaDescription:
        "Full-service event planning and production in Salalah, Oman — launches, conferences and exhibitions with staging, branding and built-in media coverage by Glomark.",
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
      keyword: "digital marketing agency Salalah Oman",
      metaTitle: "Digital Marketing Agency in Salalah, Oman | Glomark",
      metaDescription:
        "Performance digital marketing in Salalah, Oman — paid social, Google Ads, SEO and analytics that turn attention into measurable results. Data-led campaigns by Glomark.",
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
      keyword: "website development company Salalah",
      metaTitle: "Website Development in Salalah, Oman | Glomark",
      metaDescription:
        "Fast, bilingual, SEO-ready website design and development in Salalah, Oman. Accessible Arabic/English sites built for Core Web Vitals and conversion by Glomark.",
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
    metaTitle: "Work & Case Studies | Glomark Salalah",
    metaDescription:
      "A selection of marketing, media and branding work by Glomark — brand films, campaigns, events and identities produced in Salalah, Oman.",
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
        client: "Salalah Retail Group",
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
  about: {
    metaTitle: "About Glomark — Marketing & Media Studio in Salalah",
    metaDescription:
      "Glomark is a bilingual marketing and media production agency in Salalah, Oman, turning ideas into impact across media, branding and digital.",
    eyebrow: "Who we are",
    title: "A studio built to turn ideas into impact",
    lead: "Glomark is a marketing and media production agency based in Salalah, Oman. We help brands across the Sultanate and the Gulf look sharper, sound clearer and reach further.",
    story: [
      "We started with a simple frustration: great brands were being let down by scattered, forgettable media. Marketing lived in one place, film in another, the website somewhere else — and the story got lost in the gaps.",
      "So we built one studio that does it all. Strategy, media production, branding, broadcasting, web, apps and social — under one roof, in two languages, with one standard of craft. From the first spark of an idea to the screen it lights up, one team stays accountable for the impact.",
      "Salalah is our home. We know the Dhofar audience, the Omani market and the rhythm of the region — and we bring that fluency to every brand we build.",
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
    tagline: "We turn ideas into impact. Marketing, media and branding, built in Salalah.",
    servicesTitle: "Services",
    companyTitle: "Company",
    connectTitle: "Connect",
    rights: "All rights reserved.",
    madeIn: "Designed & built in Salalah, Oman.",
  },
};

export default en;
