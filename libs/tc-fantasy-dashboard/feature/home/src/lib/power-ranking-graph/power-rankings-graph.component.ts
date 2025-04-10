import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartModule } from 'primeng/chart';
import { GRAPH_COLORS, SUBTITLE_TEXT } from './power-rankings-graph.constants';
import { StandingsData } from '@tc-fantasy-dashboard/shared/interfaces';
import { LoadingComponent } from '@tc-fantasy-dashboard/shared/components';

interface ChartData {
  x: number;
  y: number;
  r: number;
  manager: string;
  points: number;
  losses: number;
}
@Component({
    selector: 'fd-power-rankings-graph',
    templateUrl: './power-rankings-graph.component.html',
    imports: [CommonModule, ChartModule, LoadingComponent]
})
export class PowerRankingsGraphComponent implements OnChanges {
  @Input({required: true}) standingsData!: StandingsData[];

  chartData: unknown;
  chartOptions: unknown;
  isLoading = true;
  mobileBrowser = JSON.parse(localStorage.getItem('MOBILE') as string);
  showPreseasonMessage = false;
  graphDescription = SUBTITLE_TEXT;

  #minRadiusSize!: number;
  readonly #MIN_OFFSET = this.mobileBrowser ? 3 : 5;

  ngOnChanges(changes: SimpleChanges): void {
    this.isLoading = true;
    if (changes['standingsData'] && changes['standingsData'].currentValue?.length) {
      if (this.standingsData[0].wins === 0 && this.standingsData[0].losses === 0) {
        this.showPreseasonMessage = true;
      } else {
        this.showPreseasonMessage = false;
        this.#getRadiusRange(this.standingsData);
        const data: ChartData[] = this.standingsData.map(team => ({
          x: team.maxPoints,
          y: team.wins,
          r: this.#getRadiusValue(team.points, team.maxPoints),
          manager: team.username,
          points: team.points,
          losses: team.losses
        }));
        this.#setupChart(data);
      }
      this.isLoading = false;
    }
  }

  #setupChart(data: ChartData[]): void {
    this.chartData = {
      labels: data.map(team => team.manager),
      datasets: [
        {
          data,
          backgroundColor: data.map((_, i) => GRAPH_COLORS[i])
        }
      ]
    };

    const scaleBorder = {
      grid: {
        color: 'white',
      }
    };

    const axisTitle = {
      display: true,
      font: {
        weight: 'bold'
      }
    };
    
    this.chartOptions = {
      layout: {
        padding: {
          top: 20,
          bottom: 20
        }
      },
      scales: {
        y: {
          ...scaleBorder,
          min: 0,
          title: {
            ...axisTitle,
            text: 'Wins'
          }
        },
        x: {
          ...scaleBorder,
          title: {
            ...axisTitle,
            text: 'Max Points',
          }
        }
      },
      aspectRatio: this.mobileBrowser ? 0.75 : 1,
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
    }
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
