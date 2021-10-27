import { Router } from 'express';
const router = Router();
import ProjectController from '../controllers/ProjectController.js'

router.get('/', ProjectController.getAllProjects)
router.post('/', ProjectController.addProject)
router.put('/id=:id', ProjectController.updateProjectById)
router.delete('/id=:id', ProjectController.deleteProjectById)
router.get('/id=:id', ProjectController.getProjectById)
router.get('/company=:company', ProjectController.getProjectsByCompany)

export default router;