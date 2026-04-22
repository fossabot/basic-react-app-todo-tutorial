import { TodoForm } from 'components/TodoForm/TodoForm';
import { TodoList } from 'components/TodoList/TodoList';
import { UserHeader } from 'components/UserHeader/UserHeader';
import { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'reducers';
import { loadUserInfo, selectUserError } from 'reducers/app/slice';
import { loadTodos, selectTodosError } from 'reducers/todos/slice';

import styles from './App.module.scss';

export const App: FC = () => {
  const dispatch = useAppDispatch();
  const userError = useAppSelector(selectUserError);
  const todosError = useAppSelector(selectTodosError);

  useEffect(() => {
    dispatch(loadUserInfo());
    dispatch(loadTodos());
  }, [dispatch]);

  return (
    <div className={styles.App}>
      <h1 className={styles.title}>My Todos</h1>
      <UserHeader />
      {(userError || todosError) && (
        <div className={styles.errorBanner}>{userError || todosError}</div>
      )}
      <TodoForm />
      <TodoList />
    </div>
  );
};
