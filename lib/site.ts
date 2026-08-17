// Locale-neutral site configuration. Localized strings live in lib/content/*.

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://glomark.om"
).replace(/\/$/, "");

export const CONTACT = {
  phone: "+968 9101 8000",
  phoneHref: "tel:+96891018000",
  whatsappHref: "https://wa.me/96891018000",
  email: "hello@glomark.om",
  emailHref: "mailto:hello@glomark.om",
  // Destination for the contact-form "Send your brief" submission only —
  // general "email us" links elsewhere on the site still use `email` above.
  // Delivery is via Web3Forms (see WEB3FORMS_ACCESS_KEY below), which routes
  // to whichever address was verified when the access key was created.
  leadsEmail: "e-marketing@glomark.om",
  addressLine: "An Nahdah St, Salalah, Oman",
  street: "An Nahdah Street",
  city: "Salalah",
  postalCode: "211",
  region: "Dhofar",
  country: "Oman",
  countryCode: "OM",
  // Exact pin from the verified Google Business Profile listing (not a
  // geocoded guess from the street address, which landed ~500m off).
  geo: { lat: 17.0196643, lng: 54.0926487 },
  mapEmbed: "https://www.google.com/maps?q=17.0196643,54.0926487&output=embed",
  // Structured (locale-neutral) form of the "Sunday – Thursday, 9:00 – 18:00"
  // hours shown in lib/content/*.ts — feeds openingHoursSpecification in
  // lib/schema.ts rather than parsing the translated display string.
  hours: {
    days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
    opens: "09:00",
    closes: "18:00",
  },
} as const;

// Web3Forms access key for the contact-form submission (components/ContactForm.tsx).
// Safe to keep client-side — Web3Forms access keys are designed for public,
// browser-side use (like a form ID), not a secret credential. Generated at
// web3forms.com against e-marketing@glomark.om; submissions route there.
export const WEB3FORMS_ACCESS_KEY = "fd42eb27-1ae6-46ff-9e79-f69aad846c6a";

// Derives a flag emoji from an ISO 3166-1 alpha-2 code (e.g. "OM" -> 🇴🇲) via
// Unicode regional indicator symbols, instead of hand-typing ~190 emoji.
export function countryFlag(iso: string): string {
  return iso
    .toUpperCase()
    .split("")
    .map((c) => String.fromCodePoint(127397 + c.charCodeAt(0)))
    .join("");
}

// GCC countries — the business's core target market, shown first/pinned in
// the contact form's phone country select. Oman is the default (home market).
export const GCC_COUNTRIES = [
  { iso: "OM", dial: "+968", nameEn: "Oman", nameAr: "عُمان" },
  { iso: "AE", dial: "+971", nameEn: "United Arab Emirates", nameAr: "الإمارات" },
  { iso: "SA", dial: "+966", nameEn: "Saudi Arabia", nameAr: "السعودية" },
  { iso: "QA", dial: "+974", nameEn: "Qatar", nameAr: "قطر" },
  { iso: "BH", dial: "+973", nameEn: "Bahrain", nameAr: "البحرين" },
  { iso: "KW", dial: "+965", nameEn: "Kuwait", nameAr: "الكويت" },
] as const;

