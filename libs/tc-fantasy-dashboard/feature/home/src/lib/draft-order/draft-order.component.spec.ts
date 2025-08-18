import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DraftOrderComponent } from './draft-order.component';
import {mockLeague} from '@tc-fantasy-dashboard/shared/mock-data';
import { ComponentRef } from '@angular/core';
import { SleeperApiService } from '@tc-fantasy-dashboard/shared/services';
import { provideHttpClient } from '@angular/common/http';
import { of } from 'rxjs';

describe('DraftOrderComponent', () => {
  let component: DraftOrderComponent;
  let componentRef: ComponentRef<DraftOrderComponent>;
  let fixture: ComponentFixture<DraftOrderComponent>;
  let sleeperApiService: SleeperApiService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DraftOrderComponent],
      providers: [SleeperApiService, provideHttpClient()],
    }).compileComponents();

    fixture = TestBed.createComponent(DraftOrderComponent);
    sleeperApiService = TestBed.inject(SleeperApiService);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
  });

  it('should return empty allPicks if no managers', () => {
    jest.spyOn(sleeperApiService, 'getTradedDraftPicks').mockReturnValue(of([]));
    componentRef.setInput('league', {...mockLeague, managers: undefined});
    fixture.detectChanges();

    expect(component.allPicks().length).toBe(0);
  });
});
