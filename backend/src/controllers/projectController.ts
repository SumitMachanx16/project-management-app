import { Response } from 'express';
import { AuthRequest } from '../middleware/authMiddleware';
import Project from '../models/project';

export const createProject = async (req: AuthRequest, res: Response): Promise<void> => {
  const { name, description } = req.body;
  const project = await Project.create({ name, description, userId: req.user.id });
  res.json(project);
};

export const getProjects = async (req: AuthRequest, res: Response): Promise<void> => {
  const projects = await Project.findAll({ where: { userId: req.user.id } });
  res.json(projects);
};

export const updateProject = async (req: AuthRequest, res: Response): Promise<void> => {
  const project = await Project.findOne({ where: { id: req.params.id, userId: req.user.id } });
  if (!project) {
    res.status(404).json({ message: 'Not found' });
    return;
  }

  await project.update(req.body);
  res.json(project);
};

export const deleteProject = async (req: AuthRequest, res: Response): Promise<void> => {
  const project = await Project.findOne({ where: { id: req.params.id, userId: req.user.id } });
  if (!project) {
    res.status(404).json({ message: 'Not found' });
    return;
  }

  await project.destroy();
  res.json({ message: 'Deleted' });
};
