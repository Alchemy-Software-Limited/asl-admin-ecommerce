// eslint-disable-next-line import/no-extraneous-dependencies
import { createSelector } from 'reselect';

import type { RootState } from './reducer';

// Define the selector functions with appropriate types
const selectUser = (state: RootState) => state.auth;
const selectCustomization = (state: RootState) => state.customization;

// Selectors with type annotations
export const selectCurrentUser = createSelector([selectUser], (auth) => (auth ? auth.user : null));

export const selectCurrentMode = createSelector([selectCustomization], (data) => data);
