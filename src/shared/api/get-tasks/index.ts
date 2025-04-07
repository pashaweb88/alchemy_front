import { request } from '@shared/utils/request';

enum TaskRole {
  BOT_TG = 'BOT_TG'
}

export type TaskType = {
  avatarUrl: string;
  description: string;
  id: number;
  isActive: boolean;
  reward: number;
  role: TaskRole;
  title: string;
  url: string;
};

export const getTasks = () =>
  request<TaskType[]>('/api/tasks', {
    method: 'get'
  });

export default getTasks;
