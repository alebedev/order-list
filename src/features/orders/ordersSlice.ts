import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
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
  pagesTotal?: number;
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
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    nextPage: (state) => {
      console.log("next", state);
      if (!state.pagesTotal) {
        return;
      }
      state.page = Math.min(state.page + 1, state.pagesTotal - 1);
    },
    prevPage: (state) => {
      state.page = Math.max(0, state.page - 1);
    },
  },
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
