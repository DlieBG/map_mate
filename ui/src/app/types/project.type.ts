export interface Point {
    lat: number;
    lng: number;
}

export interface MapView {
    point: Point;
    zoom: number;
}

export interface Project {
    _id: string;
    name: string;
    description: string;
    view: MapView;
    goal?: Point;
}

export interface ProjectDto {
    name: string;
    description: string;
    view: MapView;
    goal?: Point;
}
