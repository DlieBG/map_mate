import { Component, OnInit, ViewChild } from '@angular/core';
import { GoogleMap } from '@angular/google-maps';
import { SyncService } from '../../services/sync/sync.service';
import { interval, Observable, take } from 'rxjs';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'app-project-streetview',
    templateUrl: './project-streetview.component.html',
    styleUrl: './project-streetview.component.scss'
})
export class ProjectStreetviewComponent implements OnInit {

    @ViewChild('streetview') streetview!: GoogleMap;

    initialized$: Observable<number> = interval(1000).pipe(take(2));

    constructor(
        private title: Title,
        private syncService: SyncService,
    ) { }

    ngOnInit(): void {
        this.title.setTitle('Street View - Map Mate');
    }

    mapInitialized() {
        try {
            this.streetview.getStreetView().setVisible(true);

            this.streetview
                .getStreetView()
                .addListener('position_changed', () => {
                    this.syncService.setStreetViewPosition(this.streetview.getStreetView().getPosition());
                });

            this.syncService.streetViewPosition$.subscribe(
                (value) => {
                    this.streetview.getStreetView().setPosition(value);
                }
            );
        } catch {
            setTimeout(this.mapInitialized.bind(this), 1000);
        }
    }

    close() {
        window.close();
    }

}
