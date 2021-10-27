import UserHistoryServices from '../services/UserHistoryServices.js'
import Util from '../Util/Util.js'

const util = new Util();

class UserHistoryController{

    static async getAllUserHistory(req, res) {
        try {
            const allUserHistory = await UserHistoryServices.getAllUserHistory();
            if (allUserHistory.length > 0) {
                util.setSuccess(200, 'UserHistory returned', allUserHistory)
            } else {
                util.setSuccess(204, 'No userHistory found', "");
            }
            return util.send(res);
        } catch (error) {
            console.log(error)
            util.setError(400, error);
            return util.send(res);
        }
    }

    static async addUserHistory(req, res) {
        const newUserHistory = req.body;
        try {
            const createdUserHistory = await UserHistoryServices.addUserHistory(newUserHistory);
            util.setSuccess(201, `new userHistory created!`, createdUserHistory);
            return util.send(res);
        } catch (error) {
            util.setError(400, error);
            return util.send(res);
        }
    }

    static async updateUserHistoryById(req, res) {
        const id = req.params.id;
        const updateUserHistory = req.body;
        if (!Number.isInteger(Number(id))) {
            util.setError(400, 'Please input a valid numeric value');
            return util.send(res);
        }
        try {
            let updatesUserHistory = null;
            updatesUserHistory = await UserHistoryServices.updateUserHistoryById(id, updateUserHistory)
            if (updatesUserHistory) {
                util.setSuccess(201, `UserHistory ${id} updated!`, updateUserHistory);
            } else {
                util.setSuccess(204, `Could not update userHistory ${id}!`, "")
            }
            return util.send(res);
        } catch (error) {
            util.setError(400, error);
            return util.send(res);
        }
    }

    static async deleteUserHistoryById(req, res) {
        const id = req.params.id;
        if (!Number.isInteger(Number(id))) {
            util.setError(400, 'Please input a valid numeric value');
            return util.send(res);
        }
        try {
            const userHistoryToDelete = await UserHistoryServices.deleteUserHistoryById(id);
            if (userHistoryToDelete) {
                util.setSuccess(200, `Deleted userHistory ${id}!`, userHistoryToDelete);
            } else {
                util.setSuccess(204, `The userHistory you are looking for can not be found`, "");
            }
            return util.send(res);
        } catch (error) {
            util.setError(400, error);
            return util.send(res);
        }
    }

    static async getUserHistoryByProject(req, res) {
        const requiredUserHistory = req.params.project;
        try {
            const returnedUserHistory = await UserHistoryServices.getUserHistoryByProject(requiredUserHistory)
            if (returnedUserHistory) {
                util.setSuccess(200, `UserHistory returned!`, returnedUserHistory);
            } else {
                util.setSuccess(204, `Could not found userHistories!`, "");
            }
            return util.send(res);
        } catch (error) {
            util.setError(400, error);
            return util.send(res);
        }
    }

}
export default UserHistoryController;