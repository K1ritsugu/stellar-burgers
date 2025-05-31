import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getOrderByNumberApi } from '@api';
import { TOrder } from '@utils-types';

export interface OrderState {
  isLoading: boolean;
  order: TOrder | null;
  error: string | null;
}

const initialOrderState: OrderState = {
  isLoading: false,
  order: null,
  error: null
};

export const getOrderThunk = createAsyncThunk(
  'feed/getOrder',
  (orderNumber: number) => getOrderByNumberApi(orderNumber)
);

const orderSlice = createSlice({
  name: 'order',
  initialState: initialOrderState,
  reducers: {},
  selectors: {
    getOrderSelector: (state) => state
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrderThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getOrderThunk.rejected, (state, { error }) => {
        state.isLoading = false;
        state.error = error.message as string;
      })
      .addCase(getOrderThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = null;
        state.order = payload.orders[0];
      });
  }
});

export { initialOrderState as orderInitialState };
export const { getOrderSelector } = orderSlice.selectors;
export default orderSlice.reducer;
