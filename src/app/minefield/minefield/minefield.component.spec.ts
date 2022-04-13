import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinefieldComponent } from './minefield.component';

describe('MinefieldComponent', () => {
  let component: MinefieldComponent;
  let fixture: ComponentFixture<MinefieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MinefieldComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MinefieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
