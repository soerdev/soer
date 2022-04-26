import { TargetModel, TemplateModel } from "../../../api/targets/target.interface";



export function target2template(target: TargetModel): TemplateModel {

    const template: TemplateModel = JSON.parse(JSON.stringify(target));
    const progressClear = (tmpTask: TemplateModel) => {
        tmpTask.progress = 0;
        tmpTask.tasks.forEach(progressClear);
    }
    progressClear(template);
    return template;
}