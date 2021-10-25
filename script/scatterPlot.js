var xAttribute = "pf_religion_freedom";
var yAttribute = "pf_ss";
var selectedYear = 2018;

// function init() {
//   d3.csv("data/data.csv")
//     .then((data) => {
//       createScatterPlot(data, xAttribute, yAttribute, selectedYear);
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// }

function createScatterPlot(data, update) {
  const width = 400;
  const height = 400;

  // TODO: endre til dynamisk bredde og høyde. Også i transform!

  const margin = { left: 20, top: 20, right: 20, bottom: 40 };

  var data = data.filter(function (d) {
    if (d.year == selectedYear) {
      return d;
    }
  });

  x = d3
    .scaleLinear()
    .domain([0, 10])
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
          .ticks(10)
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

  if (!update) {
    d3.select("div#scatterPlot")
      .append("svg")
      .append("g")
      .attr("class", "circles")
      .style("stroke-width", 1.5);
  }

  const svg = d3
    .select("div#scatterPlot")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  svg // text label for the x axis
    .append("text")
    .attr("x", width - 40)
    .attr("y", height)
    .style("text-anchor", "middle")
    .text(xAttribute);

  svg // text label for the y axis
    .append("text")
    .attr("x", 20)
    .attr("y", 15)
    .style("text-anchor", "middle")
    .text(yAttribute);

  // Add dots
  svg
    .append("g")
    .selectAll("dot")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", function (d) {
      return x(d.pf_religion_freedom);
    })
    .attr("cy", function (d) {
      return y(d.pf_ss);
    })
    .attr("r", 2.5)
    .style("fill", "blue");

  if (!update) {
    svg.append("g").attr("class", "scatterXAxis");
    svg.append("g").attr("class", "scatterYAxis");
    svg.append("g").attr("class", "scatterGrid").call(grid);
  } else {
  }
  d3.select("g.scatterXAxis").call(xAxis);
  d3.select("g.scatterYAxis").call(yAxis);
}
