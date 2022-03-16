import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { fetchOrders } from "./ordersApi";

export enum OrderType {
  Online = "Online",
  Instore = "Instore",
  Manual = "Manual",
}

export enum PaymentMethod {
  Qliro = "Qliro",
  Visa = "Visa",
  Master = "Master",
  Amex = "Amex",
  Paypal = "Paypal",
  Trustly = "Trustly",
}

export enum PaymentStatus {
  InProgress = "InProgress",
  Paid = "Paid",
  Failed = "Failed",
}

export type Order = {
  id: string;
  num: string;
  type: OrderType;
  createdAt: string;
  flagged?: boolean;
  store: {
    name: string;
    country: string;
  };
  payment: {
    method: PaymentMethod;
    displayName: string;
    status: PaymentStatus;
    amount: {
      // Should not use float for money
      value: string;
      currency: string;
    };
  };
};

export type OrdersState = {
  value?: Order[];
  status: "idle" | "loading" | "failed";
  page: number;
  totalPages?: number;
};

const initialState: OrdersState = {
  status: "idle",
  page: 0,
};

export const fetchOrdersAction = createAsyncThunk(
  "orders/fetch",
  async (page: number) => {
    return await fetchOrders(page);
  }
);

export const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrdersAction.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchOrdersAction.fulfilled, (state, action) => {
        state.status = "idle";
        Object.assign(state, action.payload);
      });
  },
});

export const selectOrders = (state: RootState) => state.orders;

export default ordersSlice.reducer;
