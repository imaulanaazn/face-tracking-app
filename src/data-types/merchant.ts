interface IMerchant {
  id: string;
  name: string;
  logo: string | null;
  street: string;
  district: string | null;
  city: string | null;
  province: string | null;
  country: string | null;
  dateCreated: Date;
  lastUpdated: Date;
}
