import type { Identity, User } from '@domoinc/toolkit/src/models';

export interface TodoData {
  title: string;
  completed: string;
  priority: string;
  dueDate: string;
  ownerId: string;
  ownerName: string;
}

export interface Todo extends TodoData {
  id: string;
  createdOn?: string;
  updatedOn?: string;
}

export interface UserInfo {
  identity: Identity;
  user: User;
  avatarUrl: string;
}
