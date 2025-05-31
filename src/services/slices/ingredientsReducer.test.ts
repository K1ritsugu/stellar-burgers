import { expect, test, describe } from '@jest/globals';
import { configureStore } from '@reduxjs/toolkit';
import ingredientsReducer, { getIngredientsThunk } from './ingredientsSlice';

const setupStore = () =>
  configureStore({
    reducer: { ingredients: ingredientsReducer }
  });

describe('ingredients slice', () => {
  describe('getIngredients thunk', () => {
    test('pending sets loading', () => {
      const store = setupStore();
      store.dispatch({ type: getIngredientsThunk.pending.type });
      const { ingredients } = store.getState();
      expect(ingredients.isLoading).toBeTruthy();
      expect(ingredients.error).toBeNull();
    });

    test('rejected stores error', () => {
      const store = setupStore();
      const error = 'mocked error';
      store.dispatch({
        type: getIngredientsThunk.rejected.type,
        error: { message: error }
      });
      const { ingredients } = store.getState();
      expect(ingredients.isLoading).toBeFalsy();
      expect(ingredients.error).toBe(error);
    });

    test('fulfilled saves list', () => {
      const payload = {
        _id: 'id',
        name: 'bun',
        type: 'bun',
        proteins: 0,
        fat: 0,
        carbohydrates: 0,
        calories: 0,
        price: 100,
        image: '',
        image_mobile: '',
        image_large: ''
      };
      const store = setupStore();
      store.dispatch({ type: getIngredientsThunk.fulfilled.type, payload });
      const { ingredients } = store.getState();
      expect(ingredients.isLoading).toBeFalsy();
      expect(ingredients.error).toBeNull();
      expect(ingredients.ingredients).toEqual(payload);
    });
  });
});
