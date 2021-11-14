function createScatterPlot(data, update) {
  const width = 450;
  const height = 450;

  // TODO: endre til dynamisk bredde og høyde. Også i transform!

  const margin = { left: 40, top: 40, right: 40, bottom: 40 };

  var data = data.filter(function (d) {
    if (d.year == chosenYear) {
      return d;
    }
  });

  const keys = Object.keys(data[0]);

  let attributesDict = {
    pf_ss: keys[8].valueOf(),
    pf_ss_women: keys[9].valueOf(),
    ef_legal_police: keys[10].valueOf(),
    pf_ss_disappearances_violent: keys[6].valueOf(),
    pf_religion_freedom: keys[7].valueOf(),
    hf_score: keys[4].valueOf(),
  };

  document.getElementById("headerScatter").innerHTML =
    labelsDict[chosenAttributeX] +
    " VS. " +
    labelsDict[chosenAttributeY] +
    " " +
    chosenYear;

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
      .attr("transform", "translate(0, 410)")
      .call(
        d3
          .axisBottom(x)
          .tickFormat((x) => x)
          .ticks(10)
      )
      .call((g) => g.select(".domain").remove());

  yAxis = (g) =>
    g
      .attr("transform", "translate(40, 0)")
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
    .attr("x", width - 80)
    .attr("y", height - 10)
    .style("text-anchor", "middle")
    .attr("id", "removeOnUpdate")
    .style("font-size", "12px")
    .text(labelsDict[chosenAttributeX]);

  svg // text label for the y axis
    .append("text")
    .attr("x", 70)
    .attr("y", 32)
    .style("font-size", "12px")

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
    .style("fill", "#2171b5")
    .on("mousemove", handleMouseMove)
    .on("mouseover", handleMouseOver)
    .on("mouseleave", handleMouseLeave)
    .on("click", handleClickScatterplot)
    .attr("id", "dataScatter");

  if (!update) {
    svg.append("g").attr("class", "scatterXAxis");
    svg.append("g").attr("class", "scatterYAxis");
    svg.append("g").attr("class", "scatterGrid").call(grid);
  } else {
  }
  d3.select("g.scatterXAxis").call(xAxis);
  d3.select("g.scatterYAxis").call(yAxis);

  markSelectedCountries(); //Mark the countries selected in the drop down menus

  d3
  .select("div#scatterPlot-box")
    .selectAll("p")
    .remove(); //Remove old div
 

  divbox = d3
  .select("div#scatterPlot-box")
  .append("p")
  .attr("id", "#scatterCountry1")
  .append("svg")
  .attr("width", 125)
  .attr("height", 25);




  var scatterLabels = ["" + chosenCountry1, "" + chosenCountry2];
  var colorsScatter = ["purple", "DarkOrange"]; //This will be changed to other colors in CP5
  if (chosenCountry1 != undefined && chosenCountry1 != "") {
    // Add color dots for legends for selected country 1
    divbox
      .append("circle")
      .attr("id", "legendScatter")
      .attr("cx", 10)
      .attr("cy", 10)
      .attr("r", 3)
      .style("fill", colorsScatter[0]);

    // Add labels for legends for selected country 1
    divbox
      .append("text")
      .attr("id", "legendScatter")
      .attr("x", 15)
      .attr("y", 10)
      .text(scatterLabels[0] + " \n ")
      .style("font-size", "10px")
      .attr("alignment-baseline", "middle");
  }
  if (chosenCountry2 != undefined && chosenCountry2 != "") {
    //Dots for legends for selected country 2
    divbox
      .append("circle")
      .attr("id", "legendScatter")
      .attr("cx", 10)
      .attr("cy", 20)
      .attr("r", 3)
      .style("fill", colorsScatter[1]);

      // Add labels for legends for selected country 2
    divbox
      .append("text")
      .attr("id", "legendScatter")
      .attr("x", 15)
      .attr("y", 20)
      .text(scatterLabels[1])
      .style("font-size", "10px")
      .attr("alignment-baseline", "middle");
  }
}
