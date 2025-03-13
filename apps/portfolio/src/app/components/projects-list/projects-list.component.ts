import { Component } from '@angular/core';
import { projects } from '../../data/projects';
import { AccordionModule } from 'primeng/accordion';
import { SectionWrapperComponent } from '../section-wrapper/section-wrapper.component';

@Component({
  selector: 'projects-list',
  imports: [AccordionModule, SectionWrapperComponent],
  templateUrl: './projects-list.component.html'
})
export class ProjectsListComponent {
  projects = projects;
}
