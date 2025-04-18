import { Component, computed, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartModule } from 'primeng/chart';
import { ChartData, DEFAULT_CHART_OPTIONS, GRAPH_COLORS, SUBTITLE_TEXT } from './power-rankings-graph.constants';
import { StandingsData } from '@tc-fantasy-dashboard/shared/interfaces';

@Component({
    selector: 'fd-power-rankings-graph',
    templateUrl: './power-rankings-graph.component.html',
    imports: [CommonModule, ChartModule]
})
export class PowerRankingsGraphComponent {
  readonly standingsData = input.required<StandingsData[]>();
  readonly chartData = computed<unknown>(() => this.#setupChart());

  mobileBrowser = JSON.parse(localStorage.getItem('MOBILE') as string);
  graphDescription = SUBTITLE_TEXT;
  chartOptions = {
    ...DEFAULT_CHART_OPTIONS,
    aspectRatio: this.mobileBrowser ? 0.75 : 1,
  };

  #minRadiusSize!: number;
  readonly #MIN_OFFSET = this.mobileBrowser ? 3 : 5;

  #setupChart(): unknown {
    if (!this.standingsData()?.length) return null;
    this.#getRadiusRange(this.standingsData());
    const data: ChartData[] = this.standingsData().map(team => ({
      x: team.maxPoints,
      y: team.wins,
      r: this.#getRadiusValue(team.points, team.maxPoints),
      manager: team.teamName,
      points: team.points,
      losses: team.losses
    }));
    return {
      labels: data.map(team => team.manager),
      datasets: [
        {
          data,
          backgroundColor: data.map((_, i) => GRAPH_COLORS[i])
        }
      ]
    };
  }

  #getRadiusRange(standings: StandingsData[]): void {
    const scoringPercents = standings.map(team => (team.points / team.maxPoints * 100));
    // offset to guarantee radius is at least the offset value
    this.#minRadiusSize = Math.floor(Math.min(...scoringPercents)) - this.#MIN_OFFSET;
  }

  #getRadiusValue(points: number, maxPoints: number): number {
    const pointsPercent = (points / maxPoints) * 100;
    // ceiling here to ensure value of at least 1 plus offset
    return Math.ceil(pointsPercent - this.#minRadiusSize);
  }
}
