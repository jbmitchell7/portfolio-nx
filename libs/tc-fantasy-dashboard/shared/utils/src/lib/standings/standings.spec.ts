import { getSeverity, getStandingsData, getStreakIcon } from './standings';
import { mockLeague } from '@tc-fantasy-dashboard/shared/mock-data';

describe('standings utilities', () => {
  it('getStandings', () => {
    const standingsData = getStandingsData(mockLeague);
    expect(standingsData.length).toEqual(1);
  })
  it('getSeverity', () => {
    expect(getSeverity('3w')).toBe('danger');
    expect(getSeverity('2w')).toBe('success');
    expect(getSeverity('3l')).toBe('info');
    expect(getSeverity('2l')).toBe('warning');
  });

  it('getStreakIcon', () => {
    expect(getStreakIcon('3w')).toBe('fa-solid fa-fire');
    expect(getStreakIcon('2w')).toBe('fa-regular fa-face-smile');
    expect(getStreakIcon('3l')).toBe('fa-regular fa-snowflake');
    expect(getStreakIcon('2l')).toBe('fa-regular fa-face-frown');
  });
});