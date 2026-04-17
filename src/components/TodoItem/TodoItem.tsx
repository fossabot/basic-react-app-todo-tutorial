import { FC } from 'react';
import { useAppDispatch } from 'reducers';
import { deleteTodo, toggleTodo } from 'reducers/todos/slice';
import type { Todo } from 'services/types';

import styles from './TodoItem.module.scss';

interface Props {
  todo: Todo;
}

const priorityClass: Record<string, string> = {
  high: styles.priorityHigh,
  medium: styles.priorityMedium,
  low: styles.priorityLow,
};

export const TodoItem: FC<Props> = ({ todo }) => {
  const dispatch = useAppDispatch();
  const isCompleted = todo.completed === 'true';

  return (
    <li className={`${styles.item} ${priorityClass[todo.priority] ?? ''}`}>
      <input
        type="checkbox"
        className={styles.checkbox}
        checked={isCompleted}
        onChange={() => dispatch(toggleTodo(todo))}
      />
      <div className={styles.content}>
        <div
          className={`${styles.title} ${isCompleted ? styles.completed : ''}`}
        >
          {todo.title}
        </div>
        <div className={styles.meta}>
          <span>By {todo.ownerName || 'Unknown'}</span>
          {todo.dueDate && <span>Due {todo.dueDate}</span>}
          <span>{todo.priority}</span>
        </div>
      </div>
      <button
        type="button"
        className={styles.delete}
        onClick={() => dispatch(deleteTodo(todo.id))}
        aria-label="Delete todo"
      >
        ×
      </button>
    </li>
  );
};
