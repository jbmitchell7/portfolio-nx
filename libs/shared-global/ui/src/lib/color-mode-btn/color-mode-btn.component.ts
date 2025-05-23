import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'shared-ui-color-mode-btn',
  imports: [CommonModule, ButtonModule],
  templateUrl: './color-mode-btn.component.html',
})
export class ColorModeBtnComponent {
  darkMode = false;

  constructor() {
    this.#setDarkMode();
  }

  darkModeBtnClick(): void {
    this.darkMode = !this.darkMode;
    this.#toggleDarkMode();
    localStorage.setItem('darkModePreferred', this.darkMode.toString());
  }

  #setDarkMode(): void {
    const darkModePreference = localStorage.getItem('darkModePreferred');
    if (darkModePreference === 'true') {
      this.darkMode = true;
      this.#toggleDarkMode();
    }
  }

  #toggleDarkMode(): void {
    const element = document.querySelector('html');
    element?.classList.toggle('dark-mode', this.darkMode);
  }
}
