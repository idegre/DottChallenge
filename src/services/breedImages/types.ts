export type TaskResponse = {
  tasks: Task[];
  all_tasks_completed: boolean;
  username: string;
};

export enum TaskStatus {
  DONE = 'done',
  PENDING = 'pending',
  IN_PROGRESS = 'in-progress',
}

export type Task = {
  id: string;
  name: string;
  due_date: string;
  status: TaskStatus;
};
