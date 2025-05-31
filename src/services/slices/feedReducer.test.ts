import { expect, test, describe } from '@jest/globals';
import { configureStore } from '@reduxjs/toolkit';
import feedReducer, { getFeedThunk, getOrdersThunk } from './feedSlice';

const setupStore = () =>
  configureStore({
    reducer: { feed: feedReducer }
  });

describe('feed slice', () => {
  describe('getFeed thunk', () => {
    test('pending sets loading', () => {
      const store = setupStore();
      store.dispatch({ type: getFeedThunk.pending.type });
      const { feed } = store.getState();
      expect(feed.isLoading).toBeTruthy();
      expect(feed.error).toBeNull();
    });

    test('rejected stores error', () => {
      const store = setupStore();
      const error = 'mocked error';
      store.dispatch({
        type: getFeedThunk.rejected.type,
        error: { message: error }
      });
      const { feed } = store.getState();
      expect(feed.isLoading).toBeFalsy();
      expect(feed.error).toBe(error);
    });

    test('fulfilled saves data', () => {
      const payload = {
        orders: { _id: 'id', ingredients: [], status: 'done', name: 'x', createdAt: '', updatedAt: '', number: 1 },
        total: 10,
        totalToday: 2
      };
      const store = setupStore();
      store.dispatch({ type: getFeedThunk.fulfilled.type, payload });
      const { feed } = store.getState();
      expect(feed.isLoading).toBeFalsy();
      expect(feed.error).toBeNull();
      expect(feed.orders).toEqual(payload.orders);
      expect(feed.total).toBe(payload.total);
      expect(feed.totalToday).toBe(payload.totalToday);
    });
  });

  describe('getProfileFeed thunk', () => {
    test('pending sets loading', () => {
      const store = setupStore();
      store.dispatch({ type: getOrdersThunk.pending.type });
      const { feed } = store.getState();
      expect(feed.isLoading).toBeTruthy();
      expect(feed.error).toBeNull();
    });

    test('rejected stores error', () => {
      const store = setupStore();
      const error = 'mocked error';
      store.dispatch({
        type: getOrdersThunk.rejected.type,
        error: { message: error }
      });
      const { feed } = store.getState();
      expect(feed.isLoading).toBeFalsy();
      expect(feed.error).toBe(error);
    });

    test('fulfilled saves orders', () => {
      const payload = { _id: 'id', ingredients: [], status: 'done', name: 'y', createdAt: '', updatedAt: '', number: 2 };
      const store = setupStore();
      store.dispatch({ type: getOrdersThunk.fulfilled.type, payload });
      const { feed } = store.getState();
      expect(feed.isLoading).toBeFalsy();
      expect(feed.error).toBeNull();
      expect(feed.orders).toEqual(payload);
    });
  });
});
