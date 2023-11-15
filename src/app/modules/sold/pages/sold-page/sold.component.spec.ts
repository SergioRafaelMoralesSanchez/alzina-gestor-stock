import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoldComponent } from './sold.component';

describe('SoldComponent', () => {
  let component: SoldComponent;
  let fixture: ComponentFixture<SoldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SoldComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SoldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
