import { Component, inject } from '@angular/core';
import {
  FormControl,
  Validators,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Router } from '@angular/router';
import { ColorModeBtnComponent } from '@shared-global/ui';
import { LeagueInitService } from '@tc-fantasy-dashboard/shared/services';
import { IconAttributionComponent } from '@tc-fantasy-dashboard/shared/components';

@Component({
  imports: [
    CommonModule,
    ButtonModule,
    InputTextModule,
    ReactiveFormsModule,
    FormsModule,
    ColorModeBtnComponent,
    IconAttributionComponent
  ],
  selector: 'fd-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
})
export class WelcomeComponent {
  readonly #router = inject(Router);
  readonly #leagueInitService = inject(LeagueInitService);

  leagueInputForm = new FormControl<string>('', [
    Validators.required,
    Validators.minLength(3),
  ]);

  setLeagueId(): void {
    const id = this.leagueInputForm.value ?? '';
    this.#leagueInitService.initLeague(id);
    this.#router.navigate(['league']);
  }
}
