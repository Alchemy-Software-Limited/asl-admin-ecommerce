import { combineReducers } from 'redux';

import authReducer from './auth.reducer';
import customizationReducer from './customization.reducer';

import type { AuthState } from './auth.reducer';
import type { CustomizationState } from './customization.reducer';

// Define the root state type by combining all reducer states
export interface RootState {
  customization: CustomizationState;
  auth: AuthState;
}

// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
  customization: customizationReducer,
  auth: authReducer,
});

export default reducer;
