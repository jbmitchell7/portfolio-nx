import { MenuItem } from "primeng/api";

export const MENU_ROUTES: MenuItem[] = [
  {
    label: 'Home',
    routerLink: ['home'],
    icon: 'fa-solid fa-house'
  },
  {
    label: 'Standings',
    routerLink: ['standings'],
    icon: 'fa-solid fa-list-ol'
  },
  {
    label: 'Rosters',
    routerLink: ['rosters'],
    icon: 'fa-solid fa-people-group'
  },
  // matchups
  // transactions
  // rivalry
  // drafts
  // history
  // records
];