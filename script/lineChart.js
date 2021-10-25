var country;
var dataSet;


function createLineChart(data, update) {
  margin = { top: 20, right: 20, bottom: 20, left: 40 };
  width = 400;
  height = 400;

  var svg = d3.select("div#lineChart").select("svg");
  svg.selectAll("*").remove();  // Remove the old vis before drawing the new vis with new countries

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
    .range([height - margin.bottom - 15, margin.top + 100]);

  xAxis = (g) =>
    g.attr("transform", `translate(0,${height - margin.bottom - 15})`).call(
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

  svg
  .append("text") // text label for the x axis
  .attr("x", width - 20)
  .attr("y", height)
  .style("text-anchor", "middle")
  .text("Year");

  svg
    .append("text") // text label for the y axis
    .attr("x", 30)
    .attr("y", 100)
    .style("text-anchor", "middle")
    .text("pf_ss");

  
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
    .attr("r", 3)
    .attr("id", "one")
    .on("mouseover", handleMouseOver)
    .on("mouseleave", handleMouseLeave);



  // Drwaing line for country 1, attribute 2
  svg
    .append("path")
    .datum(dataC1)
    .attr("fill", "none")
    .attr("stroke", "blue")
    .attr("stroke-width", 1.5)
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
    .attr("r", 3)
    .attr("id", "two")
    .on("mouseover", handleMouseOver)
    .on("mouseleave", handleMouseLeave);


  // Drwaing line for country 2, attribute 1
  svg
    .append("path")
    .datum(dataC2)
    .attr("fill", "none")
    .attr("stroke", "PaleVioletRed")
    .attr("stroke-width", 1.5)
    .attr("d", lineA1);
  
  // dots for line for country 1, attribute 1
  svg
    .append("g")
    .attr("fill", "PaleVioletRed")
    .selectAll("circle")
    .data(dataC2, function (d) {
        return d;
    })
    .join("circle")
    .attr("cx", (d) => x(d.year))
    .attr("cy", (d) => y(d.hf_score))
    .attr("r", 3)
    .attr("id", "three")
    .on("mouseover", handleMouseOver)
    .on("mouseleave", handleMouseLeave);


  // Drwaing line for country 2, attribute 2
  svg
    .append("path")
    .datum(dataC2)
    .attr("fill", "none")
    .attr("stroke", "pink")
    .attr("stroke-width", 1.5)
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
    .attr("r", 3)
    .attr("id", "four")
    .on("mouseover", handleMouseOver)
    .on("mouseleave", handleMouseLeave);
}
