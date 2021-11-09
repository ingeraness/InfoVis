
var handleMouseMove = function (event, d) {

  d3.select(".tooltip").style("left", (event.pageX + 20) + "px").style("top", (event.pageY - 50)+"px");
  
};

function handleMouseOver(event, d) {
  let lineChart1 = d3.select("div#lineChart1").select("svg");
  let lineChart2 = d3.select("div#lineChart2").select("svg");
  let scatterPlot = d3.select("div#scatterPlot").select("svg");
  let barChart = d3.select("div#barChart").select("svg");
  let clevelandPlot = d3.select("div#clevelandPlot").select("svg");

  // tooltip.style("opacity", 1);


  // const keys = Object.keys(d[0]);

  // let attributesDict = {
  //   pf_ss: keys[8].valueOf(),
  //   pf_ss_women: keys[9].valueOf(),
  //   ef_legal_police: keys[10].valueOf(),
  //   pf_ss_disappearances_violent: keys[6].valueOf(),
  //   pf_religion_freedom: keys[7].valueOf(),
  //   hf_score: keys[4].valueOf(),
  // };
 
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
    .selectAll("circle#dataScatter")
    // .selectAll("#dataScatter")
    .filter(function (b) {
      if (d.country == b.country) {
        // console.log("Info om dette landet: " + b.country);
        // console.log("Year: " + b.year);
        // console.log("Freedom index: " + b.hf_score);
        // console.log("Freedom rank: " + b.hf_rank);
        // console.log("Women’s Freedom: " + b.pf_ss_women);
        // console.log("Security and Safety: " + b.pf_ss);
        // console.log("Police Reliability: " + b.ef_legal_police);
        // console.log("Criminal trends: " + b.pf_ss_disappearances_violent);
        // console.log("Religious Freedom: " + b.pf_religion_freedom);
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

  clevelandPlot
    .selectAll("circle")
    .filter(function (b) {
      if (event.path[0].id == b.country || b == d) {
        return b;
      }
    })
    .style("fill", "red");

    if(d.country != undefined) {
      d3.select(".tooltip").style("visibility", "visible")
      //.style("top", (event.x  ) + "px").style("left", (event.y )+"px")
       .html("Country: " +  d.country + 
       "</br> Year: " + d.year + 
       "</br>"+labelsDict[chosenAttributeX]+": " + d[chosenAttributeX]
       +  "</br>"+labelsDict[chosenAttributeY]+": " + d[chosenAttributeY]
     
       );
    }
    else {
      var country = dataset.filter((c) => c.country == d.properties.NAME && c.year == chosenYear)
      d3.select(".tooltip").style("visibility", "visible")
      //.style("top", (event.x  ) + "px").style("left", (event.y )+"px")
       .html("Country: " +  country[0].country + 
       "</br> Year: " + country[0].year + 
       "</br>"+labelsDict[chosenAttributeX]+": " + country[0][chosenAttributeX]
       +  "</br>"+labelsDict[chosenAttributeY]+": " + country[0][chosenAttributeY]
     
       );
    }


   
    // console.log(d.chosenAttributeX);
    // console.log(chosenAttributeX);
    // console.log(d.pf_religion_freedom);
    // console.log(d);

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
    .filter((d) => d.year == 2008)
    .style("fill", "#69b3a2");

  d3.select("div#clevelandPlot")
    .select("svg")
    .selectAll("circle")
    .filter((d) => d.year == 2018)
    .style("fill", "pink");
}

var chosenCountryNumber = 0;

// Change selected country when bar is clicked on in bar chart
function handleClickBarChart(event, d) {
  if(chosenCountry1 != d.country && chosenCountry2 != d.country){
    if(chosenCountryNumber % 2 == 0){
      chosenCountry1 = d.country;
      document.getElementById("dropdown_country1").value = chosenCountry1;
      saveDropdownCountry(3);
      chosenCountryNumber++;
    }
    else {
      chosenCountry2 = d.country;
      document.getElementById("dropdown_country2").value = chosenCountry2;
      saveDropdownCountry(3);
      chosenCountryNumber++;
    }
  }
}

// Change selected country when circle is clicked on in scatterplot
function handleClickScatterplot(event, d) {
  if(chosenCountry1 != d.country && chosenCountry2 != d.country){
    if(chosenCountryNumber % 2 == 0){
      chosenCountry1 = d.country;
      document.getElementById("dropdown_country1").value = chosenCountry1;
      saveDropdownYear();
      chosenCountryNumber++;
    }
    else {
      chosenCountry2 = d.country;
      document.getElementById("dropdown_country2").value = chosenCountry2;
      saveDropdownYear();
      chosenCountryNumber++;
    }
  }
}

// Change selected country when country is clicked on in choropleth
function handleClickChoropleth(event, d) {
  if(chosenCountry1 != d.properties.NAME && chosenCountry2 != d.properties.NAME){
    if(chosenCountryNumber % 2 == 0){
      chosenCountry1 = d.properties.NAME;
      document.getElementById("dropdown_country1").value = chosenCountry1;
      saveDropdownYear();
      chosenCountryNumber++;
    }
    else {
      chosenCountry2 = d.properties.NAME;
      document.getElementById("dropdown_country2").value = chosenCountry2;
      saveDropdownYear();
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
      // console.log("COUNTRY: " + b.country);
      // console.log("COUNTRY1: " + chosenCountry1);
      // console.log("COUNTRY2: " + chosenCountry2);
      if (b.country == chosenCountry1 || b.country == chosenCountry2) {
        return b;
      }
    })
    .style("fill", (d) => (d.country == chosenCountry1 ? "purple" : "green"));

  choroplethMap
    .selectAll(".country")
    .style("stroke", "none")
    .filter(function(b) {
      if(b.properties.NAME == chosenCountry1 || b.properties.NAME == chosenCountry2) {
        return b;
      }
    })
    .style("stroke", "black");
}


