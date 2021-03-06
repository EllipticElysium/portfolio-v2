const Database = require('../database');

class Projects
{
    static builder;

    static async get(id) {
        let db = Database.connect();
        let project = await db.getProject(id);
        project[0].images = Projects.generateList(await db.getProjectImages(id));
        project[0].technologies = Projects.generateList(await db.getProjectTechnologies(id));
        project[0].skills = Projects.generateList(await db.getProjectSkills(id));
        return project;
    }

    static async getAll() {
        Projects.builder = [];
        let db = Database.connect();
        Projects.builder = await db.getAllProjects();
        Projects.addToProject("images", await db.getAllImages());
        Projects.addToProject("tags", await db.getAllProjectTags());
        Projects.addToProject("technologies", await db.getAllTechnologies());
        Projects.addToProject("skills", await db.getAllSkills());

        return Projects.builder;
    }

    static async getTags() {
        let db = Database.connect();
        return await db.getAllUniqueProjectTags();
    }

    static generateList(objArray) {
        return objArray.map(obj => obj.name);
    }

    static addToProject(type, arr) {
        arr.forEach((el) => {
            let project = Projects.builder.find(x => x.id === el.project_id);
            if (!project[type]) {
                project[type] = [];
            }
            project[type].push(el.name);
        });
    }
}

module.exports = Projects;