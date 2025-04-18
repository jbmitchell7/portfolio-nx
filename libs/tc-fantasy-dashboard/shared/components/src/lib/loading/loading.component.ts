import { Component, input } from '@angular/core';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'fd-loading',
  imports: [ProgressSpinnerModule],
  template:
  `
    <div class="h-full w-full flex flex-col items-center justify-center">
      <p-progress-spinner />
      <p class="text-center">{{message()}}</p>
    </div>
  `
})
export class LoadingComponent {
  readonly message = input<string>('Loading...');
}
