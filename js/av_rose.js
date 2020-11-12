class Rose {
    constructor(data) {
        this.data = data;
    }

    drawRose() {
        let that = this;

        const data_string = "data";
        const level_string = "level";
        const direction_string_array = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];

        let rose_color = new Map()
        rose_color.set(1, "#00BF00");
        rose_color.set(2, "#FFFF00");
        rose_color.set(3, "#FFA500");
        rose_color.set(4, "#FF0000");
        rose_color.set(5, "#000000");


        // TODO: Get today's data
        let todayData = that.data[0];

        let level_1_data = [];
        let level_2_data = [];
        let level_3_data = [];

        for (let i = 0; i < 24; i++) {
            if (i < 8) {
                level_1_data.push(todayData[data_string + "/" + level_string + "-1/" + direction_string_array[i % 8]]);
            }
            else if (i >= 8 && i < 16) {
                level_2_data.push(todayData[data_string + "/" + level_string + "-2/" + direction_string_array[i % 8]]);
            }
            else {
                level_3_data.push(todayData[data_string + "/" + level_string + "-2/" + direction_string_array[i % 8]]);
            }
        }

        let pie_angle_array = [Math.PI / 4, Math.PI / 4, Math.PI / 4, Math.PI / 4, Math.PI / 4, Math.PI / 4, Math.PI / 4, Math.PI / 4];

        let arcs = d3.pie()(pie_angle_array);

        let level_1_arc = d3.arc()
            .innerRadius(0)
            .outerRadius(50);

        let level_2_arc = d3.arc()
            .innerRadius(50)
            .outerRadius(100);

        let level_3_arc = d3.arc()
            .innerRadius(100)
            .outerRadius(150);

        let div = d3.select("#rose-view");

        let svg = div.append("svg")
            .attr("id", "rose-diagram")
            .attr("width", "100%")
            .attr("height", "100%");

        let g_level_1 = svg.append("g")
        let g_level_2 = svg.append("g")
        let g_level_3 = svg.append("g")
        let g_text = svg.append("g")

        let level_1_circle = g_level_1.selectAll("path")
            .data(arcs)
            .enter()
            .append("path")
            .attr("id", function (d, i) { 
                return "level-1-petal-"+(i+1); 
            })
            .style("fill", function (d, i) {
                return d3.color(rose_color.get(level_1_data[i]));
            })
            .style("stroke", "#000000")
            .style("stroke-width", "1px")
            .attr("d", level_1_arc);

        let level_2_circle = g_level_2.selectAll("path")
            .data(arcs)
            .enter()
            .append("path")
            .attr("id", function (d, i) { 
                return "level-1-petal-"+(i+9); 
            })
            .style("fill", function (d, i) {
                return d3.color(rose_color.get(level_2_data[i]));
            })
            .style("stroke", "#000000")
            .style("stroke-width", "1px")
            .attr("d", level_2_arc);

        let level_3_circle = g_level_3.selectAll("path")
            .data(arcs)
            .enter()
            .append("path")
            .attr("id", function (d, i) { 
                return "level-1-petal-"+(i+17); 
            })
            .style("fill", function (d, i) {
                return d3.color(rose_color.get(level_3_data[i]));
            })
            .style("stroke", "#000000")
            .style("stroke-width", "1px")
            .attr("d", level_3_arc);

        let arc_length = 180;

        let x_text_location = [0, 1 / Math.SQRT2, 1, 1 / Math.SQRT2, 0, -(1 / Math.SQRT2), -1, -(1 / Math.SQRT2)]
        let y_text_location = [-1, -(1 / Math.SQRT2), 0, 1 / Math.SQRT2, 1, 1 / Math.SQRT2, 0, -(1 / Math.SQRT2)]

        let level_3_text = g_text.selectAll("path")
            .data(direction_string_array)
            .enter()
            .append("text")
            .attr("transform", "translate(0," + -440 + ")")
            .attr("x", function (d, i) {
                return arc_length * x_text_location[i];
            })
            .attr("y", function (d, i) {
                return arc_length * y_text_location[i];
            })
            .text(function (d, i) {
                return direction_string_array[i];
            });
    }
}