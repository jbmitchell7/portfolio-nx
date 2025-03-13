import { Component, OnInit } from '@angular/core';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { ExperienceComponent } from './components/experience/experience.component';
import { ProjectsListComponent } from './components/projects-list/projects-list.component';
import { ContactComponent } from './components/contact/contact.component';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { menuItems } from './data/nav-items';

@Component({
  selector: 'app-root',
  imports: [
    MenubarModule,
    HomeComponent,
    AboutComponent,
    ExperienceComponent,
    ProjectsListComponent,
    ContactComponent,
    ButtonModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  darkMode = false;
  menuItems = menuItems;

  ngOnInit(): void {
    const darkModePreference = localStorage.getItem('darkModePreferred');
    if (darkModePreference === 'true') {
      this.darkMode = true;
      this.#setDarkMode();
    }
  }

  toggleDarkMode(): void  {
    this.darkMode = !this.darkMode;
    this.#setDarkMode();
    localStorage.setItem('darkModePreferred', this.darkMode.toString())
  }

  #setDarkMode(): void {
    const element = document.querySelector('html');
    element?.classList.toggle('dark-mode', this.darkMode);
  }
}
