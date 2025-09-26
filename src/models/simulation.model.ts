import type { Status } from './tasks.model';

export interface SimulationContext {
  log: (message: string) => void;
  setStatus: (id: string, status: Status) => void;
  delay?: number;
}
