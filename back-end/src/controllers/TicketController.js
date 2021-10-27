import TicketServices from '../services/TicketServices.js'
import Util from '../Util/Util.js'

const util = new Util();

class TicketController{

    static async getAllTickets(req, res) {
        try {
            const allTickets = await TicketServices.getAllTickets();
            if (allTickets.length > 0) {
                util.setSuccess(200, 'Tickets returned', allTickets)
            } else {
                util.setSuccess(204, 'No tickets found', "");
            }
            return util.send(res);
        } catch (error) {
            console.log(error)
            util.setError(400, error);
            return util.send(res);
        }
    }

    static async addTicket(req, res) {
        const newTicket = req.body;
        try {
            const createdTicket = await TicketServices.addTicket(newTicket);
            util.setSuccess(201, `new ticket created!`, createdTicket);
            return util.send(res);
        } catch (error) {
            util.setError(400, error);
            return util.send(res);
        }
    }

    static async updateTicketById(req, res) {
        const id = req.params.id;
        const updateTicket = req.body;
        if (!Number.isInteger(Number(id))) {
            util.setError(400, 'Please input a valid numeric value');
            return util.send(res);
        }
        try {
            let updatesTicket = null;
            updatesTicket = await TicketServices.updateTicketById(id, updateTicket)
            if (updatesTicket) {
                util.setSuccess(201, `Ticket ${id} updated!`, updateTicket);
            } else {
                util.setSuccess(204, `Could not update ticket ${id}!`, "")
            }
            return util.send(res);
        } catch (error) {
            util.setError(400, error);
            return util.send(res);
        }
    }

    static async deleteTicketById(req, res) {
        const id = req.params.id;
        if (!Number.isInteger(Number(id))) {
            util.setError(400, 'Please input a valid numeric value');
            return util.send(res);
        }
        try {
            const ticketToDelete = await TicketServices.deleteTicketById(id);
            if (ticketToDelete) {
                util.setSuccess(200, `Deleted ticket ${id}!`, ticketToDelete);
            } else {
                util.setSuccess(204, `The ticket you are looking for can not be found`, "");
            }
            return util.send(res);
        } catch (error) {
            util.setError(400, error);
            return util.send(res);
        }
    }

    static async getTicketsByUserHistory(req, res) {
        const requiredTicket = req.params.userHistory;
        try {
            const returnedTicket = await TicketServices.getTicketsByUserHistory(requiredTicket)
            if (returnedTicket) {
                util.setSuccess(200, `Tickets returned!`, returnedTicket);
            } else {
                util.setSuccess(204, `Could not found tickets!`, "");
            }
            return util.send(res);
        } catch (error) {
            util.setError(400, error);
            return util.send(res);
        }
    }
}
export default TicketController;