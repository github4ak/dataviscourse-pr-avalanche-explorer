class RoseMenu {
    constructor(rose) {
        this.rose = rose;
    }

    addOptions() {
        d3.select('#rose-aspects')
            .selectAll("option")
            .data(UACMapper.ASPECTS.keys())
            .enter()
            .append("option")
            .text(d => d)
            .attr("value", d => d);
        d3.select("#rose-elevations")
            .selectAll("option")
            .data(UACMapper.ELEVATIONS.keys())
            .enter()
            .append("option")
            .text((d) => d)
            .attr("value", (d) => d);
    }
}
