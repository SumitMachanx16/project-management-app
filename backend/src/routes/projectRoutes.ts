import { Router } from 'express';
import { protect } from '../middleware/authMiddleware';
import { createProject, getProjects, updateProject, deleteProject } from '../controllers/projectController';

const router = Router();

// Protect all project routes
router.use(protect);

// CRUD routes
router.post('/', createProject);
router.get('/', getProjects);
router.put('/:id', updateProject);
router.delete('/:id', deleteProject);

export default router;
