import { create } from 'zustand/index';
import { getTasks as getTasksApi, TaskType } from '@shared/api/get-tasks';
type Store = {
  loading: boolean;
  loaded: boolean;
  tasks: TaskType[];
  taskModal?: TaskType;
};

export const useTasksStore = create<Store>(() => ({
  loading: false,
  loaded: false,
  tasks: []
}));

export const getTasks = async () => {
  useTasksStore.setState(() => ({ loading: false }));

  const response = await getTasksApi();
  console.log(response);

  if (response.result) {
    return useTasksStore.setState(() => ({
      tasks: response.result as any,
      loaded: true,
      loading: false
    }));
  }

  return useTasksStore.setState(() => ({ loading: false }));
};
