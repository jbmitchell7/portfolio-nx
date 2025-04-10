import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DraftOrderComponent } from './draft-order.component';
import { mockDraft, mockLeague, mockManager } from '@tc-fantasy-dashboard/shared/mock-data';

describe('DraftOrderComponent', () => {
  let component: DraftOrderComponent;
  let fixture: ComponentFixture<DraftOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DraftOrderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DraftOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize managersList based on league input', () => {
    component.league = {
      ...mockLeague,
      managers: {
        '1': {
          ...mockManager,
          user_id: '1'
        },
        '2': {
          ...mockManager,
          user_id: '2'
        },
      },
      draft: {
        ...mockDraft,
        draft_order: {
          '1': 2,
          '2': 1,
        },
      },
    }
    component.ngOnChanges();

    expect(component.managersList.length).toEqual(2);
  });

  it('should handle empty draft_order gracefully', () => {
    component.league = {
      ...mockLeague,
      managers: {
        '1': {
          ...mockManager,
          user_id: '1'
        },
        '2': {
          ...mockManager,
          user_id: '2'
        },
      },
      draft: {
        ...mockDraft,
        draft_order: {},
      },
    }
    component.ngOnChanges();

    expect(component.managersList).toEqual([]);
  });
});
