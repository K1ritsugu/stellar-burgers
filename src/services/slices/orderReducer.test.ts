import { expect, test, describe } from '@jest/globals';
import { configureStore } from '@reduxjs/toolkit';
import orderReducer, { getOrderThunk } from './orderSlice';

const setupStore = () =>
  configureStore({
    reducer: { order: orderReducer }
  });

describe('order slice', () => {
  describe('getOrder thunk', () => {
    test('pending sets loading', () => {
      const store = setupStore();
      store.dispatch({ type: getOrderThunk.pending.type });
      const { order } = store.getState();
      expect(order.isLoading).toBeTruthy();
      expect(order.error).toBeNull();
    });

    test('rejected stores error', () => {
      const store = setupStore();
      const error = 'mocked error';
      store.dispatch({
        type: getOrderThunk.rejected.type,
        error: { message: error }
      });
      const { order } = store.getState();
      expect(order.isLoading).toBeFalsy();
      expect(order.error).toBe(error);
    });

    test('fulfilled saves order', () => {
      const payload = {
        orders: [
          {
            _id: 'id',
            ingredients: [],
            owner: 'x',
            status: 'done',
            name: 'z',
            createdAt: '',
            updatedAt: '',
            number: 3
          }
        ]
      };
      const store = setupStore();
      store.dispatch({ type: getOrderThunk.fulfilled.type, payload });
      const { order } = store.getState();
      expect(order.isLoading).toBeFalsy();
      expect(order.error).toBeNull();
      expect(order.order).toEqual(payload.orders[0]);
    });
  });
});
