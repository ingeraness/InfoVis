var handleMouseMove = function (event, d) {
  d3.select(".tooltip")
    .style("left", event.pageX + 20 + "px")
    .style("top", event.pageY - 50 + "px");
};

function handleMouseOver(event, d) {

  let hoveredCountry;
  let hoveredCountryName;

  d.country != undefined ? hoveredCountryName = d.country : hoveredCountryName = d.properties.NAME;
  hoveredCountry = dataset.filter((c) => c.country == hoveredCountryName && c.year == chosenYear);

  let lineChart1 = d3.select("div#lineChart1").select("svg");
  let lineChart2 = d3.select("div#lineChart2").select("svg");
  let scatterPlot = d3.select("div#scatterPlot").select("svg");
  let barChart = d3.select("div#barChart").select("svg");
  let clevelandPlot = d3.select("div#clevelandPlot").select("svg");
  let choroplethMap = d3.select("div#choropleth").select("svg");

  markSelectedCountries(); //Mark the countries selected in the drop down menus

  lineChart1
    .selectAll(event.path[0].id == "" ? "circle" : `circle#${event.path[0].id}`)
    .filter(function (b) {
      if (hoveredCountryName == b.country && d.year == b.year) {
        return b;
      }
    })
    .style("fill", "red");

  lineChart2
    .selectAll(event.path[0].id == "" ? "circle" : `circle#${event.path[0].id}`)
    .filter(function (b) {
      if (hoveredCountryName == b.country && d.year == b.year) {
        return b;
      }
    })
    .style("fill", "red");

  scatterPlot
    .selectAll("circle#dataScatter")
    .filter(function (b) {
      if (hoveredCountryName == b.country) {
        return b;
      }
    })
    .style("fill", "red");

  barChart
    .selectAll("rect")
    .filter(function (b) {
      if (hoveredCountryName == b.country) {
        return b;
      }
    })
    .style("fill", "red");

  choroplethMap
    .selectAll(".country")
    .filter(function (b) {
      if (b.properties.NAME == hoveredCountryName ) {
        return b;
      }
    })
    .style("stroke-width", 2)
    .style("stroke", "red");

  if (hoveredCountry[0].year == chosenYear) {
    clevelandPlot
      .selectAll("circle#dotsClevelandYear1")
      .filter((b) => b.country == hoveredCountryName)
      .style("fill", "red");
  } else {
    clevelandPlot
      .selectAll("circle#dotsClevelandYear2")
      .filter((b) => b.country == hoveredCountryName)
      .style("fill", "red");
  }

  //Check if hovered plot is not chororplethMap
  if(d.country != undefined) {
    d3.select(".tooltip").style("visibility", "visible")
      .html("Country: " +  d.country + 
      "</br> Year: " + d.year + 
      "</br>"+labelsDict[chosenAttributeX]+": " + d[chosenAttributeX]
      +  "</br>"+labelsDict[chosenAttributeY]+": " + d[chosenAttributeY]
    
      );
  }
  else {
    d3.select(".tooltip")
    .style("visibility", "visible")
    .html(
      "Country: " +
        hoveredCountryName +
        "</br> Year: " +
        hoveredCountry[0].year +
        "</br>" +
        labelsDict[chosenAttributeX] +
        ": " +
        hoveredCountry[0][chosenAttributeX] +
        "</br>" +
        labelsDict[chosenAttributeY] +
        ": " +
        hoveredCountry[0][chosenAttributeY]
    );
  }
}

