export interface Point {
    x: number;
    y: number;
}

export interface Project {
    _id: string;
    name: string;
    description: string;
    goal?: Point;
}

export interface ProjectDto {
    name: string;
    description: string;
    goal?: Point;
}
