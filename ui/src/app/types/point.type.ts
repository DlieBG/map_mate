import { Observable } from "rxjs";
import { Point } from "./project.type";

export interface PointMarkerGroup {
    _id: string;
    project: string;
    name: string;
    color: string;
}

export interface PointMarkerGroupDto {
    project: string;
    name: string;
    color: string;
}

export interface PointMarker {
    _id: string;
    group: string;
    point: Point;
}

export interface PointMarkerDto {
    group: string;
    point: Point;
}

export interface ExpandedPointMarkerGroup {
    pointMarkers: Observable<PointMarker[]>;
    icon: google.maps.Symbol;
    visible: boolean;
}
