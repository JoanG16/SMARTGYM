import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembresiasFormComponent } from './membresias-form.component';

describe('MembresiasFormComponent', () => {
  let component: MembresiasFormComponent;
  let fixture: ComponentFixture<MembresiasFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MembresiasFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MembresiasFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
