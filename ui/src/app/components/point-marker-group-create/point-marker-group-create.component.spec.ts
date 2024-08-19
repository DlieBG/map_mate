import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PointMarkerGroupCreateComponent } from './point-marker-group-create.component';

describe('PointMarkerGroupCreateComponent', () => {
  let component: PointMarkerGroupCreateComponent;
  let fixture: ComponentFixture<PointMarkerGroupCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PointMarkerGroupCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PointMarkerGroupCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
