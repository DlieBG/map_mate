import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PointMarker, PointMarkerDto, PointMarkerGroup, PointMarkerGroupDto } from '../../types/point.type';

@Injectable({
    providedIn: 'root'
})
export class PointService {

    constructor(
        private httpClient: HttpClient,
    ) { }

    get_groups(project: string): Observable<PointMarkerGroup[]> {
        return this.httpClient.get<PointMarkerGroup[]>(`api/point/group/${project}`);
    }

    create_group(group: PointMarkerGroupDto): Observable<null> {
        return this.httpClient.post<null>('api/point/group', group);
    }

    get_markers(group: string): Observable<PointMarker[]> {
        return this.httpClient.get<PointMarker[]>(`api/point/marker/${group}`);
    }

    create_marker(marker: PointMarkerDto): Observable<null> {
        return this.httpClient.post<null>('api/point/marker', marker);
    }

}
