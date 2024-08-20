import { Component, Inject } from '@angular/core';
import { PointMarkerGroupDto } from '../../types/point.type';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PointService } from '../../services/point/point.service';

@Component({
    selector: 'app-point-marker-group-create',
    templateUrl: './point-marker-group-create.component.html',
    styleUrl: './point-marker-group-create.component.scss'
})
export class PointMarkerGroupCreateComponent {

    pointMarkerGroup: PointMarkerGroupDto = {
        project: '',
        name: '',
        color: '#ffff00',
    };

    constructor(
        @Inject(MAT_DIALOG_DATA)
        private project: string,
        private dialog: MatDialogRef<PointMarkerGroupCreateComponent>,
        private snackbar: MatSnackBar,
        private pointService: PointService,
    ) {
        this.pointMarkerGroup.project = project;
    }

    create() {
        this.pointService
            .create_group(this.pointMarkerGroup)
            .subscribe(
                () => {
                    this.snackbar.open('Point marker group created successfully', '', {
                        duration: 3000,
                    });

                    this.dialog.close();
                }
            );
    }

}
