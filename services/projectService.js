import fs from "fs";

export class ProjectService {

    loadProject(id) {

        const raw = fs.readFileSync("./data/projects.json");

        const data = JSON.parse(raw);

        const project = data.projects.find(p => p.id === id);

        return project;
    }

}