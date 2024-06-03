import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarVisitasComponent } from './registrar-visitas.component';

describe('RegistrarVisitasComponent', () => {
  let component: RegistrarVisitasComponent;
  let fixture: ComponentFixture<RegistrarVisitasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrarVisitasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegistrarVisitasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
