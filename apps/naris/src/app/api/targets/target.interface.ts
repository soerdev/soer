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
export interface RoadmapTask {
    title: string;
    progress: number;
    file?: string;
    children: RoadmapTask[];
}
