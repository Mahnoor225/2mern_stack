import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserDetails: (state, action) => {
      state.user = action.payload;
      console.log("userdetail", action.payload);
    },
    logoutUser: (state) => {
      state.user = null;
    }
  },
});

export const { setUserDetails, logoutUser } = userSlice.actions;
export default userSlice.reducer;
