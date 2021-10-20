/*function init() {
  d3.json("data/data.csv")
    .then((data) => {
      createScatterPlot(data);
    })
    .catch((error) => {
      console.log(error);
    });
}

function createScatterPlot(data) {
  const width = 400;
  const height = 400;

  const margin = { left: 20, top: 20, right: 20, bottom: 40 };

  x = d3
    .scaleLog() //logarithmic scale
    .domain([0.1, d3.max(data, (d) => d.budget)])
    .nice()
    .range([margin.left, width - margin.right]);

  y = d3
    .scaleLinear()
    .domain([0, 10])
    .range([height - margin.bottom, margin.top]);

  xAxis = (g) =>
    g
      .attr("transform", "translate(0, 360)")
      .call(
        d3
          .axisBottom(x)
          .tickFormat((x) => x)
          .ticks(5)
      )
      .call((g) => g.select(".domain").remove());

  yAxis = (g) =>
    g
      .attr("transform", "translate(20, 0)")
      .call(d3.axisLeft(y))
      .call((g) => g.select(".domain").remove());

  grid = (g) =>
    g
      .attr("stroke", "currentColor")
      .attr("stroke-opacity", 0.1)
      .call((g) =>
        g
          .append("g")
          .selectAll("line")
          .data(x.ticks())
          .join("line")
          .attr("x1", (d) => 0.5 + x(d))
          .attr("x2", (d) => 0.5 + x(d))
          .attr("y1", margin.top)
          .attr("y2", height - margin.bottom)
      )
      .call((g) =>
        g
          .append("g")
          .selectAll("line")
          .data(y.ticks())
          .join("line")
          .attr("y1", (d) => 0.5 + y(d))
          .attr("y2", (d) => 0.5 + y(d))
          .attr("x1", margin.left)
          .attr("x2", width - margin.right)
      );

  const svg = d3
    .select("div#scatterPlot")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  svg.append("g").call(xAxis);

  svg.append("g").call(yAxis);

  svg.append("g").call(grid);

  svg
    .append("g")
    .style("stroke", "steelblue")
    .style("stroke-width", 1.5)
    .attr("fill", "none")
    .selectAll("circle")
    .data(data)
    .join("circle")
    .attr("cx", (d) => x(d.budget))
    .attr("cy", (d) => y(d.rating))
    .attr("r", 3); //radius for each circle
}*/
