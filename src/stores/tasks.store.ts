import { reactive } from 'vue';
import { defineStore } from 'pinia';
import { useTasks } from '@/composables/tasks.composable';
import { useLogsStore } from './logs.store';

export const useTasksStore = defineStore('tasks', () => {
  const { clearLogs } = useLogsStore();
  const { createTask } = useTasks();
  const tasksFlow = reactive(createTask('start'));

  const runSimulation = async () => {
    clearLogs();
    console.log('Simulation started');
  };

  return { tasksFlow, runSimulation };
});
