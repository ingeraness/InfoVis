var country;
var dataSet;

function createLineChart(data, update) {
  margin = { top: 20, right: 20, bottom: 20, left: 40 };
  width = 1000;
  height = 300;

  const keys = Object.keys(data[0]);

  let attributesDict = {
    pf_ss: keys[8].valueOf(),
    pf_ss_women: keys[9].valueOf(),
    ef_legal_police: keys[10].valueOf(),
    pf_ss_disappearances_violent: keys[6].valueOf(),
    pf_religion_freedom: keys[7].valueOf(),
    hf_score: keys[4].valueOf(),
  };

  var svg = d3.select("div#lineChart").select("svg");
  svg.selectAll("*").remove(); // Remove the old vis before drawing the new vis with new countries

  // Set header
  document.getElementById("headerBarAndLineChart").innerHTML =
    labelsDict[chosenAttributeX] + " VS. Freedom Ranking";

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
    .y((d) => y(d.hf_score)); // Always this attribute

  // Values for selected attribute 2
  lineA2 = d3
    .line()
    .x((d) => x(d.year))
    .y((d) => y(d[attributesDict[chosenAttributeX]])); //Dependent on which attribute is selected

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

  /* It is better to show this info in the header instead of on the axis because we have two attributes
  svg 
    .append("text") // text label for the y axis
    .attr("x", 30)
    .attr("y", 100)
    .style("text-anchor", "middle")
    .text("pf_ss");*/

  // Drwaing line for country 1, attribute 1
  svg
    .append("path")
    .datum(dataC1)
    .attr("fill", "none")
    .attr("stroke", "steelblue")
    .attr("stroke-width", 1.5)
    .attr("id", "removeOnUpdate")
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
    .attr("cy", (d) => y(d[attributesDict[chosenAttributeX]]))
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
    .attr("id", "removeOnUpdate")
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
    .attr("cy", (d) => y(d[attributesDict[chosenAttributeX]]))
    .attr("r", 3)
    .attr("id", "four")
    .on("mouseover", handleMouseOver)
    .on("mouseleave", handleMouseLeave);

  var lineLabels = [
    "" + labelsDict[chosenAttributeX] + ", " + chosenCountry1,
    "Freedom Index, " + chosenCountry1,
    "" + labelsDict[chosenAttributeX] + ", " + chosenCountry2,
    "Freedom Index, " + chosenCountry2,
  ];
  var colors = ["steelblue", "blue", "PaleVioletRed", "pink"]; //This will be changed to other colors in CP5

  if (chosenCountry1 != undefined && chosenCountry1 != "") {
    // Add color dots for legends C1
    svg
      .append("circle")
      .attr("cx", 800)
      .attr("cy", 205)
      .attr("r", 3)
      .style("fill", colors[0]);
    svg
      .append("circle")
      .attr("cx", 800)
      .attr("cy", 220)
      .attr("r", 3)
      .style("fill", colors[1]);
    // Add labels for legends C1
    svg
      .append("text")
      .attr("x", 810)
      .attr("y", 205)
      .text(lineLabels[0])
      .style("font-size", "10px")
      .attr("alignment-baseline", "middle");
    svg
      .append("text")
      .attr("x", 810)
      .attr("y", 220)
      .text(lineLabels[1])
      .style("font-size", "10px")
      .attr("alignment-baseline", "middle");
  }

  if (chosenCountry2 != undefined && chosenCountry2 != "") {
    //Dots for legends C2
    svg
      .append("circle")
      .attr("cx", 800)
      .attr("cy", 235)
      .attr("r", 3)
      .style("fill", colors[2]);
    svg
      .append("circle")
      .attr("cx", 800)
      .attr("cy", 250)
      .attr("r", 3)
      .style("fill", colors[3]);

    // Add labels for legends C2
    svg
      .append("text")
      .attr("x", 810)
      .attr("y", 235)
      .text(lineLabels[2])
      .style("font-size", "10px")
      .attr("alignment-baseline", "middle");
    svg
      .append("text")
      .attr("x", 810)
      .attr("y", 250)
      .text(lineLabels[3])
      .style("font-size", "10px")
      .attr("alignment-baseline", "middle");
  }
}
