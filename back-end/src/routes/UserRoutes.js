import { Router } from 'express';
const router = Router();
import UserController from '../controllers/UserController.js'

router.get('/', UserController.getAllUsers)
router.post('/', UserController.addUser)
router.put('/id=:id', UserController.updateUserById)
router.delete('/id=:id', UserController.deleteUserById)
router.get('/email=:email', UserController.getUserByEmail)

export default router;