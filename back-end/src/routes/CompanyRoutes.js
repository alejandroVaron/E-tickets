import { Router } from 'express';
const router = Router();
import CompanyController from '../controllers/CompanyController.js'

router.get('/', CompanyController.getAllCompanies)
router.post('/', CompanyController.addCompany)
router.put('/id=:id', CompanyController.updateCompanyById)
router.delete('/id=:id', CompanyController.deleteCompanyById)
router.get('/id=:id', CompanyController.getCompanyById)

export default router;