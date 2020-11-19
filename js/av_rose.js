class RoseData {
    static parseLevel(levelData) {
        let data = {};
        let level = 1;
        for (let i = 0; i < 24; i++) {
            if (i === 8 || level === 16) level++;
            data[i + 1] = levelData[
                    `${RoseData.DATA_PREFIX}-${level}/${Rose.DIRECTIONS[i % 8]}`
                ];
        }
        return data;
    }

    static parse(data) {
        return d3.rollup(
            data,
            v => RoseData.parseLevel(v[0]),
            d => d.date
        )
    }
}
RoseData.DATA_PREFIX = 'data/level';

class Rose {
    get radius() { return 50; }

    constructor(data) {
        this.data = RoseData.parse(data);
    }

    addForecastID(arc, offset) {
        arc.forEach((el, index) => {
            el[Rose.FORECAST_ID] = offset + index;
        });
    }

    levelArcs(innerRadius, outerRadius) {
        const eighthPie = Math.PI / 8;
        return d3.arc()
            .innerRadius(innerRadius)
            .outerRadius(outerRadius)
            .startAngle(d => { return d.startAngle - eighthPie })
            .endAngle(d => { return d.endAngle - eighthPie });
    }

    draw() {
        const quarterPie = Math.PI / 4;
        const slices = Array(8).fill(quarterPie);

        const div = d3.select("#rose-view");

        this.svg = div.append("svg")
            .attr("id", "rose-diagram")
            .attr("width", "100%")
            .attr("height", "100%");

        let arcs = d3.pie()(slices);
        this.addForecastID(arcs, 1);
        this.svg.append("g")
            .selectAll("path")
            .data(arcs)
            .enter()
            .append("path")
            .attr('fill', 'none')
            .classed('petal', true)
            .attr("d", this.levelArcs(0, this.radius));

        arcs = d3.pie()(slices);
        this.addForecastID(arcs, 9);
        this.svg.append("g")
            .selectAll("path")
            .data(arcs)
            .enter()
            .append("path")
            .classed('petal', true)
            .attr('fill', 'none')
            .attr("d", this.levelArcs(this.radius, 2 * this.radius));

        arcs = d3.pie()(slices);
        this.addForecastID(arcs, 17);
        this.svg.append("g")
            .selectAll("path")
            .data(arcs)
            .enter()
            .append("path")
            .attr('fill', 'none')
            .classed('petal', true)
            .attr("d", this.levelArcs(2 * this.radius, 3 * this.radius));

        let arc_length = 180;

        let x_text_location = [0, 1 / Math.SQRT2, 1, 1 / Math.SQRT2, 0, -(1 / Math.SQRT2), -1, -(1 / Math.SQRT2)]
        let y_text_location = [-1, -(1 / Math.SQRT2), 0, 1 / Math.SQRT2, 1, 1 / Math.SQRT2, 0, -(1 / Math.SQRT2)]

        this.svg.append("g").selectAll("path")
            .data(Rose.DIRECTIONS)
            .enter()
            .append("text")
            .attr("x", function (d, i) {
                return arc_length * x_text_location[i];
            })
            .attr("y", function (d, i) {
                return arc_length * y_text_location[i];
            })
            .text((d) => d);
    }

    showForecast(date = null) {
        // TODO - Use given date
        const forecast = this.data.get('01-01-2020');

        this.svg
            .selectAll('.petal')
            .attr("fill", (d) => {
                return AvalancheDangerColor.colorForId(
                    forecast[d[Rose.FORECAST_ID]]
                )
            });
    }
}
Rose.DIRECTIONS = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
Rose.FORECAST_ID = 'forecast-id';