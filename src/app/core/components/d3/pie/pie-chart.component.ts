import {AfterViewInit, Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild} from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements AfterViewInit, OnChanges {
  @Input() data = new Map<string, number>();
  @Input() width = 400;
  @Input() height = 400;
  @Input() margin = 50;

  public svg!: d3.Selection<SVGGElement, unknown, null, undefined>;

  @ViewChild('svgContainer', {read: ElementRef, static: true}) svgContainerRef!: ElementRef<HTMLDivElement>;

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.isDataValid()) {
      this.createChart();
    }
  }

  ngAfterViewInit(): void {
    this.width = this.svgContainerRef.nativeElement.getBoundingClientRect().width;

    this.svg = d3.select(this.svgContainerRef.nativeElement)
      .append('svg')
      .attr('width', this.width)
      .attr('height', this.height)
      .append('g')
      .attr("transform", "translate(" + this.width / 2 + "," + this.height / 2 + ")");
  }

  private isDataValid(): boolean {
    return this.data && this.data.size > 0;
  }

  private createChart(): void {
    // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
    if (this.isDataValid()) {
      const radius = Math.min(this.width, this.height) / 2 - this.margin;

      const dataNames = Array.from(this.data.entries());

      // set the color scale
      const color = d3.scaleOrdinal<any>()
        .domain(['#00aeef', '#f98e2b', '#7C77AD'])
        .range(d3.schemeDark2);

      // Compute the position of each group on the pie:
      const pie = d3.pie<any>()
        .sort(null) // Do not sort group by size
        .value((d) => d[1]);

      const data_ready = pie(dataNames);

      // The arc generator
      const arc: any = d3.arc<any>()
        .innerRadius(radius * 0.5)         // This is the size of the donut hole
        .outerRadius(radius * 0.9);

      // Another arc that won't be drawn. Just for labels positioning
      const outerArc = d3.arc<any>()
        .innerRadius(radius * 0.9)
        .outerRadius(radius * 0.9);

      this.svg
        .selectAll('allSlices')
        .data(data_ready)
        .join('path')
        .attr('d', arc)
        .attr('fill', d => color(d.data[1]))
        .attr("stroke", "white")
        .style("stroke-width", "2px")
        .style("opacity", 0.7)
        .attr('width', this.width);

      // Add the polylines between chart and labels:
      this.svg
        .selectAll('allPolylines')
        .data(data_ready)
        .join('polyline')
        .attr("stroke", "black")
        .style("fill", "none")
        .attr("stroke-width", 1)
        .attr('points', function (d) {
          const posA = arc.centroid(d) // line insertion in the slice
          const posB = outerArc.centroid(d) // line break: we use the other arc generator that has been built only for that
          const posC = outerArc.centroid(d); // Label position = almost the same as posB
          const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2 // we need the angle to see if the X position will be at the extreme right or extreme left
          posC[0] = radius * 0.95 * (midangle < Math.PI ? 1 : -1); // multiply by 1 or -1 to put it on the right or on the left
          return [posA, posB, posC]
        });

      // Add the polylines between chart and labels:
      this.svg
        .selectAll('allLabels')
        .data(data_ready)
        .join('text')
        .text(d => d.data[0])
        .attr('transform', function (d) {
          const pos = outerArc.centroid(d);
          const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
          pos[0] = radius * 0.99 * (midangle < Math.PI ? 1 : -1);
          return `translate(${pos})`;
        })
        .style('text-anchor', function (d) {
          const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
          return (midangle < Math.PI ? 'start' : 'end')
        });

    }


  }
}
