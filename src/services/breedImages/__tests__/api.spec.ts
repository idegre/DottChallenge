import {rootResponseTransform} from '..';
import {TaskResponse} from '../types';

export const mockTaskResponse = {
  tasks: [
    {id: '1', name: 'Task 1 ', due_date: '9:00AM 12-1-2019', status: 'done'},
    {
      id: '2',
      name: 'Task 2 ',
      due_date: '11:00AM 12-1-2019',
      status: 'in-progress',
    },
    {
      id: '3',
      name: 'Task 3 ',
      due_date: '22:00AM 12-1-2019',
      status: 'pending',
    },
  ],
  all_tasks_completed: false,
  username: 'User',
} as TaskResponse;

describe('Task API', () => {
  test('transform function should work as expected', () => {
    expect(rootResponseTransform(mockTaskResponse)).toBe(mockTaskResponse);
  });
});