function handleMouseLeave(event, d) {  
  d3.select(".tooltip").style("visibility", "hidden");

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
    .selectAll("circle#dataScatter")
    .style("fill", "steelblue")
    .filter(function (b) {
      if (b.country == chosenCountry1 || b.country == chosenCountry2) {
        return b;
      }
    })
    .style("fill", (d) => (d.country == chosenCountry1 ? "purple" : "green"));

  d3.select("div#barChart")
    .select("svg")
    .selectAll("rect")
    .style("fill", "steelblue");

  d3.select("div#clevelandPlot")
    .select("svg")
    .selectAll("circle")
    .filter((d) => d.year == chosenYear)
    .style("fill", "#69b3a2");

  d3.select("div#clevelandPlot")
    .select("svg")
    .selectAll("circle")
    .filter((d) => d.year == chosenYear2)
    .style("fill", "pink");


  d3.select("div#choropleth")
    .select("svg")
    .selectAll(".country")
    .style("stroke", "none")
    .filter(function (b) {
      if (
        b.properties.NAME == chosenCountry1 ||
        b.properties.NAME == chosenCountry2
      ) {
        return b;
      }
    })
    .style("stroke-width", 3)
    .style("stroke", (d) =>
      d.properties.NAME == chosenCountry1 ? "purple" : "green"
    );
}

var chosenCountryNumber = 0;

// Change selected country when bar is clicked on in bar chart
function handleClickBarChart(event, d) {
  if (chosenCountry1 != d.country && chosenCountry2 != d.country) {
    if (chosenCountryNumber % 2 == 0) {
      chosenCountry1 = d.country;
      document.getElementById("dropdown_country1").value = chosenCountry1;
      saveDropdownCountry(3);
      chosenCountryNumber++;
    } else {
      chosenCountry2 = d.country;
      document.getElementById("dropdown_country2").value = chosenCountry2;
      saveDropdownCountry(3);
      chosenCountryNumber++;
    }
  }
}

// Change selected country when circle is clicked on in scatterplot
function handleClickScatterplot(event, d) {
  if (chosenCountry1 != d.country && chosenCountry2 != d.country) {
    if (chosenCountryNumber % 2 == 0) {
      chosenCountry1 = d.country;
      document.getElementById("dropdown_country1").value = chosenCountry1;
      saveDropdownYear(false);
      chosenCountryNumber++;
    } else {
      chosenCountry2 = d.country;
      document.getElementById("dropdown_country2").value = chosenCountry2;
      saveDropdownYear(false);
      chosenCountryNumber++;
    }
  }
}

// Change selected country when country is clicked on in choropleth
function handleClickChoropleth(event, d) {
  if (
    chosenCountry1 != d.properties.NAME &&
    chosenCountry2 != d.properties.NAME
  ) {
    if (chosenCountryNumber % 2 == 0) {
      chosenCountry1 = d.properties.NAME;
      document.getElementById("dropdown_country1").value = chosenCountry1;
      saveDropdownYear(false);
      chosenCountryNumber++;
    } else {
      chosenCountry2 = d.properties.NAME;
      document.getElementById("dropdown_country2").value = chosenCountry2;
      saveDropdownYear(false);
      chosenCountryNumber++;
    }
  }
}

function handleClickCleveland(event, d) {
  if (chosenCountry1 != d.country && chosenCountry2 != d.country) {
    if (chosenCountryNumber % 2 == 0) {
      chosenCountry1 = d.country;
      document.getElementById("dropdown_country1").value = chosenCountry1;
      saveDropdownYear(false);
      chosenCountryNumber++;
    } else {
      chosenCountry2 = d.country;
      document.getElementById("dropdown_country2").value = chosenCountry2;
      saveDropdownYear(false);
      chosenCountryNumber++;
    }
  }
}

function markSelectedCountries() {
  //Marks the countries selected in the drop down menus
  scatterPlot = d3.select("div#scatterPlot").select("svg");
  choroplethMap = d3.select("div#choropleth").select("svg");

  scatterPlot
    .selectAll("circle#dataScatter")
    .style("fill", "steelblue")
    .filter(function (b) {
      if (b.country == chosenCountry1 || b.country == chosenCountry2) {
        return b;
      }
    })
    .style("fill", (d) => (d.country == chosenCountry1 ? "purple" : "green"));

  choroplethMap
    .selectAll(".country")
    .style("stroke", "none")
    .filter(function (b) {
      if (
        b.properties.NAME == chosenCountry1 ||
        b.properties.NAME == chosenCountry2
      ) {
        return b;
      }
    })
    .style("stroke-width", 3)
    .style("stroke", (d) =>
      d.properties.NAME == chosenCountry1 ? "purple" : "green"
    );
}
