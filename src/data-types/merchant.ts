interface IMerchant {
  id: string;
  name: string;
  logo: string | null;
  street: string | null;
  district: string | null;
  city: string | null;
  province: string | null;
  country: string | null;
  dateCreated: Date | string;
  lastUpdated: Date | null;
}
