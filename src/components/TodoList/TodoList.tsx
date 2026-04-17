import { TodoItem } from 'components/TodoItem/TodoItem';
import { FC, useState } from 'react';
import { useAppSelector } from 'reducers';
import { selectTodos, selectTodosLoading } from 'reducers/todos/slice';

import styles from './TodoList.module.scss';

type Filter = 'all' | 'active' | 'completed';

export const TodoList: FC = () => {
  const todos = useAppSelector(selectTodos);
  const loading = useAppSelector(selectTodosLoading);
  const [filter, setFilter] = useState<Filter>('all');

  const filtered = todos.filter((t) => {
    if (filter === 'active') return t.completed !== 'true';
    if (filter === 'completed') return t.completed === 'true';
    return true;
  });

  const activeCount = todos.filter((t) => t.completed !== 'true').length;

  if (loading && todos.length === 0) {
    return <div className={styles.count}>Loading todos…</div>;
  }

  return (
    <div>
      <div className={styles.header}>
        <span className={styles.count}>
          {activeCount} active · {todos.length} total
        </span>
        <div className={styles.filters}>
          {(['all', 'active', 'completed'] as Filter[]).map((f) => (
            <button
              key={f}
              type="button"
              className={`${styles.filterBtn} ${
                filter === f ? styles.active : ''
              }`}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>
      </div>
      {filtered.length === 0 ? (
        <div className={styles.count} style={{ padding: '16px 0' }}>
          No todos to show.
        </div>
      ) : (
        <ul className={styles.list}>
          {filtered.map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </ul>
      )}
    </div>
  );
};
