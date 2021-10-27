import { Router } from 'express';
const router = Router();
import TicketController from '../controllers/TicketController.js'

router.get('/', TicketController.getAllTickets)
router.post('/', TicketController.addTicket)
router.put('/id=:id', TicketController.updateTicketById)
router.delete('/id=:id', TicketController.deleteTicketById)
router.get('/userHistory=:userHistory', TicketController.getTicketsByUserHistory)

export default router;