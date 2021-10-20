/*import {createScatterPlot} from '/script/scatter-plot.js'
import {createMap} from '/script/map.js'
import {createBarChart} from '/script/barChart.js'
import {createLineChart} from '/script/lineChart.js'
*/

/*Dropdown countries
var events= d3.dispatch("stateSelecetedEvent");

events.on("stateSelectedEvent", function(code){
    console.log("StateSelectedEvent called with \"" + code + "\"");
    assertStateCode(code);

    // Update the global variable
    selectedCountry = code;

});
*/

const countries = ['Albania', 'Austria', 'Belgium', 'Bosnia and Herzegovina','Bulgaria', 'Croatia','Cyprus', 'Czech Rebublic', 'Denmark', 'Estonia', 'Finland', 'France', 'Germany', 'Greece', 'Hungary', 'Iceland', 'Ireland', 'Italy', 'Latvia', 'Lithuania', 'Luxembourg', 'Malta', 'Moldova', 'Montenegro', 'Netherlands', 'North Macedonia', 'Norway', 'Poland', 'Portugal', 'Romania', 'Russian Federation',  'Serbia', 'Sloavk Rebublic', 'Slovenia', 'Spain', 'Sweden', 'Switzerland', 'Ukraine', 'United Kingdom' ];
var chosenCountry1;
var chosenCountry2;


function saveDropdownCountry(i){
    console.log(i);
    if(i==1){
        chosenCountry1 = document.getElementById("dropdown_country1").value;
        console.log(chosenCountry1);
    }
    else{
        chosenCountry2 = document.getElementById("dropdown_country2").value;
        console.log(chosenCountry2);
    }
    
}



function init() {
    d3.csv("data/data.csv")
      .then((data) => {
        dataSet = data;
       /* createBarChart(data, false);
        createScatterPlot(data, false);
        createLineChart(data, false);
        createMap(data,false)
        */
      })
      .catch((error) => {
        console.log(error);
      });

      var select1 = document.getElementById("dropdown_country1");
      var select2 = document.getElementById("dropdown_country2");

      for(var i =0; i <countries.length; i++){
          var country = countries[i];
          var el1 = document.createElement("option");
          el1.textContent = country;
          el1.value = country;
          var el2 = document.createElement("option");
          el2.textContent = country;
          el2.value = country;
          select1.appendChild(el1);
          select2.appendChild(el2);


      }
  }