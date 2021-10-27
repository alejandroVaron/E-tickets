import ProjectServices from '../services/ProjectServices.js'
import Util from '../Util/Util.js'

const util = new Util();

class ProjectController{

    static async getAllProjects(req, res) {
        try {
            const allProjects = await ProjectServices.getAllProjects();
            if (allProjects.length > 0) {
                util.setSuccess(200, 'Projects returned', allProjects)
            } else {
                util.setSuccess(204, 'No Projects found', "");
            }
            return util.send(res);
        } catch (error) {
            console.log(error)
            util.setError(400, error);
            return util.send(res);
        }
    }

    static async addProject(req, res) {
        const newProject = req.body;
        try {
            const createdProject = await ProjectServices.addProject(newProject);
            util.setSuccess(201, `new project created!`, createdProject);
            return util.send(res);
        } catch (error) {
            util.setError(400, error);
            return util.send(res);
        }
    }

    static async updateProjectById(req, res) {
        const id = req.params.id;
        const updateProject = req.body;
        if (!Number.isInteger(Number(id))) {
            util.setError(400, 'Please input a valid numeric value');
            return util.send(res);
        }
        try {
            let updatesProject = null;
            updatesProject = await ProjectServices.updateProjectById(id, updateProject)
            if (updatesProject) {
                util.setSuccess(201, `Project ${id} updated!`, updateProject);
            } else {
                util.setSuccess(204, `Could not update project ${id}!`, "")
            }
            return util.send(res);
        } catch (error) {
            util.setError(400, error);
            return util.send(res);
        }
    }

    static async deleteProjectById(req, res) {
        const id = req.params.id;
        if (!Number.isInteger(Number(id))) {
            util.setError(400, 'Please input a valid numeric value');
            return util.send(res);
        }
        try {
            const projectToDelete = await ProjectServices.deleteProjectById(id);
            if (projectToDelete) {
                util.setSuccess(200, `delete project ${id}!`, projectToDelete);
            } else {
                util.setSuccess(204, `The project you are looking for can not be found`, "");
            }
            return util.send(res);
        } catch (error) {
            util.setError(400, error);
            return util.send(res);
        }
    }

    static async getProjectById(req, res) {
        const requiredProject = req.params.id;
        try {
            const returnedProject = await ProjectServices.getProjectById(requiredProject)
            if (returnedProject) {
                util.setSuccess(200, `Project ${requiredProject} returned!`, returnedProject);
            } else {
                util.setSuccess(204, `Could not found project ${requiredProject}!`, "");
            }
            return util.send(res);
        } catch (error) {
            util.setError(400, error);
            return util.send(res);
        }
    }

    static async getProjectsByCompany(req, res){
        const requiredProjects = req.params.company;
        try {
            const returnedProjects = await ProjectServices.getProjectsByCompany(requiredProjects)
            if (returnedProjects) {
                util.setSuccess(200, `Projects returned by company!`, returnedProjects);
            } else {
                util.setSuccess(204, `Could not found projects!`, "");
            }
            return util.send(res);
        } catch (error) {
            util.setError(400, error);
            return util.send(res);
        }
    }

}
export default ProjectController;