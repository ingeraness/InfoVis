function createScatterPlot(data, update) {
  const width = 400;
  const height = 400;

  // TODO: endre til dynamisk bredde og høyde. Også i transform!

  const margin = { left: 40, top: 40, right: 40, bottom: 40 };

  var data = data.filter(function (d) {
    if (d.year == chosenYear) {
      return d;
    }
  });

  // Add a tooltip div. Here I define the general feature of the tooltip: stuff that do not depend on the data point.
  // Its opacity is set to 0: we don't see it by default.
  var tooltip = d3
    .select("div#scatterPlot")
    .append("div")
    .style("opacity", 0)
    .attr("class", "tooltip")
    .style("background-color", "white")
    .style("border", "solid")
    .style("border-width", "1px")
    .style("border-radius", "5px")
    .style("padding", "10px");

  // Three function that change the tooltip when user hover / move / leave a cell
  // A function that change this tooltip when the user hover a point.
  // Its opacity is set to 1: we can now see it. Plus it set the text and position of tooltip depending on the datapoint (d)
  var mouseover = function (d) {
    tooltip.style("opacity", 1);
  };
  var mousemove = function (d) {
    tooltip.html("Country: " + d.year);
    //.style("left", (d3.pointer(this)[0]+90) + "px") // It is important to put the +90: other wise the tooltip is exactly where the point is an it creates a weird effect
    //.style("top", (d3.pointer(this)[1]) + "px")
  };
  var mouseleave = function (d) {
    tooltip.transition().duration(600).style("opacity", 0);
  };

  const keys = Object.keys(data[0]);

  let attributesDict = {
    pf_ss: keys[8].valueOf(),
    pf_ss_women: keys[9].valueOf(),
    ef_legal_police: keys[10].valueOf(),
    pf_ss_disappearances_violent: keys[6].valueOf(),
    pf_religion_freedom: keys[7].valueOf(),
    hf_score: keys[4].valueOf(),
  };

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

  svg = d3
    .select("div#scatterPlot")
    .select("svg")
    .attr("width", width)
    .attr("height", height);

  svg // text label for the x axis
    .append("text")
    .attr("x", width - 40)
    .attr("y", height)
    .style("text-anchor", "middle")
    .attr("id", "removeOnUpdate")
    .text(labelsDict[chosenAttributeX]);

  svg // text label for the y axis
    .append("text")
    .attr("x", 20)
    .attr("y", 15)
    .style("text-anchor", "middle")
    .attr("id", "removeOnUpdate")
    .text(labelsDict[chosenAttributeY]);

  // Add dots
  svg
    .append("g")
    .attr("id", "removeOnUpdate")
    .selectAll("dot")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", function (d) {
      return x(d[attributesDict[chosenAttributeX]]);
    })
    .attr("cy", function (d) {
      return y(d[attributesDict[chosenAttributeY]]);
    })
    .attr("r", 4)
    .style("fill", "blue")
    .on("mouseover", handleMouseOver)
    .on("mouseleave", handleMouseLeave)
    //.on("mouseover", mouseover )
    //.on("mousemove", mousemove )
    //.on("mouseleave", mouseleave )
    .on("click", handleClickScatterplot);

  if (!update) {
    svg.append("g").attr("class", "scatterXAxis");
    svg.append("g").attr("class", "scatterYAxis");
    svg.append("g").attr("class", "scatterGrid").call(grid);
  } else {
  }
  d3.select("g.scatterXAxis").call(xAxis);
  d3.select("g.scatterYAxis").call(yAxis);

  markSelectedCountries(); //Mark the countries selected in the drop down menus
}
