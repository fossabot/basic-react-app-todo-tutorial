import { FC, FormEvent, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'reducers';
import { selectUserInfo } from 'reducers/app/slice';
import { createTodo, selectTodosSaving } from 'reducers/todos/slice';

import styles from './TodoForm.module.scss';

export const TodoForm: FC = () => {
  const dispatch = useAppDispatch();
  const userInfo = useAppSelector(selectUserInfo);
  const saving = useAppSelector(selectTodosSaving);

  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('medium');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !userInfo) return;

    await dispatch(
      createTodo({
        title: title.trim(),
        completed: 'false',
        priority,
        dueDate,
        ownerId: String(userInfo.identity.userId),
        ownerName: userInfo.user.displayName,
      }),
    );

    setTitle('');
    setDueDate('');
    setPriority('medium');
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        type="text"
        className={styles.title}
        placeholder="What needs to be done?"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <select
        className={styles.select}
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <input
        type="date"
        className={styles.date}
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />
      <button
        type="submit"
        className={styles.submit}
        disabled={saving || !title.trim() || !userInfo}
      >
        {saving ? 'Adding…' : 'Add Todo'}
      </button>
    </form>
  );
};
