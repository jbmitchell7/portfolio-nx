import { Component, Input } from '@angular/core';
import { PanelModule } from 'primeng/panel';

@Component({
  selector: 'portfolio-section-wrapper',
  imports: [PanelModule],
  templateUrl: './section-wrapper.component.html'
})
export class SectionWrapperComponent {
  @Input({required: true}) id!: string;
  @Input({required: true}) header!: string;
}
