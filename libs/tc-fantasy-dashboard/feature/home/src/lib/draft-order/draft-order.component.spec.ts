import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DraftOrderComponent } from './draft-order.component';
import { mockDraft, mockLeague, mockManager } from '@tc-fantasy-dashboard/shared/mock-data';
import { ComponentRef } from '@angular/core';
import { SleeperApiService } from '@tc-fantasy-dashboard/shared/services';
import { provideHttpClient } from '@angular/common/http';

describe('DraftOrderComponent', () => {
  let component: DraftOrderComponent;
  let componentRef: ComponentRef<DraftOrderComponent>;
  let fixture: ComponentFixture<DraftOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DraftOrderComponent],
      providers: [SleeperApiService, provideHttpClient()]
    }).compileComponents();

    fixture = TestBed.createComponent(DraftOrderComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
  });

  it('should initialize managersList based on league input', () => {
    componentRef.setInput('league', {
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
    });
    fixture.detectChanges();

    expect(component.managersList().length).toEqual(2);
  });

  it('should handle empty draft_order gracefully', () => {
    componentRef.setInput('league', {
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
    });
    fixture.detectChanges();

    expect(component.managersList()).toEqual([]);
  });
});
