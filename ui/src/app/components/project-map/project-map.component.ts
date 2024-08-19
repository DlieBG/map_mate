import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { GoogleMap } from '@angular/google-maps';
import { Project } from '../../types/project.type';
import { SyncService } from '../../services/sync/sync.service';
import { Observable, take, tap } from 'rxjs';
import { ExpandedPointMarkerGroup, PointMarker, PointMarkerGroup } from '../../types/point.type';
import { PointService } from '../../services/point/point.service';
import { MatDialog } from '@angular/material/dialog';
import { PointMarkerGroupCreateComponent } from '../point-marker-group-create/point-marker-group-create.component';

@Component({
    selector: 'app-project-map',
    templateUrl: './project-map.component.html',
    styleUrl: './project-map.component.scss'
})
export class ProjectMapComponent implements OnInit {

    @Input() project!: Project;

    @ViewChild('map') map!: GoogleMap;

    options!: google.maps.MapOptions;

    streetViewLabel = {
        text: "\ue4eb",
        fontFamily: "Material Icons",
        color: "#ffffff",
        fontSize: "24px",
    };

    map3dLabel = {
        text: "\ue84d",
        fontFamily: "Material Icons",
        color: "#ffffff",
        fontSize: "24px",
    };

    pointMarkerGroups$!: Observable<PointMarkerGroup[]>;

    expandedPointMarkerGroups = new Map<string, ExpandedPointMarkerGroup>();

    activeMousePosition?: google.maps.LatLng;

    activePointMarkerGroup?: PointMarkerGroup;
    activeMousePositionIcon: google.maps.Symbol = {
        path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
        fillOpacity: 1,
        scale: 6,
        strokeWeight: 6,
        fillColor: '',
        strokeColor: '',
    };

    constructor(
        private dialog: MatDialog,
        public syncService: SyncService,
        private pointService: PointService,
    ) { }

    ngOnInit(): void {
        this.options = {
            mapTypeId: 'hybrid',
            mapTypeControl: false,
            fullscreenControl: false,
            zoomControl: false,

            center: {
                lat: this.project.view.point.lat,
                lng: this.project.view.point.lng,
            },
            zoom: this.project.view.zoom,
        };

        this.getPointMarkerGroups();
    }

    mapInitialized() {
        try {
            this.map
                .getStreetView()
                .addListener('position_changed', () => {
                    this.syncService.setStreetViewPosition(this.map.getStreetView().getPosition(), true);

                    this.map.getStreetView().setVisible(false);
                });
        } catch {
            setTimeout(this.mapInitialized.bind(this), 1000);
        }
    }

    boundsChanged() {
        this.syncService.setMapCenterPosition(this.map.getCenter());
    }

    mapMousemove(event: any) {
        this.activeMousePosition = event.latLng;
    }

    mapMouseout() {
        delete this.activeMousePosition;
    }

    mapClick() {
        if (this.activePointMarkerGroup && this.activeMousePosition)
            this.pointService
                .create_marker({
                    group: this.activePointMarkerGroup._id,
                    point: {
                        lat: this.activeMousePosition.lat(),
                        lng: this.activeMousePosition.lng(),
                    },
                })
                .subscribe(
                    () => {
                        if (this.activePointMarkerGroup)
                            this.expandedPointMarkerGroups.set(this.activePointMarkerGroup._id, {
                                ...this.expandedPointMarkerGroups.get(this.activePointMarkerGroup._id) as ExpandedPointMarkerGroup,
                                pointMarkers: this.pointService.get_markers(this.activePointMarkerGroup._id),
                            });
                    }
                );
    }

    panToStreetView() {
        this.syncService.streetViewPosition$
            .pipe(
                take(1)
            )
            .subscribe(
                (position) => {
                    if (position)
                        this.map.panTo(position);
                }
            );
    }

    panToMap3dCenter() {
        this.syncService.map3dCenterPosition$
            .pipe(
                take(1)
            )
            .subscribe(
                (position) => {
                    if (position)
                        this.map.panTo(position);
                }
            );
    }

    createPointMarkerGroup() {
        this.dialog
            .open(PointMarkerGroupCreateComponent, {
                data: this.project._id,
            })
            .afterClosed()
            .subscribe(
                () => {
                    this.getPointMarkerGroups();
                }
            );
    }

    getPointMarkerGroups() {
        this.pointMarkerGroups$ = this.pointService
            .get_groups(this.project._id)
            .pipe(
                tap(
                    (groups) => {
                        for (let group of groups) {
                            this.expandedPointMarkerGroups.set(group._id, {
                                pointMarkers: this.pointService.get_markers(group._id),
                                icon: {
                                    path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
                                    fillOpacity: 1,
                                    scale: 6,
                                    strokeWeight: 6,
                                    fillColor: group.color,
                                    strokeColor: group.color,
                                } as any,
                                visible: true,
                            });
                        }
                    }
                )
            );
    }

    pointMarkerGroupExpandedChange(expanded: boolean, pointMarkerGroup: PointMarkerGroup) {
        setTimeout(() => {
            if (expanded) {
                this.activePointMarkerGroup = pointMarkerGroup;
                this.activeMousePositionIcon.fillColor = pointMarkerGroup.color;
                this.activeMousePositionIcon.strokeColor = pointMarkerGroup.color;
            }
            else {
                delete this.activePointMarkerGroup;
            }
        }, expanded ? 10 : 0);
    }

}
