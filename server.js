import express from "express";
import { ProjectService } from "./services/projectService.js";
import { TemplateService } from "./services/templateService.js";
import { DocumentGenerator } from "./services/documentGenerator.js";

const app = express();
app.use(express.json());

const projectService = new ProjectService();
const templateService = new TemplateService();
const generator = new DocumentGenerator();

// Валидация
app.post("/api/projects", (req, res, next) => {
    try {
        const { name } = req.body;
        if (!name || name.trim().length < 3) {
            return res.status(400).json({ error: "Project name must be at least 3 characters" });
        }
        const newProject = projectService.createProject(req.body);
        res.status(201).json(newProject);
    } catch (err) {
        next(err);
    }
});

app.get("/api/projects/:id/export", (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        const project = projectService.loadProject(id);
        if (!project) {
            return res.status(404).json({ error: "Project not found" });
        }
        const template = templateService.getTemplate();
        const document = generator.generate(template, project);
        res.send(document);
    } catch (err) {
        next(err);
    }
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

// Глобальный обработчик ошибок
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: "Internal server error" });
});

app.listen(3000, () => {
    console.log("Server started on port 3000");
});