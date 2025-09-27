import { reactive } from 'vue';
import { defineStore } from 'pinia';
import { useTasks } from '@/composables/tasks.composable';
import { useLogsStore } from './logs.store';
import { useSimulation } from '@/composables/simulation.composable';

export const useTasksStore = defineStore('tasks', () => {
  const logsStore = useLogsStore();
  const { createTask } = useTasks();
  const { startSimulation } = useSimulation();
  const tasksFlow = reactive(createTask('start'));

  const runTaskFlowSimulation = async () => {
    logsStore.clearLogs();
    await startSimulation(tasksFlow, logsStore);
  };

  return { tasksFlow, runTaskFlowSimulation };
});
