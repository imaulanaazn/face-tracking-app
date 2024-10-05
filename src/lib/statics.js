import {
  faAd,
  faBolt,
  faBullhorn,
  faChartPie,
  faChartSimple,
  faClockRotateLeft,
  faComputer,
  faCreditCard,
  faExpand,
  faHouse,
  faLink,
  faMessage,
  faNewspaper,
  faPaperPlane,
  faStore,
  faTag,
  faTags,
  faUser,
  faUsersRays,
} from "@fortawesome/free-solid-svg-icons";

export const navigation = [
  {
    id: "0",
    title: "Features",
    url: "#features",
  },
  {
    id: "1",
    title: "Benefits",
    url: "#the-benefits",
  },
  {
    id: "2",
    title: "Pricing",
    url: "#pricing",
  },
  {
    id: "3",
    title: "Contacts",
    url: "#contacts",
  },
];

export const merchantNavigation = [
  {
    name: "Members Recognition",
    path: "/recognition",
    icon: faExpand,
  },
  {
    name: "Dashboard",
    path: "/merchant/dashboard",
    icon: faChartPie,
  },
  {
    name: "Send Message",
    path: "/merchant/send-message",
    icon: faPaperPlane,
  },
  {
    name: "Message History",
    path: "/merchant/message-history",
    icon: faClockRotateLeft,
  },
  {
    name: "Subscriptions",
    path: "/merchant/subscriptions",
    icon: faBolt,
  },
  {
    name: "Payment History",
    path: "/merchant/payment-history",
    icon: faCreditCard,
  },
  {
    name: "Device",
    path: "/merchant/device",
    icon: faComputer,
  },
  {
    name: "Merchant Profile",
    path: "/merchant/profile",
    icon: faUser,
  },
];

export const adminNavigation = [
  {
    name: "Dashboard",
    path: "/admin/dashboard",
    icon: faHouse,
  },
  {
    name: "Connections",
    path: "/admin/dashboard/connections",
    icon: faLink,
  },
  {
    name: "Merchants",
    path: "/admin/dashboard/merchants",
    icon: faStore,
  },
];

export const heroIcons = [
  "/assets/home-smile.svg",
  "/assets/file-02.svg",
  "/assets/search-md.svg",
  "/assets/plus-square.svg",
];

export const notificationImages = [
  "/assets/notification/image-1.png",
  "/assets/notification/image-2.png",
  "/assets/notification/image-2.png",
];

export const collabText =
  "Kami memastikan layanan kami dapat digunakan dengan mudah bahkan untuk orang awam. hanya perlu melakukan beberapa langkah, anda siap memantau jalannya bisnis anda";

export const collabContent = [
  {
    id: "0",
    title: "Mudah digunakan",
    text: collabText,
  },
  {
    id: "1",
    title: "Kompatible di Berbagai Perangkat",
  },
  {
    id: "2",
    title: "Menjaga Privasi Pengguna",
  },
  {
    id: "3",
    title: "Harga terjangkau",
  },
];

export const collabApps = [
  {
    id: "0",
    title: "Figma",
    icon: "/assets/collaboration/figma.png",
    width: 26,
    height: 36,
  },
  {
    id: "1",
    title: "Notion",
    icon: "/assets/collaboration/notion.png",
    width: 34,
    height: 36,
  },
  {
    id: "2",
    title: "Discord",
    icon: "/assets/collaboration/discord.png",
    width: 36,
    height: 28,
  },
  {
    id: "3",
    title: "Slack",
    icon: "/assets/collaboration/slack.png",
    width: 34,
    height: 35,
  },
  {
    id: "4",
    title: "Photoshop",
    icon: "/assets/collaboration/photoshop.png",
    width: 34,
    height: 34,
  },
  {
    id: "5",
    title: "Protopie",
    icon: "/assets/collaboration/protopie.png",
    width: 34,
    height: 34,
  },
  {
    id: "6",
    title: "Framer",
    icon: "/assets/collaboration/framer.png",
    width: 26,
    height: 34,
  },
  {
    id: "7",
    title: "Raindrop",
    icon: "/assets/collaboration/raindrop.png",
    width: 38,
    height: 32,
  },
];

