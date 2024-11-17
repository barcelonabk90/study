import { Router } from 'express';
import { AuthController } from '../controllers/authController';
import { authMiddleware } from '../middleware/authMiddleware';
const router = Router();
const authController = new AuthController();

router.post('/login', (req, res) => authController.login(req, res));
router.post('/addUser', authMiddleware, (req, res) => authController.addUser(req, res));
router.get('/users', authMiddleware, (req, res) => authController.getAllUsers(req, res));

export default router;