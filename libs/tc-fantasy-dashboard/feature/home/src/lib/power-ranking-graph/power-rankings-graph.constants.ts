export interface ChartData {
  x: number;
  y: number;
  r: number;
  manager: string;
  points: number;
  losses: number;
}

export const TITLE_TEXT = 'Team/Manager Trends';

export const SUBTITLE_TEXT = [
  'Better teams are further right',
  'More successful teams are higher up',
  'Better managers have larger dots',
  'Dot size is % of max points the team scored'
];

export const GRAPH_COLORS = [
  '#e6194b',
  '#3cb44b',
  '#ffe119',
  '#4363d8',
  '#f58231',
  '#911eb4',
  '#46f0f0',
  '#f032e6',
  '#bcf60c',
  '#fabebe',
  '#008080',
  '#e6beff',
  '#9a6324',
  '#fffac8',
  '#800000',
  '#aaffc3',
  '#808000',
  '#ffd8b1',
  '#000075',
  '#808080',
  '#ffffff',
  '#000000'
];

const SCALE_BORDER = {
  grid: {
    color: 'white',
  }
};

const AXIS_TITLE = {
  display: true,
  font: {
    weight: 'bold'
  }
};

export const DEFAULT_CHART_OPTIONS = {
  layout: {
    padding: {
      top: 20,
      bottom: 20
    }
  },
  scales: {
    y: {
      ...SCALE_BORDER,
      min: 0,
      title: {
        ...AXIS_TITLE,
        text: 'Wins'
      }
    },
    x: {
      ...SCALE_BORDER,
      title: {
        ...AXIS_TITLE,
        text: 'Max Points',
      }
    }
  },
  plugins: {
    legend: {
      display: false
    },
    tooltip: {
      displayColors: false,
      callbacks: {
        label: (context: any) => {
          const team = context.dataset.data[context.dataIndex];
          const points = team.points;
          const max = team.x;
          const record = `${team.y}-${team.losses}`
          return [`Points: ${points}`, `Max Points: ${max}`, `Record: ${record}`];
        }
      }
    }
  }
};