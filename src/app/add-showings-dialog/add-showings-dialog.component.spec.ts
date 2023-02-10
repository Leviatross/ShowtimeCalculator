import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddShowingsComponent } from './add-showings-dialog.component';

describe('AddShowingsComponent', () => {
  let component: AddShowingsComponent;
  let fixture: ComponentFixture<AddShowingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddShowingsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddShowingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
