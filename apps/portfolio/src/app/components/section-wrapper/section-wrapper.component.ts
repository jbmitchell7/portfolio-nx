import { Component, input } from '@angular/core';
import { PanelModule } from 'primeng/panel';

@Component({
  selector: 'portfolio-section-wrapper',
  imports: [PanelModule],
  templateUrl: './section-wrapper.component.html'
})
export class SectionWrapperComponent {
  readonly id = input.required<string>();
  readonly header = input.required<string>();
}
