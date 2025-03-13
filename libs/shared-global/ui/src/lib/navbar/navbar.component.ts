import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'shared-ui-navbar',
  imports: [CommonModule, MenubarModule, ButtonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  @Input({required: true}) menuItems!: MenuItem[];
  darkMode = false;

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
