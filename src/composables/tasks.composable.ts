import type { Task, TaskType } from '@/models/tasks.model';
import { generateId } from '@/utils/id';

import EmailForm from '@/components/forms/EmailForm.vue';
import BaseForm from '@/components/forms/BaseForm.vue';
import SmsForm from '@/components/forms/SmsForm.vue';
import CustomForm from '@/components/forms/CustomForm.vue';

export const useTasks = () => {
  const createTask = (type: TaskType): Task => {
    return {
      id: generateId(),
      type,
      name: type,
      subTasks: [] as Task[],
      tasks: [],
    };
  };

  const createSubtask = ({ task, type }: { task: Task; type: TaskType }) => {
    const newTask = createTask(type);
    task.subTasks.push(newTask);
  };

  const deleteSubtask = ({ parent, task }: { parent: Task; task: Task }) => {
    const index = parent.subTasks.indexOf(task);
    if (index > -1) {
      parent.subTasks.splice(index, 1);
    }
  };

  const hasSubtasks = (task: Task) => {
    return task.subTasks.length > 0;
  };

  const hasEndSubtask = (task: Task) => {
    return task.subTasks.some((subTask) => subTask.type === 'end');
  };

  const isStartTask = (task: Task) => {
    return task.type === 'start';
  };

  const isEndTask = (task: Task) => {
    return task.type === 'end';
  };

  const showDeleteAction = (task: Task) => {
    return !isStartTask(task) || isEndTask(task) || hasEndSubtask(task);
  };

  const updateTaskField = (task: Task, field: keyof Task, value: unknown) => {
    if (field === 'type' && typeof value === 'string') {
      task.type = value as TaskType;
    } else if (field === 'name' && typeof value === 'string') {
      task.name = value;
    } else if (field === 'subTasks' && Array.isArray(value)) {
      task.subTasks = value as Task[];
    } else if (field === 'id' && typeof value === 'string') {
      task.id = value;
    }
  };

  const getTaskIcon = (type: TaskType): string => {
    const icons: Record<TaskType, string> = {
      start: '🚀',
      sms: '📱',
      email: '📧',
      custom: '🔧',
      end: '🏁',
      onSuccess: '✅',
      onFailure: '❌',
    };
    return icons[type] ?? '❓';
  };

  const getTaskAuthorizedSubtasks = (task: Task) => {
    if (hasEndSubtask(task)) return [];

    const commonTasks = ['sms', 'email', 'custom', 'end', 'onSuccess', 'onFailure'] as TaskType[];
    const tasks: Record<TaskType, TaskType[]> = {
      start: ['sms', 'email', 'custom'],
      end: [],
      sms: commonTasks,
      email: commonTasks,
      custom: commonTasks,
      onSuccess: commonTasks,
      onFailure: commonTasks,
    };

    return tasks[task.type] ?? [];
  };

  const getTaskFormComponent = (type: TaskType) => {
    const components: Record<TaskType, unknown> = {
      start: BaseForm,
      sms: SmsForm,
      email: EmailForm,
      custom: CustomForm,
      end: BaseForm,
      onSuccess: BaseForm,
      onFailure: BaseForm,
    };

    return components[type] ?? null;
  };

  return {
    createTask,
    createSubtask,
    deleteSubtask,
    updateTaskField,

    isStartTask,
    isEndTask,
    hasSubtasks,
    hasEndSubtask,
    showDeleteAction,

    getTaskIcon,
    getTaskAuthorizedSubtasks,
    getTaskFormComponent,
  };
};
