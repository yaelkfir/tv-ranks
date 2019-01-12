import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RankedItemComponent } from './ranked-item.component';

describe('RankedItemComponent', () => {
  let component: RankedItemComponent;
  let fixture: ComponentFixture<RankedItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RankedItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RankedItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
