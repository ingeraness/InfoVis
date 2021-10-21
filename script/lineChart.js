var country;
var dataSet;
var selectedAttribute = pf_ss;


function createLineChart(data, update) {
  margin = { top: 20, right: 20, bottom: 20, left: 40 };
  width = 400;
  height = 400;

  var svg = d3.select("div#lineChart").select("svg");
  svg.selectAll("*").remove();  // Remove the old vis before drawing the new vis with new countries

  /*var data = data.filter(function (d) {
    if (d.country == selectedCountry1) {
      return d;
    }
  });*/

  var dataC1 = data.filter(function (d) {
    if (d.country == chosenCountry1) {
      return d;
    }
  });
  var dataC2 = data.filter(function (d) {
    if (d.country == chosenCountry2) {
      return d;
    }
  });

  // Values for selected attribute 1
  lineA1 = d3
    .line()
    .x((d) => x(d.year))
    .y((d) => y(d.hf_score));

  // Values for selected attribute 2
  lineA2 = d3
    .line()
    .x((d) => x(d.year))
    .y((d) => y(d.pf_ss));

  x = d3
    .scaleLinear()
    .domain(d3.extent(data, (d) => d.year))
    .range([margin.left, width - margin.right]);

  y = d3
    .scaleLinear()
    .domain([0, 10])
    .range([height - margin.bottom, margin.top + 100]);

  xAxis = (g) =>
    g.attr("transform", `translate(0,${height - margin.bottom})`).call(
      d3
        .axisBottom(x)
        .tickFormat((x) => x)
        .tickSizeOuter(0)
    );

  yAxis = (g) =>
    g
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y).tickFormat((x) => x))
      .call((g) => g.select(".domain").remove())
      .call(d3.axisLeft(y));

  if (!update) {
    d3.select("div#lineChart")
      .append("svg")
      .append("g")
      .attr("class", "line")
      .append("path");
  }
  svg = d3
    .select("div#lineChart")
    .select("svg")
    .attr("width", width)
    .attr("height", height);


  if (!update) {
    svg.append("g").attr("class", "lineXAxis");
    svg.append("g").attr("class", "lineYAxis");
  }

  svg.select("g.lineXAxis").call(xAxis);

  svg.select("g.lineYAxis").call(yAxis);

  // Drwaing line for country 1, attribute 1
  svg
    .append("path")
    .datum(dataC1)
    .attr("fill", "none")
    .attr("stroke", "steelblue")
    .attr("stroke-width", 1.5)
    .attr("d", lineA1);
  
    // dots for line for country 1, attribute 1
  svg
    .append("g")
    .attr("fill", "steelblue")
    .selectAll("circle")
    .data(dataC1, function (d) {
        return d;
    })
    .join("circle")
    .attr("cx", (d) => x(d.year))
    .attr("cy", (d) => y(d.hf_score))
    .attr("r", 2);


  // Drwaing line for country 1, attribute 2
  svg
    .append("path")
    .datum(dataC1)
    .attr("fill", "none")
    .attr("stroke", "blue")
    .attr("stroke-width", 1.5)
    // .attr("stroke-linejoin", "round")
    // .attr("stroke-linecap", "round")
    .attr("d", lineA2);

  // dots for line for country 1, attribute 2
  svg
    .append("g")
    .attr("fill", "blue")
    .selectAll("circle")
    .data(dataC1, function (d) {
        return d;
    })
    .join("circle")
    .attr("cx", (d) => x(d.year))
    .attr("cy", (d) => y(d.pf_ss))
    .attr("r", 2);


  // Drwaing line for country 2, attribute 1
  svg
    .append("path")
    .datum(dataC2)
    .attr("fill", "none")
    .attr("stroke", "red")
    .attr("stroke-width", 1.5)
    .attr("d", lineA1);
  
  // dots for line for country 1, attribute 1
  svg
    .append("g")
    .attr("fill", "red")
    .selectAll("circle")
    .data(dataC2, function (d) {
        return d;
    })
    .join("circle")
    .attr("cx", (d) => x(d.year))
    .attr("cy", (d) => y(d.hf_score))
    .attr("r", 2);


  // Drwaing line for country 2, attribute 2
  svg
    .append("path")
    .datum(dataC2)
    .attr("fill", "none")
    .attr("stroke", "pink")
    .attr("stroke-width", 1.5)
    // .attr("stroke-linejoin", "round")
    // .attr("stroke-linecap", "round")
    .attr("d", lineA2);

    // dots for line for country 2, attribute 2
    svg
    .append("g")
    .attr("fill", "pink")
    .selectAll("circle")
    .data(dataC2, function (d) {
         return d;
     })
    .join("circle")
    .attr("cx", (d) => x(d.year))
    .attr("cy", (d) => y(d.pf_ss))
    .attr("r", 2);
  


 
  // svg
  //   .select("g.line")
  //   .selectAll("circle")
  //   .dataum(data, function (d) {
  //     return d;
  //   })
  //   .join(
  //     (enter) => {
  //       return enter
  //         .append("circle")
  //         .attr("cx", (d) => x(d.year))
  //         .attr("cy", (d) => y(d.hf_score))
  //         .attr("r", 2)
  //         .style("fill", "steelblue")
  //         .text(function (d) {
  //           return d.year;
  //         })
  //       /*
  //       //Here comes more code when the user can chose country and year
  //       .on("mouseover", handleMouseOver)
  //         .on("mouseleave", handleMouseLeave)
  //         .on("click", handleClick)
  //         .transition()
  //         .duration(1000)
  //         .style("opacity", "100%");
  //     },
        
  //       (update) => {
  //         update
  //           .transition()
  //           .duration(1000)
  //           .attr("cx", (d) => x(d.year))
  //           .attr("cy", (d) => y(d.hf_score))
  //           .attr("r", 2)
  //           .style("fill", "steelblue");*/
    //   },
    //   (exit) => {
    //      exit.remove();
    //  }
    // );
}
