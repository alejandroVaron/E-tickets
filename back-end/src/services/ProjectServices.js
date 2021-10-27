import Project from '../../models/Project.js';

class ProjectServices {

    static async getAllProjects() {
        try {
          return await Project.findAll();
        } catch (error) {
          throw error;
        }
    }

    static async addProject(newProjects) {
        try {
          return await Project.create(newProjects);
        } catch (error) {
          throw error;
        }
    }

    static async updateProjectById(id, updateProject) {
        try {
          const projectToUpdate = await Project.findOne({
            where: { id_project: Number(id) }
          });
    
          if (projectToUpdate) {
            await Project.update(updateProject, { where: { id_project: Number(id) } });
            return updateProject;
          }
          return null;
        } catch (error) {
          throw error;
        }
    }

    static async deleteProjectById(id) {
        try {
          const projectToDelete = await Project.findOne({ where: { id_project: Number(id) } });
    
          if (projectToDelete) {
            const deletedProject = await Project.destroy({
              where: { id_project: Number(id) }
            });
            return deletedProject;
          }
          return null;
        } catch (error) {
          throw error;
        }
    }

    static async getProjectById(id) {
        try {
          const returnedProject = await Project.findOne({
            where: { id_project: id }
          });
          return returnedProject;
        } catch (error) {
          throw error;
        }
    }

    static async getProjectsByCompany(id){
      try {
        const returnedProjects = await Project.findAll({
          where: { id_company: id }
        });
        return returnedProjects;
      } catch (error) {
        throw error;
      }
    }

}
export default ProjectServices;