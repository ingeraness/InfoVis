// const countries = ['Albania', 'Austria', 'Belgium', 'Bosnia and Herzegovina','Bulgaria', 'Croatia','Cyprus', 'Czech Rebublic', 'Denmark', 'Estonia', 'Finland', 'France', 'Germany', 'Greece', 'Hungary', 'Iceland', 'Ireland', 'Italy', 'Latvia', 'Lithuania', 'Luxembourg', 'Malta', 'Moldova', 'Montenegro', 'Netherlands', 'North Macedonia', 'Norway', 'Poland', 'Portugal', 'Romania', 'Russian Federation',  'Serbia', 'Sloavk Rebublic', 'Slovenia', 'Spain', 'Sweden', 'Switzerland', 'Ukraine', 'United Kingdom' ];
var chosenCountry1;
var chosenCountry2;
var chosenYear = 2018;
var chosenAttributeX = "pf_ss";
var chosenAttributeY = "pf_religion_freedom";
var update = false;

function saveDropdownCountry(i) {
  if (i == 1) {
    chosenCountry1 = document.getElementById("dropdown_country1").value;
    console.log(chosenCountry1);
  } else {
    chosenCountry2 = document.getElementById("dropdown_country2").value;
    console.log(chosenCountry2);
  }
  // Check if it should draw the lineChart or barChart
  d3.csv("data/data.csv")
    .then((data) => {
      if (
        (chosenCountry1 == undefined || chosenCountry1 == "") &&
        (chosenCountry2 == undefined || chosenCountry2 == "")
      ) {
        d3.select("div#lineChart").select("svg").remove(); //Remove old chart
        createBarChart(data);
      } else {
        d3.select("div#barChart").select("svg").remove(); //Remove old chart
        createLineChart(data, false);
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

function saveDropdownYear() {
  chosenYear = document.getElementById("dropdown_years");
}

function saveDropdownAttribute() {
  d3.select("div#scatterPlot").select("*").remove(); //Remove old chart
  chosenAttributeX = document.getElementById("dropdown_attribute1").value;
  console.log("ATTR X: ", chosenAttributeX)
  d3.csv("data/data.csv")
    .then((data) => {
      d3.select("div#scatterPlot").select("svg").remove(); //Remove old chart
      createScatterPlot(data, update);
  });
}

function init() {
  d3.csv("data/data.csv")
    .then((data) => {
      createScatterPlot(data, update);
      createBarChart(data);
      createDropDownMenus();
    })
    .catch((error) => {
      console.log(error);
    });
}
