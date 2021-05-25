import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IventoryListComponent } from './iventory-list.component';

describe('IventoryListComponent', () => {
  let component: IventoryListComponent;
  let fixture: ComponentFixture<IventoryListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IventoryListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IventoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
