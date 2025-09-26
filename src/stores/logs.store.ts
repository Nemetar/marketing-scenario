import type { Status } from '@/models/tasks.model';
import { defineStore } from 'pinia';
import { reactive, ref } from 'vue';

export const useLogsStore = defineStore('logs', () => {
  const status = reactive<Record<string, Status>>({});
  const logs = ref<string[]>([]);

  const addLog = (log: string) => {
    logs.value.push(log);
  };

  const setStatus = (id: string, logStatus: Status) => {
    status[id] = logStatus;
  };

  const getStatus = (id: string): Status => {
    return status[id] ?? 'idle';
  };

  const clearLogs = () => {
    logs.value = [];
    for (const id in status) delete status[id];
  };

  return { logs, status, addLog, setStatus, getStatus, clearLogs };
});
