// const countries = ['Albania', 'Austria', 'Belgium', 'Bosnia and Herzegovina','Bulgaria', 'Croatia','Cyprus', 'Czech Rebublic', 'Denmark', 'Estonia', 'Finland', 'France', 'Germany', 'Greece', 'Hungary', 'Iceland', 'Ireland', 'Italy', 'Latvia', 'Lithuania', 'Luxembourg', 'Malta', 'Moldova', 'Montenegro', 'Netherlands', 'North Macedonia', 'Norway', 'Poland', 'Portugal', 'Romania', 'Russian Federation',  'Serbia', 'Sloavk Rebublic', 'Slovenia', 'Spain', 'Sweden', 'Switzerland', 'Ukraine', 'United Kingdom' ];
var chosenCountry1;
var chosenCountry2;
var chosenYear = 2018;
var chosenAttributeX = "pf_ss";
var chosenAttributeY = "pf_religion_freedom";
var update = false;

var labelsDict = {
  pf_ss: "Safety and Security",
  pf_ss_women: "Women’s Freedom",
  ef_legal_police: "Police Reliability",
  pf_ss_disappearances_violent: "Criminal Trends",
  pf_religion_freedom: "Religious Freedom",
  hf_score: "Freedom Index",
};

function saveDropdownCountry(i) {
  if (i == 1) {
    chosenCountry1 = document.getElementById("dropdown_country1").value;
  } else {
    chosenCountry2 = document.getElementById("dropdown_country2").value;
  }
  // Check if it should draw the lineChart or barChart
  d3.csv("data/data.csv")
    .then((data) => {
      createScatterPlot(data, false);
      markSelectedCountries();
      if (
        (chosenCountry1 == undefined || chosenCountry1 == "") &&
        (chosenCountry2 == undefined || chosenCountry2 == "")
      ) {
        d3.select("div#lineChart").select("svg").remove(); //Remove old chart
        d3.select("div#barChart")
          .select("svg")
          .selectAll("#removeOnUpdate")
          .remove(); //Remove old chart
        createBarChart(data, false);
      } else {
        d3.select("div#lineChart").select("svg").remove(); //Remove old chart
        d3.select("div#barChart").select("svg").remove(); //Remove old chart
        createLineChart(data, false);
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

function saveDropdownYear() {
  chosenYear = document.getElementById("dropdown_years").value;
  // Check if it should draw the lineChart or barChart
  d3.csv("data/data.csv").then((data) => {
    d3.select("div#scatterPlot")
      .selectAll("svg")
      .selectAll("#removeOnUpdate")
      .remove(); //Remove old chart
    createScatterPlot(data, true);
    markSelectedCountries();
    if (
      (chosenCountry1 == undefined || chosenCountry1 == "") &&
      (chosenCountry2 == undefined || chosenCountry2 == "")
    ) {
      d3.select("div#lineChart")
        .select("svg")
        .selectAll("#removeOnUpdate")
        .remove(); //Remove old chart
      d3.select("div#barChart").select("svg").remove(); //Remove old chart
      createBarChart(data, false);
    } else {
      d3.select("div#lineChart")
        .select("svg")
        .selectAll("#removeOnUpdate")
        .remove(); //Remove old chart
      d3.select("div#barChart").select("svg").remove(); //Remove old chart
      createLineChart(data, false);
    }
  });
}

function saveDropdownAttribute(i) {
  if (i == 1) {
    chosenAttributeX = document.getElementById("dropdown_attribute1").value;
  } else {
    chosenAttributeY = document.getElementById("dropdown_attribute2").value;
  }
  d3.select("div#scatterPlot")
    .selectAll("svg")
    .selectAll("#removeOnUpdate")
    .remove(); //Remove old chart
  d3.csv("data/data.csv").then((data) => {
    // d3.select("div#scatterPlot").selectAll("svg").select("g#circles").remove(); //Remove old chart
    createScatterPlot(data, true);
    markSelectedCountries();
    if (i == 1) {
      if (
        (chosenCountry1 == undefined || chosenCountry1 == "") &&
        (chosenCountry2 == undefined || chosenCountry2 == "")
      ) {
        d3.select("div#lineChart")
          .select("svg")
          .selectAll("#removeOnUpdate")
          .remove(); //Remove old chart
        d3.select("div#barChart")
          .select("svg")
          .selectAll("#removeOnUpdate")
          .remove(); //Remove old chart
        createBarChart(data, false);
      } else {
        d3.select("div#lineChart")
          .select("svg")
          .selectAll("#removeOnUpdate")
          .remove(); //Remove old chart
        d3.select("div#barChart")
          .select("svg")
          .selectAll("#removeOnUpdate")
          .remove(); //Remove old chart
        createLineChart(data, false);
      }
    }
  });
}

function init() {
  d3.csv("data/data.csv")
    .then((data) => {
      createScatterPlot(data, false);
      createBarChart(data, false);
      markSelectedCountries();
      createDropDownMenus();
    })
    .catch((error) => {
      console.log(error);
    });
}
