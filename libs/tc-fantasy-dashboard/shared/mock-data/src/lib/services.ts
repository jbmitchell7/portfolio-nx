import { of } from 'rxjs';
import { mockLeague } from './league';

export const mockLeagueInit = {
  selectedLeague$: of(mockLeague),
  isLoading$: of(false),
};