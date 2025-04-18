import { sortPlayersByPosition } from './players';
import { Player } from '@tc-fantasy-dashboard/shared/interfaces';

describe('sortPlayersByPosition', () => {
  it('should sort NFL players by position and name', () => {
    const players: Player[] = [
      {
        position: 'WR',
        full_name: 'Player B',
        injury_status: '',
        team: '',
        first_name: '',
        last_name: '',
        fantasy_positions: [],
        player_id: '',
        sport: '',
        active: false,
        age: 0,
        depth_chart_order: 0,
        years_exp: 0,
        high_school: '',
        height: 0,
        number: 0,
        weight: 0,
        college: ''
      },
      {
        position: 'QB',
        full_name: 'Player A',
        injury_status: '',
        team: '',
        first_name: '',
        last_name: '',
        fantasy_positions: [],
        player_id: '',
        sport: '',
        active: false,
        age: 0,
        depth_chart_order: 0,
        years_exp: 0,
        high_school: '',
        height: 0,
        number: 0,
        weight: 0,
        college: ''
      },
      {
        position: 'WR',
        full_name: 'Player A',
        injury_status: '',
        team: '',
        first_name: '',
        last_name: '',
        fantasy_positions: [],
        player_id: '',
        sport: '',
        active: false,
        age: 0,
        depth_chart_order: 0,
        years_exp: 0,
        high_school: '',
        height: 0,
        number: 0,
        weight: 0,
        college: ''
      },
    ];
    const toSort = [...players];
    toSort.sort((a, b) => sortPlayersByPosition(a, b, 'nfl'));
    expect(toSort[0]).toEqual(players[1]);
    expect(toSort[1]).toEqual(players[2]);
    expect(toSort[2]).toEqual(players[0]);
  });

  it('should sort NBA players by position and name', () => {
    const players: Player[] = [
      {
        position: 'SG',
        full_name: 'Player B',
        injury_status: '',
        team: '',
        first_name: '',
        last_name: '',
        fantasy_positions: [],
        player_id: '',
        sport: '',
        active: false,
        age: 0,
        depth_chart_order: 0,
        years_exp: 0,
        high_school: '',
        height: 0,
        number: 0,
        weight: 0,
        college: ''
      },
      {
        position: 'PG',
        full_name: 'Player A',
        injury_status: '',
        team: '',
        first_name: '',
        last_name: '',
        fantasy_positions: [],
        player_id: '',
        sport: '',
        active: false,
        age: 0,
        depth_chart_order: 0,
        years_exp: 0,
        high_school: '',
        height: 0,
        number: 0,
        weight: 0,
        college: ''
      },
      {
        position: 'SG',
        full_name: 'Player A',
        injury_status: '',
        team: '',
        first_name: '',
        last_name: '',
        fantasy_positions: [],
        player_id: '',
        sport: '',
        active: false,
        age: 0,
        depth_chart_order: 0,
        years_exp: 0,
        high_school: '',
        height: 0,
        number: 0,
        weight: 0,
        college: ''
      },
    ];
    const sorted = [...players];
    sorted.sort((a, b) => sortPlayersByPosition(a, b, 'nba'));
    expect(sorted[0]).toEqual(players[1]);
    expect(sorted[1]).toEqual(players[2]);
    expect(sorted[2]).toEqual(players[0]);
  });

  it('should sort LCS players by position and name', () => {
    const players: Player[] = [
      {
        position: 'ADC',
        full_name: 'Player B',
        injury_status: '',
        team: '',
        first_name: '',
        last_name: '',
        fantasy_positions: [],
        player_id: '',
        sport: '',
        active: false,
        age: 0,
        depth_chart_order: 0,
        years_exp: 0,
        high_school: '',
        height: 0,
        number: 0,
        weight: 0,
        college: ''
      },
      {
        position: 'MID',
        full_name: 'Player A',
        injury_status: '',
        team: '',
        first_name: '',
        last_name: '',
        fantasy_positions: [],
        player_id: '',
        sport: '',
        active: false,
        age: 0,
        depth_chart_order: 0,
        years_exp: 0,
        high_school: '',
        height: 0,
        number: 0,
        weight: 0,
        college: ''
      },
      {
        position: 'ADC',
        full_name: 'Player A',
        injury_status: '',
        team: '',
        first_name: '',
        last_name: '',
        fantasy_positions: [],
        player_id: '',
        sport: '',
        active: false,
        age: 0,
        depth_chart_order: 0,
        years_exp: 0,
        high_school: '',
        height: 0,
        number: 0,
        weight: 0,
        college: ''
      },
    ];
    const sorted = [...players];
    sorted.sort((a, b) => sortPlayersByPosition(a, b, 'lcs'));
    expect(sorted[0]).toEqual(players[1]);
    expect(sorted[1]).toEqual(players[2]);
    expect(sorted[2]).toEqual(players[0]);
  });
});
