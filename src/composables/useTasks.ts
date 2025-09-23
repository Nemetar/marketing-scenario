import type { Task, TaskType } from '@/models/tasks.model';
import { generateId } from '@/utils/id';

export const useTasks = () => {
  const createTask = (type: TaskType): Task => {
    return { id: generateId(), type, name: type, subTasks: [] as Task[] };
  };

  const createSubTask = ({ task, type }: { task: Task; type: TaskType }) => {
    const newTask = createTask(type);
    task.subTasks.push(newTask);
  };

  const deleteSubTask = ({ parent, task }: { parent: Task; task: Task }) => {
    const index = parent.subTasks.indexOf(task);
    if (index > -1) {
      parent.subTasks.splice(index, 1);
    }
  };

  return { createTask, createSubTask, deleteSubTask };
};
