import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
}

const initialState: UserState | null = null;

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state: UserState | null, action: PayloadAction<UserState>) => {
      if (state) {
        state.id = action.payload.id;
        state.name = action.payload.name;
        state.email = action.payload.email;
        state.avatarUrl = action.payload.avatarUrl;
      } else {
        state = initialState;
      }
    },
    clearUser: () => null,
  },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
