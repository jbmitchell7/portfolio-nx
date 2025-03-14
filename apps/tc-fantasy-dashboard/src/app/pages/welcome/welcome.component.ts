import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { leagueEntryRequest } from '../../store/global.actions';
import { FormControl, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Router } from '@angular/router';
import { IconAttributionComponent } from '../../components/icon-attribution/icon-attribution.component';
import { ColorModeBtnComponent } from '@shared-global/ui';

@Component({
  imports: [
    CommonModule,
    ButtonModule,
    InputTextModule,
    ReactiveFormsModule,
    FormsModule,
    IconAttributionComponent,
    ColorModeBtnComponent
  ],
  selector: 'fd-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent {
  readonly #store = inject(Store);
  readonly #router = inject(Router);

  leagueInputForm = new FormControl<string>('', [Validators.required, Validators.minLength(3)]);

  setLeagueId(): void {
    const id = this.leagueInputForm.value ?? '';
    this.#store.dispatch(leagueEntryRequest({ leagueId: id }));
    this.#router.navigate(['league']);
  }
}
