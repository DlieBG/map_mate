import { Component, ViewChild } from '@angular/core';
import { GoogleMap } from '@angular/google-maps';
import { SyncService } from '../../services/sync/sync.service';

@Component({
    selector: 'app-project-streetview',
    templateUrl: './project-streetview.component.html',
    styleUrl: './project-streetview.component.scss'
})
export class ProjectStreetviewComponent {

    @ViewChild('streetview') streetview!: GoogleMap;

    constructor(
        private syncService: SyncService,
    ) { }

    mapInitialized() {
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
    }

    close() {
        window.close();
    }

}
