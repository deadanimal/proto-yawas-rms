import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IventoryItemManagementComponent } from './iventory-item-management.component';

describe('IventoryItemManagementComponent', () => {
  let component: IventoryItemManagementComponent;
  let fixture: ComponentFixture<IventoryItemManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IventoryItemManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IventoryItemManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
