import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeeklyTransactionsComponent } from './weekly-transactions.component';
import { provideHttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';

describe('WeeklyTransactionsComponent', () => {
  let component: WeeklyTransactionsComponent;
  let fixture: ComponentFixture<WeeklyTransactionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeeklyTransactionsComponent],
      providers: [provideHttpClient(), MessageService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeeklyTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
