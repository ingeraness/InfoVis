//Inspiration from https://www.d3-graph-gallery.com/graph/lollipop_cleveland.html

function createClevelandPlot(data, update) {
  // set the dimensions and margins of the graph
  const margin = { top: 10, right: 30, bottom: 30, left: 30 };
  const width = 300;
  const height = 730;

  const keys = Object.keys(data[0]);

  let attributesDict = {
    pf_ss: keys[8].valueOf(),
    pf_ss_women: keys[9].valueOf(),
    ef_legal_police: keys[10].valueOf(),
    pf_ss_disappearances_violent: keys[6].valueOf(),
    pf_religion_freedom: keys[7].valueOf(),
    hf_score: keys[4].valueOf(),
  };

  // append the svg object to the body of the page
  const svg = d3
    .select("div#clevelandPlot")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  // Add X axis
  const x = d3.scaleLinear().domain([0, 10]).range([0, width]);
  svg
    .append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(d3.axisBottom(x));

  // Y axis
  const y = d3
    .scaleBand()
    .range([0, height])
    .domain(
      data.map(function (d) {
        return d.ISO_code;
      })
    )
    .padding(1);
  svg.append("g").call(d3.axisLeft(y));

  // Lines
  svg
    .selectAll("line")
    .data(data)
    .join("line")
    .attr("x1", function (d) {
      return x(d[attributesDict[chosenAttributeX]]);
    })
    .attr("x2", function (d) {
      return x(d.pf_ss);
    })
    .attr("y1", function (d) {
      return y(d.ISO_code);
    })
    .attr("y2", function (d) {
      return y(d.ISO_code);
    })
    .attr("stroke", "grey")
    .attr("stroke-width", "1px");
  //.on("moveover", handleMouseOver)
  //.on("mouseleave", handleMouseLeave);

  // Circles for 2008
  svg
    .selectAll("mycircle")
    .data(data)
    .join("circle")
    .filter((d) => d.year == 2008)
    .attr("cx", function (d) {
      return x(d[attributesDict[chosenAttributeX]]);
    })
    .attr("cy", function (d) {
      return y(d.ISO_code);
    })
    .attr("r", "4")
    .style("fill", "#69b3a2");

  // Circles for 2013
  /*svg
    .selectAll("mycircle")
    .data(data)
    .join("circle")
    .attr("cx", function (d) {
      if (d.year == 2013) {
        return x(d[attributesDict[chosenAttributeX]]);
      }
    })
    .attr("cy", function (d) {
      return y(d.ISO_code);
    })
    .attr("r", "6")
    .style("fill", "#4C4082");*/

  // Circles for 2018
  svg
    .selectAll("mycircle")
    .data(data)
    .join("circle")
    .filter((d) => d.year == 2018)
    .attr("cx", function (d) {
      return x(d[attributesDict[chosenAttributeX]]);
    })
    .attr("cy", function (d) {
      return y(d.ISO_code);
    })
    .attr("r", "4")
    .style("fill", "pink");
}
