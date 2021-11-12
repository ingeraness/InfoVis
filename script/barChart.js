function createBarChart(data, update) {
  width = 1000;
  height = 200;
  margin = { top: 20, right: 20, bottom: 40, left: 40 };

  var svg = d3.select("div#barChart").select("svg");
  svg.selectAll("*").remove(); // Remove the old vis before drawing the new vis with new countries

  // Set header
  document.getElementById("headerBarChart").innerHTML =
    labelsDict[chosenAttributeX] + " " + chosenYear;

  const keys = Object.keys(data[0]);

  let attributesDict = {
    pf_ss: keys[8].valueOf(),
    pf_ss_women: keys[9].valueOf(),
    ef_legal_police: keys[10].valueOf(),
    pf_ss_disappearances_violent: keys[6].valueOf(),
    pf_religion_freedom: keys[7].valueOf(),
    hf_score: keys[4].valueOf(),
  };

  var filtered_data = data
    .filter(function (d) {
      if (d.year == chosenYear.valueOf()) {
        return d;
      }
    })
    .sort((a, b) => {
      return (
        a[attributesDict[chosenAttributeX]] -
        b[attributesDict[chosenAttributeX]]
      );
    });

  y = d3
    .scaleLinear()
    .domain([0, 10])
    .range([height - margin.bottom, margin.top]);

  x = d3
    .scaleBand()
    .domain(
      filtered_data.map(function (d) {
        return d.ISO_code;
      })
    )
    .rangeRound([margin.left, width - margin.right])
    .padding(0.5);

  function xAxis(g) {
    g.attr("transform", `translate(0, ${height - margin.bottom})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", `translate(-10,0)rotate(-45)`)
      .style("text-anchor", "end");
  }

  function yAxis(g) {
    g.attr("transform", `translate(${margin.left}, 0)`).call(d3.axisLeft(y));
  }

  svg = d3
    .select("div#barChart")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  svg
    .append("g")
    .attr("class", "bars")
    .attr("fill", "steelblue")
    .selectAll("rect")
    .data(filtered_data, function (d) {
      return d[attributesDict[chosenAttributeX]];
    })
    .join("rect")
    .attr("x", (d, i) => x(d.ISO_code))
    .attr("y", (d, i) => y(d[attributesDict[chosenAttributeX]]))
    .attr(
      "height",
      (d) => height - margin.bottom - y(d[attributesDict[chosenAttributeX]])
    )
    .attr("width", x.bandwidth())
    .attr("id", "removeOnUpdate")
    .on("mousemove", handleMouseMove)
    .on("mouseover", handleMouseOver)
    .on("mouseleave", handleMouseLeave)
    .on("click", handleClickBarChart);

  svg.append("g").attr("class", "xAxis").call(xAxis);

  svg.append("g").attr("class", "yAxis").call(yAxis);
}
