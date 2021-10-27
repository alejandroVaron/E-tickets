import UserHistory from '../../models/UserHistory.js';

class UserHistoryServices {

    static async getAllUserHistory() {
        try {
          return await UserHistory.findAll();
        } catch (error) {
          throw error;
        }
    }

    static async addUserHistory(newUserHistory) {
        try {
          return await UserHistory.create(newUserHistory);
        } catch (error) {
          throw error;
        }
    }

    static async updateUserHistoryById(id, updateUserHistory) {
        try {
          const userHistoryToUpdate = await UserHistory.findOne({
            where: { id_userHistory: Number(id) }
          });
    
          if (userHistoryToUpdate) {
            await UserHistory.update(updateUserHistory, { where: { id_userHistory: Number(id) } });
            return updateUserHistory;
          }
          return null;
        } catch (error) {
          throw error;
        }
    }

    static async deleteUserHistoryById(id) {
        try {
          const userHistoryToDelete = await UserHistory.findOne({ where: { id_userHistory: Number(id) } });
    
          if (userHistoryToDelete) {
            const deletedUserHistory = await UserHistory.destroy({
              where: { id_userHistory: Number(id) }
            });
            return deletedUserHistory;
          }
          return null;
        } catch (error) {
          throw error;
        }
    }

    static async getUserHistoryByProject(project) {
        try {
          const returnedUserHistory = await UserHistory.findAll({
            where: { id_project: project }
          });
          return returnedUserHistory;
        } catch (error) {
          throw error;
        }
    }

}
export default UserHistoryServices;