import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefineRoleComponent } from './define-role.component';

describe('DefineRoleComponent', () => {
  let component: DefineRoleComponent;
  let fixture: ComponentFixture<DefineRoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DefineRoleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DefineRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
