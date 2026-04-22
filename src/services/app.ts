import type { AppDBDocument } from '@domoinc/toolkit';
import { AppDBClient, IdentityClient, UserClient } from '@domoinc/toolkit';

import type { Todo, TodoData, UserInfo } from './types';

const TodosClient = new AppDBClient.DocumentsClient<TodoData>('Todos');

const extractDocs = (docs: AppDBDocument<TodoData>[]): Todo[] =>
  docs.map((doc) => ({
    id: doc.id,
    createdOn: doc.createdOn,
    updatedOn: doc.updatedOn,
    ...doc.content,
  }));

export const AppService = {
  async loadUserInfo(): Promise<UserInfo> {
    const identity = (await IdentityClient.get(undefined, true)).data;
    const user = (await UserClient.getUser(identity.userId, true)).data;
    const avatarUrl = `/api/content/v1/avatar/USER/${identity.userId}?size=100${
      user.avatarKey ? `&v=${encodeURIComponent(user.avatarKey)}` : ''
    }`;
    return { identity, user, avatarUrl };
  },

  async loadTodos(): Promise<Todo[]> {
    const response = await TodosClient.get(
      {},
      { orderby: ['createdOn descending'] },
    );
    return extractDocs(response.data);
  },

  async createTodo(data: TodoData): Promise<Todo> {
    const response = await TodosClient.create(data);
    return extractDocs(
      Array.isArray(response.data) ? response.data : [response.data],
    )[0];
  },

  async updateTodo(id: string, data: TodoData): Promise<Todo> {
    const response = await TodosClient.update({ id, content: data });
    return extractDocs([response.data])[0];
  },

  async deleteTodo(id: string): Promise<string> {
    await TodosClient.delete(id);
    return id;
  },
};
