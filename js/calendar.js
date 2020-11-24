class Calendar {
    constructor(rose, map) {
        this.rose = rose;
        this.map = map;
    }

    show() {
        UACForecasts.load().then((data) => {
            this.data = data;
            const date = new Date('01-01-2020');
            this.selectDate(date);
            this.addDays(date);
        });

        this.svg = d3.select('#calendar-view')
            .append("svg")
            .attr("id", "calendar")
            .attr("width", "100%")
            .attr("height", "100%");
    }

    addDays(date) {
        this.days = this.svg
            .selectAll("g")
            .data(this.data.keys())
            .join('g')
            .attr('transform', (_d, i) => {
                const x = i % 7 * Calendar.CELL_SIZE + 3;
                const y = parseInt(i/7) * Calendar.CELL_SIZE + 3;
                return `translate(${x},${y})`
            });

        const dateJSON = date.toJSON();
        this.days
            .append('rect')
            .attr("width", Calendar.CELL_DIM)
            .attr("height", Calendar.CELL_DIM)
            .attr('rx', 4)
            .attr("class", 'calendar-day-box')
            .classed('selected', (d) => d === dateJSON);

        this.days
            .append("text")
            .attr("x", Calendar.CELL_DIM/2)
            .attr("y", Calendar.CELL_DIM/2)
            .attr("class", 'calendar-day-text')
            .text((d) => new Date(d).getDate())
    }

    selectDate(date) {
        const forecast = this.data.get(date.toJSON());
        this.map.forecast = forecast;
        this.map.infoBox.text(date.toLocaleDateString());
        this.rose.showForecast(forecast);
    }
}

Calendar.CELL_SIZE = 50;  // in pixels
Calendar.CELL_SPACE = 5;
Calendar.CELL_DIM = Calendar.CELL_SIZE - Calendar.CELL_SPACE;