export const pricing = [
  {
    id: "0",
    title: "Basic",
    description: "AI chatbot, personalized recommendations",
    price: "0",
    features: [
      "An AI chatbot that can understand your queries",
      "Personalized recommendations based on your preferences",
      "Ability to explore the app and its features without any cost",
    ],
  },
  {
    id: "1",
    title: "Premium",
    description: "Advanced AI chatbot, priority support, analytics dashboard",
    price: "9.99",
    features: [
      "An advanced AI chatbot that can understand complex queries",
      "An analytics dashboard to track your conversations",
      "Priority support to solve issues quickly",
    ],
  },
  {
    id: "2",
    title: "Enterprise",
    description: "Custom AI chatbot, advanced analytics, dedicated account",
    price: null,
    features: [
      "An AI chatbot that can understand your queries",
      "Personalized recommendations based on your preferences",
      "Ability to explore the app and its features without any cost",
    ],
  },
];

export const benefits = [
  {
    id: "0",
    title: "Pesan Otomatis",
    text: "Kirim pesan peringatan kepada pelanggan secara otomatis dengan jadwal yang bisa diatur sendiri",
    backgroundUrl: "/assets/benefits/card-1.svg",
    iconUrl: faMessage,
    imageUrl: "/assets/benefits/card-bg-3.png",
  },
  {
    id: "1",
    title: "Analisa dan Pelaporan",
    text: "Dapatkan laporan hasil analisa terkait bisnis anda dalam kurun waktu tertentu",
    backgroundUrl: "/assets/benefits/card-2.svg",
    iconUrl: faChartSimple,
    imageUrl: "/assets/benefits/card-bg-3.png",
    light: true,
  },
  {
    id: "2",
    title: "Feedback Customer",
    text: "Dapatkan umpan balik dari pelanggan tentang produk anda agar menjadi bahan evaluasi dari bisnis anda",
    backgroundUrl: "/assets/benefits/card-3.svg",
    iconUrl: faUsersRays,
    imageUrl: "/assets/benefits/card-bg-3.png",
  },
  {
    id: "3",
    title: "Promotion",
    text: "Kirim pesan promosi dari merchant mu semudah pilih pelanggan > tulis pesan > lalu kirim",
    backgroundUrl: "/assets/benefits/card-4.svg",
    iconUrl: faBullhorn,
    imageUrl: "/assets/benefits/card-bg-3.png",
    light: true,
  },
  {
    id: "4",
    title: "News",
    text: "Kirim berita pada pelangganmu dengan mudah hanya dengan BOLO, pilih pelanggan > tulis pesan > lalu kirim",
    backgroundUrl: "/assets/benefits/card-5.svg",
    iconUrl: faNewspaper,
    imageUrl: "/assets/benefits/card-bg-3.png",
  },
  {
    id: "5",
    title: "Event",
    text: "Kirim informasi event pada pelangganmu dengan mudah hanya dengan BOLO, pilih pelanggan > tulis pesan > lalu kirim",
    backgroundUrl: "/assets/benefits/card-6.svg",
    iconUrl: faTags,
    imageUrl: "/assets/benefits/card-bg-3.png",
  },
];

export const socials = [
  {
    id: "0",
    title: "Discord",
    iconUrl: "/assets/socials/discord.svg",
    url: "#",
  },
  {
    id: "1",
    title: "Twitter",
    iconUrl: "/assets/socials/twitter.svg",
    url: "#",
  },
  {
    id: "2",
    title: "Instagram",
    iconUrl: "/assets/socials/instagram.svg",
    url: "#",
  },
  {
    id: "3",
    title: "Telegram",
    iconUrl: "/assets/socials/telegram.svg",
    url: "#",
  },
  {
    id: "4",
    title: "Facebook",
    iconUrl: "/assets/socials/facebook.svg",
    url: "#",
  },
];
