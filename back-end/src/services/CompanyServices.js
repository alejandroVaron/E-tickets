import Company from '../../models/Company.js';

class CompanyServices {

    static async getAllCompanies() {
        try {
          return await Company.findAll();
        } catch (error) {
          throw error;
        }
    }

    static async addCompany(newCompany) {
        try {
          return await Company.create(newCompany);
        } catch (error) {
          throw error;
        }
    }

    static async updateCompanyById(id, updateCompany) {
        try {
          const companyToUpdate = await Company.findOne({
            where: { id_user: Number(id) }
          });
    
          if (companyToUpdate) {
            await Company.update(updateCompany, { where: { id_company: Number(id) } });
            return updateCompany;
          }
          return null;
        } catch (error) {
          throw error;
        }
    }

    static async deleteCompanyById(id) {
        try {
          const companyToDelete = await Company.findOne({ where: { id_company: Number(id) } });
    
          if (companyToDelete) {
            const deletedCompany = await Company.destroy({
              where: { id_company: Number(id) }
            });
            return deletedCompany;
          }
          return null;
        } catch (error) {
          throw error;
        }
    }

    static async getCompanyById(id) {
        try {
          const returnedCompany = await Company.findOne({
            where: { id_company: id }
          });
          return returnedCompany;
        } catch (error) {
          throw error;
        }
    }

}
export default CompanyServices;