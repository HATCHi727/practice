export class TemplateService {

    getTemplate() {

        return `
Техническое задание

Название проекта: {{name}}

Описание:
{{description}}

Требования:
{{requirements}}
`;
    }

}