// Every other country/territory, alphabetical by English name, for the
// contact form's phone country select — grouped separately from GCC_COUNTRIES
// above so the form can show GCC pinned first, then the rest of the world.
export const OTHER_COUNTRIES = [
  { iso: "AF", dial: "+93", nameEn: "Afghanistan", nameAr: "أفغانستان" },
  { iso: "AL", dial: "+355", nameEn: "Albania", nameAr: "ألبانيا" },
  { iso: "DZ", dial: "+213", nameEn: "Algeria", nameAr: "الجزائر" },
  { iso: "AD", dial: "+376", nameEn: "Andorra", nameAr: "أندورا" },
  { iso: "AO", dial: "+244", nameEn: "Angola", nameAr: "أنغولا" },
  { iso: "AR", dial: "+54", nameEn: "Argentina", nameAr: "الأرجنتين" },
  { iso: "AM", dial: "+374", nameEn: "Armenia", nameAr: "أرمينيا" },
  { iso: "AU", dial: "+61", nameEn: "Australia", nameAr: "أستراليا" },
  { iso: "AT", dial: "+43", nameEn: "Austria", nameAr: "النمسا" },
  { iso: "AZ", dial: "+994", nameEn: "Azerbaijan", nameAr: "أذربيجان" },
  { iso: "BS", dial: "+1242", nameEn: "Bahamas", nameAr: "الباهاما" },
  { iso: "BD", dial: "+880", nameEn: "Bangladesh", nameAr: "بنغلاديش" },
  { iso: "BB", dial: "+1246", nameEn: "Barbados", nameAr: "باربادوس" },
  { iso: "BY", dial: "+375", nameEn: "Belarus", nameAr: "بيلاروسيا" },
  { iso: "BE", dial: "+32", nameEn: "Belgium", nameAr: "بلجيكا" },
  { iso: "BZ", dial: "+501", nameEn: "Belize", nameAr: "بليز" },
  { iso: "BJ", dial: "+229", nameEn: "Benin", nameAr: "بنين" },
  { iso: "BT", dial: "+975", nameEn: "Bhutan", nameAr: "بوتان" },
  { iso: "BO", dial: "+591", nameEn: "Bolivia", nameAr: "بوليفيا" },
  { iso: "BA", dial: "+387", nameEn: "Bosnia and Herzegovina", nameAr: "البوسنة والهرسك" },
  { iso: "BW", dial: "+267", nameEn: "Botswana", nameAr: "بوتسوانا" },
  { iso: "BR", dial: "+55", nameEn: "Brazil", nameAr: "البرازيل" },
  { iso: "BN", dial: "+673", nameEn: "Brunei", nameAr: "بروناي" },
  { iso: "BG", dial: "+359", nameEn: "Bulgaria", nameAr: "بلغاريا" },
  { iso: "BF", dial: "+226", nameEn: "Burkina Faso", nameAr: "بوركينا فاسو" },
  { iso: "BI", dial: "+257", nameEn: "Burundi", nameAr: "بوروندي" },
  { iso: "KH", dial: "+855", nameEn: "Cambodia", nameAr: "كمبوديا" },
  { iso: "CM", dial: "+237", nameEn: "Cameroon", nameAr: "الكاميرون" },
  { iso: "CA", dial: "+1", nameEn: "Canada", nameAr: "كندا" },
  { iso: "CV", dial: "+238", nameEn: "Cape Verde", nameAr: "الرأس الأخضر" },
  { iso: "CF", dial: "+236", nameEn: "Central African Republic", nameAr: "أفريقيا الوسطى" },
  { iso: "TD", dial: "+235", nameEn: "Chad", nameAr: "تشاد" },
  { iso: "CL", dial: "+56", nameEn: "Chile", nameAr: "تشيلي" },
  { iso: "CN", dial: "+86", nameEn: "China", nameAr: "الصين" },
  { iso: "CO", dial: "+57", nameEn: "Colombia", nameAr: "كولومبيا" },
  { iso: "KM", dial: "+269", nameEn: "Comoros", nameAr: "جزر القمر" },
  { iso: "CG", dial: "+242", nameEn: "Congo", nameAr: "الكونغو برازافيل" },
  { iso: "CD", dial: "+243", nameEn: "Congo (DRC)", nameAr: "الكونغو الديمقراطية" },
  { iso: "CR", dial: "+506", nameEn: "Costa Rica", nameAr: "كوستاريكا" },
  { iso: "HR", dial: "+385", nameEn: "Croatia", nameAr: "كرواتيا" },
  { iso: "CU", dial: "+53", nameEn: "Cuba", nameAr: "كوبا" },
  { iso: "CY", dial: "+357", nameEn: "Cyprus", nameAr: "قبرص" },
  { iso: "CZ", dial: "+420", nameEn: "Czechia", nameAr: "التشيك" },
  { iso: "DK", dial: "+45", nameEn: "Denmark", nameAr: "الدنمارك" },
  { iso: "DJ", dial: "+253", nameEn: "Djibouti", nameAr: "جيبوتي" },
  { iso: "DM", dial: "+1767", nameEn: "Dominica", nameAr: "دومينيكا" },
  { iso: "DO", dial: "+1809", nameEn: "Dominican Republic", nameAr: "جمهورية الدومينيكان" },
  { iso: "EC", dial: "+593", nameEn: "Ecuador", nameAr: "الإكوادور" },
  { iso: "EG", dial: "+20", nameEn: "Egypt", nameAr: "مصر" },
  { iso: "SV", dial: "+503", nameEn: "El Salvador", nameAr: "السلفادور" },
  { iso: "GQ", dial: "+240", nameEn: "Equatorial Guinea", nameAr: "غينيا الاستوائية" },
  { iso: "ER", dial: "+291", nameEn: "Eritrea", nameAr: "إريتريا" },
  { iso: "EE", dial: "+372", nameEn: "Estonia", nameAr: "إستونيا" },
  { iso: "SZ", dial: "+268", nameEn: "Eswatini", nameAr: "إسواتيني" },
  { iso: "ET", dial: "+251", nameEn: "Ethiopia", nameAr: "إثيوبيا" },
  { iso: "FJ", dial: "+679", nameEn: "Fiji", nameAr: "فيجي" },
  { iso: "FI", dial: "+358", nameEn: "Finland", nameAr: "فنلندا" },
  { iso: "FR", dial: "+33", nameEn: "France", nameAr: "فرنسا" },
  { iso: "GA", dial: "+241", nameEn: "Gabon", nameAr: "الغابون" },
  { iso: "GM", dial: "+220", nameEn: "Gambia", nameAr: "غامبيا" },
  { iso: "GE", dial: "+995", nameEn: "Georgia", nameAr: "جورجيا" },
  { iso: "DE", dial: "+49", nameEn: "Germany", nameAr: "ألمانيا" },
  { iso: "GH", dial: "+233", nameEn: "Ghana", nameAr: "غانا" },
  { iso: "GR", dial: "+30", nameEn: "Greece", nameAr: "اليونان" },
  { iso: "GD", dial: "+1473", nameEn: "Grenada", nameAr: "غرينادا" },
  { iso: "GT", dial: "+502", nameEn: "Guatemala", nameAr: "غواتيمالا" },
  { iso: "GN", dial: "+224", nameEn: "Guinea", nameAr: "غينيا" },
  { iso: "GW", dial: "+245", nameEn: "Guinea-Bissau", nameAr: "غينيا بيساو" },
  { iso: "GY", dial: "+592", nameEn: "Guyana", nameAr: "غيانا" },
  { iso: "HT", dial: "+509", nameEn: "Haiti", nameAr: "هايتي" },
  { iso: "HN", dial: "+504", nameEn: "Honduras", nameAr: "هندوراس" },
  { iso: "HK", dial: "+852", nameEn: "Hong Kong", nameAr: "هونغ كونغ" },
  { iso: "HU", dial: "+36", nameEn: "Hungary", nameAr: "المجر" },
  { iso: "IS", dial: "+354", nameEn: "Iceland", nameAr: "آيسلندا" },
  { iso: "IN", dial: "+91", nameEn: "India", nameAr: "الهند" },
  { iso: "ID", dial: "+62", nameEn: "Indonesia", nameAr: "إندونيسيا" },
  { iso: "IR", dial: "+98", nameEn: "Iran", nameAr: "إيران" },
  { iso: "IQ", dial: "+964", nameEn: "Iraq", nameAr: "العراق" },
  { iso: "IE", dial: "+353", nameEn: "Ireland", nameAr: "أيرلندا" },
  { iso: "IL", dial: "+972", nameEn: "Israel", nameAr: "إسرائيل" },
  { iso: "IT", dial: "+39", nameEn: "Italy", nameAr: "إيطاليا" },
  { iso: "CI", dial: "+225", nameEn: "Ivory Coast", nameAr: "ساحل العاج" },
  { iso: "JM", dial: "+1876", nameEn: "Jamaica", nameAr: "جامايكا" },
  { iso: "JP", dial: "+81", nameEn: "Japan", nameAr: "اليابان" },
  { iso: "JO", dial: "+962", nameEn: "Jordan", nameAr: "الأردن" },
  { iso: "KZ", dial: "+7", nameEn: "Kazakhstan", nameAr: "كازاخستان" },
  { iso: "KE", dial: "+254", nameEn: "Kenya", nameAr: "كينيا" },
  { iso: "KI", dial: "+686", nameEn: "Kiribati", nameAr: "كيريباتي" },
  { iso: "XK", dial: "+383", nameEn: "Kosovo", nameAr: "كوسوفو" },
  { iso: "KG", dial: "+996", nameEn: "Kyrgyzstan", nameAr: "قيرغيزستان" },
  { iso: "LA", dial: "+856", nameEn: "Laos", nameAr: "لاوس" },
  { iso: "LV", dial: "+371", nameEn: "Latvia", nameAr: "لاتفيا" },
  { iso: "LB", dial: "+961", nameEn: "Lebanon", nameAr: "لبنان" },
  { iso: "LS", dial: "+266", nameEn: "Lesotho", nameAr: "ليسوتو" },
  { iso: "LR", dial: "+231", nameEn: "Liberia", nameAr: "ليبيريا" },
  { iso: "LY", dial: "+218", nameEn: "Libya", nameAr: "ليبيا" },
  { iso: "LI", dial: "+423", nameEn: "Liechtenstein", nameAr: "ليختنشتاين" },
  { iso: "LT", dial: "+370", nameEn: "Lithuania", nameAr: "ليتوانيا" },
  { iso: "LU", dial: "+352", nameEn: "Luxembourg", nameAr: "لوكسمبورغ" },
  { iso: "MO", dial: "+853", nameEn: "Macau", nameAr: "ماكاو" },
  { iso: "MG", dial: "+261", nameEn: "Madagascar", nameAr: "مدغشقر" },
  { iso: "MW", dial: "+265", nameEn: "Malawi", nameAr: "مالاوي" },
  { iso: "MY", dial: "+60", nameEn: "Malaysia", nameAr: "ماليزيا" },
  { iso: "MV", dial: "+960", nameEn: "Maldives", nameAr: "المالديف" },
  { iso: "ML", dial: "+223", nameEn: "Mali", nameAr: "مالي" },
  { iso: "MT", dial: "+356", nameEn: "Malta", nameAr: "مالطا" },
  { iso: "MR", dial: "+222", nameEn: "Mauritania", nameAr: "موريتانيا" },
  { iso: "MU", dial: "+230", nameEn: "Mauritius", nameAr: "موريشيوس" },
  { iso: "MX", dial: "+52", nameEn: "Mexico", nameAr: "المكسيك" },
  { iso: "MD", dial: "+373", nameEn: "Moldova", nameAr: "مولدوفا" },
  { iso: "MC", dial: "+377", nameEn: "Monaco", nameAr: "موناكو" },
  { iso: "MN", dial: "+976", nameEn: "Mongolia", nameAr: "منغوليا" },
  { iso: "ME", dial: "+382", nameEn: "Montenegro", nameAr: "الجبل الأسود" },
  { iso: "MA", dial: "+212", nameEn: "Morocco", nameAr: "المغرب" },
  { iso: "MZ", dial: "+258", nameEn: "Mozambique", nameAr: "موزمبيق" },
  { iso: "MM", dial: "+95", nameEn: "Myanmar", nameAr: "ميانمار" },
  { iso: "NA", dial: "+264", nameEn: "Namibia", nameAr: "ناميبيا" },
  { iso: "NP", dial: "+977", nameEn: "Nepal", nameAr: "نيبال" },
  { iso: "NL", dial: "+31", nameEn: "Netherlands", nameAr: "هولندا" },
  { iso: "NZ", dial: "+64", nameEn: "New Zealand", nameAr: "نيوزيلندا" },
  { iso: "NI", dial: "+505", nameEn: "Nicaragua", nameAr: "نيكاراغوا" },
  { iso: "NE", dial: "+227", nameEn: "Niger", nameAr: "النيجر" },
  { iso: "NG", dial: "+234", nameEn: "Nigeria", nameAr: "نيجيريا" },
  { iso: "KP", dial: "+850", nameEn: "North Korea", nameAr: "كوريا الشمالية" },
  { iso: "MK", dial: "+389", nameEn: "North Macedonia", nameAr: "مقدونيا الشمالية" },
  { iso: "NO", dial: "+47", nameEn: "Norway", nameAr: "النرويج" },
  { iso: "PK", dial: "+92", nameEn: "Pakistan", nameAr: "باكستان" },
  { iso: "PA", dial: "+507", nameEn: "Panama", nameAr: "بنما" },
  { iso: "PG", dial: "+675", nameEn: "Papua New Guinea", nameAr: "بابوا غينيا الجديدة" },
  { iso: "PY", dial: "+595", nameEn: "Paraguay", nameAr: "باراغواي" },
  { iso: "PE", dial: "+51", nameEn: "Peru", nameAr: "بيرو" },
  { iso: "PH", dial: "+63", nameEn: "Philippines", nameAr: "الفلبين" },
  { iso: "PL", dial: "+48", nameEn: "Poland", nameAr: "بولندا" },
  { iso: "PT", dial: "+351", nameEn: "Portugal", nameAr: "البرتغال" },
  { iso: "PS", dial: "+970", nameEn: "Palestine", nameAr: "فلسطين" },
  { iso: "RO", dial: "+40", nameEn: "Romania", nameAr: "رومانيا" },
  { iso: "RU", dial: "+7", nameEn: "Russia", nameAr: "روسيا" },
  { iso: "RW", dial: "+250", nameEn: "Rwanda", nameAr: "رواندا" },
  { iso: "WS", dial: "+685", nameEn: "Samoa", nameAr: "ساموا" },
  { iso: "SM", dial: "+378", nameEn: "San Marino", nameAr: "سان مارينو" },
  { iso: "ST", dial: "+239", nameEn: "São Tomé and Príncipe", nameAr: "ساو تومي وبرينسيبي" },
  { iso: "SN", dial: "+221", nameEn: "Senegal", nameAr: "السنغال" },
  { iso: "RS", dial: "+381", nameEn: "Serbia", nameAr: "صربيا" },
  { iso: "SC", dial: "+248", nameEn: "Seychelles", nameAr: "سيشل" },
  { iso: "SL", dial: "+232", nameEn: "Sierra Leone", nameAr: "سيراليون" },
  { iso: "SG", dial: "+65", nameEn: "Singapore", nameAr: "سنغافورة" },
  { iso: "SK", dial: "+421", nameEn: "Slovakia", nameAr: "سلوفاكيا" },
  { iso: "SI", dial: "+386", nameEn: "Slovenia", nameAr: "سلوفينيا" },
  { iso: "SB", dial: "+677", nameEn: "Solomon Islands", nameAr: "جزر سليمان" },
  { iso: "SO", dial: "+252", nameEn: "Somalia", nameAr: "الصومال" },
  { iso: "ZA", dial: "+27", nameEn: "South Africa", nameAr: "جنوب أفريقيا" },
  { iso: "KR", dial: "+82", nameEn: "South Korea", nameAr: "كوريا الجنوبية" },
  { iso: "SS", dial: "+211", nameEn: "South Sudan", nameAr: "جنوب السودان" },
  { iso: "ES", dial: "+34", nameEn: "Spain", nameAr: "إسبانيا" },
  { iso: "LK", dial: "+94", nameEn: "Sri Lanka", nameAr: "سريلانكا" },
  { iso: "KN", dial: "+1869", nameEn: "St Kitts and Nevis", nameAr: "سانت كيتس ونيفيس" },
  { iso: "LC", dial: "+1758", nameEn: "St Lucia", nameAr: "سانت لوسيا" },
  { iso: "VC", dial: "+1784", nameEn: "St Vincent and the Grenadines", nameAr: "سانت فينسنت والغرينادين" },
  { iso: "SD", dial: "+249", nameEn: "Sudan", nameAr: "السودان" },
  { iso: "SR", dial: "+597", nameEn: "Suriname", nameAr: "سورينام" },
  { iso: "SE", dial: "+46", nameEn: "Sweden", nameAr: "السويد" },
  { iso: "CH", dial: "+41", nameEn: "Switzerland", nameAr: "سويسرا" },
  { iso: "SY", dial: "+963", nameEn: "Syria", nameAr: "سوريا" },
  { iso: "TW", dial: "+886", nameEn: "Taiwan", nameAr: "تايوان" },
  { iso: "TJ", dial: "+992", nameEn: "Tajikistan", nameAr: "طاجيكستان" },
  { iso: "TZ", dial: "+255", nameEn: "Tanzania", nameAr: "تنزانيا" },
  { iso: "TH", dial: "+66", nameEn: "Thailand", nameAr: "تايلاند" },
  { iso: "TL", dial: "+670", nameEn: "Timor-Leste", nameAr: "تيمور الشرقية" },
  { iso: "TG", dial: "+228", nameEn: "Togo", nameAr: "توغو" },
  { iso: "TO", dial: "+676", nameEn: "Tonga", nameAr: "تونغا" },
  { iso: "TT", dial: "+1868", nameEn: "Trinidad and Tobago", nameAr: "ترينيداد وتوباغو" },
  { iso: "TN", dial: "+216", nameEn: "Tunisia", nameAr: "تونس" },
  { iso: "TR", dial: "+90", nameEn: "Turkey", nameAr: "تركيا" },
  { iso: "TM", dial: "+993", nameEn: "Turkmenistan", nameAr: "تركمانستان" },
  { iso: "TV", dial: "+688", nameEn: "Tuvalu", nameAr: "توفالو" },
  { iso: "UG", dial: "+256", nameEn: "Uganda", nameAr: "أوغندا" },
  { iso: "UA", dial: "+380", nameEn: "Ukraine", nameAr: "أوكرانيا" },
  { iso: "GB", dial: "+44", nameEn: "United Kingdom", nameAr: "المملكة المتحدة" },
  { iso: "US", dial: "+1", nameEn: "United States", nameAr: "الولايات المتحدة" },
  { iso: "UY", dial: "+598", nameEn: "Uruguay", nameAr: "الأوروغواي" },
  { iso: "UZ", dial: "+998", nameEn: "Uzbekistan", nameAr: "أوزبكستان" },
  { iso: "VU", dial: "+678", nameEn: "Vanuatu", nameAr: "فانواتو" },
  { iso: "VA", dial: "+379", nameEn: "Vatican City", nameAr: "الفاتيكان" },
  { iso: "VE", dial: "+58", nameEn: "Venezuela", nameAr: "فنزويلا" },
  { iso: "VN", dial: "+84", nameEn: "Vietnam", nameAr: "فيتنام" },
  { iso: "YE", dial: "+967", nameEn: "Yemen", nameAr: "اليمن" },
  { iso: "ZM", dial: "+260", nameEn: "Zambia", nameAr: "زامبيا" },
  { iso: "ZW", dial: "+263", nameEn: "Zimbabwe", nameAr: "زيمبابوي" },
] as const;

