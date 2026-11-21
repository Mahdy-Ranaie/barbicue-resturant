export type Locale = "fa" | "en";
export type MenuItem = { name: string; description: string; image: "brisket" | "chicken" | "burger" };
export type SiteContent = {
  nav: { about: string; menu: string; services: string; gallery: string; contact: string };
  brand: string; eyebrow: string; headline: string; heroText: string; discover: string; menuLink: string;
  aboutLabel: string; aboutTitle: string; aboutText: string; aboutExtra: string;
  menuLabel: string; menuTitle: string; menuText: string; dishes: MenuItem[];
  servicesLabel: string; servicesTitle: string; services: { title: string; text: string }[];
  galleryLabel: string; galleryTitle: string;
  videoLabel: string; videoTitle: string; videoText: string;
  contactLabel: string; contactTitle: string; contactText: string; addressLabel: string;
  address: string; phoneLabel: string; phone: string; hoursLabel: string; hours: string;
  footerText: string; rights: string; playFallback: string;
};
export const content: Record<Locale, SiteContent> = {
  fa: {
    nav: { about: "داستان ما", menu: "منو", services: "خدمات", gallery: "گالری", contact: "تماس" },
    brand: "باربیکیو", eyebrow: "طعم آتش، هنر مهمان‌نوازی", headline: "طعم اصیل باربیکیو، تجربه‌ای ماندگار",
    heroText: "گوشت‌های گریل‌شده، عطر دود و لحظه‌هایی برای دور هم بودن؛ به دنیای باربیکیو خوش آمدید.",
    discover: "داستان ما", menuLink: "مشاهده منو",
    aboutLabel: "درباره رستوران", aboutTitle: "جایی که آتش به طعم جان می‌دهد",
    aboutText: "ما به غذاهای باحوصله، مواد اولیه باکیفیت و لحظه‌های مشترک دور میز باور داریم. هر بشقاب، دعوتی به یک تجربه گرم و به‌یادماندنی است.",
    aboutExtra: "از آماده‌سازی تا سرو، توجه به جزئیات بخشی از داستان ماست.",
    menuLabel: "انتخاب‌های محبوب", menuTitle: "طعم‌هایی برای کشف کردن",
    menuText: "نمونه‌ای از سبک غذاهایی که می‌توانید در منوی رستوران معرفی کنید. نام و جزئیات نهایی پس از تأیید جایگزین می‌شوند.",
    dishes: [
      { name: "بریسکت دودی", description: "پخت آرام و طعم عمیق دود — نمونه منو", image: "brisket" },
      { name: "مرغ گریل", description: "طعم متعادل ادویه و آتش — نمونه منو", image: "chicken" },
      { name: "برگر باربیکیو", description: "ترکیب کلاسیک و دلچسب — نمونه منو", image: "burger" }
    ],
    servicesLabel: "تجربه ما", servicesTitle: "بیش از یک وعده غذا",
    services: [
      { title: "فضای گرم", text: "محیطی مناسب برای دورهمی‌های دوستانه و خانوادگی." },
      { title: "توجه به کیفیت", text: "تمرکز بر مواد اولیه و آماده‌سازی دقیق." },
      { title: "مهمان‌نوازی", text: "تجربه‌ای خوشایند از ورود تا خداحافظی." }
    ],
    galleryLabel: "گالری", galleryTitle: "لحظه‌هایی از دنیای باربیکیو",
    videoLabel: "تماشای تجربه", videoTitle: "داستان ما در قاب تصویر",
    videoText: "ویدیوی معرفی رستوران پس از افزودن فایل اصلی در این بخش نمایش داده می‌شود.",
    contactLabel: "ارتباط با ما", contactTitle: "منتظر دیدار شما هستیم",
    contactText: "اطلاعات زیر نمونه هستند و پیش از انتشار باید با اطلاعات واقعی رستوران جایگزین شوند.",
    addressLabel: "نشانی", address: "نشانی رستوران — در انتظار تأیید",
    phoneLabel: "تلفن", phone: "شماره تماس — در انتظار تأیید",
    hoursLabel: "ساعت کاری", hours: "ساعات فعالیت — در انتظار تأیید",
    footerText: "جایی برای طعم، آتش و خاطره‌های خوب.", rights: "تمام حقوق محفوظ است.",
    playFallback: "ویدیوی رستوران هنوز اضافه نشده است."
  },
  en: {
    nav: { about: "Our story", menu: "Menu", services: "Experience", gallery: "Gallery", contact: "Contact" },
    brand: "BARBECUE", eyebrow: "FIRE • FLAVOR • HOSPITALITY", headline: "Crafted over fire. Made to remember.",
    heroText: "Slow-cooked favorites, smoky aromas, and a welcoming table. Discover the spirit of barbecue.",
    discover: "Our story", menuLink: "Explore menu",
    aboutLabel: "ABOUT US", aboutTitle: "Where fire becomes flavor",
    aboutText: "We believe in thoughtful cooking, quality ingredients, and the joy of gathering around a table. Every plate is an invitation to make a memory.",
    aboutExtra: "From preparation to service, the little details make the difference.",
    menuLabel: "SIGNATURE PICKS", menuTitle: "A taste worth exploring",
    menuText: "Sample dishes to illustrate the menu layout. Final items and descriptions will be confirmed before publication.",
    dishes: [
      { name: "Smoked brisket", description: "Slow cooked, deeply smoky — sample item", image: "brisket" },
      { name: "Grilled chicken", description: "Fire-kissed and perfectly seasoned — sample item", image: "chicken" },
      { name: "Barbecue burger", description: "A hearty, timeless favorite — sample item", image: "burger" }
    ],
    servicesLabel: "THE EXPERIENCE", servicesTitle: "More than a meal",
    services: [
      { title: "Warm atmosphere", text: "A welcoming setting for friends and family." },
      { title: "Quality first", text: "Carefully prepared food with attention to ingredients." },
      { title: "Thoughtful service", text: "Hospitality that makes every visit feel special." }
    ],
    galleryLabel: "GALLERY", galleryTitle: "Moments around the fire",
    videoLabel: "WATCH OUR STORY", videoTitle: "A closer look",
    videoText: "Your restaurant introduction video will appear here once the media file is added.",
    contactLabel: "GET IN TOUCH", contactTitle: "We look forward to welcoming you",
    contactText: "The details below are placeholders and must be replaced with verified restaurant information before publishing.",
    addressLabel: "Address", address: "Restaurant address — to be confirmed",
    phoneLabel: "Phone", phone: "Contact number — to be confirmed",
    hoursLabel: "Hours", hours: "Opening hours — to be confirmed",
    footerText: "Good food, good fire, good company.", rights: "All rights reserved.",
    playFallback: "The restaurant video has not been added yet."
  }
};
