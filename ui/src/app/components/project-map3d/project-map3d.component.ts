import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SyncService } from '../../services/sync/sync.service';
import { filter, map, take } from 'rxjs';

@Component({
    selector: 'app-project-map3d',
    templateUrl: './project-map3d.component.html',
    styleUrl: './project-map3d.component.scss'
})
export class ProjectMap3dComponent implements OnInit {

    @ViewChild('body', {static: true}) body!: ElementRef<HTMLElement>;
    map3d!: any;

    constructor(
        private syncService: SyncService,
    ) { }

    ngOnInit(): void {
        this.syncService.mapCenterPosition$
            .pipe(
                filter(
                    (position) => {
                        return !!position;
                    }
                ),
                take(1),
                map(
                    (position) => {
                        return `${position?.lat},${position?.lng},1000`;
                    }
                )
            )
            .subscribe(
                (center) => {
                    this.map3d = document.createElement('gmp-map-3d');
                    this.map3d.setAttribute('center', center);
                    this.map3d.setAttribute('bounds', '');
                    this.body.nativeElement.appendChild(this.map3d);

                    this.map3d.addEventListener('gmp-centerchange', this.boundsChanged.bind(this));
                }
            );
    }

    boundsChanged() {
        this.syncService.setMap3dCenterPosition({
            lat: this.map3d.center.lat,
            lng: this.map3d.center.lng,
        });
    }

}
