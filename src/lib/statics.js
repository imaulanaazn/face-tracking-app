import {
  faAd,
  faBolt,
  faBullhorn,
  faCalendar,
  faChartBar,
  faChartPie,
  faChartSimple,
  faClockRotateLeft,
  faComputer,
  faCreditCard,
  faDatabase,
  faExpand,
  faHouse,
  faLink,
  faMessage,
  faNewspaper,
  faPaperPlane,
  faShieldHalved,
  faSitemap,
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
    url: "/#features",
  },
  {
    id: "1",
    title: "Benefits",
    url: "/#the-benefits",
  },
  {
    id: "2",
    title: "Pricing",
    url: "/#pricing",
  },
  {
    id: "3",
    title: "Contacts",
    url: "/#contacts",
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
    name: "Bolo Numbers",
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
    icon: faPaperPlane,
    width: 26,
    height: 36,
  },
  {
    id: "1",
    title: "Notion",
    icon: faShieldHalved,
    width: 34,
    height: 36,
  },
  {
    id: "2",
    title: "Discord",
    icon: faBolt,
    width: 36,
    height: 28,
  },
  {
    id: "3",
    title: "Slack",
    icon: faChartBar,
    width: 34,
    height: 35,
  },
  {
    id: "4",
    title: "Photoshop",
    icon: faDatabase,
    width: 34,
    height: 34,
  },
  {
    id: "5",
    title: "Protopie",
    icon: faExpand,
    width: 34,
    height: 34,
  },
  {
    id: "6",
    title: "Framer",
    icon: faSitemap,
    width: 26,
    height: 34,
  },
  {
    id: "7",
    title: "Raindrop",
    icon: faCalendar,
    width: 38,
    height: 32,
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

export const dashboardStatsTimeRange = [
  {
    value: "today",
    text: "Today",
  },
  {
    value: "thisWeek",
    text: "This Week",
  },
  {
    value: "thisMonth",
    text: "This Month",
  },
  {
    value: "thisYear",
    text: "This Year",
  },
];

export const DashboardStatsTimeFreq = [
  {
    value: "month",
    text: "Month",
  },
  {
    value: "week",
    text: "Week",
  },
  {
    value: "day",
    text: "Day",
  },
  {
    value: "hour",
    text: "Hour",
  },
  {
    value: "minute",
    text: "Minute",
  },
];

export const dashboardStatsBreakpoints = {
  0: {
    slidesPerView: 1.4,
    spaceBetween: 20,
  },
  640: {
    slidesPerView: 1.5,
    spaceBetween: 30,
  },
  768: {
    slidesPerView: 2.3,
    spaceBetween: 35,
  },
  1024: {
    slidesPerView: 3,
    spaceBetween: 30,
  },
};
