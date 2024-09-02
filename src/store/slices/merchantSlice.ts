import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: IMerchant = {
  id: "",
  name: "",
  logo: "",
  street: null,
  district: null,
  city: null,
  province: null,
  country: null,
  dateCreated: "",
  lastUpdated: null,
};

const merchantSlice = createSlice({
  name: "merchant",
  initialState,
  reducers: {
    setMerchant: (state: IMerchant, action: PayloadAction<IMerchant>) => {
      if (action.payload) {
        state.id = action.payload.id;
        state.name = action.payload.name;
        state.logo = action.payload.logo;
        state.street = action.payload.street;
        state.district = action.payload.district;
        state.city = action.payload.city;
        state.province = action.payload.province;
        state.country = action.payload.country;
        state.dateCreated = action.payload.dateCreated;
        state.lastUpdated = action.payload.lastUpdated;
      } else {
        state = initialState;
      }
    },
    clearMerchant: () => initialState,
  },
});

export const { setMerchant, clearMerchant } = merchantSlice.actions;

export default merchantSlice.reducer;
