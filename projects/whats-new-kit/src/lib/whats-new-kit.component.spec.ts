import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhatsNewKitComponent } from './whats-new-kit.component';

describe('WhatsNewKitComponent', () => {
  let component: WhatsNewKitComponent;
  let fixture: ComponentFixture<WhatsNewKitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WhatsNewKitComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WhatsNewKitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
