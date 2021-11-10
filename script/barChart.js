function createBarChart(data, update) {
  width = 1300;
  height = 350;
  margin = { top: 20, right: 20, bottom: 40, left: 40 };

  var svg = d3.select("div#barChart").select("svg");
  svg.selectAll("*").remove(); // Remove the old vis before drawing the new vis with new countries

  // Set header
  document.getElementById("headerBarChart").innerHTML =
    "Freedom Index Europe from " + chosenYear ;

  var filtered_data = data.filter(function (d) {
    if (d.year == chosenYear.valueOf()) {
      return d;
    }
  }).sort((a,b) => {
    return d3.ascending(a.hf_score, b.hf_score)
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
      return d.hf_score;
    })
    .join("rect")
    .attr("x", (d, i) => x(d.ISO_code))
    .attr("y", (d, i) => y(d.hf_score))
    .attr("height", (d) => height - margin.bottom - y(d.hf_score))
    .attr("width", x.bandwidth())
    .attr("id", "removeOnUpdate")
    .on("mousemove", handleMouseMove)
    .on("mouseover", handleMouseOver)
    .on("mouseleave", handleMouseLeave)
    .on("click", handleClickBarChart);

  svg.append("g").attr("class", "xAxis").call(xAxis);

  svg.append("g").attr("class", "yAxis").call(yAxis);
}
