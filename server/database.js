class Database
{
	static instance = null;
	con = null;
	query = null;

	static connect() {
		if (Database.instance === null) {
			Database.instance = new Database();
			return Database.instance;
		} else {
			return Database.instance;
		}
	}

	
	constructor() {
		const mysql = require('mysql');
		const util = require('util');
		this.con = mysql.createConnection({
			host: process.env.DB_HOST,
			user: process.env.DB_USER,
			password: process.env.DB_PASSWORD,
			database: process.env.DB_DATABASE
		});
		this.con.connect(err => {
			if (err) throw err;
		});
		this.query = util.promisify(this.con.query).bind(this.con);
	}

	async getProject(id) {
		return await this.query(`
		select
			projects.id,
			projects.title,
			projects.summary,
			projects.description,
			projects.liveLink,
			projects.sourceLink
		from
			projects
		WHERE
			projects.id = ?
		`,
			[id]
		);
	}

	async getProjectTechnologies(id) {
		return await this.query(`
			SELECT
				technologies.id,
				technologies.name AS name
			FROM
				technologies
			JOIN
				uses_technology
			ON
				uses_technology.technology_id = technologies.id
			WHERE
				uses_technology.project_id = ?
		`, [id]
		)
	}

	async getProjectSkills(id) {
		return await this.query(`
			SELECT
				skills.id,
				skills.name AS name
			FROM
				skills
			JOIN
				uses_skill
			ON
				uses_skill.skill_id = skills.id
			WHERE
				uses_skill.project_id = ?
		`, [id]
		)
	}

	async getProjectImages(id) {
		return await this.query("SELECT id, filename AS name, alt FROM images WHERE project_id = ?", [id]);
	}

	async getAllProjects() {
		return await this.query("SELECT * FROM projects");
	}

	async getAllImages() {
		return await this.query("SELECT filename AS name, project_id FROM images");
	}

	async getAllProjectTags() {
		return await this.query(`
			SELECT
				tags.name AS name,
				tagged_by.project_id
			FROM
				projects
			JOIN
				tagged_by
			ON
				projects.id = tagged_by.project_id
			JOIN
				tags
			ON
				tagged_by.tag_id = tags.id
		`);
	}

	async getAllUniqueProjectTags() {
		return await this.query("SELECT id, name FROM tags");
	}

	async getAllTechnologies() {
		return await this.query(`
			SELECT
				technologies.name AS name,
				uses_technology.project_id
			FROM
				projects
			JOIN
				uses_technology
			ON
				projects.id = uses_technology.project_id
			JOIN
				technologies
			ON
				uses_technology.technology_id = technologies.id
		`);
	}

	async getAllSkills() {
		return await this.query(`
			SELECT
				skills.name AS name,
				uses_skill.project_id
			FROM
				projects
			JOIN
				uses_skill
			ON
				projects.id = uses_skill.project_id
			JOIN
				skills
			ON
				uses_skill.skill_id = skills.id
		`);
	}
}

module.exports = Database;