// sameAs profiles for Organization schema — the agency's real profiles.
export const SOCIAL = [
  { name: "Instagram", href: "https://www.instagram.com/glomark.om/" },
  { name: "LinkedIn", href: "https://www.linkedin.com/company/glomark-om/" },
] as const;

// Canonical service order + stable slugs (locale-neutral).
export const SERVICE_SLUGS = [
  "media-production",
  "events-planning",
  "live-broadcasting",
  "digital-marketing",
  "branding",
  "website-development",
  "social-media-management",
  "application-development",
] as const;

export type ServiceSlug = (typeof SERVICE_SLUGS)[number];

// Canonical blog post order + stable slugs (locale-neutral).
export const BLOG_SLUGS = [
  "bilingual-branding-in-oman",
  "anatomy-of-a-live-broadcast",
  "eight-shots-every-brand-film-needs",
  "social-content-that-earns-attention",
] as const;

export type BlogSlug = (typeof BLOG_SLUGS)[number];

// Canonical portfolio client order + stable slugs (locale-neutral). Each
// client's logo lives at /media/clients/<slug>.webp (see README).
export const CLIENT_SLUGS = [
  "reventure",
  "firstexchange",
  "voice-of-the-season",
  "do-events",
  "do-chocolate",
  "do-cafe",
  "ventura",
  "almoftah",
] as const;

