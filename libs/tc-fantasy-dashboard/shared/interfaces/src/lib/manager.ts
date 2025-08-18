export interface ManagerRes {
    user_id: string;
    settings: null;
    metadata: {
      team_name?: string;
    };
    league_id: string;
    is_owner: boolean;
    is_bot: boolean;
    display_name: string;
    avatar: string
}

export interface Manager extends ManagerRes {
  roster_id: number;
  avatarUrl?: string;
}
