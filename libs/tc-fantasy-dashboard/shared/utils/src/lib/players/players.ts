import { Player, NFLPositions, NBAPositions, LCSPositions } from '@tc-fantasy-dashboard/shared/interfaces';

export const sortPlayersByPosition = (
  a: Player,
  b: Player,
  sport: string
): number => {
  switch (sport) {
    case 'nfl':
      return sortNFLPlayers(a, b);
    case 'nba':
      return sortNBAPlayers(a, b);
    case 'lcs':
      return sortLCSPlayers(a, b);
    default:
      return a.position.localeCompare(b.position);
  }
};

export const sortNFLPlayers = (a: Player, b: Player): number => {
  if (a.position === b.position) {
    return a.full_name.localeCompare(b.full_name);
  }
  if (
    NFLPositions[a.position as keyof typeof NFLPositions] >= 0 &&
    NFLPositions[b.position as keyof typeof NFLPositions] >= 0
  ) {
    return (
      NFLPositions[a.position as keyof typeof NFLPositions] -
      NFLPositions[b.position as keyof typeof NFLPositions]
    );
  }
  if (NFLPositions[a.position as keyof typeof NFLPositions]) {
    return -1;
  }
  if (NFLPositions[b.position as keyof typeof NFLPositions]) {
    return 1;
  }
  return a.position.localeCompare(b.position);
};

export const sortNBAPlayers = (a: Player, b: Player): number => {
  if (a.position === b.position) {
    return a.full_name.localeCompare(b.full_name);
  }
  if (
    NBAPositions[a.position as keyof typeof NBAPositions] >= 0 &&
    NBAPositions[b.position as keyof typeof NBAPositions] >= 0
  ) {
    return (
      NBAPositions[a.position as keyof typeof NBAPositions] -
      NBAPositions[b.position as keyof typeof NBAPositions]
    );
  }
  if (NBAPositions[a.position as keyof typeof NBAPositions]) {
    return -1;
  }
  if (NBAPositions[b.position as keyof typeof NBAPositions]) {
    return 1;
  }
  return a.position.localeCompare(b.position);
};

export const sortLCSPlayers = (a: Player, b: Player): number => {
  if (a.position === b.position) {
    return a.full_name.localeCompare(b.full_name);
  }
  if (
    LCSPositions[a.position as keyof typeof LCSPositions] >=0 &&
    LCSPositions[b.position as keyof typeof LCSPositions] >=0
  ) {
    return (
      LCSPositions[a.position as keyof typeof LCSPositions] -
      LCSPositions[b.position as keyof typeof LCSPositions]
    );
  }
  if (LCSPositions[a.position as keyof typeof LCSPositions]) {
    return -1;
  }
  if (LCSPositions[b.position as keyof typeof LCSPositions]) {
    return 1;
  }
  return a.position.localeCompare(b.position);
};
