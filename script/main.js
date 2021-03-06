var chosenCountry1;
var chosenCountry2;
var chosenYear = 2008;
var chosenYear2 = 2018;
var chosenAttributeY = "pf_ss";
var chosenAttributeX = "hf_score";
var update = false;

var showingBarChart;

var labelsDict = {
  pf_ss: "Safety and Security",
  pf_ss_women: "Women’s Freedom",
  ef_legal_police: "Police Reliability",
  pf_ss_disappearances_violent: "Criminal Trends",
  pf_religion_freedom: "Religious Freedom",
  hf_score: "Freedom Index",
};

function init() {
  d3.csv("data/data.csv")
    .then((data) => {
      createScatterPlot(data, false);
      createBarChart(data, false);
      markSelectedCountries();
      createDropDownMenus();
      createChoroplethMap(false);
      createClevelandPlot(data, false);
    })
    .catch((error) => {
      console.log(error);
    });
}


function saveDropdownCountry(i) {
  d3.selectAll(".labelsBox")
  .style("visibility", "visible");
  if (
    (document.getElementById("dropdown_country1").value == chosenCountry2 &&
      document.getElementById("dropdown_country1").value != "") ||
    (document.getElementById("dropdown_country2").value == chosenCountry1 &&
      document.getElementById("dropdown_country2").value != "")
  ) {
    if (i == 1) {
      document.getElementById("dropdown_country1").value = chosenCountry1;
    } else {
      document.getElementById("dropdown_country2").value = chosenCountry2;
    }
    return;
  }
  if (i == 1) {
    chosenCountry1 = document.getElementById("dropdown_country1").value;
  } else if (i == 2) {
    chosenCountry2 = document.getElementById("dropdown_country2").value;
  }
  // Check if it should draw the lineChart or barChart
  removeCharts(showingBarChart, false);
  d3.csv("data/data.csv")
    .then((data) => {
      updateScatterPlot(data)
      createClevelandPlot(data, true);
      markSelectedCountries();
      if (
        (chosenCountry1 == undefined || chosenCountry1 == "") &&
        (chosenCountry2 == undefined || chosenCountry2 == "")
      ) {
        d3.select(".labelsBox").style("visibility", "hidden");
        d3.select("div#lineChart1").select("svg").remove(); //Remove old chart
        d3.select("div#lineChart2").select("svg").remove(); //Remove old chart
        clearHeaders(3);
        if(showingBarChart){
          updateBarChart(data)
        }
        else{
          createBarChart(data, false)
        }
        showingBarChart = true;
      } else {
        d3.select("div#barChart").select("svg").remove(); //Remove old chart
        showingBarChart = false;
        clearHeaders(3);
        d3.select(".tooltip").style("visibility", "hidden");

        createLineChart(data, false, chosenAttributeX, 1);
        createLineChart(data, false, chosenAttributeY, 2);
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

function saveDropdownYear(yearChanged, i) {
  if (
    document.getElementById("dropdown_year1").value >
    document.getElementById("dropdown_year2").value
  ) {
    if (i == 1) {
      document.getElementById("dropdown_year1").value = chosenYear;
    } else {
      document.getElementById("dropdown_year2").value = chosenYear2;
    }
    return;
  }

  if (i == 1) {
    chosenYear = document.getElementById("dropdown_year1").value;
  } else if (i == 2) {
    chosenYear2 = document.getElementById("dropdown_year2").value;
  }
  removeCharts(showingBarChart, yearChanged);
  d3.csv("data/data.csv").then((data) => {
    updateScatterPlot(data)
    createChoroplethMap(true);
    createClevelandPlot(data, true);
    if (
      (chosenCountry1 == undefined || chosenCountry1 == "") &&
      (chosenCountry2 == undefined || chosenCountry2 == "")
    ) {
      d3.select(".labelsBox").style("visibility", "hidden");

      clearHeaders(3);
      if(showingBarChart){
        updateBarChart(data)
      }
      else{
        createBarChart(data, false);
      }
      showingBarChart = true;
    } else {
      d3.select("div#barChart").select("svg").remove(); //Remove old chart
      clearHeaders(3);
      createLineChart(data, false, chosenAttributeX, 1);
      createLineChart(data, false, chosenAttributeY, 2);
      showingBarChart = false;
    }
    markSelectedCountries();

  });
}

function saveDropdownAttribute(i) {
  if (
    document.getElementById("dropdown_attribute1").value == chosenAttributeY ||
    document.getElementById("dropdown_attribute2").value == chosenAttributeX
  ) {
    if (i == 1) {
      document.getElementById("dropdown_attribute1").value = chosenAttributeX;
    } else {
      document.getElementById("dropdown_attribute2").value = chosenAttributeY;
    }
    return;
  }
  d3.select("div#scatterPlot")
    .selectAll("svg")
    .selectAll("#TextRemoveOnUpdate")
    .remove(); //Remove old chart
  d3
  .select("div#scatterPlot-box")
    .selectAll("p")
    .remove(); //Remove old div
  d3.selectAll("div#clevelandPlot")
    .select("svg")
    .selectAll("line#linesCleveland")
    .remove();
  d3.selectAll("div#clevelandPlot")
    .select("svg")
    .selectAll("circle#dotsClevelandYear2")
    .remove();
  d3.selectAll("div#clevelandPlot")
    .select("svg")
    .selectAll("circle#dotsClevelandYear1")
    .remove();
  d3.selectAll("div#clevelandPlot")
    .select("svg")
    .selectAll("text#axisLabelCleveland")
    .remove();
  d3.selectAll("div#clevelandPlot")
    .select("svg")
    .select("g#clevelandYAxis")
    .remove();

  if (i == 1) {
    chosenAttributeX = document.getElementById("dropdown_attribute1").value;
  } else {
    chosenAttributeY = document.getElementById("dropdown_attribute2").value;
  }
  d3.csv("data/data.csv").then((data) => {
    updateScatterPlot(data)
    createClevelandPlot(data, true);
    markSelectedCountries();
    if (i == 1) {
      if (
        (chosenCountry1 == undefined || chosenCountry1 == "") &&
        (chosenCountry2 == undefined || chosenCountry2 == "")
      ) {
        d3.select("div#lineChart1").select("svg").remove(); //Remove old chart
        clearHeaders(3);
        updateBarChart(data)
        showingBarChart = true;
      } else {
        d3.select("div#barChart").select("svg").remove(); //Remove old chart
        clearHeaders(1);
        createLineChart(data, true, chosenAttributeX, 1);
        showingBarChart = false;
      }
    } else if (i == 2) {
      if (
        (chosenCountry1 == undefined || chosenCountry1 == "") &&
        (chosenCountry2 == undefined || chosenCountry2 == "")
      ) {
        d3.select("div#lineChart2").select("svg").remove(); //Remove old chart
        clearHeaders(3);
        updateBarChart(data)
        showingBarChart = true;
      } else {
        d3.select("div#barChart").select("svg").remove(); //Remove old chart
        clearHeaders(2);
        createLineChart(data, true, chosenAttributeY, 2);
        showingBarChart = false;
      }
    }
  });
}

function clearHeaders(i) {
  if (i == 1) {
    document.getElementById("headerBarChart").innerHTML = "";
    document.getElementById("headerLineChart1").innerHTML = "";
  } else if (i == 2) {
    document.getElementById("headerBarChart").innerHTML = "";
    document.getElementById("headerLineChart2").innerHTML = "";
  } else {
    document.getElementById("headerBarChart").innerHTML = "";
    document.getElementById("headerLineChart1").innerHTML = "";
    document.getElementById("headerLineChart2").innerHTML = "";
  }
}

function removeCharts(showingBarChart, yearChanged) {
    d3.select("div#scatterPlot")
    .selectAll("svg")
    .selectAll("#TextRemoveOnUpdate")
    .remove(); //Remove old chart

  d3.selectAll("div#clevelandPlot")
    .select("svg")
    .selectAll("line#linesCleveland")
    .remove();
  d3.selectAll("div#clevelandPlot")
    .select("svg")
    .selectAll("circle#dotsClevelandYear2")
    .remove();
  d3.selectAll("div#clevelandPlot")
    .select("svg")
    .selectAll("circle#dotsClevelandYear1")
    .remove();
  d3.selectAll("div#scatterPlot-box")
    .selectAll("text#legendScatter")
    .remove();
  d3.selectAll("div#clevelandPlot")
    .select("svg")
    .selectAll("text#axisLabelCleveland")
    .remove();
  d3.selectAll("div#clevelandPlot")
    .select("svg")
    .selectAll("g#clevelandYAxis")
    .remove();


  if (showingBarChart) {
    d3.select("div#lineChart1").select("svg").remove(); //Remove old chart
    d3.select("div#lineChart2").select("svg").remove(); //Remove old chart
  } else {
    d3.select("div#lineChart1").select("svg").remove(); //Remove old chart
    d3.select("div#lineChart2").select("svg").remove(); //Remove old chart
    d3.select("div#barChart").select("svg").remove(); //Remove old chart
  }
  if (yearChanged) {
    d3.select("div#choropleth").select("svg").selectAll(".country").remove();
  }
}
