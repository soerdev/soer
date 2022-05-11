export interface PersonalTarget {
    id?: number;
    title: string;
    overview: string;
    activity: string;
    tasks: RoadmapTask[];
}

export interface TargetModel {
    id?: number;
    title: string;
    overview: string;
    progress: number;
    tasks: TargetModel[];
}

export interface TemplateModel {
    id?: number;
    title: string;
    overview: string;
    progress: number;
    tasks: TemplateModel[];
}
export interface RoadmapTask {
    title: string;
    progress: number;
    file?: string;
    children: RoadmapTask[];
}

export const EmptyTarget: TargetModel = {
    id: -1,
    title: '',
    overview: '',
    progress: 0,
    tasks: []
}

export interface Visibility {
    [id: string]: boolean;
}