export type ClientSlug = (typeof CLIENT_SLUGS)[number];

// Which real client case studies to surface on each service page's "see it
// in action" section — only clients whose `services` tags (lib/content/*)
// actually include that discipline. Two services (live-broadcasting,
// application-development) have no matching client yet; omit rather than
// force an unrelated case study, same principle as CLIENT_GALLERY above.
export const SERVICE_TO_CLIENTS: Record<ServiceSlug, ClientSlug[]> = {
  "media-production": ["almoftah", "voice-of-the-season", "do-cafe"],
  "events-planning": ["voice-of-the-season", "do-events"],
  "live-broadcasting": [],
  "digital-marketing": ["reventure", "firstexchange"],
  branding: ["reventure", "do-chocolate", "ventura"],
  "website-development": ["reventure", "do-chocolate", "ventura"],
  "social-media-management": ["do-cafe", "ventura", "reventure"],
  "application-development": [],
};

// External profile/website for each client — locale-neutral.
export const CLIENT_LINKS: Record<ClientSlug, string> = {
  reventure: "https://www.instagram.com/reventure.om/",
  firstexchange: "https://firstexchangeoman.com/",
  "voice-of-the-season": "https://dhofarcenter.com/voice-of-the-season/",
  "do-events": "https://www.instagram.com/do.events_oman/",
  "do-chocolate": "https://www.instagram.com/do_chocolate/",
  "do-cafe": "https://www.instagram.com/docafe.om/",
  ventura: "https://www.instagram.com/ventura.sll/",
  almoftah: "https://www.almoftah.om/",
};

