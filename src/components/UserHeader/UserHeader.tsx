import { FC, useState } from 'react';
import { useAppSelector } from 'reducers';
import { selectUserInfo, selectUserLoading } from 'reducers/app/slice';

import styles from './UserHeader.module.scss';

export const UserHeader: FC = () => {
  const userInfo = useAppSelector(selectUserInfo);
  const loading = useAppSelector(selectUserLoading);
  const [avatarFailed, setAvatarFailed] = useState(false);

  if (loading && !userInfo) {
    return <div className={styles.header}>Loading user…</div>;
  }

  if (!userInfo) {
    return null;
  }

  const { identity, user, avatarUrl } = userInfo;
  const initials = user.displayName
    ?.split(' ')
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <div className={styles.header}>
      {avatarFailed ? (
        <div className={styles.avatarFallback}>{initials || '?'}</div>
      ) : (
        <img
          src={avatarUrl}
          alt={user.displayName}
          className={styles.avatar}
          onError={() => setAvatarFailed(true)}
        />
      )}
      <div className={styles.info}>
        <div className={styles.name}>{user.displayName}</div>
        <div className={styles.meta}>{identity.userEmail}</div>
        {user.detail?.title && (
          <div className={styles.meta}>{user.detail.title}</div>
        )}
        <span className={styles.role}>{user.role}</span>
      </div>
    </div>
  );
};
