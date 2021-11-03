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

var handleMouseMove = function (d) {
  tooltip.html("Country: " + d.year);
  //.style("left", (d3.pointer(this)[0]+90) + "px") // It is important to put the +90: other wise the tooltip is exactly where the point is an it creates a weird effect
  //.style("top", (d3.pointer(this)[1]) + "px")
};

function handleMouseOver(event, d) {
  lineChart1 = d3.select("div#lineChart1").select("svg");
  lineChart2 = d3.select("div#lineChart2").select("svg");
  scatterPlot = d3.select("div#scatterPlot").select("svg");
  barChart = d3.select("div#barChart").select("svg");

  tooltip.style("opacity", 1);

  markSelectedCountries(); //Mark the countries selected in the drop down menus

  lineChart1
    .selectAll(event.path[0].id == "" ? "circle" : `circle#${event.path[0].id}`)
    .filter(function (b) {
      if (d.country == b.country && d.year == b.year) {
        return b;
      }
    })
    .style("fill", "red");

  lineChart2
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
        console.log("Year: " + b.year);
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
  tooltip.transition().duration(600).style("opacity", 0);

  if (event.path[0].id == "one") {
    d3.select("div#lineChart1")
      .select("svg")
      .selectAll(`circle#${event.path[0].id}`)
      .style("fill", "purple");
  }

  if (event.path[0].id == "two") {
    d3.select("div#lineChart1")
      .select("svg")
      .selectAll(`circle#${event.path[0].id}`)
      .style("fill", "green");
  }

  if (event.path[0].id == "one") {
    d3.select("div#lineChart2")
      .select("svg")
      .selectAll(`circle#${event.path[0].id}`)
      .style("fill", "purple");
  }

  if (event.path[0].id == "two") {
    d3.select("div#lineChart2")
      .select("svg")
      .selectAll(`circle#${event.path[0].id}`)
      .style("fill", "green");
  }

  d3.select("div#scatterPlot")
    .select("svg")
    .selectAll(`circle`)
    .style("fill", "steelblue")
    .filter(function (b) {
      if (b.country == chosenCountry1 || b.country == chosenCountry2) {
        return b;
      }
    })
    .style("fill", "purple");

  d3.select("div#barChart")
    .select("svg")
    .selectAll("rect")
    .style("fill", "steelblue");
}

// Change selected country when bar is clicked on in bar chart
function handleClickBarChart(event, d) {
  chosenCountry1 = d.country;
  document.getElementById("optionC1").innerHTML = chosenCountry1;
  saveDropdownCountry(3);
}

// Change selected country when bar is clicked on in scatterplot
function handleClickScatterplot(event, d) {
  chosenCountry1 = d.country;
  document.getElementById("optionC1").innerHTML = chosenCountry1;
  saveDropdownYear();
}

function markSelectedCountries() {
  //Marks the countries selected in the drop down menus
  scatterPlot = d3.select("div#scatterPlot").select("svg");

  scatterPlot
    .selectAll("circle")
    .style("fill", "steelblue")
    .filter(function (b) {
      console.log("COUNTRY: " + b.country);
      console.log("COUNTRY1: " + chosenCountry1);
      console.log("COUNTRY2: " + chosenCountry2);
      if (b.country == chosenCountry1 || b.country == chosenCountry2) {
        return b;
      }
    })
    .style("fill", (d) => (d.country == chosenCountry1 ? "purple" : "green"));
}
