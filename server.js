import express from "express";
import { ProjectService } from "./services/projectService.js";
import { TemplateService } from "./services/templateService.js";
import { DocumentGenerator } from "./services/documentGenerator.js";

const app = express();
app.use(express.json());   // добавлено

const projectService = new ProjectService();
const templateService = new TemplateService();
const generator = new DocumentGenerator();

// Новый маршрут
app.post("/api/projects", (req, res) => {
    const projectData = req.body;
    const newProject = projectService.createProject(projectData);
    res.status(201).json(newProject);
});

app.get("/api/projects/:id/export", (req, res) => {
    const id = parseInt(req.params.id);
    const project = projectService.loadProject(id);
    if (!project) {
        return res.status(404).send("Project not found");
    }
    const template = templateService.getTemplate();
    const document = generator.generate(template, project);
    res.send(document);
});

app.get("/heavy", (req, res) => {
    console.time("heavy-calculation");
    let total = 0;
    for (let i = 0; i < 500000; i++) {
        total += i;
    }
    console.timeEnd("heavy-calculation");
    res.send("Calculation finished");
});

app.listen(3000, () => {
    console.log("Server started on port 3000");
});