import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RealizarpagoComponent } from './realizarpago.component';

describe('RealizarpagoComponent', () => {
  let component: RealizarpagoComponent;
  let fixture: ComponentFixture<RealizarpagoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RealizarpagoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RealizarpagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
