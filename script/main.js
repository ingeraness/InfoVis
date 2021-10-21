const countries = ['Albania', 'Austria', 'Belgium', 'Bosnia and Herzegovina','Bulgaria', 'Croatia','Cyprus', 'Czech Republic', 'Denmark', 'Estonia', 'Finland', 'France', 'Germany', 'Greece', 'Hungary', 'Iceland', 'Ireland', 'Italy', 'Latvia', 'Lithuania', 'Luxembourg', 'Malta', 'Moldova', 'Montenegro', 'Netherlands', 'North Macedonia', 'Norway', 'Poland', 'Portugal', 'Romania', 'Russian Federation',  'Serbia', 'Slovak Republic', 'Slovenia', 'Spain', 'Sweden', 'Switzerland', 'Ukraine', 'United Kingdom' ];
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
    // Check if it should draw the lineChart or barChart
    d3.csv("data/data.csv").then((data) => {
        if((chosenCountry1 == undefined || chosenCountry1 == "") 
        && (chosenCountry2 == undefined || chosenCountry2 == "")){
            d3.select("div#lineChart").select("svg").remove();  //Remove old chart 
            createBarChart(data);
        }
        else{
            d3.select("div#barChart").select("svg").remove();  //Remove old chart 
            createLineChart(data, false);        
        }
    })
    .catch((error) => {
        console.log(error);
      });
    
}



function init() {
    d3.csv("data/data.csv")
      .then((data) => {
        createScatterPlot(data);
        createBarChart(data);
      })
      .catch((error) => {
        console.log(error);
      });

      var select1 = document.getElementById("dropdown_country1");
      var select2 = document.getElementById("dropdown_country2");

      for(var i = 0; i <countries.length; i++){
          var country = countries[i];
          var el1 = document.createElement("option");
          el1.textContent = country;
          el1.value = country;
          select1.appendChild(el1);


          var el2 = document.createElement("option");
          el2.textContent = country;
          el2.value = country;
          select2.appendChild(el2);

      }
  }