class Dropdown {
    
    load() {

        const aspectData = [
            "All directions",
            "N",
            "NE",
            "E",
            "SE",
            "S",
            "SW",
            "W",
            "NW",
        ];
        const elevationData = [
            "All elevations",
            "Above 9,500 ft",
            "8,000-95000 ft",
            "Below 8,000 ft",
        ];

        let div = d3.select("#dropdown-view");

        var aspect_text = div.selectAll("text")
                                .data(["Aspect "])
                                .enter()
                                .append("text")
                                .text((d) => d);

        let aspectOptions = div.append("select")
                                .attr("id", "aspect-dropdown")
                                .selectAll("option")
                                .data(aspectData)
                                .enter()
                                .append("option")
                                .text((d) => d)
                                .attr("value", (d) => d);

        let elevation_text = div.append("text")
                                .selectAll("text")
                                .data([" Elevation "])
                                .enter()
                                .append("text")
                                .text((d) => d);

        let evelvationOptions = div.append("select")
                                    .attr("id", "elevation-dropdown")
                                    .selectAll("option")
                                    .data(elevationData)
                                    .enter()
                                    .append("option")
                                    .text((d) => d)
                                    .attr("value", (d) => d);
    }
}
