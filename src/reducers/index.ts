// WARNING: DO NOT DELETE ANY BOILERPLATE COMMENTS IN THIS FILE (start with //-- )
// IF YOU DO, GENERATED REDUCERS WILL NOT BE WIRED UP AUTOMATICALLY.

import {
  type Action,
  configureStore,
  type ThunkAction,
} from '@reduxjs/toolkit';
//-- importRef
import {
  type TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from 'react-redux';

import AppSlice from './app/slice';
import TodosSlice from './todos/slice';

export const store = configureStore({
  reducer: {
    app: AppSlice,
    todos: TodosSlice,
    //-- reducerRef
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
