var country;
var dataSet;


function createLineChart(data, update, attribute, div) {
  margin = { top: 20, right: 20, bottom: 20, left: 40 };
  width = 700;
  height = 300;

  let divString = "div#lineChart" + div;
  let headerString = "headerLineChart" + div;

  const keys = Object.keys(data[0]);

  let attributesDict = {
    pf_ss: keys[8].valueOf(),
    pf_ss_women: keys[9].valueOf(),
    ef_legal_police: keys[10].valueOf(),
    pf_ss_disappearances_violent: keys[6].valueOf(),
    pf_religion_freedom: keys[7].valueOf(),
    hf_score: keys[4].valueOf(),
  };

  var svg = d3.select(divString).select("svg");
  svg.selectAll("*").remove(); // Remove the old vis before drawing the new vis with new countries

  // Set header
  document.getElementById(headerString).innerHTML = labelsDict[attribute] + " from " + chosenYear + " to " + chosenYear2;

  var dataC1 = data.filter(function (d) {
    if ((d.country == chosenCountry1) && (d.year>= chosenYear && d.year<=chosenYear2)){
      return d;
    }
  });

  var dataC2 = data.filter(function (d) {
    if ((d.country == chosenCountry2) && (d.year>= chosenYear && d.year<=chosenYear2)) {
      return d;
    }
  });

  var yearsChosen = data.filter(function(d){
    if(d.year>= chosenYear && d.year<=chosenYear2 && d.country=="Portugal"){
      return d;
    }
  });

  // Values for selected attribute
  lineA1 = d3
    .line()
    .x((d) => x(d.year))
    .y((d) => y(d[attributesDict[attribute]])); //Dependent on which attribute is selected

  x = d3
    .scaleLinear()
    .domain(d3.extent(yearsChosen, (d) => d.year))
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
        .ticks(yearsChosen.length - 1)
    );

  yAxis = (g) =>
    g
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y).tickFormat((x) => x))
      .call((g) => g.select(".domain").remove())
      .call(d3.axisLeft(y));

  if (!update) {
    d3.select(divString)
      .append("svg")
      .append("g")
      .attr("class", "line")
      .append("path");
  }
  svg = d3
    .select(divString)
    .select("svg")
    .attr("width", width)
    .attr("height", height);

  svg.append("g").attr("class", "lineXAxis").call(xAxis);
  svg.append("g").attr("class", "lineYAxis").call(yAxis);
  
  svg
    .append("text") // text label for the x axis
    .attr("x", width - 20)
    .attr("y", height)
    .style("text-anchor", "middle")
    .text("Year");

  svg
    .append("text") // text label for the y axis
    .attr("x", width - 620)
    .attr("y", 100)
    .style("text-anchor", "middle")
    .text(labelsDict[attribute]); //ENDRE!

  // Drwaing line for country 1, attribute 1
  svg
    .append("path")
    .datum(dataC1)
    .attr("fill", "none")
    .attr("stroke", "purple")
    .attr("stroke-width", 1.5)
    .attr("id", "lineLineChart")
    .attr("d", lineA1);

  // dots for line for country 1, attribute 1
  svg
    .append("g")
    .attr("fill", "purple")
    .selectAll("circle")
    .data(dataC1, function (d) {
      return d;
    })
    .join("circle")
    .attr("cx", (d) => x(d.year))
    .attr("cy", (d) => y(d[attributesDict[attribute]]))
    .attr("r", 3)
    .attr("id", "one")
    .on("mousemove", handleMouseMove)
    .on("mouseover", handleMouseOver)
    .on("mouseleave", handleMouseLeave);

  // Drwaing line for country 2, attribute 1
  svg
    .append("path")
    .datum(dataC2)
    .attr("fill", "none")
    .attr("stroke", "green")
    .attr("stroke-width", 1.5)
    .attr("id", "lineLineChart")
    .attr("d", lineA1);

  // dots for line for country 1, attribute 1
  svg
    .append("g")
    .attr("fill", "green")
    .selectAll("circle")
    .data(dataC2, function (d) {
      return d;
    })
    .join("circle")
    .attr("cx", (d) => x(d.year))
    .attr("cy", (d) => y(d[attributesDict[attribute]]))
    .attr("r", 3)
    .attr("id", "two")
    .on("mousemove", handleMouseMove)
    .on("mouseover", handleMouseOver)
    .on("mouseleave", handleMouseLeave);

  var lineLabels = [
    "" + labelsDict[attribute] + ", " + chosenCountry1,
    "" + labelsDict[attribute] + ", " + chosenCountry2,
  ];
  var colors = ["purple", "green"]; //This will be changed to other colors in CP5

  if (chosenCountry1 != undefined && chosenCountry1 != "") {
    // Add color dots for legends C1
    svg
      .append("circle")
      .attr("cx", width - 200)
      .attr("cy", 220)
      .attr("r", 3)
      .style("fill", colors[0]);

    // Add labels for legends C1
    svg
      .append("text")
      .attr("x", width - 190)
      .attr("y", 220)
      .text(lineLabels[0])
      .style("font-size", "10px")
      .attr("alignment-baseline", "middle");
  }

  if (chosenCountry2 != undefined && chosenCountry2 != "") {
    //Dots for legends C2
    svg
      .append("circle")
      .attr("cx", width - 200)
      .attr("cy", 235)
      .attr("r", 3)
      .style("fill", colors[1]);

    // Add labels for legends C2
    svg
      .append("text")
      .attr("x", width - 190)
      .attr("y", 235)
      .text(lineLabels[1])
      .style("font-size", "10px")
      .attr("alignment-baseline", "middle");
  }
}
