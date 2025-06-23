export type Project = {
  id: number;
  name: string;
  description: string;
  userId: number;
  createdAt: string;
  updatedAt: string;
};

export type Task = {
  id: number;
  title: string;
  isCompleted: boolean;
  projectId: number;
  createdAt: string;
  updatedAt: string;
};