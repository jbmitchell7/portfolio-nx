import { Component } from '@angular/core';
import { education, work } from './experience';
import { SectionWrapperComponent } from '../section-wrapper/section-wrapper.component';
import { DividerModule } from 'primeng/divider';

@Component({
  selector: 'portfolio-experience',
  imports: [SectionWrapperComponent, DividerModule],
  templateUrl: './experience.component.html'
})
export class ExperienceComponent {
  education = education;
  work = work;
}
