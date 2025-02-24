import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the user object structure
interface User {
  id?: string;
  name?: string;
  email?: string;
  status?: string;
  isVerified?: boolean;
  role?: string;
}

// Define the initial state structure
interface UserState {
  isAuthenticated: boolean;
  user: User | null;
  count: number;
  isInitialized: boolean;
  followingShops: string[];
}

// Initial state
const initialState: UserState = {
  isAuthenticated: false,
  user: null,
  count: 0,
  isInitialized: false,
  followingShops: [],
};

// Slice
export const UserReducer = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLogin(state, action: PayloadAction<User>) {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    setLogout(state) {
      state.user = null;
      state.isAuthenticated = false;
    },
    setCount(state) {
      state.count += 1;
    },
    setInitialize(state) {
      state.isInitialized = true;
    },
    updateStatus(state, action: PayloadAction<string>) {
      if (state.user) {
        state.user.status = action.payload;
      }
    },
    verifyUser(state) {
      if (state.user) {
        state.user.isVerified = true;
      }
    },
    updateUserRole(state) {
      if (state.user) {
        state.user.role = 'vendor';
      }
    },
    updateFollowShop(state, action: PayloadAction<string>) {
      const filtered = state.followingShops.filter((v) => v === action.payload);
      if (filtered.length) {
        state.followingShops = state.followingShops.filter(
          (v) => v !== action.payload
        );
      } else {
        state.followingShops.push(action.payload);
      }
    },
  },
});

// Actions
export const {
  setLogin,
  setLogout,
  setCount,
  setInitialize,
  updateStatus,
  verifyUser,
  updateUserRole,
  updateFollowShop,
} = UserReducer.actions;
