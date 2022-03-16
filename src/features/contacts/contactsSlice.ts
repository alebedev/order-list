import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

// NOTE: Simplified, in real life there're multiple lines,  etc
export type Address = {
  street: string;
  city: string;
  country: string;
  postalCode: string;
};

export type ContactsState = {
  email: string;
  phone: string;
  shipping: Address;
  invoice: Address;
};

const initialState: ContactsState = {
  email: "annaanne@qliro.com",
  phone: "+46721234567",
  shipping: {
    street: "Qlirovägen 123",
    city: "Stockholm",
    country: "Sweden",
    postalCode: "12345",
  },
  invoice: {
    street: "Qlirovägen 123",
    city: "Stockholm",
    country: "Sweden",
    postalCode: "12345",
  },
};

export const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {},
});

export const selectContacts = (state: RootState) => state.contacts;

export default contactsSlice.reducer;
