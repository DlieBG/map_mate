import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectForumComponent } from './project-forum.component';

describe('ProjectForumComponent', () => {
  let component: ProjectForumComponent;
  let fixture: ComponentFixture<ProjectForumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProjectForumComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectForumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
