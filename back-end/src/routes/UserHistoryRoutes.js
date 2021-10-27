import { Router } from 'express';
const router = Router();
import UserHistoryController from '../controllers/UserHistoryController.js'

router.get('/', UserHistoryController.getAllUserHistory)
router.post('/', UserHistoryController.addUserHistory)
router.put('/id=:id', UserHistoryController.updateUserHistoryById)
router.delete('/id=:id', UserHistoryController.deleteUserHistoryById)
router.get('/project=:project', UserHistoryController.getUserHistoryByProject)

export default router;