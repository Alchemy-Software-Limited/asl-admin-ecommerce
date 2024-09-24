import type { PayloadAction } from '@reduxjs/toolkit';

import { createSlice } from '@reduxjs/toolkit';

import { encrypt } from 'src/utils/encrypt';

// Define the User interface
interface User {
  token?: string;
  id?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
  isVerified?: boolean;
  gender?: string;
  picture?: string;
}

// Define the initial state type
export interface AuthState {
  user: User | null;
}

const initialState: AuthState = {
  user: null,
};

// Define the auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (
      state: AuthState,
      action: PayloadAction<{ token: string; id: string; [key: string]: any }>
    ) => {
      const { token, id, ...rest } = action.payload;
      state.user = {
        token: encrypt(token),
        id: encrypt(id),
        ...rest,
      };
    },
    setProfileData: (state: AuthState, action: PayloadAction<Partial<User>>) => {
      state.user = {
        ...state.user,
        ...action.payload,
      };
    },
    googleLoginSuccess: (state, action: PayloadAction<{ token: string; [key: string]: any }>) => {
      const { token, ...rest } = action.payload;
      state.user = {
        email: rest.email,
        firstName: rest.given_name,
        lastName: rest.family_name,
        token: encrypt(token),
        avatar: rest.picture,
        isVerified: rest.email_verified,
      };
    },
    logout: (state) => {
      state.user = null;
    },
    updateInfo: (
      state,
      action: PayloadAction<Pick<User, 'firstName' | 'lastName' | 'gender' | 'avatar'>>
    ) => {
      const { firstName, lastName, gender, avatar } = action.payload;
      if (state.user) {
        state.user = {
          ...state.user,
          firstName,
          lastName,
          gender,
          avatar,
        };
      }
    },
    verifyUser: (state, action: PayloadAction<{ isVerified: boolean }>) => {
      if (state.user) {
        state.user = {
          ...state.user,
          isVerified: action.payload.isVerified,
        };
      }
    },
  },
});

export const { googleLoginSuccess, login, logout, updateInfo, verifyUser, setProfileData } =
  authSlice.actions;
export default {
  authReduces: authSlice.reducer,
};
