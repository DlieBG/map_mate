import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectStreetviewComponent } from './project-streetview.component';

describe('ProjectStreetviewComponent', () => {
  let component: ProjectStreetviewComponent;
  let fixture: ComponentFixture<ProjectStreetviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProjectStreetviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectStreetviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
