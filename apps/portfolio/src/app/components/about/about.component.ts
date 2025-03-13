import { Component } from '@angular/core';
import { about, skills } from './skills';
import { SectionWrapperComponent } from '../section-wrapper/section-wrapper.component';

@Component({
  selector: 'portfolio-about',
  imports: [SectionWrapperComponent],
  templateUrl: './about.component.html'
})
export class AboutComponent {
  jobSkills = skills;
  aboutMe = about;
}
