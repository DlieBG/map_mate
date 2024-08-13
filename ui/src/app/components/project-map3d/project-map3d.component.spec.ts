import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectMap3dComponent } from './project-map3d.component';

describe('ProjectMap3dComponent', () => {
  let component: ProjectMap3dComponent;
  let fixture: ComponentFixture<ProjectMap3dComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProjectMap3dComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectMap3dComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
