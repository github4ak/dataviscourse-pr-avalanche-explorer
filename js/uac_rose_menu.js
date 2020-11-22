class RoseMenu {
    constructor(rose) {
        this.rose = rose;
    }

    addOptions() {
        let that = this;
        this.aspects = d3.select('#rose-aspects');
        this.aspects.selectAll("option")
            .data(UACMapper.ASPECTS.keys())
            .enter()
            .append("option")
            .text(d => d)
            .attr("value", d => d);

        this.aspects
            .on('change', function (e) {
                that.elevations.node().selectedIndex = 0;
                that.updateMap(this, UACMapper.ASPECTS);
            });

        this.elevations = d3.select("#rose-elevations");
        this.elevations.selectAll("option")
            .data(UACMapper.ELEVATIONS.keys())
            .enter()
            .append("option")
            .text((d) => d)
            .attr("value", (d) => d);

        this.elevations
            .on('change', function () {
                that.aspects.node().selectedIndex = 0;
                that.updateMap(this, UACMapper.ELEVATIONS);
            });
    }

    clear() {
        this.aspects.node().selectedIndex = 0;
        this.elevations.node().selectedIndex = 0;
    }

    updateMap(menu, data) {
        this.rose.map.selection = data.get(
            menu.options[menu.selectedIndex].value
        ).map(a => a.ID);
        this.rose.map.redraw();
    }
}
