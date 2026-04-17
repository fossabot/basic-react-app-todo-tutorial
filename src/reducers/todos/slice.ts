import { AppService } from 'services/app';
import type { Todo, TodoData } from 'services/types';

import { createAppSlice } from '../createAppSlice';

interface State {
  items: Todo[];
  loading: boolean;
  saving: boolean;
  error: string | null;
}

const initialState: State = {
  items: [],
  loading: false,
  saving: false,
  error: null,
};

export const TodosSlice = createAppSlice({
  name: 'todos',
  initialState,
  reducers: (create) => ({
    loadTodos: create.asyncThunk<Todo[], void>(
      async () => await AppService.loadTodos(),
      {
        pending: (state) => {
          state.loading = true;
          state.error = null;
        },
        fulfilled: (state, { payload }) => {
          state.loading = false;
          state.items = payload;
        },
        rejected: (state, action) => {
          state.loading = false;
          state.error = action.error.message ?? 'Failed to load todos';
        },
      },
    ),

    createTodo: create.asyncThunk<Todo, TodoData>(
      async (data) => await AppService.createTodo(data),
      {
        pending: (state) => {
          state.saving = true;
        },
        fulfilled: (state, { payload }) => {
          state.saving = false;
          state.items = [payload, ...state.items];
        },
        rejected: (state, action) => {
          state.saving = false;
          state.error = action.error.message ?? 'Failed to create todo';
        },
      },
    ),

    updateTodo: create.asyncThunk<Todo, { id: string; data: TodoData }>(
      async ({ id, data }) => await AppService.updateTodo(id, data),
      {
        pending: (state) => {
          state.saving = true;
        },
        fulfilled: (state, { payload }) => {
          state.saving = false;
          state.items = state.items.map((t) =>
            t.id === payload.id ? payload : t,
          );
        },
        rejected: (state, action) => {
          state.saving = false;
          state.error = action.error.message ?? 'Failed to update todo';
        },
      },
    ),

    toggleTodo: create.asyncThunk<Todo, Todo>(
      async (todo) => {
        const data: TodoData = {
          title: todo.title,
          completed: todo.completed === 'true' ? 'false' : 'true',
          priority: todo.priority,
          dueDate: todo.dueDate,
          ownerId: todo.ownerId,
          ownerName: todo.ownerName,
        };
        return await AppService.updateTodo(todo.id, data);
      },
      {
        fulfilled: (state, { payload }) => {
          state.items = state.items.map((t) =>
            t.id === payload.id ? payload : t,
          );
        },
      },
    ),

    deleteTodo: create.asyncThunk<string, string>(
      async (id) => await AppService.deleteTodo(id),
      {
        fulfilled: (state, { payload }) => {
          state.items = state.items.filter((t) => t.id !== payload);
        },
      },
    ),
  }),
  selectors: {
    selectTodos: (state) => state.items,
    selectTodosLoading: (state) => state.loading,
    selectTodosSaving: (state) => state.saving,
    selectTodosError: (state) => state.error,
  },
});

export const { loadTodos, createTodo, updateTodo, toggleTodo, deleteTodo } =
  TodosSlice.actions;
export const {
  selectTodos,
  selectTodosLoading,
  selectTodosSaving,
  selectTodosError,
} = TodosSlice.selectors;

export default TodosSlice.reducer;
