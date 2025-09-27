import type { Task, TaskType } from '@/models/tasks.model';

import EmailForm from '@/components/forms/EmailForm.vue';
import BaseForm from '@/components/forms/BaseForm.vue';
import SmsForm from '@/components/forms/SmsForm.vue';
import CustomForm from '@/components/forms/CustomForm.vue';

export const useTasks = () => {
  const createBaseTask = (type: TaskType) => ({
    id: crypto.randomUUID(),
    type,
    name: type,
    subTasks: [] as Task[],
  });

  const createEmailTask = () => ({
    ...createBaseTask('email'),
    diffusionListId: '',
    subject: '',
    body: '',
  });

  const createSmsTask = () => ({
    ...createBaseTask('sms'),
    diffusionListId: '',
    message: '',
  });

  const createCustomTask = () => ({
    ...createBaseTask('custom'),
    diffusionListId: '',
    customTasks: [] as Task[],
  });

  const createTask = (type: TaskType): Task => {
    switch (type) {
      case 'start':
        return createBaseTask('start');
      case 'end':
        return createBaseTask('end');
      case 'onSuccess':
        return createBaseTask('onSuccess');
      case 'onFailure':
        return createBaseTask('onFailure');
      case 'email':
        return createEmailTask();
      case 'sms':
        return createSmsTask();
      case 'custom':
        return createCustomTask();
      default:
        return createBaseTask('end');
    }
  };

  const createSubtask = ({ task, type }: { task: Task; type: TaskType }) => {
    const newTask = createTask(type);
    if (type === 'end') {
      task.subTasks = [newTask];
    } else {
      task.subTasks.push(newTask);
    }
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

  const getTaskIcon = (type: TaskType): string => {
    const icons: Record<TaskType, string> = {
      start: '🚀',
      sms: '💬',
      email: '📧',
      custom: '🔧',
      end: '🏁',
      onSuccess: '✅',
      onFailure: '❌',
    };
    return icons[type] ?? '❓';
  };

  const getTaskStatusIcon = (status: string) => {
    const icons: Record<string, { icon?: string; class?: string } | null> = {
      running: { class: 'loading loading-spinner text-primary loading-xs' },
      success: { icon: '✅' },
      failure: { icon: '❌' },
    };
    return icons[status] ?? null;
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

    isStartTask,
    isEndTask,
    hasSubtasks,
    hasEndSubtask,

    getTaskIcon,
    getTaskStatusIcon,
    getTaskAuthorizedSubtasks,
    getTaskFormComponent,
  };
};
