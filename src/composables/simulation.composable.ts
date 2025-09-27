import type { LogsStore } from '@/models/logs.model';
import type {
  CustomTask,
  EmailTask,
  EndTask,
  SmsTask,
  StartTask,
  Task,
} from '@/models/tasks.model';

export const useSimulation = () => {
  const simulateStart = async (task: StartTask, logs: LogsStore) => {
    logs.setStatus(task.id, 'running');
    logs.addLog(`🚀 Start: ${task.name}`);

    await new Promise((resolve) => setTimeout(resolve, 800));

    logs.setStatus(task.id, 'success');
    return true;
  };

  const simulateSms = async (task: SmsTask, logs: LogsStore) => {
    logs.setStatus(task.id, 'running');
    logs.addLog(`💬 SMS: ${task.name}`);

    await new Promise((resolve) => setTimeout(resolve, 800));

    logs.setStatus(task.id, 'success');
    logs.addLog(`✅ SMS ${task.name}`);

    return true;
  };

  const simulateEmail = async (task: EmailTask, logs: LogsStore) => {
    logs.setStatus(task.id, 'running');
    logs.addLog(`📧 Email: ${task.name}`);

    await new Promise((resolve) => setTimeout(resolve, 800));

    const ok = Math.random() < 0.5;
    logs.setStatus(task.id, ok ? 'success' : 'failure');
    logs.addLog(`${ok ? '✅' : '❌'} Email ${task.name}`);

    return ok;
  };

  const simulateCustom = async (task: CustomTask, logs: LogsStore) => {
    logs.setStatus(task.id, 'running');
    logs.addLog(`⚙️ Custom: ${task.name}`);

    await Promise.all(task.customTasks.map((customTask) => simulateTask(customTask, logs)));

    logs.setStatus(task.id, 'success');
    logs.addLog(`✅ Custom ${task.name}`);

    return true;
  };

  const simulateEnd = async (task: EndTask, logs: LogsStore) => {
    logs.setStatus(task.id, 'running');
    logs.addLog(`🏁 End: ${task.name}`);

    await new Promise((resolve) => setTimeout(resolve, 800));

    logs.setStatus(task.id, 'success');
    logs.addLog(`✅ Fin de scénario`);

    return true;
  };

  const simulateTask = async (task: Task, logs: LogsStore) => {
    let success = true;

    switch (task.type) {
      case 'start':
        success = await simulateStart(task as StartTask, logs);
        break;
      case 'sms':
        success = await simulateSms(task as SmsTask, logs);
        break;
      case 'email':
        success = await simulateEmail(task as EmailTask, logs);
        break;
      case 'custom':
        success = await simulateCustom(task as CustomTask, logs);
        break;
      case 'end':
        success = await simulateEnd(task as EndTask, logs);
        break;
      case 'onSuccess':
      case 'onFailure':
        logs.setStatus(task.id, 'success');
    }

    const transitionToSkip = success ? 'onFailure' : 'onSuccess';
    const transitionTasks = [
      ...task.subTasks.filter((subTask) => subTask.type !== transitionToSkip),
    ];

    if (transitionTasks.length) {
      await Promise.all(transitionTasks.map((subTask) => simulateTask(subTask, logs)));
    }
  };

  const startSimulation = async (taskFlow: Task, logs: LogsStore) => {
    logs.clearLogs();
    await simulateTask(taskFlow, logs);
  };

  return { startSimulation };
};
