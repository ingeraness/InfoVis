function handleMouseOver(event, d) {
  lineChart = d3.select("div#lineChart").select("svg");
  scatterPlot = d3.select("div#scatterPlot").select("svg");
  barChart = d3.select("div#barChart").select("svg");

  lineChart
    .selectAll(event.path[0].id == "" ? "circle" : `circle#${event.path[0].id}`)
    .filter(function (b) {
      if (d.country == b.country && d.year == b.year) {
        return b;
      }
    })
    .style("fill", "red");

  scatterPlot
    .selectAll("circle")
    .filter(function (b) {
      if (d.country == b.country) {
        console.log("Info om dette landet: " + b.country);
        console.log("Freedom index: " + b.hf_score);
        console.log("Freedom rank: " + b.hf_rank);
        console.log("Women’s Freedom: " + b.pf_ss_women);
        console.log("Security and Safety: " + b.pf_ss);
        console.log("Police Reliability: " + b.ef_legal_police);
        console.log("Criminal trends: " + b.pf_ss_disappearances_violent);
        console.log("Religious Freedom: " + b.pf_religion_freedom);
        return b;
      }
    })
    .style("fill", "red");

  barChart
    .selectAll("rect")
    .filter(function (b) {
      if (d.country == b.country) {
        return b;
      }
    })
    .style("fill", "red");
}

function handleMouseLeave(event, d) {
  if (event.path[0].id == "one") {
    d3.select("div#lineChart")
      .select("svg")
      .selectAll(`circle#${event.path[0].id}`)
      .style("fill", "steelblue");
  }

  if (event.path[0].id == "two") {
    d3.select("div#lineChart")
      .select("svg")
      .selectAll(`circle#${event.path[0].id}`)
      .style("fill", "blue");
  }

  if (event.path[0].id == "three") {
    d3.select("div#lineChart")
      .select("svg")
      .selectAll(`circle#${event.path[0].id}`)
      .style("fill", "PaleVioletRed");
  }

  if (event.path[0].id == "four") {
    d3.select("div#lineChart")
      .select("svg")
      .selectAll(`circle#${event.path[0].id}`)
      .style("fill", "pink");
  }

  d3.select("div#scatterPlot")
    .select("svg")
    .selectAll(`circle`)
    .style("fill", "blue");

  d3.select("div#barChart")
    .select("svg")
    .selectAll("rect")
    .style("fill", "steelblue");
}

function markSelectedCountries() {
  scatterPlot = d3.select("div#scatterPlot").select("svg");

  scatterPlot
    .selectAll("circle")
    .style("fill", "blue")
    .filter(function (b) {
      if (b.country == chosenCountry1 || b.country == chosenCountry2) {
        return b;
      }
    })
    .style("fill", "green");
}
