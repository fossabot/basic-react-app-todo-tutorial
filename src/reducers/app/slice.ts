import { AppService } from 'services/app';
import type { UserInfo } from 'services/types';

import { createAppSlice } from '../createAppSlice';

interface State {
  userInfo: UserInfo | null;
  loading: boolean;
  error: string | null;
}

const initialState: State = {
  userInfo: null,
  loading: false,
  error: null,
};

export const AppSlice = createAppSlice({
  name: 'app',
  initialState,
  reducers: (create) => ({
    loadUserInfo: create.asyncThunk<UserInfo, void>(
      async () => await AppService.loadUserInfo(),
      {
        pending: (state) => {
          state.loading = true;
          state.error = null;
        },
        fulfilled: (state, { payload }) => {
          state.loading = false;
          state.userInfo = payload;
        },
        rejected: (state, action) => {
          state.loading = false;
          state.error = action.error.message ?? 'Failed to load user';
        },
      },
    ),
  }),
  selectors: {
    selectUserInfo: (state) => state.userInfo,
    selectUserLoading: (state) => state.loading,
    selectUserError: (state) => state.error,
  },
});

export const { loadUserInfo } = AppSlice.actions;
export const { selectUserInfo, selectUserLoading, selectUserError } =
  AppSlice.selectors;

export default AppSlice.reducer;
