import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CredencialmiembroComponent } from './credencialmiembro.component';

describe('CredencialmiembroComponent', () => {
  let component: CredencialmiembroComponent;
  let fixture: ComponentFixture<CredencialmiembroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CredencialmiembroComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CredencialmiembroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
