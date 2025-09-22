import { reactive } from 'vue';
import { defineStore } from 'pinia';
import { useTasks } from '@/composables/useTasks';

export const useTasksStore = defineStore('tasks', () => {
  const tasks = useTasks();
  const tasksFlow = reactive(tasks.createTask('start'));
  return { tasksFlow };
});
