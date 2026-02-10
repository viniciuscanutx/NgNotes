import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedCards } from './shared-cards';

describe('SharedCards', () => {
  let component: SharedCards;
  let fixture: ComponentFixture<SharedCards>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedCards]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SharedCards);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
