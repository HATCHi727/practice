export class DocumentGenerator {

    generate(template, project) {

        let requirementsText = "";

        for (let req of project.requirements) {
            requirementsText += "- " + req + "\n";
        }

        let doc = template
            .replace("{{name}}", project.name)
            .replace("{{description}}", project.description)
            .replace("{{requirements}}", requirementsText);

        return doc;

    }

}