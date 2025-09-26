export type Status = 'idle' | 'running' | 'success' | 'failure';

export type TaskType = 'start' | 'sms' | 'email' | 'custom' | 'end' | 'onSuccess' | 'onFailure';

export interface BaseTask {
  id: string;
  type: TaskType;
  name: string;
  subTasks: Task[];
}

export interface StartTask extends BaseTask {
  type: 'start';
}

export interface EndTask extends BaseTask {
  type: 'end';
}

export interface SuccessTask extends BaseTask {
  type: 'onSuccess';
}
export interface FailureTask extends BaseTask {
  type: 'onFailure';
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
  customTasks: Task[];
}

export type Task =
  | StartTask
  | EndTask
  | EmailTask
  | SmsTask
  | CustomTask
  | SuccessTask
  | FailureTask
  | BaseTask;
