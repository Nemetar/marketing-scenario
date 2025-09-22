import type { Task, TaskType } from '@/models/tasks.model';
import { generateId } from '@/utils/id';

export const useTasks = () => {
  const createTask = (type: TaskType): Task => {
    return { id: generateId(), type, name: type, subTasks: [] as Task[] };
  };

  return { createTask };
};
