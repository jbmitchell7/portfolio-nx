export interface ProjectItem {
	title: string;
	description: string;
	screenshot: string;
	github: string;
  githubSecondary?: string;
	projectUrl?: string;
}

export const projects: ProjectItem[] = [
	{
		title: "TC Fantasy Dashboard",
		description: "A MEAN stack project that uses the Sleeper Fantasy App API to display live data and charts on your favorite Sleeper fantasy league. If you have a league ID enter it in the field, if not feel free to use 725424222041657344 as an example.",
		screenshot: "img/projects/sff.png",
		github: "https://github.com/jbmitchell7/tc-fantasy-dashboard",
    githubSecondary: "https://github.com/jbmitchell7/tc-fantasy-dashboard-be",
		projectUrl: "https://fantasy-dashboard.thundercloud.dev"
	},
	{
		title: "Flickbase",
		description: "A React-Native project that is a front end for themoviedb.org API on the Google Play Store. It includes the ability to log in to existing TMDB accounts, as well as creating and updating a watchlist unique to the flickbase app. Users can search for movies, TV shows, and people in the film and television industry.",
		screenshot: "img/projects/flickbase.png",
		github: "https://github.com/jbmitchell7/flickbase",
		projectUrl: "https://play.google.com/store/apps/details?id=cloud.jakemitchell.flickbase"
	},
	{
		title: "Space Renegade",
		description: "A game built using Python and the Kivy engine. It is a pixel art game where you control a ship and must dodge incoming asteroids while trying to shoot down alien ships. The more alien ships you destroy, the higher your score. It can be run on a computer using Python.",
		screenshot: "img/projects/space-renegade.png",
		github: "https://github.com/jbmitchell7/Space_Renegade"
	},
]