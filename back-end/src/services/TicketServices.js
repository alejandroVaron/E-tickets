import Ticket from '../../models/Ticket.js';

class TicketServices {

    static async getAllTickets() {
        try {
          return await Ticket.findAll();
        } catch (error) {
          throw error;
        }
    }

    static async addTicket(newTicket) {
        try {
          return await Ticket.create(newTicket);
        } catch (error) {
          throw error;
        }
    }

    static async updateTicketById(id, updateTicket) {
        try {
          const ticketToUpdate = await Ticket.findOne({
            where: { id_ticket: Number(id) }
          });
    
          if (ticketToUpdate) {
            await Ticket.update(updateTicket, { where: { id_ticket: Number(id) } });
            return updateTicket;
          }
          return null;
        } catch (error) {
          throw error;
        }
    }

    static async deleteTicketById(id) {
        try {
          const ticketToDelete = await Ticket.findOne({ where: { id_ticket: Number(id) } });
    
          if (ticketToDelete) {
            const deletedTicket = await Ticket.destroy({
              where: { id_ticket: Number(id) }
            });
            return deletedTicket;
          }
          return null;
        } catch (error) {
          throw error;
        }
    }

    static async getTicketsByUserHistory(userHistory) {
        try {
          const returnedTicket = await Ticket.findAll({
            where: { id_userHistory: userHistory }
          });
          return returnedTicket;
        } catch (error) {
          throw error;
        }
    }

}
export default TicketServices;