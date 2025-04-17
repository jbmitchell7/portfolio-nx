export interface Manager {
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
    avatarUrl?: string;
}
