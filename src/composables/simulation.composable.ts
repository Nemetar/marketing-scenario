import type { SimulationContext } from '@/models/simulation.model';
import type { Task } from '@/models/tasks.model';

export const useSimulation = () => {
  const simulateTask = async (task: Task, logs: SimulationContext): Promise<boolean> => {
    console.log(`Simulating task: ${task.name} (${task.type})`);
    console.log('logs context:', logs);
    return await new Promise((resolve) => resolve(true));
  };

  const startSimulation = (task: Task, logs: SimulationContext) => {
    console.log('Simulation started');
    simulateTask(task, logs);
    console.log('Simulation ended');
  };

  return { startSimulation };
};