export interface GalleryItem {
  file: string; // filename under /media/clients/gallery/
  href: string; // link to the original post
  isVideo: boolean;
}

// Photo/video samples pulled from each client's own feed — real content
// Glomark produced or published for them, not stock art. Voice of the
// Season has no gallery yet (no client-provided event photography at time
// of writing); leave its array empty rather than filling with mockup art.
export const CLIENT_GALLERY: Record<ClientSlug, GalleryItem[]> = {
  reventure: [
    { file: "reventure-1.webp", href: "https://www.instagram.com/reventure.om/p/DP4g6ihCG38/", isVideo: false },
    { file: "reventure-2.webp", href: "https://www.instagram.com/reventure.om/p/DcBvsvwiFdz/", isVideo: false },
    { file: "reventure-3.webp", href: "https://www.instagram.com/reventure.om/p/Db-PVQPCF1A/", isVideo: false },
    { file: "reventure-4.webp", href: "https://www.instagram.com/reventure.om/reel/Db8j9gkoNGr/", isVideo: true },
    { file: "reventure-5.webp", href: "https://www.instagram.com/reventure.om/p/Db49Mm_iL7B/", isVideo: false },
    { file: "reventure-6.webp", href: "https://www.instagram.com/reventure.om/reel/Db2icYEIaaz/", isVideo: true },
  ],
  firstexchange: [
    { file: "firstexchange-1.webp", href: "https://firstexchangeoman.com/", isVideo: false },
    { file: "firstexchange-2.webp", href: "https://firstexchangeoman.com/", isVideo: false },
  ],
  "voice-of-the-season": [],
  "do-events": [
    { file: "do-events-1.webp", href: "https://www.instagram.com/do.events_oman/p/Db3KmPejC9K/", isVideo: false },
    { file: "do-events-2.webp", href: "https://www.instagram.com/do.events_oman/reel/Db3K-AQsSys/", isVideo: true },
    { file: "do-events-3.webp", href: "https://www.instagram.com/do.events_oman/p/Db3KCqijGSn/", isVideo: false },
    { file: "do-events-4.webp", href: "https://www.instagram.com/do.events_oman/p/DbqKgDGjKiR/", isVideo: false },
    { file: "do-events-5.webp", href: "https://www.instagram.com/do.events_oman/reel/DbiOAXfMEN_/", isVideo: true },
    { file: "do-events-6.webp", href: "https://www.instagram.com/do.events_oman/p/DbpudImDC4T/", isVideo: false },
  ],
  "do-chocolate": [
    { file: "do-chocolate-1.webp", href: "https://www.instagram.com/do_chocolate/p/DbsLUjiuiy4/", isVideo: false },
    { file: "do-chocolate-2.webp", href: "https://www.instagram.com/do_chocolate/p/DbsLNh_OqNS/", isVideo: false },
    { file: "do-chocolate-3.webp", href: "https://www.instagram.com/do_chocolate/p/DbsLBseOjF7/", isVideo: false },
    { file: "do-chocolate-4.webp", href: "https://www.instagram.com/do_chocolate/p/Da_FOeIO35H/", isVideo: false },
    { file: "do-chocolate-5.webp", href: "https://www.instagram.com/do_chocolate/p/Da--sOYOJf3/", isVideo: false },
    { file: "do-chocolate-6.webp", href: "https://www.instagram.com/do_chocolate/p/Da-_Au3uSwg/", isVideo: false },
  ],
  "do-cafe": [
    { file: "do-cafe-1.webp", href: "https://www.instagram.com/docafe.om/reel/DbsL3iKuXW3/", isVideo: true },
    { file: "do-cafe-2.webp", href: "https://www.instagram.com/docafe.om/reel/DbVGz-tOoOZ/", isVideo: true },
    { file: "do-cafe-3.webp", href: "https://www.instagram.com/docafe.om/reel/DbTl9Adu9dw/", isVideo: true },
    { file: "do-cafe-4.webp", href: "https://www.instagram.com/docafe.om/reel/DbTdTkhq-cX/", isVideo: true },
    { file: "do-cafe-5.webp", href: "https://www.instagram.com/docafe.om/p/DbDwJHKoLGN/", isVideo: false },
    { file: "do-cafe-6.webp", href: "https://www.instagram.com/docafe.om/p/DbDvrFBoQRC/", isVideo: false },
  ],
  ventura: [
    { file: "ventura-1.webp", href: "https://www.instagram.com/ventura.sll/p/Dbwb7TuMjGw/", isVideo: false },
    { file: "ventura-2.webp", href: "https://www.instagram.com/ventura.sll/reel/DbiLAKPo3tN/", isVideo: true },
    { file: "ventura-3.webp", href: "https://www.instagram.com/ventura.sll/p/Dbbdmv4CN2Q/", isVideo: false },
    { file: "ventura-4.webp", href: "https://www.instagram.com/ventura.sll/reel/DbLyxx_IdIg/", isVideo: true },
  ],
  almoftah: [
    { file: "almoftah-1.webp", href: "https://www.instagram.com/almoftah_realestate/p/Db5l5BuDYMs/", isVideo: false },
    { file: "almoftah-2.webp", href: "https://www.instagram.com/almoftah_realestate/p/DbpuhR9Co2g/", isVideo: false },
  ],
};
