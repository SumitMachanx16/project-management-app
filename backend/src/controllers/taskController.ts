import { Response } from 'express';
import { AuthRequest } from '../middleware/authMiddleware';
import Task from '../models/task';
import Project from '../models/project';

export const createTask = async (req: AuthRequest, res: Response): Promise<void> => {
  const { title, projectId } = req.body;
  const project = await Project.findOne({ where: { id: projectId, userId: req.user.id } });
  if (!project) {
    res.status(403).json({ message: 'Forbidden' });
    return;
  }

  const task = await Task.create({ title, projectId });
  res.json(task);
};

export const getTasks = async (req: AuthRequest, res: Response): Promise<void> => {
  const project = await Project.findOne({ where: { id: req.params.projectId, userId: req.user.id } });
  if (!project) {
    res.status(403).json({ message: 'Forbidden' });
    return;
  }

  const tasks = await Task.findAll({ where: { projectId: req.params.projectId } });
  res.json(tasks);
};

export const updateTask = async (req: AuthRequest, res: Response): Promise<void> => {
  const task = await Task.findOne({ where: { id: req.params.id } });
  if (!task) {
    res.status(404).json({ message: 'Not found' });
    return;
  }

  const project = await Project.findOne({ where: { id: task.getDataValue('projectId'), userId: req.user.id } });
  if (!project) {
    res.status(403).json({ message: 'Forbidden' });
    return;
  }

  await task.update(req.body);
  res.json(task);
};

export const deleteTask = async (req: AuthRequest, res: Response): Promise<void> => {
  const task = await Task.findOne({ where: { id: req.params.id } });
  if (!task) {
    res.status(404).json({ message: 'Not found' });
    return;
  }

  const project = await Project.findOne({ where: { id: task.getDataValue('projectId'), userId: req.user.id } });
  if (!project) {
    res.status(403).json({ message: 'Forbidden' });
    return;
  }

  await task.destroy();
  res.json({ message: 'Deleted' });
};
