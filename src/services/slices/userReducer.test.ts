import { expect, test, describe } from '@jest/globals';
import { configureStore } from '@reduxjs/toolkit';
import userReducer, {
  loginUserThunk,
  registerUserThunk,
  logoutUserThunk,
  updateUserThunk,
  forgotPasswordThunk,
  resetPasswordThunk,
  getUserThunk
} from './userSlice';

const setupStore = () =>
  configureStore({
    reducer: { user: userReducer }
  });

describe('user slice', () => {
  describe('login thunk', () => {
    test('pending sets loading', () => {
      const store = setupStore();
      store.dispatch({ type: loginUserThunk.pending.type });
      const { user } = store.getState();
      expect(user.isLoadong).toBeTruthy();
      expect(user.error).toBeNull();
    });

    test('rejected stores error', () => {
      const store = setupStore();
      const error = 'mocked error';
      store.dispatch({ type: loginUserThunk.rejected.type, error: { message: error } });
      const { user } = store.getState();
      expect(user.isLoadong).toBeFalsy();
      expect(user.error).toBe(error);
    });

    test('fulfilled saves user and flag', () => {
      const payload = { accessToken: 'a', refreshToken: 'r', user: { email: 'e', name: 'n' } };
      const store = setupStore();
      store.dispatch({ type: loginUserThunk.fulfilled.type, payload });
      const { user } = store.getState();
      expect(user.isLoadong).toBeFalsy();
      expect(user.error).toBeNull();
      expect(user.user).toEqual(payload.user);
      expect(user.isAuthorized).toBeTruthy();
    });
  });

  describe('register thunk', () => {
    test('pending sets loading', () => {
      const store = setupStore();
      store.dispatch({ type: registerUserThunk.pending.type });
      const { user } = store.getState();
      expect(user.isLoadong).toBeTruthy();
      expect(user.error).toBeNull();
    });

    test('rejected stores error', () => {
      const store = setupStore();
      const error = 'mocked error';
      store.dispatch({ type: registerUserThunk.rejected.type, error: { message: error } });
      const { user } = store.getState();
      expect(user.isLoadong).toBeFalsy();
      expect(user.error).toBe(error);
    });

    test('fulfilled saves user and flag', () => {
      const payload = { accessToken: 'a', refreshToken: 'r', user: { email: 'e', name: 'n' } };
      const store = setupStore();
      store.dispatch({ type: registerUserThunk.fulfilled.type, payload });
      const { user } = store.getState();
      expect(user.isLoadong).toBeFalsy();
      expect(user.error).toBeNull();
      expect(user.user).toEqual(payload.user);
      expect(user.isAuthorized).toBeTruthy();
    });
  });

  describe('logout thunk', () => {
    test('pending sets loading', () => {
      const store = setupStore();
      store.dispatch({ type: logoutUserThunk.pending.type });
      const { user } = store.getState();
      expect(user.isLoadong).toBeTruthy();
      expect(user.error).toBeNull();
    });

    test('rejected stores error', () => {
      const store = setupStore();
      const error = 'mocked error';
      store.dispatch({ type: logoutUserThunk.rejected.type, error: { message: error } });
      const { user } = store.getState();
      expect(user.isLoadong).toBeFalsy();
      expect(user.error).toBe(error);
    });

    test('fulfilled resets user data', () => {
      const payload = { message: 'ok' };
      const store = setupStore();
      store.dispatch({ type: logoutUserThunk.fulfilled.type, payload });
      const { user } = store.getState();
      expect(user.isLoadong).toBeFalsy();
      expect(user.error).toBeNull();
      expect(user.user).toBeNull();
      expect(user.isAuthorized).toBeFalsy();
    });
  });

  describe('update thunk', () => {
    test('pending sets loading', () => {
      const store = setupStore();
      store.dispatch({ type: updateUserThunk.pending.type });
      const { user } = store.getState();
      expect(user.isLoadong).toBeTruthy();
      expect(user.error).toBeNull();
    });

    test('rejected stores error', () => {
      const store = setupStore();
      const error = 'mocked error';
      store.dispatch({ type: updateUserThunk.rejected.type, error: { message: error } });
      const { user } = store.getState();
      expect(user.isLoadong).toBeFalsy();
      expect(user.error).toBe(error);
    });

    test('fulfilled updates user', () => {
      const payload = { user: { email: 'x', name: 'y' } };
      const store = setupStore();
      store.dispatch({ type: updateUserThunk.fulfilled.type, payload });
      const { user } = store.getState();
      expect(user.isLoadong).toBeFalsy();
      expect(user.error).toBeNull();
      expect(user.user).toEqual(payload.user);
      expect(user.isAuthorized).toBeTruthy();
    });
  });

  describe('forgotPassword thunk', () => {
    test('pending sets loading', () => {
      const store = setupStore();
      store.dispatch({ type: forgotPasswordThunk.pending.type });
      const { user } = store.getState();
      expect(user.isLoadong).toBeTruthy();
      expect(user.error).toBeNull();
    });

    test('rejected stores error', () => {
      const store = setupStore();
      const error = 'mocked error';
      store.dispatch({ type: forgotPasswordThunk.rejected.type, error: { message: error } });
      const { user } = store.getState();
      expect(user.isLoadong).toBeFalsy();
      expect(user.error).toBe(error);
    });

    test('fulfilled keeps anonymous state', () => {
      const payload = { message: 'mail sent' };
      const store = setupStore();
      store.dispatch({ type: forgotPasswordThunk.fulfilled.type, payload });
      const { user } = store.getState();
      expect(user.isLoadong).toBeFalsy();
      expect(user.error).toBeNull();
      expect(user.user).toBeNull();
      expect(user.isAuthorized).toBeFalsy();
    });
  });

  describe('resetPassword thunk', () => {
    test('pending sets loading', () => {
      const store = setupStore();
      store.dispatch({ type: resetPasswordThunk.pending.type });
      const { user } = store.getState();
      expect(user.isLoadong).toBeTruthy();
      expect(user.error).toBeNull();
    });

    test('rejected stores error', () => {
      const store = setupStore();
      const error = 'mocked error';
      store.dispatch({ type: resetPasswordThunk.rejected.type, error: { message: error } });
      const { user } = store.getState();
      expect(user.isLoadong).toBeFalsy();
      expect(user.error).toBe(error);
    });

    test('fulfilled keeps anonymous state', () => {
      const payload = { message: 'ok' };
      const store = setupStore();
      store.dispatch({ type: resetPasswordThunk.fulfilled.type, payload });
      const { user } = store.getState();
      expect(user.isLoadong).toBeFalsy();
      expect(user.error).toBeNull();
      expect(user.user).toBeNull();
      expect(user.isAuthorized).toBeFalsy();
    });
  });

  describe('getUser thunk', () => {
    test('pending sets loading', () => {
      const store = setupStore();
      store.dispatch({ type: getUserThunk.pending.type });
      const { user } = store.getState();
      expect(user.isLoadong).toBeTruthy();
      expect(user.error).toBeNull();
    });

    test('rejected stores error', () => {
      const store = setupStore();
      const error = 'mocked error';
      store.dispatch({ type: getUserThunk.rejected.type, error: { message: error } });
      const { user } = store.getState();
      expect(user.isLoadong).toBeFalsy();
      expect(user.error).toBe(error);
    });

    test('fulfilled stores user and flag', () => {
      const payload = { user: { email: 'e', name: 'n' } };
      const store = setupStore();
      store.dispatch({ type: getUserThunk.fulfilled.type, payload });
      const { user } = store.getState();
      expect(user.isLoadong).toBeFalsy();
      expect(user.error).toBeNull();
      expect(user.user).toEqual(payload.user);
      expect(user.isAuthorized).toBeTruthy();
    });
  });
});
