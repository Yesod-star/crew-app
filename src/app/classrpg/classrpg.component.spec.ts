import { ComponentFixture, TestBed } from '@angular/core/testing';

import { classRpgComponent } from './classrpg.component';

describe('classRpgComponent', () => {
  let component: classRpgComponent;
  let fixture: ComponentFixture<classRpgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [classRpgComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(classRpgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
