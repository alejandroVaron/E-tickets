import CompanyServices from '../services/CompanyServices.js'
import Util from '../Util/Util.js'

const util = new Util();

class CompanyController{

    static async getAllCompanies(req, res) {
        try {
            const allCompanies = await CompanyServices.getAllCompanies();
            if (allCompanies.length > 0) {
                util.setSuccess(200, 'Companies returned', allCompanies)
            } else {
                util.setSuccess(204, 'No companies found', "");
            }
            return util.send(res);
        } catch (error) {
            console.log(error)
            util.setError(400, error);
            return util.send(res);
        }
    }

    static async addCompany(req, res) {
        const newCompany = req.body;
        try {
            const createdCompany = await CompanyServices.addCompany(newCompany);
            util.setSuccess(201, `new company created!`, createdCompany);
            return util.send(res);
        } catch (error) {
            util.setError(400, error);
            return util.send(res);
        }
    }

    static async updateCompanyById(req, res) {
        const id = req.params.id;
        const updateCompany = req.body;
        if (!Number.isInteger(Number(id))) {
            util.setError(400, 'Please input a valid numeric value');
            return util.send(res);
        }
        try {
            let updatesCompany = null;
            updatesCompany = await CompanyServices.updateCompanyById(id, updateCompany)
            if (updatesCompany) {
                util.setSuccess(201, `Company ${id} updated!`, updateCompany);
            } else {
                util.setSuccess(204, `Could not update company ${id}!`, "")
            }
            return util.send(res);
        } catch (error) {
            util.setError(400, error);
            return util.send(res);
        }
    }

    static async deleteCompanyById(req, res) {
        const id = req.params.id;
        console.log(id)
        if (!Number.isInteger(Number(id))) {
            util.setError(400, 'Please input a valid numeric value');
            return util.send(res);
        }
        try {
            const companyToDelete = await CompanyServices.deleteCompanyById(id);
            if (companyToDelete) {
                util.setSuccess(200, `Deleted company ${id}!`, companyToDelete);
            } else {
                util.setSuccess(204, `The company you are looking for can not be found`, "");
            }
            return util.send(res);
        } catch (error) {
            util.setError(400, error);
            return util.send(res);
        }
    }

    static async getCompanyById(req, res) {
        const requiredCompany = req.params.id;
        try {
            const returnedCompany = await CompanyServices.getCompanyById(requiredCompany)
            if (returnedCompany) {
                util.setSuccess(200, `Company ${requiredCompany} returned!`, returnedCompany);
            } else {
                util.setSuccess(204, `Could not found company ${requiredCompany}!`, "");
            }
            return util.send(res);
        } catch (error) {
            util.setError(400, error);
            return util.send(res);
        }
    }

}
export default CompanyController;