import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export type UserState = {
  id: string;
  firstName: string;
  lastName: string;
  displayName: string;
};

const initialState: UserState = {
  id: "19901230-4567",
  firstName: "Anna",
  lastName: "Anne",
  displayName: "Anna Anne",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
});

export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
