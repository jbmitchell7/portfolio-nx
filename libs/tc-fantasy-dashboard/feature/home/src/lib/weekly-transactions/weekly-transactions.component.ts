import { Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DividerModule } from 'primeng/divider';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { RosterMove } from '@tc-fantasy-dashboard/shared/interfaces';
import { LoadingComponent } from '@tc-fantasy-dashboard/shared/components';

@Component({
    selector: 'fd-weekly-transactions',
    imports: [CommonModule, ProgressSpinnerModule, DividerModule, ScrollPanelModule, LoadingComponent],
    templateUrl: './weekly-transactions.component.html',
    styleUrl: './weekly-transactions.component.css'
})
export class WeeklyTransactionsComponent {
  @Input({required: true}) rosterMoves: RosterMove[][] = [];
  @Input({required: true}) isLoading = true;
}
