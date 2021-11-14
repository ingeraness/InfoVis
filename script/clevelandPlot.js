//Inspiration from https://www.d3-graph-gallery.com/graph/lollipop_cleveland.html

function createClevelandPlot(data, update) {
  // set the dimensions and margins of the graph
  const margin = { top: 10, right: 30, bottom: 30, left: 30 };
  const width = 240;
  const height = 648;

  const keys = Object.keys(data[0]);

  let attributesDict = {
    pf_ss: keys[8].valueOf(),
    pf_ss_women: keys[9].valueOf(),
    ef_legal_police: keys[10].valueOf(),
    pf_ss_disappearances_violent: keys[6].valueOf(),
    pf_religion_freedom: keys[7].valueOf(),
    hf_score: keys[4].valueOf(),
  };

  let temp = [];
  for (let i = 0; i < data.length; i++) {
    if (data[i].year == chosenYear) {
      temp.push(data[i]);
    }
  }
  temp.sort(function (a, b) {
    // Sort array after value for chosen attribute x for chosenYear
    return (
      a[attributesDict[chosenAttributeX]] - b[attributesDict[chosenAttributeX]]
    );
  });
  let newTemp = temp.slice(0, 20); // Only pick bottom 20 countries
  let i = 0;
  while (i < data.length) {
    // Add data for both years
    if (newTemp.includes(data[i])) {
      diff = chosenYear2 - chosenYear;
      newTemp.push(data[i - diff]);
    } else if (
      (data[i].country == chosenCountry1 ||
        data[i].country == chosenCountry2) &&
      (data[i].year == chosenYear || data[i].year == chosenYear2)
    ) {
      // console.log("In else if");
      newTemp.push(data[i]);
    }
    i++;
  }

  newTemp.sort(function (a, b) {
    // Sort array so that countries are next to each other
    return a.ISO_code.localeCompare(b.ISO_code);
  });

  // append the svg object to the body of the page
  if (!update) {
    d3.select("div#clevelandPlot")
      .append("svg")
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);
  }
  svg = d3
    .select("div#clevelandPlot")
    .select("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom);

  // Add X axis
  const x = d3.scaleLinear().domain([0, 10]).range([0, width]);

  // Y axis
  const y = d3
    .scaleBand()
    .domain(
      newTemp.map(function (d) {
        return d.ISO_code;
      })
    )
    .range([margin.bottom, height - margin.top])
    .padding(1);

  if (!update) {
    svg
      .append("g")
      .attr("transform", `translate(${margin.left}, ${height})`)
      .call(d3.axisBottom(x));

    svg
      .append("g")
      .attr("transform", `translate(${margin.left}, 0)`)
      .call(d3.axisLeft(y));
  }

  // Lines
  svg
    .selectAll("myline")
    .data(newTemp)
    .join("line")
    .attr("x1", function (d) {
      let i = newTemp.filter(
        (c) => c.country == d.country && c.year == chosenYear
      );
      return x(i[0][attributesDict[chosenAttributeX]]);
    })
    .attr("x2", function (d) {
      let i = newTemp.filter(
        (c) => c.country == d.country && c.year == chosenYear2
      );
      return x(i[0][attributesDict[chosenAttributeX]]);
    })
    .attr("y1", function (d) {
      return y(d.ISO_code);
    })
    .attr("y2", function (d) {
      return y(d.ISO_code);
    })
    .attr("stroke", "grey")
    .attr("stroke-width", "1px")
    .attr("id", "linesCleveland");

  // Circles for selected year 1
  svg
    .selectAll("mycircle")
    .data(newTemp)
    .join("circle")
    .filter((d) => d.year == chosenYear)
    .attr("cx", function (d) {
      return x(d[attributesDict[chosenAttributeX]]);
    })
    .attr("cy", function (d) {
      return y(d.ISO_code);
    })
    .attr("r", "6")
    .style("fill", "#d39b63")
    .attr("id", "dotsClevelandYear1")
    .on("mousemove", handleMouseMove)
    .on("mouseover", handleMouseOver)
    .on("mouseleave", handleMouseLeave)
    .on("click", handleClickCleveland);

  // Circles for selected year 2
  svg
    .selectAll("mycircle")
    .data(newTemp)
    .join("circle")
    .filter((d) => d.year == chosenYear2)
    .attr("cx", function (d) {
      return x(d[attributesDict[chosenAttributeX]]);
    })
    .attr("cy", function (d) {
      return y(d.ISO_code);
    })
    .attr("r", "6")
    .style("fill", "#2171b5")
    .attr("id", "dotsClevelandYear2")
    .on("mousemove", handleMouseMove)
    .on("mouseover", handleMouseOver)
    .on("mouseleave", handleMouseLeave)
    .on("click", handleClickCleveland);

  svg
    .append("text") // text label for the x axis
    .attr("x", width + 20)
    .attr("y", height + 25)
    .attr("id", "axisLabelCleveland")
    .style("font-size", "10px")
    .style("text-anchor", "middle")
    .text(labelsDict[chosenAttributeX]);

  // Add color dots for legends Year1
  svg
    .append("circle")
    .attr("cx", width - 190)
    .attr("cy", 30)
    .attr("r", 3)
    .style("fill", "#d39b63");

  // Add labels for legends year 1
  svg
    .append("text")
    .attr("x", width - 183)
    .attr("y", 30)
    .attr("id", "axisLabelCleveland")
    .text(chosenYear)
    .style("font-size", "10px")
    .attr("alignment-baseline", "middle");

  // Add color dots for legends Year2
  svg
    .append("circle")
    .attr("cx", width - 150)
    .attr("cy", 30)
    .attr("r", 3)
    .style("fill", "#2171b5");

  // Add labels for legends year 2
  svg
    .append("text")
    .attr("x", width - 143)
    .attr("y", 30)
    .attr("id", "axisLabelCleveland")
    .text(chosenYear2)
    .style("font-size", "10px")
    .attr("alignment-baseline", "middle");

  // Set header
  document.getElementById("headerClevelandPlot").innerHTML =
    labelsDict[chosenAttributeX] + " from " + chosenYear + " to " + chosenYear2;
}
