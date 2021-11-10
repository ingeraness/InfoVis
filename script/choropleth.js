var map = "data/countries.json";
var data_source = "data/data.csv";

var topology;
var dataset;

var min = 5.9;
var max = 9.1;

margin = { top: 20, right: 20, bottom: 20, left: 40 };

function createChoroplethMap(update) {
    Promise.all([d3.json(map), d3.csv(data_source)]).then(function ([map, data]) {
    topology = map;
    dataset = data;
    dataset = dataset.filter((c) => c.year == chosenYear);
    choropleth(update);
    // addZoom();
})
.catch((error) => {
    console.log(error);
});
}

function choropleth(update) {
    var projection = d3
        .geoMercator()
        .scale(850/2)
        .rotate([0, 0])
        .center([0, 0])
        .translate([300, 770]);

    var path = d3.geoPath().projection(projection);

    // Create a map with the hf_score for every country
    let data = new Map()
    dataset.map((el) => data.set(el.country, el.hf_score));
    
    const colorScale = d3.scaleThreshold()
      .domain([5.9, 6.3, 6.7, 7.1, 7.5, 7.9, 8.3, 8.7, 9.1])
      .range(d3.schemeBlues[9]);
    
    if(!update){
        d3.select("div#choropleth")
        .append("svg")
        .attr("width", 800)
        .attr("height", 500);
    }

    d3.select("div#choropleth")
        .select("svg")
        .selectAll("path")
        .data(topojson.feature(topology, topology.objects.europe).features)
        .join("path")
        .filter(function(d) {
            if(data.get(d.properties.NAME) != undefined){
                return d;
            }
          })
        .on("mousemove", handleMouseMove)
        .on("mouseover", handleMouseOver)
        .on("mouseleave", handleMouseLeave)
        .on("click", handleClickChoropleth)
        .attr("class", "country")
        .attr("d", path)
        // Using value for hf_score to give countries different color
        .attr("fill", function (d) {
          let value = data.get(d.properties.NAME) || 0;
          return colorScale(value);
        })
        .attr("id", function(d, i) {
            return d.properties.NAME;
        });

    if(!update){
        var l_domain = [min, max];
        var l_margin = 20;
        var l_spacing = 50;
        var l_height = 10;
        var l_width = 100;
        var c_b = d3.scaleSequential(l_domain, d3.interpolateBlues);
        const n_b = Math.min(c_b.domain().length, c_b.range().length);
        
        var c_r = d3.scaleSequential(l_domain, d3.interpolateReds);
        const n_r = Math.min(c_r.domain().length, c_r.range().length);
    
        const svg = d3.select("div#choropleth").select("svg");
        
        var grad = svg
            .append("defs")
            .append("linearGradient")
            .attr("id", "grad1")
            .attr("x1", "0%")
            .attr("x2", "100%")
            .attr("y1", "0%")
            .attr("y2", "0%");
        
        grad
            .append("stop")
            .attr("offset", "0%")
            .style("stop-color", colorScale(5.9));
        
        grad
            .append("stop")
            .attr("offset", "100%")
            .style("stop-color", colorScale(9.1));
        
        svg
            .append("rect")
            .attr("width", l_width)
            .attr("height", l_height)
            .style("fill", "transparent")
            .style("stroke", "black")
            .style("stroke-width", "0.5px")
            .style("fill", "url('#grad1')")
            .attr(
            "transform",
            `translate(${l_margin + l_height + l_spacing},${
                height - l_margin
            })rotate(270)`
            );
        
        var l_title = "Freedom index";
        svg
            .append("text")
            .text(l_title)
            .attr(
            "transform",
            `translate(${l_margin - 5},${height - l_margin - l_width - 10})`
            );
        
        var l_y = d3
            .scaleLinear()
            .domain([5.9, 9.1]) 
            .range([l_width, 0]);
        
        svg
            .append("g")
            .attr(
            "transform",
            `translate(${l_margin + l_height + l_spacing},${
                height - l_margin - l_width
            })`
            ) 
            .call(d3.axisLeft().scale(l_y));
    }
}
