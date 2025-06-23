import { Router } from 'express';
import { protect } from '../middleware/authMiddleware';
import { createTask, getTasks, updateTask, deleteTask } from '../controllers/taskController';

const router = Router();

// Protect all task routes
router.use(protect);

// CRUD routes
router.post('/', createTask);
router.get('/:projectId', getTasks);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

export default router;
