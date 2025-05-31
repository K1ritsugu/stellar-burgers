import { createSlice, createAsyncThunk, nanoid } from '@reduxjs/toolkit';
import { TConstructorIngredient, TOrder } from '@utils-types';
import { orderBurgerApi } from '@api';

export interface constructorState {
  isLoading: boolean;
  constructorItems: {
    bun: TConstructorIngredient | null;
    ingredients: TConstructorIngredient[];
  };
  orderRequest: boolean;
  orderModalData: TOrder | null;
  error: string | null;
}

const initialConstructorState: constructorState = {
  isLoading: false,
  constructorItems: {
    bun: null,
    ingredients: []
  },
  orderRequest: false,
  orderModalData: null,
  error: null
};

export const sendOrderThunk = createAsyncThunk(
  'constructorbg/sendOrder',
  (ids: string[]) => orderBurgerApi(ids)
);

const constructorSlice = createSlice({
  name: 'constructorbg',
  initialState: initialConstructorState,
  reducers: {
    addIngredient(state, { payload }) {
      if (payload.type === 'bun') {
        state.constructorItems.bun = payload;
      } else {
        state.constructorItems.ingredients.push({ ...payload, id: nanoid() });
      }
    },
    removeIngredient(state, { payload }) {
      state.constructorItems.ingredients =
        state.constructorItems.ingredients.filter((i) => i.id !== payload);
    },
    setOrderRequest(state, { payload }) {
      state.orderRequest = payload;
    },
    setNullOrderModalData(state) {
      state.orderModalData = null;
    },
    moveIngredientDown(state, { payload }) {
      const arr = state.constructorItems.ingredients;
      [arr[payload], arr[payload + 1]] = [arr[payload + 1], arr[payload]];
    },
    moveIngredientUp(state, { payload }) {
      const arr = state.constructorItems.ingredients;
      [arr[payload], arr[payload - 1]] = [arr[payload - 1], arr[payload]];
    }
  },
  selectors: {
    getConstructorSelector: (state) => state
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendOrderThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(sendOrderThunk.rejected, (state, { error }) => {
        state.isLoading = false;
        state.error = error.message as string;
      })
      .addCase(sendOrderThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = null;
        state.orderRequest = false;
        state.orderModalData = payload.order;
        state.constructorItems = { bun: null, ingredients: [] };
      });
  }
});

export { initialConstructorState as constructorInitialState };
export const {
  addIngredient,
  removeIngredient,
  setOrderRequest,
  setNullOrderModalData,
  moveIngredientDown,
  moveIngredientUp
} = constructorSlice.actions;
export const { getConstructorSelector } = constructorSlice.selectors;
export default constructorSlice.reducer;
