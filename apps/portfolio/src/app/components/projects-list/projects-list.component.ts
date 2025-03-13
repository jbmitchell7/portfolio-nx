import { Component } from '@angular/core';
import { projects } from './projects';
import { AccordionModule } from 'primeng/accordion';
import { SectionWrapperComponent } from '../section-wrapper/section-wrapper.component';

@Component({
  selector: 'portfolio-projects-list',
  imports: [AccordionModule, SectionWrapperComponent],
  templateUrl: './projects-list.component.html'
})
export class ProjectsListComponent {
  projects = projects;
}
