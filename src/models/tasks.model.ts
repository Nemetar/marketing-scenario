export type Status = 'idle' | 'running' | 'success' | 'failure';

export type TaskType = 'start' | 'sms' | 'email' | 'custom' | 'end' | 'onSuccess' | 'onFailure';

export interface BaseTask {
  id: string;
  type: TaskType;
  name: string;
  subTasks: Task[];
  icon?: string;
}

export interface StartTask extends BaseTask {
  type: 'start';
}

export interface EndTask extends BaseTask {
  type: 'end';
}

export interface EmailTask extends BaseTask {
  type: 'email';
  diffusionListId: string;
  subject: string;
  body: string;
}

export interface SmsTask extends BaseTask {
  type: 'sms';
  diffusionListId: string;
  message: string;
}

export interface CustomTask extends BaseTask {
  type: 'custom';
  diffusionListId: string;
  config: Record<string, unknown>;
}

export type Task = StartTask | EndTask | EmailTask | SmsTask | CustomTask | BaseTask;
