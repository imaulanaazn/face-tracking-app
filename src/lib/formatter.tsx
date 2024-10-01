function formatDateToIndonesian({
  isoDate,
  includeTime,
}: {
  isoDate: string;
  includeTime: boolean;
}): string {
  const indonesianMonths = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  const date = new Date(isoDate);

  const day = date.getDate();
  const month = indonesianMonths[date.getMonth()];
  const year = date.getFullYear();

  // Extract hours and minutes
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  // Format with time included
  if (includeTime) {
    return `${day} ${month} ${year} - ${hours}:${minutes}`;
  }
  return `${day} ${month} ${year}`;
}

export function formatDate(isoDate: string): string {
  const date = new Date(isoDate);
  return date.toLocaleDateString();
}

export let IDRRupiah = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
});

export default formatDateToIndonesian;
