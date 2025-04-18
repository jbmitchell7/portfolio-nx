import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import { ColorModeBtnComponent } from "../color-mode-btn/color-mode-btn.component";

@Component({
  selector: 'shared-ui-navbar',
  imports: [CommonModule, MenubarModule, ColorModeBtnComponent],
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {
  readonly menuItems = input.required<MenuItem[]>();
  readonly logoPath = input<string>();
}
