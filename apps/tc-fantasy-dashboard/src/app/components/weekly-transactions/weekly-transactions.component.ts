import { Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DividerModule } from 'primeng/divider';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { Transaction } from '@tc-fantasy-dashboard/shared/interfaces';

@Component({
    selector: 'fd-weekly-transactions',
    imports: [CommonModule, ProgressSpinnerModule, DividerModule, ScrollPanelModule],
    templateUrl: './weekly-transactions.component.html',
    styleUrl: './weekly-transactions.component.scss'
})
export class WeeklyTransactionsComponent {
  @Input({required: true}) transactions: Transaction[] = [];
  @Input({required: true}) isLoading = true;
}
